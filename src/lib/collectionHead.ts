import type { Lang } from "@/i18n/context";
import { collectionCopy } from "@/i18n/collection";
import { collectionPaths, seedProducts } from "@/lib/seedCollection";

const origin = "https://verdant-flow-lab.lovable.app";

export function collectionHead(lang: Lang) {
  const c = collectionCopy[lang];
  const url = `${origin}${collectionPaths[lang]}`;
  const title = lang === "hu" ? "Natursense csíramagok — Öt fajta, 349 RSD / csomag" : "Natursense seme za klijanje — Pet vrsta, 349 RSD po pakovanju";
  const description = lang === "hu" ? "Brokkoli, lucerna, mungobab, görögszéna és retek csíramag, egyenként 349 RSD / csomag. Fedezd fel a kínálatot, a csíráztatási tudnivalókat, és írj nekünk." : "Brokoli, lucerka, mung pasulj, piskavica i rotkvica: 349 RSD po pakovanju. Pogledaj ponudu, savete za klijanje i bezbednost hrane, pa nam pošalji upit.";
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url },
      { property: "og:locale", content: lang === "hu" ? "hu_HU" : "sr_RS" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "hu", href: `${origin}${collectionPaths.hu}` },
      { rel: "alternate", hrefLang: "sr-Latn", href: `${origin}${collectionPaths.sr}` },
      { rel: "alternate", hrefLang: "x-default", href: `${origin}${collectionPaths.hu}` },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url,
      inLanguage: lang === "hu" ? "hu" : "sr-Latn",
      mainEntity: { "@type": "ItemList", numberOfItems: seedProducts.length,
        itemListElement: seedProducts.map((p, index) => ({ "@type": "ListItem", position: index + 1,
          item: { "@type": "Product", name: `${c.products[p.key].name} ${c.label}`, description: c.products[p.key].description,
            brand: { "@type": "Brand", name: "Natursense" },
            offers: { "@type": "Offer", price: p.price, priceCurrency: "RSD", url: `${url}#seed-products`, seller: { "@type": "Organization", name: "Natursense" } },
          },
        })),
      },
    }) }],
  };
}