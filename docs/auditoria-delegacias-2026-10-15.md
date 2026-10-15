# Auditoria de cobertura dos distritos policiais — 15/10/2026

Comparação inicial executada sobre os registros locais, seguida da correção editorial autorizada dos dois guias ausentes. Os 91 slugs anteriores foram preservados.

- **93 páginas e 93 números distintos** no projeto após a correção; nenhum número duplicado.
- **93 números distintos** na [lista municipal de distritos policiais](https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661), publicada em 24/03/2022 e consultada em 15/10/2026.
- Todos os 93 registros locais constam dessa referência. A auditoria inicial encontrou duas ausências: **55º DP — Parque São Rafael** e **83º DP — Parque Bristol**; ambas foram registradas depois, sem alterar os 91 guias anteriores.
- A classificação regional dessa lista não foi importada: ela coloca o 55º na seção Sul e o Itaim Bibi na Oeste. As zonas editoriais do portal e a decisão de manter Itaim Bibi na Sul permanecem preservadas.

## Limites da comparação

A lista municipal é evidência de cobertura documental, não certificação de funcionamento em 2026. Não foram importados endereços, telefones, horários, competências ou fotografias de fachadas.

## Evidências de denominação, separadas de dados operacionais

- **55º DP — Parque São Rafael:** [Lei municipal 18.062/2023](https://legislacao.prefeitura.sp.gov.br/lei-18062-de-28-de-dezembro-de-2023/consolidado), art. 39, XVIII, identifica a sede e a denominação; a [Fazenda estadual, UA 0078821](https://www.fazenda.sp.gov.br/ua/ua.asp?ua=0078821), apresenta a unidade administrativa como ativa e vinculada à 8ª Seccional do DECAP. A [Prefeitura](https://prefeitura.sp.gov.br/web/sao_mateus/w/subprefeitura-convida-para-a-2%C2%AA-edi%C3%A7%C3%A3o-do-gabinete-presente-de-s%C3%A3o-mateus) situa São Rafael na Zona Leste. A lista municipal de DPs o coloca na seção Sul; esse agrupamento não foi adotado pelo portal.
- **83º DP — Parque Bristol:** [Decreto estadual 44.643/2000](https://www.al.sp.gov.br/repositorio/legislacao/decreto/2000/decreto-44643-06.01.2000.html) e [Lei municipal 18.062/2023](https://legislacao.prefeitura.sp.gov.br/lei-18062-de-28-de-dezembro-de-2023/consolidado), art. 39, IV, sustentam a denominação; a [Fazenda estadual, UA 0079075](https://www.fazenda.sp.gov.br/ua/ua.asp?ua=0079075), apresenta a unidade administrativa como ativa e vinculada à 2ª Seccional do DECAP. A [Prefeitura](https://prefeitura.sp.gov.br/web/comunicacao/w/noticias/120075) situa Parque Bristol no eixo Ipiranga/Zona Sul.
- **3º DP:** a [SSP em 2026](https://www.ssp.sp.gov.br/noticia/60595) usa *Campos Elíseos* para a unidade; a [lei municipal de 2023](https://legislacao.prefeitura.sp.gov.br/lei-18062-de-28-de-dezembro-de-2023/consolidado), art. 39, XVII, distingue a denominação da localização em Santa Efigênia. O slug anterior e a referência de busca *Santa Ifigênia* foram preservados.
- **59º DP:** a [lei municipal de 2023](https://legislacao.prefeitura.sp.gov.br/lei-18062-de-28-de-dezembro-de-2023/consolidado), art. 39, VIII, e uma [notícia municipal de 2026](https://prefeitura.sp.gov.br/web/seguranca_urbana/w/ap%C3%B3s-alerta-do-smart-sampa-gcm-prende-foragido-da-justi%C3%A7a-na-zona-leste) usam *Jardim dos Ipês*; a localização em Jardim Noêmia e o slug anterior foram mantidos como referências territoriais.

O status **ativo** da Fazenda é administrativo. Não comprova horário de atendimento, plantão, telefone ou circunscrição. As 93 unidades continuam marcadas como dados institucionais em verificação no portal.

Os números **60, 61, 71, 76, 79, 82, 84, 86, 88 e 94** não constam nem no projeto nem na lista municipal comparada. Não foram classificados como unidades atuais ausentes apenas por serem lacunas na sequência 1–103. Sua implantação e situação atual exigem evidência oficial específica.

Os guias locais do 55º e do 83º DP foram criados após a auditoria inicial, com registros tipados, zona editorial, ordem central e grafo territorial. A publicação remota depende do deploy desta revisão.

## Reprodução

`bun scripts/audit-district-coverage.ts`

O comando compara os dados locais atuais com o recorte numérico da fonte em `docs/auditoria-delegacias-2026-10-15.json`. Esse recorte registra fonte, data de publicação e data de consulta; não é um catálogo operacional nem ativa integração externa. A diferença esperada após a correção é zero.
