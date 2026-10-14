import { connectDB } from "@/app/lib/db";
import { Event, EventSeed } from "@/app/Model/Event";

const STARTER_EVENTS: Array<Record<string, any>> = [
  {
    title: "SAT Digital Strategy Sprint",
    slug: "sat-digital-strategy-sprint",
    summary: "Build a sharper Digital SAT game plan with focused practice, timing strategies, and a live Q&A with our test-prep mentors.",
    description: "A practical, student-friendly workshop covering the Digital SAT structure, high-impact question types, smart pacing, and a simple study plan for the weeks ahead.",
    image: "/sat-assets/sat-hero.jpg",
    category: "SAT",
    eventType: "Workshop",
    mode: "Online",
    startDate: new Date("2026-11-21T09:30:00+05:30"),
    endDate: new Date("2026-11-21T11:00:00+05:30"),
    startTime: "9:30 AM",
    endTime: "11:00 AM",
    timezone: "Asia/Kolkata",
    location: "Live online session",
    registrationUrl: "/contact?interest=SAT%20Digital%20Strategy%20Sprint",
    capacity: "Limited seats",
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "IELTS Speaking Confidence Lab",
    slug: "ielts-speaking-confidence-lab",
    summary: "Practise all three parts of the IELTS Speaking test, get live feedback, and leave with a confident plan for your next attempt.",
    description: "Join an interactive speaking practice session with guided prompts, examiner-style feedback, vocabulary coaching, and time for your questions.",
    image: "/spoken-english/students.webp",
    category: "IELTS",
    eventType: "Live class",
    mode: "Online",
    startDate: new Date("2026-12-05T16:00:00+05:30"),
    endDate: new Date("2026-12-05T17:30:00+05:30"),
    startTime: "4:00 PM",
    endTime: "5:30 PM",
    timezone: "Asia/Kolkata",
    location: "Live online session",
    registrationUrl: "/contact?interest=IELTS%20Speaking%20Confidence%20Lab",
    capacity: "Limited seats",
    isFeatured: false,
    isPublished: true,
  },
];

/** Insert the requested starter events once. The seed marker remains after edits/deletes. */
export async function ensureStarterEvents() {
  await connectDB();
  const seedKey = "study-events-starter-v1";
  if (await EventSeed.exists({ key: seedKey })) return;

  try {
    await Event.insertMany(STARTER_EVENTS.map((event) => ({ ...event })), { ordered: false });
  } catch (error: any) {
    // Another request may have seeded concurrently; duplicate slug errors are safe here.
    if (error?.code !== 11000 && !error?.writeErrors?.some((item: any) => item?.code === 11000)) throw error;
  }

  try {
    await EventSeed.create({ key: seedKey });
  } catch (error: any) {
    if (error?.code !== 11000) throw error;
  }
}
