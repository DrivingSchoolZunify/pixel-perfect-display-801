import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/apex/Hero";
import { MetricsBar } from "@/components/apex/MetricsBar";
import { PathToLicense } from "@/components/apex/PathToLicense";
import { Courses } from "@/components/apex/Courses";
import { Impact } from "@/components/apex/Impact";
import { Testimonials } from "@/components/apex/Testimonials";
import { Newsletter } from "@/components/apex/Newsletter";

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
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <PathToLicense />
      <Courses />
      <Impact />
      <Testimonials />
      <Newsletter />
    </>
  );
}
