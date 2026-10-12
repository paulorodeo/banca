import type { Autor, SiteSettings } from "../types";

export const marca = {
  completo: "Banca Paulista de Advogados — Plantão e Defesa Criminal",
  abreviado: "Banca Paulista de Advogados",
  curto: "Banca Paulista",
  compacto: "Banca",
};
export const siteSettings: SiteSettings = {
  nome: marca.completo,
  cidade: "São Paulo",
  estado: "SP",
  descricaoCurta: "Portal editorial sobre defesa criminal, delegacias e regiões de São Paulo.",
};
export const autores: Autor[] = [];
