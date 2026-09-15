import { ArrowRight } from "lucide-react";
import beginner from "@/assets/eco-beginner.jpg";
import app from "@/assets/eco-app.jpg";
import night from "@/assets/eco-night.jpg";

const cards = [
  {
    img: beginner,
    title: "Beginner Training",
    note: "Calm, Patient, Structured.",
    alt: "Instructor guiding a learner driver at the wheel",
  },
  {
    img: app,
    title: "SmartDrive App",
    note: "Book, track, and review lessons.",
    alt: "Phone showing the SmartDrive lesson booking app",
  },
  {
    img: night,
    title: "Night & Weather Sim",
    note: "Ready for any conditions.",
    alt: "Training car on a wet highway at dusk",
  },
];

export function Ecosystem() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)]">
        <div className="max-w-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Learn anywhere</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            A Smarter Learning Ecosystem
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Every ApexDrive student gets structured lessons, live progress tracking, and highway and
            night-driving practice built into the same programme.
          </p>
          <a
            href="#courses"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore Courses
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <figure key={c.title} className="overflow-hidden rounded-3xl bg-surface">
              <img
                src={c.img}
                alt={c.alt}
                loading="lazy"
                width={912}
                height={1104}
                className="h-64 w-full object-cover"
              />
              <figcaption className="px-5 py-5">
                <p className="text-sm font-bold text-ink">{c.title}</p>
                <p className="mt-1 text-xs text-ink-soft">{c.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
