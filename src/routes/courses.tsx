import { createFileRoute } from "@tanstack/react-router";
import { Clock, Cog, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/apex/PageHero";
import { useBooking } from "@/components/apex/BookingModal";
import { courses } from "@/components/apex/data";

const title = "Driving Courses & Packages — ApexDrive Academy";
const description =
  "Compare ApexDrive courses: beginner lessons, the intensive crash course, highway mastery and refresher sessions — with hours, transmission and pricing.";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { open } = useBooking();

  return (
    <>
      <PageHero eyebrow="Course catalog" title="Find the course that fits your timeline.">
        Every course runs in a dual-control car with a certified instructor, includes theory app
        access, and can be paid per lesson or as a discounted bundle.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((c) => (
            <article
              key={c.name}
              className={cn(
                "flex flex-col rounded-3xl border bg-background p-7",
                c.popular
                  ? "border-brand shadow-[0_24px_60px_-40px_oklch(0.72_0.19_141)]"
                  : "border-border",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold tracking-tight text-ink">{c.name}</h2>
                  <p className="mt-1 text-xs text-ink-soft">{c.tagline}</p>
                </div>
                {c.popular && (
                  <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground">
                    Popular
                  </span>
                )}
              </div>

              <img
                src={c.img}
                alt={`${c.name} training car`}
                loading="lazy"
                width={1024}
                height={656}
                className="my-6 w-full rounded-2xl object-cover"
              />

              <p className="text-sm leading-relaxed text-ink-soft">{c.blurb}</p>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                {[
                  { icon: Clock, value: c.hours, label: "Duration" },
                  { icon: Cog, value: c.transmission, label: "Transmission" },
                  { icon: ShieldCheck, value: c.extra, label: "Included" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="mx-auto h-4 w-4 text-brand" strokeWidth={1.8} aria-hidden="true" />
                    <p className="mt-2 text-xs font-bold text-ink">{value}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-extrabold tracking-tight text-ink">{c.price}</p>
                <button
                  type="button"
                  onClick={open}
                  className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
                >
                  Book this course
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
