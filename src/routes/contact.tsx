import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, CalendarCheck, MessageSquare, CheckCircle2 } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cafe } from "@/data/cafe";
import { cn } from "@/lib/utils";

const BASE_URL = "https://velvet-brew-foundation.lovable.app";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Reservations — Velvet Brew" },
      { name: "description", content: "Reserve a table, get directions, or send us a note. We'd love to host you at Velvet Brew in Brooklyn." },
      { property: "og:title", content: "Contact & Reservations — Velvet Brew" },
      { property: "og:description", content: "Reserve a table, get directions, or send us a note." },
      { property: "og:url", content: `${BASE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: cafe.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: cafe.address.street,
            addressLocality: "Brooklyn",
            addressRegion: "NY",
            postalCode: "11201",
            addressCountry: "US",
          },
          telephone: cafe.phone.label,
          email: cafe.email.label,
          url: `${BASE_URL}/`,
          openingHours: [
            "Mo-Th 07:00-19:00",
            "Fr 07:00-22:00",
            "Sa 08:00-22:00",
            "Su 08:00-17:00",
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

type ReservationData = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
};

type MessageData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+\d][\d\s\-().]{6,}$/;

const today = () => new Date().toISOString().split("T")[0];

function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfoAndMap />
      <ReservationSection />
      <MessageSection />
    </>
  );
}

function ContactHero() {
  return (
    <Section className="bg-cream pt-16 pb-8">
      <div className="text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Come sit with us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Reserve a table, ask a question, or just say hello. We answer every message personally,
          usually within a few hours.
        </p>
      </div>
    </Section>
  );
}

function ContactInfoAndMap() {
  const items = [
    { icon: MapPin, label: "Address", value: cafe.address.full, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.address.full)}`, external: true },
    { icon: Phone, label: "Phone", value: cafe.phone.label, href: cafe.phone.href },
    { icon: Mail, label: "Email", value: cafe.email.label, href: cafe.email.href },
  ];

  return (
    <Section className="bg-cream pt-4">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div className="space-y-8">
            <address className="not-italic">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-4 text-foreground transition-colors hover:text-accent"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/30 text-secondary-foreground">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="block text-base font-medium underline-offset-4 group-hover:underline">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/30 text-secondary-foreground">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Business Hours
                </span>
              </div>
              <dl className="ml-14 grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 text-sm">
                {cafe.hours.map(({ day, time }) => (
                  <div key={day} className="contents">
                    <dt className="font-medium text-foreground">{day}</dt>
                    <dd className="text-muted-foreground">{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cafe.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Velvet Brew"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get Directions
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href={cafe.phone.href} aria-label={`Call ${cafe.phone.label}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </a>
            </Button>
          </div>
        </div>

        <div
          className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-border bg-muted shadow-soft"
          aria-label="Map placeholder for Velvet Brew location"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1.5rem 1.5rem, var(--color-border) 1.5px, transparent 0)",
              backgroundSize: "2rem 2rem",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="mb-4 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-accent/10 text-accent shadow-soft">
              <MapPin className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="max-w-xs text-lg font-medium text-foreground">{cafe.address.full}</p>
            <p className="mt-2 text-sm text-muted-foreground">Interactive map embed coming soon.</p>
          </div>
          <div className="absolute bottom-4 right-4 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
            Brooklyn, NY
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------- Reservation --------------------- */

function ReservationSection() {
  const [data, setData] = useState<ReservationData>({
    name: "", phone: "", email: "", date: "", time: "", guests: "2", requests: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});
  const [submitted, setSubmitted] = useState<ReservationData | null>(null);

  const validate = (d: ReservationData) => {
    const e: Partial<Record<keyof ReservationData, string>> = {};
    if (!d.name.trim()) e.name = "Please enter your name.";
    else if (d.name.trim().length > 100) e.name = "Name is too long.";
    if (!d.phone.trim()) e.phone = "Phone number is required.";
    else if (!phoneRe.test(d.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!d.email.trim()) e.email = "Email is required.";
    else if (!emailRe.test(d.email.trim())) e.email = "Enter a valid email address.";
    if (!d.date) e.date = "Please choose a date.";
    else if (d.date < today()) e.date = "Date can't be in the past.";
    if (!d.time) e.time = "Please choose a time.";
    const g = Number(d.guests);
    if (!d.guests || Number.isNaN(g) || g < 1) e.guests = "At least 1 guest.";
    else if (g > 20) e.guests = "For parties over 20, please call us.";
    if (d.requests.length > 500) e.requests = "Keep requests under 500 characters.";
    return e;
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const eMap = validate(data);
    setErrors(eMap);
    if (Object.keys(eMap).length === 0) {
      setSubmitted(data);
    }
  };

  const update = <K extends keyof ReservationData>(key: K, value: ReservationData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <Section
      eyebrow="Reservations"
      title="Reserve a table"
      description="Booking ahead is the easiest way to guarantee a seat, especially on weekends. We'll confirm by email within a few hours."
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
        {submitted ? (
          <SuccessState
            icon={CalendarCheck}
            title="Reservation request received"
            body={
              <>
                Thanks, <span className="font-medium text-foreground">{submitted.name}</span>. We've noted a table for{" "}
                <span className="font-medium text-foreground">{submitted.guests}</span> on{" "}
                <span className="font-medium text-foreground">{submitted.date}</span> at{" "}
                <span className="font-medium text-foreground">{submitted.time}</span>. A confirmation will land at{" "}
                <span className="font-medium text-foreground">{submitted.email}</span> shortly.
              </>
            }
            onReset={() => {
              setSubmitted(null);
              setData({ name: "", phone: "", email: "", date: "", time: "", guests: "2", requests: "" });
            }}
            resetLabel="Book another table"
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="r-name" label="Full name" error={errors.name} className="sm:col-span-2">
              <Input
                id="r-name"
                autoComplete="name"
                value={data.name}
                maxLength={100}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "r-name-error" : undefined}
              />
            </Field>
            <Field id="r-phone" label="Phone" error={errors.phone}>
              <Input
                id="r-phone"
                type="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "r-phone-error" : undefined}
              />
            </Field>
            <Field id="r-email" label="Email" error={errors.email}>
              <Input
                id="r-email"
                type="email"
                autoComplete="email"
                value={data.email}
                maxLength={255}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "r-email-error" : undefined}
              />
            </Field>
            <Field id="r-date" label="Date" error={errors.date}>
              <Input
                id="r-date"
                type="date"
                min={today()}
                value={data.date}
                onChange={(e) => update("date", e.target.value)}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "r-date-error" : undefined}
              />
            </Field>
            <Field id="r-time" label="Time" error={errors.time}>
              <Input
                id="r-time"
                type="time"
                value={data.time}
                onChange={(e) => update("time", e.target.value)}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? "r-time-error" : undefined}
              />
            </Field>
            <Field id="r-guests" label="Number of guests" error={errors.guests} className="sm:col-span-2">
              <Input
                id="r-guests"
                type="number"
                min={1}
                max={20}
                inputMode="numeric"
                value={data.guests}
                onChange={(e) => update("guests", e.target.value)}
                aria-invalid={!!errors.guests}
                aria-describedby={errors.guests ? "r-guests-error" : undefined}
              />
            </Field>
            <Field
              id="r-requests"
              label="Special requests"
              optional
              error={errors.requests}
              hint={`${data.requests.length}/500`}
              className="sm:col-span-2"
            >
              <Textarea
                id="r-requests"
                rows={4}
                maxLength={500}
                placeholder="Allergies, celebrations, seating preferences…"
                value={data.requests}
                onChange={(e) => update("requests", e.target.value)}
                aria-invalid={!!errors.requests}
                aria-describedby={errors.requests ? "r-requests-error" : undefined}
              />
            </Field>

            <div className="sm:col-span-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Parties of 8+ — please add a note and we'll confirm the layout.
              </p>
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                Request reservation
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}

/* --------------------- Message --------------------- */

function MessageSection() {
  const [data, setData] = useState<MessageData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof MessageData, string>>>({});
  const [submitted, setSubmitted] = useState<MessageData | null>(null);

  const validate = (d: MessageData) => {
    const e: Partial<Record<keyof MessageData, string>> = {};
    if (!d.name.trim()) e.name = "Please enter your name.";
    else if (d.name.trim().length > 100) e.name = "Name is too long.";
    if (!d.email.trim()) e.email = "Email is required.";
    else if (!emailRe.test(d.email.trim())) e.email = "Enter a valid email address.";
    if (d.subject.length > 120) e.subject = "Subject is too long.";
    if (!d.message.trim()) e.message = "Message can't be empty.";
    else if (d.message.length > 1000) e.message = "Keep messages under 1000 characters.";
    return e;
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const eMap = validate(data);
    setErrors(eMap);
    if (Object.keys(eMap).length === 0) setSubmitted(data);
  };

  const update = <K extends keyof MessageData>(key: K, value: MessageData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <Section
      eyebrow="Say Hello"
      title="Send us a message"
      description="Press, private events, catering, or just a compliment for the kitchen — we read everything."
      className="bg-cream"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
        {submitted ? (
          <SuccessState
            icon={MessageSquare}
            title="Message sent"
            body={
              <>
                Thanks, <span className="font-medium text-foreground">{submitted.name}</span>. We'll reply to{" "}
                <span className="font-medium text-foreground">{submitted.email}</span> shortly.
              </>
            }
            onReset={() => {
              setSubmitted(null);
              setData({ name: "", email: "", subject: "", message: "" });
            }}
            resetLabel="Send another message"
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="m-name" label="Name" error={errors.name}>
              <Input
                id="m-name"
                autoComplete="name"
                value={data.name}
                maxLength={100}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "m-name-error" : undefined}
              />
            </Field>
            <Field id="m-email" label="Email" error={errors.email}>
              <Input
                id="m-email"
                type="email"
                autoComplete="email"
                value={data.email}
                maxLength={255}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "m-email-error" : undefined}
              />
            </Field>
            <Field id="m-subject" label="Subject" optional error={errors.subject} className="sm:col-span-2">
              <Input
                id="m-subject"
                value={data.subject}
                maxLength={120}
                onChange={(e) => update("subject", e.target.value)}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "m-subject-error" : undefined}
              />
            </Field>
            <Field
              id="m-message"
              label="Message"
              error={errors.message}
              hint={`${data.message.length}/1000`}
              className="sm:col-span-2"
            >
              <Textarea
                id="m-message"
                rows={5}
                maxLength={1000}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "m-message-error" : undefined}
              />
            </Field>

            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                Send message
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}

/* --------------------- Shared bits --------------------- */

function Field({
  id, label, error, hint, optional, className, children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {optional && <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>}
        </Label>
        {hint && !error && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessState({
  icon: Icon, title, body, onReset, resetLabel,
}: {
  icon: typeof CheckCircle2;
  title: string;
  body: React.ReactNode;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center" role="status" aria-live="polite">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-8 w-8" aria-hidden="true" />
      </span>
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-3 max-w-md text-muted-foreground">{body}</p>
      <Button onClick={onReset} variant="outline" size="lg" className="mt-6">
        {resetLabel}
      </Button>
    </div>
  );
}
