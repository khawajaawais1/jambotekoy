import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import BigCTA from "@/components/BigCTA";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metaServices" });
  return { title: t("title"), description: t("description") };
}

type ServiceItem = { num: string; title: string; accent: string; body: string; price: string; meta: string };

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");
  const tNav = await getTranslations("nav");
  const SERVICES = t.raw("list") as ServiceItem[];

  return (
    <>
      <section className="pt-[180px] pb-20 relative overflow-hidden bg-[linear-gradient(225deg,#2a0a0d_0%,#0a0a0a_45%,#050505_100%)] border-b border-white/10" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] rounded-full bg-brand/25 blur-[140px]" />
        <div className="absolute bottom-[-8rem] -right-32 w-[480px] h-[480px] rounded-full bg-brand-glow/15 blur-[130px]" />
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
            <Image src="/images/bay-01.jpg" alt={t("heroImageAlt")} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-glow/70" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-glow/70" />
          </div>
        </div>
      </section>

      <section className="py-24" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="max-w-[1500px] mx-auto grid gap-4">
          {SERVICES.map((s) => (
            <article key={s.num} className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] items-center gap-6 md:gap-10 p-8 md:p-9 rounded-[20px] border border-white/10 hover:border-brand hover:bg-[linear-gradient(90deg,rgba(225,29,46,0.06),transparent)] transition-colors">
              <div className="text-display-hero text-[40px] text-brand leading-none">{s.num}</div>
              <div>
                <h3 className="text-display-hero text-[clamp(24px,2.6vw,32px)] uppercase leading-tight">
                  {s.title} <span className="text-serif-italic text-brand-glow">{s.accent}</span>
                </h3>
                <p className="text-ink-dim text-[15px] mt-2">{s.body}</p>
              </div>
              <div className="text-right">
                <div className="text-display-hero text-2xl">{s.price}</div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-ink-mute mt-1">{s.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BigCTA />
    </>
  );
}
