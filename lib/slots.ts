// Shared, dependency-free slot/date logic used by both the API routes and
// the booking UI. Kept isomorphic (no server-only imports) so it can run
// on the client too.

const TIMEZONE = "Europe/Helsinki";

// 1-hour slots, Mon-Fri 08:00-17:00 (last slot starts 16:00, ends 17:00).
export const SLOT_TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// How many weekdays ahead the calendar offers.
export const BOOKING_HORIZON_DAYS = 21;

function helsinkiTodayParts(): { y: number; m: number; d: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" });
  const parts = fmt.formatToParts(new Date());
  const y = Number(parts.find((p) => p.type === "year")!.value);
  const m = Number(parts.find((p) => p.type === "month")!.value);
  const d = Number(parts.find((p) => p.type === "day")!.value);
  return { y, m, d };
}

function helsinkiNowParts(): { y: number; m: number; d: number; hh: number; mm: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = fmt.formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  // Some environments render midnight as "24" with hour12:false — normalize it.
  return { y: get("year"), m: get("month"), d: get("day"), hh: get("hour") % 24, mm: get("minute") };
}

function toISODate(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** Next `count` bookable weekdays (Mon-Fri) starting today, in Europe/Helsinki time, as 'YYYY-MM-DD'. */
export function getBookableDates(count: number = BOOKING_HORIZON_DAYS): string[] {
  const { y, m, d } = helsinkiTodayParts();
  const dates: string[] = [];
  let cursor = new Date(Date.UTC(y, m - 1, d));
  while (dates.length < count) {
    const day = cursor.getUTCDay(); // 0 Sun .. 6 Sat
    if (day !== 0 && day !== 6) {
      dates.push(toISODate(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, cursor.getUTCDate()));
    }
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
  }
  return dates;
}

export function isValidBookableDate(dateStr: string): boolean {
  return getBookableDates(BOOKING_HORIZON_DAYS).includes(dateStr);
}

export function isValidSlotTime(time: string): boolean {
  return SLOT_TIMES.includes(time);
}

/** True if the given 'YYYY-MM-DD' + 'HH:mm' slot start time has already passed, in Europe/Helsinki time. */
export function isPastSlot(dateStr: string, time: string): boolean {
  const now = helsinkiNowParts();
  const todayStr = toISODate(now.y, now.m, now.d);
  if (dateStr < todayStr) return true;
  if (dateStr > todayStr) return false;
  const [hh, mm] = time.split(":").map(Number);
  return hh < now.hh || (hh === now.hh && mm <= now.mm);
}
