const palettes = [
  {
    name: "Jelenlegi arculat",
    colors: ["#FDFBF7", "#F5F2EB", "#4A7C59", "#1C352D"],
  },
  {
    name: "Organikus prémium",
    colors: ["#F3EFE6", "#C8B69A", "#5C6B3F", "#2A2417"],
  },
  {
    name: "Letisztult minimalista",
    colors: ["#FAFAF7", "#E6E3DC", "#8A8F7E", "#1F2421"],
  },
  {
    name: "Botanikus vibrálás",
    colors: ["#F7F4EC", "#D9B26A", "#2E6F4A", "#0F2A1D"],
  },
];

export function PaletteShowcase() {
  return (
    <section
      aria-label="Színpaletta bemutató"
      className="border-t border-[color:var(--moss)]/10 bg-[color:var(--cream)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-eyebrow text-[color:var(--moss)]/70">Design system</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-[color:var(--moss)]">
            Színpaletta bemutató
          </h2>
          <p className="mt-4 text-[color:var(--moss)]/60 text-sm sm:text-base max-w-xl mx-auto">
            Alternatív arculatok a Natursense márkához — prémium, organikus, modern.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {palettes.map((p) => (
            <div key={p.name} className="flex flex-col items-center">
              <div className="flex w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_-12px_rgba(28,53,45,0.18)] ring-1 ring-[color:var(--moss)]/10">
                {p.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-24 sm:h-28 flex-1 transition-transform"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="mt-5 text-center">
                <p className="font-display text-lg text-[color:var(--moss)]">{p.name}</p>
                <div className="mt-2 flex justify-center gap-2 text-[10px] tracking-wider uppercase text-[color:var(--moss)]/50">
                  {p.colors.map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}