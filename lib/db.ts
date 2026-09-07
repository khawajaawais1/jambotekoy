import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __jambotekSql: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.local.example to .env.local and add a Postgres connection string (e.g. from https://vercel.com/storage/postgres or https://neon.tech)."
    );
  }
  return postgres(url, { ssl: "require" });
}

// Reuse the connection across hot-reloads in dev instead of opening a new
// pool on every module reload.
export const sql = global.__jambotekSql ?? createClient();
if (process.env.NODE_ENV !== "production") global.__jambotekSql = sql;

let schemaReady: Promise<void> | null = null;

/** Idempotent — safe to call on every request; only runs the DDL once per server instance. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        slot_date DATE NOT NULL,
        slot_time TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        vehicle TEXT,
        reason TEXT NOT NULL,
        notes TEXT,
        locale TEXT NOT NULL DEFAULT 'fi',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (slot_date, slot_time)
      )
    `.then(() => {});
  }
  return schemaReady;
}

export type Booking = {
  id: number;
  slot_date: string;
  slot_time: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string | null;
  reason: string;
  notes: string | null;
  locale: string;
  created_at: string;
};
