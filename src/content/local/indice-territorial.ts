import type { Bairro, Delegacia, Regiao, Zona } from "../types";

export type TipoTerritorio = "bairro" | "distrito-administrativo" | "localidade-editorial";

export interface TerritorioIndice {
  id: string;
  nome: string;
  tipo: TipoTerritorio;
  zona: string;
  paginaBairro?: string;
  guias: { slug: string; numero: string; nome: string }[];
  referenciasBusca: string[];
}

// Classificação editorial explícita. A referência para os distritos é a Lei
// municipal 11.220/1992, art. 2º. O nome do DP não determina o tipo do lugar.
// https://legislacao.prefeitura.sp.gov.br/lei-11220-de-20-de-maio-de-1992
const distritosAdministrativos = new Set([
  "itaim-bibi",
  "campo-belo",
  "morumbi",
  "butanta",
  "perdizes",
  "santo-amaro",
  "jaguare",
  "raposo-tavares",
  "jabaquara",
  "campo-grande",
  "moema-vila-mariana",
  "ipiranga",
  "sacoma",
  "socorro",
  "campo-limpo",
  "cidade-ademar",
  "cidade-dutra",
  "capao-redondo",
  "parelheiros",
  "penha",
  "ponte-rasa",
  "tatuape",
  "guaianases",
  "sao-mateus",
  "itaim-paulista",
  "parque-do-carmo",
  "cidade-tiradentes",
  "vila-formosa",
  "ermelino-matarazzo",
  "vila-jacui",
  "artur-alvim",
  "lajeado",
  "sapopemba",
  "belem",
  "casa-verde",
  "vila-maria",
  "freguesia-do-o",
  "pirituba",
  "perus",
  "jacana",
  "jaragua",
  "bom-retiro",
  "consolacao",
  "cambuci",
  "santa-cecilia",
  "liberdade-1-dp",
  "liberdade-5-dp",
  "itaquera",
  "itaquera-103-dp",
  "bras",
  "bras-12-dp",
  "vila-leopoldina",
]);

const bairros = new Set([
  "pinheiros",
  "portal-do-morumbi",
  "lapa",
  "vila-mariana",
  "parque-santo-antonio",
  "jardim-herculano",
  "vila-joaniza",
  "jardim-miriam",
  "americanopolis",
  "jardim-imbuias",
  "jardim-mirna",
  "heliopolis",
  "parque-bristol",
  "alto-da-mooca",
  "chacara-seis-de-outubro",
  "vila-americana",
  "vila-diva",
  "vila-rica",
  "parque-sao-lucas",
  "parque-sao-jorge",
  "parque-sao-rafael",
  "vila-alpina",
  "parque-da-mooca",
  "cidade-a-e-carvalho",
  "jardim-aricanduva",
  "jardim-robru",
  "teotonio-vilela",
  "carandiru",
  "jardim-franca",
  "vila-amalia",
  "vila-gustavo",
  "vila-santa-maria",
  "vila-brasilandia",
  "vila-penteado",
  "vila-pereira-barreto",
  "parque-novo-mundo",
]);

// Os nomes compostos dos registros antigos identificam guias, não um bairro único.
const nomesTerritoriais: Record<string, string> = {
  lapa: "Vila Romana",
  "vila-leopoldina": "Vila Leopoldina",
  "raposo-tavares": "Raposo Tavares",
  "campo-grande": "Campo Grande",
  "moema-vila-mariana": "Vila Mariana",
  socorro: "Socorro",
  "cidade-dutra": "Cidade Dutra",
  parelheiros: "Parelheiros",
  itaquera: "Itaquera",
  "itaquera-103-dp": "Itaquera",
  "liberdade-1-dp": "Liberdade",
  "liberdade-5-dp": "Liberdade",
  "bras-12-dp": "Brás",
};

// Identidades de território independentes dos slugs legados de unidades.
const slugTerritorialPorRegiao: Record<string, string> = {
  "itaquera-103-dp": "itaquera",
  "liberdade-1-dp": "liberdade",
  "liberdade-5-dp": "liberdade",
  "bras-12-dp": "bras",
  "santa-ifigenia": "campos-eliseos",
};

const normalized = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

