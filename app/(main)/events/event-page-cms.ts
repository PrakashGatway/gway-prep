import { getPageInfo, getPages } from "@/app/services/api";

export type EventFaqItem = {
  question: string;
  answer: string;
};

type AnyRecord = Record<string, any>;

export const DEFAULT_EVENT_FAQS: EventFaqItem[] = [
  {
    question: "What are Ooshas Prep study events?",
    answer:
      "They are workshops, webinars, mock tests, and live sessions designed to help students take practical steps toward their learning goals.",
  },
  {
    question: "Are events online or in person?",
    answer:
      "Event format varies. Check each event listing for its attendance mode, location, and joining details.",
  },
  {
    question: "How do I register for an event?",
    answer:
      "Open an event and use its registration link or enquiry form. The event page includes the relevant details.",
  },
  {
    question: "Can I attend events for different subjects?",
    answer:
      "Yes. Browse the events calendar and filter by subject, event type, and attendance format to find a suitable session.",
  },
];

export async function loadEventsPageContent(): Promise<AnyRecord | null> {
  try {
    const response = await getPageInfo("events");
    const page = response?.data?.data ?? response?.data ?? response;
    if (page && (page.sections || page.seoMeta || page.template)) return page;
  } catch {
    // Use the page list fallback if the direct lookup is unavailable.
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

export function getEventsSectionData(
  page: AnyRecord | null,
  sectionName: string,
): AnyRecord {
  const sections = page?.sections ?? page?.pageData?.sections ?? page?.data?.sections;
  const section = Array.isArray(sections)
    ? sections.find(
        (item: AnyRecord) =>
          item?.name === sectionName ||
          item?.sectionName === sectionName ||
          item?.slug === sectionName,
      )
    : sections?.[sectionName];

  if (!section || typeof section !== "object") return {};

  const fields = section.fields;
  const fieldValues: AnyRecord = Array.isArray(fields)
    ? fields.reduce((result: AnyRecord, field: AnyRecord) => {
        if (field?.name) result[field.name] = field.value;
        return result;
      }, {})
    : fields && typeof fields === "object"
      ? fields
      : {};

  return {
    ...section,
    ...(section.data && typeof section.data === "object" ? section.data : {}),
    ...fieldValues,
  };
}

export function getEventsSectionText(
  page: AnyRecord | null,
  sectionName: string,
  fieldName: string,
  fallback: string,
): string {
  const value = getEventsSectionData(page, sectionName)[fieldName];
  return typeof value === "string" && value.trim()
    ? value.trim()
    : typeof value === "number"
      ? String(value)
      : fallback;
}

export function getEventsFaqItems(page: AnyRecord | null): EventFaqItem[] {
  const items = getEventsSectionData(page, "events-faq-section").items;
  if (!Array.isArray(items)) return DEFAULT_EVENT_FAQS;

  const validItems = items
    .filter(
      (item: AnyRecord) =>
        typeof item?.question === "string" &&
        item.question.trim() &&
        typeof item?.answer === "string" &&
        item.answer.trim(),
    )
    .map((item: AnyRecord) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));

  return validItems.length ? validItems : DEFAULT_EVENT_FAQS;
}
