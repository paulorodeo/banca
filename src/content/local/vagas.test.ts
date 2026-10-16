import { describe, expect, test } from "bun:test";
import { vagas, vagasPublicadas } from "./vagas";

describe("vagas editoriais", () => {
  test("preserva as oito oportunidades remuneradas em ordem decrescente", () => {
    expect(vagasPublicadas.slice(0, 8)).toHaveLength(8);
    expect(vagasPublicadas.slice(0, 8).map((vaga) => vaga.slug)).toEqual([
      "advogada-trabalhista-contencioso-on-the-job",
      "advogado-civel-pleno-radar-gestao",
      "advogado-contencioso-civel-youtility",
      "advogado-previdenciario-gs-business",
      "advogado-previdenciario-junior-justo-precatorio",
      "analista-juridico-manpower",
      "paralegal-contencioso-todorovic",
      "assistente-juridico-dnr",
    ]);
  });

  test("distingue estágios e vagas sem remuneração divulgada", () => {
    expect(vagasPublicadas).toHaveLength(22);
    expect(vagasPublicadas.filter((vaga) => vaga.tipo === "profissional")).toHaveLength(16);
    expect(vagasPublicadas.filter((vaga) => vaga.tipo === "estagio")).toHaveLength(6);
    expect(
      vagasPublicadas.filter((vaga) => vaga.tipo === "profissional" && !vaga.remuneracao),
    ).toHaveLength(8);
    expect(
      vagasPublicadas.filter((vaga) => vaga.tipo === "estagio" && !vaga.remuneracao),
    ).toHaveLength(6);
  });

  test("mantém candidatura externa e separa componentes não garantidos", () => {
    expect(new Set(vagas.map((vaga) => vaga.fonte.url)).size).toBe(vagas.length);
    expect(vagas.every((vaga) => vaga.fonte.url.startsWith("https://"))).toBe(true);
    expect(
      vagas.find((vaga) => vaga.slug === "advogado-previdenciario-gs-business")?.remuneracao,
    ).toEqual({
      destaque: "Honorários fixos de R$ 4.000 mensais",
      observacao: "Variável de até R$ 1.500, condicionada ao desempenho.",
    });
  });
});
