import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, MonitorPlay, Sparkles, UsersRound } from "lucide-react";
import { connectDB } from "@/app/lib/db";
import Event from "@/app/Model/Event";
import { ensureStarterEvents } from "@/app/lib/event-seeds";
import EventEnquiryForm from "../enquiry-form";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";
type EventDetailProps = { params: Promise<{ slug: string }> };

async function loadEvent(slug: string) {
  try {
    await ensureStarterEvents();
    return await Event.findOne({ slug, isPublished: true }).lean();
  } catch (error) {
    console.error("[EVENT DETAIL]", error);
    return null;
  }
}

function dateLabel(value: Date | string, options: Intl.DateTimeFormatOptions) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "To be announced" : date.toLocaleDateString("en-IN", { ...options, timeZone: "Asia/Kolkata" });
}

function registrationLink(value?: string) {
  if (value && /^https?:\/\//i.test(value)) return { href: value, external: true };
  if (value?.startsWith("/")) return { href: value, external: false };
  return { href: "/contact", external: false };
}

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) return { title: "Study Event | Ooshas Prep", robots: { index: false, follow: true } };
  const title = `${event.title} | Study Events | Ooshas Prep`;
  const description = event.summary || `Join Ooshas Prep for ${event.title}.`;
  const canonical = `${SITE_URL}/events/${event.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "Ooshas Prep", type: "article", images: event.image ? [{ url: event.image, alt: event.title }] : undefined },
  };
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  const registration = registrationLink(event.registrationUrl);
  const eventDateString = dateLabel(event.startDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#292522]">
      <section className="relative isolate overflow-hidden bg-[#FFF4EF]">
        <div className="absolute right-0 top-0 h-full w-[37%] bg-[#FFF0BE]" />
        <div className="absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#FFB09D]/55" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-9 lg:px-8 lg:pb-20">
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-[#72584D] transition hover:text-[#F36D45]"><ArrowLeft size={16} /> All study events</Link>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#A5533A] shadow-sm"><Sparkles size={14} className="text-[#F36D45]" />{event.category}</span><span className="rounded-full border border-[#E8C6B7] bg-white/60 px-3.5 py-2 text-xs font-bold text-[#76574B]">{event.eventType}</span><span className="rounded-full border border-[#E8C6B7] bg-white/60 px-3.5 py-2 text-xs font-bold text-[#76574B]">{event.mode}</span></div>
              <h1 className="mt-4 max-w-2xl text-left text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{event.title}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#665C58] sm:text-lg sm:leading-8">{event.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2.5 text-sm font-semibold text-[#594B45]">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 shadow-sm"><CalendarDays size={16} className="text-[#F36D45]" />{eventDateString}</span>
                {event.startTime && <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 shadow-sm"><Clock3 size={16} className="text-[#F36D45]" />{event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}{event.timezone === "Asia/Kolkata" ? " IST" : ` ${event.timezone}`}</span>}
                {event.location && <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 shadow-sm"><MapPin size={16} className="text-[#F36D45]" />{event.location}</span>}
              </div>
              <div className="mt-6 flex flex-wrap gap-3"><a href={registration.href} target={registration.external ? "_blank" : undefined} rel={registration.external ? "noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-full bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F36D45]/20 transition hover:-translate-y-0.5 hover:bg-[#DD5D38]">Reserve your spot <ArrowRight size={17} /></a><a href="#event-details" className="inline-flex items-center gap-2 rounded-full border border-[#E8C6B7] bg-white/75 px-5 py-3.5 text-sm font-bold text-[#514943] transition hover:border-[#F36D45] hover:text-[#F36D45]">Event details <ArrowRight size={16} /></a></div>
            </div>

            <div className="relative mx-auto w-full max-w-[540px] lg:mr-0">
              <div className="absolute inset-x-[8%] bottom-[7%] top-[5%] rounded-[3rem] bg-[#FFF0BE]" />
              <div className="absolute -right-2 top-2 z-10 h-24 w-24 rounded-full bg-[#FF907F]/70 sm:-right-5 sm:h-32 sm:w-32" />
              <div className="absolute -bottom-2 left-0 z-10 h-20 w-20 rounded-full border-[12px] border-white bg-[#F36D45] sm:h-28 sm:w-28 sm:border-[16px]" />
              <div className="relative z-20 mx-auto w-[88%] overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_5rem] bg-gradient-to-br from-[#FFB09D] to-[#F36D45] shadow-[0_28px_70px_rgba(119,69,48,.22)]">
                <div className="relative aspect-[1.03/1] max-h-[470px]">
                  {event.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={event.image} alt={event.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#FFB09D] to-[#F36D45] text-white"><CalendarDays size={100} /></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211714]/65 via-transparent to-transparent" />
                  {event.isFeatured && <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#A5533A]"><Sparkles size={13} className="text-[#F36D45]" /> Featured session</span>}
                  <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7"><p className="text-xs font-extrabold uppercase tracking-[.17em] text-[#FFD7A7]">{event.category} · {event.eventType}</p><p className="mt-2 text-2xl font-black leading-tight drop-shadow sm:text-3xl">A focused session for your next goal.</p></div>
                </div>
              </div>
              <div className="absolute right-0 top-10 z-30 rounded-2xl border border-white/75 bg-white/95 px-4 py-3 shadow-xl sm:-right-1"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9C7768]">Seats</p><p className="mt-1 text-sm font-extrabold text-[#292522]">{event.capacity || "Join the session"}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="event-details" className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_340px] lg:gap-12 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.17em] text-[#F36D45]">What to expect</p><h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">A practical step toward your goal</h2>
          <div className="mt-5 max-w-3xl whitespace-pre-line text-base leading-8 text-[#655D59]">{event.description || event.summary}</div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="flex items-center gap-3 rounded-2xl bg-[#FFF4EF] p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#F36D45]"><MonitorPlay size={19} /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-[#9C7768]">Attendance</span><span className="mt-1 block font-bold">{event.mode}</span></span></div><div className="flex items-center gap-3 rounded-2xl bg-[#FFF4EF] p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#F36D45]"><UsersRound size={19} /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-[#9C7768]">Who it’s for</span><span className="mt-1 block font-bold">Students working toward {event.category}</span></span></div></div>
        </div>
        <aside className="h-fit rounded-[1.6rem] bg-[#292522] p-6 text-white shadow-lg sm:p-7"><p className="text-xs font-bold uppercase tracking-[.17em] text-[#FFB09D]">Save your seat</p><h2 className="mt-3 text-2xl font-bold leading-tight">Join us for this session.</h2><p className="mt-3 text-sm leading-6 text-white/70">Bring your questions, meet our mentors, and leave with useful next steps.</p><div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm font-medium text-white/85"><p className="flex gap-2.5"><CalendarDays size={17} className="shrink-0 text-[#FF907F]" />{eventDateString}</p>{event.startTime && <p className="flex gap-2.5"><Clock3 size={17} className="shrink-0 text-[#FF907F]" />{event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}</p>}{event.location && <p className="flex gap-2.5"><MapPin size={17} className="shrink-0 text-[#FF907F]" />{event.location}</p>}</div><a href={registration.href} target={registration.external ? "_blank" : undefined} rel={registration.external ? "noreferrer" : undefined} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F36D45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#DD5D38]">Reserve your spot <ArrowRight size={16} /></a></aside>
      </section>

      <EventEnquiryForm eventTitle={event.title} />
      <section className="mx-auto max-w-7xl px-5 py-8 text-center sm:px-8 lg:px-8"><Link href="/events" className="inline-flex items-center gap-2 text-sm font-bold text-[#D95C39] hover:text-[#A9472D]"><ArrowLeft size={16} /> Browse all study events</Link></section>
    </main>
  );
}
