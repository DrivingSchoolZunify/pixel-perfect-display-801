import { ArrowRight, Play } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-28 pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pb-36 lg:pt-20">
        <div className="max-w-xl">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
            Drive with Confidence.
            <br />
            <span className="text-brand">Today.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            ApexDrive Academy blends patient, certified coaching with smart driving technique — a
            modern way to learn that keeps stress at zero and standards high.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              Book a Lesson
            </a>
          </div>
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background">
              <Play className="h-3 w-3 fill-current" aria-hidden="true" />
            </span>
            Watch Full Video
          </button>
        </div>

        <div className="relative">
          <img
            src={heroCar}
            alt="ApexDrive Academy dual-control training car in a bright studio"
            width={1408}
            height={1008}
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
