"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const STATS = [
  { n: 500, suf: "+", key: "carsServiced" },
  { n: 15, suf: "+", key: "yearsExperience" },
  { n: 98, suf: "%", key: "repeatCustomers" },
  { n: 4.9, suf: "/5", key: "googleRating" }
] as const;

function CountUp({ to, suffix, decimalSeparator }: { to: number; suffix: string; decimalSeparator: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate: (v) => setVal(v)
    });
    return () => controls.stop();
  }, [inView, to]);
  const display = to % 1 === 0 ? Math.round(val).toString() : val.toFixed(1).replace(".", decimalSeparator);
  // translate="no": Chrome's auto-translate replaces the text node React updates,
  // which would freeze the counter at 0.
  return <span ref={ref} translate="no">{display}{suffix}</span>;
}

export default function StatsGrid() {
  const t = useTranslations("statsGrid");
  const locale = useLocale();
  const decimalSeparator = locale === "fi" ? "," : ".";

  return (
    <section className="relative py-24 border-y border-white/10 bg-gradient-to-b from-[#0d0d0d] to-[#060606]" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: i * 0.08 }} className="text-center md:text-left">
            <div className="text-display-hero text-[clamp(56px,7vw,96px)] leading-none text-brand-glow">
              <CountUp to={s.n} suffix={s.suf} decimalSeparator={decimalSeparator} />
            </div>
            <div className="mt-2 text-[11px] tracking-[0.28em] uppercase text-ink-mute">{t(s.key)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
