"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Phone,
  User,
  LayoutDashboard,
  GraduationCap,
  ArrowRight,
  UserCircle,
  LogOut,
  Book,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/hooks/AppStateContext";
import AuthDrawer from "./auth/drawer";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  Data?: any[];
}

export function Navbar({ Data }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, drawer, setDrawer, UserNavigate } = useGlobal();
  const accountUser = user as { name?: string; email?: string } | null;

  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );

  const [activeSubDropdown, setActiveSubDropdown] = React.useState<
    string | null
  >(null);

  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(
    null,
  );

  const [mobileSubDropdown, setMobileSubDropdown] = React.useState<
    string | null
  >(null);
  const [mobileAccountOpen, setMobileAccountOpen] = React.useState(false);

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  const NAVDATA1 = React.useMemo(
    () =>
      Data?.filter(
        (item: any) =>
          item?.seoMeta?.template?.toLowerCase() === "examdetails" &&
          item?.seoMeta?.isPublished === true,
      ) || [],
    [Data],
  );

  const calculator = React.useMemo(
    () =>
      Data?.filter((item: any) => {
        return (
          item?.seoMeta?.template?.toLowerCase() === "calculator" &&
          item?.seoMeta?.isPublished === true
        );
      }) || [],
    [Data],
  );

  const courseData1 = React.useMemo(
    () =>
      Data?.filter(
        (item: any) =>
          item?.seoMeta?.template?.toLowerCase() === "examdetails" &&
          item?.seoMeta?.isPublished === true,
      ) || [],
    [Data],
  );

  const NAVDATA = React.useMemo(
    () =>
      Data?.filter(
        (item: any) =>
          item?.seoMeta?.template?.toLowerCase() === "preparation" &&
          item?.seoMeta?.isPublished === true,
      ) || [],
    [Data],
  );

  const spokenEnglishPages = React.useMemo(
    () =>
      Data?.filter((item: any) => {
        const template = String(
          item?.seoMeta?.template || item?.template || "",
        ).toLowerCase();
        return (
          template === "spoken english" && item?.seoMeta?.isPublished === true
        );
      }) || [],
    [Data],
  );

  const spokenEnglishNavItem = React.useMemo(() => {
    const getSlug = (item: any) =>
      String(item?.seoMeta?.canonicalUrl || item?.slug || "")
        .replace(/^\/+|\/+$/g, "")
        .replace(/^https?:\/\/[^/]+\//i, "");

    const spokenEnglishChildren = spokenEnglishPages
      .map((item: any) => ({
        name: item?.seoMeta?.navTitle || item?.name || getSlug(item),
        img: item?.seoMeta?.navIcon || null,
        slug: getSlug(item),
        description: item?.seoMeta?.navSubtitle || "",
        badge: item?.seoMeta?.badge || null,
      }))
      .filter((item: any) => item.slug && item.slug !== "spoken-english");

    return {
      name: "Spoken English",
      img: null,
      slug: "spoken-english",
      description: "English speaking courses and programs",
      badge: null,
      sublink: spokenEnglishChildren,
    };
  }, [spokenEnglishPages]);

  const examDetailsNavItems = React.useMemo(() => {
    const getSlug = (item: any) =>
      String(item?.seoMeta?.canonicalUrl || item?.slug || item?.name || "")
        .replace(/^\/+|\/+$/g, "")
        .replace(/^https?:\/\/[^/]+\//i, "");
    const normalizeReference = (value: any) =>
      String(value || "")
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "")
        .replace(/\s+/g, "-");

    return courseData1
      .filter((item: any) => !item?.seoMeta?.duplicateOf)
      .map((parent: any) => {
        const parentSlug = getSlug(parent);
        const parentReferences = [
          parent?.name,
          parent?.slug,
          parent?.seoMeta?.canonicalUrl,
          parent?.seoMeta?.navTitle,
        ].map(normalizeReference);

        return {
          name:
            parent?.seoMeta?.navTitle || parent?.seoMeta?.title || parent?.name,
          img: parent?.seoMeta?.navIcon || null,
          slug: getSlug(parent),
          description: parent?.seoMeta?.navSubtitle || "",
          badge: parent?.seoMeta?.badge || null,
          sublink: courseData1
            .filter((child: any) => {
              const parentRef = normalizeReference(child?.seoMeta?.duplicateOf);
              return parentRef && parentReferences.includes(parentRef);
            })
            .map((child: any) => {
              const childSlug = getSlug(child);
              const nestedSlug = childSlug.startsWith(`${parentSlug}/`)
                ? childSlug
                : childSlug.startsWith(`${parentSlug}-`)
                  ? `${parentSlug}/${childSlug.slice(parentSlug.length + 1)}`
                  : `${parentSlug}/${childSlug}`;

              return {
                name:
                  child?.seoMeta?.navTitle ||
                  child?.seoMeta?.title ||
                  child?.name,
                img: child?.seoMeta?.navIcon || null,
                slug: nestedSlug,
                description: child?.seoMeta?.navSubtitle || "",
                badge: child?.seoMeta?.badge || null,
              };
            }),
        };
      });
  }, [courseData1]);

  const navItems = React.useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        icon: null,
      },
      {
        name: "About Us",
        href: "/about",
        icon: null,
      },

      // =========================
      // TEST PREP
      // =========================
      {
        name: "Test Prep",
        href: "#",
        hasDropdown: true,
        icon: GraduationCap,

        dropdownItems: NAVDATA.filter(
          (subItem: any) => !subItem?.seoMeta?.duplicateOf,
        )
          ?.reverse()
          .map((item: any) => {
            return {
              name: item?.seoMeta?.navTitle,
              img: item?.seoMeta?.navIcon,
              slug: item?.seoMeta?.canonicalUrl,
              description: item?.seoMeta?.navSubtitle,
              badge: item?.seoMeta?.badge || null,

              sublink: NAVDATA.filter((subItem: any) =>
                subItem?.seoMeta?.duplicateOf
                  ?.toLowerCase()
                  .includes(item?.name?.toLowerCase()),
              ).map((ele: any) => {
                return {
                  name: ele?.seoMeta?.navTitle,
                  img: ele?.seoMeta?.navIcon,
                  slug: ele?.seoMeta?.canonicalUrl,
                  description: ele?.seoMeta?.navSubtitle,
                  badge: ele?.seoMeta?.badge || null,
                };
              }),
            };
          })
          .concat(spokenEnglishNavItem),
      },

      {
        name: "Resources",
        href: "#",
        hasDropdown: true,
        icon: null,

        dropdownItems: calculator
          .map((resource: any) => ({
            name: resource?.seoMeta?.navTitle,
            img: resource?.seoMeta?.navIcon || null,
            slug: resource?.seoMeta?.canonicalUrl,
            description: resource?.seoMeta?.navSubtitle || "",
            badge: resource?.seoMeta?.badge || null,
            sublink: [],
          }))
          .concat({
            name: "Study Guides",
            img: null,
            slug: "guide",
            description: "Explore articles, study plans and exam tips",
            badge: null,
            sublink: [],
          }),
      },
      {
        name: "Exam Details",
        href: "#",
        hasDropdown: true,
        icon: null,

        dropdownItems: examDetailsNavItems,
      },

      {
        name: "Blogs",
        href: "/blog",
        icon: null,
      },

      {
        name: "Events",
        href: "/events",
        icon: null,
      },
      {
        name: "Contact Us",
        href: "/contact",
        icon: null,
      },
    ],
    [
      NAVDATA,
      calculator,
      courseData1,
      examDetailsNavItems,
      spokenEnglishNavItem,
    ],
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      setShowProfileMenu(false);
      setActiveDropdown(null);
      setActiveSubDropdown(null);
      setMobileDropdown(null);
      setMobileSubDropdown(null);
      setMobileAccountOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setMobileDropdown(null);
    setMobileSubDropdown(null);
    setMobileAccountOpen(false);
  };

  const handleDropdownToggle = (itemName: string) => {
    setMobileDropdown((current) => (current === itemName ? null : itemName));

    setMobileSubDropdown(null);
    setMobileAccountOpen(false);
  };

  const handleMobileSubDropdown = (slug: string) => {
    setMobileSubDropdown((current) => (current === slug ? null : slug));
  };

  const closeDesktopDropdown = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileDropdown(null);
    setMobileSubDropdown(null);
    setMobileAccountOpen(false);
  };

  const navHref = (slug: string) =>
    `/${String(slug || "").replace(/^\/+/, "")}`;

  const normalizePath = (value: string) => {
    const path = String(value || "/")
      .replace(/^https?:\/\/[^/]+/i, "")
      .split(/[?#]/)[0]
      .replace(/\/+$/, "");
    return (path.startsWith("/") ? path : `/${path}`).toLowerCase() || "/";
  };
  const currentPath = normalizePath(pathname || "/");
  const matchesPath = (value: string) => {
    if (!value) return false;
    const target = normalizePath(value);
    return target === "/"
      ? currentPath === "/"
      : currentPath === target || currentPath.startsWith(`${target}/`);
  };
  const isNavItemActive = (item: any) =>
    item.hasDropdown
      ? item.dropdownItems?.some(
          (group: any) =>
            matchesPath(group.slug) ||
            group.sublink?.some((child: any) => matchesPath(child.slug)),
        )
      : matchesPath(item.href);
  const activeGroupSlug = (item: any) =>
    item.dropdownItems?.find(
      (group: any) =>
        matchesPath(group.slug) ||
        group.sublink?.some((child: any) => matchesPath(child.slug)),
    )?.slug ||
    item.dropdownItems?.[0]?.slug ||
    null;
  const navTabUnderline =
    "relative after:pointer-events-none after:absolute after:bottom-1 after:left-2.5 after:right-2.5 after:h-[2px] after:origin-left after:bg-[#F36C45] after:content-[''] after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <>
      <div className="hidden bg-gradient-to-r from-[#D95734] via-[#F36D45] to-[#DD5935] text-white sm:block">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-3 px-4 py-0.5 sm:px-6 xl:px-0">
          <p className="min-w-0 text-sm font-medium">
            Prepare Smart. Achieve More.
          </p>
          <a
            href="tel:+919166146538"
            aria-label="Call an Ooshas Prep expert at +91 9166146538"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1 pr-2.5 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[#E45E3A] transition-transform group-hover:rotate-12">
              <Phone size={12} aria-hidden="true" />
            </span>
            <span className="hidden text-white/90 lg:inline">
              Consult an expert
            </span>
            <span className="hidden text-white/70 lg:inline" aria-hidden="true">
              ·
            </span>
            <span className="whitespace-nowrap text-white">+91 9166146538</span>
          </a>
        </div>
      </div>
      <nav
        onMouseLeave={closeDesktopDropdown}
        className={`
          sticky
          top-0
          left-0
          right-0
          z-[500]
          w-full
          transition-all
          duration-300
          ${
            scrolled
              ? "border-b border-gray-100 bg-white/95 shadow-lg backdrop-blur-xl"
              : "border-b border-transparent bg-white backdrop-blur-sm"
          }
        `}
      >
        <div
          className={`mx-auto w-full max-w-7xl px-3 transition-all md:px-0 ${scrolled ? "py-1.5" : "py-2"}`}
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <Link
              href="/"
              className="
    group
    flex
 
    min-w-0
    shrink-0
    items-center
  "
              aria-label="Ooshas Prep Home"
            >
              <Image
                src="/image/logo.png"
                alt="Ooshas Prep Logo"
                width={280}
                height={110}
                priority
                className="
      h-16
      w-auto
      object-contain
      transition-transform
      duration-200
      group-hover:scale-[1.03]
      sm:h-[72px]
      lg:h-20
      xl:h-[60px]
    "
              />
            </Link>

            <div className="ml-auto flex items-center gap-2 xl:hidden">
              <a
                href="tel:+919166146538"
                aria-label="Call Ooshas Prep at +91 9166146538"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#F36C45] transition hover:bg-orange-100 active:scale-95 sm:h-11 sm:w-11"
              >
                <Phone size={19} aria-hidden="true" />
              </a>
              {/* Menu */}

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-700
                  transition-all
                  duration-200
                  hover:bg-orange-50
                  hover:text-[#F36C45]
                  active:scale-95
                  sm:h-11
                  sm:w-11
                "
              >
                <Menu size={22} strokeWidth={2} className="sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
              {navItems.map((item: any) => (
                <div
                  key={item.name}
                  className="contents"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(item.name);
                      setActiveSubDropdown(activeGroupSlug(item));
                    } else {
                      closeDesktopDropdown();
                    }
                  }}
                >
                  {/* Main nav item */}

                  {item.hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name,
                        );
                        setActiveSubDropdown(activeGroupSlug(item));
                      }}
                      aria-expanded={activeDropdown === item.name}
                      aria-haspopup="true"
                      className={`
  flex
  shrink-0
  items-center
  gap-1
  whitespace-nowrap
  rounded-2xl
  px-2.5
  py-2.5
  text-[14px]
  font-medium
  transition-all
  duration-200
   ${navTabUnderline}
  ${
    activeDropdown === item.name || isNavItemActive(item)
      ? "text-[#D9542D] after:scale-x-0"
      : "text-gray-800 hover:text-[#F36C45] after:scale-x-0"
  }
`}
                    >
                      <span>{item.name}</span>

                      {item.hasDropdown && (
                        <ChevronDown
                          size={16}
                          className={`
                          transition-transform
                          duration-200
                          ${activeDropdown === item.name ? "rotate-180" : ""}
                        `}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onMouseEnter={closeDesktopDropdown}
                      aria-current={isNavItemActive(item) ? "page" : undefined}
                      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-2xl px-2.5 py-2.5 text-[14px] font-medium transition-all duration-200 ${navTabUnderline} ${isNavItemActive(item) ? "text-[#D9542D] after:scale-x-0" : "text-gray-800 hover:text-[#F36C45] after:scale-x-0"}`}
                    >
                      {item.name}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <div className="absolute left-1/2 top-full z-[600] w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 pt-1">
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.97,
                          }}
                          transition={{
                            duration: 0.15,
                          }}
                          className="w-full"
                          onMouseEnter={() => setActiveDropdown(item.name)}
                        >
                          <div
                            className={`w-full overflow-hidden rounded-xl bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-[0_20px_60px_rgba(0,0,0,0.52)] ${item.name === "Resources" ? "h-[min(72vh,430px)] overflow-y-auto " : "flex h-[430px]"}`}
                          >
                            {item.name === "Resources" ? (
                              <div className="p-6">
                                <div className="flex items-end justify-between gap-6 pb-5">
                                  <div>
                                    <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                                      Find the right study tool
                                    </h3>
                                    <p className="mt-px text-sm text-slate-500">
                                      Calculators, guides and practical help for
                                      your next exam.
                                    </p>
                                  </div>
                                  <span className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#D95C37] sm:inline-flex">
                                    Explore at your pace
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                                  {item.dropdownItems?.map((resource: any) => (
                                    <Link
                                      key={resource.slug}
                                      href={navHref(resource.slug)}
                                      onClick={closeDesktopDropdown}
                                      className={`group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:bg-gray-100 ${matchesPath(resource.slug) ? "text-[#D9542D]" : ""}`}
                                    >
                                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#F36C45] transition group-hover:bg-white">
                                        {resource.img ? (
                                          <Image
                                            src={resource.img}
                                            alt=""
                                            width={26}
                                            height={26}
                                            className="object-contain"
                                          />
                                        ) : (
                                          <Book size={21} />
                                        )}
                                      </span>
                                      <span className="min-w-0 flex-1">
                                        <span
                                          className={`block text-sm font-semibold leading-5 transition group-hover:text-[#F36C45] ${matchesPath(resource.slug) ? "text-[#D9542D]" : "text-slate-900"}`}
                                        >
                                          {resource.name}
                                        </span>
                                        {resource.description && (
                                          <span className="mt-1 block line-clamp-2 text-xs leading-4 text-slate-500">
                                            {resource.description}
                                          </span>
                                        )}
                                      </span>
                                      <ArrowRight
                                        size={16}
                                        className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#F36C45]"
                                      />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <>
                                {/* LEFT COLUMN */}

                                <div
                                  className="
                                h-full
                                w-[300px] shrink-0
                                overflow-y-auto
                                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-r-2
                                p-4
                              "
                                >
                                  {item.dropdownItems?.map((dd: any) => {
                                    const hasSub =
                                      dd.sublink && dd.sublink.length > 0;

                                    const isActive =
                                      activeSubDropdown === dd.slug;

                                    return (
                                      <div
                                        key={dd.slug}
                                        className="relative"
                                        onMouseEnter={() => {
                                          setActiveSubDropdown(dd.slug);
                                        }}
                                      >
                                        <Link
                                          href={navHref(dd.slug)}
                                          onClick={closeDesktopDropdown}
                                          className={`
                                          group
                                          flex
                                          items-center
                                          gap-3
                                          rounded-xl
                                          px-2
                                          py-1.5
                                          font-medium
                                          transition-all
                                          ${
                                            isActive ||
                                            matchesPath(dd.slug) ||
                                            dd.sublink?.some((sub: any) =>
                                              matchesPath(sub.slug),
                                            )
                                              ? "font-semibold text-[#D9542D]"
                                              : "hover:text-[#F36C45]"
                                          }
                                        `}
                                        >
                                          {/* Icon */}

                                          {dd.img ? (
                                            <div
                                              className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                          "
                                            >
                                              <Image
                                                src={dd.img}
                                                alt={dd.name}
                                                width={28}
                                                height={28}
                                                className="object-contain"
                                              />
                                            </div>
                                          ) : (
                                            <div className="h-10"></div>
                                            // <GraduationCap
                                            //   size={18}
                                            //   className="text-[#F36C45]"
                                            // />
                                          )}

                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                              <span
                                                className={`
                                                truncate
                                                text-sm
                                                font-semibold
                                                transition-colors
                                                ${
                                                  isActive
                                                    ? "text-[#F36C45]"
                                                    : "text-gray-800 group-hover:text-[#F36C45]"
                                                }
                                              `}
                                              >
                                                {dd.name}
                                              </span>

                                              {dd.badge && (
                                                <span
                                                  className="
                                                  shrink-0
                                                  rounded-full
                                                  bg-[#F36C45]/10
                                                  px-1.5
                                                  py-0.5
                                                  text-[9px]
                                                  font-semibold
                                                  text-[#F36C45]
                                                "
                                                >
                                                  {dd.badge}
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {/* Arrow */}

                                          {hasSub ? (
                                            <ChevronRight
                                              size={16}
                                              className={`
                                              shrink-0
                                              transition-colors
                                              ${
                                                isActive
                                                  ? "text-[#F36C45]"
                                                  : "text-gray-300 group-hover:text-[#F36C45]"
                                              }
                                            `}
                                            />
                                          ) : null}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </div>

                                <AnimatePresence mode="wait">
                                  {activeSubDropdown && (
                                    <motion.div
                                      key={activeSubDropdown}
                                      initial={{
                                        opacity: 0,
                                        x: -8,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      exit={{
                                        opacity: 0,
                                        x: -8,
                                      }}
                                      transition={{
                                        duration: 0.15,
                                      }}
                                      className="
                                    min-w-0 flex-1
                                    h-full
                                    overflow-y-auto
                                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                                    bg-white
                                  "
                                    >
                                      {item.dropdownItems?.map((dd: any) => {
                                        if (dd.slug !== activeSubDropdown) {
                                          return null;
                                        }

                                        return (
                                          <div key={dd.slug} className="p-6">
                                            <div className=" flex items-end justify-between pb-5">
                                              <div>
                                                <h4 className="text-xl font-semibold tracking-tight text-slate-900">
                                                  {dd.name}
                                                </h4>
                                              </div>
                                              <Link
                                                href={navHref(dd.slug)}
                                                onClick={closeDesktopDropdown}
                                                className="text-sm font-semibold text-[#F36C45] hover:underline"
                                              >
                                                View overview →
                                              </Link>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                              {(dd.sublink?.length
                                                ? dd.sublink
                                                : [dd]
                                              ).map((sub: any) => (
                                                <Link
                                                  key={sub.slug}
                                                  href={navHref(sub.slug)}
                                                  onClick={closeDesktopDropdown}
                                                  className={`
                                                    group/sub
                                                    flex
                                                    items-center
                                                    gap-2
                                                    rounded-2xl border border-slate-200 bg-white p-1
                                                    transition-all duration-200 hover:bg-gray-100
                                                    ${matchesPath(sub.slug) ? "text-[#D9542D]" : ""}
                                                  `}
                                                >
                                                  <div
                                                    className="
                                                      flex
                                                      h-12
                                                      w-12
                                                      shrink-0
                                                      items-center
                                                      justify-center
                                                      rounded-xl


                                                    "
                                                  >
                                                    {sub.img ? (
                                                      <Image
                                                        src={sub.img}
                                                        alt={sub.name}
                                                        width={24}
                                                        height={24}
                                                        className="object-contain"
                                                      />
                                                    ) : (
                                                      <GraduationCap
                                                        size={20}
                                                        className="text-[#F36C45]"
                                                      />
                                                    )}
                                                  </div>

                                                  <div className="min-w-0 flex-1">
                                                    <span
                                                      className={`block text-sm font-semibold leading-snug transition-colors group-hover/sub:text-[#F36C45] ${matchesPath(sub.slug) ? "text-[#D9542D]" : "text-gray-800"}`}
                                                    >
                                                      {sub.name}
                                                    </span>
                                                    {sub.description && (
                                                      <span className="mt-px block line-clamp-2 text-xs leading-4 text-gray-500">
                                                        {sub.description}
                                                      </span>
                                                    )}
                                                  </div>
                                                </Link>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden items-center gap-3  xl:flex">
              {/* Login */}

              {!user?.email ? (
                <button
                  type="button"
                  onClick={UserNavigate}
                  className="
                    flex
                    items-center
                    gap-2
                    bg-gradient-to-r
                    from-[#F36C45]
                    to-orange-500
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-orange-500/20
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-orange-500/30
                    active:translate-y-0
                  "
                >
                  <User size={17} />
                  Get Started
                </button>
              ) : (
                /* Profile */

                <div ref={profileMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    aria-expanded={showProfileMenu}
                    aria-haspopup="menu"
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-orange-500
                      to-[#F36C45]
                      pr-2
                      shadow-sm
                      transition-all
                      hover:shadow-lg
                      hover:shadow-orange-500/20
                      active:scale-95
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-gray-700
                      "
                    >
                      <UserCircle size={24} />
                    </div>

                    <ChevronDown
                      size={17}
                      className={`
                        text-white
                        transition-transform
                        duration-300
                        ${showProfileMenu ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {/* Profile dropdown */}

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.97,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                          scale: 0.97,
                        }}
                        transition={{
                          duration: 0.15,
                        }}
                        className="
                          absolute
                          right-0
                          top-[calc(100%+12px)]
                          z-[9999]
                          w-[320px]
                          overflow-hidden
                          rounded-2xl
                          border
                          border-gray-100
                          bg-white
                          shadow-[0_20px_50px_rgba(0,0,0,0.14)]
                        "
                      >
                        {/* User */}

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            border-b
                            border-gray-100
                            bg-gradient-to-br
                            from-orange-50
                            to-white
                            px-5
                            py-5
                          "
                        >
                          <div
                            className="
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-white
                              text-gray-500
                              shadow-sm
                            "
                          >
                            <User size={24} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-[16px] font-semibold text-gray-900">
                              {user?.name || "Welcome Back"}
                            </h3>

                            <p className="mt-0.5 truncate text-xs text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        {/* Menu */}

                        <div className="p-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowProfileMenu(false);

                              window.location.href =
                                "https://dashboard.ooshasprep.com/profile";
                            }}
                            className="
                              flex
                              min-h-[48px]
                              w-full
                              items-center
                              gap-3
                              rounded-xl
                              px-4
                              text-left
                              text-sm
                              text-gray-700
                              transition
                              hover:bg-orange-50
                              hover:text-[#F36C45]
                            "
                          >
                            <User size={19} strokeWidth={1.8} />

                            <span>My Profile</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setShowProfileMenu(false);

                              window.location.href =
                                "https://dashboard.ooshasprep.com";
                            }}
                            className="
                              flex
                              min-h-[48px]
                              w-full
                              items-center
                              gap-3
                              rounded-xl
                              px-4
                              text-left
                              text-sm
                              text-gray-700
                              transition
                              hover:bg-orange-50
                              hover:text-[#F36C45]
                            "
                          >
                            <LayoutDashboard size={19} strokeWidth={1.8} />

                            <span>Dashboard</span>
                          </button>
                        </div>

                        {/* Logout */}

                        <div className="border-t border-gray-100 p-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowProfileMenu(false);
                              logout();
                            }}
                            className="
                              flex
                              min-h-[48px]
                              w-full
                              items-center
                              gap-3
                              rounded-xl
                              px-4
                              text-left
                              text-sm
                              text-red-500
                              transition
                              hover:bg-red-50
                            "
                          >
                            <LogOut size={19} strokeWidth={1.8} />

                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="
                fixed
                inset-0
                z-[600]
                bg-black/45
                backdrop-blur-[3px]
                xl:hidden
              "
            />

            {/* Drawer */}

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="
                fixed
                right-0
                top-0
                z-999
                flex
                h-[100dvh]
                w-full
              max-w-none
                flex-col
                overflow-hidden
                bg-white
                shadow-2xl
                xl:hidden
              "
              aria-label="Mobile navigation"
            >
              <div
                className="
    flex
    min-h-[88px]
    shrink-0
    items-center
    justify-between
    border-b
    border-gray-100
    bg-white
    px-4
    sm:px-5
  "
              >
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className="flex min-w-0 items-center"
                >
                  <Image
                    src="/image/logo.png"
                    alt="Ooshas Prep Logo"
                    width={240}
                    height={110}
                    priority
                    className="
        h-16
        w-auto
        object-contain
        sm:h-[72px]
      "
                  />
                </Link>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href="tel:+919166146538"
                    aria-label="Call Ooshas Prep at +91 9166146538"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#F36C45] transition hover:bg-orange-100 active:scale-95"
                  >
                    <Phone size={19} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    aria-label="Close navigation menu"
                    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-gray-100
      text-gray-700
      transition-all
      hover:bg-orange-50
      hover:text-[#F36C45]
      active:scale-95
    "
                  >
                    <X size={21} />
                  </button>
                </div>
              </div>

              <div
                className="
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-4
                  pb-5
                  sm:px-5
                "
              >
                {!mobileDropdown ? (
                  <div className="space-y-1 pt-4">
                    <div className="mb-4 border-b border-gray-100 pb-4">
                      <button
                        type="button"
                        onClick={() => setMobileAccountOpen((open) => !open)}
                        aria-expanded={mobileAccountOpen}
                        aria-controls="mobile-account-menu"
                        className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:text-[#F36C45]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F36C45] font-bold text-white">
                          {accountUser?.email ? (
                            (
                              accountUser.name?.charAt(0) ||
                              accountUser.email.charAt(0)
                            ).toUpperCase()
                          ) : (
                            <User size={19} />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-slate-900">
                            {accountUser?.email
                              ? accountUser.name || "My account"
                              : "Login / Sign up"}
                          </span>
                          <span className="block truncate text-xs text-slate-500">
                            {accountUser?.email ||
                              "Access your learning dashboard"}
                          </span>
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-slate-500 transition-transform ${mobileAccountOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileAccountOpen && (
                          <motion.div
                            id="mobile-account-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 space-y-1 pl-3">
                              {accountUser?.email ? (
                                <>
                                  <a
                                    href="https://dashboard.ooshasprep.com"
                                    onClick={closeMobileMenu}
                                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-slate-700 hover:text-[#F36C45]"
                                  >
                                    <LayoutDashboard size={17} /> Dashboard
                                  </a>
                                  <a
                                    href="https://dashboard.ooshasprep.com/profile"
                                    onClick={closeMobileMenu}
                                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-slate-700 hover:text-[#F36C45]"
                                  >
                                    <UserCircle size={17} /> My Profile
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      closeMobileMenu();
                                      (logout as () => void)();
                                    }}
                                    className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-red-600 hover:text-red-700"
                                  >
                                    <LogOut size={17} /> Logout
                                  </button>
                                </>
                              ) : (
                                <Link
                                  href="/auth"
                                  onClick={closeMobileMenu}
                                  className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-[#D9542D]"
                                >
                                  <UserCircle size={17} /> Continue to login
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {navItems.map((item: any) => {
                      const isExpanded = mobileDropdown === item.name;

                      return (
                        <div
                          key={item.name}
                          className="
                          border-b
                          border-gray-100
                          last:border-b-0
                        "
                        >
                          {!item.hasDropdown ? (
                            <Link
                              href={item.href}
                              onClick={handleLinkClick}
                              aria-current={
                                isNavItemActive(item) ? "page" : undefined
                              }
                              className={`
                              group
                              flex
                              min-h-[52px]
                              items-center
                              gap-3
                              rounded-xl
                              px-3
                              text-[15px]
                              font-medium
                              transition-all
                              hover:text-[#F36C45]
                              active:scale-[0.99]
                              ${navTabUnderline}
                              ${isNavItemActive(item) ? "font-semibold text-[#D9542D] after:scale-x-0" : "text-gray-700 after:scale-x-0"}
                            `}
                            >
                              <span className="flex-1">{item.name}</span>

                              <ChevronRight
                                size={16}
                                className="
                                text-gray-300
                                transition-colors
                                group-hover:text-[#F36C45]
                              "
                              />
                            </Link>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleDropdownToggle(item.name)}
                                aria-expanded={isExpanded}
                                className={`
                                flex
                                min-h-[54px]
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                text-left
                                text-[15px]
                                font-semibold
                                transition-all
                                ${navTabUnderline}
                                ${
                                  isExpanded || isNavItemActive(item)
                                    ? "text-[#D9542D] after:scale-x-0"
                                    : "text-gray-700 hover:text-[#F36C45] after:scale-x-0"
                                }
                              `}
                              >
                                {/* <div
                                className={`
                                  flex
                                  h-8
                                  w-8
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  transition-colors
                                  ${
                                    isExpanded
                                      ? "bg-white text-[#F36C45] shadow-sm"
                                      : "bg-gray-50 text-gray-500"
                                  }
                                `}
                              >
                                <GraduationCap size={17} />
                              </div> */}

                                <span className="flex-1">{item.name}</span>

                                <ChevronDown
                                  size={18}
                                  className={`
                                  transition-transform
                                  duration-200
                                  ${
                                    isExpanded
                                      ? "rotate-180 text-[#F36C45]"
                                      : "text-gray-400"
                                  }
                                `}
                                />
                              </button>

                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{
                                      height: 0,
                                      opacity: 0,
                                    }}
                                    animate={{
                                      height: "auto",
                                      opacity: 1,
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                    }}
                                    transition={{
                                      duration: 0.22,
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mb-2 mt-1 space-y-1 rounded-2xl bg-orange-50/60 p-2">
                                      {item.dropdownItems?.map((sub: any) => {
                                        const hasSublinks =
                                          sub.sublink && sub.sublink.length > 0;

                                        const isSubOpen =
                                          mobileSubDropdown === sub.slug;

                                        return (
                                          <div
                                            key={sub.slug}
                                            className="overflow-hidden"
                                          >
                                            <div
                                              className="
                                                flex
                                                items-center
                                                rounded-xl
                                                transition
                                                hover:bg-white
                                              "
                                            >
                                              <Link
                                                href={`/${sub.slug}`}
                                                onClick={handleLinkClick}
                                                className="
                                                  group
                                                  flex
                                                  min-h-[54px]
                                                  min-w-0
                                                  flex-1
                                                  items-center
                                                  gap-3
                                                  rounded-xl
                                                  px-2.5
                                                "
                                              >
                                                {/* Icon */}

                                                <div
                                                  className="
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-white
                                                    shadow-sm
                                                  "
                                                >
                                                  {sub.img ? (
                                                    <Image
                                                      src={sub.img}
                                                      alt={sub.name}
                                                      width={23}
                                                      height={23}
                                                      className="object-contain"
                                                    />
                                                  ) : (
                                                    <GraduationCap
                                                      size={17}
                                                      className="text-[#F36C45]"
                                                    />
                                                  )}
                                                </div>

                                                {/* Text */}

                                                <div className="min-w-0 flex-1">
                                                  <div className="flex items-center gap-1.5">
                                                    <span className="block truncate text-sm font-medium text-gray-800 transition-colors group-hover:text-[#F36C45]">
                                                      {sub.name}
                                                    </span>

                                                    {sub.badge && (
                                                      <span
                                                        className="
                                                          shrink-0
                                                          rounded-full
                                                          bg-[#F36C45]/10
                                                          px-1.5
                                                          py-0.5
                                                          text-[8px]
                                                          font-semibold
                                                          text-[#F36C45]
                                                        "
                                                      >
                                                        {sub.badge}
                                                      </span>
                                                    )}
                                                  </div>

                                                  {sub.description && (
                                                    <p className="mt-0.5 truncate text-[11px] text-gray-500">
                                                      {sub.description}
                                                    </p>
                                                  )}
                                                </div>
                                              </Link>

                                              {/* Nested toggle */}

                                              {hasSublinks && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleMobileSubDropdown(
                                                      sub.slug,
                                                    )
                                                  }
                                                  aria-label={`Show ${sub.name} programs`}
                                                  aria-expanded={isSubOpen}
                                                  className="
                                                    mr-1
                                                    flex
                                                    h-10
                                                    w-10
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    text-gray-400
                                                    transition
                                                    hover:bg-orange-50
                                                    hover:text-[#F36C45]
                                                  "
                                                >
                                                  <ChevronRight
                                                    size={17}
                                                    className={`
                                                      transition-transform
                                                      duration-200
                                                      ${
                                                        isSubOpen
                                                          ? "rotate-90 text-[#F36C45]"
                                                          : ""
                                                      }
                                                    `}
                                                  />
                                                </button>
                                              )}
                                            </div>

                                            <AnimatePresence initial={false}>
                                              {hasSublinks && isSubOpen && (
                                                <motion.div
                                                  initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                  }}
                                                  animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                  }}
                                                  exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                  }}
                                                  transition={{
                                                    duration: 0.2,
                                                  }}
                                                  className="
                                                      ml-7
                                                      mr-1
                                                      overflow-hidden
                                                      border-l-2
                                                      border-orange-200
                                                      pl-3
                                                    "
                                                >
                                                  <div className="space-y-0.5 py-1">
                                                    {sub.sublink.map(
                                                      (child: any) => (
                                                        <Link
                                                          key={child.slug}
                                                          href={`/${child.slug}`}
                                                          onClick={
                                                            handleLinkClick
                                                          }
                                                          className="
                                                              group
                                                              flex
                                                              min-h-[44px]
                                                              items-center
                                                              gap-2.5
                                                              rounded-lg
                                                              px-2
                                                              text-sm
                                                              text-gray-600
                                                              transition-all
                                                              hover:bg-white
                                                              hover:text-[#F36C45]
                                                            "
                                                        >
                                                          {/* Small icon */}

                                                          <div
                                                            className="
                                                                flex
                                                                h-6
                                                                w-6
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                              "
                                                          >
                                                            {child.img ? (
                                                              <Image
                                                                src={child.img}
                                                                alt={child.name}
                                                                width={17}
                                                                height={17}
                                                                className="object-contain"
                                                              />
                                                            ) : (
                                                              <span
                                                                className="
                                                                    h-1.5
                                                                    w-1.5
                                                                    rounded-full
                                                                    bg-[#F36C45]
                                                                  "
                                                              />
                                                            )}
                                                          </div>

                                                          {/* Name */}

                                                          <span className="min-w-0 flex-1 truncate">
                                                            {child.name}
                                                          </span>

                                                          {child.badge && (
                                                            <span
                                                              className="
                                                                  shrink-0
                                                                  rounded-full
                                                                  bg-blue-50
                                                                  px-1.5
                                                                  py-0.5
                                                                  text-[8px]
                                                                  font-medium
                                                                  text-blue-600
                                                                "
                                                            >
                                                              {child.badge}
                                                            </span>
                                                          )}

                                                          <ChevronRight
                                                            size={12}
                                                            className="
                                                                shrink-0
                                                                text-gray-300
                                                                transition-colors
                                                                group-hover:text-[#F36C45]
                                                              "
                                                          />
                                                        </Link>
                                                      ),
                                                    )}
                                                  </div>
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    key={mobileDropdown}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pb-8 pt-4"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMobileDropdown(null);
                        setMobileSubDropdown(null);
                      }}
                      className="mb-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#F36C45]"
                    >
                      <ChevronRight size={16} className="rotate-180" /> All
                      sections
                    </button>
                    <div className="mb-6 rounded-3xl bg-gradient-to-br from-[#fff1e8] via-white to-orange-50 p-5 ring-1 ring-orange-100">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F36C45]">
                        Discover
                      </p>
                      <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                        {mobileDropdown}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {mobileDropdown === "Resources"
                          ? "Open a calculator or explore practical study guides."
                          : "Choose a topic below to explore courses, guides and exam information."}
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {navItems
                        .find((item: any) => item.name === mobileDropdown)
                        ?.dropdownItems?.map((group: any) => (
                          <section
                            key={group.slug}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                          >
                            <Link
                              href={navHref(group.slug)}
                              onClick={handleLinkClick}
                              className="group flex items-center gap-3"
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#F36C45]">
                                {group.img ? (
                                  <Image
                                    src={group.img}
                                    alt=""
                                    width={25}
                                    height={25}
                                    className="object-contain"
                                  />
                                ) : mobileDropdown === "Resources" ? (
                                  <Book size={21} />
                                ) : (
                                  <GraduationCap size={21} />
                                )}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block font-semibold group-hover:text-[#F36C45] ${matchesPath(group.slug) || group.sublink?.some((child: any) => matchesPath(child.slug)) ? "text-[#D9542D]" : "text-slate-900"}`}
                                >
                                  {group.name}
                                </span>
                                {group.description && (
                                  <span className="mt-0.5 block line-clamp-2 text-xs text-slate-500">
                                    {group.description}
                                  </span>
                                )}
                              </span>
                              <ArrowRight
                                size={17}
                                className="shrink-0 text-slate-400 group-hover:text-[#F36C45]"
                              />
                            </Link>
                            {group.sublink?.length > 0 && (
                              <div className="mt-4 grid gap-2 border-t border-slate-100 pt-3">
                                {group.sublink.map((child: any) => (
                                  <Link
                                    key={child.slug}
                                    href={navHref(child.slug)}
                                    onClick={handleLinkClick}
                                    className={`flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm transition hover:text-[#F36C45] ${matchesPath(child.slug) ? "font-semibold text-[#D9542D]" : "text-slate-700"}`}
                                  >
                                    <span>{child.name}</span>
                                    <ChevronRight
                                      size={15}
                                      className="shrink-0"
                                    />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </section>
                        ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AuthDrawer isOpen={drawer} setIsOpen={setDrawer} />
    </>
  );
}
