import { useState } from "react";
import newsletterCar from "@/assets/newsletter-car.jpg";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section id="booking" className="bg-brand-soft">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
        <img
          src={newsletterCar}
          alt="ApexDrive training car parked on a bright road"
          loading="lazy"
          width={1008}
          height={704}
          className="h-56 w-full object-cover lg:h-72"
        />

        <div className="px-5 pb-12 pt-2 lg:py-12 lg:pr-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Stay Road-Ready. Stay Informed.
          </h2>
          <p className="mt-2 max-w-lg text-sm text-ink-soft">
            Lesson tips, test-route updates, and new course dates — straight to your inbox.
          </p>

          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input
              type="text"
              required
              placeholder="Your Name"
              aria-label="Your name"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-brand"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              aria-label="Your email"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-brand"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
          {sent && (
            <p className="mt-3 text-sm font-medium text-ink">
              Thanks — you&rsquo;re on the list. We&rsquo;ll be in touch soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
