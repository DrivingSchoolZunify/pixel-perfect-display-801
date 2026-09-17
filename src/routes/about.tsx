import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/apex/PageHero";
import ecoBeginner from "@/assets/eco-beginner.jpg";

const title = "About ApexDrive Academy — Our Story & Mission";
const description =
  "ApexDrive Academy's history, mission and milestones: from one instructor and one car to 15,000 trained drivers across 20 training zones.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

const milestones = [
  { year: "2011", text: "Founded with one instructor, one dual-control car and a waiting list of nine students." },
  { year: "2015", text: "Opened the Riverside Centre and introduced structured mock tests for every student." },
  { year: "2019", text: "Launched the SmartDrive app for booking, progress tracking and theory practice." },
  { year: "2022", text: "Moved to a fully hybrid fleet and added night and wet-weather training modules." },
  { year: "2026", text: "15,000 drivers trained, 20+ training zones, and a 98% first-time pass rate." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="We teach drivers, not test-passers.">
        ApexDrive started because too many new drivers passed a test and still felt unsafe in traffic.
        Fifteen years later, that's still the problem we're built to solve.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={ecoBeginner}
            alt="Instructor guiding a learner driver at the wheel"
            loading="lazy"
            width={912}
            height={1104}
            className="h-80 w-full rounded-3xl object-cover lg:h-[28rem]"
          />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Our mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              To turn out drivers who are calm, courteous and genuinely capable — on quiet streets,
              in city traffic, on the motorway, at night and in bad weather. That means patient
              instructors, honest progress feedback, and never rushing a student toward a test date
              they aren't ready for.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              We keep class sizes at one. Every lesson is one instructor, one student, one car — and
              a written record of what you covered and what comes next.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Milestones</h2>
          <ol className="mt-10 space-y-8">
            {milestones.map((m) => (
              <li key={m.year} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
                <span className="text-lg font-extrabold tracking-tight text-brand">{m.year}</span>
                <p className="border-l border-border pl-5 text-sm leading-relaxed text-ink-soft">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
