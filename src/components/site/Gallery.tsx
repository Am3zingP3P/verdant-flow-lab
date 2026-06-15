import { motion } from "framer-motion";

type Item = {
  name: string;
  day: string;
  hue: string;
  span: string;
  ratio: string;
};

const items: Item[] = [
  { name: "Radish Microgreens", day: "Day 7", hue: "from-[#c97a6b] to-[#7a3c3a]", span: "md:col-span-5 md:row-span-2", ratio: "aspect-[4/5]" },
  { name: "Alfalfa Sprouts", day: "Day 4", hue: "from-[#dbe3c4] to-[#7a8c5a]", span: "md:col-span-4", ratio: "aspect-[4/3]" },
  { name: "Broccoli Microgreens", day: "Day 9", hue: "from-[#4a7c59] to-[#1c352d]", span: "md:col-span-3", ratio: "aspect-square" },
  { name: "Sunflower Shoots", day: "Day 10", hue: "from-[#e8c07a] to-[#a0522d]", span: "md:col-span-3", ratio: "aspect-square" },
  { name: "Pea Tendrils", day: "Day 8", hue: "from-[#9bb88a] to-[#3a5a3d]", span: "md:col-span-4", ratio: "aspect-[4/3]" },
  { name: "Kitchen Counter Farm", day: "Lifestyle", hue: "from-[#f0ebe3] to-[#c9b99a]", span: "md:col-span-7", ratio: "aspect-[16/9]" },
  { name: "Mustard Microgreens", day: "Day 6", hue: "from-[#e8b84a] to-[#5c4018]", span: "md:col-span-5", ratio: "aspect-[5/4]" },
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
            Magról csíráig, csírából élő zöldig — minden szakasz egy portré.
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
              {/* Placeholder gradient "image" */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${it.hue} transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]`}
              />
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
                    <h3 className="mt-1 truncate font-sans text-base font-medium tracking-tight text-[color:var(--cream)] sm:text-lg">
                      {it.name}
                    </h3>
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