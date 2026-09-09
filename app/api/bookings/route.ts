import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema, type Booking } from "@/lib/db";
import { isPastSlot, isValidBookableDate, isValidSlotTime } from "@/lib/slots";
import { sendBookingEmails } from "@/lib/email";
import { sendOwnerWhatsApp } from "@/lib/whatsapp";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/bookings?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns { "2026-09-10": ["08:00", "09:00"], ... } — taken slot times per date.
export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from");
  const to = req.nextUrl.searchParams.get("to");
  if (!from || !to || !/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    return NextResponse.json({ error: "Query params 'from' and 'to' (YYYY-MM-DD) are required." }, { status: 400 });
  }

  await ensureSchema();
  const rows = await sql<{ slot_date: string; slot_time: string }[]>`
    SELECT slot_date, slot_time FROM bookings
    WHERE slot_date BETWEEN ${from} AND ${to}
  `;

  const taken: Record<string, string[]> = {};
  for (const r of rows) {
    const dateKey = new Date(r.slot_date).toISOString().slice(0, 10);
    (taken[dateKey] ??= []).push(r.slot_time);
  }
  return NextResponse.json(taken);
}

// POST /api/bookings — create a booking. Fails with 409 if the slot was just taken.
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { date, time, name, phone, email, vehicle, reason, notes, locale } = body ?? {};

  if (!isValidBookableDate(date)) {
    return NextResponse.json({ error: "Invalid or unavailable date." }, { status: 400 });
  }
  if (!isValidSlotTime(time)) {
    return NextResponse.json({ error: "Invalid time slot." }, { status: 400 });
  }
  if (isPastSlot(date, time)) {
    return NextResponse.json({ error: "This time slot has already passed." }, { status: 400 });
  }
  for (const [field, value] of [["name", name], ["phone", phone], ["email", email], ["reason", reason]] as const) {
    if (typeof value !== "string" || value.trim().length === 0) {
      return NextResponse.json({ error: `Missing required field: ${field}.` }, { status: 400 });
    }
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  const safeLocale = locale === "en" ? "en" : "fi";

  await ensureSchema();

  let booking: Booking;
  try {
    const rows = await sql<Booking[]>`
      INSERT INTO bookings (slot_date, slot_time, name, phone, email, vehicle, reason, notes, locale)
      VALUES (${date}, ${time}, ${name.trim()}, ${phone.trim()}, ${email.trim()}, ${vehicle?.trim() || null}, ${reason.trim()}, ${notes?.trim() || null}, ${safeLocale})
      RETURNING *
    `;
    booking = rows[0];
  } catch (err: any) {
    if (err?.code === "23505") {
      return NextResponse.json({ error: "This slot was just taken. Please pick another." }, { status: 409 });
    }
    console.error("Booking insert failed:", err);
    return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
  }

  // Notifications are best-effort: the booking is already saved, so a
  // failure here shouldn't undo it — just log for the owner to notice.
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendBookingEmails(booking),
    sendOwnerWhatsApp(booking)
  ]);
  if (emailResult.status === "rejected") console.error("Booking email failed:", emailResult.reason);
  if (whatsappResult.status === "rejected") console.error("Booking WhatsApp failed:", whatsappResult.reason);

  return NextResponse.json(
    {
      success: true,
      booking: { date: booking.slot_date, time: booking.slot_time, name: booking.name },
      notified: { email: emailResult.status === "fulfilled", whatsapp: whatsappResult.status === "fulfilled" }
    },
    { status: 201 }
  );
}
