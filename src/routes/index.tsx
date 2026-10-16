import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Values } from "@/components/site/Values";
import { GrowthExplorer } from "@/components/site/GrowthExplorer";
import { HealthBenefits } from "@/components/site/HealthBenefits";
import { Gallery } from "@/components/site/Gallery";
import { SeedCollection } from "@/components/site/SeedCollection";

import { Footer } from "@/components/site/Footer";

import { CustomCursor } from "@/components/site/CustomCursor";
import { CookieConsent } from "@/components/site/CookieConsent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
      { name: "keywords", content: "Natursense, csíramagok, csíramag, klice, seme za klijanje, Szabadka, Subotica, brokkoli csíra, lucerna, mungobab, retek, görögszéna" },
      { property: "og:url", content: "https://verdant-flow-lab.lovable.app/" },
      { property: "og:site_name", content: "Natursense" },
      { property: "og:locale", content: "hu_HU" },
    ],
    links: [{ rel: "canonical", href: "https://verdant-flow-lab.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://verdant-flow-lab.lovable.app/#business",
          name: "Natursense",
          alternateName: ["Natursense csíramagok", "Natursense klice", "Natursense Szabadka"],
          description: "Csíramagok otthoni csíráztatáshoz — seme za klijanje.",
          url: "https://verdant-flow-lab.lovable.app/",
          telephone: "+381638405686",
          email: "natursense2026@gmail.com",
          address: { "@type": "PostalAddress", addressLocality: "Subotica", addressCountry: "RS" },
          areaServed: ["RS", "HU"],
          priceRange: "349 RSD",
          sameAs: ["https://instagram.com/natursense.rs", "https://www.facebook.com/natursense.rs"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Natursense",
          url: "https://verdant-flow-lab.lovable.app/",
          inLanguage: ["hu", "sr-Latn"],
        }),
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
        <SeedCollection />
        <Gallery />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
