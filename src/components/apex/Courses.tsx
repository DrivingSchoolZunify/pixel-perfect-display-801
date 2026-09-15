import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import beginnerCar from "@/assets/course-beginner.jpg";
import intensiveCar from "@/assets/course-intensive.jpg";
import defensiveCar from "@/assets/course-defensive.jpg";

const courses = [
  {
    name: "Apex Beginner",
    tagline: "Calm. Simple. Confident.",
    img: beginnerCar,
    price: "$420",
    specs: [
      ["10 hrs", "Lesson Time"],
      ["Automatic", "Transmission"],
      ["Theory", "Included"],
    ],
    popular: false,
  },
  {
    name: "Apex Intensive Pro",
    tagline: "Fast-tracked. Test ready.",
    img: intensiveCar,
    price: "$890",
    specs: [
      ["24 hrs", "Lesson Time"],
      ["Auto / Manual", "Transmission"],
      ["Pass", "Guarantee"],
    ],
    popular: true,
  },
  {
    name: "Apex Defensive GT",
    tagline: "Advanced. Road-hardened.",
    img: defensiveCar,
    price: "$640",
    specs: [
      ["16 hrs", "Lesson Time"],
      ["Manual", "Transmission"],
      ["Skid & Night", "Training"],
    ],
    popular: false,
  },
];

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
        {courses.map((c) => (
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
              {c.specs.map(([value, label]) => (
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
              <a
                href="#booking"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold",
                  c.popular ? "text-brand" : "text-ink",
                )}
              >
                Learn More
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
