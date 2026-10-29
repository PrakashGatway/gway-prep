"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import PopupModal from "@/components/popupModel";

type BannerAction = "contact-page" | "popup-form" | "route" | "none";
type BannerDirection = "center" | "bottom-right" | "both";
type SiteBannerRecord = {
  _id: string;
  image: string;
  slug: string;
  action: BannerAction;
  direction: BannerDirection;
  route: string;
  closeButton: boolean;
};

function normalizePath(path: string) {
  const normalized = `/${path.trim().replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "/" : normalized;
}

export default function SiteBanner() {
  const pathname = usePathname() || "/";
  const [banner, setBanner] = useState<SiteBannerRecord | null>(null);
  const [centerVisible, setCenterVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    setCenterVisible(false);
    setNotificationVisible(false);
    setBanner(null);
    setFormOpen(false);

    const path = normalizePath(pathname);
    void fetch(`/api/banners?slug=${encodeURIComponent(path)}`, {
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (cancelled || !result?.data) return;
        const item = {
          ...result.data,
          direction: result.data.direction || "bottom-right",
        } as SiteBannerRecord;
        setBanner(item);
        let centerDismissed = false;
        let notificationDismissed = false;
        try {
          centerDismissed = Boolean(
            window.sessionStorage.getItem(
              `site-banner-dismissed:${item._id}:center`,
            ),
          );
          notificationDismissed = Boolean(
            window.sessionStorage.getItem(
              `site-banner-dismissed:${item._id}:notification`,
            ),
          );
        } catch {
          // Continue showing the banner if browser storage is unavailable.
        }
        timer = setTimeout(() => {
          if (cancelled) return;
          if (
            (item.direction === "center" || item.direction === "both") &&
            !centerDismissed
          )
            setCenterVisible(true);
          if (
            (item.direction === "bottom-right" || item.direction === "both") &&
            !notificationDismissed
          )
            setNotificationVisible(true);
        }, 10_000);
      })
      .catch((error) => console.error("Unable to load page banner", error));

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  const dismissPlacement = (placement: "center" | "notification") => {
    if (banner) {
      try {
        window.sessionStorage.setItem(
          `site-banner-dismissed:${banner._id}:${placement}`,
          "1",
        );
      } catch {
        // The selected banner placement still closes for the current render.
      }
    }
    if (placement === "center") setCenterVisible(false);
    else setNotificationVisible(false);
  };

  const runBannerAction = (placement: "center" | "notification") => {
    if (!banner) return;
    dismissPlacement(placement);

    if (banner.action === "contact-page") {
      window.location.assign("/contact");
      return;
    }

    if (banner.action === "route") {
      if (banner.route) window.location.assign(banner.route);
      return;
    }

    if (banner.action === "popup-form") {
      setFormOpen(true);
      return;
    }
  };

  if (!banner || (!centerVisible && !notificationVisible && !formOpen))
    return null;

  const shouldShowCenter =
    banner.direction === "center" || banner.direction === "both";
  const shouldShowNotification =
    banner.direction === "bottom-right" || banner.direction === "both";

  const renderImageContent = (
    className: string,
    placement: "center" | "notification",
  ) => {
    const image = (
      <img src={banner.image} alt="Website promotion" className={className} />
    );
    if (banner.action === "contact-page") {
      return (
        <a
          href="/contact"
          onClick={() => dismissPlacement(placement)}
          aria-label="Open the contact page"
          className="block"
        >
          {image}
        </a>
      );
    }
    if (banner.action === "route" && banner.route) {
      return (
        <a
          href={banner.route}
          onClick={() => dismissPlacement(placement)}
          aria-label="Open the linked page"
          className="block"
        >
          {image}
        </a>
      );
    }
    if (banner.action === "popup-form") {
      return (
        <button
          type="button"
          onClick={() => runBannerAction(placement)}
          aria-label="Open enquiry form"
          className="block w-full cursor-pointer"
        >
          {image}
        </button>
      );
    }
    return image;
  };

  const renderCloseButton = (placement: "center" | "notification") =>
    banner.closeButton && (
      <button
        type="button"
        onClick={() => runBannerAction(placement)}
        aria-label={`Run ${banner.action} banner action`}
        className="absolute -right-2 -top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
      >
        <X size={18} />
      </button>
    );

  return (
    <>
      {centerVisible && shouldShowCenter && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-2"
          aria-label="Centered page banner"
        >
          <div className="relative max-h-[92vh] w-fit max-w-[min(1000px,94vw)] rounded-2xl p-1">
            {renderImageContent(
              "block max-h-[88vh] max-w-full rounded-xl object-contain",
              "center",
            )}
            {renderCloseButton("center")}
          </div>
        </div>
      )}

      {notificationVisible && shouldShowNotification && (
        <aside
          className="fixed bottom-4 left-1/2 z-[81] w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-white/70 bg-white p-2 shadow-[0_20px_80px_rgba(25,25,25,.28)] md:bottom-6 md:left-auto md:right-6 md:translate-x-0"
          aria-label="Page banner notification"
        >
          {renderImageContent(
            "block max-h-[min(38vh,260px)] w-full rounded-2xl object-contain",
            "notification",
          )}
          {renderCloseButton("notification")}
        </aside>
      )}

      {banner.action === "popup-form" && (
        <PopupModal isPopupOpen={formOpen} setIsPopupOpen={setFormOpen} />
      )}
    </>
  );
}
