import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  adminData,
  adminLogin,
  adminLogout,
  adminSession,
  updateBookingStatus,
  type Booking,
  type Subscriber,
} from "@/lib/admin.functions";
import { PageHero } from "@/components/apex/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | ApexDrive Academy" },
      {
        name: "description",
        content: "Internal ApexDrive dashboard for managing lesson bookings and newsletter subscribers.",
      },
      { property: "og:title", content: "Admin Dashboard | ApexDrive Academy" },
      {
        property: "og:description",
        content: "Internal ApexDrive dashboard for lesson bookings and subscribers.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const statuses = ["pending", "confirmed", "cancelled"] as const;

function AdminPage() {
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const session = useServerFn(adminSession);
  const loadData = useServerFn(adminData);
  const setStatus = useServerFn(updateBookingStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [sortAsc, setSortAsc] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await loadData();
      setBookings(data.bookings);
      setSubscribers(data.subscribers);
    } catch {
      toast.error("Couldn't load data", { description: "Check the database connection." });
    }
  }, [loadData]);

  useEffect(() => {
    void (async () => {
      const s = await session();
      setSignedIn(!!s.email);
      if (s.email) await refresh();
    })();
  }, [session, refresh]);

  const sorted = useMemo(
    () =>
      [...bookings].sort((a, b) =>
        sortAsc
          ? `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
          : `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`),
      ),
    [bookings, sortAsc],
  );

  if (signedIn === null) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center text-sm text-ink-soft">Loading…</div>
    );
  }

  if (!signedIn) {
    return (
      <div className="mx-auto w-full max-w-md px-5 py-20">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Staff only — manage bookings and newsletter subscribers.
        </p>
        <form
          className="mt-7 grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            const res = await login({ data: { email, password } });
            setBusy(false);
            if (!res.ok) {
              toast.error(res.error ?? "Sign in failed");
              return;
            }
            setSignedIn(true);
            setPassword("");
            await refresh();
          }}
        >
          <label className="block">
            <span className="text-xs font-semibold text-ink-soft">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-soft">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none focus:border-brand"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="mt-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Internal" title="Admin Dashboard">
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-ink"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={async () => {
              await logout();
              setSignedIn(false);
              setBookings([]);
              setSubscribers([]);
            }}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-background"
          >
            Sign out
          </button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            Bookings <span className="text-ink-soft">({bookings.length})</span>
          </h2>
          <button
            type="button"
            onClick={() => setSortAsc((v) => !v)}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink"
          >
            Sort by date {sortAsc ? "↑" : "↓"}
          </button>
        </div>

        <div className="mt-5 overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-[0.12em] text-ink-soft">
              <tr>
                {["Date", "Time", "Course", "Instructor", "Student", "Contact", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => (
                <tr key={b.id} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-semibold text-ink">{b.date}</td>
                  <td className="px-4 py-3 text-ink">{b.time}</td>
                  <td className="px-4 py-3 text-ink">{b.course}</td>
                  <td className="px-4 py-3 text-ink">{b.instructor}</td>
                  <td className="px-4 py-3 text-ink">{b.name}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {b.email}
                    <br />
                    {b.phone}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {statuses.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={async () => {
                            await setStatus({ data: { id: b.id, status: s } });
                            setBookings((prev) =>
                              prev.map((row) => (row.id === b.id ? { ...row, status: s } : row)),
                            );
                            toast.success(`Marked ${s}`);
                          }}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-colors",
                            b.status === s
                              ? "border-brand bg-brand text-brand-foreground"
                              : "border-border text-ink-soft hover:text-ink",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-ink-soft">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 text-xl font-extrabold tracking-tight text-ink">
          Newsletter subscribers <span className="text-ink-soft">({subscribers.length})</span>
        </h2>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-[0.12em] text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-bold">Email</th>
                <th className="px-4 py-3 font-bold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 text-ink">{s.email}</td>
                  <td className="px-4 py-3 text-ink-soft">{s.created_at}</td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-ink-soft">
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
