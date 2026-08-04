import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 md:h-20 md:px-10">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-xl tracking-tight text-primary md:text-2xl">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 md:flex"
          >
            {site.nav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-hidden focus-visible:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden md:inline-flex"
            aria-label="Reserve a table"
          >
            <Button variant="primary" size="sm">
              Reserve a Table
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden min-h-11 min-w-11"
                aria-label="Open menu"
              >
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm border-l border-border bg-background p-0"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <div className="flex h-full flex-col">
                <div className="border-b border-border px-6 py-5">
                  <span className="font-display text-2xl text-primary">
                    {site.name}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {site.tagline}
                  </p>
                </div>
                <nav
                  aria-label="Mobile"
                  className="flex flex-1 flex-col gap-1 px-4 py-6"
                >
                  {site.nav.map((l, i) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 font-display text-2xl text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-hidden"
                      activeProps={{ className: "text-primary" }}
                      activeOptions={{ exact: l.to === "/" }}
                      style={{
                        animation: `fade-in 0.4s ease-out ${i * 60}ms both`,
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-border p-6">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block"
                  >
                    <Button variant="primary" size="lg" className="w-full">
                      Reserve a Table
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
