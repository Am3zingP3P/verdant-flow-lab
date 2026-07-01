import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  index: string;
  hu: { kicker: string; title: string; body: string };
  sr: { kicker: string; title: string; body: string };
};

const CHAPTERS: Chapter[] = [
  {
    index: "00",
    hu: {
      kicker: "Nyugalom",
      title: "A csend, ami életet őriz.",
      body: "Egyetlen mag. Kompakt univerzum, amely csak a megfelelő pillanatra vár — vízre, fényre, időre.",
    },
    sr: {
      kicker: "Mirovanje",
      title: "Tišina koja čuva život.",
      body: "Jedna semenka. Sažet univerzum koji čeka samo pravi trenutak — vodu, svetlost, vreme.",
    },
  },
  {
    index: "01",
    hu: {
      kicker: "Ébredés",
      title: "Az első lélegzetvétel.",
      body: "A héj megreped. Belülről egy fehér gyökér nyúl a mélybe — csendben, célirányosan.",
    },
    sr: {
      kicker: "Buđenje",
      title: "Prvi udah.",
      body: "Ljuska puca. Iznutra beli koren tone u dubinu — tiho, sa svrhom.",
    },
  },
  {
    index: "02",
    hu: {
      kicker: "Emelkedés",
      title: "A szár a fény felé fordul.",
      body: "Néhány óra alatt egy zöld gerinc feszül fölfelé. Élő architektúra, tiszta energiából.",
    },
    sr: {
      kicker: "Uspon",
      title: "Stabljika se okreće ka svetlosti.",
      body: "Za nekoliko sati zelena kičma se pruža uvis. Živa arhitektura, iz čiste energije.",
    },
  },
  {
    index: "03",
    hu: {
      kicker: "Beteljesedés",
      title: "Superfood a tenyeredben.",
      body: "Napok alatt élő tápanyag: 40× koncentrált vitaminok, tiszta enzimek — közvetlenül a magból.",
    },
    sr: {
      kicker: "Ispunjenje",
      title: "Superhrana u tvojoj ruci.",
      body: "Za samo par dana živi nutrijenti: 40× koncentrovani vitamini, čisti enzimi — pravo iz semenke.",
    },
  },
];

