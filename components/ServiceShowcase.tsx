"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Structural data (asset paths, stable ids) — kept out of the message
// catalog since these don't change per locale, only the copy does.
const IMAGES = ["/images/svc-diagnostics.jpg", "/images/bay-align-wide.jpg", "/images/svc-service.jpg", "/images/svc-inspection-2.jpg"];

type Service = { num: string; title: string; accent: string; body: string; price: string };

export default function ServiceShowcase() {
  const t = useTranslations("serviceShowcase");
  const services = t.raw("services") as Service[];
  const SERVICES = services.map((s, i) => ({ ...s, id: String(i), img: IMAGES[i] }));

  const [active, setActive] = useState(SERVICES[0].id);
  const current = SERVICES.find((s) => s.id === active)!;

  return (
    <section className="relative py-32" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
            <span className="text-brand">///</span> {t("eyebrow")}
          </div>
          <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none">
            {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span> {t("headlineEnd")}
          </h2>
          <p className="mt-7 text-lg text-ink-dim max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          {/* Interactive list */}
          <div>
            {SERVICES.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  className="group w-full text-left border-b border-white/10 py-7 flex items-center gap-6 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="text-display-hero text-[26px] text-brand w-12">{s.num}</div>
                  <div className="flex-1">
                    <div className="text-display-hero text-[clamp(28px,3.8vw,52px)] leading-none uppercase">
                      {s.title} <span className="text-serif-italic text-brand-glow">{s.accent}</span>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="text-ink-dim text-[15px] mt-3 max-w-lg"
                        >
                          {s.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-display-hero text-xl">{s.price}</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-ink-mute">{t("starting")}</div>
                  </div>
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${isActive ? "text-brand-glow translate-x-1" : "text-ink-mute"}`} fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
              );
            })}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-brand hover:text-brand-glow transition">{t("seeAll")}</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-[11px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform">{t("bookNow")}</Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-surface sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.08, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
                exit={{ opacity: 0.6, scale: 1.1, clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={current.img} alt={current.title} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-glow">{t("nowViewing")}</div>
                <div className="text-display-hero text-[30px] leading-none mt-1">{current.title} <span className="text-serif-italic text-white/80">{current.accent}</span></div>
              </div>
              <div className="text-display-hero text-[46px] text-white/20">{current.num}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
