"use client";
import { motion } from "framer-motion";

const REVIEWS = [
  { q: "Diagnosed a fault four other shops missed. Fair price, honest quote, work finished the same day.", who: "Mikko K.", car: "BMW 540i · Jyväskylä" },
  { q: "Best tyre change I've had in Finland. Booked online, in and out in 40 minutes. My workshop now.", who: "Anni H.", car: "Volvo XC60 · Keski-Suomi" },
  { q: "Joseph explains everything before he starts. You walk out knowing exactly what was done and why.", who: "Tuomas S.", car: "Mercedes E-Class" },
  { q: "Called Friday, booked Saturday, delivered Monday. Fast, professional and priced honestly.", who: "Petra L.", car: "Audi A4 Avant" },
  { q: "I take all three of my family cars here. Never been let down once.", who: "Ari M.", car: "VW / BMW / Toyota" },
  { q: "Genuine parts, dealer-level workmanship, independent-shop pricing. Rare combination.", who: "Sanna V.", car: "BMW 320d Touring" }
];

function Card({ q, who, car }: { q: string; who: string; car: string }) {
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
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section className="py-32 overflow-hidden" style={{ paddingBlock: "clamp(80px,10vw,140px)" }}>
      <div className="max-w-[1500px] mx-auto mb-14 px-[clamp(20px,4vw,48px)]">
        <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
          <span className="text-brand">///</span> In the customers' words
        </div>
        <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none">
          Trusted by drivers <span className="text-serif-italic text-brand-glow">across Keski-Suomi.</span>
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
