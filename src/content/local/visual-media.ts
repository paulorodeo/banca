/** Fotografias reais, com derivados próprios para cards e miniaturas. */
export interface ZonePhotograph {
  asset: string;
  alt: string;
  width: number;
  height: number;
  position: string;
}

export const zonePhotography: Record<string, ZonePhotograph> = {
  centro: {
    asset: "masp-card",
    alt: "MASP na Avenida Paulista, referência metropolitana central",
    width: 800,
    height: 450,
    position: "65% 50%",
  },
  "zona-norte": {
    asset: "braz-leme-card",
    alt: "Avenida Braz Leme, com circulação urbana e edifícios na Zona Norte",
    width: 800,
    height: 450,
    position: "58% 50%",
  },
  "zona-leste": {
    asset: "tatuape-card",
    alt: "Skyline do Tatuapé junto à Radial Leste e ao corredor metroferroviário",
    width: 800,
    height: 450,
    position: "48% 54%",
  },
  "zona-sul": {
    asset: "ponte-card",
    alt: "Ponte Estaiada na Zona Sul de São Paulo",
    width: 800,
    height: 450,
    position: "58% 50%",
  },
  "zona-oeste": {
    asset: "pinheiros-aerea-card",
    alt: "Vista aérea de Pinheiros, com Largo da Batata e Igreja Nossa Senhora de Monte Serrate",
    width: 800,
    height: 450,
    position: "48% 56%",
  },
};

export const featuredNeighborhoods = [
  {
    territorioId: "pinheiros",
    asset: "pinheiros-aerea-thumb",
    alt: "Largo da Batata, em Pinheiros",
  },
  { territorioId: "santo-amaro", asset: "santo-amaro-thumb", alt: "Estação Santo Amaro" },
  { territorioId: "carandiru", asset: "carandiru-thumb", alt: "Paisagem urbana do Carandiru" },
  { territorioId: "tatuape", asset: "tatuape-thumb", alt: "Tatuapé e Radial Leste" },
  { territorioId: "lapa", asset: "lapa-thumb", alt: "Mercado Municipal da Lapa" },
  {
    territorioId: "butanta",
    asset: "butanta-thumb",
    alt: "Panorama da Zona Oeste visto do Butantã",
  },
  { territorioId: "itaquera", asset: "itaquera-thumb", alt: "Estação Corinthians-Itaquera" },
  { territorioId: "liberdade", asset: "liberdade-thumb", alt: "Rua e luminárias da Liberdade" },
  {
    territorioId: "parque-do-carmo",
    asset: "parque-do-carmo-thumb",
    alt: "Lago do Parque do Carmo",
  },
  {
    territorioId: "brooklin",
    asset: "brooklin-thumb",
    alt: "Ponte Estaiada na região do Brooklin",
  },
];

export const photoCredits = [
  {
    name: "Carandiru",
    author: "Lukaaz",
    source: "https://commons.wikimedia.org/wiki/File:Bairro_do_Carandiru,_SP_-_by_Lucas.JPG",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  },
  {
    name: "Parque do Carmo",
    author: "Lukaaz",
    source:
      "https://commons.wikimedia.org/wiki/File:Panorama_do_lago_do_Pq._do_Carmo_-_by_Lucas.jpg",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  },
  {
    name: "Pinheiros",
    author: "Ronit Bhattacharjee (Slyronit)",
    source: "https://commons.wikimedia.org/wiki/File:Pinheiros,_Sao_Paulo_2.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    name: "Skyline of Tatuape near Shopping Tatuape and Radial Leste - panoramio",
    author: "Larry LaRose",
    source:
      "https://commons.wikimedia.org/wiki/File:Skyline_of_Tatuape_near_Shopping_Tatuape_and_Radial_Leste_-_panoramio.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    name: "Avenida Braz Leme 2024",
    author: "Pedu0303",
    source: "https://commons.wikimedia.org/wiki/File:Avenida_Braz_Leme_2024.jpg",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    name: "Panorama de São Paulo - Diurno",
    author: "TiagoLubiana",
    source: "https://commons.wikimedia.org/wiki/File:Panorama_de_S%C3%A3o_Paulo_-_Diurno.jpg",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    name: "Estação Santo Amaro Linha 5",
    author: "Fulvio Magalhães Lima de Souza",
    source: "https://commons.wikimedia.org/wiki/File:Esta%C3%A7%C3%A3o_Santo_Amaro_Linha_5.jpg",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/File:Esta%C3%A7%C3%A3o_Santo_Amaro_Linha_5.jpg",
  },
  {
    name: "Mercado Municipal da Lapa 03",
    author: "Dornicke",
    source: "https://commons.wikimedia.org/wiki/File:Mercado_Municipal_da_Lapa_03.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    name: "São Paulo Subway Corinthians Itaquera",
    author: "Legionarius",
    source:
      "https://commons.wikimedia.org/wiki/File:S%C3%A3o_Paulo_Subway_Corinthians_Itaquera.JPG",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    name: "Liberdade of Sao Paulo",
    author: "Wilfredor",
    source: "https://commons.wikimedia.org/wiki/File:Liberdade_of_Sao_Paulo.jpg",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    name: "Vista aérea de Pinheiros — Largo da Batata",
    author: "Marcos Santos/USP Imagens",
    source: "https://imagens.usp.br/editorias/lugares-categorias/vista-aerea-de-pinheiros/",
    license: "Reprodução livre mediante crédito ao fotógrafo e à USP Imagens",
    licenseUrl: "https://imagens.usp.br/editorias/lugares-categorias/vista-aerea-de-pinheiros/",
  },
];

/** Ilustrações de apoio; não representam documentos, pessoas ou fachadas dos artigos. */
export const editorialIllustrations: Record<string, string> = {
  "delegacias-e-circunscricao-policial": "masp",
  "plantao-criminal-e-plantao-judiciario": "ponte",
  "intimacao-policial-informacoes-do-documento": "participacao-profissional",
};
