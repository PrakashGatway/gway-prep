import { connectDB } from "@/app/lib/db";
import type { Collection } from "mongodb";

export const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
export type Site = "website" | "portal";
export type EventType = "page_view" | "page_duration" | "click" | "form_start" | "form_submit" | "custom";
export type TrafficEvent = {
  site: Site;
  visitorId: string;
  sessionId: string;
  type: EventType;
  path: string;
  label: string;
  target?: string;
  clickKind?: "button" | "link" | "other";
  durationMs?: number;
  occurredAt: Date;
  expiresAt: Date;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  device: "mobile" | "tablet" | "desktop";
  userId?: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  categoryName?: string;
};

let indexPromise: Promise<void> | undefined;
export async function trafficCollection(): Promise<Collection<TrafficEvent>> {
  const db = (await connectDB()).connection.db;
  if (!db) throw new Error("Database unavailable");
  const collection = db.collection<TrafficEvent>("traffic_events");
  indexPromise ??= Promise.all([
    collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "traffic_ttl" }),
    collection.createIndex({ occurredAt: -1, site: 1, type: 1 }),
    collection.createIndex({ visitorId: 1, occurredAt: -1 }),
    collection.createIndex({ userId: 1, occurredAt: -1 }),
    collection.createIndex({ site: 1, path: 1, occurredAt: -1 }),
  ]).then(() => undefined).catch((error) => { indexPromise = undefined; throw error; });
  await indexPromise;
  return collection;
}

export function cutoff() { return new Date(Date.now() - RETENTION_MS); }
