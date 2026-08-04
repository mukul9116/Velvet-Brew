import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroAsset from "@/assets/hero.jpg.asset.json";

function AnimatedItem({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none",
        mounted
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      aria-label="Welcome to Velvet Brew"
      className="relative flex min-h-[calc(100dvh-5rem)] w-full items-center justify-center overflow-hidden"
    >

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt="Warmly lit Velvet Brew coffee bar with brass espresso equipment and a fresh cup of coffee"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1500ms] ease-out will-change-transform motion-reduce:transition-none",
            imageLoaded ? "scale-100" : "scale-105",
          )}
        />
        {/* Dark gradient overlay for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <AnimatedItem delay={100}>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cream/90 backdrop-blur-sm md:mb-5">

              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
              Specialty coffee &amp; slow afternoons
            </p>
          </AnimatedItem>

          <AnimatedItem delay={220}>
            <h1 className="text-[1.75rem] leading-[1.05] text-cream drop-shadow-lg sm:text-[2.25rem] md:text-[3rem] lg:text-[4.25rem]">
              Where every cup is measured in moments, not minutes.
            </h1>
          </AnimatedItem>

          <AnimatedItem delay={340}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/95 drop-shadow-md md:mt-6 md:text-lg lg:text-xl">
              Velvet Brew is a quiet refuge for the coffee-curious — a place of
              copper kettles, single-origin beans, and the unhurried craft of
              pulling the perfect shot.
            </p>
          </AnimatedItem>

          <AnimatedItem delay={460}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-8">

              <Button
                variant="primary"
                size="lg"
                className="bg-cream text-ink hover:bg-cream/90 hover:text-ink focus-visible:ring-cream"
              >
                Reserve a Table
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream focus-visible:ring-cream"
              >
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </AnimatedItem>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <AnimatedItem delay={800} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:bottom-10 sm:block lg:bottom-12">
        <a
          href="#brand-story"
          aria-label="Scroll down to explore Velvet Brew"
          className="group flex flex-col items-center gap-2 rounded-full p-2 text-cream/80 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        >

          <span className="text-[11px] font-medium uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown
            size={20}
            className="animate-bounce"
            aria-hidden
          />
        </a>
      </AnimatedItem>
    </section>
  );
}
