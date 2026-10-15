import type { Bairro, Delegacia, Regiao } from "../types";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";

const existingSlugs = new Set([
  "pinheiros",
  "santo-amaro",
  "butanta",
  "perdizes",
  "jardins",
  "lapa",
  "vila-leopoldina",
  "jaguare",
  "raposo-tavares",
]);
const regions = regioes.filter(
  (region) => region.zona === "zona-norte" || region.zona === "zona-sul",
);

function relatedGuides(region: Regiao): Delegacia[] {
  return delegacias.filter((guide) => guide.regiaoSlug === region.slug);
}

function createTerritoryPage(region: Regiao): Bairro {
  const guides = relatedGuides(region);
  const references = [...new Set([region.nome, ...region.bairros])];
  const zoneLabel = region.zona === "zona-norte" ? "Zona Norte" : "Zona Sul";
  const guideNames = guides.map((guide) => `${guide.cardTitulo} ${guide.cardSubtitulo}`);
  const guideText = guideNames.length
    ? `A coleção relaciona a esta referência territorial ${guideNames.join(" e ")}. Cada guia mantém seu próprio destino e trata da unidade identificada no título. Essa associação editorial não define circunscrição nem determina qual órgão atende um endereço.`
    : "Esta página não tem um guia policial relacionado no cadastro local. A ausência de vínculo cadastrado não permite concluir que não existam unidades policiais no território.";

  return {
    id: `bairro-${region.slug}`,
    slug: region.slug,
    nome: region.nome,
    zona: region.zona,
    status: "publicado",
    descricao: `Página territorial de ${region.nome}, com contexto editorial da ${zoneLabel} e referências publicadas no portal.`,
    introducao: `${region.descricao} Este conteúdo usa ${region.nome} como referência editorial do cadastro da Banca Paulista. Os nomes e agrupamentos desta página organizam a navegação e não substituem divisões administrativas, limites de bairros ou competências de instituições.`,
    referenciasUrbanas: references,
    bairrosVizinhos: [],
    instituicoes: guides.map((guide) => ({
      id: `${region.slug}-${guide.id}`,
      category: "delegacias",
      institutionSlug: guide.slug,
      institutionType: "delegacia",
      relation: "relacionada",
      relationLabel: `Guia relacionado à referência editorial ${region.nome}`,
    })),
    secoes: [
      {
        titulo: `Referências territoriais de ${region.nome}`,
        paragrafos: [
          `A página reúne ${references.join(", ")} conforme os registros editoriais associados a ${region.nome}. Quando o cadastro apresenta mais de uma localidade, elas permanecem como referências de navegação e não são declaradas equivalentes nem recebem limites oficiais por esta publicação.`,
          `A descrição regional disponível para este registro é: ${region.descricao} Ela contextualiza a organização do portal e não afirma que todas as características se apliquem igualmente a cada localidade mencionada.`,
        ],
      },
      {
        titulo: "Informação jurídica e instituições relacionadas",
        paragrafos: [
          `Questões de moradia, documentação imobiliária, relações de vizinhança, trabalho, comércio e acesso a serviços públicos podem variar conforme os fatos e o endereço. A página regional da ${zoneLabel} organiza conteúdos gerais sobre esses temas, sem oferecer análise de situações individuais.`,
          guideText,
        ],
      },
      {
        titulo: `Navegação pela ${zoneLabel}`,
        paragrafos: [
          `Use o guia territorial para conhecer as referências cadastradas e os conteúdos publicados. Os links de delegacias levam a páginas informativas independentes; confirme atribuições e atendimento diretamente nos canais oficiais da instituição correspondente.`,
        ],
      },
    ],
    faq: [
      {
        id: `${region.slug}-recorte-editorial`,
        pergunta: `O nome ${region.nome} nesta página define limites administrativos?`,
        resposta:
          "Não. O portal usa nomes e agrupamentos editoriais para organizar a navegação; eles não substituem divisões oficiais ou competências institucionais.",
      },
      {
        id: `${region.slug}-guia-relacionado`,
        pergunta: "Um guia policial relacionado confirma qual unidade atende meu endereço?",
        resposta:
          "Não. A relação editorial não determina circunscrição nem atendimento. Consulte os canais oficiais da Polícia Civil com o endereço e a natureza da demanda.",
      },
    ],
    seo: {
      title: `${region.nome}: informação territorial | Banca Paulista`,
      description: `Conheça as referências editoriais de ${region.nome}, acesse conteúdos territoriais e consulte os guias institucionais relacionados.`,
      canonicalPath: `/bairros/${region.slug}`,
    },
  };
}

export const bairrosNorteSul: Bairro[] = regions
  .filter((region) => !existingSlugs.has(region.slug))
  .map(createTerritoryPage);
