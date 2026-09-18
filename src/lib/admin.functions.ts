import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Booking = {
  id: number;
  course: string;
  instructor: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
};

export type Subscriber = { id: number; email: string; created_at: string };

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ email: z.string().min(1), password: z.string().min(1) }).parse(data),
  )
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const { verifyCredentials, issueSession } = await import("./admin-auth.server");
    try {
      if (!verifyCredentials(data.email, data.password)) {
        return { ok: false, error: "Wrong email or password." };
      }
      issueSession(data.email);
      return { ok: true };
    } catch (error) {
      console.error("adminLogin failed", error);
      return { ok: false, error: "Admin login is not configured yet." };
    }
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { clearSession } = await import("./admin-auth.server");
  clearSession();
  return { ok: true };
});

export const adminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminEmail } = await import("./admin-auth.server");
  try {
    return { email: getAdminEmail() };
  } catch {
    return { email: null };
  }
});

export const adminData = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ bookings: Booking[]; subscribers: Subscriber[] }> => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { getSql, ensureSchema } = await import("./db.server");
    requireAdmin();
    await ensureSchema();
    const sql = getSql();
    const bookings = (await sql`
      SELECT id, course, instructor, to_char(date, 'YYYY-MM-DD') AS date, time, name, email, phone, status,
             to_char(created_at, 'YYYY-MM-DD HH24:MI') AS created_at
      FROM bookings ORDER BY date DESC, time DESC
    `) as unknown as Booking[];
    const subscribers = (await sql`
      SELECT id, email, to_char(created_at, 'YYYY-MM-DD HH24:MI') AS created_at
      FROM newsletter_emails ORDER BY created_at DESC
    `) as unknown as Subscriber[];
    return { bookings, subscribers };
  },
);

export const updateBookingStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({ id: z.number(), status: z.enum(["pending", "confirmed", "cancelled"]) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { getSql, ensureSchema } = await import("./db.server");
    requireAdmin();
    await ensureSchema();
    const sql = getSql();
    await sql`UPDATE bookings SET status = ${data.status} WHERE id = ${data.id}`;
    return { ok: true };
  });
