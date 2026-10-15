import type { Delegacia, Regiao } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

type ZonaLote = "zona-norte" | "centro";

interface DistritoLote {
  numero: number;
  nome: string;
  /** Slug da região; inclui o número quando o nome do lugar se repete no portal. */
  regiaoSlug: string;
  lugarSlug: string;
  eixo: string;
  zona: ZonaLote;
  nomeOficialVerificado?: string;
  referenciasAdicionais?: string[];
}

const ROTULO_ZONA: Record<ZonaLote, string> = { "zona-norte": "Zona Norte", centro: "Centro" };

// Agrupamentos de navegação editorial, nunca mapas de circunscrição policial.
export const distritosNorte: DistritoLote[] = [
  { numero: 9, nome: "Carandiru", regiaoSlug: "carandiru", lugarSlug: "carandiru", eixo: "santana", zona: "zona-norte" },
  { numero: 13, nome: "Casa Verde", regiaoSlug: "casa-verde", lugarSlug: "casa-verde", eixo: "casa-verde", zona: "zona-norte" },
  { numero: 19, nome: "Vila Maria", regiaoSlug: "vila-maria", lugarSlug: "vila-maria", eixo: "vila-maria", zona: "zona-norte" },
  { numero: 20, nome: "Jardim França", regiaoSlug: "jardim-franca", lugarSlug: "jardim-franca", eixo: "santana", zona: "zona-norte" },
  { numero: 28, nome: "Freguesia do Ó", regiaoSlug: "freguesia-do-o", lugarSlug: "freguesia-do-o", eixo: "casa-verde", zona: "zona-norte" },
  { numero: 33, nome: "Pirituba", regiaoSlug: "pirituba", lugarSlug: "pirituba", eixo: "pirituba", zona: "zona-norte" },
  { numero: 38, nome: "Vila Amália", regiaoSlug: "vila-amalia", lugarSlug: "vila-amalia", eixo: "tremembe", zona: "zona-norte" },
  { numero: 39, nome: "Vila Gustavo", regiaoSlug: "vila-gustavo", lugarSlug: "vila-gustavo", eixo: "vila-maria", zona: "zona-norte" },
  { numero: 40, nome: "Vila Santa Maria", regiaoSlug: "vila-santa-maria", lugarSlug: "vila-santa-maria", eixo: "santana", zona: "zona-norte" },
  { numero: 45, nome: "Vila Brasilândia", regiaoSlug: "vila-brasilandia", lugarSlug: "vila-brasilandia", eixo: "brasilandia", zona: "zona-norte" },
  { numero: 46, nome: "Perus", regiaoSlug: "perus", lugarSlug: "perus", eixo: "pirituba", zona: "zona-norte" },
  { numero: 72, nome: "Vila Penteado", regiaoSlug: "vila-penteado", lugarSlug: "vila-penteado", eixo: "brasilandia", zona: "zona-norte" },
  { numero: 73, nome: "Jaçanã", regiaoSlug: "jacana", lugarSlug: "jacana", eixo: "tremembe", zona: "zona-norte" },
  { numero: 74, nome: "Jaraguá", regiaoSlug: "jaragua", lugarSlug: "jaragua", eixo: "pirituba", zona: "zona-norte" },
  { numero: 87, nome: "Vila Pereira Barreto", regiaoSlug: "vila-pereira-barreto", lugarSlug: "vila-pereira-barreto", eixo: "pirituba", zona: "zona-norte" },
  { numero: 90, nome: "Parque Novo Mundo", regiaoSlug: "parque-novo-mundo", lugarSlug: "parque-novo-mundo", eixo: "vila-maria", zona: "zona-norte" },
];

export const distritosCentro: DistritoLote[] = [
  { numero: 1, nome: "Liberdade", regiaoSlug: "liberdade-1-dp", lugarSlug: "liberdade", eixo: "se", zona: "centro" },
  { numero: 2, nome: "Bom Retiro", regiaoSlug: "bom-retiro", lugarSlug: "bom-retiro", eixo: "luz", zona: "centro" },
  { numero: 3, nome: "Campos Elíseos", regiaoSlug: "santa-ifigenia", lugarSlug: "santa-ifigenia", eixo: "luz", zona: "centro", nomeOficialVerificado: "3º Distrito Policial — Campos Elíseos", referenciasAdicionais: ["Santa Ifigênia"] },
  { numero: 4, nome: "Consolação", regiaoSlug: "consolacao", lugarSlug: "consolacao", eixo: "republica", zona: "centro" },
  { numero: 5, nome: "Liberdade", regiaoSlug: "liberdade-5-dp", lugarSlug: "liberdade", eixo: "se", zona: "centro" },
  { numero: 6, nome: "Cambuci", regiaoSlug: "cambuci", lugarSlug: "cambuci", eixo: "se", zona: "centro" },
  { numero: 12, nome: "Brás", regiaoSlug: "bras-12-dp", lugarSlug: "bras", eixo: "luz", zona: "centro" },
  { numero: 77, nome: "Santa Cecília", regiaoSlug: "santa-cecilia", lugarSlug: "santa-cecilia", eixo: "republica", zona: "centro" },
];

