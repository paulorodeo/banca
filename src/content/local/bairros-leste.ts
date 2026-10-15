import type { Bairro } from "../types";
import { delegaciasLeste, distritosLeste } from "./delegacias-leste";

const territorioSlug = (numero: number, slug: string) => (numero === 103 ? "itaquera" : slug);

const eixoEditorial: Record<string, { titulo: string; texto: string }> = {
  mooca: {
    titulo: "Referências do eixo Mooca",
    texto:
      "Na organização editorial local, Brás, Alto da Mooca, Vila Alpina e Parque da Mooca aparecem no mesmo eixo de navegação. Essa aproximação ajuda a percorrer os guias publicados e não constitui divisão administrativa ou policial.",
  },
  penha: {
    titulo: "Referências do eixo Penha",
    texto:
      "O eixo editorial Penha reúne a referência Penha e a Chácara Seis de Outubro. Cada localidade mantém seu próprio nome e a associação serve à navegação dos conteúdos, sem estabelecer limites oficiais ou competência de atendimento.",
  },
  "sao-miguel": {
    titulo: "Referências do eixo São Miguel",
    texto:
      "Vila Americana e Vila Jacuí são agrupadas no eixo editorial São Miguel da coleção. Esse vínculo organiza os guias relacionados e não transforma as localidades em uma única divisão territorial oficial.",
  },
  ermelino: {
    titulo: "Referências do eixo Ermelino",
    texto:
      "Ponte Rasa e Ermelino Matarazzo aparecem juntas no eixo editorial Ermelino. A página mantém cada nome territorial próprio e usa o agrupamento apenas como recurso de navegação.",
  },
  aricanduva: {
    titulo: "Referências do eixo Aricanduva",
    texto:
      "Vila Diva, Vila Carrão, Vila Formosa e Jardim Aricanduva compõem o eixo editorial Aricanduva do cadastro. O agrupamento não afirma que esses nomes sejam equivalentes ou possuam limites coincidentes.",
  },
  tatuape: {
    titulo: "Referências do eixo Tatuapé",
    texto:
      "O cadastro organiza Tatuapé, Parque São Jorge e Belém no eixo editorial Tatuapé. São localidades distintas na navegação; a associação não converte o nome do eixo em classificação administrativa.",
  },
  itaquera: {
    titulo: "Referências do eixo Itaquera",
    texto:
      "Itaquera, Parque do Carmo, Cidade A. E. Carvalho e Artur Alvim integram o eixo editorial Itaquera. Os dois guias policiais relacionados a Itaquera permanecem identificados separadamente pelo número da unidade nesta página.",
  },
  sapopemba: {
    titulo: "Referências do eixo Sapopemba",
    texto:
      "Vila Rica, Parque São Lucas e Sapopemba são referências distintas reunidas no eixo editorial Sapopemba. Esse vínculo serve à organização dos conteúdos, sem indicar proximidade mensurada ou competência institucional.",
  },
  guaianases: {
    titulo: "Referências do eixo Guaianases",
    texto:
      "Guaianases, Cidade Tiradentes e Lajeado aparecem no mesmo eixo de navegação editorial. A página conserva os registros territoriais e os guias correspondentes em seus destinos próprios.",
  },
  "sao-mateus": {
    titulo: "Referências do eixo São Mateus",
    texto:
      "O eixo editorial São Mateus inclui São Mateus, Jardim dos Ipês, Parque São Rafael e Teotônio Vilela. Cada referência conserva sua identificação própria; a classificação é editorial e não define limites de atendimento.",
  },
  "itaim-paulista": {
    titulo: "Referências do eixo Itaim Paulista",
    texto:
      "Itaim Paulista e Jardim Robru fazem parte do eixo editorial Itaim Paulista no cadastro local. O agrupamento apresenta caminhos de leitura, sem substituir recortes administrativos ou institucionais.",
  },
};

