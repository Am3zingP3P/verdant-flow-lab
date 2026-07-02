import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  index: string;
  metric: string;
  unit: string;
  hu: { name: string; kicker: string; title: string; body: string; caption: string };
  sr: { name: string; kicker: string; title: string; body: string; caption: string };
};

const CHAPTERS: Chapter[] = [
  {
    index: "01",
    metric: "40",
    unit: "×",
    hu: {
      name: "Vitaminsűrűség",
      kicker: "Vitaminsűrűség",
      title: "Negyvenszer több vitamin, mint a felnőtt zöldségben.",
      body: "A csírázás pillanatában a mag felszabadítja tartalék tápanyagait. C-, E-, K-vitamin és B-komplex — mind koncentrált, élő formában.",
      caption: "Csírázó brokkoli vs. érett brokkoli · szulforafán tartalom",
    },
    sr: {
      name: "Gustina vitamina",
      kicker: "Gustina vitamina",
      title: "Četrdeset puta više vitamina nego u zrelom povrću.",
      body: "U trenutku klijanja semenka oslobađa svoje rezerve. Vitamini C, E, K i B-kompleks — u koncentrovanom, živom obliku.",
      caption: "Klica brokolija vs. zrela brokoli · sadržaj sulforafana",
    },
  },
  {
    index: "02",
    metric: "100",
    unit: "%",
    hu: {
      name: "Élő enzimek",
      kicker: "Élő enzimek",
      title: "Száz százalék aktív enzim — a főzés nem öli meg.",
      body: "Nyersen fogyasztva a csíra minden enzime dolgozik: emészti a fehérjéket, felszabadítja az ásványi anyagokat, tehermentesíti a testet.",
      caption: "Amiláz, proteáz, lipáz — hőkezelés nélkül",
    },
    sr: {
      name: "Živi enzimi",
      kicker: "Živi enzimi",
      title: "Sto posto aktivnih enzima — kuvanje ih ne uništava.",
      body: "Kada se jedu sirove, sve enzime klica aktivno rade: razgrađuju proteine, oslobađaju minerale, rasterećuju telo.",
      caption: "Amilaza, proteaza, lipaza — bez toplotne obrade",
    },
  },
  {
    index: "03",
    metric: "3.5",
    unit: "g",
    hu: {
      name: "Növényi fehérje",
      kicker: "Fehérje / 100g",
      title: "Növényi fehérje, teljes aminosav-profillal.",
      body: "A lucerna, retek és brokkoli csírák komplett fehérjét adnak — mindegyik esszenciális aminosavval, könnyen felszívódó formában.",
      caption: "Átlagos fehérjetartalom friss csírában",
    },
    sr: {
      name: "Biljni protein",
      kicker: "Protein / 100g",
      title: "Biljni protein sa kompletnim aminokiselinama.",
      body: "Klice lucerke, rotkvice i brokolija daju kompletan protein — sve esencijalne aminokiseline, lako svarljive.",
      caption: "Prosečan sadržaj proteina u svežoj klici",
    },
  },
  {
    index: "04",
    metric: "7",
    unit: "d",
    hu: {
      kicker: "Magtól a tányérig",
      title: "Hét nap. Nulla szállítás. Nulla veszteség.",
      body: "A konyhapulton nőnek — nem a kamionban öregednek. Amit levágsz, azt eszed: friss oxigén, friss klorofill.",
      caption: "Átlagos ciklus a konyhádban",
    },
    sr: {
      kicker: "Od semenke do tanjira",
      title: "Sedam dana. Nula transporta. Nula gubitka.",
      body: "Rastu na tvom pultu — ne stare u kamionu. Ono što isečeš, to jedeš: svež kiseonik, svež hlorofil.",
      caption: "Prosečan ciklus u tvojoj kuhinji",
    },
  },
];

export function HealthBenefits() {
  const { lang } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [ringProgress, setRingProgress] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
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
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: "+=340%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
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
  const copy = lang === "sr" ? chapter.sr : chapter.hu;

  const RADIUS = 152;
  const CIRC = 2 * Math.PI * RADIUS;
  const dashOffset = CIRC * (1 - ringProgress);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative bg-[color:var(--sand)] text-[color:var(--moss)]"
      aria-label={lang === "sr" ? "Zdravstvene prednosti" : "Egészségügyi előnyök"}
    >
        <div
          ref={stageRef}
          className="relative flex min-h-[100svh] w-full items-center overflow-hidden py-20 md:py-0"
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
        <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 sm:bottom-8">
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
              {lang === "sr" ? "Živi nutrijenti" : "Élő tápanyag"}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--sprout)] animate-[breathe_2.4s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* scroll progress bar */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-[color:var(--cream)]"
          role="progressbar"
          aria-label={lang === "sr" ? "Napredak" : "Haladás"}
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

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-5 pt-16 sm:px-6 md:gap-10 md:px-10 md:pt-0 lg:grid-cols-[1fr_1.05fr]">
          {/* Editorial copy */}
          <div className="relative z-10 max-w-xl order-2 lg:order-1">
            <div
              key={active}
              className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
            >
              <div className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-[color:var(--sprout)] sm:text-[0.7rem] sm:tracking-[0.35em]">
                {copy.kicker}
              </div>
              <h2 className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-[color:var(--moss)] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                {copy.title}
              </h2>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[color:var(--moss)]/75 sm:mt-8 sm:text-base md:mt-10 md:text-lg">
                {copy.body}
              </p>
              <p className="mt-5 text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--moss)]/50 sm:mt-8 sm:text-[0.72rem] sm:tracking-[0.28em]">
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
          <div className="relative mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center order-1 lg:order-2 sm:max-w-[420px] md:max-w-[560px]">
            {/* concentric decorative rings */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border border-[color:var(--moss)]/10"
            />
            <div
              aria-hidden
              className="absolute inset-10 rounded-full border border-[color:var(--moss)]/10"
            />

            <svg
              viewBox="0 0 400 400"
              className="relative h-full w-full -rotate-90"
              aria-hidden
            >
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
              <circle
                ref={ringRef}
                cx="200"
                cy="200"
                r="150"
                fill="url(#hb-glow)"
              />

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
                const x1 = 200 + Math.cos(a) * 176;
                const y1 = 200 + Math.sin(a) * 176;
                const x2 = 200 + Math.cos(a) * (i % 4 === 0 ? 168 : 172);
                const y2 = 200 + Math.sin(a) * (i % 4 === 0 ? 168 : 172);
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
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-serif text-[4.5rem] leading-none tracking-[-0.04em] text-[color:var(--moss)] sm:text-[7rem] md:text-[9rem] lg:text-[10rem]">
                    {chapter.metric}
                  </span>
                  <span className="font-serif text-2xl italic text-[color:var(--sprout)] sm:text-4xl md:text-5xl">
                    {chapter.unit}
                  </span>
                </div>
                <div className="mt-3 text-[0.55rem] uppercase tracking-[0.3em] text-[color:var(--moss)]/60 sm:mt-5 sm:text-[0.65rem] sm:tracking-[0.4em]">
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