export function filtrarTerritorios(territorios: TerritorioIndice[], busca: string, zona: string) {
  const termo = normalized(busca.trim());
  return territorios.filter(
    (territorio) =>
      (zona === "todas" || territorio.zona === zona) &&
      (!termo ||
        [territorio.nome, ...territorio.referenciasBusca].some((nome) =>
          normalized(nome).includes(termo),
        )),
  );
}

export function montarIndiceTerritorial(
  regioes: Regiao[],
  delegacias: Delegacia[],
  bairrosPublicados: Bairro[],
  zonas: Zona[],
): TerritorioIndice[] {
  const guiasPorRegiao = new Map<string, Delegacia[]>();
  for (const guia of delegacias) {
    const lista = guiasPorRegiao.get(guia.regiaoSlug) ?? [];
    lista.push(guia);
    guiasPorRegiao.set(guia.regiaoSlug, lista);
  }
  const paginas = new Map(
    bairrosPublicados
      .filter((bairro) => bairro.status === "publicado")
      .map((bairro) => [bairro.slug, bairro]),
  );
  const zonasValidas = new Set(zonas.map((zona) => zona.slug));
  const territorios = new Map<string, TerritorioIndice>();

  for (const regiao of regioes) {
    if (!zonasValidas.has(regiao.zona)) continue;
    const nome = nomesTerritoriais[regiao.slug] ?? regiao.nome;
    const chave = slugTerritorialPorRegiao[regiao.slug] ?? regiao.slug;
    const existente = territorios.get(chave);
    const pagina = paginas.get(chave);
    const tipo: TipoTerritorio = distritosAdministrativos.has(regiao.slug)
      ? "distrito-administrativo"
      : bairros.has(regiao.slug)
        ? "bairro"
        : "localidade-editorial";
    const territorio: TerritorioIndice = existente ?? {
      id: `territorio-${chave}`,
      nome,
      tipo,
      // Brás aparece nos registros policiais do Centro e da Leste; o índice
      // territorial o apresenta uma vez na Leste, com os dois guias.
      zona: nome === "Brás" ? "zona-leste" : regiao.zona,
      ...(pagina ? { paginaBairro: `/bairros/${pagina.slug}` } : {}),
      guias: [],
      referenciasBusca: [],
    };
    for (const guia of guiasPorRegiao.get(regiao.slug) ?? []) {
      if (!territorio.guias.some((item) => item.slug === guia.slug)) {
        territorio.guias.push({
          slug: guia.slug,
          numero: guia.unidade.numero,
          nome: guia.cardSubtitulo,
        });
      }
    }
    // Apenas variantes documentadas do mesmo nome entram na busca. Lugares
    // distintos citados como referência em um guia não viram sinônimos.
    if (regiao.slug === "artur-alvim") territorio.referenciasBusca.push("Arthur Alvim");
    territorios.set(chave, territorio);
  }

  // A documentação dos 3º e 59º DPs distingue a denominação da unidade da
  // localidade onde ela está situada. Ambas aparecem como lugares próprios.
  for (const referencia of [
    {
      nome: "Santa Ifigênia",
      regiaoSlug: "santa-ifigenia",
      zona: "centro",
      variantes: ["Santa Efigênia"],
    },
    { nome: "Jardim Noêmia", regiaoSlug: "jardim-noemia", zona: "zona-leste", variantes: [] },
  ]) {
    const guias = (guiasPorRegiao.get(referencia.regiaoSlug) ?? []).map((guia) => ({
      slug: guia.slug,
      numero: guia.unidade.numero,
      nome: guia.cardSubtitulo,
    }));
    const paginaLocalidade = paginas.get(`${referencia.regiaoSlug}-localidade`);
    territorios.set(`${referencia.regiaoSlug}-localidade`, {
      id: `territorio-${referencia.regiaoSlug}-localidade`,
      nome: referencia.nome,
      tipo: "localidade-editorial",
      zona: referencia.zona,
      ...(paginaLocalidade ? { paginaBairro: `/bairros/${paginaLocalidade.slug}` } : {}),
      guias,
      referenciasBusca: referencia.variantes,
    });
  }

  return [...territorios.values()].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}
