import type { Autor, SiteSettings } from "../types";

export const editorialIdentity = {
  name: "Banca Paulista",
  description: "Portal editorial independente de informação jurídica, institucional e territorial.",
  disclaimer:
    "A Banca Paulista não é uma sociedade de advocacia, não representa os órgãos públicos listados e não presta atendimento jurídico direto.",
  socialImage: "/images/sp/banca-paulista-social.png",
} as const;

export const marca = {
  completo: editorialIdentity.name,
  abreviado: editorialIdentity.name,
  curto: editorialIdentity.name,
  compacto: "Banca",
};
export const siteSettings: SiteSettings = {
  nome: marca.completo,
  cidade: "São Paulo",
  estado: "SP",
  descricaoCurta: editorialIdentity.description,
};
export const autores: Autor[] = [];
