import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/apex/PageHero";
import { useBooking } from "@/components/apex/BookingModal";
import { hourlyRates, packages } from "@/components/apex/data";

const title = "Transparent Lesson Pricing — ApexDrive Academy";
const description =
  "ApexDrive hourly lesson rates and discounted package bundles, with no hidden fees, free rescheduling and a pass guarantee on intensive courses.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { open } = useBooking();

  return (
    <>
      <PageHero eyebrow="Pricing" title="One clear price. No hidden fees.">
        Pay per lesson or save with a bundle. Test-day car hire is included on every package, and
        rescheduling is free up to 24 hours before your lesson.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Hourly rates</h2>
        <div className="mt-6 overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-left">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
                  Lesson
                </th>
                <th className="hidden px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft sm:table-cell">
                  Details
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {hourlyRates.map((r) => (
                <tr key={r.label + r.detail} className="border-t border-border">
                  <td className="px-6 py-4 text-sm font-semibold text-ink">
                    {r.label}
                    <span className="mt-0.5 block text-xs font-normal text-ink-soft sm:hidden">
                      {r.detail}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-ink-soft sm:table-cell">{r.detail}</td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-ink">{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-ink">Package bundles</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={cn(
                "flex flex-col rounded-3xl border p-7",
                p.popular ? "border-brand bg-brand-soft" : "border-border bg-background",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-extrabold tracking-tight text-ink">{p.name}</h3>
                {p.popular && (
                  <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground">
                    Best value
                  </span>
                )}
              </div>
              <p className="mt-4 text-4xl font-extrabold tracking-tight text-ink">{p.price}</p>
              <p className="mt-1 text-xs text-ink-soft">
                {p.hours} · {p.save}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-5">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={open}
                className={cn(
                  "mt-7 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5",
                  p.popular ? "bg-brand text-brand-foreground" : "bg-ink text-background",
                )}
              >
                Choose {p.name}
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
