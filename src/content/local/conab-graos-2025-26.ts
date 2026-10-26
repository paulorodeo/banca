/** Produção total de grãos por UF. Série histórica Conab atualizada em 15/10/2026. */
export const GRAIN_HARVEST = "2025/26";
export const GRAIN_UNIT = "mil toneladas";
export const GRAIN_REFERENCE = "estimativa da safra 2025/26 na atualização de 15/10/2026";
export const GRAIN_SOURCE = "Conab — Série Histórica de Produção por Unidades da Federação";
export const GRAIN_SOURCE_URL =
  "https://www.gov.br/conab/pt-br/atuacao/informacoes-agropecuarias/safras/series-historicas/graos/graos-por-unidades-da-federacao";
export const BRAZIL_GRAIN_PRODUCTION = 362_236.4;

/** Soma de grãos da série; não representa o conjunto da agropecuária. */
export const GRAIN_PRODUCTION_BY_UF: Record<string, number> = {
  AC: 240.5,
  AL: 127.4,
  AP: 35.1,
  AM: 99.4,
  BA: 15_137.8,
  CE: 879.3,
  DF: 945.4,
  ES: 68.0,
  GO: 33_314.9,
  MA: 9_045.6,
  MT: 115_511.8,
  MS: 31_379.3,
  MG: 19_057.0,
  PA: 8_344.9,
  PB: 77.7,
  PR: 47_052.5,
  PE: 353.5,
  PI: 7_509.3,
  RJ: 8.3,
  RN: 49.4,
  RS: 36_417.1,
  RO: 5_308.2,
  RR: 615.3,
  SC: 7_931.6,
  SP: 12_281.5,
  SE: 716.1,
  TO: 9_729.5,
};

export const GRAIN_PRODUCTION_INTERVALS = [
  { label: "Até 1 mil t", min: 0, max: 999.9, color: "#d9fbff" },
  { label: "1 a 5 mil t", min: 1_000, max: 4_999.9, color: "#9deefa" },
  { label: "5 a 15 mil t", min: 5_000, max: 14_999.9, color: "#5bd8ed" },
  { label: "15 a 35 mil t", min: 15_000, max: 34_999.9, color: "#20b7d2" },
  { label: "35 a 60 mil t", min: 35_000, max: 59_999.9, color: "#0984ab" },
  { label: "Mais de 60 mil t", min: 60_000, max: Infinity, color: "#075879" },
] as const;

export function grainProductionColor(value: number | undefined): string {
  if (value === undefined) return "#3d5365";
  return (
    GRAIN_PRODUCTION_INTERVALS.find((range) => value >= range.min && value <= range.max)?.color ??
    "#3d5365"
  );
}
