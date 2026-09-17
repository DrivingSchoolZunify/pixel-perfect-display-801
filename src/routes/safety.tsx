import { createFileRoute } from "@tanstack/react-router";
import { Activity, BadgeCheck, Car, CloudRain, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/apex/PageHero";
import nightImg from "@/assets/eco-night.jpg";

const title = "Safety First — Dual-Control Fleet & Student Tracking | ApexDrive";
const description =
  "How ApexDrive keeps lessons safe: dual-control vehicles, 5-star rated cars, monthly servicing, defensive-driving modules and per-student progress tracking.";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SafetyPage,
});

const pillars = [
  {
    icon: Car,
    title: "Dual-control vehicles",
    body: "Every training car has an instructor brake and clutch. Your instructor can intervene in an instant, so you can try things without fear.",
  },
  {
    icon: ShieldCheck,
    title: "5-star rated fleet",
    body: "We only buy cars with the highest independent crash-test rating, fitted with autonomous emergency braking and blind-spot monitoring.",
  },
  {
    icon: Wrench,
    title: "Monthly servicing",
    body: "Brakes, tyres and mirrors are inspected every month, with a full service every 5,000 km. Any fault takes the car off the road that day.",
  },
  {
    icon: Activity,
    title: "Student progress tracking",
    body: "After each lesson your instructor logs skills covered and readiness scores, so nothing is skipped before test day.",
  },
  {
    icon: CloudRain,
    title: "Night & weather modules",
    body: "Wet roads, dusk glare and dark rural lanes are trained deliberately — not left for you to discover alone after passing.",
  },
  {
    icon: BadgeCheck,
    title: "Vetted instructors",
    body: "Full licensing, background checks and annual re-assessment for every instructor on the team.",
  },
];

function SafetyPage() {
  return (
    <>
      <PageHero eyebrow="Safety" title="Learning should never feel risky.">
        Safety isn't a feature we advertise — it's the reason our pass rate holds. Here's exactly
        what protects you in the car.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title: t, body }) => (
            <article key={t} className="rounded-3xl border border-border bg-background p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft">
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-base font-extrabold tracking-tight text-ink">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <img
            src={nightImg}
            alt="Training car on a wet road at dusk"
            loading="lazy"
            width={912}
            height={1104}
            className="h-64 w-full object-cover lg:h-96"
          />
          <div className="px-5 pb-14 pt-2 lg:py-14 lg:pr-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Our safety pledge
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              No student is ever pushed onto a road they aren't ready for. Lessons progress only when
              your instructor and your tracked skill scores agree you're prepared — and you can pause
              or repeat any stage at no extra charge.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
