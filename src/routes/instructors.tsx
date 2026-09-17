import { createFileRoute } from "@tanstack/react-router";
import { Languages, Star, Timer } from "lucide-react";
import { PageHero } from "@/components/apex/PageHero";
import { useBooking } from "@/components/apex/BookingModal";
import { instructors } from "@/components/apex/data";

const title = "Meet Our Instructors — ApexDrive Academy";
const description =
  "Certified ApexDrive driving instructors: experience, student ratings, languages spoken and the training each one specialises in.";

export const Route = createFileRoute("/instructors")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: InstructorsPage,
});

function InstructorsPage() {
  const { open } = useBooking();

  return (
    <>
      <PageHero eyebrow="Our team" title="Certified instructors who teach at your pace.">
        Every instructor is fully licensed, background-checked and trained in defensive coaching.
        You keep the same instructor for your whole course — and can switch any time.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((i) => (
            <article key={i.name} className="overflow-hidden rounded-3xl border border-border bg-background">
              <img
                src={i.img}
                alt={i.name}
                loading="lazy"
                width={816}
                height={816}
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-base font-extrabold tracking-tight text-ink">{i.name}</h2>
                <p className="mt-1 text-xs font-semibold text-brand">{i.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft">{i.bio}</p>

                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  <li className="flex items-center gap-2 text-xs text-ink-soft">
                    <Star className="h-3.5 w-3.5 fill-brand text-brand" aria-hidden="true" />
                    {i.rating} average student rating
                  </li>
                  <li className="flex items-center gap-2 text-xs text-ink-soft">
                    <Timer className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                    {i.years} teaching
                  </li>
                  <li className="flex items-center gap-2 text-xs text-ink-soft">
                    <Languages className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                    {i.languages}
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={open}
                  className="mt-5 w-full rounded-full border border-border py-2.5 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Book with {i.name.split(" ")[0]}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
