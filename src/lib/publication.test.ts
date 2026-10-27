import { test } from "node:test";
import assert from "node:assert/strict";
import { absoluteHead, absoluteUrl, publicOrigin, runtimePublicOrigin } from "./public-url";
import { publishedPaths, robotsTxt, selectSitemapPaths, sitemapXml } from "./sitemap";
import { publicSitemap } from "./sitemap.server";
import { zonas } from "@/content/local/zonas";
import { bairros } from "@/content/local/bairros";
import { delegacias } from "@/content/local/delegacias";
import { noticias } from "@/content/local/noticias";
import { conteudos } from "@/content/local/artigos-editoriais";
import { editorialIdentity } from "@/content/local/settings";
import { organizationSchema, pageMeta, websiteSchema } from "./seo";
import { loadArticlePage } from "@/content/articles.server";

const origin = "https://portal.example.test";
test("production requires the canonical origin; staging and local origins remain distinct", () => {
  assert.throws(() => runtimePublicOrigin({ NODE_ENV: "production" }));
  for (const value of [
    "http://localhost:8080",
    "https://127.0.0.1",
    "https://foo.localhost",
    "https://relative.invalid",
  ])
    assert.throws(() => runtimePublicOrigin({ NODE_ENV: "production", PUBLIC_SITE_URL: value }));
  assert.throws(() => publicOrigin("https://user:password@portal.example.test"));
  assert.equal(
    runtimePublicOrigin({
      NODE_ENV: "production",
      DEPLOYMENT_ENV: "production",
      PUBLIC_SITE_URL: "https://bancapaulista.org/",
    }),
    "https://bancapaulista.org",
  );
  assert.throws(() =>
    runtimePublicOrigin({
      NODE_ENV: "production",
      DEPLOYMENT_ENV: "production",
      PUBLIC_SITE_URL: origin,
    }),
  );
  assert.equal(runtimePublicOrigin({ NODE_ENV: "development" }), "http://localhost:8080");
  assert.equal(absoluteUrl("/regioes//zona-norte/", origin), `${origin}/regioes/zona-norte`);
  assert.throws(() => absoluteUrl("/\\evil.test", origin));
});
test("runtime metadata consistently resolves configured URLs and preserves external article media", () => {
  const external = "https://media.example.test/cover.jpg";
  const result = absoluteHead(origin, () => ({
    meta: pageMeta({ title: "Título", description: "Descrição", path: "/regioes/zona-norte" }),
    links: [{ rel: "canonical", href: "/regioes/zona-norte/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          ...organizationSchema("/"),
          image: "/images/sp/banca-paulista-social.png",
        }),
      },
    ],
  }));
  assert.equal(result.links[0]?.href, `${origin}/regioes/zona-norte`);
  for (const item of result.meta.filter((m) =>
    ["og:url", "og:image", "twitter:image"].includes(m["property"] ?? m["name"] ?? ""),
  ))
    assert(item["content"]?.startsWith(origin));
  assert.equal(JSON.parse(result.scripts[0]!.children).name, editorialIdentity.name);
  assert.equal(websiteSchema("/").publisher.name, editorialIdentity.name);
  const image = absoluteHead(origin, () => ({
    meta: pageMeta({
      title: "Artigo",
      description: "Descrição",
      path: "/artigos/teste",
      image: external,
    }),
  }));
  assert.equal(image.meta.find((m) => m["property"] === "og:image")?.["content"], external);
});
test("sitemap includes all published territory and articles without future modules, drafts or API routes", async () => {
  const paths = publishedPaths({
    delegacias,
    zonas,
    bairros,
    noticias,
    hasVagas: true,
    articles: [...conteudos, { ...conteudos[0]!, slug: "rascunho-teste", status: "revisao" }],
  });
  assert.equal(paths.filter((p) => p.startsWith("/delegacias/")).length, 93);
  assert.equal(paths.filter((p) => p.startsWith("/regioes/")).length, 5);
  assert.deepEqual(paths.filter((p) => p.startsWith("/regioes/")).sort(), [
    "/regioes/centro",
    "/regioes/zona-leste",
    "/regioes/zona-norte",
    "/regioes/zona-oeste",
    "/regioes/zona-sul",
  ]);
  assert(paths.includes("/bairros/pinheiros"));
  assert(paths.includes("/noticias"));
  assert(paths.includes("/atlas-brasil"));
  assert(paths.includes("/noticias/justica-libera-obra-bosque-salesianos-alto-da-lapa"));
  for (const noticia of noticias) assert(paths.includes(noticia.seo.canonicalPath));
  assert(paths.includes("/politica-de-privacidade")); // Still the active canonical route; migration has not occurred.
  assert(!paths.includes("/privacidade")); // Current replacement remains explicitly noindex.
  assert(paths.includes("/vagas"));
  assert(!paths.includes("/radar"));
  assert(
    paths.every(
      (p) => !/radar|territorial\/|rascunho-teste|\/api\/|\?|\/admin|\/profissionais\//.test(p),
    ),
  );
  const xml = await publicSitemap({ NODE_ENV: "production", PUBLIC_SITE_URL: origin });
  assert.equal((xml.match(/<loc>/g) ?? []).length, paths.length);
  assert(xml.includes(`${origin}/delegacias/${delegacias[0]!.slug}`));
  assert(xml.includes(`${origin}/noticias/justica-libera-obra-bosque-salesianos-alto-da-lapa`));
  assert(!xml.includes("localhost") && !xml.includes("lovable"));
  assert(robotsTxt(origin).includes(`Sitemap: ${origin}/sitemap.xml`));
  assert(sitemapXml(["/arquivos/a&b"], origin).includes("&amp;"));
  await assert.rejects(() => publicSitemap({ NODE_ENV: "production" }));
});