const distritos = [...distritosNorte, ...distritosCentro];
const NOMES_REPETIDOS = new Set(["Liberdade", "Brás"]);

const slugDistrito = (dp: DistritoLote) => `advogado-criminal-${dp.numero}-dp-${dp.lugarSlug}`;
const referenciasDoEixo = (dp: DistritoLote) =>
  distritos.filter((o) => o.zona === dp.zona && o.eixo === dp.eixo && o.numero !== dp.numero);

function contexto(dp: DistritoLote): string {
  if (dp.nome === "Liberdade") {
    return `Liberdade aparece nesta coleção em dois guias distintos: 1º e 5º DP. O número ${dp.numero} identifica esta página; o nome do lugar, isoladamente, não permite escolher a unidade responsável por um endereço.`;
  }
  if (dp.numero === 12) {
    return "Brás também é referência do guia do 8º DP, na coleção da Zona Leste. Este guia trata do 12º DP; confira sempre o número da unidade no documento recebido, pois o nome do lugar não define circunscrição.";
  }
  return `${dp.nome} é a referência usada neste guia para identificar o ${dp.numero}º DP na coleção editorial ${dp.zona === "centro" ? "do Centro" : "da Zona Norte"}. O número e a denominação da unidade devem ser confrontados com o boletim, a intimação ou o documento recebido; a referência ao lugar não descreve uma área de atendimento.`;
}

const criarRegiao = (dp: DistritoLote): Regiao => ({
  id: `reg-${dp.regiaoSlug}`,
  slug: dp.regiaoSlug,
  nome: NOMES_REPETIDOS.has(dp.nome) ? `${dp.nome} · ${dp.numero}º DP` : dp.nome,
  descricao: `Guia do ${dp.numero}º DP — ${dp.nome}: identificação da unidade, intimações e documentos de procedimentos policiais.`,
  bairros: [dp.nome, ...(dp.referenciasAdicionais ?? [])],
  href: `/delegacias/${slugDistrito(dp)}`,
  zona: dp.zona,
});

export const regioesNorte: Regiao[] = distritosNorte.map(criarRegiao);
export const regioesCentro: Regiao[] = distritosCentro.map(criarRegiao);

export const relacionadasNorteCentro: Record<string, string[]> = Object.fromEntries(
  distritos.map((dp) => [slugDistrito(dp), referenciasDoEixo(dp).map(slugDistrito)]),
);

