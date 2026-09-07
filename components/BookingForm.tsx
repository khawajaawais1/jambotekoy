"use client";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getBookableDates, SLOT_TIMES } from "@/lib/slots";

type Availability = Record<string, string[]>; // date -> taken times

export default function BookingForm() {
  const t = useTranslations("booking");
  const tContact = useTranslations("contactPage");
  const locale = useLocale();

  const dates = useMemo(() => getBookableDates(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [availability, setAvailability] = useState<Availability>({});
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);

  const serviceOptions = tContact.raw("formServiceOptions") as string[];

  async function loadAvailability() {
    setLoadingAvailability(true);
    setLoadError(false);
    try {
      const res = await fetch(`/api/bookings?from=${dates[0]}&to=${dates[dates.length - 1]}`);
      if (!res.ok) throw new Error("bad response");
      setAvailability(await res.json());
    } catch {
      setLoadError(true);
    } finally {
      setLoadingAvailability(false);
    }
  }

  useEffect(() => {
    loadAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dayFmt = new Intl.DateTimeFormat(locale === "fi" ? "fi-FI" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
  const takenForSelected = new Set(availability[selectedDate] ?? []);
  const allTakenForSelected = SLOT_TIMES.every((time) => takenForSelected.has(time));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setSubmitError(t("pickSlotError"));
      return;
    }
    setSubmitError(null);
    setSubmitState("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      date: selectedDate,
      time: selectedTime,
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      vehicle: String(data.get("car") || ""),
      reason: String(data.get("service") || serviceOptions[0]),
      notes: String(data.get("msg") || ""),
      locale
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.status === 409) {
        setSubmitError(t("conflictError"));
        setSubmitState("idle");
        setSelectedTime(null);
        loadAvailability();
        return;
      }
      if (!res.ok) throw new Error("failed");

      setConfirmed({ date: selectedDate, time: selectedTime });
      setSubmitState("sent");
      form.reset();
    } catch {
      setSubmitError(t("genericError"));
      setSubmitState("idle");
    }
  }

  if (confirmed) {
    const dateFmt = new Intl.DateTimeFormat(locale === "fi" ? "fi-FI" : "en-GB", { weekday: "long", day: "numeric", month: "long" }).format(
      new Date(`${confirmed.date}T00:00:00`)
    );
    return (
      <div className="p-8 md:p-10 rounded-[24px] border border-brand/40 bg-gradient-to-b from-brand/10 to-transparent text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-brand grid place-items-center red-glow">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="text-display-hero text-2xl mt-6">{t("confirmedTitle")}</h3>
        <p className="text-ink-dim mt-3">{t("confirmedBody", { date: dateFmt, time: confirmed.time })}</p>
        <button
          onClick={() => { setConfirmed(null); setSubmitState("idle"); setSelectedTime(null); loadAvailability(); }}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-brand hover:text-brand-glow transition"
        >
          {t("bookAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p-8 md:p-10 rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent space-y-6">
      {/* Date tiles */}
      <div>
        <label className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-3">{t("selectDate")}</label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {dates.map((d) => {
            const isSelected = d === selectedDate;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={isSelected}
                onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                className={`shrink-0 min-w-[72px] px-3 py-2.5 rounded-xl border text-center transition-colors ${
                  isSelected ? "bg-brand border-brand text-white" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.1em] opacity-80">{dayFmt.format(new Date(`${d}T00:00:00`)).split(" ")[0]}</div>
                <div className="text-lg font-semibold leading-tight">{new Date(`${d}T00:00:00`).getDate()}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time tiles */}
      <div>
        <label className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-3">{t("selectTime")}</label>
        {loadingAvailability ? (
          <p className="text-sm text-ink-mute">{t("loadingAvailability")}</p>
        ) : loadError ? (
          <button type="button" onClick={loadAvailability} className="text-sm text-brand-glow underline underline-offset-2">
            {t("loadErrorRetry")}
          </button>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {SLOT_TIMES.map((time) => {
              const taken = takenForSelected.has(time);
              const isSelected = time === selectedTime;
              return (
                <button
                  key={time}
                  type="button"
                  disabled={taken}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    taken
                      ? "opacity-40 cursor-not-allowed border-white/5 bg-white/[0.02] line-through"
                      : isSelected
                      ? "bg-brand border-brand text-white"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
        {!loadingAvailability && !loadError && allTakenForSelected && (
          <p className="text-sm text-ink-mute mt-2">{t("noSlotsLeft")}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={tContact("formNameLabel")} name="name" placeholder={tContact("formNamePlaceholder")} required />
        <Field label={tContact("formPhoneLabel")} name="phone" type="tel" placeholder="+358 …" required />
      </div>
      <Field label={tContact("formEmailLabel")} name="email" type="email" placeholder="you@example.com" required />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={tContact("formCarLabel")} name="car" placeholder={tContact("formCarPlaceholder")} />
        <div>
          <label className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-2">{t("reasonLabel")}</label>
          <select name="service" required className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-[15px] focus:outline-none focus:border-brand focus:bg-brand/5">
            {serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-2">{tContact("formMessageLabel")}</label>
        <textarea name="msg" rows={3} placeholder={tContact("formMessagePlaceholder")} className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[15px] focus:outline-none focus:border-brand focus:bg-brand/5" />
      </div>

      {submitError && <p className="text-sm text-brand-glow">{submitError}</p>}

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand text-white text-[12px] tracking-[0.22em] uppercase font-semibold red-glow hover:-translate-y-0.5 transition-transform disabled:opacity-70"
      >
        {submitState === "sending" ? t("confirmingButton") : t("confirmButton")}
      </button>
      <p className="text-[11px] text-ink-mute text-center tracking-[0.05em]">{tContact("note")}</p>
    </form>
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
