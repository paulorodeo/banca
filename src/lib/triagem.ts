import { z } from "zod";

/** Contrato de dados da triagem — compartilhado entre UI e endpoint Worker. */
export const triagemSchema = z.object({
  natureza: z.enum([
    "criminal",
    "civel",
    "empresarial",
    "patrimonial",
    "urgente",
    "nao-sei-informar",
  ]),
  urgencia: z.enum([
    "prisao",
    "intimacao",
    "busca-e-apreensao",
    "prazo-em-andamento",
    "sem-urgencia",
  ]),
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  telefone: z.string().trim().min(8, "Informe um telefone válido").max(30),
  email: z.string().trim().email("Informe um e-mail válido").max(180),
  cidade: z.string().trim().min(2, "Informe a cidade").max(120),
  horario: z.string().trim().max(80).optional(),
  descricao: z.string().trim().max(1000).optional(),
  consentimento: z.literal(true),
  landingPage: z.string().max(200).optional(),
  dpNumber: z.string().max(10).optional(),
  dpName: z.string().max(160).optional(),
  region: z.string().max(120).optional(),
});

export type TriagemPayload = z.infer<typeof triagemSchema>;

export const NATUREZA_OPCOES = [
  { value: "criminal", label: "Criminal" },
  { value: "civel", label: "Cível" },
  { value: "empresarial", label: "Empresarial" },
  { value: "patrimonial", label: "Patrimonial" },
  { value: "urgente", label: "Situação urgente" },
  { value: "nao-sei-informar", label: "Não sei informar" },
] as const;

export const URGENCIA_OPCOES = [
  { value: "prisao", label: "Prisão" },
  { value: "intimacao", label: "Intimação" },
  { value: "busca-e-apreensao", label: "Busca e apreensão" },
  { value: "prazo-em-andamento", label: "Prazo em andamento" },
  { value: "sem-urgencia", label: "Não há urgência imediata" },
] as const;

export const MENSAGEM_FINAL =
  "As informações foram recebidas para análise inicial. Este canal não constitui consulta jurídica, contratação ou garantia de atendimento.";