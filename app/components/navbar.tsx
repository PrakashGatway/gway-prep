"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  MessageSquare,
  Target,
  FileText,
  Briefcase,
  Phone,
  HeadsetIcon,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/hooks/AppStateContext";
import AuthDrawer from "./auth/drawer";

export function Navbar({ Data }: any) {
  const NAVDATA =
    Data?.filter(
      (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
    ) || [];
  console.log(NAVDATA, "data");

  const [isOpen, setIsOpen] = React.useState(false);
  const { user, course, logout, drawer, setDrawer } = useGlobal();

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    {
      name: "Test Prep",
      href: "#",
      hasDropdown: true,
      dropdownItems: NAVDATA.map((item: any) => ({
        name: item.seoMeta.navTitle,
        slug: item.seoMeta.canonicalUrl,
        description: item.seoMeta.navSubtitle,
      })),
    },
    { name: "Blogs", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact Us", href: "/contact" },
  ];

  React.useEffect(() => {
    scrolled && setIsOpen(false);
  }, [scrolled]);

  return (
    <>
      <nav
        className={`sticky top-0 z-100 transition-all duration-300  ${
          scrolled ? "bg-white/60 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-14">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/image/logo.png"
                alt="Logo"
                width={140}
                height={60}
                className="w-auto h-10 sm:h-20"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#F36C45] transition"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={16} />}
                  </Link>

                  {/* {item.hasDropdown && (
                  <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3">
                    <div className="w-72 rounded-xl bg-white shadow-xl border border-gray-100 py-2">
                      {item.dropdownItems?.map((subItem: any) => (
                        <Link
                          key={subItem.slug}
                          href={`/preparation/${subItem.slug}`}
                          className="block px-4 py-3 hover:bg-orange-50 transition"
                        >
                          <div className="font-medium text-gray-800">
                            {subItem.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {subItem.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )} */}

                  {item.hasDropdown && (
                    <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-64 rounded-xl bg-white border border-gray-100 shadow-2xl py-4 overflow-hidden"
                      >
                        {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#F36C45]" /> */}

                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <motion.div
                            key={dropdownItem.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              key={dropdownItem.slug}
                              href={`/preparation/${dropdownItem.slug}`}
                              className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 group/item transition-all duration-200 border-l-2 border-transparent hover:border-orange-400"
                            >
                              <div className="font-semibold text-gray-800 group-hover/item:text-orange-600 transition-colors">
                                {dropdownItem.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 group-hover/item:text-gray-600">
                                {dropdownItem.description}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#F36C45]">
                <HeadsetIcon size={18} />
                <p>
                  +91 9875863347
                </p>
              </button>

              {!user?.email ? (
                <button
                  onClick={() => setDrawer(!drawer)}
                  className="border border-[#F36C45] text-[#F36C45] px-4 py-2 rounded-lg hover:bg-orange-50 transition"
                >
                  Login / Signup
                </button>
              ) : (
                <button
                  onClick={() =>
                    (window.location.href = "https://dashboard.ooshasprep.com")
                  }
                  className="border border-[#F36C45] text-[#F36C45] px-4 py-2 rounded-lg hover:bg-orange-50 transition"
                >
                  Go to Dashboard
                </button>
              )}
            </div>

            {/* Mobile Button */}
            <button className="lg:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-white z-50 shadow-xl overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-6">
                    <Image
                      src="/image/logo.png"
                      alt="Logo"
                      width={120}
                      height={40}
                    />
                    <button onClick={() => setIsOpen(false)}>
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        <button
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === item.name ? null : item.name,
                            )
                          }
                          className="w-full flex justify-between items-center py-3 text-left font-medium"
                        >
                          <span>{item.name}</span>
                          {item.hasDropdown && <ChevronDown size={16} />}
                        </button>

                        {item.hasDropdown && mobileDropdown === item.name && (
                          <div className="pl-4 pb-3 space-y-2">
                            {item.dropdownItems?.map((subItem: any) => (
                              <Link
                                key={subItem.slug}
                                href={`/preparation/${subItem.slug}`}
                                className="block text-sm text-gray-600"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      className="flex btn-primary lg:flex text-sm hidden items-center justify-center !py-2 !px-3 space-x-1 "
                      onClick={() => setDrawer(!drawer)}
                    >
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </button>

                    <button className="w-full bg-[#F36C45] text-white py-3 rounded-lg">
                      Start Free Trial
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <AuthDrawer isOpen={drawer} setIsOpen={setDrawer} />
    </>
  );
}
