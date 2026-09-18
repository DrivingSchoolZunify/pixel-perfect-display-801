import { neon } from "@neondatabase/serverless";

/** Neon SQL client. DATABASE_URL must be read at call time, not module scope. */
export function getSql() {
  const url = process.env["DATABASE_URL"];
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

let schemaReady: Promise<void> | undefined;

/** Idempotent schema creation — safe to call on every request. */
export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id BIGSERIAL PRIMARY KEY,
          course TEXT NOT NULL,
          instructor TEXT NOT NULL,
          date DATE NOT NULL,
          time TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS bookings_slot_unique
        ON bookings (instructor, date, time)
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS newsletter_emails (
          id BIGSERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })().catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  return schemaReady;
}
