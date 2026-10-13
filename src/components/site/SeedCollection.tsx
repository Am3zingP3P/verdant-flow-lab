import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Leaf, Sprout, Utensils, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/context";
import { collectionCopy } from "@/i18n/collection";
import { collectionPaths, collectionPhoto, seedProducts } from "@/lib/seedCollection";

export function SeedCollection({ standalone = false }: { standalone?: boolean }) {
  const { lang } = useI18n();
  const c = collectionCopy[lang];
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="collection" className="seed-collection scroll-mt-20 border-t border-border bg-background text-foreground">
      {!standalone && <div className="seed-wrap flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground"><span>{c.growEyebrow}</span><Link to={collectionPaths[lang]} className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline">{c.fullPage}<ArrowUpRight size={14} /></Link></div>}
      <header className="seed-hero relative isolate overflow-hidden">
        <img src={collectionPhoto} alt={c.familyAlt} className="absolute inset-0 -z-20 h-full w-full object-cover" loading={standalone ? "eager" : "lazy"} decoding="async" />
        <div className="seed-hero-shade absolute inset-0 -z-10" />
        <div className="seed-wrap flex h-full flex-col justify-between gap-10 py-12 md:py-16">
          <div className="max-w-xl">
            <p className="seed-kicker">{c.eyebrow}</p>
            <Heading className="seed-title mt-5">{c.title}</Heading>
            <p className="mt-5 font-display text-2xl italic md:text-3xl">{c.accent}</p>
            <p className="mt-5 max-w-md text-sm leading-7 opacity-90 md:text-base">{c.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="seed-hero-button h-11"><a href="#seed-products">{c.discover}<ArrowDown /></a></Button>
              {standalone && <Button asChild variant="link" className="seed-hero-link h-11 px-0"><a href="#seed-why">{c.whyLink}</a></Button>}
            </div>
          </div>
          <div className="seed-price-glass flex w-fit items-center gap-5 rounded-lg px-5 py-4">
            <span className="font-display text-4xl">350 <span className="font-sans text-sm">RSD</span></span>
            <span className="border-l border-current/25 pl-5 text-xs leading-5">{c.package}<br />{c.varieties}</span>
          </div>
        </div>
      </header>

      <div id="seed-products" className="seed-wrap scroll-mt-24 py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div><p className="seed-kicker text-sprout">{c.varieties}</p><h2 className="seed-section-title mt-3 text-primary">{c.collection}</h2></div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">{c.collectionIntro}</p>
        </div>
        <div className="seed-product-grid">
          {seedProducts.map((p, index) => {
            const copy = c.products[p.key];
            const subject = encodeURIComponent(`Natursense — ${copy.name} ${c.label}`);
            return <article key={p.key} className="seed-product group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary"><img src={p.image} alt={`${copy.name} — ${c.photo}`} loading="lazy" decoding="async" className={`h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025] ${p.key === "fenugreek" ? "object-center" : "object-[60%_center]"}`} /><span className="seed-image-index absolute left-3 top-3 rounded-full px-2.5 py-1.5 text-xs">0{index + 1}</span></div>
              <div className="flex flex-1 flex-col p-5"><p className="text-xs text-sprout">{copy.note}</p><h3 className="mt-2 text-2xl text-primary">{copy.name}</h3><p className="mt-1 text-xs text-muted-foreground">{c.label}</p><p className="mb-6 mt-4 text-sm leading-6 text-muted-foreground">{copy.description}</p><div className="mt-auto border-t border-border pt-4"><p className="flex flex-wrap items-baseline gap-2"><span className="font-display text-2xl text-primary">{p.price} RSD</span><span className="text-xs text-muted-foreground">{c.package}</span></p><Button asChild variant="outline" className="mt-4 w-full justify-between"><a href={`mailto:natursense2026@gmail.com?subject=${subject}`} aria-label={`${copy.name} — ${c.inquire}`}>{c.inquire}<ArrowUpRight /></a></Button></div></div>
            </article>;
          })}
        </div>
        <div className="mt-10 grid items-center gap-5 border-y border-border py-8 md:grid-cols-[1fr_auto]"><div><h2 className="text-2xl text-primary md:text-3xl">{c.priceTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{c.priceText}</p></div><div className="font-display text-4xl text-primary">350 <span className="font-sans text-sm">RSD {c.package}</span></div></div>
        {!standalone && <div className="mt-7 flex justify-center"><Button asChild variant="link"><Link to={collectionPaths[lang]}>{c.fullPage}<ArrowUpRight /></Link></Button></div>}
      </div>
      {standalone && <>
        <section id="seed-why" className="scroll-mt-24 bg-secondary py-14 md:py-20"><div className="seed-wrap"><h2 className="seed-section-title max-w-2xl text-primary">{c.whyTitle}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{c.whyIntro}</p><div className="mt-10 grid gap-8 md:grid-cols-3">{c.whyItems.map((item, i) => { const Icon = [Leaf, Utensils, Sprout][i] ?? Leaf; return <div key={item.title} className="border-t border-border pt-6"><Icon className="mb-5 text-sprout" size={25} strokeWidth={1.3} /><h3 className="text-2xl text-primary">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p></div>; })}</div></div></section>
        <section className="seed-wrap py-14 md:py-20"><p className="seed-kicker text-sprout">{c.growEyebrow}</p><h2 className="seed-section-title mt-3 max-w-2xl text-primary">{c.growTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{c.growIntro}</p><ol className="mt-10 grid gap-8 md:grid-cols-3">{c.steps.map((step, i) => <li key={step.title} className="border-t border-border pt-5"><span className="font-display text-3xl text-sprout">0{i + 1}</span><h3 className="mt-4 text-2xl text-primary">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p></li>)}</ol><div className="mt-12 border-l-2 border-sprout pl-6"><h3 className="text-2xl text-primary">{c.inspiration}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{c.inspirationText}</p></div></section>
        <aside className="border-y border-border bg-secondary py-10"><div className="seed-wrap grid gap-5 md:grid-cols-[2rem_1fr]"><ShieldCheck size={28} className="text-sprout" strokeWidth={1.3} /><div><h2 className="text-2xl text-primary">{c.safetyTitle}</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">{c.safety}</p><p className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">{c.sources}: <a className="underline underline-offset-4" href="https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely" target="_blank" rel="noreferrer">FDA<ArrowUpRight className="ml-1 inline" size={12} /></a><a className="underline underline-offset-4" href="https://www.cdc.gov/food-safety/foods/safer-food-choices.html" target="_blank" rel="noreferrer">CDC<ArrowUpRight className="ml-1 inline" size={12} /></a></p></div></div></aside>
        <section className="seed-wrap py-14 md:py-20"><h2 className="seed-section-title text-primary">{c.faq}</h2><div className="mt-7">{c.faqs.map(f => <details key={f.q} className="border-b border-border py-5"><summary className="cursor-pointer text-base text-primary focus-visible:outline-ring">{f.q}</summary><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{f.a}</p></details>)}</div></section>
        <section className="seed-final bg-primary py-14 text-primary-foreground md:py-20"><div className="seed-wrap"><p className="seed-kicker">Natursense</p><h2 className="seed-section-title mt-4">{c.finalTitle}</h2><p className="mt-5 max-w-xl text-sm leading-7 opacity-85">{c.finalText}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="secondary" className="h-11"><a href="mailto:natursense2026@gmail.com"><Mail />{c.finalCta}</a></Button><Button asChild variant="link" className="h-11 text-primary-foreground"><a href="https://instagram.com/natursense.rs" target="_blank" rel="noreferrer">{c.instagram}<ArrowUpRight /></a></Button></div></div></section>
      </>}
    </section>
  );
}