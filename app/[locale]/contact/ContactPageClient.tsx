"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import BookingForm from "@/components/BookingForm";
import MapEmbed from "@/components/MapEmbed";

export default function ContactPageClient() {
  const t = useTranslations("contactPage");
  const tNav = useTranslations("nav");
  const hoursLines = t("hoursValue").split("\n");

  const rows: [string, React.ReactNode][] = [
    [t("addressLabel"), <span key="a">Jokivarrentie 12 H 1<br />40520 Jyväskylä<br />Finland</span>],
    [t("phoneLabel"), <a key="p" href="tel:+358451824414" className="hover:text-brand-glow">045 182 4414</a>],
    [t("emailLabel"), <a key="e" href="mailto:joekiuna@yahoo.com" className="hover:text-brand-glow">joekiuna@yahoo.com</a>],
    [t("hoursLabel"), <span key="h">{hoursLines[0]}<br />{hoursLines[1]}<br />{hoursLines[2]}</span>],
    [t("foundedLabel"), <span key="f">{t("foundedValue")}</span>]
  ];

  return (
    <>
      <section className="pt-[180px] pb-20 relative overflow-hidden bg-[linear-gradient(150deg,#2a0a0d_0%,#0a0a0a_45%,#050505_100%)] border-b border-white/10" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="absolute -top-40 left-1/3 w-[700px] h-[500px] rounded-full bg-brand/25 blur-[140px]" />
        <div className="absolute bottom-[-8rem] -right-32 w-[480px] h-[480px] rounded-full bg-brand-glow/15 blur-[130px]" />
        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-ink-mute">
              <Link href="/" className="hover:text-brand-glow">{tNav("home")}</Link> &nbsp;/&nbsp; {t("breadcrumb")}
            </div>
            <h1 className="text-display-hero text-[clamp(56px,9vw,140px)] leading-[0.9] mt-5">
              {t("headlinePlain")} <span className="text-serif-italic text-brand-glow">{t("headlineItalic")}</span>
            </h1>
            <p className="text-lg text-ink-dim mt-6 max-w-xl">
              {t("intro")}
            </p>
          </div>
          <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-surface red-glow">
            <Image src="/images/bay-exterior.jpg" alt={t("heroImageAlt")} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-glow/70" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-glow/70" />
          </div>
        </div>
      </section>

      <section className="py-24" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <h3 className="text-display-hero text-3xl uppercase mb-8">{t("getInTouchPlain")} <span className="text-serif-italic text-brand-glow">{t("getInTouchItalic")}</span></h3>
            {rows.map(([label, val], i) => (
              <div key={i} className="grid grid-cols-[100px_1fr] items-baseline gap-3 border-b border-white/10 py-5">
                <div className="text-[10px] tracking-[0.28em] uppercase text-ink-mute">{label}</div>
                <div className="text-lg font-medium text-white/95 leading-snug">{val}</div>
              </div>
            ))}
          </div>

          <BookingForm />
        </div>

        <div className="relative mt-16 max-w-[1500px] mx-auto aspect-[4/3] sm:aspect-[21/9] rounded-[24px] overflow-hidden border border-white/10">
          <MapEmbed
            title={t("mapTitle")}
            loadLabel={t("loadMap")}
            iframeClassName="grayscale-[80%] invert-[92%] contrast-[0.85]"
          />
        </div>
      </section>
    </>
  );
}
