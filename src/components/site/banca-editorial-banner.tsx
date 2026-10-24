import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "./primitives";
import {
  BANCA_EDITORIAL_BANNER_SIZES,
  BANCA_EDITORIAL_IMAGE_SRC,
  BANCA_EDITORIAL_IMAGE_SRCSET,
} from "./banca-editorial-image";

/** Institutional editorial banner; the photograph is decorative and copy stays accessible HTML. */
export function BancaEditorialBanner({ cta = "news" }: { cta?: "about" | "news" }) {
  const about = cta === "about";

  return (
    <section className="relative isolate min-h-[19rem] overflow-hidden border-y border-gold/30 bg-brand-navy text-ivory md:min-h-[16rem]">
      <picture className="absolute inset-0 -z-20 block size-full">
        <img
          src={BANCA_EDITORIAL_IMAGE_SRC}
          srcSet={BANCA_EDITORIAL_IMAGE_SRCSET}
          sizes={BANCA_EDITORIAL_BANNER_SIZES}
          alt=""
          aria-hidden="true"
          width={2048}
          height={768}
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          className="size-full object-cover object-[60%_50%] md:object-[72%_50%]"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061a2d] via-[#061a2d]/90 to-[#061a2d]/20 md:via-[#061a2d]/75 md:to-transparent"
      />
      <Container className="relative flex min-h-[19rem] items-center py-8 md:min-h-[16rem] md:py-7">
        <div className="max-w-[62%] md:max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Banca Paulista</p>
          <h2 className="mt-2 font-serif text-xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            Jornalismo independente sobre o que importa para São Paulo.
          </h2>
          <p className="mt-3 max-w-xl text-xs leading-5 text-ivory/90 sm:text-sm md:leading-6">
            Justiça, instituições, cidades e pessoas em reportagens acessíveis e com contexto.
          </p>
          <Link
            to={about ? "/sobre" : "/noticias"}
            className="mt-4 inline-flex min-h-11 max-w-full items-center gap-2 border border-gold bg-brand-navy/50 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {about ? "Conheça a Banca Paulista" : "Acessar notícias"}
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
