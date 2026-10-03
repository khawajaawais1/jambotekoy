import { getTranslations } from "next-intl/server";
import ContactPageClient from "./ContactPageClient";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metaContact" });
  return pageMetadata({ pathname: "/contact", locale, title: t("title"), description: t("description") });
}

export default function ContactPage() {
  return <ContactPageClient />;
}
