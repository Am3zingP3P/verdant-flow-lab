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
      { title: "Natursense - Saját magad termeled, öt nap múlva eheted." },
      {
        name: "description",
        content: "Bio csíramagok Szerbiából. Termessz friss csírákat otthon!",
      },
      {
        property: "og:title",
        content: "Natursense - Saját magad termeled, öt nap múlva eheted.",
      },
      {
        property: "og:description",
        content: "Bio csíramagok Szerbiából. Termessz friss csírákat otthon!",
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
