"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    id: "diag",
    num: "01",
    title: "Diagnostics",
    accent: "& ECU",
    body: "Fault-code reading, live-data checks and calibration on BMW, Mercedes, VW group and Volvo systems.",
    price: "from 45€",
    img: "/images/svc-diagnostics.jpg"
  },
  {
    id: "tyre",
    num: "02",
    title: "Tyres",
    accent: "& alignment",
    body: "Seasonal changeovers, HPA computer wheel-alignment, balancing and supply of new tyres.",
    price: "from 39€",
    img: "/images/svc-tyres.jpg"
  },
  {
    id: "service",
    num: "03",
    title: "Full",
    accent: "service",
    body: "Oil, filters, brakes, timing, suspension, cooling — scheduled or unscheduled, done properly.",
    price: "from 89€",
    img: "/images/svc-service.jpg"
  },
  {
    id: "insp",
    num: "04",
    title: "Pre-purchase",
    accent: "inspection",
    body: "Independent inspection of a car you're considering — written report with photos and cost estimates.",
    price: "from 120€",
    img: "/images/svc-inspection.jpg"
  }
];

export default function ServiceShowcase() {
  const [active, setActive] = useState(SERVICES[0].id);
  const current = SERVICES.find((s) => s.id === active)!;

  return (
    <section className="relative py-32" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
            <span className="text-brand">///</span> What we do
          </div>
          <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none">
            Full-service care, <span className="text-serif-italic text-brand-glow">engineered</span> to last.
          </h2>
          <p className="mt-7 text-lg text-ink-dim max-w-xl">
            From routine servicing to advanced diagnostics on modern electronics — every job passes through our checklist before you get the keys back.
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
                    <div className="text-[10px] tracking-[0.2em] uppercase text-ink-mute">Starting</div>
                  </div>
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${isActive ? "text-brand-glow translate-x-1" : "text-ink-mute"}`} fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
              );
            })}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-brand hover:text-brand-glow transition">See all services</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-[11px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform">Book now</Link>
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
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-glow">Now viewing</div>
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
