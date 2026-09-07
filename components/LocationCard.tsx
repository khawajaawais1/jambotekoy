"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function LocationCard() {
  const t = useTranslations("locationCard");
  const hoursLines = t("hoursValue").split("\n");

  return (
    <section className="relative py-32" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10 items-stretch">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="p-10 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
            <span className="text-brand">///</span> {t("eyebrow")}
          </div>
          <h2 className="text-display-hero text-[clamp(38px,4.5vw,60px)] leading-[0.95] mb-8">
            {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
          </h2>

          <div className="space-y-6">
            <Row label={t("addressLabel")} value={<>Jokivarrentie 12 H 1<br />40520 Jyväskylä, Finland</>} />
            <Row label={t("phoneLabel")} value={<a href="tel:+358451824414" className="hover:text-brand-glow">045 182 4414</a>} />
            <Row label={t("emailLabel")} value={<a href="mailto:joekiuna@yahoo.com" className="hover:text-brand-glow">joekiuna@yahoo.com</a>} />
            <Row label={t("hoursLabel")} value={<>{hoursLines[0]}<br />{hoursLines[1]}</>} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="https://www.google.com/maps?q=Jokivarrentie+12,+40520+Jyväskylä,+Finland" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-[11px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform">
              {t("getDirections")}
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <a href="tel:+358451824414" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-brand hover:text-brand-glow transition">
              {t("callShop")}
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="relative rounded-[24px] overflow-hidden border border-white/10 min-h-[420px] group">
          <iframe
            title="Jambotek Oy on Google Maps"
            src="https://www.google.com/maps?q=Jokivarrentie%2012%2C%2040520%20Jyv%C3%A4skyl%C3%A4%2C%20Finland&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[85%] invert-[92%] contrast-[0.85] group-hover:grayscale-0 group-hover:invert-0 transition duration-700"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          <div className="pointer-events-none absolute top-6 left-6 glass border border-white/15 rounded-full px-5 py-2 text-[10px] tracking-[0.28em] uppercase">
            <span className="text-brand-glow">●</span> {t("liveMap")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[100px_1fr] items-baseline gap-3 border-b border-white/10 pb-4">
      <div className="text-[10px] tracking-[0.28em] uppercase text-ink-mute">{label}</div>
      <div className="text-lg text-white/95 font-medium leading-snug">{value}</div>
    </div>
  );
}
