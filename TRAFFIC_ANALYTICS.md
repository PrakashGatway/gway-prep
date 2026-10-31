# Traffic analytics configuration

The website Next.js app owns the collection and reporting APIs and stores events in its `MONGODB_URI` database. MongoDB's `traffic_ttl` index expires each event seven days after it occurred. TTL removal is asynchronous; report queries also enforce the seven-day cutoff.

Configure these environment variables for production:

```text
ANALYTICS_PORTAL_ORIGINS=https://dashboard.ooshasprep.com
ANALYTICS_WEBSITE_ORIGINS=https://www.ooshasprep.com,https://ooshasprep.com
PORTAL_AUTH_ME_URL=https://<portal-backend-host>/api/v1/auth/me
```

The portal Vite build may set `VITE_ANALYTICS_API_URL=https://www.ooshasprep.com`. Without it, local development uses `http://localhost:3000` and production uses `https://www.ooshasprep.com`.

Deploy the Next.js website changes before the portal analytics UI. A deployed website must return JSON from `/api/analytics/eligibility` and a non-404 response from `/api/analytics/collect`; a 404 means the analytics routes are absent from that deployment, so no live website events can be stored. Then deploy the portal build and visit the public website in a non-admin browser session to verify a page view. Admin sessions are intentionally excluded.

The Next.js collection API accepts browser requests only from the configured portal origins or its own website origin. Portal bearer tokens are checked through `PORTAL_AUTH_ME_URL`; verified users' name, email, role, and selected category are attached to events. The report API requires a verified portal admin token. Configure both sites over HTTPS in production.

The portal visitor listing groups activity by verified portal user ID or anonymous website device ID. `/api/analytics/visitors` returns one row per group, and `/api/analytics/timeline` provides cursor-based pages for the activity popup. All reporting endpoints require a verified portal admin token.

The anonymous visitor ID is held in the `ooshas_traffic_visitor` cookie as well as browser storage. Cookies do not use ports, so `localhost:3000` and `localhost:5173` use the same device ID during local development. In production the cookie uses `Domain=.ooshasprep.com`, so `ooshasprep.com`, `www.ooshasprep.com`, and the portal subdomain use one device ID. Portal events still attach the verified portal user's name, email, role, and category; public website events remain anonymous.

The tracker does not send passwords or form values. Add `data-no-track` to any sensitive component that should not produce click or form events. To record a named application action, dispatch `window.dispatchEvent(new CustomEvent("traffic:event", { detail: { label: "Action name", target: "Safe target" } }))`.

Admin activity is excluded. The website checks its admin session before starting the tracker, the portal checks its user context, and the collection endpoint also discards verified admin events. Portal collection requires a valid portal login token.
