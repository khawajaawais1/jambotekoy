"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Stage = { tag: string; title: string; accent: string; body: string };

// Structural (asset paths) — not translated, index-aligned with the
// "stages" array in the message catalog.
const IMAGES = ["/images/bay-align.jpg", "/images/svc-tyres.jpg", "/images/bay-front.jpg", "/images/svc-inspection.jpg"];
const TOTAL = IMAGES.length + 1;
// Only the active stage plus one neighbour on either side stay mounted —
// keeps the number of simultaneously-decoded full-bleed images/video at
// 2-3 instead of all 5, which is what was causing the scroll jank.
const MOUNT_RADIUS = 1;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow flex items-center gap-3">
      <span className="text-brand">///</span> {children}
    </div>
  );
}

export default function SystemsReveal() {
  // Read the media query only after mount so the hydration pass always
  // matches the server (which renders the animated version by default).
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce ? <StaticVersion /> : <ScrollVersion />;
}

function StaticVersion() {
  const t = useTranslations("systemsReveal");
  const stages = (t.raw("stages") as Stage[]).map((s, i) => ({ ...s, img: IMAGES[i] }));

  return (
    <section className="relative py-32" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-display-hero text-[clamp(42px,6.5vw,92px)] leading-none mt-5">
            {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((s) => (
            <div key={s.title} className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-white/10 bg-surface">
              <Image src={s.img} alt={`${s.title} ${s.accent}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <div className="text-[10px] tracking-[0.24em] uppercase text-brand-glow">{s.tag}</div>
                <div className="text-display-hero text-xl leading-none mt-1">
                  {s.title} <span className="text-serif-italic text-white/80">{s.accent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-6 aspect-[21/9] rounded-[28px] overflow-hidden border border-white/10">
          <Image src="/images/reveal-bmw-poster.png" alt="Jambotek Oy — the finished car" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 flex flex-wrap items-end justify-between gap-6">
            <h3 className="text-display-hero text-[clamp(28px,4vw,52px)] leading-none">
              {t("finaleHeadlinePlain")} <span className="text-serif-italic text-brand-glow">{t("finaleHeadlineItalic")}</span>
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-[11px] tracking-[0.22em] uppercase font-semibold red-glow"
            >
              {t("bookService")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollVersion() {
  const t = useTranslations("systemsReveal");
  const stages = (t.raw("stages") as Stage[]).map((s, i) => ({ ...s, img: IMAGES[i] }));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(v * TOTAL)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const labels = [...stages.map((s) => s.title), t("reveal")];

  return (
    <section ref={ref} className="relative h-[380vh] md:h-[500vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden noise bg-bg">
        <div className="absolute inset-0 grid-bg mask-radial opacity-60 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-brand/15 blur-[110px]" />
          <div className="absolute bottom-[-6rem] -right-40 w-[460px] h-[460px] rounded-full bg-brand-glow/10 blur-[110px]" />
        </div>

        <div
          className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between"
          style={{ paddingInline: "clamp(20px,4vw,48px)" }}
        >
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <div className="text-[11px] tracking-[0.28em] uppercase text-ink-mute hidden sm:block">
            {String(active + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </div>
        </div>

        {stages.map((s, i) => (
          <StageCapsule
            key={s.title}
            data={s}
            index={i}
            isActive={active === i}
            mounted={Math.abs(active - i) <= MOUNT_RADIUS}
            scrollYProgress={scrollYProgress}
          />
        ))}
        <Finale
          index={stages.length}
          isActive={active === stages.length}
          mounted={Math.abs(active - stages.length) <= MOUNT_RADIUS}
          scrollYProgress={scrollYProgress}
          headlinePlain={t("finaleHeadlinePlain")}
          headlineItalic={t("finaleHeadlineItalic")}
          bookService={t("bookService")}
        />

        <motion.div
          key={active}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
          style={{
            background:
              "linear-gradient(100deg, transparent 35%, rgba(255,53,71,0.55) 47%, rgba(120,220,255,0.4) 53%, transparent 65%)"
          }}
          initial={{ opacity: active === 0 ? 0 : 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
          {labels.map((l, i) => (
            <div key={l} className="flex items-center gap-3 justify-end h-3">
              {active === i && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-glow whitespace-nowrap">{l}</span>
              )}
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  active === i ? "bg-brand-glow shadow-[0_0_12px_#FF3547] scale-125" : "bg-white/20"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapsuleChrome({ tag, isActive }: { tag: string; isActive: boolean }) {
  return (
    <>
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-glow/70" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-brand-glow/70" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-brand-glow/70" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-glow/70" />
      {/* Solid chip instead of backdrop-filter/.glass — blur-behind is one of the
          most expensive properties to recomposite while an ancestor is transformed. */}
      <div className="absolute top-6 left-6 z-10 bg-black/70 px-3 py-1.5 rounded-full border border-white/15 text-[10px] tracking-[0.28em] uppercase text-white/90 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-glow blink-dot" />
        {isActive ? (
          <span key={tag} className="typewrite">
            {tag}
          </span>
        ) : (
          <span>{tag}</span>
        )}
      </div>
    </>
  );
}

function StageCapsule({
  data,
  index,
  isActive,
  mounted,
  scrollYProgress
}: {
  data: Stage & { img: string };
  index: number;
  isActive: boolean;
  mounted: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const seg = 1 / TOTAL;
  const start = index * seg;
  const end = (index + 1) * seg;
  const pad = seg * 0.22;
  const dir = index % 2 === 0 ? -1 : 1;

  const opacity = useTransform(scrollYProgress, [start, start + pad, end - pad, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, start + pad, end - pad, end], [1.1, 1, 1, 0.92]);
  const x = useTransform(scrollYProgress, [start, start + pad, end - pad, end], [dir * -60, 0, 0, dir * 60]);
  const rotate = useTransform(scrollYProgress, [start, start + pad, end - pad, end], [dir * -4, 0, 0, dir * 4]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden={!isActive}
      style={{ opacity, pointerEvents: isActive ? "auto" : "none" }}
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      <motion.div
        style={{ scale, x, rotate }}
        className="relative w-[86%] sm:w-full max-w-[560px] sm:max-w-[640px] aspect-[4/5] sm:aspect-[16/10] rounded-[28px] overflow-hidden bg-surface red-glow"
      >
        <Image
          src={data.img}
          alt={`${data.title} ${data.accent}`}
          fill
          sizes="(max-width: 1024px) 92vw, 640px"
          className="object-cover"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="scanline" />
          </div>
        )}
        <CapsuleChrome tag={data.tag} isActive={isActive} />
        <div className="absolute inset-x-6 bottom-6">
          <div className="text-display-hero text-[clamp(26px,3.4vw,42px)] leading-none">
            {data.title} <span className="text-serif-italic text-brand-glow">{data.accent}</span>
          </div>
          <p className="mt-3 max-w-md text-[14px] text-ink-dim">{data.body}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Finale({
  index,
  isActive,
  mounted,
  scrollYProgress,
  headlinePlain,
  headlineItalic,
  bookService
}: {
  index: number;
  isActive: boolean;
  mounted: boolean;
  scrollYProgress: MotionValue<number>;
  headlinePlain: string;
  headlineItalic: string;
  bookService: string;
}) {
  const seg = 1 / TOTAL;
  const start = index * seg;
  const pad = seg * 0.3;
  const videoRef = useRef<HTMLVideoElement>(null);

  const opacity = useTransform(scrollYProgress, [start, start + pad, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [start, start + pad, 1], [1.15, 1, 1.04]);
  const textOpacity = useTransform(scrollYProgress, [start + pad, start + pad * 1.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [start + pad, start + pad * 1.8], [30, 0]);

  useEffect(() => {
    if (mounted) videoRef.current?.play().catch(() => {});
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden={!isActive}
      style={{ opacity, pointerEvents: isActive ? "auto" : "none" }}
      className="absolute inset-0 z-10"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/reveal-bmw.mp4"
          poster="/images/reveal-bmw-poster.png"
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      </motion.div>
      <motion.div
        style={{ opacity: textOpacity, y: textY, paddingInline: "clamp(20px,4vw,48px)" }}
        className="relative z-10 h-full flex flex-col items-center justify-end text-center pb-20 sm:pb-24"
      >
        <h3 className="text-display-hero text-[clamp(34px,6vw,72px)] leading-[0.95] max-w-3xl">
          {headlinePlain} <span className="text-serif-italic text-brand-glow">{headlineItalic}</span>
        </h3>
        {isActive && (
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand text-white text-[12px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform"
          >
            {bookService}
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}
