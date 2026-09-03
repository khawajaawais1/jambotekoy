"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import clsx from "clsx";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b border-transparent",
        scrolled ? "glass py-3 border-white/10" : "py-5"
      )}
      style={{ paddingLeft: "clamp(20px,4vw,48px)", paddingRight: "clamp(20px,4vw,48px)" }}
    >
      <div className="flex items-center justify-between max-w-[1500px] mx-auto">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Jambotek Oy home">
          <Logo className="w-10 group-hover:scale-105 transition-transform" />
          <div className="text-display-hero text-[18px] leading-none tracking-[0.14em]">
            JAMBOTEK <span className="text-brand-glow">OY</span>
            <div className="text-[9px] tracking-[0.28em] mt-1 font-sans font-medium text-brand-glow/90">
              AINA VALMIINA AUTTAMAAN
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-[12px] tracking-[0.18em] uppercase font-medium py-2 hover:text-brand-glow transition-colors"
              >
                {l.label}
                <span
                  className={clsx(
                    "absolute left-0 right-0 -bottom-0.5 h-px bg-brand origin-left transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-2 px-5 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold border border-white/20 hover:bg-brand hover:border-brand hover:text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_#E11D2E] transition-all"
          >
            Book Service
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Link>
        </nav>

        <button
          className="md:hidden w-10 h-10 border border-white/20 rounded-lg grid place-items-center"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          <div className="w-4 h-3 relative">
            <span className={clsx("absolute inset-x-0 top-0 h-px bg-white transition-transform", open && "translate-y-1.5 rotate-45")} />
            <span className={clsx("absolute inset-x-0 top-1.5 h-px bg-white transition-opacity", open && "opacity-0")} />
            <span className={clsx("absolute inset-x-0 bottom-0 h-px bg-white transition-transform", open && "-translate-y-1 -rotate-45")} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[86%] max-w-[380px] glass border-l border-white/10 flex flex-col gap-6 px-10 pt-28 md:hidden"
          >
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-medium hover:text-brand-glow">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand text-white text-[12px] tracking-[0.2em] uppercase font-semibold">
              Book Service
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
