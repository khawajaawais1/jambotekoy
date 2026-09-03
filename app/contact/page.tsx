"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setState("idle"), 2600);
  }
  const btn = state === "sending" ? "Sending…" : state === "sent" ? "✓ Request received" : "Send request";

  return (
    <>
      <section className="pt-[180px] pb-20 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-b border-white/10" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="absolute -top-40 left-1/3 w-[700px] h-[500px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="relative max-w-[1500px] mx-auto">
          <div className="text-[11px] tracking-[0.22em] uppercase text-ink-mute">
            <Link href="/" className="hover:text-brand-glow">Home</Link> &nbsp;/&nbsp; Contact
          </div>
          <h1 className="text-display-hero text-[clamp(56px,9vw,140px)] leading-[0.9] mt-5">
            Let's get you <span className="text-serif-italic text-brand-glow">on the road.</span>
          </h1>
          <p className="text-lg text-ink-dim mt-6 max-w-xl">
            Book a slot online, drop us an email, or call the workshop directly. Most services can be booked within 2–3 working days.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ paddingInline: "clamp(20px,4vw,48px)" }}>
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <h3 className="text-display-hero text-3xl uppercase mb-8">Get <span className="text-serif-italic text-brand-glow">in touch.</span></h3>
            {[
              ["Address", <span key="a">Jokivarrentie 12 H 1<br />40520 Jyväskylä<br />Finland</span>],
              ["Phone", <a key="p" href="tel:+358451824414" className="hover:text-brand-glow">045 182 4414</a>],
              ["Email", <a key="e" href="mailto:joekiuna@yahoo.com" className="hover:text-brand-glow">joekiuna@yahoo.com</a>],
              ["Hours", <span key="h">Mon – Fri · 08:00 – 17:00<br />Sat · By appointment<br />Sun · Closed</span>],
              ["Founded", <span key="f">2023 · Y-tunnus registered</span>]
            ].map(([label, val], i) => (
              <div key={i} className="grid grid-cols-[100px_1fr] items-baseline gap-3 border-b border-white/10 py-5">
                <div className="text-[10px] tracking-[0.28em] uppercase text-ink-mute">{label}</div>
                <div className="text-lg font-medium text-white/95 leading-snug">{val}</div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="p-8 md:p-10 rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name" name="name" placeholder="Matti Meikäläinen" required />
              <Field label="Phone" name="phone" type="tel" placeholder="+358 …" required />
            </div>
            <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Vehicle" name="car" placeholder="e.g. BMW 540i 2019" />
              <div>
                <label className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-2">Service</label>
                <select name="service" className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-[15px] focus:outline-none focus:border-brand focus:bg-brand/5">
                  {["Diagnostics & ECU scan","Oil & filter service","Seasonal tyre change","Wheel alignment","Brakes & discs","Timing belt / chain","Suspension & steering","Air-con service","Pre-purchase inspection","Something else"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-2">Message</label>
              <textarea name="msg" rows={4} placeholder="Symptoms, dates that work, anything else…" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[15px] focus:outline-none focus:border-brand focus:bg-brand/5" />
            </div>
            <button type="submit" disabled={state === "sending"} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand text-white text-[12px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform disabled:opacity-70">
              {btn}
            </button>
            <p className="text-[11px] text-ink-mute text-center tracking-[0.05em]">We usually reply the same working day.</p>
          </form>
        </div>

        <div className="mt-16 max-w-[1500px] mx-auto aspect-[21/9] rounded-[24px] overflow-hidden border border-white/10">
          <iframe
            title="Jambotek Oy on Google Maps"
            src="https://www.google.com/maps?q=Jokivarrentie%2012%2C%2040520%20Jyv%C3%A4skyl%C3%A4%2C%20Finland&output=embed"
            className="w-full h-full grayscale-[80%] invert-[92%] contrast-[0.85]"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-2">{label}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-[15px] focus:outline-none focus:border-brand focus:bg-brand/5" />
    </div>
  );
}
