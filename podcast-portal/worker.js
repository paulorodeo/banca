export default (function podcastPortal() {
  const ORIGIN = "https://podcast.bancapaulista.org";
  const SOURCE_URL = "https://feed-banca.paulista.workers.dev/rss.xml";
  const FALLBACK_COVER = "https://feed-banca.paulista.workers.dev/cover.webp";
  const BG = "https://bancapaulista.org/images/sp/ponte.avif";
  const MARK = "https://bancapaulista.org/brand/simbolo-banca-paulista-inverso.svg";
  const RAM = { exp: 0, items: [], xml: "", error: "" };
  const ttl = 180000;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const decode = (s) => String(s || "").replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (m,k)=>{
    const v=k.toLowerCase(); if(v[0]==="#"){const n=v[1]==="x"?parseInt(v.slice(2),16):parseInt(v.slice(1),10);return Number.isFinite(n)&&n>0?String.fromCodePoint(Math.min(n,0x10ffff)):m}
    return ({amp:"&",lt:"<",gt:">",quot:'"',apos:"'",nbsp:" "}[v]||m);
  });
  const textOnly = (s) => decode(decode(s).replace(/<[^>]*>/g," ")).replace(/\s+/g," ").trim();
  function field(xml, tag) {
    const pattern = new RegExp("<" + tag.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + tag.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") + "\\s*>","i");
    const m = xml.match(pattern);
    return m ? decode(m[1]).trim() : "";
  }
  function attribute(tag,key) {
    if(!tag)return "";
    const m = tag.match(new RegExp("(?:^|\\s)"+key+"\\s*=\\s*([\"'])(.*?)\\1","i"));
    return m?decode(m[2]):"";
  }
  function safeURL(value) {
    try {const u=new URL(String(value||""));return u.protocol==="https:"||u.protocol==="http:"?u.href:"";}catch{return ""}
  }
  function slugify(x) {
    return String(x||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,105);
  }
  function timestamp(s) {const n=Date.parse(s||"");return Number.isFinite(n)?n:0}
  function episodesFromRSS(xml) {
    if(!/<rss[\s>]/i.test(xml)||!/<channel[\s>]/i.test(xml))throw Error("RSS 2.0 inválido");
    const raw = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item\s*>/gi)].map(m=>m[1]);
    const result=raw.map((item,index)=>{
      const name=textOnly(field(item,"title"))||"Episódio sem título";
      const guid=textOnly(field(item,"guid"))||textOnly(field(item,"link"))||name;
      const pub=field(item,"pubDate")||field(item,"dc:date");
      const enc=item.match(/<enclosure\b[^>]*\/?>/i)?.[0]||"";
      const media=item.match(/<media:content\b[^>]*\/?>/i)?.[0]||"";
      const audio=safeURL(attribute(enc,"url")||attribute(media,"url"));
      if(!audio)return null;
      const coverNode=item.match(/<itunes:image\b[^>]*\/?>/i)?.[0]||"";
      const mediaThumb=item.match(/<media:thumbnail\b[^>]*\/?>/i)?.[0]||"";
      const cover=safeURL(attribute(coverNode,"href")||attribute(mediaThumb,"url"))||FALLBACK_COVER;
      const desc=textOnly(field(item,"itunes:summary")||field(item,"description")||field(item,"content:encoded")).slice(0,2800);
      const episodeNum=Number(field(item,"itunes:episode"));
      const slugBase=slugify(name)||"episodio";
      const dateToken=pub?new Date(timestamp(pub)).toISOString().slice(0,10).replace(/-/g,""):"audio";
      const stableName=slugBase.startsWith("episodio-")?slugBase:"episodio-"+(episodeNum>0?episodeNum:dateToken)+"-"+slugBase;
      return {id:guid,title:name,audio,cover,description:desc,pub,published:timestamp(pub),duration:textOnly(field(item,"itunes:duration")),number:Number.isFinite(episodeNum)&&episodeNum>0?episodeNum:null,slug:stableName,sourceIndex:index};
    }).filter(Boolean);
    result.sort((a,b)=>b.published-a.published||a.sourceIndex-b.sourceIndex);
    const used=new Set();
    for(const p of result){const orig=p.slug;let n=2;while(used.has(p.slug))p.slug=orig+"-"+n++;used.add(p.slug)}
    return result;
  }
  async function load(env) {
    if(Date.now()<RAM.exp)return {items:RAM.items,xml:RAM.xml,error:RAM.error};
    try{
      const req = new Request(SOURCE_URL,{headers:{"Accept":"application/rss+xml"}});
      const res = env.PODCAST_FEED ? await env.PODCAST_FEED.fetch(req) : await fetch(req);
      if(!res.ok)throw Error("Feed respondeu HTTP "+res.status);
      const xml=await res.text();const items=episodesFromRSS(xml);
      RAM.items=items;RAM.xml=xml;RAM.error="";RAM.exp=Date.now()+ttl;
      return {items,xml,error:""};
    }catch(e){
      RAM.error="Não foi possível atualizar o feed neste momento.";
      RAM.exp=Date.now()+20000;
      return {items:RAM.items,xml:RAM.xml,error:RAM.error};
    }
  }
  function dateBR(ts) {return ts?new Intl.DateTimeFormat("pt-BR",{timeZone:"UTC",day:"2-digit",month:"short",year:"numeric"}).format(new Date(ts)):"Data não informada"}
  function head({title,desc,path="/",ogImage=FALLBACK_COVER,type="website",noindex=false,structured}) {
    const u=ORIGIN+path;
    return '<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<meta name="theme-color" content="#06182c"><title>'+esc(title)+'</title><meta name="description" content="'+esc(desc)+'">'+
      '<link rel="canonical" href="'+esc(u)+'"><meta property="og:type" content="'+esc(type)+'"><meta property="og:site_name" content="Podcast Banca Digital"><meta property="og:locale" content="pt_BR">'+
      '<meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(desc)+'"><meta property="og:url" content="'+esc(u)+'"><meta property="og:image" content="'+esc(ogImage)+'">'+
      '<meta name="twitter:card" content="summary_large_image"><link rel="alternate" type="application/rss+xml" title="Podcast Banca Digital" href="'+ORIGIN+'/rss.xml">'+
      '<link rel="icon" href="/favicon.svg" type="image/svg+xml">'+(noindex?'<meta name="robots" content="noindex,nofollow">':'')+
      (structured?'<script type="application/ld+json">'+JSON.stringify(structured).replace(/</g,"\\u003c")+'</script>':"")+
      '<link rel="stylesheet" href="/assets/styles.css"></head><body><a class="skip" href="#main">Pular para conteúdo</a>';
  }
  function navbar() {
    return '<header class="topbar"><div class="wrap topbar-inner">'+
      '<a href="/" class="brand" aria-label="Podcast Banca Digital, página inicial"><img src="'+MARK+'" width="45" height="45" alt="" decoding="async"><span><b>BANCA PAULISTA</b><small>PODCAST · BANCA DIGITAL</small></span></a>'+
      '<nav class="nav" aria-label="Navegação principal"><a href="/">Início</a><a href="/#episodios">Episódios</a><a href="https://bancapaulista.org/radio">Rádio ao vivo</a><a href="https://bancapaulista.org/noticias">Notícias</a></nav>'+
      '<a class="nav-rss" href="/rss.xml"><span class="rss-icon">◉</span> ASSINAR RSS</a></div></header>';
  }
  function footer() {
    return '<footer class="footer"><div class="wrap foot-grid"><div class="footer-brand"><img src="'+MARK+'" alt="" width="42" height="42"><div><b>BANCA PAULISTA</b><small>Jornalismo · Direito · Cidadania</small></div></div>'+
      '<div class="footer-links"><a href="https://bancapaulista.org">Portal</a><a href="https://bancapaulista.org/radio">Rádio</a><a href="https://bancapaulista.org/noticias">Notícias</a><a href="/rss.xml">RSS</a></div></div>'+
      '<div class="wrap foot-bottom"><span>© '+new Date().getUTCFullYear()+' Banca Paulista. Conteúdo informativo não substitui orientação profissional.</span><span>Podcast Banca Digital · São Paulo</span></div></footer>';
  }
  function playerBar(){
    return '<aside class="audio-dock" id="audio-dock" hidden aria-label="Reprodutor de podcast"><button class="dock-close" id="audio-close" type="button" aria-label="Fechar player">×</button>'+
      '<img id="audio-art" alt="" src="'+FALLBACK_COVER+'" width="64" height="64"><div class="dock-copy"><b id="audio-title">Podcast Banca Digital</b><small id="audio-status">Pronto para reproduzir</small><input aria-label="Progresso da reprodução" id="audio-seek" type="range" min="0" max="100" step=".1" value="0"></div>'+
      '<button type="button" id="audio-play" class="round-btn" aria-label="Reproduzir ou pausar">▶</button><div class="dock-time" id="audio-time">0:00</div><label class="dock-volume">♫ <input type="range" id="audio-volume" min="0" max="1" step=".05" value=".8" aria-label="Volume"></label>'+
      '<audio id="audio-element" preload="none"></audio></aside><script src="/assets/app.js" defer></script>';
  }
  function card(p,i) {
    const link="/"+p.slug;
    return '<article class="episode-card" data-episode="'+esc(p.id)+'">'+
      '<a class="cover-link" href="'+esc(link)+'" aria-label="Detalhes de '+esc(p.title)+'"><img loading="lazy" decoding="async" width="400" height="400" src="'+esc(p.cover)+'" alt="Capa do episódio: '+esc(p.title)+'"><span class="cover-tag">EPISÓDIO '+String(p.number||i+1).padStart(2,"0")+'</span></a>'+
      '<div class="card-body"><div class="card-meta"><span>'+esc(dateBR(p.published))+'</span>'+(p.duration?'<span>'+esc(p.duration)+'</span>':'')+'</div>'+
      '<h3><a href="'+esc(link)+'">'+esc(p.title)+'</a></h3><p>'+esc((p.description||"Ouça este episódio do Podcast Banca Digital.").slice(0,145))+'</p>'+
      '<div class="card-actions"><button type="button" class="play-episode" data-audio="'+esc(p.audio)+'" data-art="'+esc(p.cover)+'" data-title="'+esc(p.title)+'" aria-label="Ouvir '+esc(p.title)+'"><span aria-hidden="true">▶</span> Ouvir episódio</button><a href="'+esc(link)+'" class="details">Detalhes ↗</a></div></div></article>';
  }
  function rootPage(feed) {
    const items=feed.items;const first=items[0];
    const siteSchema={"@context":"https://schema.org","@type":"PodcastSeries","name":"Podcast Banca Digital","url":ORIGIN+"/","description":"Episódios sobre justiça, instituições, cidadania e as histórias que movimentam São Paulo.","publisher":{"@type":"Organization","name":"Banca Paulista","url":"https://bancapaulista.org"}};
    const top=head({title:"Podcast Banca Digital | Jornalismo, Direito e São Paulo",desc:"Ouça os episódios do Podcast Banca Digital: notícias, análises, Direito, Justiça e histórias de São Paulo, em áudio e sob demanda.",structured:siteSchema});
    return top+navbar()+'<main id="main">'+
      '<section class="hero"><div class="hero-photo" role="presentation" style="background-image:linear-gradient(90deg,#06182b 2%,rgba(6,24,43,.93) 32%,rgba(6,24,43,.52) 65%,rgba(6,24,43,.75) 100%),url('+BG+')"></div><div class="hero-glow"></div>'+
      '<div class="wrap hero-inner"><div class="hero-copy"><p class="eyebrow"><i></i> UMA PRODUÇÃO BANCA PAULISTA</p><p class="hero-radio">ÁUDIO & JORNALISMO</p><h1><span>PODCAST</span><strong>BANCA DIGITAL</strong></h1>'+
      '<p class="hero-kicker">INFORMAÇÃO EM TODO LUGAR</p><p class="hero-desc">O que acontece em São Paulo merece mais que uma manchete. Histórias, contexto e perspectivas para ouvir quando quiser.</p>'+
      '<div class="hero-buttons"><a class="btn-gold" href="#episodios">EXPLORAR EPISÓDIOS <span>↗</span></a><a class="btn-line" href="https://bancapaulista.org/radio">◉ RÁDIO AO VIVO</a></div></div>'+
      '<div class="hero-visual"><span class="visual-ring ring1"></span><span class="visual-ring ring2"></span><img src="'+FALLBACK_COVER+'" width="360" height="360" alt="Capa do Podcast Banca Digital"><div class="on-air">PODCAST<br><small>ON DEMAND</small></div></div></div>'+
      '<div class="hero-wave" aria-hidden="true">'+Array.from({length:60},(_,i)=>'<i style="height:'+Math.round(5+36*Math.pow(Math.abs(Math.sin(i*0.71)*Math.cos(i*.27)),.95))+'px"></i>').join("")+'</div></section>'+
      '<section class="featured wrap" aria-labelledby="latest"><div class="section-head"><div><p class="eyebrow">DIRETO DO ESTÚDIO</p><h2 id="latest">Ouça o último episódio</h2><p>Comece pelo assunto mais recente ou explore nosso acervo.</p></div><a href="/rss.xml" class="text-link">ASSINAR O FEED ↗</a></div>'+
      (first?'<article class="featured-episode"><img src="'+esc(first.cover)+'" width="210" height="210" loading="lazy" alt="Capa do episódio mais recente"><div class="featured-info"><span class="tag-gold">MAIS RECENTE · '+esc(dateBR(first.published))+'</span><h3><a href="/'+esc(first.slug)+'">'+esc(first.title)+'</a></h3><p>'+esc((first.description||"Ouça o episódio mais recente.").slice(0,260))+'</p><div class="featured-actions"><button class="btn-gold play-episode" type="button" data-audio="'+esc(first.audio)+'" data-art="'+esc(first.cover)+'" data-title="'+esc(first.title)+'">▶ OUVIR AGORA</button><a href="/'+esc(first.slug)+'" class="btn-outline">VER EPISÓDIO ↗</a></div></div></article>':
      '<div class="empty-feature"><span class="empty-mic">◉</span><div><h3>Nossos episódios estarão aqui.</h3><p>'+(feed.error?esc(feed.error):'Assim que um episódio for publicado no feed oficial, ele aparecerá automaticamente neste portal.')+'</p></div></div>')+'</section>'+
      '<section class="episodes-section" id="episodios"><div class="wrap"><div class="section-head"><div><p class="eyebrow">O ACERVO BANCA DIGITAL</p><h2>Todos os episódios</h2><p>Reportagens, entrevistas e análises para escutar no seu ritmo.</p></div><span class="count-pill">'+items.length+' EPISÓDIO'+(items.length===1?'':'S')+'</span></div>'+
      (items.length?'<div class="search-wrap"><label for="search-episodes">BUSCAR EPISÓDIOS</label><input type="search" id="search-episodes" placeholder="Buscar por assunto, título ou palavra-chave..." autocomplete="off"></div><div class="episode-grid" id="episode-grid">'+items.map(card).join("")+'</div><p id="search-empty" class="search-empty" hidden>Nenhum episódio corresponde à busca.</p>':
      '<div class="empty-episodes">Ainda não há episódios disponíveis neste feed. O catálogo será atualizado automaticamente conforme as publicações.</div>')+'</div></section>'+
      '<section class="bridge wrap"><div><p class="eyebrow">BANCA PAULISTA</p><h2>Jornalismo para ler. Histórias para ouvir.</h2><p>Acompanhe também as reportagens e a programação ao vivo da Banca Digital.</p></div><div class="bridge-links"><a href="https://bancapaulista.org/noticias">NOTÍCIAS ↗</a><a href="https://bancapaulista.org/radio">RÁDIO ONLINE ↗</a></div></section>'+
      '</main>'+footer()+playerBar()+'</body></html>';
  }
  function episodePage(ep,all) {
    const desc=(ep.description||"Ouça este episódio do Podcast Banca Digital sobre os assuntos que movimentam São Paulo.").slice(0,160);
    const episodeSchema={"@context":"https://schema.org","@type":"PodcastEpisode","name":ep.title,"description":desc,"url":ORIGIN+"/"+ep.slug,"datePublished":ep.published?new Date(ep.published).toISOString():undefined,"image":ep.cover,"partOfSeries":{"@type":"PodcastSeries","name":"Podcast Banca Digital","url":ORIGIN},"associatedMedia":{"@type":"AudioObject","contentUrl":ep.audio,"encodingFormat":/\.(mp3)(?:\?|$)/i.test(ep.audio)?"audio/mpeg":undefined}};
    const top=head({title:ep.title+" | Podcast Banca Digital",desc,path:"/"+ep.slug,ogImage:ep.cover,type:"article",structured:episodeSchema});
    const recs=all.filter(x=>x.id!==ep.id).slice(0,3);
    return top+navbar()+'<main id="main"><section class="episode-hero"><picture class="episode-backdrop" aria-hidden="true"><img src="/assets/bg-banca-1280.avif" srcset="/assets/bg-banca-960.avif 960w, /assets/bg-banca-1280.avif 1280w, /assets/bg-banca-1600.avif 1600w" sizes="100vw" width="1920" height="912" alt="" fetchpriority="high" loading="eager" decoding="async"></picture><div class="wrap"><div class="crumb"><a href="/">Podcast Banca Digital</a> <span>›</span> Episódios <span>›</span> '+esc(ep.title)+'</div>'+
      '<div class="episode-layout">'+
      '<div class="episode-intro"><p class="eyebrow">PODCAST BANCA DIGITAL</p><h1>'+esc(ep.title)+'</h1><div class="episode-pills"><span>'+esc(dateBR(ep.published))+'</span>'+(ep.duration?'<span>'+esc(ep.duration)+'</span>':'')+(ep.number?'<span>Episódio '+ep.number+'</span>':'')+'</div>'+
      '<p class="episode-summary">'+esc(desc)+'</p><div class="episode-actions"><button class="btn-gold play-episode" type="button" data-audio="'+esc(ep.audio)+'" data-art="'+esc(ep.cover)+'" data-title="'+esc(ep.title)+'">▶ OUVIR EPISÓDIO</button><button class="btn-outline share-episode" type="button">COMPARTILHAR ↗</button></div><div class="episode-inline-art"><img src="'+esc(ep.cover)+'" alt="" width="72" height="72" loading="lazy" decoding="async"><span>Capa oficial deste episódio</span></div>'+
      '<p class="small-disclaimer">Informações e análises de caráter editorial. Não substituem orientação jurídica profissional.</p></div></div></div></section>'+
      '<section class="episode-body wrap"><div class="about-episode"><p class="eyebrow">SOBRE ESTE EPISÓDIO</p><h2>Sinopse</h2><p>'+esc(ep.description||"A descrição deste episódio ainda não está disponível no feed RSS.")+'</p>'+
      '<div class="episode-source"><strong>Escute também pelo seu agregador.</strong><a href="/rss.xml">Assinar o feed RSS ↗</a></div></div></section>'+
      (recs.length?'<section class="episodes-section related"><div class="wrap"><div class="section-head"><div><p class="eyebrow">CONTINUE OUVINDO</p><h2>Outros episódios</h2></div><a href="/" class="text-link">VER TODOS ↗</a></div><div class="episode-grid">'+recs.map(card).join("")+'</div></div></section>':"")+'</main>'+footer()+playerBar()+'</body></html>';
  }

  // Background assets are generated from the approved bg_banca.jpg photograph.
  // Supply /assets/bg-banca-{960,1280,1600}.avif before promoting this build.
  const CSS = `
:root{color-scheme:dark;--navy:#06182c;--mid:#0b2744;--gold:#d3a35f;--ivory:#f9f3e7;--muted:#b0bdca}
*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#06182c;color:var(--ivory);font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit;text-decoration:none}button,input{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed}img{display:block;max-width:100%}[hidden]{display:none!important}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid var(--gold);outline-offset:4px}.skip{position:absolute;z-index:99;transform:translateY(-150%);left:20px;background:var(--gold);color:var(--navy);padding:10px}.skip:focus{transform:none}.wrap{width:min(1180px,calc(100% - 48px));margin:auto}
.topbar{background:#061528ed;border-bottom:1px solid #d3a35f3d;position:relative;z-index:5}.topbar-inner{display:flex;align-items:center;gap:26px;justify-content:space-between;min-height:76px}.brand{display:flex;align-items:center;gap:12px;min-width:210px}.brand img{flex:none;width:42px;height:42px}.brand b,.footer-brand b{display:block;font:700 22px/1.1 Georgia,serif;white-space:nowrap;letter-spacing:-.02em}.brand small,.footer-brand small{display:block;font-size:9px;color:var(--gold);font-weight:700;letter-spacing:.12em;margin-top:6px}.nav{display:flex;gap:29px;font-size:13px;align-items:center}.nav a:hover,.footer a:hover{color:var(--gold)}.nav-rss{white-space:nowrap;border:1px solid #c89b593f;padding:10px 16px;color:var(--gold);font-size:11px;font-weight:750;letter-spacing:.09em;border-radius:4px}.rss-icon{padding-right:7px}
.hero{min-height:575px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#071d34}.hero-photo{position:absolute;inset:0;background-size:cover;background-position:center 53%;opacity:.8}.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#06182c 1%,transparent 24%);pointer-events:none}.hero-glow{position:absolute;width:680px;height:580px;right:-80px;top:-130px;background:radial-gradient(ellipse,#d3a35f17 0%,transparent 67%)}.hero-inner{position:relative;z-index:1;display:grid;grid-template-columns:1.25fr .75fr;align-items:center;gap:50px;padding:78px 0 90px}.hero-copy{max-width:700px}.eyebrow{font-size:11px;letter-spacing:.22em;font-weight:800;color:var(--gold);margin:0 0 12px;text-transform:uppercase}.eyebrow i{display:inline-block;width:28px;height:1px;vertical-align:middle;background:var(--gold);margin-right:12px}.hero-radio{font-size:clamp(16px,2.1vw,23px);font-weight:400;letter-spacing:.51em;margin:18px 0 3px;color:white}.hero h1{font-family:Georgia,"Times New Roman",serif;font-weight:400;line-height:.96;margin:0;text-shadow:0 3px 28px #06182c88}.hero h1 span{display:none}.hero h1 strong{font-weight:400;font-size:clamp(51px,6.2vw,88px);letter-spacing:-.045em;color:#f7e8c9;background:linear-gradient(120deg,#dbac66,#fff4dd 48%,#b98845);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero-kicker{letter-spacing:.36em;font-size:13px;color:#f9f3e7;white-space:normal;margin:15px 0 28px}.hero-desc{max-width:525px;line-height:1.8;color:#d0dce8;font-size:16px}.hero-buttons{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:31px}.btn-gold,.btn-outline,.btn-line{display:inline-flex;align-items:center;justify-content:center;gap:12px;border-radius:4px;min-height:47px;padding:12px 22px;font-size:12px;letter-spacing:.06em;font-weight:800}.btn-gold{background:linear-gradient(125deg,#eac387,#c3934e);color:#06182c;border:1px solid #e0ac68}.btn-gold:hover{filter:brightness(1.12)}.btn-outline,.btn-line{border:1px solid #d3a35f8c;background:#06182c77;color:#f9e6c6}.btn-outline:hover,.btn-line:hover{background:#d3a35f23}.hero-visual{display:grid;place-items:center;position:relative;isolation:isolate;min-height:340px}.hero-visual img{height:min(30vw,330px);width:min(30vw,330px);min-height:240px;min-width:240px;object-fit:cover;border:1px solid #d3a35f91;border-radius:22px;box-shadow:0 20px 70px #000a,0 0 0 12px #d3a35f0c;position:relative;z-index:2}.visual-ring{position:absolute;border:1px solid #d3a35f33;transform:rotate(12deg);border-radius:18px;width:80%;height:89%}.ring2{width:90%;height:108%;transform:rotate(-10deg);opacity:.4}.on-air{position:absolute;bottom:13px;right:8px;z-index:3;background:#071a30ed;padding:10px 15px;border:1px solid #d3a35f6e;color:var(--gold);font-weight:800;letter-spacing:.21em;font-size:13px;text-align:center}.on-air small{font-size:8px;letter-spacing:.18em;color:#e2d3bb}.hero-wave{position:absolute;z-index:3;bottom:12px;left:0;right:0;display:flex;gap:5px;align-items:center;justify-content:center;opacity:.54;height:50px;overflow:hidden}.hero-wave i{display:inline-block;width:2px;background:var(--gold);border-radius:4px}
.featured{padding-top:66px;padding-bottom:70px}.section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:28px}.section-head h2,.bridge h2,.episode-body h2{font:400 clamp(31px,3.5vw,44px)/1.1 Georgia,serif;margin:0}.section-head p:not(.eyebrow),.bridge p:not(.eyebrow){color:var(--muted);font-size:14px;margin:10px 0 0}.text-link{font-size:11px;font-weight:800;letter-spacing:.08em;color:var(--gold);white-space:nowrap}.featured-episode{display:flex;align-items:center;gap:35px;border:1px solid #d3a35f39;background:linear-gradient(128deg,#0c2b49,#071a31);padding:22px;border-radius:10px}.featured-episode>img{width:200px;height:200px;object-fit:cover;border-radius:8px;flex:none}.featured-info{min-width:0}.tag-gold{color:var(--gold);letter-spacing:.14em;font-size:11px;font-weight:800}.featured-info h3{font:400 clamp(28px,3vw,39px)/1.1 Georgia,serif;margin:13px 0}.featured-info h3 a:hover{color:var(--gold)}.featured-info p{color:var(--muted);font-size:14px;line-height:1.7;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.featured-actions{display:flex;gap:11px;flex-wrap:wrap;margin-top:20px}.empty-feature{display:flex;gap:23px;align-items:center;padding:34px;border:1px solid #d3a35f40;background:#0b2744;border-radius:8px}.empty-feature h3{font:400 27px Georgia,serif;margin:0 0 7px}.empty-feature p{color:#b9c5cf;margin:0}.empty-mic{font-size:42px;color:var(--gold)}
.episodes-section{background:#081d34;padding:74px 0 82px;border-top:1px solid #d3a35f20}.episode-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:23px}.episode-card{border:1px solid #d3a35f2a;border-radius:8px;background:#0e2a46;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,border-color .2s}.episode-card:hover{transform:translateY(-2px);border-color:#d3a35f99}.cover-link{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;background:#081b2e}.cover-link img{width:100%;height:100%;object-fit:cover;object-position:center}.cover-link:after{content:"";position:absolute;inset:30% 0 0;background:linear-gradient(0deg,#06182c82,transparent);pointer-events:none}.cover-tag{position:absolute;z-index:1;left:12px;bottom:12px;background:#06182ce3;border:1px solid #d3a35f6d;color:#e5c28b;font-size:10px;font-weight:800;letter-spacing:.1em;padding:5px 9px}.card-body{padding:19px 19px 20px;display:flex;flex-direction:column;flex:1}.card-meta{color:#d2a970;text-transform:uppercase;font-size:10px;letter-spacing:.12em;display:flex;gap:15px}.episode-card h3{font:400 25px/1.17 Georgia,serif;margin:10px 0}.episode-card h3 a:hover{color:var(--gold)}.episode-card p{color:#b9c5cf;font-size:13px;line-height:1.65;margin:0 0 20px;flex:1}.card-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #ffffff13;padding-top:13px}.play-episode{cursor:pointer}.card-actions button{border:0;background:transparent;color:#e7be7b;font-size:12px;font-weight:750;padding:8px 0}.card-actions button:hover{color:white}.details{color:#becad4;font-size:12px}.details:hover{color:var(--gold)}.count-pill{border:1px solid #d3a35f49;border-radius:3px;color:#dfb879;font-size:10px;letter-spacing:.16em;padding:8px 12px;white-space:nowrap}.search-wrap{margin:0 0 24px}.search-wrap label{font-size:10px;letter-spacing:.14em;color:var(--gold);display:block;margin-bottom:9px;font-weight:800}.search-wrap input{border:1px solid #ffffff2e;background:#07182d;color:white;border-radius:5px;padding:12px 16px;width:min(100%,620px);outline-offset:3px}.search-empty,.empty-episodes{background:#0e2a46;border:1px solid #d3a35f24;padding:26px;color:#cad2dd;border-radius:7px}
.bridge{padding:60px 0 66px;display:flex;justify-content:space-between;align-items:center;gap:25px}.bridge>div:first-child{max-width:620px}.bridge-links{display:flex;gap:12px;flex-wrap:wrap}.bridge-links a{border:1px solid #d3a35f84;color:#e8bc76;padding:13px 18px;font-size:11px;font-weight:800;letter-spacing:.08em}.bridge-links a:hover{background:#d3a35f1f}
.episode-hero{position:relative;isolation:isolate;min-height:550px;overflow:hidden;background:#06182c;border-bottom:1px solid #d3a35f34;padding:28px 0 54px}.episode-backdrop{position:absolute;inset:0;z-index:-2;display:block}.episode-backdrop img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 55%}.episode-hero:after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(90deg,rgba(3,16,31,.95) 0%,rgba(5,21,39,.84) 36%,rgba(5,21,39,.35) 76%,rgba(5,21,39,.18) 100%),linear-gradient(0deg,rgba(5,21,39,.45),transparent 42%)}.crumb{font-size:12px;color:#9eb4c8;margin-bottom:45px}.crumb a{color:#c79d5d}.crumb span{padding:0 12px;color:#9f875f}.episode-layout{display:flex;align-items:center;min-height:430px}.episode-intro{max-width:740px;padding:18px 0}.episode-inline-art{display:flex;align-items:center;gap:12px;margin-top:21px;color:#c9bba8;font-size:12px}.episode-inline-art img{width:72px;height:72px;object-fit:cover;border:1px solid #d3a35f70;border-radius:6px}.episode-intro h1{font:400 clamp(38px,5vw,62px)/1.08 Georgia,serif;margin:15px 0 24px}.episode-pills{display:flex;gap:9px;flex-wrap:wrap}.episode-pills span{border:1px solid #d3a35f54;border-radius:3px;padding:6px 11px;font-size:12px;color:#dec28f}.episode-summary{color:#ccd7df;line-height:1.8;font-size:16px;max-width:700px;margin:24px 0}.episode-actions{display:flex;gap:12px;flex-wrap:wrap}.small-disclaimer{color:#8298aa;font-size:11px;margin-top:26px}.episode-body{padding:65px 0 80px}.about-episode{max-width:850px}.about-episode>p:not(.eyebrow){color:#d1dce4;line-height:1.9;white-space:pre-line}.episode-source{border-top:1px solid #d3a35f40;margin-top:32px;padding-top:22px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:13px}.episode-source a{color:var(--gold)}.related{padding-top:62px}
.footer{border-top:1px solid #d3a35f6b;background:#041222;padding:30px 0 20px}.foot-grid{display:flex;justify-content:space-between;align-items:center;gap:20px}.footer-brand{display:flex;align-items:center;gap:13px}.footer-brand b{font-size:22px}.footer-links{display:flex;align-items:center;gap:19px;color:#cbd2d9;font-size:12px}.foot-bottom{margin-top:23px;border-top:1px solid #ffffff16;padding-top:15px;display:flex;justify-content:space-between;gap:12px;color:#8094a5;font-size:11px}
.audio-dock{position:fixed;z-index:90;left:50%;bottom:18px;transform:translateX(-50%);width:min(830px,calc(100% - 26px));display:flex;align-items:center;gap:13px;background:#07182df7;border:1px solid #d3a35f92;box-shadow:0 12px 60px #000b;border-radius:10px;padding:12px 17px 12px 14px;backdrop-filter:blur(12px)}.audio-dock>img{width:62px;height:62px;border-radius:5px;object-fit:cover}.dock-copy{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}.dock-copy b{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dock-copy small{font-size:11px;color:#b5c2cf}.dock-copy input{width:100%;height:4px;accent-color:var(--gold)}.dock-time{white-space:nowrap;font-size:11px;color:#cad1d8}.round-btn{flex:none;border-radius:50%;width:45px;height:45px;border:0;background:var(--gold);color:#06182c}.dock-close{position:absolute;right:0;top:-28px;background:transparent;color:white;border:0;padding:5px 10px}.dock-volume{white-space:nowrap;color:var(--gold);font-size:15px}.dock-volume input{width:80px;vertical-align:middle;accent-color:var(--gold)}
@media(max-width:1000px){.nav{gap:14px}.hero-inner{gap:25px}.hero h1 strong{font-size:clamp(48px,6.7vw,75px)}.episode-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:740px){.topbar-inner{min-height:70px}.nav{display:none}.brand{min-width:0}.brand b{font-size:19px}.nav-rss{padding:10px;font-size:10px}.hero{min-height:auto}.hero-inner{grid-template-columns:1fr;padding:60px 0 87px}.hero-radio{letter-spacing:.25em}.hero h1 strong{font-size:clamp(44px,10vw,70px)}.hero-visual{min-height:280px}.hero-visual img{height:240px;width:240px}.hero-copy{max-width:590px}.hero-kicker{letter-spacing:.15em;font-size:11px}.featured{padding-top:48px;padding-bottom:55px}.featured-episode{flex-direction:column;align-items:stretch}.featured-episode>img{width:170px;height:170px}.episode-layout{display:flex;min-height:480px}.episode-backdrop img{object-position:77% 50%}.episode-hero:after{background:linear-gradient(90deg,rgba(4,18,34,.92),rgba(4,18,34,.71) 100%),linear-gradient(0deg,rgba(4,18,34,.54),transparent 75%)}.crumb{margin-bottom:20px}.episode-hero{padding:25px 0 38px;min-height:560px}.episode-intro{padding:16px 0}.bridge{flex-direction:column;align-items:stretch}.foot-grid,.foot-bottom{flex-direction:column;align-items:flex-start}.section-head{align-items:flex-start}.audio-dock{gap:9px}.dock-volume{display:none}}
@media(max-width:540px){.wrap{width:calc(100% - 34px)}.brand img{width:35px;height:35px}.brand b{font-size:17px}.brand small{font-size:8px}.nav-rss{font-size:0;padding:10px 12px}.nav-rss .rss-icon{font-size:18px;padding:0}.hero-inner{padding-top:49px}.hero-desc{font-size:14px}.hero-radio{font-size:14px}.hero h1 strong{font-size:clamp(36px,10.8vw,56px)}.hero-visual{min-height:235px}.hero-visual img{min-height:190px;min-width:190px;width:190px;height:190px}.on-air{right:0;bottom:5px}.hero-buttons{gap:9px}.btn-gold,.btn-outline,.btn-line{padding:12px;font-size:10px}.hero-kicker{margin-bottom:18px}.hero-wave{opacity:.3}.featured-episode>img{width:140px;height:140px}.episode-grid{grid-template-columns:1fr}.section-head{gap:14px;flex-wrap:wrap}.section-head h2{font-size:34px}.foot-grid{gap:25px}.footer-links{flex-wrap:wrap}.audio-dock>img{width:43px;height:43px}.audio-dock{padding:10px;gap:10px}.dock-time{display:none}.dock-copy b{font-size:12px}.episode-intro h1{font-size:39px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;
  const JS = `
