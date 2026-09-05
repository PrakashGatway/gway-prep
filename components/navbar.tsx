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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/hooks/AppStateContext";
import AuthDrawer from "./auth/drawer";
import { useRouter } from "next/navigation";

interface NavbarProps {
  Data?: any[];
}

export function Navbar({ Data }: NavbarProps) {
  const router = useRouter();
  const { user, logout, drawer, setDrawer } = useGlobal();

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

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------
     DATA
  --------------------------------------------------------- */

  const NAVDATA1 = React.useMemo(
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

  const navItems = React.useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        icon: null,
      },

      {
        name: "Test Prep",
        href: "#",
        hasDropdown: true,
        icon: GraduationCap,

        dropdownItems: NAVDATA.filter(
          (subItem: any) => !subItem?.seoMeta?.duplicateOf,
        ).map((item: any) => {
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
        }),
      },

      {
        name: "About Us",
        href: "/about",
        icon: null,
      },

      {
        name: "Services",
        href: "/services",
        icon: null,
      },

      {
        name: "Blogs",
        href: "/blog",
        icon: null,
      },

      {
        name: "Career",
        href: "/career",
        icon: null,
      },

      {
        name: "Contact Us",
        href: "/contact",
        icon: null,
      },
    ],
    [NAVDATA],
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
  };

  const handleDropdownToggle = (itemName: string) => {
    setMobileDropdown((current) => (current === itemName ? null : itemName));

    setMobileSubDropdown(null);
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
  };

  return (
    <>
      <nav
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
              ? "border-b border-gray-100 bg-white/90 shadow-lg backdrop-blur-xl"
              : "border-b border-transparent bg-white/95 backdrop-blur-sm"
          }
        `}
      >
        <div className="mx-auto w-full max-w-7xl px-3 md:px-0">
          <div
            className="
              flex
              min-h-[64px]
              items-center
              justify-between
              gap-3
              py-2.5
              sm:min-h-[70px]
              sm:py-3
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
                width={160}
                height={80}
                priority
                className="
                  h-10
                  w-auto
                  object-contain
                  transition-transform
                  duration-200
                  group-hover:scale-[1.03]
                  sm:h-11
                  lg:h-14
                "
              />
            </Link>


            <div className="ml-auto flex items-center gap-2 lg:hidden">
              {/* Phone */}

              <a
                href="tel:+919166146538"
                aria-label="Call Ooshas Prep"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-orange-100
                  bg-orange-50
                  text-[#F36C45]
                  transition-all
                  duration-200
                  hover:bg-orange-100
                  active:scale-95
                  sm:h-11
                  sm:w-11
                "
              >
                <Phone
                  size={17}
                  strokeWidth={2}
                  className="sm:h-[18px] sm:w-[18px]"
                />
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

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item: any) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(item.name);
                    }
                  }}
                  onMouseLeave={closeDesktopDropdown}
                >
                  {/* Main nav item */}

                  <Link
                    href={item.href}
                    className={`
                      flex
                      items-center
                      gap-1.5
                      rounded-2xl
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        activeDropdown === item.name
                          ? "bg-orange-50 text-[#F36C45]"
                          : "text-gray-600 hover:bg-orange-50/70 hover:text-[#F36C45]"
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
                  </Link>


                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
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
                            left-0
                            top-full
                            z-[600]
                            pt-2
                          "
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={closeDesktopDropdown}
                      >
                        <div
                          className="
                              flex
                              overflow-hidden
                              rounded-2xl
                              border
                              border-gray-100
                              bg-white
                              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                            "
                        >
                          {/* LEFT COLUMN */}

                          <div
                            className="
                                max-h-[520px]
                                min-w-[290px]
                                overflow-y-auto
                                bg-gradient-to-b
                                from-orange-50/80
                                to-white
                                py-2
                                xl:min-w-[330px]
                              "
                          >
                            {item.dropdownItems?.map((dd: any) => {
                              const hasSub =
                                dd.sublink && dd.sublink.length > 0;

                              const isActive = activeSubDropdown === dd.slug;

                              return (
                                <div
                                  key={dd.slug}
                                  className="relative px-2"
                                  onMouseEnter={() => {
                                    setActiveSubDropdown(
                                      hasSub ? dd.slug : null,
                                    );
                                  }}
                                >
                                  <Link
                                    href={`/${dd.slug}`}
                                    onClick={closeDesktopDropdown}
                                    className={`
                                          group
                                          flex
                                          items-center
                                          gap-3
                                          rounded-xl
                                          px-3
                                          py-3
                                          transition-all
                                          ${
                                            isActive
                                              ? "bg-white shadow-sm"
                                              : "hover:bg-white/80"
                                          }
                                        `}
                                  >
                                    {/* Icon */}

                                    <div
                                      className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-white
                                            shadow-sm
                                          "
                                    >
                                      {dd.img ? (
                                        <Image
                                          src={dd.img}
                                          alt={dd.name}
                                          width={28}
                                          height={28}
                                          className="object-contain"
                                        />
                                      ) : (
                                        <GraduationCap
                                          size={18}
                                          className="text-[#F36C45]"
                                        />
                                      )}
                                    </div>

                                    {/* Content */}

                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`
                                                truncate
                                                text-sm
                                                font-medium
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

                                      {dd.description && (
                                        <p className="mt-0.5 truncate text-xs text-gray-500">
                                          {dd.description}
                                        </p>
                                      )}
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
                                    ) : (
                                      <ArrowRight
                                        size={14}
                                        className="
                                              shrink-0
                                              text-gray-300
                                              transition-colors
                                              group-hover:text-[#F36C45]
                                            "
                                      />
                                    )}
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
                                    w-[300px]
                                    max-h-[520px]
                                    overflow-y-auto
                                    border-l
                                    border-gray-100
                                    bg-white
                                  "
                              >
                                {item.dropdownItems?.map((dd: any) => {
                                  if (
                                    dd.slug !== activeSubDropdown ||
                                    !dd.sublink?.length
                                  ) {
                                    return null;
                                  }

                                  return (
                                    <div key={dd.slug} className="p-3">
                                      <div className="mb-2 px-2 py-2">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F36C45]">
                                          Test Prep
                                        </p>

                                        <h4 className="mt-1 text-sm font-semibold text-gray-900">
                                          {dd.name}
                                        </h4>
                                      </div>

                                      <div className="space-y-0.5">
                                        {dd.sublink.map((sub: any) => (
                                          <Link
                                            key={sub.slug}
                                            href={`/${sub.slug}`}
                                            onClick={closeDesktopDropdown}
                                            className="
                                                    group/sub
                                                    flex
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    transition-all
                                                    hover:bg-orange-50
                                                  "
                                          >
                                            <div
                                              className="
                                                      flex
                                                      h-9
                                                      w-9
                                                      shrink-0
                                                      items-center
                                                      justify-center
                                                      rounded-lg
                                                      bg-gray-50
                                                      group-hover/sub:bg-white
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
                                                  size={15}
                                                  className="text-[#F36C45]"
                                                />
                                              )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                              <span className="block truncate text-sm text-gray-700 transition-colors group-hover/sub:text-[#F36C45]">
                                                {sub.name}
                                              </span>

                                              {sub.description && (
                                                <p className="truncate text-xs text-gray-400">
                                                  {sub.description}
                                                </p>
                                              )}
                                            </div>

                                            <ArrowRight
                                              size={12}
                                              className="
                                                      shrink-0
                                                      text-gray-300
                                                      transition-colors
                                                      group-hover/sub:text-[#F36C45]
                                                    "
                                            />
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>


            <div className="hidden items-center gap-3 lg:flex">
              {/* Phone */}

              <a
                href="tel:+919166146538"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  rounded-2xl
                  px-3
                  py-1.5
                  transition-all
                  hover:bg-gray-50
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-50
                  "
                >
                  <Phone size={14} className="text-[#F36C45]" />
                </div>

                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    Call us
                  </div>

                  <div className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#F36C45]">
                    +91 9166146538
                  </div>
                </div>
              </a>

              {/* Login */}

              {!user?.email ? (
                <button
                  type="button"
                  onClick={() => router.push("/auth")}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
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
                lg:hidden
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
                z-[700]
                flex
                h-[100dvh]
                w-[90%]
                max-w-[410px]
                flex-col
                overflow-hidden
                bg-white
                shadow-2xl
                lg:hidden
              "
              aria-label="Mobile navigation"
            >

              <div
                className="
                  flex
                  min-h-[70px]
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
                  className="flex items-center"
                >
                  <Image
                    src="/image/logo.png"
                    alt="Ooshas Prep Logo"
                    width={145}
                    height={70}
                    className="h-9 w-auto object-contain sm:h-10"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                  className="
                    flex
                    h-10
                    w-10
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


              {user?.email && (
                <div className="shrink-0 px-4 pt-4 sm:px-5">
                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-orange-100
                      bg-gradient-to-br
                      from-orange-50
                      via-white
                      to-amber-50
                      p-4
                    "
                  >
                    {/* Decorative circle */}

                    <div
                      className="
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-orange-100/60
                      "
                    />

                    <div className="relative flex items-center gap-3">
                      {/* Avatar */}

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-[#F36C45]
                          to-orange-500
                          text-base
                          font-bold
                          text-white
                          shadow-md
                          shadow-orange-500/20
                        "
                      >
                        {user?.name?.charAt(0)?.toUpperCase() ||
                          user?.email?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </div>

                      {/* User details */}

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F36C45]">
                          Welcome back
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                          {user?.name || "User"}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-4
                  py-4
                  sm:px-5
                "
              >
                <div className="space-y-1">
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
                            className="
                              group
                              flex
                              min-h-[52px]
                              items-center
                              gap-3
                              rounded-xl
                              px-3
                              text-[15px]
                              font-medium
                              text-gray-700
                              transition-all
                              hover:bg-orange-50
                              hover:text-[#F36C45]
                              active:scale-[0.99]
                            "
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
                                ${
                                  isExpanded
                                    ? "bg-orange-50 text-[#F36C45]"
                                    : "text-gray-700 hover:bg-orange-50/70 hover:text-[#F36C45]"
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
              </div>



              <div
                className="
                  shrink-0
                  border-t
                  border-gray-100
                  bg-white
                  p-4
                  sm:p-5
                "
              >
                

                <a
                  href="tel:+919166146538"
                  className="
                    mb-2.5
                    flex
                    min-h-[52px]
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-100
                    bg-gray-50
                    px-3.5
                    transition-all
                    hover:border-orange-100
                    hover:bg-orange-50
                    active:scale-[0.99]
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-100
                    "
                  >
                    <Phone size={16} className="text-[#F36C45]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Call us
                    </p>

                    <p className="text-sm font-semibold text-gray-700">
                      +91 9166146538
                    </p>
                  </div>
                </a>


                {!user?.email ? (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      router.push("/auth");
                    }}
                    className="
                      flex
                      min-h-[52px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-[#F36C45]
                      to-orange-500
                      px-5
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-orange-500/20
                      transition-all
                      hover:-translate-y-0.5
                      hover:shadow-xl
                      active:translate-y-0
                    "
                  >
                    <User size={18} />
                    Get Started
                  </button>
                ) : (
                  

                  <div className="space-y-1.5">
                    {/* Dashboard */}

                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();

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
                        px-3
                        text-left
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-orange-50
                        hover:text-[#F36C45]
                      "
                    >
                      <LayoutDashboard size={19} strokeWidth={1.8} />

                      <span>Dashboard</span>

                      <ChevronRight
                        size={15}
                        className="ml-auto text-gray-300"
                      />
                    </button>

                    {/* Profile */}

                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();

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
                        px-3
                        text-left
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-orange-50
                        hover:text-[#F36C45]
                      "
                    >
                      <User size={19} strokeWidth={1.8} />

                      <span>My Profile</span>

                      <ChevronRight
                        size={15}
                        className="ml-auto text-gray-300"
                      />
                    </button>

                    {/* Logout */}

                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();
                        logout();
                      }}
                      className="
                        flex
                        min-h-[48px]
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        text-left
                        text-sm
                        font-medium
                        text-red-500
                        transition
                        hover:bg-red-50
                      "
                    >
                      <LogOut size={19} strokeWidth={1.8} />

                      <span>Logout</span>
                    </button>
                  </div>
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


