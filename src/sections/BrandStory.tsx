import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Flame, HandHeart, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import interiorImg from "@/assets/brand-interior.jpg";
import roastingImg from "@/assets/brand-roasting.jpg";
import brewingImg from "@/assets/brand-brewing.jpg";

const highlights = [
  { icon: Flame, label: "Locally Roasted", detail: "Small-batch, weekly" },
  { icon: HandHeart, label: "Handcrafted Daily", detail: "By our baristas" },
  { icon: Leaf, label: "Ethically Sourced", detail: "Direct-trade origins" },
  { icon: Sparkles, label: "Seasonal Menu", detail: "Rotated with care" },
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

export function BrandStory() {
  return (
    <Section id="brand-story" size="lg" aria-labelledby="brand-story-title">

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 items-center">
        {/* Imagery collage */}
        <Reveal className="lg:col-span-6 order-1 lg:order-none">
          <div className="relative grid grid-cols-6 grid-rows-6 gap-4 aspect-[5/6] max-w-xl mx-auto">
            <div className="col-span-4 row-span-4 overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={interiorImg}
                alt="Barista pouring espresso at the Velvet Brew bar"
                width={1200}
                height={1500}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-1 overflow-hidden rounded-2xl shadow-soft">
              <img
                src={roastingImg}
                alt="Freshly roasted coffee beans"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 row-span-3 col-start-4 row-start-4 overflow-hidden rounded-2xl shadow-soft">
              <img
                src={brewingImg}
                alt="Hands pouring a slow pour-over brew"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 via-secondary/10 to-transparent blur-2xl"
            />
          </div>
        </Reveal>

        {/* Story copy */}
        <div className="lg:col-span-6 space-y-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">
              Our Story
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="brand-story-title" className="max-w-xl">
              A quiet corner built around a very loud love of coffee.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground max-w-xl">
              <p>
                Velvet Brew began with a single copper roaster, a battered
                notebook of tasting notes, and a stubborn belief that a cup of
                coffee should feel like a small ceremony. What started as a
                Sunday obsession grew into a neighbourhood ritual.
              </p>
              <p>
                Today, we work directly with growers we know by name, roast in
                small weekly batches, and pull every shot with intention. Every
                pastry is folded by hand at dawn. Nothing is rushed — because
                the best moments rarely are.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 sm:gap-4">
              {highlights.map(({ icon: Icon, label, detail }) => (
                <li
                  key={label}
                  className="flex min-w-0 items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-4 shadow-soft backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground leading-tight break-words">
                      {label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 break-words">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-base font-medium text-primary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
            >
              Read our full story
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
