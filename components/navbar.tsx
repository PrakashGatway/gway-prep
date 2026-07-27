"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  User,
  LayoutDashboard,
  GraduationCap,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/hooks/AppStateContext";
import AuthDrawer from "./auth/drawer";
import { useRouter } from "next/navigation";

export function Navbar({ Data }: any) {
  const router = useRouter();
  const { user, logout, drawer, setDrawer } = useGlobal();

  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = React.useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(null);

  // ---- DATA (only change here if you need different structure) ----
  const NAVDATA = React.useMemo(
    () =>
      Data?.filter(
        (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
      ) || [],
    [Data],
  );

  const navItems = React.useMemo(
    () => [
      { name: "Home", href: "/", icon: null },
      {
        name: "Test Prep",
        href: "#",
        hasDropdown: true,
        icon: GraduationCap,
        dropdownItems: NAVDATA.filter(
          (subItem: any) => !subItem?.seoMeta?.duplicateOf,
        ).map((item: any) => ({
          name: item.seoMeta.navTitle,
          img: item?.seoMeta?.navIcon,
          slug: item.seoMeta.canonicalUrl,
          description: item.seoMeta.navSubtitle,
          badge: item.seoMeta?.badge || null,
          sublink: NAVDATA.filter(
            (subItem: any) => subItem?.seoMeta?.duplicateOf === item?.name,
          ).map((ele: any) => ({
            name: ele.seoMeta.navTitle,
            img: ele?.seoMeta?.navIcon,
            slug: ele.seoMeta.canonicalUrl,
            description: ele.seoMeta.navSubtitle,
            badge: ele.seoMeta?.badge || null,
          })),
        })),
      },
      { name: "About Us", href: "/about", icon: null },
      { name: "Services", href: "/services", icon: null },
      { name: "Blogs", href: "/blog", icon: null },
      { name: "Career", href: "/career", icon: null },
      { name: "Contact Us", href: "/contact", icon: null },
    ],
    [NAVDATA],
  );

  // Scroll handler
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setMobileDropdown(null);
  };

  const handleDropdownToggle = (itemName: string) => {
    setMobileDropdown(mobileDropdown === itemName ? null : itemName);
  };

  // Close everything when mouse leaves the whole dropdown area
  const closeDesktopDropdown = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  return (
    <>
      <nav
        className={`sticky top-0 left-0 right-0 z-[500] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src="/image/logo.png"
                alt="Ooshas Prep Logo"
                width={160}
                height={80}
                className="h-14 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(item.name);
                    }
                  }}
                  onMouseLeave={closeDesktopDropdown}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all duration-200
                      ${
                        activeDropdown === item.name
                          ? "text-[#F36C45] bg-orange-50"
                          : "text-gray-600 hover:text-[#F36C45] hover:bg-orange-50/70"
                      }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-[10%]  top-full pt-2 z-50"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={closeDesktopDropdown}
                      >
                        <div className="bg-white rounded border border-gray-100 shadow-xl overflow-hidden flex">
                          
                          <div className="py-2 max-h-[520px] overflow-y-auto min-w-[280px] xl:min-w-[320px] bg-orange-50/60">
                            {item.dropdownItems?.map((dd: any) => {
                              const hasSub = dd.sublink && dd.sublink.length > 0;
                              const isActive = activeSubDropdown === dd.slug;

                              return (
                                <div
                                  key={dd.slug}
                                  onMouseEnter={() => {
                                    setActiveSubDropdown(hasSub ? dd.slug : null);
                                  }}
                                  className="relative"
                                >
                                  <Link
                                    href={`/${dd.slug}`}
                                    className={`group flex items-center gap-3 px-4 py-3 transition-all ${
                                      isActive
                                        ? "bg-white shadow-sm"
                                        : "hover:bg-white/80"
                                    }`}
                                    onClick={closeDesktopDropdown}
                                  >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
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

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`font-medium text-sm transition-colors ${
                                            isActive
                                              ? "text-[#F36C45]"
                                              : "text-gray-800 group-hover:text-[#F36C45]"
                                          }`}
                                        >
                                          {dd.name}
                                        </span>
                                        {dd.badge && (
                                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F36C45]/10 text-[#F36C45] font-medium whitespace-nowrap">
                                            {dd.badge}
                                          </span>
                                        )}
                                      </div>
                                      {dd.description && (
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                          {dd.description}
                                        </p>
                                      )}
                                    </div>

                                    {hasSub ? (
                                      <ChevronRight
                                        size={16}
                                        className={`flex-shrink-0 transition-colors ${
                                          isActive
                                            ? "text-[#F36C45]"
                                            : "text-gray-300 group-hover:text-[#F36C45]"
                                        }`}
                                      />
                                    ) : (
                                      <ArrowRight
                                        size={14}
                                        className="text-gray-300 group-hover:text-[#F36C45] transition-colors flex-shrink-0"
                                      />
                                    )}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>

                          {/* Right Column – Sub items (stays open while hovering left or right) */}
                          <AnimatePresence mode="wait">
                            {activeSubDropdown && (
                              <motion.div
                                key={activeSubDropdown}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.15 }}
                                className="border-l border-gray-100 bg-white w-[300px] max-h-[520px] overflow-y-auto"
                              >
                                {item.dropdownItems?.map((dd: any) => {
                                  if (
                                    dd.slug === activeSubDropdown &&
                                    dd.sublink?.length > 0
                                  ) {
                                    return (
                                      <div key={dd.slug} className="p-3">
                                        <div className="px-2 py-2 mb-1">
                                          <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                            {dd.name} Programs
                                          </h4>
                                        </div>
                                        <div className="space-y-0.5">
                                          {dd.sublink.map((sub: any) => (
                                            <Link
                                              key={sub.slug}
                                              href={`/${sub.slug}`}
                                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-all group/sub"
                                              onClick={closeDesktopDropdown}
                                            >
                                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50 group-hover/sub:bg-orange-100 transition-colors">
                                                {sub.img ? (
                                                  <Image
                                                    src={sub.img}
                                                    alt={sub.name}
                                                    width={22}
                                                    height={22}
                                                    className="object-contain"
                                                  />
                                                ) : (
                                                  <GraduationCap
                                                    size={14}
                                                    className="text-[#F36C45]"
                                                  />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <span className="text-sm text-gray-700 group-hover/sub:text-[#F36C45] transition-colors">
                                                  {sub.name}
                                                </span>
                                                {sub.description && (
                                                  <p className="text-xs text-gray-400 truncate">
                                                    {sub.description}
                                                  </p>
                                                )}
                                              </div>
                                              <ArrowRight
                                                size={12}
                                                className="text-gray-300 group-hover/sub:text-[#F36C45] flex-shrink-0"
                                              />
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
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

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919166146538"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#F36C45]/10 flex items-center justify-center">
                  <Phone size={18} className="text-[#F36C45]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Call us</div>
                  <div className="font-semibold text-sm text-gray-700 group-hover:text-[#F36C45]">
                    +91 9166146538
                  </div>
                </div>
              </a>

              {!user?.email ? (
                <button
                  onClick={() => router.push("/auth")}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#F36C45] to-orange-500 text-white font-medium flex items-center gap-2 hover:shadow-xl hover:shadow-orange-500/30 transition-all active:scale-95"
                >
                  <User size={18} />
                  Get Started
                </button>
              ) : (
                <button
                  onClick={() =>
                    (window.location.href = "https://dashboard.ooshasprep.com")
                  }
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-primary text-white font-medium flex items-center gap-2 hover:shadow-lg cursor-pointer hover:shadow-orange-500/30 transition-all active:scale-95"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-3 rounded-2xl hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={28} className="text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-[90%] max-w-[400px] bg-white z-[500] shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/image/logo.png"
                    alt="Logo"
                    width={140}
                    height={50}
                    className="h-9 w-auto"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 hover:bg-gray-100 rounded-2xl"
                    aria-label="Close menu"
                  >
                    <X size={26} />
                  </button>
                </div>

                {/* User Info */}
                {user?.email && (
                  <div className="mb-8 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F36C45] to-orange-600 text-white flex items-center justify-center text-2xl font-semibold">
                        {user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold truncate">{user.email}</p>
                        <p className="text-sm text-gray-500">Welcome back</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nav Links */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="border-b border-gray-100 last:border-none pb-1"
                    >
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => handleDropdownToggle(item.name)}
                            className="w-full flex justify-between items-center py-4 px-2 text-left font-medium hover:text-[#F36C45]"
                          >
                            <span className="flex items-center gap-3">
                              {item.icon && <item.icon size={20} />}
                              {item.name}
                            </span>
                            <ChevronDown
                              className={`transition-transform ${
                                mobileDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 pr-2 overflow-hidden"
                              >
                                {item.dropdownItems?.map((sub: any) => (
                                  <div key={sub.slug}>
                                    <Link
                                      href={`/${sub.slug}`}
                                      onClick={handleLinkClick}
                                      className="flex gap-3 py-3 px-3 rounded-xl hover:bg-orange-50 group"
                                    >
                                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50 group-hover:bg-orange-100 transition-colors">
                                        {sub.img ? (
                                          <Image
                                            src={sub.img}
                                            alt={sub.name}
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
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm group-hover:text-[#F36C45] transition-colors">
                                          {sub.name}
                                        </div>
                                        {sub.description && (
                                          <div className="text-xs text-gray-500 truncate">
                                            {sub.description}
                                          </div>
                                        )}
                                      </div>
                                      {sub.sublink && sub.sublink.length > 0 && (
                                        <ChevronRight
                                          size={16}
                                          className="text-gray-300 flex-shrink-0"
                                        />
                                      )}
                                    </Link>

                                    {/* Mobile Sublinks */}
                                    {sub.sublink && sub.sublink.length > 0 && (
                                      <div className="ml-12 space-y-0.5 border-l-2 border-orange-200 pl-3 mb-2">
                                        {sub.sublink.map((subSub: any) => (
                                          <Link
                                            key={subSub.slug}
                                            href={`/${subSub.slug}`}
                                            onClick={handleLinkClick}
                                            className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-orange-50/50 text-sm text-gray-600 hover:text-[#F36C45] transition-all"
                                          >
                                            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                                              {subSub.img ? (
                                                <Image
                                                  src={subSub.img}
                                                  alt={subSub.name}
                                                  width={16}
                                                  height={16}
                                                  className="object-contain"
                                                />
                                              ) : (
                                                <ChevronRight
                                                  size={12}
                                                  className="text-gray-300"
                                                />
                                              )}
                                            </div>
                                            <span>{subSub.name}</span>
                                            {subSub.badge && (
                                              <span className="text-[8px] px-1.5 py-px rounded-full bg-blue-50 text-blue-600 font-medium">
                                                {subSub.badge}
                                              </span>
                                            )}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 py-4 px-2 font-medium hover:text-[#F36C45] rounded-2xl hover:bg-orange-50"
                        >
                          {item.icon && <item.icon size={20} />}
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile CTAs */}
                <div className="mt-10 space-y-4">
                  <a
                    href="tel:+919166146538"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl font-medium"
                  >
                    <Phone className="text-[#F36C45]" />
                    +91 9166146538
                  </a>

                  {!user?.email ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/auth");
                      }}
                      className="w-full py-4 bg-gradient-to-r from-[#F36C45] to-orange-500 text-white rounded-2xl font-medium"
                    >
                      Get Started
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        window.location.href =
                          "https://dashboard.ooshasprep.com";
                      }}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-primary text-white rounded-2xl font-medium"
                    >
                      Go to Dashboard
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthDrawer isOpen={drawer} setIsOpen={setDrawer} />
    </>
  );
}





// "use client";

// import * as React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   ChevronDown,
//   Menu,
//   X,
//   Phone,
//   User,
//   LayoutDashboard,
//   GraduationCap,
//   ArrowRight,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useGlobal } from "@/hooks/AppStateContext";
// import AuthDrawer from "./auth/drawer";
// import { useRouter } from "next/navigation";

// export function Navbar({ Data }: any) {
//   // console.log("navdata",Data)
//   const router = useRouter();
//   const { user, logout, drawer, setDrawer } = useGlobal();

//   const [isOpen, setIsOpen] = React.useState(false);
//   const [scrolled, setScrolled] = React.useState(false);
//   const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
//     null,
//   );
//   const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(
//     null,
//   );

//   const NAVDATA = React.useMemo(
//     () =>
//       Data?.filter(
//         (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
//       ) || [],
//     [Data],
//   );

//   const navItems = React.useMemo(
//     () => [
//       { name: "Home", href: "/", icon: null },
//       { name: "About Us", href: "/about", icon: null },
//       { name: "Services", href: "/services", icon: null },
//       {
//         name: "Test Prep",
//         href: "#",
//         hasDropdown: true,
//         icon: GraduationCap,
//         dropdownItems: NAVDATA.map((item: any) => ({
//           name: item.seoMeta.navTitle,
//           img: item?.seoMeta?.navIcon,
//           slug: item.seoMeta.canonicalUrl,
//           description: item.seoMeta.navSubtitle,
//           badge: item.seoMeta?.badge || null,
//           sublink: NAVDATA.filter((subItem: any) => subItem?.seoMeta?.duplicateOf === item?.name).map((ele : any) => ({
//             name: item.seoMeta.navTitle,
//             img: item?.seoMeta?.navIcon,
//             slug: item.seoMeta.canonicalUrl,
//             description: item.seoMeta.navSubtitle,
//             badge: item.seoMeta?.badge || null,
//           }) )
//         })),
//       },
//       { name: "Blogs", href: "/blog", icon: null },
//       { name: "Career", href: "/career", icon: null },
//       { name: "Contact Us", href: "/contact", icon: null },
//     ],
//     [NAVDATA],
//   );

//   // Scroll handler
//   React.useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Body scroll lock
//   React.useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const handleLinkClick = () => {
//     setIsOpen(false);
//     setMobileDropdown(null);
//   };

//   const handleDropdownToggle = (itemName: string) => {
//     setMobileDropdown(mobileDropdown === itemName ? null : itemName);
//   };

//   return (
//     <>
//       <nav
//         className={`sticky top-0 left-0 right-0 z-[500] transition-all duration-300 ${
//           scrolled
//             ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100"
//             : "bg-white/95 backdrop-blur-sm"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-3">
//             {/* Logo */}
//             <Link href="/" className="flex-shrink-0 group">
//               <Image
//                 src="/image/logo.png"
//                 alt="Ooshas Prep Logo"
//                 width={160}
//                 height={80}
//                 className="h-14 w-auto transition-transform group-hover:scale-105"
//                 priority
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-1">
//               {navItems.map((item) => (
//                 <div
//                   key={item.name}
//                   className="relative group"
//                   onMouseEnter={() =>
//                     item.hasDropdown && setActiveDropdown(item.name)
//                   }
//                   onMouseLeave={() => setActiveDropdown(null)}
//                 >
//                   <Link
//                     href={item.href}
//                     className={`flex items-center gap-1.5 px-2 py-2.5 text-sm font-medium rounded-2xl transition-all duration-200
//                       ${
//                         activeDropdown === item.name
//                           ? "text-[#F36C45] bg-orange-50"
//                           : "text-gray-600 hover:text-[#F36C45] hover:bg-orange-50/70"
//                       }`}
//                   >
//                     {/* {item.icon && <item.icon size={18} />} */}
//                     <span>{item.name}</span>
//                     {item.hasDropdown && (
//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`}
//                       />
//                     )}
//                   </Link>

//                   {/* Desktop Dropdown */}
//                   {item.hasDropdown && activeDropdown === item.name && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[420px] xl:w-[500px]"
//                     >
//                       <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
//                         {/* <div className="px-6 py-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
//                           <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//                             <GraduationCap
//                               className="text-[#F36C45]"
//                               size={18}
//                             />
//                             Test Preparation Programs
//                           </h3>
//                           <p className="text-sm text-gray-500 mt-1">
//                             Choose the right path for your goals
//                           </p>
//                         </div> */}

//                         <div className="p-3 max-h-[500px] overflow-y-auto">
//                           {item.dropdownItems?.map((dd: any, idx: number) => (
//                             <Link
//                               key={dd.slug}
//                               href={`/${dd.slug}`}
//                               className="group flex gap-4 p-3 rounded-xl hover:bg-orange-50 transition-all"
//                               onClick={() => setActiveDropdown(null)}
//                             >
//                               <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
//                                 {dd.img ? (
//                                   <Image
//                                     src={dd.img}
//                                     alt={dd.name}
//                                     width={44}
//                                     height={44}
//                                     className="object-contain"
//                                   />
//                                 ) : (
//                                   <GraduationCap
//                                     size={22}
//                                     className="text-[#F36C45]"
//                                   />
//                                 )}
//                               </div>

//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2">
//                                   <span className="font-semibold text-gray-800 group-hover:text-[#F36C45]">
//                                     {dd.name}
//                                   </span>
//                                   {dd.badge && (
//                                     <span className="text-[10px] px-2 py-px rounded-full bg-[#F36C45]/10 text-[#F36C45] font-medium">
//                                       {dd.badge}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
//                                   {dd.description}
//                                   {/* {console.log(dd?.sublink,"dd?.sublink")} */}
//                                 </p>
//                               </div>

//                               <ArrowRight
//                                 className="text-gray-300 group-hover:text-[#F36C45] mt-3 transition-transform group-hover:translate-x-0.5"
//                                 size={16}
//                               />
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Desktop CTAs */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a
//                 href="tel:+919166146538"
//                 className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group"
//               >
//                 <div className="w-8 h-8 rounded-full bg-[#F36C45]/10 flex items-center justify-center">
//                   <Phone size={18} className="text-[#F36C45]" />
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-400">Call us</div>
//                   <div className="font-semibold text-sm text-gray-700 group-hover:text-[#F36C45]">
//                     +91 9166146538
//                   </div>
//                 </div>
//               </a>

//               {!user?.email ? (
//                 <button
//                   onClick={() => router.push("/auth")}
//                   className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#F36C45] to-orange-500 text-white font-medium flex items-center gap-2 hover:shadow-xl hover:shadow-orange-500/30 transition-all active:scale-95"
//                 >
//                   <User size={18} />
//                   Get Started
//                 </button>
//               ) : (
//                 <button
//                   onClick={() =>
//                     (window.location.href = "https://dashboard.ooshasprep.com")
//                   }
//                   className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-primary text-white font-medium
//                    flex items-center gap-2 hover:shadow-lg cursor-pointer hover:shadow-orange-500/30 transition-all active:scale-95"
//                 >
//                   <LayoutDashboard size={18} />
//                   Dashboard
//                 </button>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(true)}
//               className="lg:hidden p-3 rounded-2xl hover:bg-gray-100 transition-colors"
//               aria-label="Open navigation menu"
//             >
//               <Menu size={28} className="text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]"
//               onClick={() => setIsOpen(false)}
//             />

//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 30, stiffness: 280 }}
//               className="fixed top-0 right-0 h-full w-[90%] max-w-[400px] bg-white z-[500] shadow-2xl overflow-y-auto"
//             >
//               <div className="p-6">
//                 {/* Drawer Header */}
//                 <div className="flex items-center justify-between mb-8">
//                   <Image
//                     src="/image/logo.png"
//                     alt="Logo"
//                     width={140}
//                     height={50}
//                     className="h-9 w-auto"
//                   />
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="p-3 hover:bg-gray-100 rounded-2xl"
//                     aria-label="Close menu"
//                   >
//                     <X size={26} />
//                   </button>
//                 </div>

//                 {/* User Info */}
//                 {user?.email && (
//                   <div className="mb-8 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl">
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F36C45] to-orange-600 text-white flex items-center justify-center text-2xl font-semibold">
//                         {user.email[0].toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-semibold truncate">{user.email}</p>
//                         <p className="text-sm text-gray-500">Welcome back</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Nav Links */}
//                 <div className="space-y-2">
//                   {navItems.map((item) => (
//                     <div
//                       key={item.name}
//                       className="border-b border-gray-100 last:border-none pb-1"
//                     >
//                       {item.hasDropdown ? (
//                         <>
//                           <button
//                             onClick={() => handleDropdownToggle(item.name)}
//                             className="w-full flex justify-between items-center py-4 px-2 text-left font-medium hover:text-[#F36C45]"
//                           >
//                             <span className="flex items-center gap-3">
//                               {item.icon && <item.icon size={20} />}
//                               {item.name}
//                             </span>
//                             <ChevronDown
//                               className={`transition-transform ${mobileDropdown === item.name ? "rotate-180" : ""}`}
//                             />
//                           </button>

//                           <AnimatePresence>
//                             {mobileDropdown === item.name && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="pl-4 pr-2 overflow-hidden"
//                               >
//                                 {item.dropdownItems?.map((sub: any) => (
//                                   <Link
//                                     key={sub.slug}
//                                     href={`/${sub.slug}`}
//                                     onClick={handleLinkClick}
//                                     className="flex gap-4 py-4 px-4 rounded-2xl hover:bg-orange-50 group"
//                                   >
//                                     {/* ... same dropdown item UI as desktop ... */}
//                                     <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
//                                       {sub.img ? (
//                                         <Image
//                                           src={sub.img}
//                                           alt=""
//                                           width={36}
//                                           height={36}
//                                         />
//                                       ) : (
//                                         <GraduationCap
//                                           size={20}
//                                           className="text-[#F36C45]"
//                                         />
//                                       )}
//                                     </div>
//                                     <div>
//                                       <div className="font-medium group-hover:text-[#F36C45]">
//                                         {sub.name}
//                                       </div>
//                                       <div className="text-xs text-gray-500 line-clamp-2">
//                                         {sub.description}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </>
//                       ) : (
//                         <Link
//                           href={item.href}
//                           onClick={handleLinkClick}
//                           className="flex items-center gap-3 py-4 px-2 font-medium hover:text-[#F36C45] rounded-2xl hover:bg-orange-50"
//                         >
//                           {item.icon && <item.icon size={20} />}
//                           {item.name}
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Mobile CTAs */}
//                 <div className="mt-10 space-y-4">
//                   <a
//                     href="tel:+919166146538"
//                     className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl font-medium"
//                   >
//                     <Phone className="text-[#F36C45]" />
//                     +91 9166146538
//                   </a>

//                   {!user?.email ? (
//                     <button
//                       onClick={() => {
//                         setIsOpen(false);
//                         router.push("/auth");
//                       }}
//                       className="w-full py-4 bg-gradient-to-r from-[#F36C45] to-orange-500 text-white rounded-2xl font-medium"
//                     >
//                       Get Started
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         setIsOpen(false);
//                         window.location.href =
//                           "https://dashboard.ooshasprep.com";
//                       }}
//                       className="w-full py-4 bg-gradient-to-r from-orange-500 to-primary text-white rounded-2xl font-medium"
//                     >
//                       Go to Dashboard
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <AuthDrawer isOpen={drawer} setIsOpen={setDrawer} />
//     </>
//   );
// }



