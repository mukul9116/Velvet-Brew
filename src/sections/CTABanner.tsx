import { Link } from "@tanstack/react-router";
import { Clock, Phone } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { cafe } from "@/data/cafe";

export function CTABanner() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <Section
      id="reserve"
      size="lg"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-ink text-cream"
    >
      {/* Warm gradient blobs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--cream) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className={cn(
          "relative z-10 mx-auto max-w-3xl text-center transition-all duration-700 ease-out will-change-transform",
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-caramel">
          Visit us today
        </p>
        <h2
          id="cta-title"
          className="font-display text-3xl font-medium leading-tight text-cream md:text-5xl"
        >
          Your table is waiting.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">
          Whether it&apos;s a morning espresso, a working lunch, or an unhurried
          evening, we&apos;ll save you the best seat in the house.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="secondary" size="lg">
            <Link to="/contact" aria-label="Reserve a table at Velvet Brew">
              Reserve a Table
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
          >
            <a
              href={cafe.phone.href}
              aria-label={`Call Velvet Brew at ${cafe.phone.label}`}
              className="inline-flex items-center justify-center gap-2"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Us
            </a>
          </Button>
        </div>

        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-cream/10 bg-cream/5 px-5 py-2.5 text-sm text-cream/80">
          <Clock className="size-4 text-caramel" aria-hidden="true" />
          <span>Open Today: {cafe.openToday}</span>
          <span className="hidden sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="text-cream/60">Walk-ins welcome</span>
        </div>
      </div>
    </Section>
  );
}
