"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function BigCTA() {
  const t = useTranslations("bigCTA");

  return (
    <section className="relative overflow-hidden text-center border-t border-white/10 bg-gradient-to-b from-[#050505] to-[#0a0a0a] noise" style={{ paddingBlock: "clamp(100px,14vw,200px)", paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(600px_400px_at_50%_100%,rgba(225,29,46,0.4),transparent_70%)]" />
      <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative text-display-hero text-[clamp(56px,10vw,150px)] leading-[0.9] max-w-5xl mx-auto">
        {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }} className="relative mt-8 text-ink-dim text-lg max-w-lg mx-auto">
        {t("subtitle")}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 }} className="relative mt-10 flex flex-wrap gap-4 justify-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand text-white text-[12px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform">
          {t("bookNow")}
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </Link>
        <a href="tel:+358451824414" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-[12px] tracking-[0.22em] uppercase font-semibold hover:border-brand hover:text-brand-glow transition">
          045 182 4414
        </a>
      </motion.div>
    </section>
  );
}
