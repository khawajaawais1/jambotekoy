import { getTranslations } from "next-intl/server";
import ContactPageClient from "./ContactPageClient";
import { localizedAlternates, ogLocale } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metaContact" });
  const { canonical, languages } = localizedAlternates("/contact", locale);
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages },
    openGraph: { type: "website", url: canonical, locale: ogLocale(locale), title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") }
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
