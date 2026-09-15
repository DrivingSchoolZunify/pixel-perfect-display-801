import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const columns = [
  { title: "Courses", items: ["Apex Beginner", "Apex Intensive Pro", "Apex Defensive GT", "Refresher Lessons"] },
  { title: "Training", items: ["Highway Mastery", "Night & Weather", "Manual Conversion", "Theory Prep"] },
  { title: "Technology", items: ["SmartDrive OS", "Progress Tracking", "Dual-Control Fleet", "Route Library"] },
  { title: "Company", items: ["About Us", "Instructors", "Careers", "Newsroom"] },
  { title: "Support", items: ["Help Centre", "Pricing", "Contact Us", "Book a Lesson"] },
];

const socials = [Facebook, Instagram, Linkedin, Youtube];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" aria-hidden="true">
              <path d="M4 20 12 3l8 17-8-5.2Z" fill="currentColor" />
            </svg>
            <span className="text-base font-extrabold tracking-tight text-ink">ApexDrive</span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft">
            ApexDrive Academy trains confident, courteous drivers with certified instructors,
            dual-control cars, and modern lesson technology.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#top"
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-ink-soft transition-colors hover:text-ink"
                aria-label="Social profile"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-soft">
            hello@apexdrive.academy
            <br />
            +1 (555) 014-2280
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#courses" className="text-xs text-ink-soft transition-colors hover:text-ink">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5">
          <p className="text-xs text-ink-soft">© 2026 ApexDrive Academy. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <a key={l} href="#top" className="text-xs text-ink-soft transition-colors hover:text-ink">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
