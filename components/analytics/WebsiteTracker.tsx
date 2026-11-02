"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { startTrafficTracker } from "@/app/lib/traffic-client";
import { useGlobal } from "@/hooks/AppStateContext";

function websiteIdentity(user: any) {
  if (!user?._id) return null;
  return {
    userId: String(user._id),
    name: typeof user.name === "string" ? user.name : "",
    email: typeof user.email === "string" ? user.email : "",
    role: typeof user.role === "string" ? user.role : "",
    categoryName: typeof user.category === "object" ? user.category?.name || "" : "",
  };
}

export default function WebsiteTracker() {
  const pathname = usePathname();
  const { user, authToken, authChecked } = useGlobal();
  const tracker = useRef<ReturnType<typeof startTrafficTracker> | null>(null);
  const latestPath = useRef(pathname || "/");
  const userRef = useRef(user);
  const tokenRef = useRef(authToken);
  userRef.current = user;
  tokenRef.current = authToken;

  useEffect(() => {
    latestPath.current = pathname || "/";
    tracker.current?.pageView(latestPath.current);
  }, [pathname]);

  useEffect(() => {
    // The provider fetches /auth/me on startup. Waiting for it ensures the
    // initial page view includes the authenticated website user when present.
    if (!authChecked) return;
    let cancelled = false;
    const start = () => {
      if (cancelled || tracker.current) return;
      tracker.current = startTrafficTracker({
        endpoint: "/api/analytics/collect",
        getToken: () => tokenRef.current || localStorage.getItem("accessToken"),
        getPortalIdentity: () => websiteIdentity(userRef.current),
      });
      tracker.current.pageView(latestPath.current);
    };
    void fetch("/api/analytics/eligibility", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : { track: true })
      .then((data) => { if (data.track === true) start(); })
      .catch(start);
    return () => { cancelled = true; tracker.current?.stop(); tracker.current = null; };
  }, [authChecked]);
  return null;
}
