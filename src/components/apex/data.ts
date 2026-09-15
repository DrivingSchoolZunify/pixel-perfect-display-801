import beginnerCar from "@/assets/course-beginner.jpg";
import intensiveCar from "@/assets/course-intensive.jpg";
import defensiveCar from "@/assets/course-defensive.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";

export type Course = {
  name: string;
  tagline: string;
  img: string;
  price: string;
  hours: string;
  transmission: string;
  extra: string;
  popular?: boolean;
  blurb: string;
};

export const courses: Course[] = [
  {
    name: "Apex Beginner",
    tagline: "Calm. Simple. Confident.",
    img: beginnerCar,
    price: "$420",
    hours: "10 hrs",
    transmission: "Automatic",
    extra: "Theory Included",
    blurb:
      "Your first time behind the wheel, handled gently. Cockpit drill, clutch control, quiet residential routes, then your first roundabouts.",
  },
  {
    name: "Apex Intensive Crash Course",
    tagline: "Fast-tracked. Test ready.",
    img: intensiveCar,
    price: "$890",
    hours: "24 hrs",
    transmission: "Auto / Manual",
    extra: "Pass Guarantee",
    popular: true,
    blurb:
      "Licence-ready in two weeks. Daily two-hour blocks, mock tests from day five, and a free re-test if you don't pass first time.",
  },
  {
    name: "Apex Highway Mastery",
    tagline: "Advanced. Road-hardened.",
    img: defensiveCar,
    price: "$640",
    hours: "16 hrs",
    transmission: "Manual",
    extra: "Night & Weather",
    blurb:
      "Motorway joining and lane discipline, heavy rain, dusk glare and night driving — the skills the test doesn't cover but the road demands.",
  },
  {
    name: "Apex Refresher Sessions",
    tagline: "Back in the seat.",
    img: beginnerCar,
    price: "$65 / hr",
    hours: "Flexible",
    transmission: "Auto / Manual",
    extra: "No Minimum",
    blurb:
      "Licensed but rusty? Book single hours to rebuild confidence — parking, city traffic, or a new car you're not used to yet.",
  },
];

export type Instructor = {
  name: string;
  img: string;
  role: string;
  years: string;
  rating: string;
  languages: string;
  bio: string;
};

export const instructors: Instructor[] = [
  {
    name: "Marcus Hale",
    img: instructor1,
    role: "Lead Instructor — Manual",
    years: "18 years",
    rating: "4.9",
    languages: "English, German",
    bio: "Former advanced-driving examiner. Specialises in nervous first-timers and manual clutch control.",
  },
  {
    name: "Elena Voss",
    img: instructor2,
    role: "Intensive Course Specialist",
    years: "11 years",
    rating: "5.0",
    languages: "English, Spanish",
    bio: "Runs our two-week crash courses. Structured, direct, and relentless about mock-test practice.",
  },
  {
    name: "Rashid Karim",
    img: instructor3,
    role: "Highway & Night Training",
    years: "22 years",
    rating: "4.9",
    languages: "English, Urdu, Arabic",
    bio: "Twenty years of motorway coaching. Calm in heavy traffic and famously patient on lane changes.",
  },
  {
    name: "Naomi Adeyemi",
    img: instructor4,
    role: "Beginner & Refresher",
    years: "8 years",
    rating: "5.0",
    languages: "English, French",
    bio: "Teaches from the ground up with a gentle pace. Most requested instructor for anxious learners.",
  },
];

export const hourlyRates = [
  { label: "Single lesson", detail: "60 minutes, automatic", price: "$58" },
  { label: "Single lesson", detail: "60 minutes, manual", price: "$65" },
  { label: "Double lesson", detail: "120 minutes, any car", price: "$112" },
  { label: "Mock test", detail: "90 minutes + written report", price: "$95" },
];

export const packages = [
  {
    name: "Starter 10",
    hours: "10 hours",
    price: "$420",
    save: "Save $160",
    perks: ["Theory app access", "Progress tracking", "Automatic or manual"],
  },
  {
    name: "Intensive 24",
    hours: "24 hours",
    price: "$890",
    save: "Save $670",
    perks: ["Two mock tests", "Pass guarantee", "Test-day car included", "Priority scheduling"],
    popular: true,
  },
  {
    name: "Mastery 16",
    hours: "16 hours",
    price: "$640",
    save: "Save $400",
    perks: ["Highway & night modules", "Wet-weather session", "Written skills report"],
  },
];

export const faqs = [
  {
    q: "Do I need my learner's permit before booking?",
    a: "For practical lessons, yes. If you don't have it yet, start with our theory and permit prep module — we'll walk you through the application and test.",
  },
  {
    q: "Automatic or manual — which should I learn in?",
    a: "A manual licence lets you drive both. If you only ever plan to drive automatics, learning in one is usually faster and slightly cheaper.",
  },
  {
    q: "How does the pass guarantee work?",
    a: "On the Intensive 24 package, if you don't pass first time we cover your re-test fee and give you two further hours of preparation at no charge.",
  },
  {
    q: "Can I change instructors?",
    a: "Any time, no questions asked. Fit matters more than schedules — tell support and we'll rebook you.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Free changes up to 24 hours before a lesson. Inside 24 hours, half the lesson fee applies unless it's a medical or weather cancellation.",
  },
];

export const locations = [
  { city: "Riverside Centre", address: "18 Ashford Way, Riverside", note: "Main test-route hub" },
  { city: "Northgate", address: "402 Northgate Road", note: "Evening lessons available" },
  { city: "Harbour Quarter", address: "7 Dock Street, Harbour Quarter", note: "Highway training base" },
];
