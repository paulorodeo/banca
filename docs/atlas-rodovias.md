# Camada Rodovias do Atlas

## Escopo atual

O Atlas combina dois conjuntos com datas e coberturas distintas:

- **DNIT/SNV 202201B:** traçados históricos das BR-101, BR-116, BR-153, BR-163 e BR-364. O proprietário autorizou a publicação em 27/10/2026. A camada identifica explicitamente que a base é histórica e não vigente. A atribuição DNIT/SNV e a distribuição Ibama/PAMGIA permanecem visíveis; o artefato publicado não é o arquivo bruto ignorado `.local/atlas-roads-dataset.json`.
- **ARTESP, São Paulo:** geometrias de trechos, ramos e acessos identificáveis nos KMZ publicados por concessionárias, além de resumos do inventário tabular XLSX. A cobertura é dos recursos de concessões listados no catálogo, não de todas as vias estaduais ou municipais.

## Fontes, licenças e transformação

O conjunto [Malha Rodoviária da ARTESP](https://dadosabertos.artesp.sp.gov.br/dataset/malha-rodoviaria) exibe licença Creative Commons Attribution. Os [termos do portal](https://dadosabertos.artesp.sp.gov.br/terms) exigem atribuição clara, preservação do significado e ausência de endosso implícito. O recurso KMZ da SPMar exibe Public Domain em sua página específica; esse status é registrado separadamente no manifesto de fontes.

O XLSX contém 14.372 linhas na aba `MALHA_RODOVIARIA_SP`, com jurisdição, administração, concessionária, identificação e atributos de trechos. Os campos de latitude/longitude referem-se a pontos de municípios e **não** são usados como linhas de rodovia. A geometria vem somente de elementos `LineString` dos KMZ. Os atributos XLSX e as geometrias KMZ são fontes paralelas; nenhuma junção linha a linha foi presumida sem identificador comum validado.

As linhas são filtradas por identificadores de rodovia nos nomes, descrições ou pastas dos KMZ, depois simplificadas para o SVG do Atlas. A interface identifica ramos/acessos, declara que a cobertura não é completa e informa que a representação não é cadastral. O conjunto ARTESP registra URL, ID de recurso, data e SHA-256 de cada entrada usada.

## Regeneração dos arquivos

O arquivo `public/data/atlas-roads-artesp-sp.json` é derivado dos arquivos em `.local/artesp-roads-source/` e do snapshot `catalog.json`. Para obter uma nova cópia do catálogo e dos recursos, use um diretório de origem novo para preservar as entradas anteriores:

```sh
python3 scripts/build-artesp-roads-sp.py \
  --download \
  --source-dir .local/artesp-roads-source-YYYYMMDD
```

Para preparar a versão SNV autorizada, sem alterar o dataset local de entrada:

```sh
bun run roads:snv:release
```

Esse comando valida a versão `202201B`, as cinco BRs e os 1.472 segmentos antes de escrever `public/data/atlas-roads-snv-202201b.json`. O preflight de homologação confirma os dois arquivos versionados, atribuições, licença, autorização e proveniência, e rejeita o caminho bruto `.local` no artefato.
