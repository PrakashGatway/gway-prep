import type { BannerAction, BannerDirection } from "@/app/Model/Banner";

const allowedActions: BannerAction[] = ["contact-page", "popup-form", "route", "none"];
const allowedDirections: BannerDirection[] = ["center", "bottom-right", "both"];

function pageSlug(value: unknown) {
  const path = String(value || "").trim().split(/[?#]/, 1)[0];
  if (!path || /^[a-z][a-z\d+.-]*:\/\//i.test(path)) return "";
  const normalized = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "/" : normalized;
}

function validImageUrl(value: unknown) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" && url.pathname.toLowerCase().endsWith(".webp");
  } catch {
    return false;
  }
}

export function parseBanner(body: any) {
  const slug = pageSlug(body?.slug);
  const action = String(body?.action || "none") as BannerAction;
  const direction = String(body?.direction || "bottom-right") as BannerDirection;
  const route = String(body?.route || "").trim();
  if (!slug) return { error: "Enter a valid page path, for example /contact" } as const;
  if (!validImageUrl(body?.image)) return { error: "Upload a WebP image before saving" } as const;
  if (!allowedActions.includes(action)) return { error: "Choose a valid banner action" } as const;
  if (!allowedDirections.includes(direction)) return { error: "Choose a valid banner display direction" } as const;
  if (action === "route" && (!route.startsWith("/") || route.startsWith("//"))) {
    return { error: "Enter an internal route beginning with /" } as const;
  }
  return {
    data: {
      image: String(body.image).trim(),
      slug,
      action,
      direction,
      route: action === "route" ? route : "",
      closeButton: body.closeButton !== false,
      isActive: body.isActive !== false,
    },
  } as const;
}
