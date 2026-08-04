import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { cafe } from "@/data/cafe";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    value: cafe.address.full,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.address.full)}`,
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: cafe.phone.label,
    href: cafe.phone.href,
  },
  {
    icon: Mail,
    label: "Email",
    value: cafe.email.label,
    href: cafe.email.href,
  },
];

export function VisitUs() {
  const [ref, visible] = useReveal<HTMLElement>({ threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  return (
    <Section
      ref={ref}
      eyebrow="Visit Us"
      title="Find your way to Velvet Brew"
      description="Step inside for the aroma of freshly roasted beans, warm light, and a seat waiting just for you."
      className="bg-cream"
    >
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Info block */}
        <div
          className={cn(
            "flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="space-y-8">
            <address className="not-italic">
              <ul className="space-y-6">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-4 text-foreground transition-colors hover:text-accent"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/30 text-secondary-foreground">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="block text-base font-medium underline-offset-4 group-hover:underline">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/30 text-secondary-foreground">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Business Hours
                </span>
              </div>
              <dl className="ml-14 grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 text-sm">
                {cafe.hours.map(({ day, time }) => (
                  <div key={day} className="contents">
                    <dt className="font-medium text-foreground">{day}</dt>
                    <dd className="text-muted-foreground">{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cafe.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Velvet Brew"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get Directions
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href={cafe.phone.href} aria-label={`Call ${cafe.phone.label}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </a>
            </Button>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          className={cn(
            "relative min-h-[22rem] overflow-hidden rounded-2xl border border-border bg-muted shadow-soft transition-all duration-700 delay-150",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
          aria-label="Map placeholder for Velvet Brew location"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1.5rem 1.5rem, var(--color-border) 1.5px, transparent 0)",
              backgroundSize: "2rem 2rem",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="mb-4 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-accent/10 text-accent shadow-soft">
              <MapPin className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="max-w-xs text-lg font-medium text-foreground">
              {cafe.address.full}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Interactive map embed coming soon.
            </p>
          </div>
          <div className="absolute bottom-4 right-4 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
            Brooklyn, NY
          </div>
        </div>
      </div>
    </Section>
  );
}
