"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import Logo from "./Logo";
import clsx from "clsx";

export default function Nav() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") }
  ];

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
        <Link href="/" className="flex items-center gap-3 group" aria-label={t("homeAriaLabel")}>
          <Logo className="w-10 group-hover:scale-105 transition-transform" priority />
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

          <LanguageSwitcher pathname={pathname} locale={locale} className="ml-2" />

          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-2 px-5 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold border border-white/20 hover:bg-brand hover:border-brand hover:text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_#E11D2E] transition-all"
          >
            {t("bookService")}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Link>
        </nav>

        <button
          className="relative z-[60] md:hidden w-10 h-10 border border-white/20 rounded-lg grid place-items-center"
          onClick={() => setOpen((s) => !s)}
          aria-label={t("menuAriaLabel")}
          aria-expanded={open}
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
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 top-0 right-0 bottom-0 w-[86%] max-w-[380px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col gap-6 px-10 pt-28 md:hidden"
          >
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-medium hover:text-brand-glow">
                {l.label}
              </Link>
            ))}
            <LanguageSwitcher pathname={pathname} locale={locale} className="mt-2" />
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand text-white text-[12px] tracking-[0.2em] uppercase font-semibold">
              {t("bookService")}
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61594088317755"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tFooter("facebookAriaLabel")}
                className="w-10 h-10 grid place-items-center rounded-full border border-white/15 text-ink-dim hover:text-white hover:border-brand hover:bg-brand transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M13.5 21v-8.2h2.75l.41-3.19h-3.16V7.55c0-.92.26-1.55 1.58-1.55h1.68V3.14C15.98 3.1 15.06 3 14 3c-2.2 0-3.71 1.34-3.71 3.8v2.81H7.5v3.19h2.79V21h3.21z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/jambotekoy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tFooter("instagramAriaLabel")}
                className="w-10 h-10 grid place-items-center rounded-full border border-white/15 text-ink-dim hover:text-white hover:border-brand hover:bg-brand transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitcher({ pathname, locale, className }: { pathname: string; locale: string; className?: string }) {
  const t = useTranslations("languageSwitcher");
  return (
    <div className={clsx("flex items-center gap-1 text-[11px] tracking-[0.15em] font-semibold", className)}>
      <Link
        href={pathname}
        locale="fi"
        className={clsx("px-2 py-1 rounded-md transition-colors", locale === "fi" ? "text-brand-glow" : "text-ink-mute hover:text-white")}
      >
        {t("fi")}
      </Link>
      <span className="text-ink-mute/40">/</span>
      <Link
        href={pathname}
        locale="en"
        className={clsx("px-2 py-1 rounded-md transition-colors", locale === "en" ? "text-brand-glow" : "text-ink-mute hover:text-white")}
      >
        {t("en")}
      </Link>
    </div>
  );
}
