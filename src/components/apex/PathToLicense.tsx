import { BookOpen, Car, Trophy } from "lucide-react";
import { useBooking } from "./BookingModal";

const steps = [
  {
    icon: BookOpen,
    step: "01",
    title: "Theory & Permit Prep",
    body: "Guided study, mock theory quizzes and hazard-perception drills until you clear the written test and hold your learner's permit.",
  },
  {
    icon: Car,
    step: "02",
    title: "Dual-Control Practical Training",
    body: "Hours behind the wheel of a dual-control car with a certified instructor, progressing from quiet streets to city traffic and highways.",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Mock Test & Pass Guarantee",
    body: "A full examiner-style mock test with a written report. On intensive packages, we cover your re-test if you don't pass first time.",
  },
];

export function PathToLicense() {
  const { open } = useBooking();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">How it works</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          Your Path to a Full License
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Three clear stages, one instructor who knows your progress the whole way through.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, step, title, body }) => (
          <article key={step} className="rounded-3xl border border-border bg-surface p-7">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand">
                <Icon className="h-5 w-5 text-brand-foreground" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-border">{step}</span>
            </div>
            <h3 className="mt-6 text-lg font-extrabold tracking-tight text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={open}
        className="mt-10 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
      >
        Start with a first lesson
      </button>
    </section>
  );
}
