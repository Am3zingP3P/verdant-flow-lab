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
import { PaletteShowcase } from "@/components/site/PaletteShowcase";
import { CustomCursor } from "@/components/site/CustomCursor";
import { CookieConsent } from "@/components/site/CookieConsent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Natursense" },
      { name: "description", content: "Organic sprout seeds from Serbia. Grow fresh sprouts at home — living energy from a single seed." },
      { property: "og:title", content: "Natursense" },
      { property: "og:description", content: "Organic sprout seeds from Serbia. Grow fresh sprouts at home — living energy from a single seed." },
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
      <PaletteShowcase />
      <CookieConsent />
    </div>
  );
}
