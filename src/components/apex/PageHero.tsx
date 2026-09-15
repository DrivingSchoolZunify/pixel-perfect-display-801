import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">{children}</div>}
      </div>
    </section>
  );
}
