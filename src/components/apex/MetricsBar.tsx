import { Award, BadgeCheck, Car, ShieldCheck, Smartphone } from "lucide-react";

const metrics = [
  { icon: Award, title: "98% Pass Rate", note: "Certified Results" },
  { icon: BadgeCheck, title: "100% Certified", note: "Expert Instructors" },
  { icon: Car, title: "Dual-Control Cars", note: "Top Safety Rating" },
  { icon: Smartphone, title: "SmartDrive OS", note: "Booking & Tracking" },
  { icon: ShieldCheck, title: "5-Star Safety", note: "Defensive Training" },
];

export function MetricsBar() {
  return (
    <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-5">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-[0_20px_60px_-30px_oklch(0.22_0.008_260/0.35)] sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map(({ icon: Icon, title, note }) => (
          <div key={title} className="flex items-center gap-3 bg-background px-6 py-6">
            <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{title}</p>
              <p className="truncate text-xs text-ink-soft">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
