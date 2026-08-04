/**
 * Cafe contact, hours, and location data.
 * Used by conversion-focused sections and the site footer.
 */
export const cafe = {
  name: "Velvet Brew",
  address: {
    street: "128 Linden Row",
    city: "Brooklyn, NY 11201",
    full: "128 Linden Row, Brooklyn, NY 11201",
  },
  phone: {
    label: "+1 (718) 555-0142",
    href: "tel:+17185550142",
  },
  email: {
    label: "hello@velvetbrew.co",
    href: "mailto:hello@velvetbrew.co",
  },
  hours: [
    { day: "Mon – Thu", time: "7:00 AM – 7:00 PM" },
    { day: "Fri", time: "7:00 AM – 10:00 PM" },
    { day: "Sat", time: "8:00 AM – 10:00 PM" },
    { day: "Sun", time: "8:00 AM – 5:00 PM" },
  ],
  openToday: "8:00 AM – 10:00 PM",
} as const;