export function SeedJourney() {
  const { lang } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // morph targets
  const seedRef = useRef<SVGGElement | null>(null);
  const crackRef = useRef<SVGPathElement | null>(null);
  const rootRef = useRef<SVGPathElement | null>(null);
  const stemRef = useRef<SVGPathElement | null>(null);
  const leafLRef = useRef<SVGPathElement | null>(null);
  const leafRRef = useRef<SVGPathElement | null>(null);
  const microRef = useRef<SVGGElement | null>(null);
  const haloRef = useRef<SVGCircleElement | null>(null);
  const soilRef = useRef<SVGRectElement | null>(null);

  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: "+=340%",
          scrub: 0.8,
          pin: stageRef.current!,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const idx = Math.min(
              CHAPTERS.length - 1,
              Math.floor(self.progress * CHAPTERS.length - 0.0001),
            );
            setActive(Math.max(0, idx));
          },
        },
      });

      // initial state
      gsap.set(crackRef.current, { opacity: 0, scaleX: 0, transformOrigin: "center center" });
      gsap.set([rootRef.current, stemRef.current, leafLRef.current, leafRRef.current], {
        scaleY: 0,
        transformOrigin: "center bottom",
        opacity: 0,
      });
      gsap.set(microRef.current, { opacity: 0, scale: 0.6, transformOrigin: "center bottom" });
      gsap.set(haloRef.current, { scale: 0.4, opacity: 0, transformOrigin: "center center" });
      gsap.set(soilRef.current, { scaleY: 0, transformOrigin: "center bottom" });

      // 00 → 01 : seed cracks, root descends, soil rises
      tl.to(seedRef.current, { rotation: -6, transformOrigin: "center center", duration: 1 }, 0)
        .to(soilRef.current, { scaleY: 1, duration: 1, ease: "power2.out" }, 0.2)
        .to(crackRef.current, { opacity: 1, duration: 0.4 }, 0.4)
        .to(rootRef.current, { scaleY: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, 0.5)

        // 01 → 02 : stem shoots up, seed opens further
        .to(seedRef.current, { scale: 1.08, y: -6, duration: 1, ease: "power2.out" }, 1.2)
        .to(stemRef.current, { scaleY: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, 1.4)
        .to(leafLRef.current, { scaleY: 1, opacity: 1, duration: 0.9, ease: "back.out(1.6)" }, 2.1)
        .to(leafRRef.current, { scaleY: 1, opacity: 1, duration: 0.9, ease: "back.out(1.6)" }, 2.2)

        // 02 → 03 : microgreen bloom, halo light
        .to(seedRef.current, { opacity: 0.15, duration: 0.6 }, 2.6)
        .to(microRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 2.6)
        .to(haloRef.current, { opacity: 1, scale: 1.35, duration: 1.4, ease: "sine.out" }, 2.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ambient breathing halo (independent of scroll)
  useEffect(() => {
    if (!haloRef.current) return;
    const anim = gsap.to(haloRef.current, {
      attr: { r: 118 },
      duration: 3.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      anim.kill();
    };
  }, []);

  const chapter = CHAPTERS[active];
  const copy = lang === "sr" ? chapter.sr : chapter.hu;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-[color:var(--sand)] text-[color:var(--moss)]"
      aria-label="Seed journey"
    >
      <div
        ref={stageRef}
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
      >
        {/* ambient orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--sprout) 40%, transparent), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-10 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, color-mix(in oklab, var(--moss) 35%, transparent), transparent 70%)",
          }}
        />

        {/* chapter counter (top) */}
        <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 md:left-8 md:translate-x-0">
          <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--moss)]/70">
            <span className="font-serif text-xl italic tracking-normal text-[color:var(--moss)]">
              {chapter.index}
            </span>
            <span className="h-px w-10 bg-[color:var(--moss)]/30" />
            <span>{lang === "sr" ? "Putovanje semenke" : "A mag útja"}</span>
          </div>
        </div>

        {/* progress bar (bottom) */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-[color:var(--moss)]/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-[color:var(--moss)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1.05fr]">
          {/* Editorial copy */}
          <div className="relative z-10 max-w-xl">
            <div
              key={active}
              className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
            >
              <div className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--sprout)]">
                {copy.kicker}
              </div>
              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-[color:var(--moss)] sm:text-5xl md:text-6xl">
                {copy.title}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--moss)]/75 md:text-lg">
                {copy.body}
              </p>
            </div>

            {/* stage dots */}
            <div className="mt-10 flex items-center gap-2">
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

          {/* Morphing SVG */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center">
            {/* concentric rings */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border border-[color:var(--moss)]/10"
            />
            <div
              aria-hidden
              className="absolute inset-8 rounded-full border border-[color:var(--moss)]/10"
            />

            <svg
              viewBox="0 0 400 400"
              className="relative h-full w-full"
              aria-hidden
            >
              <defs>
                <radialGradient id="sj-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--sprout)" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="var(--sprout)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--sprout)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="sj-seed" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6B8F73" />
                  <stop offset="55%" stopColor="#3F5F49" />
                  <stop offset="100%" stopColor="#1C352D" />
                </linearGradient>
                <linearGradient id="sj-leaf" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8AB18F" />
                  <stop offset="100%" stopColor="#4A7C59" />
                </linearGradient>
                <linearGradient id="sj-soil" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="color-mix(in oklab, var(--moss) 30%, transparent)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* halo */}
              <circle
                ref={haloRef}
                cx="200"
                cy="210"
                r="110"
                fill="url(#sj-halo)"
              />

              {/* soil line */}
              <rect
                ref={soilRef}
                x="40"
                y="256"
                width="320"
                height="60"
                fill="url(#sj-soil)"
                rx="8"
              />
              <line
                x1="40"
                y1="256"
                x2="360"
                y2="256"
                stroke="color-mix(in oklab, var(--moss) 25%, transparent)"
                strokeWidth="1"
                strokeDasharray="2 6"
              />

              {/* root */}
              <path
                ref={rootRef}
                d="M200 256 C 198 288, 210 310, 196 340 M200 280 C 188 288, 176 296, 172 312 M200 285 C 214 292, 224 300, 228 316"
                fill="none"
                stroke="#E8E1D2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              {/* stem */}
              <path
                ref={stemRef}
                d="M200 256 C 202 220, 198 190, 200 150"
                fill="none"
                stroke="url(#sj-leaf)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* leaves */}
              <path
                ref={leafLRef}
                d="M200 172 C 176 168, 158 152, 154 132 C 176 132, 194 148, 200 172 Z"
                fill="url(#sj-leaf)"
              />
              <path
                ref={leafRRef}
                d="M200 172 C 224 168, 242 152, 246 132 C 224 132, 206 148, 200 172 Z"
                fill="url(#sj-leaf)"
              />

              {/* seed */}
              <g ref={seedRef}>
                <ellipse
                  cx="200"
                  cy="240"
                  rx="26"
                  ry="34"
                  fill="url(#sj-seed)"
                />
                <path
                  ref={crackRef}
                  d="M188 232 Q 200 244 212 230"
                  stroke="#E8E1D2"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="192"
                  cy="222"
                  rx="6"
                  ry="10"
                  fill="#FFFFFF"
                  opacity="0.18"
                />
              </g>

              {/* microgreen bloom */}
              <g ref={microRef}>
                {[...Array(7)].map((_, i) => {
                  const angle = (i - 3) * 14;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 200 + Math.sin(rad) * 4;
                  const y1 = 236;
                  const x2 = 200 + Math.sin(rad) * 78;
                  const y2 = 236 - Math.cos(rad) * 92;
                  return (
                    <g key={i}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="url(#sj-leaf)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <ellipse
                        cx={x2}
                        cy={y2}
                        rx={7}
                        ry={12}
                        transform={`rotate(${angle} ${x2} ${y2})`}
                        fill="url(#sj-leaf)"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* floating pollen */}
            <div className="pointer-events-none absolute inset-0">
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

export default SeedJourney;