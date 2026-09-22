import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n/context";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  key: string;
  index: string;
  metric: string;
  unit: string;
};

// Numbers stay here; every piece of copy lives in the i18n dictionary
// under `benefits.chapters.<key>`.
const CHAPTERS: Chapter[] = [
  { key: "c1", index: "01", metric: "40", unit: "×" },
  { key: "c2", index: "02", metric: "100", unit: "%" },
  { key: "c3", index: "03", metric: "3.5", unit: "g" },
  { key: "c4", index: "04", metric: "5", unit: "nap" },
];

export function HealthBenefits() {
  const { t, lang } = useI18n();

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [ringProgress, setRingProgress] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(0);
      setRingProgress(1);
      if (progressRef.current) progressRef.current.style.transform = "scaleX(1)";
      return;
    }

    const scrollLength = () => (window.innerWidth < 768 ? "+=140%" : "+=200%");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: scrollLength,
        scrub: 0.25,
        pin: stageRef.current!,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
          setRingProgress(self.progress);
          const idx = Math.min(
            CHAPTERS.length - 1,
            Math.floor(self.progress * CHAPTERS.length - 0.0001),
          );
          setActive(Math.max(0, idx));
        },
      });

      // Ambient orb parallax with scroll
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: scrollLength,
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  // breathing ring
  useEffect(() => {
    if (!ringRef.current) return;
    const anim = gsap.to(ringRef.current, {
      attr: { r: 158 },
      duration: 3.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      anim.kill();
    };
  }, []);

  const chapter = CHAPTERS[active];
  const copy = {
    name: t(`benefits.chapters.${chapter.key}.name`),
    kicker: t(`benefits.chapters.${chapter.key}.kicker`),
    title: t(`benefits.chapters.${chapter.key}.title`),
    body: t(`benefits.chapters.${chapter.key}.body`),
    caption: t(`benefits.chapters.${chapter.key}.caption`),
  };

  const RADIUS = 152;
  const CIRC = 2 * Math.PI * RADIUS;
  const dashOffset = CIRC * (1 - ringProgress);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative bg-[color:var(--sand)] text-[color:var(--moss)]"
      aria-label={t("benefits.aria")}
    >
      {/* smooth fade from cream → sand at the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px z-30 h-32 sm:h-40"
        style={{
          background:
            "linear-gradient(to bottom, var(--cream) 0%, color-mix(in oklab, var(--cream) 60%, var(--sand)) 55%, transparent 100%)",
        }}
      />
      {/* smooth fade from sand → cream at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px z-30 h-32 sm:h-40"
        style={{
          background:
            "linear-gradient(to top, var(--cream) 0%, color-mix(in oklab, var(--cream) 60%, var(--sand)) 55%, transparent 100%)",
        }}
      />
      <div
        ref={stageRef}
        className="benefits-stage relative flex h-[100dvh] min-h-0 w-full items-center overflow-hidden py-20 md:h-auto md:min-h-[100dvh] md:py-0"
      >
        {/* ambient orbs */}
        <div
          ref={orbRef}
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--sprout) 45%, transparent), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, color-mix(in oklab, var(--moss) 40%, transparent), transparent 70%)",
          }}
        />

        {/* chapter counter — centered pill above progress bar */}
        <div className="benefits-chip absolute inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-20 flex justify-center px-4 sm:bottom-8">
          <div
            key={`chip-${active}`}
            className="animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both] flex items-center gap-3 rounded-full border border-[color:var(--moss)]/15 bg-[color:var(--cream)]/70 px-4 py-2 backdrop-blur-md sm:gap-4 sm:px-6 sm:py-2.5"
            style={{
              boxShadow:
                "0 1px 0 color-mix(in oklab, var(--cream) 90%, white) inset, 0 8px 30px -12px color-mix(in oklab, var(--moss) 40%, transparent)",
            }}
          >
            <span className="font-serif text-lg italic leading-none text-[color:var(--moss)] sm:text-xl">
              {chapter.index}
            </span>
            <span aria-hidden className="h-3 w-px bg-[color:var(--moss)]/25" />
            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--moss)]/75 sm:text-[0.68rem] sm:tracking-[0.32em]">
              {copy.name}
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[color:var(--sprout)] animate-[breathe_2.4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* scroll progress bar */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-[color:var(--cream)]"
          role="progressbar"
          aria-label={t("benefits.progressAria")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(ringProgress * 100)}
        >
          <div
            ref={progressRef}
            className="h-full origin-left bg-[color:color-mix(in_oklab,var(--moss)_35%,var(--cream))]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="benefits-layout mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-5 pt-16 sm:px-6 md:gap-10 md:px-10 md:pt-0 lg:grid-cols-[1fr_1.05fr]">
          {/* Editorial copy */}
          <div className="benefits-copy relative z-10 max-w-xl order-2 lg:order-1">
            <div key={active} className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-[color:var(--sprout)] sm:text-[0.7rem] sm:tracking-[0.35em]">
                {copy.kicker}
              </div>
              <h2 className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-[color:var(--moss)] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                {copy.title}
              </h2>
              <p className="benefits-body mt-6 max-w-md text-[0.95rem] leading-relaxed text-[color:var(--moss)]/75 sm:mt-8 sm:text-base md:mt-10 md:text-lg">
                {copy.body}
              </p>
              <p className="benefits-caption mt-5 text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--moss)]/50 sm:mt-8 sm:text-[0.72rem] sm:tracking-[0.28em]">
                — {copy.caption}
              </p>
            </div>

            {/* stage dots */}
            <div className="mt-6 flex items-center gap-2 sm:mt-10" aria-hidden>
              {CHAPTERS.map((c, i) => (
                <span
                  key={c.index}
                  className="h-[2px] transition-all duration-500"
                  style={{
                    width: active === i ? 44 : 18,
                    backgroundColor:
                      active >= i
                        ? "color-mix(in oklab, var(--moss) 90%, transparent)"
                        : "color-mix(in oklab, var(--moss) 20%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Nutrient orb — giant animated metric */}
          <div className="benefits-orb relative mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center order-1 lg:order-2 sm:max-w-[420px] md:max-w-[560px]">
            {/* concentric decorative rings */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border border-[color:var(--moss)]/10"
            />
            <div
              aria-hidden
              className="absolute inset-10 rounded-full border border-[color:var(--moss)]/10"
            />

            <svg viewBox="0 0 400 400" className="relative h-full w-full -rotate-90" aria-hidden>
              <defs>
                <linearGradient id="hb-ring" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--sprout)" />
                  <stop offset="100%" stopColor="var(--moss)" />
                </linearGradient>
                <radialGradient id="hb-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--sprout)" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="var(--sprout)" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="var(--sprout)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* breathing glow */}
              <circle ref={ringRef} cx="200" cy="200" r="150" fill="url(#hb-glow)" />

              {/* faint base ring */}
              <circle
                cx="200"
                cy="200"
                r={RADIUS}
                fill="none"
                stroke="color-mix(in oklab, var(--moss) 12%, transparent)"
                strokeWidth="1.5"
              />

              {/* scroll-driven progress arc */}
              <circle
                cx="200"
                cy="200"
                r={RADIUS}
                fill="none"
                stroke="url(#hb-ring)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.25s linear" }}
              />

              {/* tick marks */}
              {[...Array(48)].map((_, i) => {
                const a = (i / 48) * Math.PI * 2;
                const radius = i % 4 === 0 ? 168 : 172;
                const rounded = (value: number) => Number(value.toFixed(4));
                const x1 = rounded(200 + Math.cos(a) * 176);
                const y1 = rounded(200 + Math.sin(a) * 176);
                const x2 = rounded(200 + Math.cos(a) * radius);
                const y2 = rounded(200 + Math.sin(a) * radius);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="color-mix(in oklab, var(--moss) 25%, transparent)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>

            {/* Big metric number, absolutely centered */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div
                key={`${active}-metric`}
                className="animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both] text-center"
              >
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-serif text-[4.5rem] leading-none tracking-[-0.04em] text-[color:var(--moss)] sm:text-[7rem] md:text-[9rem] lg:text-[10rem]">
                    {chapter.metric}
                  </span>
                  <span className="font-serif text-2xl italic text-[color:var(--sprout)] sm:text-4xl md:text-5xl">
                    {chapter.key === "c4" && lang === "sr" ? "dana" : chapter.unit}
                  </span>
                </div>
                <div className="benefits-orb-label mx-auto mt-3 max-w-[78%] text-center text-[0.55rem] uppercase leading-tight tracking-[0.3em] text-[color:var(--moss)]/60 sm:mt-5 sm:text-[0.65rem] sm:tracking-[0.4em]">
                  {copy.kicker}
                </div>
              </div>
            </div>

            {/* floating pollen */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-[color:var(--sprout)]/50"
                  style={{
                    left: `${15 + i * 13}%`,
                    top: `${20 + ((i * 37) % 60)}%`,
                    animation: `pollen ${6 + i}s ease-in-out ${i * 0.4}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        @keyframes pollen {
          0%,100% { transform: translate3d(0,0,0); opacity: .35; }
          50%     { transform: translate3d(14px,-22px,0); opacity: .9; }
        }
      `}</style>
    </section>
  );
}

export default HealthBenefits;
