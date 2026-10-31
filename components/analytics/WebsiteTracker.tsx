"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { startTrafficTracker } from "@/app/lib/traffic-client";

export default function WebsiteTracker() {
  const pathname = usePathname();
  const tracker = useRef<ReturnType<typeof startTrafficTracker> | null>(null);
  const latestPath = useRef(pathname || "/");

  useEffect(() => {
    latestPath.current = pathname || "/";
    tracker.current?.pageView(latestPath.current);
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled || tracker.current) return;
      tracker.current = startTrafficTracker({ endpoint: "/api/analytics/collect" });
      // Eligibility is asynchronous. Record the initial route once the tracker is ready,
      // otherwise the first page visit is lost before the pathname effect can call it.
      tracker.current.pageView(latestPath.current);
    };
    void fetch("/api/analytics/eligibility", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : { track: true })
      .then((data) => { if (data.track === true) start(); })
      .catch(start);
    return () => { cancelled = true; tracker.current?.stop(); tracker.current = null; };
  }, []);
  return null;
}
