import { useEffect, useState, useCallback, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: "maya",
    name: "Maya T.",
    role: "Regular guest",
    rating: 5,
    quote:
      "Velvet Brew is my morning ritual. The baristas remember my order, the pour-over is always clean, and the light through those big windows makes even a Tuesday feel special.",
  },
  {
    id: "daniel",
    name: "Daniel R.",
    role: "Coffee traveller",
    rating: 5,
    quote:
      "I’ve had coffee on three continents, and the Ethiopian single-origin here rivals the best I’ve tasted. You can tell the roasting is done with real care.",
  },
  {
    id: "priya-sam",
    name: "Priya & Sam",
    role: "Weekend regulars",
    rating: 5,
    quote:
      "We bring our laptops every Saturday. The pastries are dangerous, the music is just right, and nobody rushes you out. It’s become our second living room.",
  },
  {
    id: "luisa",
    name: "Luisa C.",
    role: "First-time visitor",
    rating: 5,
    quote:
      "Took a friend here for brunch. The avocado toast was beautiful, the latte art made us both smile, and the whole place feels warm without trying too hard.",
  },
  {
    id: "james",
    name: "James K.",
    role: "Espresso enthusiast",
    rating: 5,
    quote:
      "I’m picky about espresso. Velvet Brew’s shot is balanced, sweet, and never burnt. Finally, a neighborhood cafe that takes craft seriously.",
  },
];

function Reveal({
  children,
  delay = 0,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  delay?: number;
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
      {...props}
    >
      {children}
    </div>
  );
}

function AnimatedCard({
  testimonial,
  index,
  visible,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      role="listitem"
    >
      <TestimonialCard testimonial={testimonial} />
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            "shrink-0",
            i < rating ? "fill-accent text-accent" : "text-muted-foreground",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-medium text-accent">
      {initials}
    </span>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <Quote size={28} className="mb-4 text-accent/60" aria-hidden />
      <blockquote className="mb-6 flex-1 text-base leading-relaxed text-card-foreground">
        “{testimonial.quote}”
      </blockquote>
      <footer className="flex items-center gap-3">
        <Avatar name={testimonial.name} />
        <div>
          <p className="font-display text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </footer>
      <div className="mt-4">
        <StarRating rating={testimonial.rating} />
      </div>
    </article>
  );
}

function AggregateBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-soft">
      <div className="flex items-center gap-1">
        <Star size={16} className="fill-accent text-accent" aria-hidden />
        <span className="font-display text-sm font-semibold text-foreground">4.9</span>
      </div>
      <span className="text-xs text-muted-foreground">on Google · 500+ reviews</span>
    </div>
  );
}

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <div
      className="md:hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Guest testimonials"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((t) => (
            <div key={t.id} className="w-full shrink-0 px-1" role="group" aria-roledescription="slide">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2" aria-live="polite" aria-atomic="true">
        <span className="sr-only">Showing testimonial {active + 1} of {testimonials.length}</span>
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-200",
              i === active ? "w-6 bg-accent" : "bg-accent/30 hover:bg-accent/60",
            )}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopGrid({ visible }: { visible: boolean }) {
  return (
    <div
      className="grid gap-6 max-md:hidden md:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Guest testimonials"
    >
      {testimonials.map((t, index) => (
        <AnimatedCard key={t.id} testimonial={t} index={index} visible={visible} />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <Section
      id="testimonials"
      size="lg"
      aria-labelledby="testimonials-title"
      eyebrow="What guests say"
      title="Loved by locals"
      description="Real words from the people who make Velvet Brew part of their routine."
    >
      <div ref={ref}>
        <div className={cn("mb-10 transition-all duration-700 ease-out", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
          <AggregateBadge />
        </div>

        <MobileCarousel />
        <DesktopGrid visible={visible} />
      </div>
    </Section>
  );
}
