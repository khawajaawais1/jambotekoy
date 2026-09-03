import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
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
          <p className="text-ink-dim text-sm mt-5 max-w-xs">
            Certified independent auto workshop for European cars. Precision diagnostics, honest quotes, same-day repairs. Based in Jyväskylä.
          </p>
        </div>

        <FooterCol title="Explore" items={[
          ["/", "Home"], ["/services", "Services"], ["/about", "About"], ["/contact", "Contact"]
        ]} />

        <FooterCol title="Contact" custom={
          <ul className="grid gap-3 text-sm text-ink-dim">
            <li><a href="tel:+358451824414" className="hover:text-brand-glow">045 182 4414</a></li>
            <li><a href="mailto:joekiuna@yahoo.com" className="hover:text-brand-glow">joekiuna@yahoo.com</a></li>
            <li>Jokivarrentie 12 H 1<br />40520 Jyväskylä</li>
          </ul>
        } />

        <FooterCol title="Hours" custom={
          <ul className="grid gap-3 text-sm text-ink-dim">
            <li>Mon – Fri · 08:00 – 17:00</li>
            <li>Sat · By appointment</li>
            <li>Sun · Closed</li>
          </ul>
        } />
      </div>

      <div className="max-w-[1500px] mx-auto mt-14 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-2 text-[11px] tracking-[0.08em] text-ink-mute">
        <span>© {new Date().getFullYear()} Jambotek Oy · Jyväskylä, Finland</span>
        <span>Aina valmiina auttamaan</span>
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
