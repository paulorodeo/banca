import type { DelegaciaUnidade } from "../types";

/**
 * Contatos prioritários recebidos para esta publicação. A proveniência fica
 * explícita em cada registro; URLs oficiais só são adicionadas quando há uma
 * referência direta disponível no cadastro editorial.
 */
export const telefonesPrioritarios: Record<
  string,
  Pick<
    DelegaciaUnidade,
    | "telefone"
    | "telefoneFonte"
    | "telefoneFonteUrl"
    | "telefoneFontePublicadaEm"
    | "telefoneVerificadoEm"
    | "telefoneStatus"
    | "telefoneTipo"
  >
> = {
  "7": {
    telefone: "(11) 3864-7445",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "14": {
    telefone: "(11) 3032-1100",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "15": {
    telefone: "(11) 3079-8244",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "23": {
    telefone: "(11) 3864-5265",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "27": {
    telefone: "(11) 5543-2727",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "51": {
    telefone: "(11) 3727-1211",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "55": {
    telefone: "(11) 6919-8627",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "78": {
    telefone: "(11) 3082-0160",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "83": {
    telefone: "(11) 2331-9581",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "96": {
    telefone: "(11) 5505-1607",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "97": {
    telefone: "(11) 5588-4841",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "98": {
    telefone: "(11) 5621-7319",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
  "102": {
    telefone: "(11) 5686-3594",
    telefoneFonte: "Prefeitura de São Paulo — Distritos Policiais de São Paulo (DPs)",
    telefoneFonteUrl:
      "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
    telefoneFontePublicadaEm: "2022-03-24",
    telefoneStatus: "historico-pendente",
    telefoneTipo: "unidade",
  },
};
