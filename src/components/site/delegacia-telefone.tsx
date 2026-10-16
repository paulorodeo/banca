import { Phone } from "lucide-react";
import type { DelegaciaUnidade } from "@/content/types";

function ocultarQuatroUltimos(telefone: string) {
  const digitos = telefone.replace(/\D/g, "");
  let indice = 0;
  return telefone.replace(/\d/g, () => {
    const atual = indice++;
    return atual >= digitos.length - 4 ? "X" : digitos[atual]!;
  });
}

function formatarData(data: string) {
  const valor = new Date(`${data}T00:00:00Z`);
  if (Number.isNaN(valor.getTime())) return data;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(valor);
}

function hrefTelefone(telefone: string) {
  return `tel:+55${telefone.replace(/\D/g, "")}`;
}

export function DelegaciaTelefone({ unidade }: { unidade: DelegaciaUnidade }) {
  const confirmado = Boolean(unidade.telefone);

  return (
    <section className="rounded-sm border border-gold/30 bg-[#F4F1EB] p-4 text-[#101B2B] sm:p-5">
      <h3 className="flex items-center gap-2 font-serif text-base font-semibold leading-snug">
        <Phone className="size-4 shrink-0 text-[#9B7940]" aria-hidden />
        Telefone do {unidade.nomeOficial}
      </h3>

      {confirmado ? (
        <details className="group mt-4">
          <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-sm border border-[#101B2B]/15 bg-white px-3 py-2 text-sm marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B7940] [&::-webkit-details-marker]:hidden">
            <span className="font-medium">Telefone da unidade</span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-[#101B2B]/70" aria-label="Número parcialmente oculto">
                {ocultarQuatroUltimos(unidade.telefone!)}
              </span>
              <span className="rounded-sm bg-[#101B2B] px-3 py-1.5 font-semibold text-[#F4F1EB] group-open:bg-[#C8A66A] group-open:text-[#101B2B]">
                <span className="group-open:hidden">Ver número</span>
                <span className="hidden group-open:inline">Ocultar número</span>
              </span>
            </span>
          </summary>
          <div className="mt-3 border-l-2 border-[#C8A66A] pl-3 text-sm">
            {unidade.telefoneStatus === "historico-pendente" && (
              <p className="mb-2 text-xs font-medium text-[#765c30]">
                Número divulgado em fonte histórica; a atividade atual da linha não foi revalidada.
              </p>
            )}
            <a
              className="font-semibold text-[#101B2B] underline underline-offset-4"
              href={hrefTelefone(unidade.telefone!)}
            >
              {unidade.telefone}
              <span className="sr-only"> — ligar para a unidade</span>
            </a>
            <dl className="mt-3 space-y-1.5 text-xs leading-relaxed text-[#101B2B]/75">
              <div>
                <dt className="inline font-semibold">Tipo de contato: </dt>
                <dd className="inline">{unidade.telefoneTipo ?? "unidade"}</dd>
              </div>
              {unidade.telefoneFonte && (
                <div>
                  <dt className="inline font-semibold">Fonte: </dt>
                  <dd className="inline">
                    {unidade.telefoneFonteUrl ? (
                      <a
                        className="underline underline-offset-2"
                        href={unidade.telefoneFonteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {unidade.telefoneFonte}
                      </a>
                    ) : (
                      unidade.telefoneFonte
                    )}
                  </dd>
                </div>
              )}
              {unidade.telefoneVerificadoEm && (
                <div>
                  <dt className="inline font-semibold">Verificado em: </dt>
                  <dd className="inline">{formatarData(unidade.telefoneVerificadoEm)}</dd>
                </div>
              )}
              {unidade.telefoneFontePublicadaEm && (
                <div>
                  <dt className="inline font-semibold">Fonte publicada em: </dt>
                  <dd className="inline">{formatarData(unidade.telefoneFontePublicadaEm)}</dd>
                </div>
              )}
            </dl>
          </div>
        </details>
      ) : (
        <div className="mt-3">
          <p className="text-sm font-semibold">Telefone ainda não confirmado</p>
          <p className="mt-1 text-xs leading-relaxed text-[#101B2B]/75">
            Este guia ainda não possui um telefone confirmado em fonte oficial. Para obter
            informações atualizadas, consulte os canais oficiais da Polícia Civil de São Paulo.
          </p>
        </div>
      )}
    </section>
  );
}
