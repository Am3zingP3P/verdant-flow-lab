import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/I18nProvider";
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
      { title: "Natursense — Living seeds, raw vitality" },
      { name: "description", content: "Ultra-premium organic sprout and microgreen seeds from Hungary & Serbia. Living energy from a single seed." },
      { property: "og:title", content: "Natursense — Living seeds, raw vitality" },
      { property: "og:description", content: "Living sprouts and microgreens for your kitchen counter." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <I18nProvider>
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
    </I18nProvider>
  );
}
