"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, MouseEvent as ReactMouseEvent } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax on the car
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Mouse-driven 3D tilt on the card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden noise" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      {/* ================== Ambient background layers ================== */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[880px] h-[880px] rounded-full bg-brand/25 blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[-8rem] -left-40 w-[620px] h-[620px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-brand-glow/15 blur-[120px] animate-pulse-slow" style={{ animationDelay: "1.4s" }} />
      </motion.div>

      {/* Drifting grid */}
      <div className="absolute inset-0 grid-bg mask-radial opacity-70 pointer-events-none grid-drift" />

      {/* Diagonal red sweep — repeats every ~5.5s */}
      <div className="streak" />

      {/* Floating red particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[18%] left-[8%]  w-1.5 h-1.5 rounded-full bg-brand-glow shadow-[0_0_20px_#FF3547] floaty-a" />
        <span className="absolute top-[32%] left-[46%] w-1   h-1   rounded-full bg-brand-glow shadow-[0_0_16px_#FF3547] floaty-b" />
        <span className="absolute top-[68%] left-[14%] w-1   h-1   rounded-full bg-brand-glow shadow-[0_0_16px_#FF3547] floaty-c" />
        <span className="absolute top-[80%] left-[38%] w-1.5 h-1.5 rounded-full bg-brand-glow shadow-[0_0_20px_#FF3547] floaty-a" style={{ animationDelay: "3s" }} />
        <span className="absolute top-[22%] right-[8%] w-1   h-1   rounded-full bg-brand-glow shadow-[0_0_16px_#FF3547] floaty-b" />
      </div>

      {/* Ghost background word */}
      <div className="absolute top-[62%] -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap">
        <span
          className="text-display-hero text-[24vw] leading-none text-white/[0.02]"
          style={{ textShadow: "0 0 30px rgba(255,53,71,0.45), 0 0 60px rgba(225,29,46,0.35)" }}
        >
          JAMBOTEK
        </span>
      </div>

      {/* ================== Content ================== */}
      <div className="relative z-10 max-w-[1500px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center pt-[140px] pb-24 min-h-[100svh]">
        {/* Left column */}
        <div>
          {/* Live status ticker */}
          <div className="fade-0 mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-ink-dim">
            <span className="w-10 h-px bg-brand" />
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand blink-dot" />
              {t("liveStatus")}
            </span>
            <span className="hidden sm:inline text-ink-mute">{t("est")}</span>
          </div>

          <h1 className="text-display-hero text-[13vw] sm:text-[10vw] lg:text-[9vw] xl:text-[8.6vw]">
            <span className="block overflow-hidden"><span className="inline-block rise-1">{t("line1")}</span></span>
            <span className="block overflow-hidden"><span className="inline-block rise-2">{t("line2")}</span></span>
            <span className="block overflow-hidden">
              <span className="inline-block rise-3 text-serif-italic text-brand-glow brand-pulse">{t("line3")}</span>
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg text-ink-dim leading-relaxed fade-1">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 fade-2">
            <Link href="/contact" className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold bg-brand text-white red-glow hover:-translate-y-0.5 transition-transform">
              {t("ctaBook")}
              <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold border border-white/25 hover:border-brand hover:text-brand-glow transition-colors">
              {t("ctaExplore")}
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-6 text-[11px] tracking-[0.24em] uppercase text-ink-mute fade-3">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-slow" />{t("openToday")}</span>
            <span>{t("certified")}</span>
            <span className="hidden sm:inline">{t("rating")}</span>
          </div>
        </div>

        {/* Right column — cinematic tilt card */}
        <div className="relative float-in [perspective:1400px]">
          {/* Rotating orbit rings */}
          <div className="absolute inset-0 -m-12 pointer-events-none">
            <div className="absolute inset-0 orbit">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-glow shadow-[0_0_16px_#FF3547]" />
            </div>
            <div className="absolute inset-6 orbit-rev">
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_12px_#E11D2E]" />
            </div>
          </div>

          {/* Red aura + accent circles */}
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-brand/15 blur-2xl" />
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-brand/50" />
          <div className="absolute -bottom-8 -right-4 w-40 h-40 rounded-full border border-brand/30" />

          {/* Tilt card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-surface [transform-style:preserve-3d]"
          >
            {/* Car image (parallax on scroll) */}
            <motion.div style={{ y, scale }} className="absolute inset-0">
              <Image
                src="/images/hero-bmw.jpg"
                alt={t("cardAlt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </motion.div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

            {/* Scanline sweep (diagnostic feel) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scanline" />
            </div>

            {/* Mouse-follow glare */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{ background: useTransform([glareX, glareY], ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`) }}
            />

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-glow/70" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-brand-glow/70" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-brand-glow/70" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-glow/70" />

            {/* Top-left HUD chip */}
            <div className="absolute top-6 left-6 z-10 glass px-3 py-1.5 rounded-full border border-white/15 text-[10px] tracking-[0.28em] uppercase text-white/90 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-glow blink-dot" />
              <span className="typewrite">{t("diagnosticInProgress")}</span>
            </div>

            {/* Bottom overlay */}
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-[11px] tracking-[0.24em] uppercase text-white/85">
              <div>
                <div className="text-display-hero text-[26px] tracking-[0.12em] text-white leading-none">{t("bay")}</div>
                <div className="mt-2 text-white/60">{t("bayMeta")}</div>
              </div>
              <div className="text-right">
                <div className="text-white/60">{t("live")}</div>
                <div className="text-brand-glow flex items-center gap-1 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-glow blink-dot" />
                  {t("recording")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-ink-mute cue-fade">
        <span>{t("scroll")}</span>
        <span className="w-px h-10 bg-gradient-to-b from-brand to-transparent animate-pulse-slow" />
      </div>
    </section>
  );
}
