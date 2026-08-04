import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { MenuCard } from "@/components/menu/MenuCard";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import { cn } from "@/lib/utils";

type FilterId = "all" | MenuCategory;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...menuCategories,
];

const BASE_URL = "https://velvet-brew-foundation.lovable.app";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Velvet Brew" },
      {
        name: "description",
        content:
          "Explore Velvet Brew's full menu: single-origin coffee, seasonal beverages, breakfast, mains, and handcrafted desserts.",
      },
      { property: "og:title", content: "Menu — Velvet Brew" },
      {
        property: "og:description",
        content:
          "Single-origin coffee, seasonal drinks, breakfast, mains, and desserts — crafted daily in-house.",
      },
      { property: "og:url", content: `${BASE_URL}/menu` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/menu` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: "Velvet Brew Menu",
          hasMenuSection: menuCategories.map((cat) => ({
            "@type": "MenuSection",
            name: cat.label,
            hasMenuItem: menuItems
              .filter((i) => i.category === cat.id)
              .map((i) => ({
                "@type": "MenuItem",
                name: i.name,
                description: i.description,
                offers: {
                  "@type": "Offer",
                  price: i.price.replace(/[^0-9.]/g, ""),
                  priceCurrency: "USD",
                  availability:
                    i.available === false
                      ? "https://schema.org/OutOfStock"
                      : "https://schema.org/InStock",
                },
              })),
          })),
        }),
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<FilterId>("all");

  const visibleItems = useMemo(
    () => (active === "all" ? menuItems : menuItems.filter((i) => i.category === active)),
    [active],
  );

  return (
    <>
      {/* Page header */}
      <header className="border-b border-border bg-gradient-to-b from-secondary/30 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-3 font-medium text-sm uppercase tracking-[0.2em] text-accent">
            Our Menu
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Crafted daily, served with care.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Single-origin espresso, seasonal drinks, and a small kitchen menu built around the
            market. Everything here is made in-house from ingredients we'd cook with at home.
          </p>
        </div>
      </header>

      {/* Filter pills */}
      <Section size="sm" className="pt-8 sm:pt-10">
        <div
          role="tablist"
          aria-label="Menu categories"
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="menu-grid"
                onClick={() => setActive(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          id="menu-grid"
          role="tabpanel"
          key={active}
          className="mt-8 grid animate-fade-in grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
        >
          {visibleItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {visibleItems.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            Nothing in this category right now — check back soon.
          </p>
        )}
      </Section>
    </>
  );
}
