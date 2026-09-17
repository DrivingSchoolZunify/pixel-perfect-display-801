import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/apex/PageHero";
import { faqs, locations } from "@/components/apex/data";

const title = "Support & Contact — ApexDrive Academy";
const description =
  "Get help from ApexDrive Academy: frequently asked questions, our contact form, office locations, and direct phone or WhatsApp support.";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero eyebrow="Support" title="Questions? We answer fast.">
        Most answers are below. If yours isn&rsquo;t, message us and a real person replies within one
        working hour.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 sm:py-20">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Frequently asked</h2>
          <div className="mt-6 divide-y divide-border rounded-3xl border border-border">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-ink">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-ink-soft transition-transform",
                      openFaq === i && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                )}
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-ink">Direct support</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Phone, label: "Call us", value: "+1 (555) 014-2280", href: "tel:+15550142280" },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Chat with support",
                href: "https://wa.me/15550142280",
              },
              {
                icon: Mail,
                label: "Email",
                value: "hello@apexdrive.academy",
                href: "mailto:hello@apexdrive.academy",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="rounded-2xl border border-border p-5 transition-colors hover:border-brand"
              >
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Send a message</h2>
          <ContactForm />

          <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-ink">Our locations</h2>
          <ul className="mt-6 space-y-3">
            {locations.map((l) => (
              <li key={l.city} className="flex gap-4 rounded-2xl border border-border p-5">
                <MapPin className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{l.city}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{l.address}</p>
                  <p className="mt-1 text-xs font-semibold text-brand">{l.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 overflow-hidden rounded-3xl border border-border">
            <iframe
              title="ApexDrive Academy locations map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.16%2C51.48%2C-0.05%2C51.53&layer=mapnik"
              loading="lazy"
              className="h-64 w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-6 grid gap-3 rounded-3xl border border-border p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setValues({ name: "", email: "", message: "" });
        toast.success("Message sent", {
          description: "A support advisor will reply within one working hour.",
        });
      }}
    >
      <label className="block">
        <span className="text-xs font-semibold text-ink-soft">Your name</span>
        <input
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="text-xs font-semibold text-ink-soft">Email</span>
        <input
          required
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="text-xs font-semibold text-ink-soft">How can we help?</span>
        <textarea
          required
          rows={4}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="mt-1.5 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none focus:border-brand"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
      >
        Send message
      </button>
      {sent && (
        <p className="text-xs font-medium text-brand">
          Thanks — your message is with our support team.
        </p>
      )}
    </form>
  );
}
