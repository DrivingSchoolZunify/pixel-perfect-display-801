import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";

const links = ["Courses", "Instructors", "Pricing", "Safety", "About Us", "Support"];

function Logo() {
  return (
    <a href="#top" className="flex shrink-0 items-center gap-2">
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-brand" aria-hidden="true">
        <path d="M4 20 12 3l8 17-8-5.2Z" fill="currentColor" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight text-ink">
        Apex<span className="text-ink-soft font-semibold">Drive</span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:grid-cols-[auto_1fr_auto]">
        <Logo />

        <nav className="hidden justify-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#courses"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="hidden items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:flex"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            EN
          </button>
          <a
            href="#booking"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Book a Lesson
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-ink lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-5 pt-3 lg:hidden">
          {links.map((l) => (
            <a
              key={l}
              href="#courses"
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-ink-soft"
            >
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
