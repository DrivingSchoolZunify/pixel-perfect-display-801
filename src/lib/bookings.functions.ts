import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingInput = z.object({
  course: z.string().min(1).max(120),
  instructor: z.string().min(1).max(120),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1).max(20),
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(4).max(40),
});

export type BookingResult = { ok: true } | { ok: false; error: string };

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingInput.parse(data))
  .handler(async ({ data }): Promise<BookingResult> => {
    const { getSql, ensureSchema } = await import("./db.server");
    try {
      await ensureSchema();
      const sql = getSql();
      const existing = await sql`
        SELECT 1 FROM bookings
        WHERE instructor = ${data.instructor}
          AND date = ${data.date}
          AND time = ${data.time}
          AND status <> 'cancelled'
        LIMIT 1
      `;
      if (existing.length > 0) return { ok: false, error: "This slot is already booked." };

      await sql`
        INSERT INTO bookings (course, instructor, date, time, name, email, phone)
        VALUES (${data.course}, ${data.instructor}, ${data.date}, ${data.time}, ${data.name}, ${data.email}, ${data.phone})
      `;
      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("bookings_slot_unique")) {
        return { ok: false, error: "This slot is already booked." };
      }
      console.error("createBooking failed", error);
      return { ok: false, error: "We couldn't save your booking. Please try again." };
    }
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ name: z.string().max(120).optional(), email: z.string().email().max(160) }).parse(data),
  )
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { getSql, ensureSchema } = await import("./db.server");
    try {
      await ensureSchema();
      const sql = getSql();
      await sql`
        INSERT INTO newsletter_emails (email)
        VALUES (${data.email.trim().toLowerCase()})
        ON CONFLICT (email) DO NOTHING
      `;
      return { ok: true };
    } catch (error) {
      console.error("subscribeNewsletter failed", error);
      return { ok: false };
    }
  });
