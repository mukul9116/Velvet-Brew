import { forwardRef, type HTMLAttributes, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "full";
  container?: boolean;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
}

const sizeMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  full: "min-h-screen py-16 md:py-24 flex items-center",
} as const;

/**
 * Section — canonical wrapper for every page section.
 * Guarantees consistent max-width, gutter padding, and vertical rhythm.
 * Use `as="section"` (default) or pass another semantic element via `as`.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Tag = "section",
      size = "md",
      container = true,
      eyebrow,
      title,
      description,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Tag
      ref={ref as never}
      className={cn("w-full", sizeMap[size], className)}
      {...props}
    >
      <div className={cn(container && "mx-auto w-full max-w-6xl px-6 md:px-10")}>
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="mb-4">{title}</h2>}
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </Tag>
  ),
);
Section.displayName = "Section";
