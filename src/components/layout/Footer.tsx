import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/data/site";
import { cafe } from "@/data/cafe";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
];

export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-border bg-card"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl text-primary">
                {site.name}
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {site.tagline} A small cafe with slow rituals, seasonal beans, and
              a soft place to sit.
            </p>

            <form
              className="mt-8 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label
                htmlFor="newsletter-email"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-accent"
              >
                Slow news, once a month
              </label>
              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@morning.coffee"
                  className="h-11 flex-1 bg-background placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="!size-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Quick links */}
          <nav
            aria-label="Footer"
            className="md:col-span-3"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Explore
            </p>
            <ul className="space-y-3">
              {site.nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground transition-colors hover:text-accent focus-visible:outline-hidden focus-visible:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + hours */}
          <div className="md:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Visit
            </p>
            <address className="not-italic space-y-3 text-sm text-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>
                  {cafe.address.street}<br />
                  {cafe.address.city}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <a href={cafe.phone.href} className="hover:text-accent">
                  {cafe.phone.label}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <a href={cafe.email.href} className="hover:text-accent">
                  {cafe.email.label}
                </a>
              </div>
            </address>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                <Clock className="size-3.5" aria-hidden="true" />
                Hours
              </div>
              <dl className="space-y-1.5 text-sm">
                {cafe.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{h.day}</dt>
                    <dd className="font-medium text-foreground">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name} Coffee Co. · Roasted with intent
            in Brooklyn.
          </p>
          <ul className="flex items-center gap-2" aria-label="Social media">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${site.name} on ${label}`}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-accent hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
