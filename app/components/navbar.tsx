"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  HeadsetIcon,
  User,
  LogOut,
  LayoutDashboard,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/hooks/AppStateContext";
import AuthDrawer from "./auth/drawer";
import { useRouter } from "next/navigation";

export function Navbar({ Data }: any) {
  const Router = useRouter();
  const NAVDATA =
    Data?.filter(
      (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
    ) || [];

  const [isOpen, setIsOpen] = React.useState(false);
  const { user, course, logout, drawer, setDrawer } = useGlobal();

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(
    null,
  );
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/", icon: Globe },
    { name: "About Us", href: "/about", icon: Sparkles },
    { name: "Services", href: "/services", icon: BookOpen },
    {
      name: "Test Prep",
      href: "#",
      hasDropdown: true,
      icon: GraduationCap,
      dropdownItems: NAVDATA.map((item: any) => ({
        name: item.seoMeta.navTitle,
        img: item?.seoMeta?.navIcon,
        slug: item.seoMeta.canonicalUrl,
        description: item.seoMeta.navSubtitle,
        badge: item.seoMeta?.badge || null,
      })),
    },
    { name: "Blogs", href: "/blog", icon: Award },
    { name: "Career", href: "/career", icon: Clock },
    { name: "Contact Us", href: "/contact", icon: Phone },
  ];

  React.useEffect(() => {
    if (scrolled && isOpen) {
      setIsOpen(false);
    }
  }, [scrolled, isOpen]);

  const handleLinkClick = (item: any) => {
    if (!item.hasDropdown) {
      setIsOpen(false);
      setMobileDropdown(null);
    }
  };

  const handleDropdownToggle = (itemName: string) => {
    setMobileDropdown(mobileDropdown === itemName ? null : itemName);
  };

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const mobileDrawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100/50" 
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo with hover effect */}
            <Link 
              href="/" 
              className="flex-shrink-0 group transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/image/logo.png"
                alt="Logo"
                width={140}
                height={60}
                className="w-auto h-10 sm:h-12 transition-all duration-300 group-hover:brightness-110"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-3 xl:px-2 py-2.5 
                      text-sm font-medium text-gray-600 
                      hover:text-[#F36C45] transition-all duration-300
                      rounded-xl relative
                      ${activeDropdown === item.name ? 'text-[#F36C45] bg-orange-50/50' : ''}
                      ${hoveredItem === item.name ? 'text-[#F36C45]' : ''}
                    `}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    )}
                    {!item.hasDropdown && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#F36C45] rounded-full"
                        initial={false}
                        animate={{ 
                          width: hoveredItem === item.name ? '70%' : '0%',
                          x: hoveredItem === item.name ? '-50%' : '-50%'
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </Link>

                  {/* Enhanced Dropdown */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[400px] xl:w-[480px]"
                    >
                      <div className="rounded-2xl bg-white border border-gray-100 shadow-2xl shadow-black/5 overflow-hidden">
                        {/* Gradient header */}
                        <div className="relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 opacity-50" />
                          <div className="relative px-6 py-4 border-b border-gray-100/50">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <GraduationCap size={16} className="text-[#F36C45]" />
                              Explore Our Test Prep Programs
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              Choose the right preparation for your goals
                            </p>
                          </div>
                        </div>

                        {/* Dropdown items */}
                        <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                          {item.dropdownItems?.map((dropdownItem: any, index: number) => (
                            <motion.div
                              key={dropdownItem.name}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link
                                href={`/${dropdownItem.slug}`}
                                className="group/item relative flex items-start gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 cursor-pointer"
                              >
                                {/* Icon/Image */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center overflow-hidden group-hover/item:scale-110 transition-transform duration-300">
                                  {dropdownItem.img ? (
                                    <Image
                                      src={dropdownItem.img}
                                      alt={dropdownItem.name}
                                      width={40}
                                      height={40}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <GraduationCap size={20} className="text-[#F36C45]" />
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800 group-hover/item:text-[#F36C45] transition-colors text-sm">
                                      {dropdownItem.name}
                                    </span>
                                    {dropdownItem.badge && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F36C45]/10 text-[#F36C45]">
                                        {dropdownItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                    {dropdownItem.description}
                                  </p>
                                </div>

                                {/* Arrow indicator */}
                                <ArrowRight 
                                  size={14} 
                                  className="text-gray-400 group-hover/item:text-[#F36C45] transition-all duration-300 group-hover/item:translate-x-1 flex-shrink-0 mt-2" 
                                />
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Footer CTA */}
                        {/* <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-gray-100/50">
                          <Link
                            href="/test-prep"
                            className="group flex items-center justify-between text-sm font-medium text-[#F36C45] hover:text-[#e05a33] transition-colors"
                          >
                            <span>View all test prep options</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div> */}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F36C45] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                  <Phone size={18} className="relative text-[#F36C45] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-medium">Call us</span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-[#F36C45] transition-colors">
                    +91 9166146538
                  </span>
                </div>
              </motion.div>

              {!user?.email ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => Router.push("/auth")}
                  className="group relative overflow-hidden px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F36C45] to-orange-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <User size={16} />
                    Login / Signup
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#F36C45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    (window.location.href = "https://dashboard.ooshasprep.com")
                  }
                  className="group relative overflow-hidden px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 group relative"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F36C45]/0 to-orange-500/0 rounded-xl transition-all duration-300 group-hover:from-[#F36C45]/5 group-hover:to-orange-500/5" />
              <Menu size={26} className="relative text-gray-700 group-hover:text-[#F36C45] transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer - Enhanced */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Enhanced Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* Enhanced Drawer */}
              <motion.div
                className="fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white z-50 shadow-2xl overflow-y-auto"
                variants={mobileDrawerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-6">
                  {/* Header with gradient */}
                  <div className="relative mb-8 pb-6 border-b border-gray-100">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full opacity-50 blur-2xl" />
                    <div className="flex items-center justify-between relative">
                      <Image
                        src="/image/logo.png"
                        alt="Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                      />
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(false)}
                        className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 group relative"
                        aria-label="Close menu"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F36C45]/0 to-orange-500/0 rounded-xl transition-all duration-300 group-hover:from-[#F36C45]/5 group-hover:to-orange-500/5" />
                        <X size={22} className="relative group-hover:text-[#F36C45] transition-colors" />
                      </motion.button>
                    </div>
                  </div>

                  {/* User Profile (if logged in) */}
                  {user?.email && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F36C45] to-orange-400 flex items-center justify-center text-white font-semibold text-lg">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500">Welcome back! 👋</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Items - Enhanced */}
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-50 last:border-0"
                      >
                        {item.hasDropdown ? (
                          <div>
                            <button
                              onClick={() => handleDropdownToggle(item.name)}
                              className="w-full flex justify-between items-center py-4 px-2 text-left font-medium text-gray-800 hover:text-[#F36C45] transition-all duration-300 rounded-xl hover:bg-orange-50/50"
                            >
                              <span className="flex items-center gap-3">
                                {item.icon && <item.icon size={18} className="text-gray-400" />}
                                {item.name}
                              </span>
                              <motion.div
                                animate={{ rotate: mobileDropdown === item.name ? 180 : 0 }}
                                transition={{ duration: 0.3, type: "spring" }}
                              >
                                <ChevronDown size={18} className="text-gray-400" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {mobileDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-3 space-y-1 pl-4 pr-2">
                                    {item.dropdownItems?.map((subItem: any, idx: number) => (
                                      <motion.div
                                        key={subItem.slug}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                      >
                                        <Link
                                          href={`/${subItem.slug}`}
                                          className="flex items-start gap-3 py-3 px-4 rounded-xl text-sm text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:text-[#F36C45] transition-all duration-300 group"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {subItem.img ? (
                                              <Image
                                                src={subItem.img}
                                                alt={subItem.name}
                                                width={30}
                                                height={30}
                                                className="w-6 h-6 object-cover"
                                              />
                                            ) : (
                                              <GraduationCap size={16} className="text-[#F36C45]" />
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-800 group-hover:text-[#F36C45] transition-colors">
                                              {subItem.name}
                                            </div>
                                            {subItem.description && (
                                              <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                                {subItem.description}
                                              </div>
                                            )}
                                          </div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 py-4 px-2 text-gray-800 font-medium hover:text-[#F36C45] transition-all duration-300 rounded-xl hover:bg-orange-50/50"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.icon && <item.icon size={18} className="text-gray-400" />}
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="mt-8 space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 py-3.5 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 font-medium shadow-sm">
                        <Phone size={18} className="text-[#F36C45]" />
                        <span>+91 9166146538</span>
                      </button>
                    </motion.div>

                    {!user?.email ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsOpen(false);
                          Router.push("/auth");
                        }}
                        className="w-full bg-gradient-to-r from-[#F36C45] to-orange-500 text-white py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                      >
                        <User size={18} />
                        Login / Signup
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsOpen(false);
                          window.location.href = "https://dashboard.ooshasprep.com";
                        }}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                      >
                        <LayoutDashboard size={18} />
                        Go to Dashboard
                      </motion.button>
                    )}
                  </div>

                  {/* Quick Contact Info */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} className="text-[#F36C45]" />
                        <span>info@ooshasprep.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={14} className="text-[#F36C45]" />
                        <span>Find us</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />

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
//   HeadsetIcon
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useGlobal } from "@/hooks/AppStateContext";
// import AuthDrawer from "./auth/drawer";
// import { useRouter } from "next/navigation";

// export function Navbar({ Data }: any) {
//   const Router = useRouter();
//   const NAVDATA =
//     Data?.filter(
//       (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
//     ) || [];
//   console.log(NAVDATA, "data");

//   const [isOpen, setIsOpen] = React.useState(false);
//   const { user, course, logout, drawer, setDrawer } = useGlobal();

//   const [scrolled, setScrolled] = React.useState(false);
//   const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(
//     null,
//   );

//   React.useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   React.useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About Us", href: "/about" },
//     { name: "Services", href: "/services" },
//     {
//       name: "Test Prep",
//       href: "#",
//       hasDropdown: true,
//       dropdownItems: NAVDATA.map((item: any) => ({
//         name: item.seoMeta.navTitle,
//         img : item?.seoMeta?.navIcon,
//         slug: item.seoMeta.canonicalUrl,
//         description: item.seoMeta.navSubtitle,
//       })),
//     },
//     { name: "Blogs", href: "/blog" },
//     { name: "Career", href: "/career" },
//     { name: "Contact Us", href: "/contact" },
//   ];

//   // Close mobile menu on scroll
//   React.useEffect(() => {
//     if (scrolled && isOpen) {
//       setIsOpen(false);
//     }
//   }, [scrolled, isOpen]);

//   const handleLinkClick = (item: any) => {
//     if (!item.hasDropdown) {
//       setIsOpen(false);
//       setMobileDropdown(null);
//     }
//   };

//   const handleDropdownToggle = (itemName: string) => {
//     setMobileDropdown(mobileDropdown === itemName ? null : itemName);
//   };

//   return (
//     <>
//       <nav
//         className={`md:sticky top-0 z-50 transition-all duration-300 ${
//           scrolled ? "bg-white/60 backdrop-blur-md shadow-md" : "bg-white"
//         }`}
//       >
//         <div className="  max-w-7xl mx-auto ">
//           <div className="flex h-20 items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex-shrink-0">
//               <Image
//                 src="/image/logo.png"
//                 alt="Logo"
//                 width={140}
//                 height={60}
//                 className="w-auto h-10 sm:h-12"
//                 priority
//               />
//             </Link>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center gap-6">
//               {navItems.map((item) => (
//                 <div key={item.name} className="relative group">
//                   <Link
//                     href={item.href}
//                     className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#F36C45] transition"
//                   >
//                     {item.name}
//                     {item.hasDropdown && <ChevronDown size={16} />}
//                   </Link>

//                   {item.hasDropdown && (
//                     <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                       <motion.div
//                         initial={{ y: -10, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ duration: 0.2 }}
//                         className="w-64 rounded-xl bg-white border border-gray-100 shadow-2xl py-4 overflow-hidden"
//                       >
//                         {item.dropdownItems?.map((dropdownItem: any, index: number) => (
//                           <motion.div
//                             key={dropdownItem.name}
//                             initial={{ x: -20, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             transition={{ delay: index * 0.05 }}
//                           >
//                             <Link
//                               href={`/${dropdownItem.slug}`}
//                               className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 group/item transition-all duration-200 border-l-2 border-transparent hover:border-orange-400"
//                             >
//                   <img src={dropdownItem?.img || `https://placehold.co/400x200/e2e8f0/475569?text=${item.name}`} alt="img" className="h-24 w" />

//                               <div className="font-semibold text-gray-800 group-hover/item:text-orange-600 transition-colors">
//                                 {dropdownItem.name}
//                               </div>
//                               <div className="text-xs text-gray-500 mt-1 group-hover/item:text-gray-600">
//                                 {dropdownItem.description}
//                               </div>
//                             </Link>
//                           </motion.div>
//                         ))}
//                       </motion.div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Desktop CTA */}
//             <div className="hidden lg:flex items-center gap-3">
//               <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#F36C45]">
//                 <HeadsetIcon size={18} />
//                 <p>+91 9166146538</p>
//               </button>

//               {!user?.email ? (
//                 <button
//                   onClick={() => Router.push("/auth")}
//                   className="border border-[#F36C45] text-[#F36C45] px-4 py-2 rounded-lg hover:bg-orange-50 transition"
//                 >
//                   Login / Signup
//                 </button>
//               ) : (
//                 <button
//                   onClick={() =>
//                     (window.location.href = "https://dashboard.ooshasprep.com")
//                   }
//                   className="border border-[#F36C45] text-[#F36C45] px-4 py-2 rounded-lg hover:bg-orange-50 transition"
//                 >
//                   Go to Dashboard
//                 </button>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
//               onClick={() => setIsOpen(true)}
//               aria-label="Open menu"
//             >
//               <Menu size={28} />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Drawer */}
//         <AnimatePresence>
//           {isOpen && (
//             <>
//               {/* Backdrop */}
//               <motion.div
//                 className="fixed inset-0 bg-black/50 z-40"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setIsOpen(false)}
//                 aria-hidden="true"
//               />

//               {/* Drawer */}
//               <motion.div
//                 className="fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-white z-50 shadow-xl overflow-y-auto"
//                 initial={{ x: "100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "100%" }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 300,
//                   damping: 30,
//                 }}
//               >
//                 <div className="p-5">
//                   {/* Header */}
//                   <div className="flex items-center justify-between mb-6 pb-4 border-b">
//                     <Image
//                       src="/image/logo.png"
//                       alt="Logo"
//                       width={120}
//                       height={40}
//                       className="h-8 w-auto"
//                     />
//                     <button 
//                       onClick={() => setIsOpen(false)}
//                       className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                       aria-label="Close menu"
//                     >
//                       <X size={24} />
//                     </button>
//                   </div>

//                   {/* Navigation Items */}
//                   <div className="space-y-1">
//                     {navItems.map((item) => (
//                       <div key={item.name} className="border-b border-gray-100 last:border-0">
//                         {item.hasDropdown ? (
//                           <div>
//                             <button
//                               onClick={() => handleDropdownToggle(item.name)}
//                               className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-800 hover:text-[#F36C45] transition-colors"
//                             >
//                               <span>{item.name}</span>
//                               <motion.div
//                                 animate={{ rotate: mobileDropdown === item.name ? 180 : 0 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <ChevronDown size={16} />
//                               </motion.div>
//                             </button>

//                             <AnimatePresence>
//                               {mobileDropdown === item.name && (
//                                 <motion.div
//                                   initial={{ height: 0, opacity: 0 }}
//                                   animate={{ height: "auto", opacity: 1 }}
//                                   exit={{ height: 0, opacity: 0 }}
//                                   transition={{ duration: 0.3 }}
//                                   className="overflow-hidden"
//                                 >
//                                   <div className="pb-4 space-y-1 pl-4">
//                                     {item.dropdownItems?.map((subItem: any) => (
//                                       <Link
//                                         key={subItem.slug}
//                                         href={`/${subItem.slug}`}
//                                         className="block py-3 px-3 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
//                                         onClick={() => setIsOpen(false)}
//                                       >
//                                         <div className="font-medium">{subItem.name}</div>
//                                         {subItem.description && (
//                                           <div className="text-xs text-gray-500 mt-1">
//                                             {subItem.description}
//                                           </div>
//                                         )}
//                                       </Link>
//                                     ))}
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           </div>
//                         ) : (
//                           <Link
//                             href={item.href}
//                             className="block py-4 text-gray-800 font-medium hover:text-[#F36C45] transition-colors"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             {item.name}
//                           </Link>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {/* CTA Buttons */}
//                   <div className="mt-8 space-y-4">
//                     <button className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
//                       <HeadsetIcon size={18} />
//                       <span>+91 9166146538</span>
//                     </button>

//                     {!user?.email ? (
//                       <button
//                         onClick={() => {
//                           setIsOpen(false);
//                           Router.push("/auth");
//                         }}
//                         className="w-full bg-[#F36C45] text-white py-3 rounded-lg hover:bg-[#e05a33] transition-colors font-medium"
//                       >
//                         Login / Signup
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => {
//                           setIsOpen(false);
//                           window.location.href = "https://dashboard.ooshasprep.com";
//                         }}
//                         className="w-full bg-[#F36C45] text-white py-3 rounded-lg hover:bg-[#e05a33] transition-colors font-medium"
//                       >
//                         Go to Dashboard
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </nav>
//       <AuthDrawer isOpen={drawer} setIsOpen={setDrawer} />
//     </>
//   );
// }



