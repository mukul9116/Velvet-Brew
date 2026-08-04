import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/sections/Hero";
import { BrandStory } from "@/sections/BrandStory";
import { WhyVelvetBrew } from "@/sections/WhyVelvetBrew";
import { SignatureItems } from "@/sections/SignatureItems";
import { GalleryPreview } from "@/sections/GalleryPreview";
import { Testimonials } from "@/sections/Testimonials";
import { VisitUs } from "@/sections/VisitUs";
import { CTABanner } from "@/sections/CTABanner";

const BASE_URL = "https://velvet-brew-foundation.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:url", content: `${BASE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/` }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <WhyVelvetBrew />
      <SignatureItems />
      <GalleryPreview />
      <Testimonials />
      <VisitUs />
      <CTABanner />
    </>
  );
}
