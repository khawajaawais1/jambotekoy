import { getTranslations } from "next-intl/server";

// Positions of the two italic/accent phrases within the items list (0-indexed).
const ACCENT_INDICES = new Set([3, 8]);

export default async function BrandMarquee() {
  const t = await getTranslations("brandMarquee");
  const items = t.raw("items") as string[];
  const row = [...items, ...items];

  return (
    <div className="relative py-8 border-y border-white/10 overflow-hidden bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex whitespace-nowrap marquee-track will-change-transform">
        {row.map((it, i) => (
          <span key={i} className="mx-8 text-display-hero tracking-[0.12em] text-[clamp(28px,4.5vw,56px)] flex items-center gap-8">
            {ACCENT_INDICES.has(i % items.length) ? (
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
