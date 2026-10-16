import type { PublicInstitution } from "../types";

/**
 * Fichas institucionais publicadas. Elas não atribuem competência territorial,
 * não apresentam canais de atendimento e remetem às páginas oficiais para
 * confirmação de serviços e atribuições.
 */
export const instituicoes: PublicInstitution[] = [
  {
    id: "mpsp-gecradi",
    slug: "gecradi",
    nomeOficial: "Grupo Especial de Combate aos Crimes Raciais e de Intolerância",
    sigla: "GECRADI",
    tipo: "departamento",
    categoria: "ministerio-publico",
    descricao:
      "Estrutura de atuação especial do Ministério Público do Estado de São Paulo voltada ao enfrentamento de crimes raciais e de intolerância. Segundo o MPSP, sua atuação abrange a identificação, a prevenção e a repressão de delitos de intolerância, preconceito e discriminação contra pessoas ou grupos.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Página institucional",
        valor: "Consultar GECRADI no MPSP",
        href: "https://www.mpsp.mp.br/gecradi",
      },
    ],
    fontes: [
      {
        titulo: "GECRADI — Ministério Público do Estado de São Paulo",
        url: "https://www.mpsp.mp.br/gecradi",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "GECRADI | Ministério Público de São Paulo — Banca Paulista",
      description:
        "Ficha editorial do GECRADI, grupo especial do Ministério Público do Estado de São Paulo voltado ao enfrentamento de crimes raciais e de intolerância.",
      canonicalPath: "/instituicoes/gecradi",
    },
  },
  {
    id: "mpsp-gaeco",
    slug: "gaeco",
    nomeOficial: "Grupo de Atuação Especial de Combate ao Crime Organizado",
    sigla: "GAECO",
    tipo: "departamento",
    categoria: "ministerio-publico",
    descricao:
      "Estrutura de atuação especial do Ministério Público do Estado de São Paulo dedicada ao enfrentamento do crime organizado. O grupo integra a organização de grupos de atuação especial do MPSP e atua em temas relacionados à criminalidade organizada, conforme suas atribuições institucionais.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Página institucional",
        valor: "Consultar GAECO no MPSP",
        href: "https://www.mpsp.mp.br/gaeco",
      },
    ],
    fontes: [
      {
        titulo: "GAECO — Ministério Público do Estado de São Paulo",
        url: "https://www.mpsp.mp.br/gaeco",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Grupos de Atuação Especial — Ministério Público do Estado de São Paulo",
        url: "https://www.mpsp.mp.br/grupos-de-atuacao-especial",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "GAECO | Ministério Público de São Paulo — Banca Paulista",
      description:
        "Ficha editorial do GAECO, grupo de atuação especial do Ministério Público do Estado de São Paulo dedicado ao enfrentamento do crime organizado.",
      canonicalPath: "/instituicoes/gaeco",
    },
  },
];
