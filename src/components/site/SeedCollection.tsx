import { Link, useLocation } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Leaf, Sprout, Utensils, ShieldCheck, Mail, Phone } from "lucide-react";
import logoCream from "@/assets/natursense-logo-cream.png";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/context";
import { collectionCopy } from "@/i18n/collection";
import { collectionPaths, collectionPhoto, seedProducts } from "@/lib/seedCollection";
import { useEffect, useRef, type MouseEvent } from "react";

export function SeedCollection({ standalone = false }: { standalone?: boolean }) {
  const { lang } = useI18n();
  const { pathname } = useLocation();
  const c = collectionCopy[lang];
  const offerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = offerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const marquee = standalone && pathname === "/csiramagok";
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!marquee) return;
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    const track = grid.querySelector<HTMLElement>(".seed-marquee-track");
    if (!track) return;
    const SPEED = 26; // px / second
    const count = seedProducts.length;
    let visible = true;
    let hovered = false;
    let resumeTimer = 0;
    const sync = () => grid.classList.toggle("seed-marquee-paused", !visible || hovered);
    const pause = () => { hovered = true; window.clearTimeout(resumeTimer); sync(); };
    const scheduleResume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { hovered = false; sync(); }, 1500);
    };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.15 });
    io.observe(grid);
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const next = track.children[count] as HTMLElement | undefined;
      if (!first || !next) return;
      const seg = next.offsetLeft - first.offsetLeft;
      if (seg <= 0) return;
      grid.style.setProperty("--seed-marquee-seg", `${seg}px`);
      grid.style.setProperty("--seed-marquee-duration", `${(seg / SPEED).toFixed(2)}s`);
      grid.classList.add("seed-marquee-run");
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    grid.addEventListener("pointerenter", pause);
    grid.addEventListener("pointerleave", scheduleResume);
    grid.addEventListener("wheel", scheduleResume, { passive: true });
    grid.addEventListener("touchstart", scheduleResume, { passive: true });
    grid.addEventListener("focusin", scheduleResume);
    return () => {
      window.clearTimeout(resumeTimer);
      io.disconnect();
      ro.disconnect();
      grid.removeEventListener("pointerenter", pause);
      grid.removeEventListener("pointerleave", scheduleResume);
      grid.removeEventListener("wheel", scheduleResume);
      grid.removeEventListener("touchstart", scheduleResume);
      grid.removeEventListener("focusin", scheduleResume);
    };
  }, [marquee]);
  const Heading = standalone ? "h1" : "h2";
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!standalone || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = event.currentTarget.hash;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    history.replaceState(history.state, "", hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  if (!standalone) {
    return (
      <section id="collection" className="seed-collection scroll-mt-24 border-t border-border bg-background px-5 py-8 text-foreground sm:px-6 sm:py-12 md:px-10 lg:py-14">
        <div className="mx-auto grid max-w-[1280px] items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="seed-kicker text-sprout">{c.eyebrow}</p>
            <h2 className="mt-2 font-display text-2xl leading-tight text-primary sm:mt-3 sm:text-4xl">{c.title}</h2>
            <p className="mt-1.5 font-display text-lg italic text-sprout sm:mt-2 sm:text-2xl">{c.accent}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7 lg:mx-0">{c.promoText}</p>
            <div ref={offerRef} className="seed-promo-offer mt-4 flex flex-col items-center gap-3 rounded-lg border px-4 py-4 text-center sm:mt-5 sm:flex-row sm:justify-between sm:gap-6 sm:px-6 sm:text-left">
              <div className="min-w-0">
                <p className="seed-offer-in text-xs text-sprout">{c.varieties}</p>
                <p className="seed-offer-in seed-offer-d1 mt-1.5 flex flex-wrap items-baseline justify-center gap-x-3 text-primary sm:mt-2 sm:justify-start"><span className="font-display text-4xl leading-none sm:text-6xl">{seedProducts[0].price}</span><span className="text-base font-medium sm:text-lg">RSD</span><span className="text-sm text-muted-foreground">{c.package}</span></p>
                <p className="seed-offer-in seed-offer-d2 mt-2 text-xs leading-5 text-muted-foreground sm:mt-3">{c.promoValue}</p>
              </div>
              <Button asChild className="seed-offer-in seed-offer-d3 h-11 max-w-full shrink-0 rounded-full px-6 sm:h-12"><Link to={collectionPaths[lang]}>{c.discover}<ArrowUpRight size={16} /></Link></Button>
            </div>
          </div>
          <Link to={collectionPaths[lang]} className="seed-promo-frame order-1 mx-auto block w-full max-w-[280px] sm:max-w-[440px] lg:order-2 lg:max-w-[560px]" aria-label={c.discover}>
            <img src={collectionPhoto} alt={c.familyAlt} width={1080} height={864} className="seed-promo-photo w-full" loading="lazy" decoding="async" />
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section id="collection" className={`seed-collection seed-page ${Object.values(collectionPaths).includes(pathname as "/csiramagok" | "/seme-za-klijanje") ? "seed-page-readable" : ""} scroll-mt-20 border-t border-border bg-background text-foreground`}>
      {!standalone && <div className="seed-wrap flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground"><span>{c.growEyebrow}</span><Link to={collectionPaths[lang]} className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline">{c.fullPage}<ArrowUpRight size={14} /></Link></div>}
      <header className="seed-hero relative isolate overflow-hidden">
        <img src={collectionPhoto} alt={c.familyAlt} className="absolute inset-0 -z-20 h-full w-full object-cover" loading={standalone ? "eager" : "lazy"} decoding="async" />
        <div className="seed-hero-shade absolute inset-0 -z-10" />
        <div className="seed-wrap flex h-full flex-col justify-between gap-10 py-12 md:py-16">
          <div className="max-w-xl">
            <img src={logoCream} alt="Natursense" width={1147} height={418} className="seed-brand-mark" decoding="async" />
            <p className="seed-kicker seed-brand-label">{c.collectionLabel}</p>
            <Heading className="seed-title mt-5">{c.heroTitle}</Heading>
            <p className="mt-5 max-w-md text-sm leading-7 opacity-90 md:text-base">{c.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="seed-hero-button h-11"><a href="#seed-products" onClick={scrollToSection}>{c.discover}<ArrowDown /></a></Button>
              {standalone && <Button asChild variant="link" className="seed-hero-link h-11 px-0"><a href="#seed-why" onClick={scrollToSection}>{c.whyLink}</a></Button>}
            </div>
          </div>
          <div className="seed-price-glass flex w-fit items-center gap-5 rounded-lg px-5 py-4">
            <div className="flex flex-col items-center text-center"><p className="font-display text-4xl"><span className="seed-hero-price"><span className="seed-hero-price-num">{seedProducts[0].price}</span></span></p><p className="mt-3 font-sans text-sm">RSD {c.package}</p><p className="mt-2 text-xs leading-5">{c.heroVarieties}</p></div>
          </div>
        </div>
      </header>

      <div id="seed-products" className="seed-wrap scroll-mt-24 py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div><h2 className="seed-section-title text-primary">{c.collection}</h2></div>
        </div>
        <div ref={gridRef} className={`seed-product-grid${marquee ? " seed-marquee" : ""}`}>
          <div className="seed-marquee-track">
            {[...seedProducts, ...(marquee ? seedProducts : [])].map((p, index) => {
              const clone = marquee && index >= seedProducts.length;
              const copy = c.products[p.key];
              return <article key={`${p.key}${clone ? "-clone" : ""}`} aria-hidden={clone || undefined} className="seed-product group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">{p.image ? <img src={p.image} alt={`${copy.name} — ${c.photo}`} loading="lazy" decoding="async" className="h-full w-full object-cover object-[60%_center] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" /> : <div className="flex h-full flex-col items-center justify-center gap-4 px-5 text-center"><Sprout size={48} strokeWidth={1} className="text-sprout" aria-hidden="true" /><p className="font-display text-2xl text-primary">{copy.name}</p><p className="text-xs leading-5 text-muted-foreground">{c.photoPending}</p></div>}<span className="seed-image-index absolute left-3 top-3 rounded-full px-2.5 py-1.5 text-xs">0{(index % seedProducts.length) + 1}</span></div>
              <div className="flex flex-1 flex-col p-5"><p className="text-xs text-sprout">{copy.note}</p><h3 className="mt-2 text-2xl text-primary">{copy.name}</h3><p className="mt-1 text-xs text-muted-foreground">{c.label}</p><p className="mb-6 mt-4 text-sm leading-6 text-muted-foreground">{copy.description}</p><div className="mt-auto flex flex-col items-center border-t border-border pt-4"><p className="seed-card-price flex flex-wrap items-baseline gap-2"><span className="font-display text-2xl text-primary">{p.price}</span><span className="text-sm font-semibold">RSD</span><span className="text-xs text-muted-foreground">{c.package}</span></p><Button asChild variant="outline" className="mt-4 w-full justify-between"><a href="https://instagram.com/natursense.rs" target="_blank" rel="noreferrer" aria-label={`${copy.name} — ${c.inquire}`} tabIndex={clone ? -1 : undefined}>{c.inquire}<ArrowUpRight /></a></Button></div></div>
            </article>;
            })}
          </div>
        </div>
        {!standalone && <div className="mt-7 flex justify-center"><Button asChild variant="link"><Link to={collectionPaths[lang]}>{c.fullPage}<ArrowUpRight /></Link></Button></div>}
        {!standalone && <aside className="mt-8 border-t border-border pt-6"><h3 className="flex items-center gap-2 text-xl text-primary"><ShieldCheck size={20} />{c.safetyTitle}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{c.safety}</p></aside>}
      </div>
      {standalone && <>
        <section id="seed-why" className="scroll-mt-24 bg-secondary py-14 md:py-20"><div className="seed-wrap"><h2 className="seed-section-title max-w-2xl text-primary">{c.whyTitle}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{c.whyIntro}</p><div className="mt-10 grid gap-8 md:grid-cols-2">{c.whyItems.map((item, i) => { const Icon = [Utensils, Sprout][i] ?? Leaf; return <div key={item.title} className="border-t border-border pt-6"><Icon className="mb-5 text-sprout" size={25} strokeWidth={1.3} /><h3 className="text-2xl text-primary">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p></div>; })}</div></div></section>
        <section className="seed-wrap py-14 md:py-20"><p className="seed-kicker text-sprout">{c.growEyebrow}</p><h2 className="seed-section-title mt-3 max-w-2xl text-primary">{c.growTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{c.growIntro}</p><ol className="mt-10 grid gap-8 md:grid-cols-3">{c.steps.map((step, i) => <li key={step.title} className="border-t border-border pt-5"><span className="font-display text-3xl text-sprout">0{i + 1}</span><h3 className="mt-4 text-2xl text-primary">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p></li>)}</ol><div className="mt-12 border-l-2 border-sprout pl-6"><h3 className="text-2xl text-primary">{c.inspiration}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{c.inspirationText}</p></div></section>
        <aside className="border-y border-border bg-secondary py-6"><div className="seed-wrap flex items-center gap-4"><ShieldCheck size={28} className="shrink-0 text-sprout" strokeWidth={1.3} aria-hidden="true" /><h2 className="text-2xl text-primary">{c.reassurance}</h2></div></aside>
        <section className="seed-wrap py-14 md:py-20"><h2 className="seed-section-title text-primary">{c.faq}</h2><div className="mt-7">{c.faqs.map(f => <details key={f.q} className="border-b border-border py-5"><summary className="cursor-pointer text-base text-primary focus-visible:outline-ring">{f.q}</summary><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{f.a}</p></details>)}</div></section>
        <section className="seed-final bg-primary py-14 text-primary-foreground md:py-20"><div className="seed-wrap"><h2 className="seed-section-title">{c.finalTitle}</h2><p className="mt-5 max-w-xl text-sm leading-7 opacity-85">{c.finalText}</p><div className="mt-8 flex flex-wrap items-center gap-3"><Button asChild className="seed-final-phone h-12 rounded-full px-6" aria-label={`${c.callPrefix}: +381 63 840 5686`}><a href="tel:+381638405686"><Phone size={18} />+381 63 840 5686</a></Button><Button asChild variant="outline" className="seed-final-mail h-11"><a href="mailto:natursense2026@gmail.com"><Mail />{c.finalCta}</a></Button><Button asChild variant="link" className="h-11 text-primary-foreground"><a href="https://instagram.com/natursense.rs" target="_blank" rel="noreferrer">{c.instagram}<ArrowUpRight /></a></Button></div></div></section>
      </>}
    </section>
  );
}