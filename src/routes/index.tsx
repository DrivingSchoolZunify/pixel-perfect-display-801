import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/apex/Header";
import { Hero } from "@/components/apex/Hero";
import { MetricsBar } from "@/components/apex/MetricsBar";
import { Ecosystem } from "@/components/apex/Ecosystem";
import { Courses } from "@/components/apex/Courses";
import { Impact } from "@/components/apex/Impact";
import { Testimonials } from "@/components/apex/Testimonials";
import { Newsletter } from "@/components/apex/Newsletter";
import { Footer } from "@/components/apex/Footer";

const title = "ApexDrive Academy — Premium Driving School";
const description =
  "Learn to drive with confidence at ApexDrive Academy: certified instructors, dual-control cars, and a 98% first-time pass rate.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MetricsBar />
        <Ecosystem />
        <Courses />
        <Impact />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
