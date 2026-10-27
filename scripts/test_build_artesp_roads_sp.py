import importlib.util
import sys
import unittest
from pathlib import Path

sys.dont_write_bytecode = True

MODULE_PATH = Path(__file__).with_name("build-artesp-roads-sp.py")
SPEC = importlib.util.spec_from_file_location("artesp_roads_builder", MODULE_PATH)
assert SPEC is not None and SPEC.loader is not None
BUILDER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BUILDER)


class ArtspRoadBuilderTests(unittest.TestCase):
    def test_normalizes_official_sp_route_labels(self):
        self.assertEqual(BUILDER.route_code("SP 160 - Sentido Sul"), "SP-160")
        self.assertEqual(BUILDER.route_code("SPA_247/225"), "SPA-247/225")
        self.assertEqual(BUILDER.route_code("SPM_225_D"), "SPM-225")
        self.assertIsNone(BUILDER.route_code("CFTV km 12"))

    def test_repairs_exporter_namespaces_without_losing_kml_geometry(self):
        source = b'''<?xml version="1.0"?>
<ns0:kml xmlns:ns0="http://www.opengis.net/kml/2.2" xmlns:ns2="{'kml': 'http://www.opengis.net/kml/2.2'}">
 <ns0:Document><ns0:Placemark><ns0:name>SP_160</ns0:name><ns2:LineString><ns0:coordinates>-46.6,-23.5,0 -46.5,-23.4,0</ns0:coordinates></ns2:LineString></ns0:Placemark></ns0:Document>
</ns0:kml>'''
        root = BUILDER.normalize_kml(source)
        self.assertEqual(root.findtext(".//k:name", namespaces=BUILDER.NS), "SP_160")
        coordinates = root.findtext(".//k:LineString/k:coordinates", namespaces=BUILDER.NS)
        self.assertEqual(coordinates, "-46.6,-23.5,0 -46.5,-23.4,0")

    def test_preserves_polyline_endpoints_during_simplification(self):
        points = [(0, 0), (0.1, 0.01), (1, 0)]
        simplified = BUILDER.simplified(points, tolerance=0.1)
        self.assertEqual(simplified[0], points[0])
        self.assertEqual(simplified[-1], points[-1])


if __name__ == "__main__":
    unittest.main()
