import type { Zona } from "../types";

/**
 * Arquitetura regional da cidade: cinco macro-zonas que organizam as páginas
 * territoriais. Cada região da home (`regioes.ts`) declara a zona a que
 * pertence, permitindo sinalização geográfica ("Bairro • Zona Sul •
 * São Paulo — SP") e páginas-pilar por zona em /regioes/$slug.
 */
export const zonas: Zona[] = [
  {
    id: "zona-centro",
    slug: "centro",
    nome: "Centro",
    descricao:
      "Região histórica e de intensa circulação, com páginas territoriais em consolidação.",
    introducao:
      "O Centro de São Paulo concentra equipamentos públicos, comércio intenso e uma trama urbana densa, em que procedimentos variados tramitam nas unidades policiais da região central.",
    secoes: [
      {
        titulo: "Cobertura em expansão",
        paragrafos: [
          "As páginas territoriais do Centro estão sendo publicadas de forma gradual, lote a lote, sempre com o mesmo padrão editorial das demais regiões: contexto territorial, bairros de referência, situações frequentes e observações sobre circunscrição.",
          "Enquanto a cobertura não está consolidada, o índice geral de delegacias reúne as páginas já publicadas e as regiões publicadas em todo o município.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-norte",
    slug: "zona-norte",
    nome: "Zona Norte",
    descricao:
      "Território entre a Serra da Cantareira e os eixos de Santana e Tucuruvi, com cobertura em consolidação.",
    introducao:
      "A Zona Norte reúne bairros residenciais consolidados e eixos comerciais ao longo das linhas de transporte da região, com demandas variadas distribuídas entre as unidades policiais locais.",
    secoes: [
      {
        titulo: "Cobertura em expansão",
        paragrafos: [
          "As páginas territoriais da Zona Norte serão publicadas de forma gradual, lote a lote, mantendo o padrão editorial das demais regiões.",
          "Enquanto a cobertura não está consolidada, o índice geral de delegacias reúne as páginas já publicadas em todo o município.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-leste",
    slug: "zona-leste",
    nome: "Zona Leste",
    descricao:
      "Maior extensão territorial da capital, com eixos residenciais e comerciais em consolidação editorial.",
    introducao:
      "A Zona Leste abrange uma das maiores extensões territoriais da cidade, com bairros de perfis muito distintos e unidades policiais que concentram grande volume de procedimentos.",
    secoes: [
      {
        titulo: "Cobertura em expansão",
        paragrafos: [
          "As páginas territoriais da Zona Leste serão publicadas de forma gradual, lote a lote, mantendo o padrão editorial das demais regiões.",
          "Enquanto a cobertura não está consolidada, o índice geral de delegacias reúne as páginas já publicadas em todo o município.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-sul",
    slug: "zona-sul",
    nome: "Zona Sul",
    descricao:
      "Páginas territoriais nos eixos Santo Amaro, Jabaquara, M'Boi Mirim, Grajaú e Cidade Dutra.",
    introducao:
      "A Zona Sul reúne bairros com diferentes perfis urbanos. O guia editorial acompanha os eixos Santo Amaro, Jabaquara, Cidade Ademar, M'Boi Mirim, Interlagos e Grajaú.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "A região reúne páginas de referência nos eixos Santo Amaro, Brooklin, Campo Belo, Morumbi, Jabaquara, Ipiranga, Sacomã, Cidade Ademar, Capão Redondo, Campo Limpo, Socorro, Cidade Dutra, Parque Santo Antônio, Jardim Herculano, Vila Joaniza, Americanópolis, Jardim Miriam, Jardim Imbuias, Jardim Mirna, Heliópolis e Parelheiros, no extremo sul da cidade.",
          "Os bairros citados são referências geográficas. A confirmação da unidade responsável depende do endereço exato dos fatos e dos canais oficiais da Polícia Civil.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-oeste",
    slug: "zona-oeste",
    nome: "Zona Oeste",
    descricao:
      "Cobertura publicada em Pinheiros, Butantã, Lapa, Perdizes, Vila Leopoldina, Jaguaré, Raposo Tavares e Jardins.",
    introducao:
      "A Zona Oeste reúne eixos residenciais, acadêmicos e empresariais de alto padrão, com páginas de referência nos distritos de Pinheiros, Butantã, Lapa, Perdizes, Vila Leopoldina, Jaguaré, Raposo Tavares e Jardins.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "A região reúne páginas de referência em Pinheiros, Butantã, Perdizes, Lapa e Vila Romana, Vila Leopoldina e CEAGESP, Jaguaré, Raposo Tavares e Jardim Arpoador e Jardins, com atenção às particularidades de cada distrito e às unidades policiais responsáveis.",
          "Novas unidades da região continuam sendo incorporadas lote a lote, mantendo o mesmo padrão editorial e a mesma observação sobre circunscrição.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
];

const NOME_POR_SLUG = new Map(zonas.map((zona) => [zona.slug, zona.nome]));

/** Nome de exibição da zona a partir do slug (fallback neutro). */
export function nomeDaZona(slug: string): string {
  return NOME_POR_SLUG.get(slug) ?? "São Paulo";
}

/** Artigo correto antes do nome da zona ("no Centro", "na Zona Sul"). */
export function artigoDaZona(slug: string): "no" | "na" {
  return slug === "centro" ? "no" : "na";
}
