-- ApexDrive Academy — Neon Postgres schema
-- Applied automatically by ensureSchema() in src/lib/db.server.ts,
-- kept here so it can also be run manually against DATABASE_URL.

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
);

CREATE UNIQUE INDEX IF NOT EXISTS bookings_slot_unique
  ON bookings (instructor, date, time);

CREATE TABLE IF NOT EXISTS newsletter_emails (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
