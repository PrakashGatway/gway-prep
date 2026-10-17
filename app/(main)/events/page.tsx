import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CalendarRange,
  Clock3,
  MapPin,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { connectDB } from "@/app/lib/db";
import { ensureStarterEvents } from "@/app/lib/event-seeds";
import Event from "@/app/Model/Event";
import { getPageInfo, getPages } from "@/app/services/api";
import RecentBlogsSlider from "./recent-blogs-slider";
import EventEnquiryForm from "./enquiry-form";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";
const PAGE_SIZE = 9;

type EventsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    mode?: string;
    type?: string;
    time?: string;
  }>;
};

type AnyRecord = Record<string, any>;

type PageSection = {
  name?: string;
  fields?: AnyRecord | Array<{ name: string; value?: unknown }>;
  [key: string]: any;
};

export const metadata: Metadata = {
  title: "Study Events & Workshops | Ooshas Prep",
  description:
    "Join Ooshas Prep workshops, webinars, mock tests, and live learning sessions for your next academic goal.",
  alternates: { canonical: `${SITE_URL}/events` },
  openGraph: {
    title: "Study Events & Workshops | Ooshas Prep",
    description:
      "Find an upcoming study event and take your next step with expert mentors.",
    url: `${SITE_URL}/events`,
    siteName: "Ooshas Prep",
    type: "website",
  },
};

function formatDate(value: Date | string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date to be announced"
    : date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
}

function formatMonth(value: Date | string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? { month: "TBA", day: "—" }
    : {
        month: date
          .toLocaleDateString("en-IN", {
            month: "short",
            timeZone: "Asia/Kolkata",
          })
          .toUpperCase(),
        day: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          timeZone: "Asia/Kolkata",
        }),
      };
}

function queryLink(params: Record<string, string>, page: number) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  if (page > 1) search.set("page", String(page));
  return `/events${search.size ? `?${search.toString()}` : ""}`;
}

function readField(fields: PageSection["fields"], fieldName: string): any {
  if (!fields) return undefined;

  if (Array.isArray(fields)) {
    return fields.find((field) => field?.name === fieldName)?.value;
  }

  return fields[fieldName];
}

function getSection(
  page: AnyRecord | null,
  sectionName: string,
): PageSection | null {
  const sections = page?.sections;
  if (!sections) return null;

  if (Array.isArray(sections)) {
    return (
      sections.find(
        (section: PageSection) =>
          section?.name === sectionName ||
          section?.sectionName === sectionName ||
          section?.slug === sectionName,
      ) || null
    );
  }

  if (typeof sections === "object") {
    const section = sections[sectionName];
    if (!section) return null;

    return {
      name: sectionName,
      ...section,
      fields: section.fields ?? section,
    };
  }

  return null;
}

function getText(
  page: AnyRecord | null,
  sectionName: string,
  fieldName: string,
  fallback = "",
): string {
  const value = readField(
    getSection(page, sectionName)?.fields,
    fieldName,
  );

  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

async function loadEventsPage(): Promise<AnyRecord | null> {
  try {
    const response = await getPageInfo("events");
    const page = response?.data?.data ?? response?.data ?? response;

    if (page && (page.sections || page.seoMeta || page.template)) {
      return page;
    }
  } catch {
    // Try the page list as a fallback.
  }

  try {
    const response = await getPages(300);
    const pages = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response)
          ? response
          : [];

    return (
      pages.find((item: AnyRecord) => {
        const slug = String(
          item?.seoMeta?.slug || item?.slug || item?.pageSlug || "",
        )
          .trim()
          .toLowerCase()
          .replace(/^\/+|\/+$/g, "");

        return slug === "events";
      }) || null
    );
  } catch {
    return null;
  }
}

