import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Velvet Brew" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Section eyebrow="Admin" title="Reserved">
      <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
        Admin surface — intentionally blank for now.
      </div>
    </Section>
  ),
});
