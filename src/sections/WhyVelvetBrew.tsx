import { Leaf, Flame, Coffee, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const usps = [
  {
    icon: Leaf,
    title: "Farm-Direct Ingredients",
    description:
      "We source single-origin beans and seasonal produce from growers we know by name, paying fair prices for harvests that taste like where they came from.",
  },
  {
    icon: Flame,
    title: "Obsessive Roasting Craft",
    description:
      "Every batch is profiled in-house on our small drum roaster, tasted twice, and rested to its sweet spot before it ever reaches the grinder.",
  },
  {
    icon: Coffee,
    title: "Barista-Led Expertise",
    description:
      "Our team trains weekly on extraction, milk texture, and sensory calibration so your pour-over, flat white, or espresso is dialed in with precision.",
  },
  {
    icon: HeartHandshake,
    title: "Genuinely Warm Service",
    description:
      "No scripts, no rush. We remember regulars, welcome newcomers, and treat every order as a chance to make someone’s day a little softer.",
  },
  {
    icon: ShieldCheck,
    title: "Spotless, Open Standards",
    description:
      "From grinder burrs to pastry cases, cleanliness is part of the ritual. Our kitchen and bar follow rigorous daily protocols you can see and taste.",
  },
  {
    icon: Users,
    title: "Rooted in the Neighbourhood",
    description:
      "Velvet Brew is a local gathering place: we host cuppings, showcase neighbourhood makers, and donate monthly to a nearby food rescue.",
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

export function WhyVelvetBrew() {
  return (
    <Section
      id="why-velvet-brew"
      size="lg"
      aria-labelledby="why-velvet-brew-title"
      eyebrow="Why Velvet Brew"
      title="The details that make the difference"
      description="Great coffee is the beginning. What keeps people coming back is the care woven into every part of the experience."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {usps.map((usp, index) => (
          <Reveal key={usp.title} delay={index * 100}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elegant sm:p-8">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <usp.icon size={24} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mb-3 font-display text-xl font-medium leading-tight tracking-tight">
                {usp.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {usp.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
