const ITEMS = ["BMW", "Mercedes-Benz", "Volkswagen", "AINA VALMIINA AUTTAMAAN", "Audi", "Volvo", "Škoda", "Toyota", "SINCE 2023"];

export default function BrandMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative py-8 border-y border-white/10 overflow-hidden bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex whitespace-nowrap marquee-track will-change-transform">
        {row.map((it, i) => (
          <span key={i} className="mx-8 text-display-hero tracking-[0.12em] text-[clamp(28px,4.5vw,56px)] flex items-center gap-8">
            {it === "AINA VALMIINA AUTTAMAAN" || it === "SINCE 2023" ? (
              <span className="text-serif-italic text-brand-glow">{it.toLowerCase()}</span>
            ) : (
              <span className="text-white/25">{it}</span>
            )}
            <span className="text-white/15">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
