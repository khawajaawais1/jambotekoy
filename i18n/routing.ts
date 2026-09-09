import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["fi", "en"],
  defaultLocale: "fi",
  // Finnish (the default) is served with no prefix — "/", "/palvelut" etc.
  // English is served under "/en" — "/en", "/en/services" etc.
  localePrefix: "as-needed",
  // Always default new visitors to Finnish instead of matching the browser's language.
  localeDetection: false
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
