import { describe, expect, it } from "bun:test";
import { defaultPanelTab, panelTabs } from "./atlas-panel-tabs";

describe("contextual Atlas panel tabs", () => {
  it("assigns tabs to the documented layers and one default tab per layer", () => {
    expect(panelTabs("noticias").map((tab) => tab.id)).toEqual(["news"]);
    expect(panelTabs("justica").map((tab) => tab.id)).toEqual(["indicators", "news"]);
    expect(panelTabs("politica").map((tab) => tab.id)).toEqual(["indicators", "news"]);
    expect(panelTabs("economia").map((tab) => tab.id)).toEqual(["indicators", "markets", "news"]);
    expect(panelTabs("agronegocio").map((tab) => tab.id)).toEqual(["indicators", "news"]);
    expect(panelTabs("clima").map((tab) => tab.id)).toEqual(["conditions", "news"]);
    expect(panelTabs("infraestrutura").map((tab) => tab.id)).toEqual(["indicators", "news"]);
    expect(panelTabs("rodovias").map((tab) => tab.id)).toEqual(["map-data", "news"]);
    expect(panelTabs("populacao").map((tab) => tab.id)).toEqual(["indicators", "news"]);
    expect(defaultPanelTab("noticias")).toBe("news");
    expect(defaultPanelTab("clima")).toBe("conditions");
    expect(defaultPanelTab("rodovias")).toBe("map-data");
    expect(defaultPanelTab("economia")).toBe("indicators");
  });
});
