#!/usr/bin/env python3
"""Build a compact, attributed São Paulo road layer from ARTESP XLSX and KMZ files.

The spreadsheet is read for inventory summaries only. KML LineString geometries
are the sole source of map paths; municipality coordinate columns are never used
to draw roads. Large source downloads stay in the ignored .local directory.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import unicodedata
import urllib.request
from collections import Counter
from datetime import date
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET
from zipfile import ZipFile

PACKAGE_ID = "d60ee312-79b7-4d2c-9049-a1777ef1d377"
PACKAGE_URL = f"https://dadosabertos.artesp.sp.gov.br/api/3/action/package_show?id={PACKAGE_ID}"
PACKAGE_PAGE = "https://dadosabertos.artesp.sp.gov.br/dataset/malha-rodoviaria"
TERMS_URL = "https://dadosabertos.artesp.sp.gov.br/terms"
RESOURCE_LICENSE_OVERRIDES = {
    "364f9ddf-bb1d-4853-a3c9-7e3f0cf2c78f": "Public Domain (license shown on the SPMar KMZ resource page)",
}
OUTPUT_DEFAULT = Path("public/data/atlas-roads-artesp-sp.json")
SOURCE_DEFAULT = Path(".local/artesp-roads-source")
PROJECTION = (15.930925066329067, 1202.7459972392758, -16.418860972589112, 116.21088829096749)
SP_BOUNDS = (-53.2, -26.0, -43.8, -19.4)
KML_NS = "http://www.opengis.net/kml/2.2"
NS = {"k": KML_NS, "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships", "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
ROUTE_RE = re.compile(r"(?<![A-Z0-9])(SP(?:A|I|M|T|G|N|E|S|V)?)[\s_-]*(\d{2,3})(?:\s*[/]\s*(\d{2,3}))?", re.I)
INVALID_XMLNS_RE = re.compile(rb"\s+xmlns:(ns\d+)=\"\{[^\"]*\}\"")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def safe_name(value: str) -> str:
    value = "".join(char for char in unicodedata.normalize("NFKD", value) if not unicodedata.combining(char))
    return re.sub(r"[^A-Za-z0-9_-]+", "_", value).strip("_")


def read_remote_catalog() -> dict[str, Any]:
    request = urllib.request.Request(PACKAGE_URL, headers={"User-Agent": "BancaPaulistaAtlas/1.0"})
    with urllib.request.urlopen(request, timeout=45) as response:
        payload = json.load(response)
    if not payload.get("success") or payload.get("result", {}).get("id") != PACKAGE_ID:
        raise ValueError("Resposta CKAN da ARTESP não corresponde ao conjunto Malha Rodoviária")
    return payload["result"]


def download_sources(source_dir: Path, catalog: dict[str, Any]) -> None:
    source_dir.mkdir(parents=True, exist_ok=True)
    for resource in catalog.get("resources", []):
        fmt = str(resource.get("format", "")).upper()
        if fmt != "KMZ" and resource.get("id") != "a7c33882-18a4-4c8c-9b17-5535783c6131":
            continue
        if resource.get("state") != "active":
            continue
        name = safe_name(str(resource.get("name", "resource")))
        suffix = ".kmz" if fmt == "KMZ" else ".xlsx"
        path = source_dir / f"{name}{suffix}"
        if path.exists() and path.stat().st_size:
            continue
        request = urllib.request.Request(resource["url"], headers={"User-Agent": "BancaPaulistaAtlas/1.0"})
        with urllib.request.urlopen(request, timeout=180) as response, path.open("wb") as output:
            while chunk := response.read(1024 * 1024):
                output.write(chunk)
        if fmt == "KMZ" and not zipfile_is_valid(path):
            path.unlink(missing_ok=True)
            raise ValueError(f"KMZ baixado inválido: {name}")


def zipfile_is_valid(path: Path) -> bool:
    try:
        with ZipFile(path) as archive:
            return archive.testzip() is None
    except Exception:
        return False


def normalize_kml(raw: bytes) -> ET.Element:
    # Some ARTESP exports contain namespace declarations serialized as Python
    # dictionaries. Rebind those exported prefixes to KML and add placeholders
    # for non-KML prefixes omitted by the exporter, without changing geometry.
    malformed = set(INVALID_XMLNS_RE.findall(raw))
    data = INVALID_XMLNS_RE.sub(b"", raw)
    for prefix in malformed:
        data = re.sub(rb"(?<![\w:])" + prefix + rb":", b"k:", data)
    root_match = re.search(rb"<(?:([A-Za-z_][\w.-]*):)?kml\b", data)
    if root_match is None:
        raise ValueError("Documento KML sem elemento raiz válido")
    root_prefix = root_match.group(1)
    if root_prefix:
        data = re.sub(rb"(?<![\w:])" + root_prefix + rb":", b"k:", data)
    else:
        data = re.sub(rb"<(?=kml\b)", b"<k:", data, count=1)
        data = re.sub(rb"</(?=kml\b)", b"</k:", data, count=1)
    root_open = re.search(rb"<k:kml\b[^>]*>", data)
    if root_open is None:
        raise ValueError("Documento KML sem elemento raiz válido")
    open_tag = root_open.group(0)
    used = set(re.findall(rb"(?<![\w:])([A-Za-z_][\w.-]*):[A-Za-z_]", data))
    declared = set(re.findall(rb"xmlns:([A-Za-z_][\w.-]*)=", open_tag))
    additions = []
    for prefix in sorted(used - declared - {b"xml", b"xmlns", b"k"}):
        additions.append(b' xmlns:' + prefix + b'="urn:artesp:export:' + prefix + b'"')
    if b"xmlns:k=" not in open_tag:
        additions.append(b' xmlns:k="' + KML_NS.encode() + b'"')
    data = data[:root_open.end() - 1] + b"".join(additions) + data[root_open.end() - 1:]
    root = ET.fromstring(data)
    return root


def local_text(parent: ET.Element, tag: str) -> str:
    node = parent.find(f"k:{tag}", NS)
    return " ".join("".join(node.itertext()).split()) if node is not None else ""


def route_code(value: str) -> str | None:
    match = ROUTE_RE.search(value.upper())
    if not match:
        return None
    prefix, first, second = match.groups()
    return f"{prefix.upper()}-{first}" + (f"/{second}" if second else "")


def simplified(points: list[tuple[float, float]], tolerance: float = 0.35) -> list[tuple[float, float]]:
    if len(points) <= 2:
        return points
    keep = {0, len(points) - 1}
    stack = [(0, len(points) - 1)]
    while stack:
        start, end = stack.pop()
        ax, ay = points[start]
        bx, by = points[end]
        dx, dy = bx - ax, by - ay
        best, index = tolerance, -1
        for position in range(start + 1, end):
            px, py = points[position]
            if dx == dy == 0:
                distance = ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
            else:
                t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
                distance = ((px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2) ** 0.5
            if distance > best:
                best, index = distance, position
        if index >= 0:
            keep.add(index)
            stack.extend(((start, index), (index, end)))
    return [point for index, point in enumerate(points) if index in keep]


def project(lon: float, lat: float) -> tuple[float, float]:
    sx, ox, sy, oy = PROJECTION
    return sx * lon + ox, sy * lat + oy


def parse_coordinates(text: str | None) -> list[tuple[float, float]]:
    points = []
    for item in (text or "").split():
        values = item.split(",")
        if len(values) < 2:
            continue
        lon, lat = float(values[0]), float(values[1])
        if not (-180 <= lon <= 180 and -90 <= lat <= 90):
            raise ValueError("Coordenada KML fora dos limites geográficos")
        points.append((lon, lat))
    return points


def extract_kmz(path: Path, resource: dict[str, Any]) -> list[dict[str, Any]]:
    with ZipFile(path) as archive:
        kml_names = [name for name in archive.namelist() if name.lower().endswith(".kml")]
        if not kml_names:
            raise ValueError(f"KMZ sem KML: {path.name}")
        root = normalize_kml(archive.read(kml_names[0]))
    operator = re.sub(r"^KMZ\s+", "", str(resource.get("name", path.stem))).strip()
    records: list[dict[str, Any]] = []
    serial = 0

    def visit(node: ET.Element, inherited_route: str | None = None) -> None:
        nonlocal serial
        tag = node.tag.rsplit("}", 1)[-1]
        next_route = inherited_route
        if tag == "Folder":
            folder_route = route_code(local_text(node, "name"))
            if folder_route:
                next_route = folder_route
        if tag == "Placemark":
            name = local_text(node, "name")
            description = local_text(node, "description")
            code = route_code(f"{name} {description}") or next_route
            if code:
                for line_index, coordinates in enumerate(node.findall(".//k:LineString/k:coordinates", NS)):
                    points = parse_coordinates(coordinates.text)
                    if len(points) < 2:
                        continue
                    xmin, ymin, xmax, ymax = SP_BOUNDS
                    in_scope = sum(xmin <= lon <= xmax and ymin <= lat <= ymax for lon, lat in points)
                    if in_scope < len(points) * 0.8:
                        continue
                    projected = simplified([project(lon, lat) for lon, lat in points])
                    if len(projected) < 2:
                        continue
                    path_data = "".join(
                        f"{'L' if index else 'M'}{point[0]:.1f} {point[1]:.1f}"
                        for index, point in enumerate(projected)
                    )
                    serial += 1
                    records.append({
                        "id": f"{resource['id']}:{serial}:{line_index + 1}",
                        "uf": "SP",
                        "segmentType": "concession-road",
                        "path": path_data,
                        "sourceVertices": len(points),
                        "renderedVertices": len(projected),
                        "operator": operator,
                        "routeCode": code,
                    })
        for child in list(node):
            visit(child, next_route)

    visit(root)
    return records


def column_index(cell_ref: str) -> int:
    result = 0
    for char in re.match(r"[A-Z]+", cell_ref).group(0):
        result = result * 26 + ord(char) - 64
    return result - 1


def read_xlsx_summary(path: Path) -> dict[str, Any]:
    with ZipFile(path) as archive:
        shared: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            shared = ["".join(part.text or "" for part in item.findall(".//m:t", NS)) for item in root.findall("m:si", NS)]
        workbook = ET.fromstring(archive.read("xl/workbook.xml"))
        rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        relmap = {item.attrib["Id"]: item.attrib["Target"] for item in rels}
        sheet = next((item for item in workbook.findall(".//m:sheet", NS) if item.attrib.get("name") == "MALHA_RODOVIARIA_SP"), None)
        if sheet is None:
            raise ValueError("Aba MALHA_RODOVIARIA_SP ausente no XLSX ARTESP")
        target = relmap[sheet.attrib[f"{{{NS['r']}}}id"]].lstrip("/")
        sheet_path = target if target.startswith("xl/") else f"xl/{target}"
        root = ET.fromstring(archive.read(sheet_path))
        iterator = iter(root.findall(".//m:sheetData/m:row", NS))
        header_row = next(iterator, None)
        if header_row is None:
            raise ValueError("Planilha ARTESP sem linhas")

        def values(row: ET.Element) -> dict[str, str]:
            result: dict[str, str] = {}
            for cell in row.findall("m:c", NS):
                value = cell.find("m:v", NS)
                text = value.text or "" if value is not None else ""
                if cell.attrib.get("t") == "s" and text:
                    text = shared[int(text)]
                inline = cell.find("m:is", NS)
                if inline is not None:
                    text = "".join(part.text or "" for part in inline.findall(".//m:t", NS))
                result[column_index(cell.attrib["r"])] = text
            return result

        header_values = values(header_row)
        headers = {index: name for index, name in header_values.items()}
        total = 0
        jurisdictions: Counter[str] = Counter()
        administrators: Counter[str] = Counter()
        concessions: Counter[str] = Counter()
        roads: set[str] = set()
        for row in iterator:
            row_values = values(row)
            record = {headers[index]: value.strip() for index, value in row_values.items() if index in headers}
            if not any(record.values()):
                continue
            total += 1
            jurisdictions[record.get("JURISDICAO", "") or "Não informado"] += 1
            administrators[record.get("ADMINISTRACAO", "") or "Não informado"] += 1
            concessions[record.get("CONCESSIONARIA", "") or "Não informado"] += 1
            if record.get("RODOVIA"):
                roads.add(record["RODOVIA"])
    return {
        "worksheet": "MALHA_RODOVIARIA_SP",
        "recordCount": total,
        "distinctRoadLabels": len(roads),
        "jurisdictionCounts": dict(sorted(jurisdictions.items())),
        "administrationCounts": dict(sorted(administrators.items())),
        "concessionCounts": dict(sorted(concessions.items(), key=lambda item: (-item[1], item[0]))),
        "coordinateNote": "IBGE_LAT_MUNICIPIO/IBGE_LON_MUNICIPIO identificam pontos de municípios; não são eixos rodoviários e não foram usados para desenhar geometrias.",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", type=Path, default=SOURCE_DEFAULT)
    parser.add_argument("--output", type=Path, default=OUTPUT_DEFAULT)
    parser.add_argument("--catalog-json", type=Path, help="snapshot CKAN package_show JSON for offline builds")
    parser.add_argument("--download", action="store_true", help="baixa recursos ativos do CKAN para .local")
    args = parser.parse_args()

    catalog_path = args.catalog_json or (args.source_dir / "catalog.json")
    if args.download or not catalog_path.is_file():
        catalog = read_remote_catalog()
        if args.download:
            args.source_dir.mkdir(parents=True, exist_ok=True)
            catalog_path.write_text(json.dumps({"success": True, "result": catalog}), encoding="utf-8")
    else:
        payload = json.loads(catalog_path.read_text(encoding="utf-8"))
        catalog = payload.get("result", payload)
        if catalog.get("id") != PACKAGE_ID:
            raise ValueError("Snapshot CKAN não corresponde ao conjunto Malha Rodoviária")
    if args.download:
        download_sources(args.source_dir, catalog)
    resources = catalog.get("resources", [])
    resource_by_name = {safe_name(str(item.get("name", ""))): item for item in resources}
    xlsx_resource = resource_by_name.get("Malha_Rodoviaria")
    if xlsx_resource is None:
        raise ValueError("Recurso XLSX oficial Malha Rodoviária ausente do catálogo")
    xlsx_path = args.source_dir / "Malha_Rodoviaria.xlsx"
    if not xlsx_path.is_file():
        raise FileNotFoundError(f"XLSX ausente: {xlsx_path}; execute com --download")

    route_records: dict[str, list[dict[str, Any]]] = {}
    used_sources: list[dict[str, Any]] = []
    seen_paths: set[tuple[str, str]] = set()
    for resource in resources:
        if str(resource.get("format", "")).upper() != "KMZ" or resource.get("state") != "active":
            continue
        name = safe_name(str(resource.get("name", "resource")))
        path = args.source_dir / f"{name}.kmz"
        if not path.is_file():
            raise FileNotFoundError(f"KMZ ausente: {path}; execute com --download")
        segments = extract_kmz(path, resource)
        if not segments:
            continue
        for segment in segments:
            signature = (segment["routeCode"], segment["operator"], segment["path"])
            if signature in seen_paths:
                continue
            seen_paths.add(signature)
            code = str(segment["routeCode"])
            route_records.setdefault(code, []).append(segment)
        used_sources.append({
            "name": str(resource.get("name", name)),
            "resourceId": resource["id"],
            "url": resource["url"],
            "updatedAt": resource.get("last_modified") or resource.get("metadata_modified"),
            "sha256": sha256(path),
            "license": RESOURCE_LICENSE_OVERRIDES.get(
                str(resource["id"]),
                "Creative Commons Attribution (ARTESP Malha Rodoviária catalog license)",
            ),
        })

    roads = []
    for code, segments in sorted(route_records.items()):
        for segment in segments:
            segment.pop("routeCode", None)
        operators = sorted({segment["operator"] for segment in segments})
        roads.append({"code": code, "ufs": ["SP"], "operators": operators, "segments": segments})
    if not roads:
        raise ValueError("Nenhuma geometria de rodovia identificada nos KMZ da ARTESP")

    xlsx_info = {
        "name": str(xlsx_resource.get("name", "Malha Rodoviária")),
        "resourceId": xlsx_resource["id"],
        "url": xlsx_resource["url"],
        "updatedAt": xlsx_resource.get("last_modified") or xlsx_resource.get("metadata_modified"),
        "sha256": sha256(xlsx_path),
        "license": "Creative Commons Attribution (ARTESP Malha Rodoviária catalog license)",
    }
    dataset = {
        "id": "artesp-sp-concession-roads",
        "title": "Rodovias sob concessão — São Paulo",
        "scope": "Trechos, ramos e acessos rodoviários identificáveis nas geometrias KMZ das concessionárias publicadas pela ARTESP; não representa todas as vias estaduais ou municipais.",
        "source": "Agência Reguladora de Serviços Públicos Delegados de Transporte do Estado de São Paulo (ARTESP)",
        "version": "Recursos publicados/atualizados entre 2026-07-30 e 2026-10-16",
        "sourceUrl": PACKAGE_PAGE,
        "termsUrl": TERMS_URL,
        "accessedAt": date.today().isoformat(),
        "license": "Creative Commons Attribution (licença exibida no conjunto Malha Rodoviária da ARTESP)",
        "relationshipNote": "Os atributos tabulares do XLSX e as geometrias dos KMZ são fontes paralelas; não foi presumida junção linha a linha sem identificador comum validado.",
        "attribution": "Fonte: Portal de Dados Abertos da ARTESP, conjunto Malha Rodoviária. Geometrias por concessionária e atributos de inventário foram derivados dos recursos oficiais listados abaixo; linhas foram simplificadas para visualização no Atlas. A ARTESP não endossa este produto. Representação não cadastral.",
        "rightsStatus": "approved",
        "productionEligible": True,
        "crs": "KML coordinates (WGS 84 longitude/latitude)",
        "projection": {"name": "Affine lon/lat fit · IBGE Malha Territorial 2025 SVG", "xScale": PROJECTION[0], "xOffset": PROJECTION[1], "yScale": PROJECTION[2], "yOffset": PROJECTION[3]},
        "sources": [xlsx_info, *used_sources],
        "tabularSummary": read_xlsx_summary(xlsx_path),
        "roads": roads,
        "counts": {
            "routes": len(roads),
            "segments": sum(len(road["segments"]) for road in roads),
            "sourceVertices": sum(segment["sourceVertices"] for road in roads for segment in road["segments"]),
            "renderedVertices": sum(segment["renderedVertices"] for road in roads for segment in road["segments"]),
            "operators": len({operator for road in roads for operator in road["operators"]}),
        },
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(dataset, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(args.output), "routes": len(roads), "segments": dataset["counts"]["segments"], "sources": len(dataset["sources"]), "tabularRecords": dataset["tabularSummary"]["recordCount"], "bytes": args.output.stat().st_size}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"ARTESP roads build failed: {error}", file=sys.stderr)
        raise SystemExit(1)
