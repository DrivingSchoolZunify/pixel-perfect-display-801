import { Star } from "lucide-react";
import s1 from "@/assets/student-1.jpg";
import s2 from "@/assets/student-2.jpg";
import s3 from "@/assets/student-3.jpg";

const reviews = [
  {
    quote:
      "I was terrified of roundabouts. Six lessons later I passed first time — my instructor never once made me feel rushed.",
    name: "Alex P.",
    img: s1,
  },
  {
    quote:
      "The app made everything easy: booking, tracking progress, seeing what to practise next. It felt genuinely modern.",
    name: "Sofia K.",
    img: s2,
  },
  {
    quote:
      "The defensive course changed how I drive. Night and wet-weather sessions are worth every minute on the road.",
    name: "Daniel R.",
    img: s3,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          What Students Say
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Real Stories. Real Students.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="rounded-3xl border border-border bg-background p-7">
            <span className="text-4xl font-extrabold leading-none text-brand" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">{r.quote}</blockquote>
            <figcaption className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">{r.name}</p>
                <div className="mt-1.5 flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brand text-brand" aria-hidden="true" />
                  ))}
                </div>
              </div>
              <img
                src={r.img}
                alt={r.name}
                loading="lazy"
                width={816}
                height={816}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
