import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryPourover from "@/assets/gallery-pourover.jpg";
import galleryLatte from "@/assets/gallery-latte.jpg";
import galleryPastries from "@/assets/gallery-pastries.jpg";
import galleryCustomers from "@/assets/gallery-customers.jpg";
import galleryBarista from "@/assets/gallery-barista.jpg";
import galleryCorner from "@/assets/gallery-corner.jpg";
import galleryBrunch from "@/assets/gallery-brunch.jpg";
import brandInterior from "@/assets/brand-interior.jpg";
import brandBrewing from "@/assets/brand-brewing.jpg";
import brandRoasting from "@/assets/brand-roasting.jpg";
import menuLatte from "@/assets/menu-latte.jpg";
import menuColdbrew from "@/assets/menu-coldbrew.jpg";
import menuTart from "@/assets/menu-tart.jpg";

type Category = "interior" | "food" | "drinks" | "events";

interface Photo {
  src: string;
  alt: string;
  caption: string;
  category: Category;
}

const photos: Photo[] = [
  { src: galleryInterior, alt: "Sunlit Velvet Brew interior with brass pendant lights and wooden tables", caption: "The main room", category: "interior" },
  { src: galleryCorner, alt: "Cozy velvet armchair corner with plants and warm lighting", caption: "A quiet corner", category: "interior" },
  { src: brandInterior, alt: "Warm wood-and-brass interior of the Velvet Brew cafe at dusk", caption: "Evening light", category: "interior" },
  { src: galleryPastries, alt: "Golden croissants and berry tarts on a marble counter", caption: "Morning pastries", category: "food" },
  { src: galleryBrunch, alt: "Avocado toast with poached egg served alongside a latte", caption: "Brunch plate", category: "food" },
  { src: menuTart, alt: "A colorful seasonal fruit tart with figs and berries", caption: "Seasonal tart", category: "food" },
  { src: galleryLatte, alt: "Creamy latte with delicate rosetta art in a ceramic cup", caption: "Latte art", category: "drinks" },
  { src: galleryPourover, alt: "Barista pouring a careful pour-over brew", caption: "Pour-over ritual", category: "drinks" },
  { src: menuLatte, alt: "A warm cortado in a Gibraltar glass on a saucer", caption: "House cortado", category: "drinks" },
  { src: menuColdbrew, alt: "A tall glass of iced cold brew with swirling cream", caption: "Cold brew", category: "drinks" },
  { src: galleryCustomers, alt: "Two guests laughing over coffee by the window", caption: "Shared moments", category: "events" },
  { src: galleryBarista, alt: "Barista pulling espresso on a polished brass machine", caption: "Behind the bar", category: "events" },
  { src: brandBrewing, alt: "The team preparing service before opening", caption: "Opening prep", category: "events" },
  { src: brandRoasting, alt: "Fresh coffee beans mid-roast in the small-batch roaster", caption: "Roast day", category: "events" },
];

const filters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
  { id: "events", label: "Moments" },
];

const BASE_URL = "https://velvet-brew-foundation.lovable.app";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Velvet Brew" },
      { name: "description", content: "A visual tour of the Velvet Brew cafe — interior, food, drinks, and moments from the bar." },
      { property: "og:title", content: "Gallery — Velvet Brew" },
      { property: "og:description", content: "A visual tour of the Velvet Brew cafe — interior, food, drinks, and moments from the bar." },
      { property: "og:url", content: `${BASE_URL}/gallery` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/gallery` }],
  }),
  component: GalleryPage,
});

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function GalleryPage() {
  const [active, setActive] = useState<"all" | Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (active === "all" ? photos : photos.filter((p) => p.category === active)),
    [active],
  );

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((idx) => (idx === null ? idx : (idx + dir + visible.length) % visible.length)),
    [visible.length],
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex, close, step]);

  const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-b from-secondary/30 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-3 font-medium text-sm uppercase tracking-[0.2em] text-accent">Gallery</p>
          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Inside Velvet Brew.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A visual tour through the room, the craft, and the plates and cups that pass across
            the counter every day.
          </p>
        </div>
      </header>

      <Section size="sm" className="pt-8 sm:pt-10" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">Photo gallery</h2>

        {/* Filters */}
        <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2 sm:gap-3">
          {filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Masonry */}
        <div
          key={active}
          className="mt-8 animate-fade-in columns-1 gap-4 space-y-4 sm:columns-2 sm:gap-5 sm:space-y-5 lg:columns-3 lg:gap-6 lg:space-y-6"
        >
          {visible.map((image, i) => (
            <Reveal key={`${active}-${image.src}`} delay={Math.min(i, 8) * 60} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Open image: ${image.caption}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-muted shadow-soft transition-shadow duration-300 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span className="font-display text-lg text-cream">{image.caption}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {current && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.caption} — image ${lightboxIndex + 1} of ${visible.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 animate-fade-in"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-6xl flex-col items-center gap-4"
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-elegant animate-scale-in"
            />
            <figcaption className="text-center text-sm text-cream/85">
              <span className="font-display text-base text-cream">{current.caption}</span>
              <span className="ml-3 text-cream/60">
                {lightboxIndex + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
