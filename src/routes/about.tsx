import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import heroAsset from "@/assets/hero.jpg.asset.json";
import interiorImg from "@/assets/brand-interior.jpg";
import roastingImg from "@/assets/brand-roasting.jpg";
import brewingImg from "@/assets/brand-brewing.jpg";
import baristaImg from "@/assets/gallery-barista.jpg";
import pourImg from "@/assets/gallery-pourover.jpg";
import cornerImg from "@/assets/gallery-corner.jpg";

const BASE_URL = "https://velvet-brew-foundation.lovable.app";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Velvet Brew" },
      {
        name: "description",
        content:
          "The story behind Velvet Brew: a Brooklyn cafe built around single-origin coffee, seasonal cooking, and unhurried craft.",
      },
      { property: "og:title", content: "About — Velvet Brew" },
      {
        property: "og:description",
        content:
          "Our founding story, the people behind the bar, and the sourcing standards that shape everything we serve.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/about` }],
  }),
  component: AboutPage,
});

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
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

const team = [
  {
    name: "Elena Marchetti",
    role: "Founder & Head Roaster",
    bio: "Learned to roast in a tiny shop outside Trieste. Believes the best cup starts with a good farmer.",
    image: baristaImg,
    alt: "Portrait of Elena, head roaster, behind the espresso bar",
  },
  {
    name: "Marcus Okafor",
    role: "Executive Chef",
    bio: "Cooked at farm-to-table kitchens for a decade. Writes the kitchen menu around what the market has today.",
    image: pourImg,
    alt: "Chef Marcus plating a seasonal dish in the open kitchen",
  },
  {
    name: "Sana Iyer",
    role: "Lead Barista",
    bio: "SCA-certified and a two-time regional latte-art finalist. Runs bar training and the pour-over program.",
    image: cornerImg,
    alt: "Barista Sana preparing a pour-over coffee at the bar",
  },
];

const commitments = [
  {
    icon: Leaf,
    title: "Traceable Sourcing",
    body: "Every bean and most produce items are traceable to the farm. We publish our current sourcing partners each season.",
  },
  {
    icon: ShieldCheck,
    title: "A+ Hygiene Standard",
    body: "Independently audited kitchen with a clean full-score record. All allergens are labeled and staff-trained.",
  },
  {
    icon: Coffee,
    title: "Freshly Roasted, Always",
    body: "Coffee is roasted weekly in small batches and rested for the exact time each origin needs before it hits the hopper.",
  },
  {
    icon: Sparkles,
    title: "Made In-House",
    body: "Pastries, syrups, ganaches, and pickles are all made from scratch here. No shortcuts, no mystery ingredients.",
  },
];

function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <header className="relative overflow-hidden bg-ink text-cream">
        <img
          src={heroAsset.url}
          alt="The Velvet Brew dining room bathed in warm afternoon light"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/90"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <p className="mb-4 font-medium text-sm uppercase tracking-[0.25em] text-accent-foreground/90">
            About Velvet Brew
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-[oklch(0.75_0.07_70.88)] sm:text-5xl md:text-6xl lg:text-7xl">
            A small cafe with an obsessive love of coffee.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
            We opened Velvet Brew to slow the morning down — to serve the kind of coffee, food, and
            welcome that turn a quick stop into the best twenty minutes of someone's day.
          </p>
        </div>
      </header>

      {/* Extended brand story */}
      <Section size="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={interiorImg}
                alt="Warm wood-and-brass interior of the Velvet Brew cafe"
                loading="lazy"
                className="col-span-2 aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
              />
              <img
                src={roastingImg}
                alt="Coffee beans mid-roast in a small-batch drum roaster"
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft"
              />
              <img
                src={brewingImg}
                alt="A barista pulling a shot of espresso at the bar"
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="mb-3 font-medium text-sm uppercase tracking-[0.2em] text-accent">
              Our Story
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Built one careful cup at a time.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Velvet Brew started in 2018 as a six-seat espresso bar tucked between a florist and
                a bookshop on Linden Row. Our founder Elena had spent a decade pulling shots in
                Trieste and Melbourne, and she came home with a stubborn conviction: a neighborhood
                cafe should feel like being welcomed into someone's kitchen, and the coffee should
                be as thoughtfully sourced as anything on the menu.
              </p>
              <p>
                Word spread quietly, the way it does when the details are right. Regulars asked
                for breakfast, then lunch, then a place to hold birthdays. Two moves and one small
                kitchen build later, we've grown into the room you see today — but the founding
                idea hasn't changed. We buy directly from a small handful of farms we've visited,
                we roast every week in the room behind the bar, and we cook a short seasonal menu
                that leans on the growers we've known for years.
              </p>
              <p>
                Our philosophy is simple: fewer things, done well. A shorter menu means we can
                obsess over each item. A smaller team means everyone who touches your order is
                someone we've trained ourselves. And an unhurried counter means we have time for
                the conversation that turns a customer into a regular.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Team */}
      <Section size="lg" className="bg-secondary/30">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-medium text-sm uppercase tracking-[0.2em] text-accent">
            The People
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Meet the team behind the bar.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            A small crew of roasters, cooks, and baristas who care a great deal about doing
            this well.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Commitments */}
      <Section size="lg">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-medium text-sm uppercase tracking-[0.2em] text-accent">
            Our Commitments
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Sourcing, quality, and safety you can taste.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The standards we hold ourselves to — because the people who eat and drink here
            deserve to know what's actually in the cup and on the plate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-medium tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <Section size="lg" className="bg-ink text-cream">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-medium text-sm uppercase tracking-[0.2em] text-accent-foreground/90">
            Come Say Hello
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            A seat by the window is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            We'd love to pour you something. Reserve a table for the weekend rush or drop in for a
            slow weekday afternoon — either way, you're welcome here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" variant="default">
              <Link to="/contact">Reserve a Table</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-cream hover:bg-cream/10 hover:text-cream"
            >
              <Link to="/menu">View the Menu</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
