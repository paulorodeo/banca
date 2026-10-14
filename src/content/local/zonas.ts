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
      "Guias de delegacias nas referências Liberdade, Bom Retiro, Santa Ifigênia, Consolação, Cambuci, Brás e Santa Cecília.",
    introducao:
      "O Centro de São Paulo concentra equipamentos públicos, comércio intenso e uma trama urbana densa, em que procedimentos variados tramitam nas unidades policiais da região central.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "Os cards reúnem guias de oito distritos policiais. Os dois guias de Liberdade distinguem o 1º e o 5º DP pelo número da unidade; o 12º DP, com referência Brás, é distinto do 8º DP, listado na Zona Leste.",
          "Este agrupamento organiza a navegação do portal e não corresponde a uma divisão administrativa da Polícia Civil. Bairros e zonas não definem a unidade responsável por um endereço.",
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
      "Guias de delegacias nos eixos Santana, Casa Verde, Vila Maria, Tremembé, Brasilândia, Pirituba e Perus.",
    introducao:
      "A Zona Norte reúne bairros residenciais consolidados e eixos comerciais ao longo das linhas de transporte da região, com demandas variadas distribuídas entre as unidades policiais locais.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "Os cards reúnem guias de 16 distritos policiais, com referências como Carandiru, Casa Verde, Vila Maria, Freguesia do Ó, Pirituba, Jaçanã, Jaraguá, Perus e Parque Novo Mundo.",
          "Este agrupamento organiza a navegação do portal e não corresponde a uma divisão administrativa da Polícia Civil. Bairros e zonas não definem a unidade responsável por um endereço.",
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
      "Guias de delegacias nos eixos Brás, Mooca, Penha, Tatuapé, Itaquera, São Miguel, São Mateus e extremo leste.",
    introducao:
      "A Zona Leste reúne referências territoriais de Brás e Mooca até Itaquera, Guaianases, Cidade Tiradentes e Itaim Paulista. Os guias identificam unidades e explicam documentos e procedimentos, sem delimitar circunscrição policial.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "Os cards reúnem guias de 33 distritos policiais, com referências como Penha, Ponte Rasa, Vila Carrão, Vila Formosa, Parque São Lucas, Ermelino Matarazzo, Vila Jacuí, São Mateus e Sapopemba. Os dois guias de Itaquera distinguem o 32º e o 103º DP pelo número da unidade.",
          "Brás é incluído como referência editorial de transição entre Centro e Zona Leste. Este agrupamento organiza a navegação do portal e não corresponde a uma divisão administrativa da Polícia Civil. Bairros e zonas não definem a unidade responsável por um endereço.",
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
