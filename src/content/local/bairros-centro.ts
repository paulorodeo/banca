import type { Bairro, Delegacia, Regiao } from "../types";
import { delegacias } from "./delegacias";
import { regioesCentro } from "./delegacias-norte-centro";

const localCopy: Record<string, { intro: string; context: string; issue: string }> = {
  liberdade: {
    intro:
      "Liberdade é uma única referência territorial neste índice e possui dois guias policiais relacionados, cada qual identificado pelo número da unidade.",
    context:
      "O material editorial fornecido para o Centro descreve Liberdade por suas atividades culturais, comerciais e residenciais. Essa referência não define limites administrativos nem determina a competência de instituições.",
    issue:
      "O 1º e o 5º DP permanecem como destinos policiais distintos. O nome Liberdade, isoladamente, não indica qual unidade é responsável por um endereço ou procedimento.",
  },
  "bom-retiro": {
    intro:
      "Bom Retiro é uma das localidades listadas pelo proprietário para a região central e conta com uma página territorial própria.",
    context:
      "O texto fornecido descreve a tradição comercial e a diversidade cultural do Bom Retiro. Esta página usa esses elementos como contexto editorial, sem atribuir as mesmas características a todos os imóveis ou atividades locais.",
    issue:
      "Locação comercial, contratos, relações de consumo e documentação imobiliária podem ser temas de consulta. O guia relacionado do 2º DP mantém página e destino próprios, sem afirmar atendimento territorial.",
  },
  "campos-eliseos": {
    intro:
      "Campos Elíseos é mantido como nome territorial separado da denominação institucional do 3º DP.",
    context:
      "A localidade integra as referências centrais fornecidas para este portal. A relação editorial com o guia do 3º DP não declara limites, localização de toda a unidade ou competência policial para um endereço.",
    issue:
      "A identificação corrigida do 3º DP permanece na página policial canônica. Consulte o guia pelo número da unidade e confirme atribuições nos canais oficiais.",
  },
  consolacao: {
    intro:
      "Consolação integra o conjunto de localidades centrais publicadas e possui uma página própria para organizar a navegação territorial.",
    context:
      "O conteúdo fornecido destaca circulação comercial e serviços como parte do contexto editorial da Consolação. A descrição não estabelece um recorte administrativo oficial nem uma regra de atendimento.",
    issue:
      "Imóveis, contratos, relações de consumo e locações podem suscitar dúvidas conforme a situação. O guia relacionado ao 4º DP permanece em página própria e não define a unidade competente para cada caso.",
  },
  cambuci: {
    intro:
      "Cambuci é apresentado como localidade central com página territorial própria e navegação de retorno ao hub do Centro.",
    context:
      "O texto fornecido descreve Cambuci em relação a usos residenciais, comerciais e referências históricas. Esses elementos não tornam uniforme a situação de cada imóvel ou morador.",
    issue:
      "Documentação imobiliária, reformas, locações e relações de vizinhança são temas editoriais possíveis. O guia do 6º DP é um destino separado, identificado pelo número da unidade.",
  },
  "santa-cecilia": {
    intro:
      "Santa Cecília tem página territorial própria entre as referências editoriais da região central.",
    context:
      "O material fornecido cita imóveis residenciais, comércio e serviços em Santa Cecília. Esta referência ajuda a situar a navegação, sem criar limites oficiais ou atribuir competência a órgãos próximos.",
    issue:
      "A página regional apresenta temas como locação, condomínios, documentação e convivência urbana. O guia do 77º DP conserva sua URL e seu conteúdo policial em separado.",
  },
  "santa-ifigenia-localidade": {
    intro:
      "Santa Ifigênia é uma localidade editorial própria, distinta de Campos Elíseos no índice do portal.",
    context:
      "Os dois nomes aparecem separadamente nos registros territoriais usados pelo projeto. Uma referência de localidade no contexto de um guia policial não os torna sinônimos nem estabelece limites entre eles.",
    issue:
      "Esta página não atribui uma instituição específica a Santa Ifigênia sem relação documentada. Consulte os guias publicados e confirme localização e competência nos canais oficiais.",
  },
};

function guidesFor(regions: Regiao[]): Delegacia[] {
  const slugs = new Set(regions.map((region) => region.slug));
  return delegacias.filter((guide) => slugs.has(guide.regiaoSlug));
}

function makePage(slug: string, name: string, regions: Regiao[]): Bairro {
  const copy = localCopy[slug]!;
  const guides = guidesFor(regions);
  const guideTitles = guides.map((guide) => `${guide.cardTitulo} ${guide.cardSubtitulo}`);
  return {
    id: `bairro-${slug}`,
    slug,
    nome: name,
    zona: "centro",
    status: "publicado",
    descricao: `Página territorial de ${name}, com contexto editorial e navegação pela região central de São Paulo.`,
    introducao: copy.intro,
    ...(slug.includes("localidade")
      ? {
          recorteTerritorial:
            "Localidade editorial; não representa uma classificação administrativa oficial.",
        }
      : {}),
    referenciasUrbanas: [name],
    bairrosVizinhos: [],
    instituicoes: guides.map((guide) => ({
      id: `${slug}-${guide.id}`,
      category: "delegacias",
      institutionSlug: guide.slug,
      institutionType: "delegacia",
      relation: "relacionada",
      relationLabel: `Guia editorial relacionado a ${name}; não determina localização ou competência`,
    })),
    secoes: [
      { titulo: `Referências territoriais de ${name}`, paragrafos: [copy.context] },
      {
        titulo: "Informação jurídica e institucional",
        paragrafos: [
          copy.issue,
          guideTitles.length
            ? `Guias relacionados: ${guideTitles.join(" e ")}. Cada opção leva à página informativa da unidade identificada; a relação editorial não define circunscrição ou atendimento.`
            : "Não há guia policial relacionado a esta página no cadastro. Isso não permite concluir que não existam unidades ou serviços públicos na localidade.",
        ],
      },
      {
        titulo: "Navegação pela região central",
        paragrafos: [
          "O hub do Centro reúne as páginas territoriais disponíveis e os guias policiais publicados. Os dois tipos de conteúdo possuem destinos próprios e não substituem informações dos órgãos competentes.",
        ],
      },
    ],
    faq: [
      {
        id: `${slug}-recorte`,
        pergunta: `Esta página estabelece os limites oficiais de ${name}?`,
        resposta:
          "Não. Ela apresenta um recorte editorial para organizar a navegação e não substitui divisões administrativas ou institucionais.",
      },
      {
        id: `${slug}-instituicao`,
        pergunta: "A relação com um guia policial indica a unidade competente?",
        resposta:
          "Não. A associação editorial não define competência nem circunscrição. Confirme a unidade responsável nos canais oficiais conforme o endereço e o procedimento.",
      },
    ],
    seo: {
      title: `${name}: informação territorial no Centro de São Paulo | Banca Paulista`,
      description: `Conheça ${name} pelas referências editoriais e conteúdos publicados para a região central de São Paulo.`,
      canonicalPath: `/bairros/${slug}`,
    },
  };
}

const grouped = new Map<string, Regiao[]>();
for (const region of regioesCentro) {
  const slug = region.territorioSlug ?? region.slug;
  grouped.set(slug, [...(grouped.get(slug) ?? []), region]);
}

export const bairrosCentro: Bairro[] = [
  ...[...grouped].flatMap(([slug, regions]) => {
    if (slug === "bras") return [];
    const pageSlug = slug;
    const name = regions[0]!.nome;
    return [makePage(pageSlug, name, regions)];
  }),
  makePage("santa-ifigenia-localidade", "Santa Ifigênia", []),
];
