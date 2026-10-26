/** Estimativas oficiais de população residente por UF, referência 1º jul. 2026. */
export const POPULATION_REFERENCE = "1º de julho de 2026";
export const POPULATION_YEAR = 2026;
export const POPULATION_SOURCE =
  "IBGE — Estimativas da População 2026, tabela Brasil e Unidades da Federação";
export const POPULATION_SOURCE_URL =
  "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2026/estimativa_dou_2026.pdf";
export const BRAZIL_POPULATION_TOTAL = 214_211_951;
export const POPULATION_BY_REGION: Record<string, number> = {
  Norte: 18_929_341,
  Nordeste: 57_366_981,
  "Centro-Oeste": 17_401_676,
  Sudeste: 89_015_421,
  Sul: 31_498_532,
};

export const POPULATION_BY_UF: Record<string, number> = {
  AC: 887_794,
  AL: 3_221_128,
  AP: 809_953,
  AM: 4_360_926,
  BA: 14_889_472,
  CE: 9_302_211,
  DF: 3_009_996,
  ES: 4_150_692,
  GO: 7_495_033,
  MA: 7_024_557,
  MT: 3_950_330,
  MS: 2_946_317,
  MG: 21_460_311,
  PA: 8_756_324,
  PB: 4_182_828,
  PR: 11_952_456,
  PE: 9_583_176,
  PI: 3_392_617,
  RJ: 17_225_410,
  RN: 3_463_737,
  RS: 11_233_317,
  RO: 1_757_338,
  RR: 761_012,
  SC: 8_312_759,
  SP: 46_179_008,
  SE: 2_307_255,
  TO: 1_595_994,
};

export const POPULATION_INTERVALS = [
  { label: "Até 1 milhão", min: 0, max: 999_999, color: "#d9fbff" },
  { label: "1 a 3 milhões", min: 1_000_000, max: 2_999_999, color: "#9deefa" },
  { label: "3 a 7 milhões", min: 3_000_000, max: 6_999_999, color: "#5bd8ed" },
  { label: "7 a 15 milhões", min: 7_000_000, max: 14_999_999, color: "#20b7d2" },
  { label: "15 a 30 milhões", min: 15_000_000, max: 29_999_999, color: "#0984ab" },
  { label: "Mais de 30 milhões", min: 30_000_000, max: Infinity, color: "#075879" },
] as const;

export function populationColor(value: number | undefined): string {
  if (value === undefined) return "#3d5365";
  return (
    POPULATION_INTERVALS.find((range) => value >= range.min && value <= range.max)?.color ??
    "#3d5365"
  );
}
