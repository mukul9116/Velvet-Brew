import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const galleryImages = [
  {
    src: galleryInterior,
    alt: "Sunlit Velvet Brew interior with brass pendant lights and wooden tables",
    caption: "The main room",
  },
  {
    src: galleryPourover,
    alt: "Barista pouring a careful pour-over brew",
    caption: "Pour-over ritual",
  },
  {
    src: galleryLatte,
    alt: "Creamy latte art in a ceramic cup",
    caption: "Latte art",
  },
  {
    src: galleryPastries,
    alt: "Golden croissants and berry tarts on a marble counter",
    caption: "Morning pastries",
  },
  {
    src: galleryCustomers,
    alt: "Two guests laughing over coffee by the window",
    caption: "Shared moments",
  },
  {
    src: galleryBarista,
    alt: "Barista pulling espresso on a polished brass machine",
    caption: "Espresso craft",
  },
  {
    src: galleryCorner,
    alt: "Cozy velvet armchair corner with plants and warm lighting",
    caption: "A quiet corner",
  },
  {
    src: galleryBrunch,
    alt: "Avocado toast with poached egg and a latte",
    caption: "Brunch plate",
  },
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

export function GalleryPreview() {
  return (
    <Section
      id="gallery-preview"
      size="lg"
      aria-labelledby="gallery-preview-title"
      eyebrow="A Look Inside"
      title="Moments worth slowing down for"
      description="From the first pour of the morning to the last pastry on the counter, this is what Velvet Brew feels like."
    >
      <div
        className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3"
        role="list"
        aria-label="Gallery preview grid"
      >
        {galleryImages.map((image, index) => (
          <Reveal
            key={image.alt}
            delay={index * 80}
            className="break-inside-avoid"
          >
            <figure
              className="group relative overflow-hidden rounded-2xl bg-muted shadow-soft transition-shadow duration-300 hover:shadow-elegant"
              role="listitem"
            >
              <div className="overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="sr-only">{image.caption}</figcaption>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={galleryImages.length * 80 + 100}>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link to="/gallery" className="inline-flex items-center gap-2">
              View Full Gallery
              <ArrowRight size={18} aria-hidden />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
