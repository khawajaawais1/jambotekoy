import Link from "next/link";
import BigCTA from "@/components/BigCTA";

export const metadata = {
  title: "Services — Jambotek Oy",
  description: "Complete auto workshop services in Jyväskylä: diagnostics, tyres, alignment, brakes, servicing and repair."
};

const SERVICES = [
  { num: "01", title: "Diagnostics", accent: "& ECU scan", body: "Fault code read, live-data checks, adaptation and coding. Detailed printed report included.", price: "from 45€", meta: "per scan" },
  { num: "02", title: "Oil", accent: "& filter service", body: "Full-synthetic oil to manufacturer spec, oil filter, reset of service interval and safety inspection.", price: "from 89€", meta: "excl. oil" },
  { num: "03", title: "Seasonal", accent: "tyre change", body: "Wheel swap, balancing, torque check to spec, TPMS reset. Storage available.", price: "from 39€", meta: "per set" },
  { num: "04", title: "Wheel", accent: "alignment (HPA)", body: "4-wheel computer alignment on our HPA rig — toe, camber and caster adjusted to factory spec.", price: "from 79€", meta: "per vehicle" },
  { num: "05", title: "Brakes", accent: "& discs", body: "Pad and disc renewal, sensor checks, hydraulic bleed, brake-fluid change to DOT4 spec.", price: "from 149€", meta: "per axle" },
  { num: "06", title: "Timing belt", accent: "& chain", body: "Full timing kit replacement including water pump, tensioners and idlers where recommended.", price: "by quote", meta: "vehicle-specific" },
  { num: "07", title: "Suspension", accent: "& steering", body: "Shocks, springs, wishbones, ball joints, bushings. Silent, straight and safe — how it should be.", price: "by quote", meta: "after inspection" },
  { num: "08", title: "Air-con", accent: "service", body: "Refrigerant recovery and recharge, leak check, cabin filter renewal — R134a and R1234yf.", price: "from 95€", meta: "incl. gas" },
  { num: "09", title: "Pre-purchase", accent: "inspection", body: "Full independent inspection of a car you're considering. Written report with photos and estimated repair costs.", price: "from 120€", meta: "report included" }
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-[180px] pb-20 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-b border-white/10" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="relative max-w-[1500px] mx-auto">
          <div className="text-[11px] tracking-[0.22em] uppercase text-ink-mute">
            <Link href="/" className="hover:text-brand-glow">Home</Link> &nbsp;/&nbsp; Services
          </div>
          <h1 className="text-display-hero text-[clamp(56px,9vw,140px)] leading-[0.9] mt-5">
            Services <span className="text-serif-italic text-brand-glow">& pricing</span>
          </h1>
          <p className="text-lg text-ink-dim mt-6 max-w-xl">
            A complete workshop under one roof — modern diagnostics, tyres and alignment, brake and suspension work, plus scheduled servicing on all major European brands.
          </p>
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
