import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { HomeNeighborhoodHighlight } from "@/content/local/home-highlights";

export function NeighborhoodCarousel({ items }: { items: HomeNeighborhoodHighlight[] }) {
  const id = useId();
  const viewportRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true, scrollable: false });
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setEdges({
      start: viewport.scrollLeft <= 2,
      end: viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2,
      scrollable: viewport.scrollWidth > viewport.clientWidth + 2,
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    measure();
    viewport.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => {
      viewport.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure, items.length]);

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
  const scroll = (direction: number) => {
    const viewport = viewportRef.current;
    if (viewport)
      viewport.scrollBy({
        left: direction * Math.max(220, viewport.clientWidth * 0.8),
        behavior: behavior(),
      });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    )
      return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const links = Array.from(viewport.querySelectorAll<HTMLAnchorElement>("a"));
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    event.preventDefault();
    if (current < 0 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      scroll(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }
    const targetIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? links.length - 1
          : Math.max(0, Math.min(links.length - 1, current + (event.key === "ArrowLeft" ? -1 : 1)));
    const target = links[targetIndex];
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: behavior() });
  };

  return (
    <div
      className={`home-neighborhood-carousel ${edges.scrollable ? "is-scrollable" : "is-static"}`}
      role="region"
      aria-label="Bairros em destaque"
    >
      {edges.scrollable ? (
        <button
          type="button"
          className="home-carousel-arrow"
          aria-label="Bairros anteriores"
          aria-controls={id}
          disabled={edges.start}
          onClick={() => scroll(-1)}
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
      ) : null}
      <ul
        ref={viewportRef}
        id={id}
        className="home-neighborhoods"
        tabIndex={0}
        aria-label="Bairros em destaque; use as setas para navegar"
        onKeyDown={onKeyDown}
      >
        {items.map(({ id: itemId, nome, asset, alt, href }) => (
          <li key={itemId}>
            <a href={href} className="home-neighborhood">
              <picture>
                <source srcSet={`/images/sp/${asset}.avif`} type="image/avif" />
                <img
                  src={`/images/sp/${asset}.webp`}
                  alt={alt}
                  width={128}
                  height={128}
                  loading="lazy"
                />
              </picture>
              <strong>{nome}</strong>
            </a>
          </li>
        ))}
      </ul>
      {edges.scrollable ? (
        <button
          type="button"
          className="home-carousel-arrow"
          aria-label="Próximos bairros"
          aria-controls={id}
          disabled={edges.end}
          onClick={() => scroll(1)}
        >
          <ArrowRight className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
