import type { Lang } from "@/i18n/context";

export type SectionKey = "story" | "explorer" | "gallery" | "contact" | "benefits" | "collection";

/** Localized URL hash per section (what users see in the address bar). */
export const sectionSlugs: Record<Lang, Record<SectionKey, string>> = {
  hu: {
    collection: "csiramagok",
    story: "csiraztatas",
    explorer: "novekedes",
    gallery: "galeria",
    contact: "kapcsolat",
    benefits: "elonyok",
  },
  sr: {
    collection: "seme-za-klijanje",
    story: "klijanje",
    explorer: "rast",
    gallery: "galerija",
    contact: "kontakt",
    benefits: "prednosti",
  },
};

/** Resolve any localized or legacy hash to the real DOM section id. */
export function resolveSectionId(hash: string): string {
  for (const lang of Object.keys(sectionSlugs) as Lang[]) {
    for (const [key, slug] of Object.entries(sectionSlugs[lang])) {
      if (slug === hash) return key;
    }
  }
  return hash;
}