const distritosPorTerritorio = new Map<string, typeof distritosLeste>();
for (const distrito of distritosLeste) {
  const slug = territorioSlug(distrito.numero, distrito.localSlug);
  distritosPorTerritorio.set(slug, [...(distritosPorTerritorio.get(slug) ?? []), distrito]);
}

export const bairrosLeste: Bairro[] = [...distritosPorTerritorio].map(([slug, distritos]) => {
  const principal = distritos[0]!;
  const nome = principal.nome;
  const guias = distritos
    .map((distrito) =>
      delegaciasLeste.find((item) => item.unidade.numero === String(distrito.numero)),
    )
    .filter((guia): guia is (typeof delegaciasLeste)[number] => guia !== undefined);
  const nomesGuias = guias.map((guia) => `${guia.cardTitulo} ${guia.cardSubtitulo}`);
  const eixo = eixoEditorial[principal.eixo]!;
  const guideList = nomesGuias.join(" e ");

  return {
    id: `bairro-${slug}`,
    slug,
    nome,
    zona: "zona-leste",
    status: "publicado",
    descricao: `Página territorial de ${nome}, com contexto editorial da Zona Leste e acesso aos guias policiais relacionados.`,
    introducao:
      slug === "itaquera"
        ? "Itaquera tem uma única página territorial neste índice e dois guias policiais relacionados, o 32º e o 103º DP. A escolha entre unidades não é feita pelo bairro ou pelo nome desta página; cada guia permanece identificado pelo número e mantém sua URL própria."
        : `${nome} é a referência territorial deste conteúdo na coleção editorial da Zona Leste. A página apresenta o agrupamento de navegação local e o guia relacionado, sem tratar o nome do lugar como limite administrativo ou policial.`,
    referenciasUrbanas: [nome, ...(principal.referenciasAdicionais ?? [])],
    bairrosVizinhos: [],
    instituicoes: guias.map((guia) => ({
      id: `${slug}-${guia.id}`,
      category: "delegacias",
      institutionSlug: guia.slug,
      institutionType: "delegacia",
      relation: "relacionada",
      relationLabel: `${guia.cardTitulo} relacionado à referência editorial ${nome}`,
    })),
    secoes: [
      {
        titulo: eixo.titulo,
        paragrafos: [
          eixo.texto,
          `A coleção da Zona Leste reúne bairros residenciais, centros comerciais, áreas industriais e corredores de transporte. A referência a ${nome} faz parte dessa organização editorial; ela não afirma que todos esses perfis estejam presentes neste recorte específico.`,
        ],
      },
      {
        titulo: `Informação jurídica e guias de ${nome}`,
        paragrafos: [
          `Os guias relacionados a esta página são: ${guideList}. Eles tratam de identificação documental e procedimentos policiais em páginas próprias. A associação territorial organiza a consulta, mas não define circunscrição, competência ou atendimento para um endereço.`,
          "O conteúdo regional também apresenta temas jurídicos ligados a imóveis, atividades econômicas, relações de trabalho, serviços públicos e planejamento urbano. A aplicação de regras depende das características e da localização exata de cada situação; esta página não oferece análise individual nem publica dados operacionais sem confirmação.",
        ],
      },
    ],
    faq: [
      {
        id: `${slug}-recorte-editorial`,
        pergunta: `O eixo editorial define os limites oficiais de ${nome}?`,
        resposta:
          "Não. Os eixos organizam a navegação do portal e não substituem divisões administrativas ou recortes de competência institucional.",
      },
      {
        id: `${slug}-guia-policial`,
        pergunta: `A página territorial informa qual delegacia atende ${nome}?`,
        resposta:
          "Não. Os guias relacionados não determinam circunscrição. Confirme a unidade competente pelos canais oficiais da Polícia Civil, conforme o endereço e a natureza da situação.",
      },
    ],
    seo: {
      title: `${nome}: informação territorial e guias relacionados | Banca Paulista`,
      description: `Página editorial de ${nome}, com contexto territorial da Zona Leste e acesso identificado aos guias policiais relacionados.`,
      canonicalPath: `/bairros/${slug}`,
    },
  };
});
