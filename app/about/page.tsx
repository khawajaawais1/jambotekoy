import Image from "next/image";
import Link from "next/link";
import BigCTA from "@/components/BigCTA";
import StatsGrid from "@/components/StatsGrid";

export const metadata = {
  title: "About — Jambotek Oy",
  description: "Meet Jambotek Oy — an independent Jyväskylä workshop founded by master technician Joseph Kiuna Kamau."
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-[180px] pb-20 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-b border-white/10" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="absolute -top-40 right-1/4 w-[700px] h-[500px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="relative max-w-[1500px] mx-auto">
          <div className="text-[11px] tracking-[0.22em] uppercase text-ink-mute">
            <Link href="/" className="hover:text-brand-glow">Home</Link> &nbsp;/&nbsp; About
          </div>
          <h1 className="text-display-hero text-[clamp(56px,9vw,140px)] leading-[0.9] mt-5">
            A workshop built <span className="text-serif-italic text-brand-glow">on trust.</span>
          </h1>
          <p className="text-lg text-ink-dim mt-6 max-w-xl">
            Jambotek Oy is a small, independent auto workshop run by people who love cars — and take the time to fix them properly.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-surface lg:sticky lg:top-24">
            <Image src="/images/owner.jpg" alt="Joseph Kiuna Kamau — founder" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand-glow mb-4 flex items-center gap-3">
              <span className="text-brand">///</span> The story
            </div>
            <h2 className="text-display-hero text-[clamp(36px,5vw,68px)] leading-[0.95]">
              Founded by a <span className="text-serif-italic text-brand-glow">master technician.</span>
            </h2>
            <p className="mt-6 text-lg text-ink-dim leading-relaxed">
              Jambotek Oy was founded in <b className="text-white">2023</b> by <b className="text-white">Joseph Kiuna Kamau</b>, a
              EureCar-certified master technician with more than a decade of hands-on experience across European brands.
              After years working inside larger dealerships, Joseph opened Jambotek to offer something rare in the industry:
              honest, dealer-level workmanship at independent-shop pricing.
            </p>
            <p className="mt-4 text-lg text-ink-dim leading-relaxed">
              The workshop lives in a modern bay on <b className="text-white">Jokivarrentie 12 in Jyväskylä</b> —
              professional lifts, HPA wheel-alignment, tyre-mounting and balancing equipment, and diagnostic hardware
              for BMW, Mercedes-Benz, VW Group, Volvo and more.
            </p>
            <p className="mt-4 text-lg text-ink-dim leading-relaxed">
              Our promise is simple: we look at the car, we tell you what it needs, we quote before we start, and we hand
              it back cleaner and safer than we found it. <em className="text-white">Aina valmiina auttamaan.</em>
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {[
                ["EureCar", "Certified Master Technician (EV & hybrid)"],
                ["AD Finland", "Approved network partner — parts & training"],
                ["Bosch", "Diagnostic hardware & wiring documentation"]
              ].map(([t, d]) => (
                <div key={t} className="p-6 rounded-[16px] border border-white/10">
                  <div className="text-display-hero text-xl text-brand-glow">{t}</div>
                  <div className="text-ink-dim text-[13px] mt-2">{d}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-[11px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform">
                Book a service
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
