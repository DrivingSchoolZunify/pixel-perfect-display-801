import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, Leaf, Users, Zap } from "lucide-react";

const stats = [
  { icon: Leaf, value: "0%", title: "Carbon Emissions", note: "Eco-Hybrid Fleet" },
  { icon: Users, value: "15,000+", title: "Students Trained", note: "And Counting" },
  { icon: Zap, value: "100%", title: "Licensed Drivers", note: "Certified Instructors" },
  { icon: Globe2, value: "20+", title: "Training Zones", note: "And Growing" },
];

export function Impact() {
  return (
    <section className="bg-brand-soft py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center">
        <div className="max-w-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Our Impact</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Driving Change for a Safer Tomorrow
          </h2>
          <Link
            to="/safety"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
          >
            Our Safety Pledge
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, title, note }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto h-7 w-7 text-brand" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-4 text-4xl font-extrabold tracking-tight text-ink">{value}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
