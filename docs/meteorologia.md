# Meteorologia de São Paulo

Página única: `/previsao-do-tempo`. O ticker global e a página consultam
`/api/public/tempo` com a mesma chave React Query e atualização de 15 minutos.
O relógio usa `Intl.DateTimeFormat` com `America/Sao_Paulo`, sem API externa.

## Configuração

`WEATHERAPI_KEY` é um secret de servidor. Na homologação, configure-o no Worker
`banca` pelo painel ou pelo comando interativo `wrangler secret put WEATHERAPI_KEY`.
Nunca use prefixos `VITE_` ou `PUBLIC_`, nem versionamento da chave. Sem a chave,
o endpoint devolve HTTP 503 com `weather_not_configured`; a página explica a
indisponibilidade e não apresenta dados simulados.

`vite.config.ts` inclui o binding `WEATHER_CACHE` somente no build de homologação,
apontando para o namespace exclusivo `BANCA_WEATHER_STAGING`. Produção precisará
de configuração separada quando sua publicação for autorizada.

## Cache e provedor

O KV compartilha os snapshots por 900 segundos entre instâncias. Uma memória
local e uma promessa em andamento reduzem leituras e chamadas concorrentes.
KV tem consistência eventual: misses simultâneos em localidades distintas podem
gerar mais de uma consulta, sem garantia de limite global estrito. Falhas do
provedor ficam em cache por 60 segundos; dados expirados não são apresentados.
O cache armazena somente o snapshot normalizado, nunca a chave ou URL do provedor.

`weather-provider.server.ts` isola WeatherAPI da interface. O contrato público
fica em `weather-model.ts`, com validação da resposta antes de armazenamento.
Não há outro provedor ativo. Os testes usam fixtures, nunca dados exibidos ao público.

## Widget independente

A lateral de `/noticias` incorpora o iframe oficial Clima & Radar, com
`geoObjectKey=3705599` (São Paulo), lazy loading e altura reservada de 318 px.
Ele não participa do cache WeatherAPI nem injeta scripts no documento principal.
