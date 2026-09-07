import sgMail from "@sendgrid/mail";
import type { Booking } from "./db";

function formatDate(dateStr: string, locale: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "fi" ? "fi-FI" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(d);
}

function customerEmailContent(b: Booking) {
  const dateFmt = formatDate(b.slot_date, b.locale);
  if (b.locale === "fi") {
    return {
      subject: "Varauksesi on vahvistettu — Jambotek Oy",
      text: `Hei ${b.name},\n\nVarauksesi on vahvistettu.\n\nAika: ${dateFmt} klo ${b.slot_time}\nPalvelu: ${b.reason}\n${b.vehicle ? `Ajoneuvo: ${b.vehicle}\n` : ""}\nOsoite: Jokivarrentie 12 H 1, 40520 Jyväskylä\nPuhelin: 045 182 4414\n\nNähdään pian!\nJambotek Oy — Aina valmiina auttamaan`,
      html: `<p>Hei ${b.name},</p><p>Varauksesi on vahvistettu.</p><p><b>Aika:</b> ${dateFmt} klo ${b.slot_time}<br/><b>Palvelu:</b> ${b.reason}${b.vehicle ? `<br/><b>Ajoneuvo:</b> ${b.vehicle}` : ""}</p><p><b>Osoite:</b> Jokivarrentie 12 H 1, 40520 Jyväskylä<br/><b>Puhelin:</b> 045 182 4414</p><p>Nähdään pian!<br/>Jambotek Oy — Aina valmiina auttamaan</p>`
    };
  }
  return {
    subject: "Your booking is confirmed — Jambotek Oy",
    text: `Hi ${b.name},\n\nYour booking is confirmed.\n\nWhen: ${dateFmt} at ${b.slot_time}\nService: ${b.reason}\n${b.vehicle ? `Vehicle: ${b.vehicle}\n` : ""}\nAddress: Jokivarrentie 12 H 1, 40520 Jyväskylä, Finland\nPhone: 045 182 4414\n\nSee you soon!\nJambotek Oy`,
    html: `<p>Hi ${b.name},</p><p>Your booking is confirmed.</p><p><b>When:</b> ${dateFmt} at ${b.slot_time}<br/><b>Service:</b> ${b.reason}${b.vehicle ? `<br/><b>Vehicle:</b> ${b.vehicle}` : ""}</p><p><b>Address:</b> Jokivarrentie 12 H 1, 40520 Jyväskylä, Finland<br/><b>Phone:</b> 045 182 4414</p><p>See you soon!<br/>Jambotek Oy</p>`
  };
}

function ownerEmailContent(b: Booking) {
  const dateFmt = formatDate(b.slot_date, "fi");
  return {
    subject: `Uusi varaus: ${b.slot_date} klo ${b.slot_time} — ${b.name}`,
    text: `Uusi varaus saapui.\n\nAika: ${dateFmt} klo ${b.slot_time}\nAsiakas: ${b.name}\nPuhelin: ${b.phone}\nSähköposti: ${b.email}\n${b.vehicle ? `Ajoneuvo: ${b.vehicle}\n` : ""}Palvelu / syy: ${b.reason}\n${b.notes ? `Lisätiedot: ${b.notes}\n` : ""}`,
    html: `<p>Uusi varaus saapui.</p><p><b>Aika:</b> ${dateFmt} klo ${b.slot_time}<br/><b>Asiakas:</b> ${b.name}<br/><b>Puhelin:</b> ${b.phone}<br/><b>Sähköposti:</b> ${b.email}${b.vehicle ? `<br/><b>Ajoneuvo:</b> ${b.vehicle}` : ""}<br/><b>Palvelu / syy:</b> ${b.reason}</p>${b.notes ? `<p><b>Lisätiedot:</b> ${b.notes}</p>` : ""}`
  };
}

/** Sends both notification emails. Each is best-effort — failures are thrown to the caller to log, not retried. */
export async function sendBookingEmails(booking: Booking) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

  if (!apiKey || !from) {
    throw new Error("SENDGRID_API_KEY / SENDGRID_FROM_EMAIL not configured — skipping email send.");
  }
  sgMail.setApiKey(apiKey);

  const customer = customerEmailContent(booking);
  const tasks = [sgMail.send({ to: booking.email, from, subject: customer.subject, text: customer.text, html: customer.html })];

  if (ownerEmail) {
    const owner = ownerEmailContent(booking);
    tasks.push(sgMail.send({ to: ownerEmail, from, subject: owner.subject, text: owner.text, html: owner.html }));
  }

  await Promise.all(tasks);
}