export default async function EventsPage({
  searchParams,
}: EventsPageProps) {
  const params = await searchParams;

  const filters = {
    search: params.search?.trim() || "",
    category: params.category?.trim() || "",
    mode: params.mode?.trim() || "",
    type: params.type?.trim() || "",
    time: params.time === "past" ? "past" : "upcoming",
  };

  const requestedPage = Math.max(1, Number(params.page) || 1);

  let events: AnyRecord[] = [];
  let categories: string[] = [];
  let eventTypes: string[] = [];
  let total = 0;

  try {
    await ensureStarterEvents();

    const query: Record<string, any> = { isPublished: true };
    if (filters.category) query.category = filters.category;
    if (filters.mode) query.mode = filters.mode;
    if (filters.type) query.eventType = filters.type;

    query.startDate =
      filters.time === "past"
        ? { $lt: new Date() }
        : { $gte: new Date() };

    if (filters.search) {
      const escaped = filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      query.$or = [
        { title: regex },
        { summary: regex },
        { description: regex },
        { category: regex },
        { eventType: regex },
        { location: regex },
      ];
    }

    await connectDB();

    const [count, categoryOptions, typeOptions] = await Promise.all([
      Event.countDocuments(query),
      Event.distinct("category", { isPublished: true }),
      Event.distinct("eventType", { isPublished: true }),
    ]);

    total = count;
    categories = categoryOptions.filter(Boolean).sort();
    eventTypes = typeOptions.filter(Boolean).sort();

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);

    events = await Event.find(query)
      .sort({
        isFeatured: -1,
        startDate: filters.time === "past" ? -1 : 1,
      })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
  } catch (error) {
    console.error("[EVENT PAGE]", error);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);

  // CMS page content. Each field falls back to the existing page copy.
  const pageData = await loadEventsPage();

  const heroSection = "events-hero-section";
  const blogsSection = "events-blogs-section";
  const calendarSection = "events-learning-calendar-section";
  const ctaSection = "events-cta-section";

  const heroTitle = getText(
    pageData,
    heroSection,
    "title",
    "Make your next big step a shared one.",
  );
  const heroSubtitle = getText(
    pageData,
    heroSection,
    "subtitle",
    "Explore workshops, webinars, mock tests, and live sessions designed around the goals you’re working toward.",
  );
  const heroImage = getText(
    pageData,
    heroSection,
    "heroImage",
    "/spoken-english/students.webp",
  );
  const heroImageAlt = getText(
    pageData,
    heroSection,
    "imageAlt",
    "Students learning together at a study event",
  );
  const heroButtonText = getText(
    pageData,
    heroSection,
    "buttonText",
    "Explore Events",
  );
  const heroButtonUrl = getText(pageData, heroSection, "buttonUrl", "#events-list");

  const blogsHeading = getText(
    pageData,
    blogsSection,
    "heading",
    "Helpful reads for your learning journey",
  );
  const blogsSubtitle = getText(
    pageData,
    blogsSection,
    "subtitle",
    "Explore practical tips, preparation advice, and updates to help you take your next step.",
  );

  const calendarHeading = getText(
    pageData,
    calendarSection,
    "heading",
    "Upcoming study events",
  );
  const calendarSubtitle = getText(
    pageData,
    calendarSection,
    "subtitle",
    "Pick a session that fits your goal and meet other students on the same journey.",
  );
  const calendarImage = getText(
    pageData,
    calendarSection,
    "calendarImage",
    "",
  );
  const calendarImageAlt = getText(
    pageData,
    calendarSection,
    "imageAlt",
    "Learning calendar",
  );

  const ctaLeftHeading = getText(
    pageData,
    ctaSection,
    "leftHeading",
    "Have a learning goal in mind?",
  );
  const ctaLeftSubtitle = getText(
    pageData,
    ctaSection,
    "leftSubtitle",
    "Talk to our team and find an event or learning session that fits your goals.",
  );
  const ctaLeftImage = getText(
    pageData,
    ctaSection,
    "leftImage",
    "/spoken-english/students.webp",
  );
  const ctaLeftImageAlt = getText(
    pageData,
    ctaSection,
    "leftImageAlt",
    "Students preparing and learning together",
  );
  const ctaButtonText = getText(
    pageData,
    ctaSection,
    "buttonText",
    "Talk to our team",
  );
  const ctaButtonUrl = getText(
    pageData,
    ctaSection,
    "buttonUrl",
    "/contact",
  );

  return (
    <main className="min-h-screen bg-white text-[#292522]">
      <section className="relative overflow-hidden bg-[#FFF4EF]">
        <div className="pointer-events-none absolute -right-20 -top-36 h-[360px] w-[360px] rounded-full bg-[#FFB09D]/45 blur-sm" />
        <div className="pointer-events-none absolute -bottom-40 left-[34%] h-[360px] w-[360px] rounded-full bg-[#FFF0BE]/80" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_.9fr] lg:gap-12 lg:px-8 lg:py-16">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F3C7B7] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#A5533A]">
              <Sparkles size={15} className="text-[#F36D45]" />
              Learn live. Grow together.
            </span>

            <h1 className="mt-5 max-w-2xl text-left text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#665C58] sm:text-lg sm:leading-8">
              {heroSubtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[#594B45]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5">
                <UsersRound size={16} className="text-[#F36D45]" />
                Learn with mentors
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5">
                <CalendarRange size={16} className="text-[#F36D45]" />
                Practical study sessions
              </span>
            </div>

            <Link
              href={heroButtonUrl}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(243,109,69,.24)] transition hover:-translate-y-0.5 hover:bg-[#DD5D38] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F36D45]/25"
            >
              {heroButtonText} <CalendarDays size={17} />
            </Link>
          </div>

          <div className="relative mx-auto h-[230px] w-full max-w-[520px] sm:h-[300px] lg:h-[330px]">
            <div className="absolute inset-x-[8%] bottom-[4%] top-[7%] rounded-[2.5rem] bg-[#FFF0BE]" />
            <div className="absolute right-[7%] top-[5%] h-20 w-20 rounded-full bg-[#FF907F] sm:h-28 sm:w-28" />

            {heroImage ? (
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-contain object-bottom drop-shadow-[0_22px_24px_rgba(71,40,29,.16)]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#F36D45]">
                <UsersRound size={100} />
              </div>
            )}

            <div className="absolute bottom-3 left-0 rounded-2xl bg-[#292522] px-4 py-3 text-white shadow-xl sm:bottom-4 sm:left-3 sm:px-5">
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#FFB09D]">
                Small sessions
              </p>
              <p className="mt-1 text-sm font-bold">Big momentum</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="events-list"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-9 sm:px-8 sm:py-12 lg:px-8"
      >
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.17em] text-[#F36D45]">
              The learning calendar
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {filters.time === "past" ? "Past events" : calendarHeading}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756A65]">
              {calendarSubtitle}
            </p>
          </div>

          {calendarImage && (
            <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl bg-[#FFF0BE] sm:h-28 sm:w-44">
              <Image
                src={calendarImage}
                alt={calendarImageAlt}
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <form
          action="/events"
          method="get"
          className="mb-7 grid gap-3 rounded-2xl border border-[#F0E3DD] bg-[#FFFBF9] p-4 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="relative block lg:col-span-1">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#76665F]">
              Search
            </span>
            <Search
              size={17}
              className="absolute left-3.5 top-[42px] text-[#B09B90]"
            />
            <input
              name="search"
              defaultValue={filters.search}
              placeholder="Search sessions or subjects"
              className="h-11 w-full rounded-xl border border-[#E8DAD2] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#F36D45]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#76665F]">
              Subject
            </span>
            <select
              name="category"
              defaultValue={filters.category}
              className="h-11 w-full rounded-xl border border-[#E8DAD2] bg-white px-3 text-sm outline-none focus:border-[#F36D45]"
            >
              <option value="">All subjects</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#76665F]">
              Event format
            </span>
            <select
              name="type"
              defaultValue={filters.type}
              className="h-11 w-full rounded-xl border border-[#E8DAD2] bg-white px-3 text-sm outline-none focus:border-[#F36D45]"
            >
              <option value="">All event types</option>
              {eventTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#76665F]">
              Attendance
            </span>
            <select
              name="mode"
              defaultValue={filters.mode}
              className="h-11 w-full rounded-xl border border-[#E8DAD2] bg-white px-3 text-sm outline-none focus:border-[#F36D45]"
            >
              <option value="">Any format</option>
              <option>Online</option>
              <option>In person</option>
              <option>Hybrid</option>
            </select>
          </label>

          <div className="flex gap-2">
            <input type="hidden" name="time" value={filters.time} />
            <button className="h-11 rounded-xl bg-[#F36D45] px-5 text-sm font-bold text-white transition hover:bg-[#DD5D38]">
              Apply
            </button>
            <Link
              href="/events"
              className="inline-flex h-11 items-center rounded-xl border border-[#E8DAD2] bg-white px-4 text-sm font-bold text-[#76665F]"
            >
              Reset
            </Link>
          </div>
        </form>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#756A65]">
            {total} event{total === 1 ? "" : "s"} found
          </p>
          <div className="flex overflow-hidden rounded-full border border-[#F0D8CC] bg-white p-1 text-xs font-bold">
            <Link
              href={queryLink({ ...filters, time: "upcoming" }, 1)}
              className={`rounded-full px-4 py-2 ${
                filters.time === "upcoming"
                  ? "bg-[#292522] text-white"
                  : "text-[#76665F]"
              }`}
            >
              Upcoming
            </Link>
            <Link
              href={queryLink({ ...filters, time: "past" }, 1)}
              className={`rounded-full px-4 py-2 ${
                filters.time === "past"
                  ? "bg-[#292522] text-white"
                  : "text-[#76665F]"
              }`}
            >
              Past events
            </Link>
          </div>
        </div>

        {events.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event: AnyRecord) => {
              const calendar = formatMonth(event.startDate);
              const registration =
                event.registrationUrl &&
                /^https?:\/\//i.test(event.registrationUrl)
                  ? { href: event.registrationUrl, external: true }
                  : event.registrationUrl?.startsWith("/")
                    ? { href: event.registrationUrl, external: false }
                    : { href: "/contact", external: false };

              return (
                <article
                  key={String(event._id)}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#F0E5DF] bg-white shadow-[0_10px_35px_rgba(80,48,32,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#FFB09D] hover:shadow-[0_24px_50px_rgba(80,48,32,.12)]"
                >
                  <div className="relative h-[220px] overflow-hidden bg-[#FFF0BE]">
                    {event.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#FFF0BE] to-[#FFB09D] text-[#F36D45]">
                        <CalendarDays size={58} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-[58px] w-[58px] flex-col items-center justify-center rounded-2xl bg-white text-[#292522] shadow-lg">
                      <span className="text-[10px] font-extrabold tracking-wider text-[#F36D45]">
                        {calendar.month}
                      </span>
                      <span className="text-xl font-black leading-5">
                        {calendar.day}
                      </span>
                    </div>
                    {event.isFeatured && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#F36D45] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        <Sparkles size={12} /> Featured
                      </span>
                    )}
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#76502F]">
                      {event.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B05B40]">
                      <span>{event.eventType}</span>
                      <span className="h-1 w-1 rounded-full bg-[#FF907F]" />
                      <span>{event.mode}</span>
                    </div>

                    <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug text-[#292522] transition-colors hover:text-[#D95C39]">
                      <Link href={`/events/${event.slug}`}>{event.title}</Link>
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#756A65]">
                      {event.summary}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-[#F0E5DF] pt-4 text-xs font-semibold text-[#76665F]">
                      <p className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-[#F36D45]" />
                        {formatDate(event.startDate)}
                      </p>
                      {(event.startTime || event.endTime) && (
                        <p className="flex items-center gap-2">
                          <Clock3 size={15} className="text-[#F36D45]" />
                          {[event.startTime, event.endTime]
                            .filter(Boolean)
                            .join(" – ")}{" "}
                          {event.timezone === "Asia/Kolkata"
                            ? "IST"
                            : event.timezone}
                        </p>
                      )}
                      {event.location && (
                        <p className="flex items-center gap-2">
                          <MapPin
                            size={15}
                            className="shrink-0 text-[#F36D45]"
                          />
                          {event.location}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                      <span className="text-xs font-semibold text-[#9A8880]">
                        {event.capacity || "Open to learners"}
                      </span>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/events/${event.slug}`}
                          className="text-xs font-bold text-[#D95C39] hover:text-[#A9472D]"
                        >
                          Details
                        </Link>
                        {registration.external ? (
                          <a
                            href={registration.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-[#F36D45] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#DD5D38]"
                          >
                            Reserve a spot
                          </a>
                        ) : (
                          <Link
                            href={registration.href}
                            className="rounded-full bg-[#F36D45] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#DD5D38]"
                          >
                            Reserve a spot
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#E9C8B9] bg-[#FFF8F4] px-6 py-14 text-center">
            <CalendarRange size={38} className="mx-auto text-[#F36D45]" />
            <h3 className="mt-4 text-xl font-bold">No events found</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#726965]">
              Try a different search or adjust your filters to find another
              study session.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex rounded-full bg-[#F36D45] px-5 py-3 text-sm font-bold text-white"
            >
              Clear filters
            </Link>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Events pages"
            className="mt-9 flex flex-wrap items-center justify-center gap-2"
          >
            <Link
              aria-disabled={page <= 1}
              href={queryLink(filters, Math.max(1, page - 1))}
              className={`rounded-xl border border-[#E8DAD2] bg-white px-4 py-2.5 text-sm font-bold ${
                page <= 1
                  ? "pointer-events-none opacity-40"
                  : "hover:border-[#F36D45]"
              }`}
            >
              Previous
            </Link>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <Link
                  key={number}
                  href={queryLink(filters, number)}
                  aria-current={page === number ? "page" : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold ${
                    page === number
                      ? "bg-[#F36D45] text-white"
                      : "border border-[#E8DAD2] bg-white text-[#76665F] hover:border-[#F36D45]"
                  }`}
                >
                  {number}
                </Link>
              ),
            )}
            <Link
              aria-disabled={page >= totalPages}
              href={queryLink(filters, Math.min(totalPages, page + 1))}
              className={`rounded-xl border border-[#E8DAD2] bg-white px-4 py-2.5 text-sm font-bold ${
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:border-[#F36D45]"
              }`}
            >
              Next
            </Link>
          </nav>
        )}
      </section>

      {/* <section className="bg-[#FFF4EF]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[#F0D8CC] bg-white p-6 shadow-[0_14px_40px_rgba(80,48,32,.06)] sm:p-9 lg:grid-cols-[1fr_.75fr] lg:p-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.17em] text-[#F36D45]">
                Join the learning community
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
                {ctaLeftHeading}
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-[#756A65]">
                {ctaLeftSubtitle}
              </p>
              <Link
                href={ctaButtonUrl}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#DD5D38]"
              >
                {ctaButtonText} <CalendarDays size={17} />
              </Link>
            </div>
            {ctaLeftImage ? (
              <div className="relative h-[220px] overflow-hidden rounded-2xl bg-[#FFF0BE] sm:h-[280px]">
                <Image
                  src={ctaLeftImage}
                  alt={ctaLeftImageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section> */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
    
        <RecentBlogsSlider />
      </section>

      <EventEnquiryForm />
    </main>
  );
}
