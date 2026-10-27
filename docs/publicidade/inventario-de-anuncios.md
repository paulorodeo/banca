# Inventário de espaços publicitários

O catálogo executável está em `src/config/advertising-placements.ts`. Ele é a autoridade para IDs, status, fornecedor e regras de cada posição. O modo global inicial é `adsense`, mas solicitações reais do Google continuam bloqueadas pela chave de ativação, pelo domínio oficial e pelo consentimento.

| ID | Nome e posição | Implementação | Formato | Mobile | Fornecedor/status |
|---|---|---|---|---|---|
| ATLAS-01 | Hero do Atlas, coluna direita | `src/routes/atlas-brasil.tsx` | Display responsivo, referência 728×90/970×90 | Empilhado após a apresentação | AdSense / ativo |
| ATLAS-02 | Após mapa e controles | `src/routes/atlas-brasil.tsx` | Display responsivo horizontal | Largura total | AdSense / ativo |
| ATLAS-03 | Entre editorias completas | `src/routes/atlas-brasil.tsx` | Display responsivo | Largura total | Off / inativo |
| ATLAS-04 | Final editorial, antes das fontes | `src/routes/atlas-brasil.tsx` | Display responsivo | Largura total | Off / inativo |
| HOME-01 | Após os primeiros destaques | `src/routes/index.tsx` | Display responsivo | Largura total | AdSense / ativo |
| HOME-02 | Após o Atlas da homepage | `src/routes/index.tsx` | Display responsivo | Largura total | Off / inativo |
| NEWS-01 | Após aproximadamente cinco notícias | `src/routes/noticias.tsx` | In-feed fluid | Item independente | AdSense / ativo |
| NEWS-02 | Sidebar da listagem | `src/routes/noticias.tsx` | Display responsivo | Oculto | Off / reservado |
| ARTICLE-01 | Corpo de reportagem longa | `src/components/site/news-article-page.tsx` | In-article fluid | Entre blocos completos | AdSense / ativo |
| ARTICLE-02 | Após reportagem e fontes | `src/components/site/news-article-page.tsx` | Multiplex | Largura total | AdSense / ativo |
| ARTICLE-03 | Sidebar da reportagem | `src/components/site/news-article-page.tsx` | Display responsivo | Oculto abaixo de 900 px | AdSense / ativo |
| REGION-01 | Entre seções regionais | `src/components/site/news-geography-portal.tsx` | Display responsivo | Largura total | AdSense / ativo |
| TERRITORY-01 | Página territorial elegível | A definir na ativação | Display responsivo | Largura total | Off / reservado |

## Modos e seleção

- `adsense`: somente posições ativas que aceitam Google.
- `hybrid`: campanha direta/própria ativa tem prioridade; sem campanha elegível, pode usar AdSense.
- `direct`: somente campanhas diretas ou próprias explicitamente cadastradas.
- `off`: nenhuma posição é renderizada.

Cada posição aceita `adsense`, `direct`, `house` ou `off`. Campanhas aprovadas entram exclusivamente em `DIRECT_CAMPAIGNS`; não há rotação, refresh ou substituição reativa após a inicialização do Google.

## IDs oficiais do Google

- Publisher: `ca-pub-5061534320708000`
- Display: `1053881070`
- In-article: `8409626914`
- Multiplex: `3157300237`
- In-feed: `4913447061`
- Layout key In-feed: `-ef+6l-2u-b0+uf`

O slot Display é reutilizado. Os IDs internos identificam as posições no DOM e no código, mas a receita dessas posições não pode ser separada nos relatórios de unidades do AdSense enquanto o proprietário não criar slots distintos no painel.

## Privacidade e segurança editorial

AdSense só pode carregar em `bancapaulista.org`, após ativação explícita e consentimento aprovado. Homologação usa apenas marcadores visuais. Matérias curtas ou sensíveis e páginas administrativas, de erro, atendimento ou coleta de dados ficam excluídas. Posições territoriais não podem ficar perto de telefone, endereço, formulário, mapa interativo ou controles institucionais.
