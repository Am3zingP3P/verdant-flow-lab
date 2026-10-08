import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveSectionId } from "@/lib/sectionAnchors";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: isTouch ? 1 : 2,
      syncTouch: isTouch,
      syncTouchLerp: 0.08,
      overscroll: !isTouch,
    });

    // Keep ScrollTrigger (pinned sections) in sync with Lenis' scroll position,
    // otherwise anchor jumps into a pinned section land on stale measurements.
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Deep links like /#klijanje or /#novekedes land on the matching section.
    const initialHash = decodeURIComponent(window.location.hash.slice(1));
    if (initialHash) {
      const initialTarget = document.getElementById(resolveSectionId(initialHash));
      if (initialTarget) {
        window.setTimeout(() => {
          ScrollTrigger.refresh();
          lenis.scrollTo(initialTarget, { immediate: true, force: true });
        }, 150);
      }
    }

    // Route in-page anchor links through Lenis so the pinned chapter section
    // resolves to the right scroll offset on the first click, every time.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(resolveSectionId(id));
      if (!target) return;
      e.preventDefault();
      ScrollTrigger.refresh();

      if (anchor.hasAttribute("data-direct-scroll")) {
        lenis.scrollTo(target, {
          immediate: true,
          force: true,
          onComplete: () => ScrollTrigger.update(),
        });
        history.replaceState(null, "", `#${id}`);
        return;
      }

      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.1,
        onComplete: () => ScrollTrigger.update(),
      });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", onScroll);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
