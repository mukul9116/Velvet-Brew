# Velvet Brew

> Slow coffee, softly served.

A premium, responsive website for **Velvet Brew**, a fictional specialty cafe in Brooklyn. Built with modern React, TanStack Router, and Tailwind CSS, the site showcases the cafe's brand story, menu, gallery, and reservation experience with a warm, editorial design system.

## Live Preview

- **Preview URL**: https://id-preview--19acc7c7-2f3d-4dda-aa7e-6111ab27456b.lovable.app
- **Published URL**: https://velvet-brew-foundation.lovable.app

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + Vite 8) |
| Router | [TanStack Router](https://tanstack.com/router) (file-based routing) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Primitives | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) conventions |
| Icons | [Lucide React](https://lucide.dev) |
| Forms | [React Hook Form](https://www.react-hook-form.com) + [Zod](https://zod.dev) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com) |
| Linting | ESLint + Prettier |

## Features

- **Responsive, mobile-first layout** — optimized from 360px mobile up to large desktops.
- **Sticky Navbar** with scroll-aware background transition, mobile hamburger menu, and primary CTA.
- **Full homepage** with Hero, Brand Story, Why Velvet Brew, Signature Items, Gallery Preview, Testimonials, Visit Us, and CTA Banner sections.
- **Dedicated pages**: Menu, About, Gallery, Contact, and Style Guide.
- **Interactive menu page** with category tabs, item cards, availability states, and smooth filter transitions.
- **Reservation & inquiry forms** on the Contact page with client-side validation and success states.
- **Gallery lightbox** with keyboard navigation and category filtering.
- **SEO-ready**: per-route meta tags, Open Graph, canonical URLs, JSON-LD structured data, sitemap.xml, and robots.txt.
- **Accessibility**: semantic HTML, ARIA labels, keyboard focus states, and `prefers-reduced-motion` support.

## Project Structure

```text
public/                  # Static assets, robots.txt, llms.txt
src/
  assets/                # Generated images and image metadata
  components/
    layout/              # Navbar, Footer
    menu/                # MenuCard
    ui/                  # shadcn/ui-style reusable primitives (button, etc.)
  data/                  # Centralized copy and menu/cafe data
  hooks/                 # Custom hooks (useReveal, use-mobile)
  lib/                   # Utility helpers and error handling
  routes/                # TanStack file-based routes
  sections/              # Homepage section components
  router.tsx             # Router configuration
  server.ts              # Server entry
  start.ts               # Client entry
  styles.css             # Global styles and design tokens
```

## Design System

The visual identity is defined in `src/styles.css` using `oklch` color tokens and Tailwind v4's `@theme inline`.

### Brand Colors

| Token | Role | Default Value |
| --- | --- | --- |
| `--espresso` | Primary / headings / key actions | Deep roasted brown |
| `--caramel` | Secondary / highlights / focus rings | Warm caramel |
| `--terracotta` | Accent / badges / emphasis | Burnt sienna |
| `--cream` | Page background | Creamy off-white |
| `--ink` | Body text | Soft near-black |

### Typography

- **Display / headings**: *Fraunces* (Google Fonts)
- **Body / UI**: *Inter* (Google Fonts)

### Spacing & Radius

- Base radius: `0.75rem`
- Section wrapper max-width: `1280px`
- Consistent vertical rhythm using Tailwind's spacing scale and custom section padding.

## Available Scripts

```bash
# Start the development server
bun dev

# Build for production
bun run build

# Preview the production build
bun run preview

# Lint the codebase
bun run lint

# Format with Prettier
bun run format
```

## Routes

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | Homepage |
| `/menu` | `src/routes/menu.tsx` | Full menu with category filtering |
| `/about` | `src/routes/about.tsx` | Brand story, team, and commitments |
| `/gallery` | `src/routes/gallery.tsx` | Categorized masonry gallery + lightbox |
| `/contact` | `src/routes/contact.tsx` | Contact info + reservation & inquiry forms |
| `/style-guide` | `src/routes/style-guide.tsx` | Design system reference |
| `/sitemap.xml` | `src/routes/sitemap[.]xml.ts` | Dynamic sitemap |

## SEO & Structured Data

- `src/routes/__root.tsx` injects **Organization** and **WebSite** JSON-LD.
- `src/routes/contact.tsx` injects **CafeOrCoffeeShop** LocalBusiness schema.
- `src/routes/menu.tsx` injects **Menu** schema with item availability.
- `public/robots.txt` allows public routes and disallows `/admin` and `/style-guide`.
- `public/llms.txt` provides a concise summary for LLM crawlers.

## Accessibility Notes

- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`, and correct heading hierarchy.
- All images include descriptive `alt` text.
- Interactive elements have visible focus rings and keyboard support.
- Animations respect `prefers-reduced-motion`.
- Form inputs use `aria-invalid`, `aria-describedby`, and `role="status"` for validation feedback.

## Roadmap / Next Steps

- [ ] Connect reservation and contact forms to a backend (e.g., Lovable Cloud).
- [ ] Replace placeholder map with an embedded interactive map using the real address.
- [ ] Add real team photos and interior imagery.
- [ ] Implement a CMS-driven menu so staff can update items without code changes.
- [ ] Add online ordering or table-booking integration.

## License

This project is a demo/placeholder build for the Velvet Brew brand. All brand copy and generated imagery are for presentation purposes.
