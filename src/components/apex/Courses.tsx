import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses } from "./data";

export function Courses() {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-5 py-16">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Our Lineup</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Built for Every Driver
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {courses.slice(0, 3).map((c) => (
          <article
            key={c.name}
            className={cn(
              "rounded-3xl border bg-background p-7",
              c.popular ? "border-brand shadow-[0_24px_60px_-40px_oklch(0.72_0.19_141)]" : "border-border",
            )}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="text-xl font-extrabold tracking-tight text-ink">{c.name}</h3>
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
              className="my-6 w-full object-contain"
            />

            <div className="grid grid-cols-3 gap-2 border-t border-border pt-5 text-center">
              {[
                [c.hours, "Lesson Time"],
                [c.transmission, "Transmission"],
                [c.extra, "Included"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-sm font-bold text-ink">{value}</p>
                  <p className="mt-0.5 text-[11px] text-ink-soft">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-bold text-ink">
                {c.price}
                <span className="ml-1 text-xs font-medium text-ink-soft">/ package</span>
              </p>
              <Link
                to="/courses"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold",
                  c.popular ? "text-brand" : "text-ink",
                )}
              >
                Learn More
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