(()=>{"use strict";
const $=(id)=>document.getElementById(id),audio=$("audio-element"),dock=$("audio-dock"),play=$("audio-play"),vol=$("audio-volume"),seek=$("audio-seek");
if(!audio||!dock)return;
let chosen="";
function fmt(s){if(!Number.isFinite(s))return"0:00";return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}
function resetButtons(){document.querySelectorAll(".play-episode").forEach(b=>{b.setAttribute("aria-pressed",String(b.dataset.audio===chosen&&!audio.paused));});}
function repaint(){const active=!audio.paused&&!audio.ended;play.textContent=active?"❚❚":"▶";play.setAttribute("aria-label",active?"Pausar podcast":"Reproduzir podcast");$("audio-status").textContent=active?"Reproduzindo agora":(audio.error?"Não foi possível reproduzir este áudio":"Pausado");resetButtons();}
function requestPlay(){audio.play().catch(()=>{$("audio-status").textContent="Toque novamente para iniciar a reprodução.";repaint()})}
document.addEventListener("click",(event)=>{const b=event.target.closest(".play-episode");if(b){event.preventDefault();const u=b.dataset.audio;if(!u)return;if(chosen===u){if(audio.paused)requestPlay();else audio.pause();return}chosen=u;audio.pause();audio.src=u;audio.load();$("audio-title").textContent=b.dataset.title||"Podcast Banca Digital";$("audio-art").src=b.dataset.art||"";dock.hidden=false;requestPlay()}});
play.addEventListener("click",()=>{if(audio.paused)requestPlay();else audio.pause()});
$("audio-close").addEventListener("click",()=>{audio.pause();audio.removeAttribute("src");audio.load();chosen="";dock.hidden=true;resetButtons()});
vol.addEventListener("input",()=>audio.volume=Number(vol.value));audio.volume=Number(vol.value);
audio.addEventListener("play",repaint);audio.addEventListener("pause",repaint);audio.addEventListener("ended",repaint);audio.addEventListener("error",repaint);
audio.addEventListener("timeupdate",()=>{if(Number.isFinite(audio.duration)&&audio.duration>0){seek.value=String((audio.currentTime/audio.duration)*100);$("audio-time").textContent=fmt(audio.currentTime)+" / "+fmt(audio.duration)}});
seek.addEventListener("change",()=>{if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=audio.duration*Number(seek.value)/100});
const search=$("search-episodes");if(search)search.addEventListener("input",()=>{const q=search.value.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLowerCase();let seen=0;document.querySelectorAll("#episode-grid .episode-card").forEach(el=>{const hay=el.textContent.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLowerCase();el.hidden=!hay.includes(q);if(!el.hidden)seen++});$("search-empty").hidden=seen!==0});
document.querySelectorAll(".share-episode").forEach(b=>b.addEventListener("click",async()=>{try{if(navigator.share){await navigator.share({title:document.title,url:location.href})}else{await navigator.clipboard.writeText(location.href);b.textContent="LINK COPIADO ✓"}}catch{}}));
})();
`;
  function response(body,{status=200,type="text/html; charset=utf-8",cache="public,max-age=180",robots}={}) {
    const headers=new Headers({"Content-Type":type,"Cache-Control":cache,"X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"});
    if(robots)headers.set("X-Robots-Tag",robots);
    return new Response(body,{status,headers});
  }
  return {async fetch(request,env){
    const u=new URL(request.url);const path=decodeURIComponent(u.pathname).replace(/\/+$/,"")||"/";
    const method=request.method;if(method!=="GET"&&method!=="HEAD")return response("Método não permitido",{status:405,type:"text/plain; charset=utf-8",cache:"no-store"});
    const robots=u.hostname.endsWith(".workers.dev")?"noindex, nofollow":undefined;
    const done=(b,o={})=>{const r=response(method==="HEAD"?null:b,{...o,robots});return r};
    if(path==="/favicon.svg"){const s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#06182c"/><path d="M10 23 32 9l22 14v3H10zm5 7h6v20h-6zm14 0h6v20h-6zm14 0h6v20h-6zM9 53h46v4H9z" fill="#d3a35f"/></svg>';return done(s,{type:"image/svg+xml",cache:"public,max-age=86400"})}
    if(path==="/assets/styles.css")return done(CSS,{type:"text/css; charset=utf-8",cache:"public,max-age=3600"});
    if(path==="/assets/app.js")return done(JS,{type:"text/javascript; charset=utf-8",cache:"public,max-age=3600"});
    if(path==="/healthz")return done("ok",{type:"text/plain; charset=utf-8",cache:"no-store"});
    if(path==="/rss"){return Response.redirect(ORIGIN+"/rss.xml",308)}
    if(path==="/rss.xml"){
      const feed=await load(env);
      if(!feed.xml)return done("Feed temporariamente indisponível.",{status:502,type:"text/plain; charset=utf-8",cache:"no-store"});
      const xml=feed.xml.replace(/<atom:link\b[^>]*\brel\s*=\s*["']self["'][^>]*\/?>/gi,(tag)=>tag.replace(/\bhref\s*=\s*(["'])[^"']*\1/i,'href="'+ORIGIN+'/rss.xml"'));
      return done(xml,{type:"application/rss+xml; charset=utf-8",cache:"public,max-age=120,s-maxage=180"});
    }
    if(path==="/robots.txt")return done("User-agent: *\nAllow: /\nSitemap: "+ORIGIN+"/sitemap.xml\n",{type:"text/plain; charset=utf-8",cache:"public,max-age=3600"});
    if(path==="/sitemap.xml"){
      const feed=await load(env);const pages=[{loc:ORIGIN+"/",changefreq:"daily"}].concat(feed.items.map(e=>({loc:ORIGIN+"/"+e.slug,lastmod:e.published?new Date(e.published).toISOString().slice(0,10):undefined})));
      const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(p=>'<url><loc>'+esc(p.loc)+'</loc>'+(p.lastmod?'<lastmod>'+p.lastmod+'</lastmod>':'')+'</url>').join("")+'</urlset>';
      return done(xml,{type:"application/xml; charset=utf-8"});
    }
    const feed=await load(env);
    if(path==="/")return done(rootPage(feed));
    if(path.startsWith("/episodio-")){
      const ep=feed.items.find(x=>"/"+x.slug===path);
      if(ep)return done(episodePage(ep,feed.items));
    }
    const title="Página não encontrada | Podcast Banca Digital";
    const html=head({title,desc:"O episódio solicitado não foi encontrado.",path,noindex:true})+navbar()+'<main id="main" class="wrap" style="padding:90px 0 120px"><p class="eyebrow">404</p><h1 style="font:400 44px Georgia,serif">Episódio não encontrado</h1><p style="color:#c8d4df">Verifique o endereço ou explore todos os episódios.</p><a href="/" class="btn-gold">VER EPISÓDIOS ↗</a></main>'+footer()+'</body></html>';
    return done(html,{status:404,cache:"no-store"});
  }};
})();