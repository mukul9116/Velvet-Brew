import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/data/menu";

interface MenuCardProps {
  item: MenuItem;
  className?: string;
}

const badgeTone: Record<NonNullable<MenuItem["badge"]>, "default" | "secondary" | "outline"> = {
  Popular: "default",
  "Chef's Pick": "secondary",
  New: "outline",
  Seasonal: "outline",
};

export function MenuCard({ item, className }: MenuCardProps) {
  const soldOut = item.available === false;
  return (
    <article
      aria-disabled={soldOut || undefined}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
        "transform-gpu transition-all duration-300 ease-out motion-reduce:transition-none",
        soldOut
          ? "opacity-60 grayscale"
          : "hover:-translate-y-1 hover:shadow-elegant motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.imageAlt}
          width={1024}
          height={1024}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out",
            !soldOut && "group-hover:scale-105",
          )}
        />
        {item.badge && !soldOut && (
          <div className="absolute left-4 top-4">
            <Badge variant={badgeTone[item.badge]}>{item.badge}</Badge>
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
            <span className="rounded-full bg-background/95 px-4 py-1.5 font-medium text-sm tracking-wide text-foreground shadow-soft">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-medium leading-tight tracking-tight">
            {item.name}
          </h3>
          <span className="shrink-0 font-medium text-accent">{item.price}</span>
        </div>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              soldOut ? "bg-muted-foreground" : "bg-emerald-600",
            )}
          />
          <span className={cn("font-medium", soldOut ? "text-muted-foreground" : "text-foreground/80")}>
            {soldOut ? "Sold Out" : "Available"}
          </span>
        </div>
      </div>
    </article>
  );
}