function criarDelegacia(dp: DistritoLote): Delegacia {
  const slug = slugDistrito(dp);
  const unidade = dp.nomeOficialVerificado ?? `${dp.numero}º Distrito Policial de São Paulo`;
  const rotulo = ROTULO_ZONA[dp.zona];
  const vizinhos = referenciasDoEixo(dp);
  const outros = vizinhos.map((o) => `${o.numero}º DP — ${o.nome}`).join(", ");
  return {
    id: `dp-${dp.numero}`,
    slug,
    h1: `${dp.numero}º DP — ${dp.nome}`,
    cardTitulo: `${dp.numero}º Distrito Policial`,
    cardSubtitulo: dp.nome,
    cardResumo: `Guia editorial do ${dp.numero}º DP — ${dp.nome}, com informações sobre documentos e procedimentos policiais.`,
    seo: {
      title: `${dp.numero}º DP ${dp.nome} | Guia territorial — Banca Paulista`,
      description: `Guia independente do ${dp.numero}º DP — ${dp.nome}, em São Paulo. Identificação da unidade, intimações, inquéritos e referências editoriais ${dp.zona === "centro" ? "do Centro" : "da Zona Norte"}.`,
      canonicalPath: `/delegacias/${slug}`,
    },
    introducao: `Guia editorial do ${unidade}, organizado pela referência territorial ${dp.nome}. ${dp.nomeOficialVerificado ? "A denominação consta de fonte pública." : "A denominação institucional atual está em verificação."} O nome do lugar não define circunscrição; confirme os dados de atendimento nos canais oficiais. Não é canal da Polícia Civil nem oferta de atendimento jurídico.`,
    unidade: { numero: String(dp.numero), nomeOficial: unidade, dadosDeDesenvolvimento: true },
    regiaoSlug: dp.regiaoSlug,
    bairros: [dp.nome, ...(dp.referenciasAdicionais ?? [])],
    contextoTerritorial: contexto(dp),
    observacaoBairros: "As referências territoriais organizam a navegação. Não indicam bairros atendidos, competência exclusiva ou limites de circunscrição. Confirme a unidade responsável pelo endereço exato e pela natureza dos fatos nos canais oficiais da Polícia Civil.",
    secoes: [
      {
        titulo: `Identificação do ${dp.numero}º DP — ${dp.nome}`,
        paragrafos: [
          `Ao consultar um documento que mencione o ${dp.numero}º DP, confira a numeração e a denominação da unidade, além do número do boletim de ocorrência ou do inquérito. Um nome de bairro em uma mensagem não substitui essa identificação.`,
          "Endereço, telefone e horário não são reproduzidos neste guia sem confirmação oficial atual. Antes de se deslocar, obtenha essas informações nos canais oficiais da Polícia Civil, independentemente do contato que enviou a mensagem.",
        ],
      },
      {
        titulo: `Intimação com referência ao ${dp.numero}º DP`,
        paragrafos: ["Uma convocação pode mencionar vítima, testemunha, pessoa investigada ou representante de empresa. A condição em que a pessoa será ouvida deve ser verificada no documento; uma intimação não equivale a condenação."],
        lista: ["Nome da pessoa convocada e condição no procedimento", "Número da unidade e do boletim ou inquérito", "Data, horário, local e documentos solicitados", "Autenticidade do contato, confirmada por canal oficial independente"],
      },
      {
        titulo: "Boletim de ocorrência e inquérito",
        paragrafos: ["O boletim registra a comunicação dos fatos; o inquérito reúne diligências de investigação. Preserve os documentos originais, comprovantes e mensagens relacionados ao fato. A unidade que aparece em um registro pode não ser a que realiza todas as etapas posteriores.", "Dúvidas sobre depoimentos, acesso a documentos, prazos ou direitos exigem avaliação individual por advogado ou pela Defensoria Pública. O portal não recebe relatos ou documentos de casos."],
      },
      ...(vizinhos.length
        ? [{
            titulo: `Outros guias no eixo editorial de ${dp.nome}`,
            paragrafos: [`A navegação da coleção ${rotulo} também reúne ${outros}. Esses links não indicam transferência de procedimento, subordinação administrativa ou circunscrições contíguas. Confira a unidade no documento e nos canais oficiais.`],
          }]
        : []),
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante"],
    conteudosRelacionados: ["intimacao-o-que-considerar-antes-de-responder", "busca-e-apreensao-limites-da-decisao-judicial"],
    faq: [
      { id: `dp${dp.numero}-oficial`, pergunta: `Esta é a página oficial do ${dp.numero}º DP?`, resposta: "Não. Banca Paulista é um portal editorial independente, sem vínculo com a Polícia Civil ou órgãos públicos." },
      { id: `dp${dp.numero}-endereco`, pergunta: `Como confirmar endereço e horário do ${dp.numero}º DP?`, resposta: "Consulte os canais oficiais da Polícia Civil antes de se deslocar. O guia não publica dados operacionais sem confirmação atual, nem garante funcionamento em determinado horário." },
      { id: `dp${dp.numero}-circunscricao`, pergunta: `Morar em ${dp.nome} determina qual delegacia é responsável?`, resposta: "Não. A referência territorial não delimita circunscrição. A unidade responsável depende do endereço exato, da natureza dos fatos e da organização policial." },
      { id: `dp${dp.numero}-intimacao`, pergunta: `Uma intimação do ${dp.numero}º DP significa acusação?`, resposta: "Não necessariamente. Confira no documento a condição de vítima, testemunha ou pessoa investigada e obtenha orientação profissional individualizada quando necessário." },
      { id: `dp${dp.numero}-profissionais`, pergunta: "Há advogado ou plantão 24h disponível pelo portal?", resposta: "Ainda não há profissionais participantes publicados. O portal não presta consultas, não recebe casos e não oferece atendimento 24h." },
    ],
  };
}

export const delegaciasNorteCentro: Delegacia[] = distritos.map(criarDelegacia);
