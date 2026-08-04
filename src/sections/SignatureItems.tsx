import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { MenuCard } from "@/components/menu/MenuCard";
import { signatureItems } from "@/data/menu";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

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

export function SignatureItems() {
  return (
    <Section
      id="signature-items"
      size="lg"
      aria-labelledby="signature-items-title"
      eyebrow="Chef's Selection"
      title="What we're pouring — and plating — right now"
      description="A handful of favourites from the menu, chosen for the season and made with the same care as everything else we serve."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {signatureItems.map((item, index) => (
          <Reveal key={item.id} delay={index * 80}>
            <MenuCard item={item} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={signatureItems.length * 80 + 100}>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link to="/menu" className="inline-flex items-center gap-2">
              View Full Menu
              <ArrowRight size={18} aria-hidden />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
