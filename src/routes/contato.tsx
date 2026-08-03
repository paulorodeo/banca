import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/site/primitives";
import { PageHero } from "@/components/site/blocks";
import { TriagemChat } from "@/components/site/triagem-chat";
import { canonicalLink, legalServiceSchema, pageMeta } from "@/lib/seo";

const PATH = "/contato";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: pageMeta({
      title: "Informações para Contato | Paulo Sinigalia — OAB/SP 411.502",
      description:
        "Canal reservado para envio de informações iniciais ao escritório Paulo Sinigalia, em São Paulo. Análise preliminar sem compromisso de contratação.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(legalServiceSchema(PATH)) }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Informações para contato"
        lead="Envie informações iniciais para análise preliminar. Este canal não constitui consulta jurídica nem contratação."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: PATH },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl text-ivory">Escritório</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Paulo José Sinigalia — Advocacia e Consultoria Jurídica
                  <br />
                  OAB/SP 411.502 · São Paulo, SP
                </p>
              </div>
              <div>
                <h2 className="text-2xl text-ivory">Antes de enviar</h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <li>Descreva a situação de forma geral, sem detalhar dados sensíveis.</li>
                  <li>Informe se há prazo, intimação ou medida em andamento.</li>
                  <li>Não envie documentos nesta etapa.</li>
                </ul>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Endereço, telefone e horário de atendimento serão publicados após confirmação dos
                dados institucionais do escritório.
              </p>
            </div>
            <TriagemChat />
          </div>
        </Container>
      </Section>
    </>
  );
}