# Auditoria de cobertura dos distritos policiais — 15/10/2026

Comparação executada sobre os registros locais, sem criar unidades ou alterar URLs, nomes, dados operacionais e relações territoriais.

- **91 páginas e 91 números distintos** no projeto; nenhum número duplicado.
- **93 números distintos** na [lista municipal de distritos policiais](https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661), publicada em 24/03/2022 e consultada em 15/10/2026.
- Todos os 91 registros locais constam dessa referência.
- Faltam no projeto, em relação a essa lista: **55º DP — Parque São Rafael** e **83º DP — Parque Bristol**.
- A classificação regional dessa lista não foi importada: ela coloca o 55º na seção Sul e o Itaim Bibi na Oeste. As zonas editoriais do portal e a decisão de manter Itaim Bibi na Sul permanecem preservadas.

## Limites da comparação

A lista municipal é evidência de cobertura documental, não certificação de funcionamento em 2026. Não foram importados endereços, telefones, horários, competências ou fotografias de fachadas. O nome do 83º DP também consta no [Decreto estadual 44.643/2000](https://www.al.sp.gov.br/repositorio/legislacao/decreto/2000/decreto-44643-06.01.2000.html), como evidência de denominação, separada de funcionamento e dados operacionais.

Os números **60, 61, 71, 76, 79, 82, 84, 86, 88 e 94** não constam nem no projeto nem na lista municipal comparada. Não foram classificados como unidades atuais ausentes apenas por serem lacunas na sequência 1–103. Sua implantação e situação atual exigem evidência oficial específica.

Não foram criadas páginas dos dois DPs identificados: esta etapa verifica ausências; a publicação de novos guias exige registros tipados, nome documentado, zona editorial, ordem central e grafo territorial consistentes.

## Reprodução

`bun scripts/audit-district-coverage.ts`

O comando compara os dados locais atuais com o recorte numérico da fonte em `docs/auditoria-delegacias-2026-10-15.json`. Esse recorte registra fonte, data de publicação e data de consulta; não é um catálogo operacional nem ativa integração externa.
