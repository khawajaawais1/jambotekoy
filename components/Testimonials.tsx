"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Review = { q: string; who: string; car: string };

function Card({ q, who, car }: Review) {
  return (
    <div className="min-w-[340px] max-w-[380px] mx-3 p-8 rounded-[20px] border border-white/10 bg-white/[0.02] hover:border-white/25 transition-colors">
      <div className="flex gap-1 text-gold mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2l3 6.9 7.6.6-5.8 5 1.8 7.4L12 18l-6.6 4 1.8-7.4-5.8-5L9 8.9 12 2z" /></svg>
        ))}
      </div>
      <p className="text-serif-italic text-[20px] leading-snug text-white/95">"{q}"</p>
      <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-deep grid place-items-center text-white font-display text-sm">
          {who.split(" ").map(s => s[0]).join("")}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{who}</div>
          <div className="text-xs text-ink-mute">{car}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const reviews = t.raw("reviews") as Review[];
  const row = [...reviews, ...reviews];

  return (
    <section className="py-32 overflow-hidden" style={{ paddingBlock: "clamp(80px,10vw,140px)" }}>
      <div className="max-w-[1500px] mx-auto mb-14 px-[clamp(20px,4vw,48px)]">
        <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
          <span className="text-brand">///</span> {t("eyebrow")}
        </div>
        <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none">
          {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
        </h2>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="flex marquee-track hover:[animation-play-state:paused] will-change-transform">
          {row.map((r, i) => <Card key={i} {...r} />)}
        </div>
      </motion.div>
    </section>
  );
}
