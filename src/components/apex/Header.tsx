import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useBooking } from "./BookingModal";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Instructors", to: "/instructors" },
  { label: "Pricing", to: "/pricing" },
  { label: "Safety", to: "/safety" },
  { label: "About Us", to: "/about" },
  { label: "Support", to: "/support" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-brand" aria-hidden="true">
        <path d="M4 20 12 3l8 17-8-5.2Z" fill="currentColor" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight text-ink">
        Apex<span className="font-semibold text-ink-soft">Drive</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { open: openBooking } = useBooking();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:grid-cols-[auto_1fr_auto]">
        <Logo />

        <nav className="hidden justify-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-ink" }}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
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
          <button
            type="button"
            onClick={openBooking}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Book a Lesson
          </button>
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
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-ink" }}
              className="block py-2.5 text-sm font-medium text-ink-soft"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
