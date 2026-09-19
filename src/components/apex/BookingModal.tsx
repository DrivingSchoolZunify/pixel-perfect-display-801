import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Check, ChevronLeft, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createBooking } from "@/lib/bookings.functions";
import { courses, instructors } from "./data";

type BookingContextValue = { open: () => void };

const BookingContext = createContext<BookingContextValue>({ open: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

const steps = ["Course", "Instructor", "Date & Time", "Details", "Done"];

const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

function nextDays(count: number) {
  const out: { iso: string; day: string; date: string }[] = [];
  const start = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    out.push({
      iso: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
    });
  }
  return out;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {isOpen && <BookingDialog onClose={() => setIsOpen(false)} />}
    </BookingContext.Provider>
  );
}

function BookingDialog({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState<string | null>(null);
  const [instructor, setInstructor] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitBooking = useServerFn(createBooking);

  async function handleConfirm() {
    if (!course || !instructor || !date || !time) return;
    setSubmitting(true);
    try {
      const res = await submitBooking({
        data: { course, instructor, date, time, name: name.trim(), email: email.trim(), phone: phone.trim() },
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setStep(4);
    } catch {
      toast.error("We couldn't save your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const days = useMemo(() => nextDays(8), []);
  const canContinue =
    (step === 0 && !!course) ||
    (step === 1 && !!instructor) ||
    (step === 2 && !!date && !!time) ||
    (step === 3 && name.trim() !== "" && email.trim() !== "" && phone.trim() !== "");

  const chosenDay = days.find((d) => d.iso === date);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a lesson"
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Step {Math.min(step + 1, 4)} of 4
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              {step === 4 ? "You're booked" : `Choose your ${(steps[step] ?? "").toLowerCase()}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="shrink-0 rounded-full border border-border p-2 text-ink-soft transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-brand" : "bg-border")}
            />
          ))}
        </div>

        <div className="mt-7">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {courses.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setCourse(c.name)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-colors",
                    course === c.name ? "border-brand bg-brand-soft" : "border-border hover:border-ink-soft",
                  )}
                >
                  <p className="text-sm font-bold text-ink">{c.name}</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {c.hours} · {c.transmission}
                  </p>
                  <p className="mt-2 text-sm font-bold text-brand">{c.price}</p>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {instructors.map((i) => (
                <button
                  key={i.name}
                  type="button"
                  onClick={() => setInstructor(i.name)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                    instructor === i.name
                      ? "border-brand bg-brand-soft"
                      : "border-border hover:border-ink-soft",
                  )}
                >
                  <img
                    src={i.img}
                    alt={i.name}
                    loading="lazy"
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink">{i.name}</span>
                    <span className="block truncate text-xs text-ink-soft">{i.role}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => setDate(d.iso)}
                    className={cn(
                      "rounded-2xl border px-2 py-3 text-center transition-colors",
                      date === d.iso ? "border-brand bg-brand-soft" : "border-border hover:border-ink-soft",
                    )}
                  >
                    <span className="block text-[11px] text-ink-soft">{d.day}</span>
                    <span className="block text-xs font-bold text-ink">{d.date}</span>
                  </button>
                ))}
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                Available times
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                      time === t
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border text-ink hover:border-ink-soft",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-3">
              {[
                { label: "Full name", value: name, set: setName, type: "text" },
                { label: "Email", value: email, set: setEmail, type: "email" },
                { label: "Phone", value: phone, set: setPhone, type: "tel" },
              ].map((f) => (
                <label key={f.label} className="block">
                  <span className="text-xs font-semibold text-ink-soft">{f.label}</span>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </label>
              ))}
              <div className="mt-2 rounded-2xl bg-surface p-4 text-xs text-ink-soft">
                {course} · {instructor} · {chosenDay?.date} at {time}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-4 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand">
                <Check className="h-7 w-7 text-brand-foreground" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm text-ink-soft">
                Thanks {name.split(" ")[0]} — your {course} lesson with {instructor} is held for{" "}
                <span className="font-semibold text-ink">
                  {chosenDay?.day} {chosenDay?.date} at {time}
                </span>
                . We&rsquo;ll confirm by email and text shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (step === 3) void handleConfirm();
                else setStep((s) => s + 1);
              }}
              disabled={!canContinue || submitting}
              className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
            >
              {step === 3 ? (submitting ? "Booking…" : "Confirm booking") : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
