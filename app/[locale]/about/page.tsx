import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import BigCTA from "@/components/BigCTA";
import StatsGrid from "@/components/StatsGrid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metaAbout" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");
  const tNav = await getTranslations("nav");
  const certs = [
    [t("cert1Title"), t("cert1Desc")],
    [t("cert2Title"), t("cert2Desc")],
    [t("cert3Title"), t("cert3Desc")]
  ];

  return (
    <>
      <section className="pt-[180px] pb-20 relative overflow-hidden bg-[linear-gradient(135deg,#2a0a0d_0%,#0a0a0a_45%,#050505_100%)] border-b border-white/10" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="absolute -top-40 right-1/4 w-[700px] h-[500px] rounded-full bg-brand/25 blur-[140px]" />
        <div className="absolute bottom-[-8rem] -left-32 w-[480px] h-[480px] rounded-full bg-brand-glow/15 blur-[130px]" />
        <div className="relative max-w-[1500px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
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
            <Image src="/images/hero-side.jpg" alt={t("heroImageAlt")} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-glow/70" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-glow/70" />
          </div>
        </div>
      </section>

      <section className="py-24" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-surface lg:sticky lg:top-24">
            <Image src="/images/owner.jpg" alt="Joseph Kiuna Kamau — founder" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-4 flex items-center gap-3">
              <span className="text-brand">///</span> {t("storyEyebrow")}
            </div>
            <h2 className="text-display-hero text-[clamp(36px,5vw,68px)] leading-[0.95]">
              {t("storyHeadlinePlain")} <span className="text-serif-italic text-brand-glow">{t("storyHeadlineItalic")}</span>
            </h2>
            <p className="mt-6 text-lg text-ink-dim leading-relaxed">
              {t.rich("p1", { b: (chunks) => <b className="text-white">{chunks}</b> })}
            </p>
            <p className="mt-4 text-lg text-ink-dim leading-relaxed">
              {t.rich("p2", { b: (chunks) => <b className="text-white">{chunks}</b> })}
            </p>
            <p className="mt-4 text-lg text-ink-dim leading-relaxed">
              {t.rich("p3", { em: (chunks) => <em className="text-white">{chunks}</em> })}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {certs.map(([title, desc]) => (
                <div key={title} className="p-6 rounded-[16px] border border-white/10">
                  <div className="text-display-hero text-xl text-brand-glow">{title}</div>
                  <div className="text-ink-dim text-[13px] mt-2">{desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-[11px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform">
                {t("bookService")}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsGrid />
      <BigCTA />
    </>
  );
}
