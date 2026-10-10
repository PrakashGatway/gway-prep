"use client";

import {
  ArrowBigRight,
  Dot,
  Facebook,
  Instagram,
  Linkedin,
  ListChecks,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";

interface FooterProps {
  Data?: any[];
}

export function Footer({ Data = [] }: FooterProps) {
  const router = useRouter();

  const courses = React.useMemo(
    () =>
      Data?.filter((item: any) => {
        return (
          item?.seoMeta?.template?.toLowerCase() === "preparation" &&
          item?.seoMeta?.isPublished === true
        );
      }) || [],
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

  const courseData = React.useMemo(
    () =>
      Data?.filter((item: any) => {
        return (
          item?.seoMeta?.template?.toLowerCase() === "preparation" &&
          !item?.seoMeta?.duplicateOf &&
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

  const socialLinks = [
    {
      icon: "/icon/insta.webp",
      label: "Instagram",
      url: "https://www.instagram.com/ooshasprep",
      hoverColor: "hover:text-pink-500",
    },
    {
      icon: "/icon/facebook.webp",
      label: "Facebook",
      url: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
      hoverColor: "hover:text-blue-600",
    },
    {
      icon: "/icon/twitter.webp",
      label: "Twitter",
      url: "https://x.com/ooshasprep",
      hoverColor: "hover:text-blue-700",
    },
    {
      icon: "/icon/whatsapp.webp",
      label: "whatsapp",
      url: "https://wa.me/919166146538",
      hoverColor: "hover:text-blue-700",
    },
    {
      icon: "/icon/youtube.webp",
      label: "YouTube",
      url: "https://youtube.com/@ooshasprep",
      hoverColor: "hover:text-red-600",
    },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Career", path: "/career" },
    { label: "Contact Us", path: "/contact" },
    { label: "Blogs", path: "/blog" },
  ];

  const resources = [
    { label: "Case Studies", path: "/#" },
    { label: "Student Testimonials", path: "/#" },
    { label: "Events & Webinars", path: "/#" },
  ];

  // Group courses by their base type
  const groupedCourses = courses.reduce((acc, course) => {
    const baseKey = course.seoMeta?.duplicateOf || course.name;
    if (!acc[baseKey]) {
      acc[baseKey] = {
        base: null,
        variants: [],
      };
    }
    if (!course.seoMeta?.duplicateOf) {
      acc[baseKey].base = course;
    } else {
      acc[baseKey].variants.push(course);
    }
    return acc;
  }, {});

  const groupedArray = Object.entries(groupedCourses).map(([key, value]) => ({
    key,
    ...(value as any),
  }));
  const [email, setemail] = useState("");

  const submit = async () => {
    try {
      const api = await axiosInstance.post("/subscribe", { email });
      toast.success("Subscribed successfully!");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-3 sm:mx-6 lg:mx-12 xl:mx-16 my-8">
        {groupedArray.length > 0 && (
          <section className="relative overflow-hidden rounded-3xl  px-4 py-5 sm:px-6 sm:py-6">
            <div className="max-w-7xl mx-auto">

              <div className="space-y-3">
                {groupedArray.map((group) => {
                  const variants = group.variants || [];

                  return (
                    <div
                      key={group.key}
                      className=""
                    >
                      {/* Related / Main Title */}
                      {group.base && (
                        <button
                          type="button"
                          onClick={() => {
                            if (group.base?.slug) {
                              router.push(`/${group.base.slug}`);
                            }
                          }}
                          className="
                      text-sm
                      font-bold
                      text-[#F36D45]
                      
                      transition-colors
                      duration-200
                      cursor-pointer
                    "
                        >
                          {group.base?.seoMeta?.navTitle ||
                            group.base?.name ||
                            group.key} :
                        </button>
                      )}

                      {/* Related Items */}
                      {variants.length > 0 && (
                        <>
                          <span className="mx-1 text-white/70"></span>

                          {variants.map((course: any, index: number) => (
                            <React.Fragment key={course._id}>
                              <button
                                type="button"
                                onClick={() => {
                                  if (course.slug) {
                                    router.push(`/${course.slug}`);
                                  }
                                }}
                                className="
                            text-xs
                            text-gray-600
                            hover:text-[#F36D45]
                            transition-colors
                            duration-200
                            cursor-pointer
                          "
                              >
                                {course.seoMeta?.navTitle || course.name}
                              </button>

                              {index < variants.length - 1 && (
                                <span className="mx-2 text-gray-600">|</span>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
      <footer className="bg-[#FDF4EF] mt-2 mx-4 sm:mx-8 lg:mx-16 overflow-hidden border-2 border-primary rounded-t-[2rem] sm:rounded-t-[3rem] lg:rounded-t-[3.5rem] mt-10">
        {/* ================= TOP ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 md:gap-12 lg:gap-16 items-start">
            {/* Logo */}
            <div className="sm:col-span-2 lg:col-span-2 pr-10 space-y-3">
              <Image
                src="/image/logo.png"
                alt="logo"
                width={170}
                height={70}
                className=""
              />
              <p className="text-sm leading-5 text-[#303030]">
                Ooshas Prep is a leading online test prep platform for IELTS,
                GRE, GMAT, SAT, TOEFL & PTE, offering flexible learning formats
                and world-class coaching.
              </p>
              <p className="text-sm leading-5 text-[#303030]">
                Toll Free : +91 9166146538
              </p>
              <p className="text-sm leading-5 text-[#303030]">
                Email : info@ooshasprep.com
              </p>
              <ul className="flex items-center gap-2 mt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <button
                        className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-black`}
                        onClick={() => window.open(social.url, "_blank")}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <img
                          src={Icon}
                          alt={`${social.label} social icon`}
                          width={24}
                          height={24}
                          loading="lazy"
                          className="w-6 h-6"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold my-4">Quick Links</h3>
              <ul className="space-y-2 text-[13px] text-[#444]">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => router.push(link.path)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold my-4">Our Services</h3>
              <ul className="space-y-2 text-[13px] text-[#444]">
                {courseData.map((item: any) => (
                  <li
                    key={item._id}
                    onClick={() => router.push(`/${item.seoMeta.canonicalUrl}`)}
                    className="cursor-pointer hover:text-[#FF6D4D] transition-colors"
                  >
                    {item.seoMeta.navTitle}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold my-4">Resources</h3>
              <ul className="space-y-2 text-[13px] text-[#444]">
                {calculator.map((resource) => (
                  <li key={resource.slug}>
                    <button
                      className="cursor-pointer text-left hover:text-primary transition-colors"
                      onClick={() => router.push(resource.slug)}
                    >
                      {resource?.seoMeta?.navTitle}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exam Details */}
            <div className="lg:block">
              <h3 className="text-xl font-semibold my-4">Exam Details</h3>
              <ul className="space-y-2 text-[13px] text-[#444]">
                {courseData1.map((item: any) => (
                  <li
                    key={item._id}
                    onClick={() => router.push(`/${item.seoMeta.canonicalUrl}`)}
                    className="cursor-pointer hover:text-[#FF6D4D] transition-colors"
                  >
                    {item.seoMeta.navTitle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="max-w-7xl pb-6 mx-auto px-4 sm:px-6 text-black">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center w-full gap-3 sm:gap-4 text-center sm:text-left"
              >
                <p className="text-lg md:text-xl font-bold tracking-tight mb-1 text-gray-900">
                  Get Exam Updates
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <input
                    type="text"
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full sm:w-64 md:w-72 lg:w-96 border-2 border-primary flex items-center gap-2 bg-white text-black font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all"
                  />
                  <button
                    onClick={() => {
                      submit();
                    }}
                    className="w-full sm:w-auto flex-shrink-0 border-2 border-primary flex items-center justify-center gap-2 bg-white text-[#FF6A13] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap"
                  >
                    Subscribe Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="bg-primary relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 lg:gap-8 mt-4 md:mt-0">
              <p className="text-white text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Ooshas Prep. All rights reserved.
              </p>
              <Link href="/privacy-policy" className="text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-white text-sm">
                Terms of Service
              </Link>
            </div>

            <img
              src="/icon/footer.webp"
              alt="img"
              className="hidden lg:block h-24 sm:h-28 lg:h-34 absolute right-4 sm:right-6 lg:right-8 bottom-1 opacity-50 sm:opacity-100"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