test("sitemap selection removes duplicates and excludes drafts, noindex and redirected routes", () => {
  const paths = selectSitemapPaths(
    [
      { path: "/", canonicalPath: "/", published: true, indexable: true },
      { path: "/", canonicalPath: "/", published: true, indexable: true },
      { path: "/draft", canonicalPath: "/draft", published: false, indexable: true },
      { path: "/private", canonicalPath: "/private", published: true, indexable: false },
      { path: "/old", canonicalPath: "/new", published: true, indexable: true, redirected: true },
      { path: "/alias", canonicalPath: "/canonical", published: true, indexable: true },
      { path: "/radar", canonicalPath: "/radar", published: true, indexable: true },
      { path: "/vagas", canonicalPath: "/vagas", published: true, indexable: false },
      { path: "/privacidade", canonicalPath: "/privacidade", published: true, indexable: true },
      {
        path: "/politica-de-privacidade",
        canonicalPath: "/politica-de-privacidade",
        published: true,
        indexable: true,
        redirected: true,
      },
    ],
    origin,
  );
  assert.deepEqual(paths, ["/"]);
  assert.throws(() => sitemapXml(["relative/path"], origin));
  assert.throws(() => sitemapXml(["https://wrong.example/path"], origin));
  assert.throws(() => sitemapXml(["/artigos?page=2"], origin));
  assert.equal((sitemapXml(["/", "/"], origin).match(/<loc>/g) ?? []).length, 1);
});
test("article pagination totals include only published articles and preserve valid page content", async () => {
  const first = await loadArticlePage(null, {
    page: 1,
    limit: 1,
    sort: "-publishedAt",
    category: "",
  });
  const second = await loadArticlePage(null, {
    page: 2,
    limit: 1,
    sort: "-publishedAt",
    category: "",
  });
  assert(first.totalPages > 1);
  assert(first.docs.every((item) => item.status === "publicado"));
  assert.equal(first.totalDocs, conteudos.filter((item) => item.status === "publicado").length);
  assert.notEqual(first.docs[0]?.slug, second.docs[0]?.slug);
  const invalid = await loadArticlePage(null, {
    page: 999,
    limit: 12,
    sort: "-publishedAt",
    category: "",
  });
  assert.equal(invalid.docs.length, 0);
  assert(999 > invalid.totalPages);
});
