/**
 * Site-wide brand constants. Sections should read copy from /data or /lib
 * rather than hard-coding strings.
 */
export const site = {
  name: "Velvet Brew",
  tagline: "Slow coffee, softly served.",
  description:
    "A specialty cafe pouring single-origin espresso, hand-crafted pastries, and unhurried afternoons.",
  nav: [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ],
} as const;
