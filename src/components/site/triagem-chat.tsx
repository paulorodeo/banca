import { useState } from "react";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  MENSAGEM_FINAL,
  NATUREZA_OPCOES,
  URGENCIA_OPCOES,
  triagemSchema,
  type TriagemPayload,
} from "@/lib/triagem";
import { ActionButton } from "./primitives";

interface TriagemContext {
  dpNumber?: string;
  dpName?: string;
  region?: string;
}

type Etapa = "natureza" | "urgencia" | "dados" | "final";

const inputClass =
  "w-full rounded-xs border border-border bg-background/60 px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground/70 transition-colors focus:border-gold/60";

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-prose rounded-xs border border-border bg-background/50 px-5 py-4 text-sm leading-relaxed text-ivory/85">
      {children}
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-xs border px-4 py-3 text-left text-sm transition-all duration-300",
        selected
          ? "border-gold/70 bg-gold/10 text-gold"
          : "border-border text-ivory/75 hover:border-gold/40 hover:text-ivory",
      )}
    >
      {label}
    </button>
  );
}

export function TriagemChat({ context = {} }: { context?: TriagemContext }) {
  const [etapa, setEtapa] = useState<Etapa>("natureza");
  const [natureza, setNatureza] = useState<string>("");
  const [urgencia, setUrgencia] = useState<string>("");
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    cidade: "São Paulo",
    horario: "",
    descricao: "",
  });
  const [consentimento, setConsentimento] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [iniciado, setIniciado] = useState(false);

  const marcarInicio = () => {
    if (iniciado) return;
    setIniciado(true);
    trackEvent("lead_started", {
      ...(context.dpNumber ? { dpNumber: context.dpNumber } : {}),
      ...(context.dpName ? { dpName: context.dpName } : {}),
      ...(context.region ? { region: context.region } : {}),
    });
  };

  const enviar = async () => {
    setErro(null);
    const candidate = {
      natureza,
      urgencia,
      ...form,
      horario: form.horario || undefined,
      descricao: form.descricao || undefined,
      consentimento,
      landingPage: typeof window === "undefined" ? undefined : window.location.pathname,
      ...context,
    };
    const parsed = triagemSchema.safeParse(candidate);
    if (!parsed.success) {
      setErro(
        parsed.error.issues[0]?.message ??
          "Verifique os campos preenchidos e o consentimento de privacidade.",
      );
      return;
    }
    setEnviando(true);
    try {
      await enviarTriagem(parsed.data);
      trackEvent("lead_completed", {
        legalArea: parsed.data.natureza,
        urgency: parsed.data.urgencia,
        ...(context.dpNumber ? { dpNumber: context.dpNumber } : {}),
        ...(context.dpName ? { dpName: context.dpName } : {}),
        ...(context.region ? { region: context.region } : {}),
      });
      setEtapa("final");
    } catch {
      setErro("Não foi possível registrar as informações agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="surface-panel rounded-xs p-6 md:p-8" aria-live="polite">
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
        <ShieldCheck className="size-5 text-gold" aria-hidden />
        <div>
          <p className="text-sm font-medium text-ivory">Envio de informações iniciais</p>
          <p className="text-xs text-muted-foreground">
            Canal reservado. Não envie documentos ou dados sensíveis nesta etapa.
          </p>
        </div>
      </div>

      {etapa === "natureza" ? (
        <div className="space-y-5">
          <Bubble>Qual a natureza geral da situação?</Bubble>
          <div className="grid gap-3 sm:grid-cols-2">
            {NATUREZA_OPCOES.map((op) => (
              <OptionButton
                key={op.value}
                label={op.label}
                selected={natureza === op.value}
                onClick={() => {
                  marcarInicio();
                  setNatureza(op.value);
                  setEtapa("urgencia");
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {etapa === "urgencia" ? (
        <div className="space-y-5">
          <Bubble>Existe urgência envolvida?</Bubble>
          <div className="grid gap-3 sm:grid-cols-2">
            {URGENCIA_OPCOES.map((op) => (
              <OptionButton
                key={op.value}
                label={op.label}
                selected={urgencia === op.value}
                onClick={() => {
                  setUrgencia(op.value);
                  setEtapa("dados");
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setEtapa("natureza")}
            className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-gold"
          >
            Voltar
          </button>
        </div>
      ) : null}

      {etapa === "dados" ? (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void enviar();
          }}
        >
          <Bubble>
            Informe os dados para retorno do escritório. A descrição é opcional e deve ser breve.
          </Bubble>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Nome</span>
              <input
                className={inputClass}
                placeholder="Nome"
                autoComplete="name"
                required
                value={form.nome}
                onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="sr-only">Telefone</span>
              <input
                className={inputClass}
                placeholder="Telefone"
                autoComplete="tel"
                inputMode="tel"
                required
                value={form.telefone}
                onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="sr-only">E-mail</span>
              <input
                className={inputClass}
                placeholder="E-mail"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="sr-only">Cidade</span>
              <input
                className={inputClass}
                placeholder="Cidade"
                required
                value={form.cidade}
                onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="sr-only">Melhor horário para contato</span>
              <input
                className={inputClass}
                placeholder="Melhor horário para contato"
                value={form.horario}
                onChange={(e) => setForm((f) => ({ ...f, horario: e.target.value }))}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="sr-only">Breve descrição</span>
              <textarea
                className={cn(inputClass, "min-h-28 resize-y")}
                placeholder="Breve descrição da situação (opcional)"
                maxLength={1000}
                value={form.descricao}
                onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
              />
            </label>
          </div>

          <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-[var(--gold)]"
              checked={consentimento}
              onChange={(e) => setConsentimento(e.target.checked)}
            />
            <span>
              Autorizo o tratamento dos dados informados exclusivamente para análise inicial e
              retorno do escritório, conforme a política de privacidade. Estou ciente de que este
              canal não constitui consulta jurídica nem contratação.
            </span>
          </label>

          {erro ? (
            <p role="alert" className="text-xs text-destructive">
              {erro}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <ActionButton type="submit" disabled={enviando}>
              {enviando ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
              Enviar informações iniciais
            </ActionButton>
            <button
              type="button"
              onClick={() => setEtapa("urgencia")}
              className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-gold"
            >
              Voltar
            </button>
          </div>
        </form>
      ) : null}

      {etapa === "final" ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gold">
            <Check className="size-5" aria-hidden />
            <p className="text-sm font-medium">Informações recebidas</p>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {MENSAGEM_FINAL}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Envio da triagem. O endpoint é servido por um server route compatível com
 * Cloudflare Workers (`/api/public/triagem`). Nesta fase ele apenas valida e
 * registra o contrato de dados — sem e-mail, WhatsApp API ou banco de dados.
 */
async function enviarTriagem(payload: TriagemPayload): Promise<void> {
  const response = await fetch("/api/public/triagem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("triagem_failed");
}