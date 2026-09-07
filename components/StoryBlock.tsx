"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function StoryBlock() {
  const t = useTranslations("storyBlock");
  const bullets = t.raw("bullets") as string[];

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0a0a0a] to-[#050505] overflow-hidden noise" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-brand/10 blur-[140px]" />
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative">
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-surface">
            <Image src="/images/owner.jpg" alt="Joseph Kiuna Kamau — founder & master technician" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-6 glass border border-white/15 rounded-[20px] px-7 py-5 backdrop-blur-xl">
            <div className="text-display-hero text-5xl text-brand-glow leading-none">{t("yearsBadge")}</div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-ink-dim mt-1">{t("yearsBadgeLabel")}</div>
          </div>
          <div className="absolute -top-6 -left-6 glass border border-white/15 rounded-[20px] px-6 py-4 hidden md:block">
            <div className="text-[10px] tracking-[0.28em] uppercase text-brand-glow">{t("certifiedBadgeLabel")}</div>
            <div className="text-lg font-semibold mt-1">{t("certifiedBadgeValue")}</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
            <span className="text-brand">///</span> {t("eyebrow")}
          </div>
          <h2 className="text-display-hero text-[clamp(38px,5.5vw,72px)] leading-[0.95]">
            {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
          </h2>
          <p className="mt-7 text-lg text-ink-dim leading-relaxed">
            {t.rich("paragraph", { b: (chunks) => <b className="text-white">{chunks}</b> })}
          </p>
          <ul className="mt-8 grid gap-4 text-[15px]">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-4 items-start">
                <span className="mt-1 w-5 h-5 rounded-full bg-brand grid place-items-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-brand hover:text-brand-glow transition">{t("readStory")}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
