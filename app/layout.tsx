import type { Metadata, Viewport } from "next";
import { Anton, Cormorant, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const cormorant = Cormorant({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["italic", "normal"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jambotek Oy — Precision Auto Workshop · Jyväskylä, Finland",
  description:
    "Certified independent auto workshop in Jyväskylä. Diagnostics, tyres, alignment, servicing and repairs for European cars. Aina valmiina auttamaan.",
  icons: { icon: "/favicon.svg" }
};
export const viewport: Viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
