"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Clip = { video: string; poster: string; title: string; accent: string; body: string };

export default function LiveAtTheShop() {
  const t = useTranslations("liveAtTheShop");
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const clips: Clip[] = [
    {
      video: "/videos/alignment-rig.mp4",
      poster: "/images/alignment-rig-poster.png",
      title: t("card1Title"),
      accent: t("card1Accent"),
      body: t("card1Body")
    },
    {
      video: "/videos/tyre-balance.mp4",
      poster: "/images/tyre-balance-poster.png",
      title: t("card2Title"),
      accent: t("card2Accent"),
      body: t("card2Body")
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="absolute inset-0 grid-bg mask-radial opacity-40 pointer-events-none" />
      <div className="max-w-[1500px] mx-auto relative">
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-5 flex items-center gap-3">
            <span className="text-brand">///</span> {t("eyebrow")}
          </div>
          <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none">
            {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {clips.map((clip, i) => (
            <ClipCard key={clip.video} clip={clip} index={i} playVideo={!reduce} liveLabel={t("liveLabel")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClipCard({
  clip,
  index,
  playVideo,
  liveLabel
}: {
  clip: Clip;
  index: number;
  playVideo: boolean;
  liveLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // React doesn't reliably trigger the native `autoplay` attribute for a
    // client-rendered <video>, so kick playback explicitly once mounted.
    if (playVideo) videoRef.current?.play().catch(() => {});
  }, [playVideo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/5] sm:aspect-[16/11] rounded-[24px] overflow-hidden bg-surface red-glow"
    >
      {playVideo ? (
        <video
          ref={videoRef}
          src={clip.video}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={clip.poster} alt={`${clip.title} ${clip.accent}`} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-glow/70" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-brand-glow/70" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-brand-glow/70" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-glow/70" />

      <div className="absolute top-6 left-6 z-10 bg-black/70 px-3 py-1.5 rounded-full border border-white/15 text-[10px] tracking-[0.28em] uppercase text-white/90 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-glow blink-dot" />
        {liveLabel}
      </div>

      <div className="absolute inset-x-6 bottom-6">
        <div className="text-display-hero text-[clamp(26px,3.4vw,42px)] leading-none">
          {clip.title} <span className="text-serif-italic text-brand-glow">{clip.accent}</span>
        </div>
        <p className="mt-3 max-w-md text-[14px] text-ink-dim">{clip.body}</p>
      </div>
    </motion.div>
  );
}
