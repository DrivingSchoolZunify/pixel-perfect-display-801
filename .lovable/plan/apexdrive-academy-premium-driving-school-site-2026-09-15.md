# ApexDrive Academy — premium driving school site

A single-page marketing site for "ApexDrive Academy", laid out and styled after the reference image: crisp white, soft off-white section bands, dark charcoal type, vibrant spring-green accent.

## Page sections (top to bottom)

1. **Header** — "ApexDrive" logo with a clean mark, centre links (Courses, Instructors, Pricing, Safety, About Us, Support), globe/language selector, green "Book a Lesson" button. Collapses to a mobile menu.
2. **Hero** — oversized headline "Drive with Confidence." / "Today." (second line in green), supporting sentence, "Explore Courses" (solid) + "Book a Lesson" (outlined), and a large training-car image on the right against a light studio backdrop.
3. **Metrics bar** — floating white card overlapping the hero with 5 items: 98% Pass Rate, 100% Certified Instructors, Dual-Control Cars, SmartDrive OS, 5-Star Safety Rating. Each with a small icon and caption.
4. **A Smarter Learning Ecosystem** — left text column with small green eyebrow, heading, paragraph and a green "Explore Courses" button; right side three rounded image cards: Beginner Training, Highway Mastery, Night & Weather Sim.
5. **Built for Every Driver** — three course cards (Apex Beginner, Apex Intensive Pro with a "Popular" badge and highlighted border, Apex Defensive GT). Each shows tagline, image, three specs (hours, transmission, pass guarantee) and a "Learn More" link.
6. **Driving Change for a Safer Tomorrow** — pale green band, heading plus button on the left, four large stat counters: 0% Carbon, 15,000+ Students Trained, 100% Licensed Drivers, 20+ Training Zones.
7. **Real Stories. Real Students.** — three testimonial cards with quote mark, review text, name, avatar and five green stars.
8. **Newsletter** — green band with a car image bleeding off the left edge, "Stay Road-Ready. Stay Informed.", Name + Email inputs and a dark "Subscribe" button. Submitting shows a confirmation message only (no email is stored yet).
9. **Footer** — logo and blurb with social icons, plus five link columns (Courses, Training, Technology, Company, Support) and a bottom bar with copyright and legal links.

## Images

Generated to match the reference's clean, bright automotive look: hero training car, three ecosystem images, three course-car images, one charging-style car for the newsletter band, and three student portraits.

## Technical notes

- Single route at `/` (replacing the placeholder), built as section components under `src/components/`.
- Design tokens (green accent, off-white surfaces, charcoal text, radii, fonts) added to `src/styles.css`; no hardcoded colour utilities.
- Typography: a modern geometric sans loaded via a `<link>` in the root route head.
- Page title, description and social tags set in the route's `head()`.
- Content is placeholder marketing copy — pass rates, student counts, testimonials and contact details are invented and should be replaced with real figures before publishing.
