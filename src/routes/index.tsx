import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Values } from "@/components/site/Values";
import { GrowthExplorer } from "@/components/site/GrowthExplorer";
import { HealthBenefits } from "@/components/site/HealthBenefits";
import { Gallery } from "@/components/site/Gallery";

import { Footer } from "@/components/site/Footer";

import { CustomCursor } from "@/components/site/CustomCursor";
import { CookieConsent } from "@/components/site/CookieConsent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Organic sprout seeds from Serbia. Grow fresh sprouts at home!" },
      {
        name: "description",
        content: "Organic sprout seeds from Serbia. Grow fresh sprouts at home!",
      },
      {
        property: "og:title",
        content: "Organic sprout seeds from Serbia. Grow fresh sprouts at home!",
      },
      {
        property: "og:description",
        content: "Organic sprout seeds from Serbia. Grow fresh sprouts at home!",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-[color:var(--cream)] text-[color:var(--obsidian)]">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Values />
        <HealthBenefits />
        <GrowthExplorer />
        <Gallery />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
