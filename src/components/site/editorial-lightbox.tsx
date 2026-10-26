import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  createContext,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import logoLightboxUrl from "@/assets/logo-lightbox.avif?url";
import {
  adjacentGalleryIndex,
  galleryImageIndex,
  type EditorialGalleryImage,
  normalizeGalleryImages,
} from "@/components/site/editorial-gallery";

export type { EditorialGalleryImage } from "@/components/site/editorial-gallery";

type GalleryContextValue = {
  images: EditorialGalleryImage[];
  openImage: (image: EditorialGalleryImage, trigger: HTMLButtonElement) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function EditorialLightboxProvider({
  images,
  children,
}: {
  images: EditorialGalleryImage[];
  children: ReactNode;
}) {
  const gallery = useMemo(() => normalizeGalleryImages(images), [images]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeImage = activeIndex === null ? undefined : gallery[activeIndex];
  const hasNavigation = gallery.length > 1;

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) =>
        current === null ? null : adjacentGalleryIndex(current, gallery.length, direction),
      );
    },
    [gallery.length],
  );
  const openImage = useCallback(
    (image: EditorialGalleryImage, trigger: HTMLButtonElement) => {
      const index = galleryImageIndex(gallery, image);
      lastTriggerRef.current = trigger;
      if (index >= 0) setActiveIndex(index);
    },
    [gallery],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!hasNavigation) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, hasNavigation, move]);

  const handlePointerDown = (event: ReactPointerEvent) => {
    pointerStartX.current = event.clientX;
  };
  const handlePointerUp = (event: ReactPointerEvent) => {
    const start = pointerStartX.current;
    pointerStartX.current = null;
    if (!hasNavigation || start === null) return;
    const distance = event.clientX - start;
    if (Math.abs(distance) >= 48) move(distance > 0 ? -1 : 1);
  };

  return (
    <GalleryContext.Provider value={{ images: gallery, openImage }}>
      {children}
      <Dialog.Root open={activeIndex !== null} onOpenChange={(open) => !open && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#03111f]/85 backdrop-blur-[2px] motion-safe:animate-in motion-safe:fade-in motion-reduce:transition-none" />
          <Dialog.Content
            aria-describedby="editorial-lightbox-description"
            className="fixed left-1/2 top-1/2 z-[101] flex max-h-[94dvh] w-[min(96vw,78rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-white shadow-2xl focus:outline-none motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-reduce:transition-none"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              lastTriggerRef.current?.focus();
            }}
          >
            <header className="flex min-h-16 shrink-0 items-center border-b border-[#d9e0e5] px-4 py-3 sm:px-6">
              <img
                src={logoLightboxUrl}
                alt="Banca Paulista"
                className="h-8 w-auto max-w-[8rem] object-contain sm:h-10 sm:max-w-[11rem]"
              />
              <span className="mx-3 h-9 w-px bg-[#b28341] sm:mx-5" aria-hidden="true" />
              <Dialog.Title className="min-w-0 font-[Georgia,serif] text-sm font-bold tracking-[0.08em] text-[#061e30] sm:text-lg">
                GALERIA DE IMAGENS
              </Dialog.Title>
              <Dialog.Close
                className="ml-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[#061e30] hover:bg-[#f0f2f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b28341]"
                aria-label="Fechar galeria"
              >
                <X className="size-6" aria-hidden="true" />
              </Dialog.Close>
            </header>

            <Dialog.Description id="editorial-lightbox-description" className="sr-only">
              Visualização ampliada das imagens desta publicação.
            </Dialog.Description>

            {activeImage ? (
              <div className="min-h-0 overflow-y-auto bg-white">
                <div
                  className="relative flex min-h-[16rem] touch-pan-y items-center justify-center bg-[#061e30] p-2 sm:min-h-[24rem] sm:p-4"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                >
                  <img
                    key={activeImage.url}
                    src={activeImage.url}
                    alt={activeImage.alt}
                    width={activeImage.width}
                    height={activeImage.height}
                    loading="eager"
                    className="max-h-[64dvh] max-w-full select-none object-contain"
                    draggable={false}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#061e30]/90 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/35 sm:left-5 sm:top-5">
                    {(activeIndex ?? 0) + 1} / {gallery.length}
                  </span>
                  {hasNavigation ? (
                    <>
                      <button
                        type="button"
                        onClick={() => move(-1)}
                        className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#061e30]/90 text-white shadow-lg hover:bg-[#102c43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ad69] sm:left-4 sm:size-12"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="size-7" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(1)}
                        className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#061e30]/90 text-white shadow-lg hover:bg-[#102c43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ad69] sm:right-4 sm:size-12"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="size-7" aria-hidden="true" />
                      </button>
                    </>
                  ) : null}
                </div>
                {(activeImage.caption ||
                  activeImage.description ||
                  activeImage.credit ||
                  activeImage.source) && (
                  <div className="max-h-[28dvh] overflow-y-auto border-t-4 border-[#b28341] px-5 py-4 sm:px-7 sm:py-5">
                    {activeImage.caption ? (
                      <p className="font-[Georgia,serif] text-base font-bold leading-6 text-[#061e30] sm:text-lg">
                        {activeImage.caption}
                      </p>
                    ) : null}
                    {activeImage.description ? (
                      <p className="mt-2 text-sm leading-6 text-[#40515f]">
                        {activeImage.description}
                      </p>
                    ) : null}
                    {activeImage.credit || activeImage.source ? (
                      <p className="mt-2 text-xs leading-5 text-[#52616d]">
                        {[activeImage.credit, activeImage.source].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </GalleryContext.Provider>
  );
}

export function EditorialImageTrigger({
  image,
  children,
  className = "",
}: {
  image: EditorialGalleryImage;
  children: ReactNode;
  className?: string;
}) {
  const gallery = useContext(GalleryContext);
  if (!gallery || galleryImageIndex(gallery.images, image) < 0) return children;
  return (
    <button
      type="button"
      onClick={(event) => gallery.openImage(image, event.currentTarget)}
      className={`block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b28341] ${className}`}
      aria-label={`Ampliar imagem: ${image.alt}`}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}
