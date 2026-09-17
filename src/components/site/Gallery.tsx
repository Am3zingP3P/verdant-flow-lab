import { motion } from "framer-motion";

import imgJarBroccoli from "@/assets/gallery/01-jar-broccoli.jpg";
import imgSeedBox from "@/assets/gallery/02-seed-box.jpg";
import imgRadish from "@/assets/gallery/03-radish.jpg";
import imgMung from "@/assets/gallery/04-mung.jpg";
import imgHands from "@/assets/gallery/05-hands.jpg";
import imgFamily from "@/assets/gallery/06-family.jpg";
import imgAlfalfa from "@/assets/gallery/07-alfalfa.jpg";

type Item = {
  name: string;
  day: string;
  desc: string;
  src: string;
  position: string;
  span: string;
  ratio: string;
};

const items: Item[] = [
  {
    name: "Csíráztató üveg és brokkolimag",
    day: "Az eszköz",
    desc: "A sárga szűrőtetős csíráztató üveg egy fatönkön, mellette a brokkoli csíramag zacskója.",
    src: imgJarBroccoli,
    position: "object-center",
    span: "md:col-span-5 md:row-span-2",
    ratio: "aspect-[4/5]",
  },
  {
    name: "Magvak rekeszekben",
    day: "A választék",
    desc: "Magtároló doboz felülnézetből: zöld mungóbab, sötét apró, aranysárga és barnás csíramagvak külön rekeszekben.",
    src: imgSeedBox,
    position: "object-center",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    name: "Retek csíramag",
    day: "Rotkvica",
    desc: "A retek csíramag zacskója a döntött csíráztató üveg mellett, előttük kiszórt magszemek.",
    src: imgRadish,
    position: "object-center",
    span: "md:col-span-3",
    ratio: "aspect-square",
  },
  {
    name: "Mungóbab a tönkön",
    day: "Mungo pasulj",
    desc: "A mungóbab csíramag zacskója az üveg mellett, előtte szétszórt zöld magszemek.",
    src: imgMung,
    position: "object-center",
    span: "md:col-span-3",
    ratio: "aspect-square",
  },
  {
    name: "Egy marék csíramag",
    day: "Kézzel mérve",
    desc: "Két tenyérben összegyűjtött barnás csíramag, mögötte egy magos zacskó a fa asztallapon.",
    src: imgHands,
    position: "object-center",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    name: "A teljes kínálat",
    day: "Öt fajta",
    desc: "Mind az öt csíramag egymás mellett: retek, lucerna, brokkoli, mungóbab és görögszéna.",
    src: imgFamily,
    position: "object-center",
    span: "md:col-span-7",
    ratio: "aspect-[16/9]",
  },
  {
    name: "Lucerna csíramag",
    day: "Lucerka",
    desc: "A lucerna csíramag zacskója a napsütötte fatönkön, körülötte apró aranyszínű magvak.",
    src: imgAlfalfa,
    position: "object-center",
    span: "md:col-span-5",
    ratio: "aspect-[5/4]",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-[color:var(--cream)] px-4 py-24 sm:px-6 sm:py-32 md:px-10">
      <div className="mx-auto max-w-[1380px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-start justify-between gap-6 sm:mb-24 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[color:var(--sprout)]" />
              <span className="text-eyebrow italic text-[color:var(--sprout)]">Galéria</span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-[color:var(--moss)]">
              A növekedés <em className="italic text-[color:var(--sprout)]">pillanatai</em>.
            </h2>
          </div>
          <p className="max-w-sm text-[color:var(--moss)]/65 sm:text-right">
            A magtól egészen a tányerodig. Napok alatt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-12 md:gap-7">
          {items.map((it, i) => (
            <motion.figure
              key={it.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl bg-[color:var(--sand)] ${it.span} ${it.ratio}`}
            >
              {/* Photo */}
              <img
                src={it.src}
                alt={it.desc}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${it.position} transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]`}
              />
              {/* Constant soft bottom shade so captions stay legible */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--moss)]/45 via-transparent to-transparent" />
              {/* Subtle grain / texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                }}
              />
              {/* Hover gradient veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--moss)]/85 via-[color:var(--moss)]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Index marker */}
              <span className="absolute left-5 top-5 z-10 text-[10px] uppercase tracking-[0.25em] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Caption */}
              <figcaption className="absolute inset-x-0 bottom-0 z-10 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--cream)]/70">
                      {it.day}
                    </p>
                    <h3 className="mt-1 font-sans text-base font-medium tracking-tight text-[color:var(--cream)] sm:text-lg">
                      {it.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-snug text-[color:var(--cream)]/80">
                      {it.desc}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 shrink-0 text-[color:var(--cream)]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}