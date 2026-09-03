"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  { src: "/images/bay-01.jpg", tag: "Bay 01", title: "Full", accent: "lift", span: "md:col-span-3 md:row-span-2" },
  { src: "/images/bay-tyres.jpg", tag: "Bay 02", title: "Tyre", accent: "service", span: "md:col-span-2" },
  { src: "/images/bay-align.jpg", tag: "Bay 03", title: "HPA", accent: "alignment", span: "md:col-span-2" },
  { src: "/images/bay-exterior.jpg", tag: "Entrance", title: "Building", accent: "no. 4", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/svc-service.jpg", tag: "Bay 04", title: "Live", accent: "diagnostics", span: "md:col-span-3" }
];

export default function WorkshopGallery() {
  return (
    <section className="relative py-32" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
              <span className="text-brand">///</span> Inside the workshop
            </div>
            <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none">
              The bay where <span className="text-serif-italic text-brand-glow">problems dissolve.</span>
            </h2>
          </div>
          <p className="text-ink-dim max-w-sm">
            A modern independent workshop kitted out with professional lifts, HPA wheel-alignment and diagnostic hardware for every European brand.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 auto-rows-[220px] md:auto-rows-[260px] gap-4">
          {TILES.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[20px] bg-surface ${t.span}`}
            >
              <Image src={t.src} alt={`${t.tag} ${t.title}`} fill sizes="(max-width: 768px) 50vw, 30vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.08] group-hover:grayscale-0 grayscale-[15%] brightness-90 group-hover:brightness-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute inset-x-5 bottom-5">
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-glow font-semibold">{t.tag}</div>
                <div className="text-display-hero text-[24px] leading-none mt-2">
                  {t.title} <span className="text-serif-italic text-white/80">{t.accent}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/25 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
