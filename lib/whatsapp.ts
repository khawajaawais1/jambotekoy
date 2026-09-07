import type { Booking } from "./db";

/**
 * Sends a plain-text WhatsApp message to the owner via the Meta Cloud API.
 *
 * Note: Meta only allows free-form text messages to numbers that have
 * messaged your business number in the last 24h, OR to recipient numbers
 * you've added as verified test recipients on a development-mode number
 * (Meta for Developers -> your app -> WhatsApp -> API Setup -> "To" list).
 * For a single fixed owner number, adding it as a verified test recipient
 * once is the simplest path and keeps this on the free tier indefinitely.
 * If you later move to a production WhatsApp number, replace this with an
 * approved message template instead.
 */
export async function sendOwnerWhatsApp(booking: Booking) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ownerNumber = process.env.WHATSAPP_OWNER_NUMBER;

  if (!token || !phoneNumberId || !ownerNumber) {
    throw new Error("WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_OWNER_NUMBER not configured — skipping WhatsApp send.");
  }

  const body = `Uusi varaus Jambotek Oy:lle\n\nAika: ${booking.slot_date} klo ${booking.slot_time}\nAsiakas: ${booking.name}\nPuhelin: ${booking.phone}\nPalvelu/syy: ${booking.reason}${booking.vehicle ? `\nAjoneuvo: ${booking.vehicle}` : ""}${booking.notes ? `\nLisätiedot: ${booking.notes}` : ""}`;

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: ownerNumber,
      type: "text",
      text: { body }
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`WhatsApp send failed (${res.status}): ${detail}`);
  }
}
