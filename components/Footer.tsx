import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Logo from "./Logo";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-8" style={{ paddingLeft: "clamp(20px,4vw,48px)", paddingRight: "clamp(20px,4vw,48px)" }}>
      <div className="max-w-[1500px] mx-auto grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo className="w-12" />
            <div className="text-display-hero text-[18px] leading-none tracking-[0.14em]">
              JAMBOTEK <span className="text-brand-glow">OY</span>
              <div className="text-[9px] tracking-[0.28em] mt-1 font-sans font-medium text-brand-glow/90">AINA VALMIINA AUTTAMAAN</div>
            </div>
          </Link>
          <p className="text-ink-dim text-sm mt-5 max-w-xs">{t("description")}</p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61594088317755"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("facebookAriaLabel")}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-ink-dim hover:text-white hover:border-brand hover:bg-brand transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M13.5 21v-8.2h2.75l.41-3.19h-3.16V7.55c0-.92.26-1.55 1.58-1.55h1.68V3.14C15.98 3.1 15.06 3 14 3c-2.2 0-3.71 1.34-3.71 3.8v2.81H7.5v3.19h2.79V21h3.21z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/jambotekoy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("instagramAriaLabel")}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-ink-dim hover:text-white hover:border-brand hover:bg-brand transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>

        <FooterCol title={t("exploreTitle")} items={[
          ["/", tNav("home")], ["/services", tNav("services")], ["/about", tNav("about")], ["/contact", tNav("contact")]
        ]} />

        <FooterCol title={t("contactTitle")} custom={
          <ul className="grid gap-3 text-sm text-ink-dim">
            <li><a href="tel:+358451824414" className="hover:text-brand-glow">045 182 4414</a></li>
            <li><a href="mailto:joekiuna@yahoo.com" className="hover:text-brand-glow">joekiuna@yahoo.com</a></li>
            <li>Jokivarrentie 12 H 1<br />40520 Jyväskylä</li>
          </ul>
        } />

        <FooterCol title={t("hoursTitle")} custom={
          <ul className="grid gap-3 text-sm text-ink-dim">
            <li>{t("hours1")}</li>
            <li>{t("hours2")}</li>
            <li>{t("hours3")}</li>
          </ul>
        } />
      </div>

      <div className="max-w-[1500px] mx-auto mt-14 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-2 text-[11px] tracking-[0.08em] text-ink-mute">
        <span>{t("copyright", { year: new Date().getFullYear() })} · {t("businessId")}</span>
        <span>{t("tagline")}</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, custom }: { title: string; items?: [string, string][]; custom?: React.ReactNode }) {
  return (
    <div>
      <h5 className="text-display-hero text-[13px] tracking-[0.24em] uppercase text-brand-glow mb-5">{title}</h5>
      {custom ? custom : (
        <ul className="grid gap-3 text-sm">
          {items?.map(([href, label]) => (
            <li key={href}><Link className="text-ink-dim hover:text-brand-glow" href={href}>{label}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}
