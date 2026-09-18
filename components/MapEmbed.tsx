"use client";
import { useState } from "react";

const MAP_SRC =
  "https://www.google.com/maps?q=Jokivarrentie%2012%2C%2040520%20Jyv%C3%A4skyl%C3%A4%2C%20Finland&output=embed";

// The live Google Maps embed pulls ~1.5 MB of JS and re-paints on every scroll
// frame, so it only loads once the visitor asks for it.
export default function MapEmbed({
  title,
  loadLabel,
  iframeClassName = ""
}: {
  title: string;
  loadLabel: string;
  iframeClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return <iframe title={title} src={MAP_SRC} className={`absolute inset-0 w-full h-full ${iframeClassName}`} />;
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={loadLabel}
      className="absolute inset-0 w-full h-full grid place-items-center bg-[#0c0c0c] group/map cursor-pointer"
    >
      <span className="absolute inset-0 grid-bg opacity-60" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(225,29,46,0.24),transparent_62%)]" />
      <span className="relative flex flex-col items-center gap-5 px-6 text-center">
        <span className="w-16 h-16 rounded-full border border-brand/60 bg-brand/15 grid place-items-center red-glow transition-transform duration-300 group-hover/map:scale-110">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-brand-glow" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
        </span>
        <span className="text-display-hero text-[clamp(22px,3vw,34px)] leading-none">Jokivarrentie 12 H 1</span>
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-[10px] tracking-[0.24em] uppercase font-semibold transition-colors group-hover/map:border-brand group-hover/map:text-brand-glow">
          {loadLabel}
        </span>
      </span>
    </button>
  );
}
