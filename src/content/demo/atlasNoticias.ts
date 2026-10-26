import type { AtlasEditorialItem, AtlasLayer } from "../atlas.functions";

const estados: { uf: string; nome: string; regiao: string }[] = [
  { uf: "AC", nome: "Acre", regiao: "Norte" },
  { uf: "AL", nome: "Alagoas", regiao: "Nordeste" },
  { uf: "AP", nome: "Amapá", regiao: "Norte" },
  { uf: "AM", nome: "Amazonas", regiao: "Norte" },
  { uf: "BA", nome: "Bahia", regiao: "Nordeste" },
  { uf: "CE", nome: "Ceará", regiao: "Nordeste" },
  { uf: "DF", nome: "Distrito Federal", regiao: "Centro-Oeste" },
  { uf: "ES", nome: "Espírito Santo", regiao: "Sudeste" },
  { uf: "GO", nome: "Goiás", regiao: "Centro-Oeste" },
  { uf: "MA", nome: "Maranhão", regiao: "Nordeste" },
  { uf: "MT", nome: "Mato Grosso", regiao: "Centro-Oeste" },
  { uf: "MS", nome: "Mato Grosso do Sul", regiao: "Centro-Oeste" },
  { uf: "MG", nome: "Minas Gerais", regiao: "Sudeste" },
  { uf: "PA", nome: "Pará", regiao: "Norte" },
  { uf: "PB", nome: "Paraíba", regiao: "Nordeste" },
  { uf: "PR", nome: "Paraná", regiao: "Sul" },
  { uf: "PE", nome: "Pernambuco", regiao: "Nordeste" },
  { uf: "PI", nome: "Piauí", regiao: "Nordeste" },
  { uf: "RJ", nome: "Rio de Janeiro", regiao: "Sudeste" },
  { uf: "RN", nome: "Rio Grande do Norte", regiao: "Nordeste" },
  { uf: "RS", nome: "Rio Grande do Sul", regiao: "Sul" },
  { uf: "RO", nome: "Rondônia", regiao: "Norte" },
  { uf: "RR", nome: "Roraima", regiao: "Norte" },
  { uf: "SC", nome: "Santa Catarina", regiao: "Sul" },
  { uf: "SP", nome: "São Paulo", regiao: "Sudeste" },
  { uf: "SE", nome: "Sergipe", regiao: "Nordeste" },
  { uf: "TO", nome: "Tocantins", regiao: "Norte" },
];

const editorias: { layer: AtlasLayer; nome: string }[] = [
  { layer: "justica", nome: "Justiça" },
  { layer: "politica", nome: "Política" },
  { layer: "economia", nome: "Economia" },
  { layer: "agronegocio", nome: "Agronegócio" },
  { layer: "clima", nome: "Clima" },
  { layer: "infraestrutura", nome: "Infraestrutura" },
  { layer: "rodovias", nome: "Rodovias" },
  { layer: "populacao", nome: "População" },
  { layer: "noticias", nome: "Notícias gerais" },
];

function slug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const stateStories: AtlasEditorialItem[] = estados.map((state, index) => {
  const editoria = editorias[index % editorias.length]!;
  return {
    id: `demo-uf-${state.uf.toLowerCase()}`,
    titulo: `Pauta demonstrativa: ${editoria.nome.toLowerCase()} em ${state.nome}`,
    resumo: `Texto fictício para demonstrar a camada de ${editoria.nome.toLowerCase()} e a seleção de ${state.nome}. Não descreve um acontecimento real.`,
    categoria: editoria.nome,
    editorias: editoria.layer === "noticias" ? ["noticias"] : ["noticias", editoria.layer],
    ufs: [state.uf],
    ufPrincipal: state.uf,
    regiao: state.regiao,
    isDemo: true,
  };
});

const extraStateStories: AtlasEditorialItem[] = [
  {
    id: "demo-sp-justica",
    titulo: "Pauta demonstrativa: acesso à Justiça e cidadania em São Paulo",
    resumo: "Conteúdo fictício para testar múltiplas manchetes no mesmo estado; não relata decisão ou caso real.",
    categoria: "Justiça",
    editorias: ["noticias", "justica"],
    ufs: ["SP"],
    ufPrincipal: "SP",
    regiao: "Sudeste",
    isDemo: true,
  },
  {
    id: "demo-sp-infraestrutura",
    titulo: "Pauta demonstrativa: mobilidade e infraestrutura em São Paulo",
    resumo: "Exemplo editorial fictício sem referência a obra, órgão ou investimento existente.",
    categoria: "Infraestrutura",
    editorias: ["noticias", "infraestrutura", "rodovias"],
    ufs: ["SP"],
    ufPrincipal: "SP",
    regiao: "Sudeste",
    isDemo: true,
  },
  {
    id: "demo-sp-populacao",
    titulo: "Pauta demonstrativa: serviços públicos e população em São Paulo",
    resumo: "Exemplo fictício para testar a camada População; não apresenta estatísticas nem afirmações sobre serviços reais.",
    categoria: "População",
    editorias: ["noticias", "populacao"],
    ufs: ["SP"],
    ufPrincipal: "SP",
    regiao: "Sudeste",
    isDemo: true,
  },
];

const nationalStories: AtlasEditorialItem[] = editorias.map((editoria, index) => {
  const ufs = index % 2 === 0 ? ["SP", "BA", "AM"] : ["RS", "DF", "PA"];
  return {
    id: `demo-brasil-${slug(editoria.layer)}`,
    titulo: `Pauta demonstrativa nacional: temas de ${editoria.nome.toLowerCase()} em diferentes regiões`,
    resumo: "Texto fictício de abrangência nacional para testar a navegação entre unidades federativas. Não representa fato ou dado real.",
    categoria: editoria.nome,
    editorias: editoria.layer === "noticias" ? ["noticias"] : ["noticias", editoria.layer],
    ufs,
    regiao: "Brasil",
    isDemo: true,
  };
});

const regionalStories: AtlasEditorialItem[] = [
  { regiao: "Norte", ufs: ["AC", "AM", "AP", "PA", "RO", "RR", "TO"] },
  { regiao: "Nordeste", ufs: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"] },
  { regiao: "Centro-Oeste", ufs: ["DF", "GO", "MS", "MT"] },
  { regiao: "Sudeste", ufs: ["ES", "MG", "RJ", "SP"] },
  { regiao: "Sul", ufs: ["PR", "RS", "SC"] },
].map((region, index) => ({
  id: `demo-regiao-${slug(region.regiao)}`,
  titulo: `Pauta demonstrativa: diferentes perspectivas editoriais no ${region.regiao}`,
  resumo: "Exemplo fictício para testar a agregação de estados por macrorregião; não descreve uma ocorrência real.",
  categoria: "Notícias gerais",
  editorias: ["noticias", editorias[index]!.layer],
  ufs: region.ufs,
  regiao: region.regiao,
  isDemo: true,
}));

/** Fixtures sem URL pública, acessíveis apenas quando a flag de demonstração está ativa. */
export const atlasDemoNews: readonly AtlasEditorialItem[] = [
  ...stateStories,
  ...extraStateStories,
  ...nationalStories,
  ...regionalStories,
];
