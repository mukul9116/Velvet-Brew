import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/style-guide")({
  head: () => ({
    meta: [
      { title: "Style Guide — Velvet Brew" },
      {
        name: "description",
        content:
          "Velvet Brew design system: colors, typography, buttons, radii, shadows, and spacing.",
      },
      { name: "robots", content: "noindex" },

    ],
  }),
  component: StyleGuide,
});

const swatches = [
  { name: "Background", token: "bg-background", ring: true },
  { name: "Foreground", token: "bg-foreground" },
  { name: "Primary · Espresso", token: "bg-primary" },
  { name: "Secondary · Caramel", token: "bg-secondary" },
  { name: "Accent · Terracotta", token: "bg-accent" },
  { name: "Muted", token: "bg-muted", ring: true },
  { name: "Card", token: "bg-card", ring: true },
  { name: "Border", token: "bg-border", ring: true },
];

const shadows = [
  { name: "shadow-soft", cls: "shadow-soft" },
  { name: "shadow-elegant", cls: "shadow-elegant" },
  { name: "shadow-glow", cls: "shadow-glow" },
];

const radii = [
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
  { name: "2xl", cls: "rounded-2xl" },
  { name: "full", cls: "rounded-full" },
];

function StyleGuide() {
  return (
    <>
      <Section
        eyebrow="01 — Color"
        title="Warm, roasted, unhurried"
        description="A specialty-coffee palette: deep espresso, warm caramel, terracotta warmth against a cream backdrop."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {swatches.map((s) => (
            <div key={s.name} className="space-y-2">
              <div
                className={`${s.token} aspect-[4/3] rounded-xl shadow-soft ${
                  s.ring ? "ring-1 ring-inset ring-border" : ""
                }`}
              />
              <p className="text-xs font-medium text-foreground">{s.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{s.token}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="02 — Typography"
        title="Fraunces meets Inter"
        description="A modern serif for editorial headings, paired with Inter for calm, legible body copy."
      >
        <div className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Display · Fraunces
            </p>
            <h1 className="!text-6xl">The morning ritual</h1>
            <h2 className="mt-4">A quieter kind of café</h2>
            <h3 className="mt-3">Beans, roasted last week</h3>
          </div>
          <div className="border-t border-border pt-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Body · Inter
            </p>
            <p className="max-w-2xl text-lg">
              Larger body — great for lead paragraphs and menu descriptions where
              detail matters and space is generous.
            </p>
            <p className="mt-3 max-w-2xl">
              Default body copy. Comfortable line-height, restrained tracking,
              designed to read for whole minutes at a stretch.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Small · muted — used for captions, meta, and secondary detail.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="03 — Buttons"
        title="Three variants, three sizes"
        description="Every call-to-action across the site comes from one component."
      >
        <div className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-soft">
          {(["primary", "secondary", "ghost", "outline"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-4">
              <span className="w-24 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {v}
              </span>
              <Button variant={v} size="sm">
                Small
              </Button>
              <Button variant={v} size="md">
                Medium
              </Button>
              <Button variant={v} size="lg">
                Large
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="04 — Radii & Shadows" title="Soft, editorial depth">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Border radius
            </p>
            <div className="flex flex-wrap gap-4">
              {radii.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div className={`h-16 w-16 bg-primary ${r.cls}`} />
                  <span className="font-mono text-[11px] text-muted-foreground">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Shadows
            </p>
            <div className="flex flex-wrap gap-6">
              {shadows.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-3">
                  <div className={`h-20 w-20 rounded-xl bg-card ${s.cls}`} />
                  <span className="font-mono text-[11px] text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="05 — Spacing"
        title="A consistent rhythm"
        description="Sections default to md (16/24 vertical) with a 6xl container. Override with size='sm' | 'lg' | 'full'."
      >
        <div className="space-y-3">
          {[4, 6, 8, 12, 16, 24].map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-16 font-mono text-xs text-muted-foreground">p-{n}</span>
              <div
                className="h-4 rounded-full bg-secondary"
                style={{ width: `${n * 8}px` }}
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
