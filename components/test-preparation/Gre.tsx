"use client";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  CircleX,
  Play,
  PlayCircle,
  Star,
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect, useRef } from "react";
import GreForm from "./greForm";
// Import shared components
import { Aboutresult } from "../about_result";
import { TextTestimonials } from "../testimonial_gre";
import PricingSection from "../plan";
import { Consultants } from "../destinations-consultants";

import { motion, useScroll, useTransform } from "framer-motion";
import { getStudent } from "@/app/services/api";
import Image from "next/image";
import { StudentsSlider } from "../3dslider";
import { useRouter } from "next/navigation";

function AIStudySection({ aiStudySection }: { aiStudySection: any }) {
  return (
    <section className="px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-12 lg:mb-16 max-w-5xl mx-auto">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold m-3 sm:m-4 flex flex-wrap gap-1 sm:gap-2 items-center justify-center">
            {aiStudySection?.sectionTitle?.split("||")[0] || "What is"}
            <span className="text-[#f06437]">
              {aiStudySection?.sectionTitle?.split("||")[1] || "GRE?"}
            </span>
          </p>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            {aiStudySection.sectionSubtitle}
          </p>
        </div>

        <div className="relative p-1 sm:p-2">
          {aiStudySection.aiFeatures?.map((feature: any, index: number) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      ref={ref}
      className="sticky top-16 sm:top-20 md:top-42 flex items-center justify-center mb-3 sm:mb-4"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        className={`w-full max-w-5xl rounded-2xl md:rounded-[40px] overflow-hidden border-2 border-gray-300 flex flex-col lg:flex-row items-center
          ${index % 2 === 0 ? "bg-[#FEFBEA]" : "bg-[#FDF4EF]"}
          ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Image */}
        <div className="w-full lg:w-1/2 p-3 sm:p-4 md:p-6">
          {feature.image && (
            <img
              src={feature.image}
              alt={feature.heading}
              className="w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[350px] object-contain"
            />
          )}
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-14 flex flex-col justify-center">
          {/* <span className="text-orange-500 font-semibold uppercase tracking-widest text-xs sm:text-sm">
            AI Feature {index + 1}
          </span> */}
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-4 mb-2 md:mb-6">
            {feature.heading}
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {feature.content}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function GreSection({
  examFormatSection,
  whatIsGreSection,
  cta_banner,
  slug,
  img
}: any) {
  const greData = {
    header: {
      banner_text: "Achieve your target GRE score with expert || guidance",
      cta_button_text: "Get Started Today",
    },
    main_content: {
      title: "What is GRE?",
      introduction:
        "The GRE, your gateway to prestigious universities and diverse programs, assesses your verbal, quantitative, and analytical writing skills – crucial for graduate study worldwide. Master these realms with Gateway Abroad's expert guidance. Hone your critical thinking, analytical prowess, and vocabulary mastery through our comprehensive courses, personalized plans, and cutting-edge resources. We empower you to confidently navigate the GRE and unlock your academic potential, paving the way to your dream graduate program.",
    },
    sections: [
      {
        section_title: "Analytical Writing || (AWA)",
        description:
          'Flex your critical thinking muscles! This section includes only one task, "Analyse an Issue," which is timed for 30 minutes. You\'ll showcase your ability to write persuasive, well-structured essays within a limited time.',
      },
      {
        section_title: "Quantitative Reasoning || (Quant)",
        description:
          "Time to sharpen your math skills! This consists of two sections where Section 1 has 12 questions (21 minutes), and Section 2 has 15 questions (26 minutes). This section assesses your basic mathematical knowledge, problem-solving abilities, and data analysis skills. You'll tackle questions covering arithmetic, algebra, geometry, statistics, and probability, with an emphasis on applying math concepts to solve real-world problems.",
      },
      {
        section_title: "Verbal Reasoning || (Verbal)",
        description:
          "This engaging format assesses your reading comprehension, critical reasoning, and argument analysis skills through various question types. By employing diverse questioning techniques, we can gain a well-rounded understanding of your ability to process information, identify underlying assumptions, and evaluate the strength of arguments.",
      },
    ],
  };

  const title = examFormatSection?.title || "GRE? Format and || Syllabus 2026";
  const patternTable = examFormatSection?.patternTable || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 text-[#2d2d2d] bg-white">
     

      {/* Main Content Body */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 sm:gap-6 md:gap-8 items-start mb-6 md:mb-8 lg:mb-10">
        
        <div className="flex items-center gap-1 text-[#541e5c] justify-center ">
          {/* <span className="text-2xl sm:text-3xl md:text-5xl font-extrabold -mt-2 animate-pulse">
            *
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl font-black tracking-tight lowercase">
            {slug || "gre"}
          </h3>
          <span className="text-base sm:text-lg font-bold self-start mt-1 sm:mt-2">®</span> */}
          
          
          <img
            src={img}
            alt="Img"
            className=" object-contain"
          />
          
        </div>

        {/* Right Side Introduction */}
        <div className="px-0 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
            {whatIsGreSection?.sectionTitle?.split("||")[0] || "What is"}{" "}
            <p className="text-[#f06437]">
              {whatIsGreSection?.sectionTitle?.split("||")[1] || "GRE?"}
            </p>
          </h2>
          {/* <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
            {whatIsGreSection?.description || greData.main_content.introduction}
          </p> */}
          
          <p 
            className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: whatIsGreSection?.description || greData.main_content.introduction }}
          />


        </div>
      </div>

      {/* Lower Cards Stack */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold m-2 sm:m-4 flex flex-wrap gap-1 sm:gap-2">
          <p className="text-[#f06437]">
            {examFormatSection?.title?.split("||")[0] || "What is"}
          </p>{" "}
          {examFormatSection?.title?.split("||")[1] || "GRE?"}
        </h2>

        {(patternTable.length > 0 ? patternTable : greData.sections).map(
          (item: any, index: number) => (
            <div
              key={index}
              className={`${index % 2 === 0 ? "bg-[#fef6f0]" : "bg-[#FEFBEA]"} border border-[#fbe9dc]
    rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 grid grid-cols-1 ${item?.title?.trim() ? "md:grid-cols-[1fr_3fr]" : "grid-cols-1"}
    gap-3 sm:gap-4 md:gap-8 items-center transition-all duration-300 hover:shadow-md`}
            >
              {item?.title?.trim() && (
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#444] md:text-center pr-4 border-b md:border-b-0 md:border-r border-orange-100 pb-2 md:pb-0">
                  {item.title.split("||")[0]} <br />
                  {item.title.split("||")[1] || ""}
                </h3>
              )}

              <div
                className={`text-gray-600 text-sm sm:text-base leading-relaxed text-justify ${!item?.title?.trim() ? "col-span-full" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: item?.description || "",
                }}
              />
            </div>
          ),
        )}
      </div>


       {/* Top Banner */}
      <div
        className="w-full bg-[#f06437] text-white rounded-2xl md:rounded-[30px]
         px-4 sm:px-6 md:px-12  py-4 sm:py-2 md:py-4 flex relative mt-18
       flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 shadow-sm"
      >
        <div className=" flex items-center gap-2 sm:gap-3 text-center md:text-left">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-xl tracking-wide">
            {cta_banner?.title}
          </h2>
        </div>
        <div className="order-first md:order-none lg:absolute bottom-4 right-88">
          <img
            src="/pc.png"
            alt="img"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 object-contain"
          />
        </div>
        <a
          href={`https://wa.me/9166146538?text=Hello`}
          target="_blank"
          className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 sm:px-6 rounded-full text-lg transition-colors duration-200 whitespace-nowrap w-full md:w-auto text-center"
        >
          {cta_banner?.buttonText || ""}
        </a>
      </div>
    </section>
  );
}

function GrePatternTable({ examPatternData }: { examPatternData: any }) {
  if (
    !examPatternData ||
    !examPatternData["exam-patternTable"] ||
    examPatternData["exam-patternTable"].length === 0
  ) {
    return null;
  }

  const patternItems = examPatternData["exam-patternTable"];
  const headers = ["Section", "Questions", "Time", "Score Range", "Format"];

  return (
    <div className="w-full max-w-7xl rounded-xl mx-auto p-3 sm:p-4 md:p-6 bg-[#F8F9FD]">
      {patternItems.map((patternItem: any, index: number) => {
        const patternTableRows = patternItem?.patternTable || [];

        return (
          <div key={index} className="mb-6 sm:mb-8 last:mb-0">
            {/* Title Header Section */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#333333] mb-2 sm:mb-3 flex flex-wrap gap-1 sm:gap-2">
                {patternItem?.title?.split("||")[0] ||
                  "GRE Exam Pattern 2026 -"}
                <p className="text-[#f06437]">
                  {patternItem?.title?.split("||")[1] ||
                    " New Format at a Glance"}
                </p>
              </h2>
              <div
                className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-5xl"
                dangerouslySetInnerHTML={{
                  __html: patternItem?.subtitle || "",
                }}
              />
            </div>

            {/* Responsive Table Wrapper */}
            {patternTableRows.length > 0 ? (
              <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="w-full min-w-[600px] md:min-w-[800px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#f06437] text-white">
                      {headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="py-2.5 sm:py-3.5 px-2 sm:px-4 font-bold text-xs sm:text-sm tracking-wide border-r border-orange-400/30 last:border-0"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-xs sm:text-sm">
                    {patternTableRows.map((row: any, rowIdx: number) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50"
                      >
                        <td
                          className="py-3 sm:py-4 px-2 sm:px-4 border-r border-gray-200"
                          dangerouslySetInnerHTML={{
                            __html: row.section || "",
                          }}
                        />
                        <td className="py-3 sm:py-4 px-2 sm:px-4 border-r border-gray-200 text-gray-600 font-medium">
                          {row.questions || ""}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 border-r border-gray-200 text-gray-600 font-medium">
                          {row.time || ""}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 border-r border-gray-200 text-gray-600 font-medium">
                          {row.scoreRange || ""}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-500 font-medium">
                          {row.format || ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No pattern data available
              </p>
            )}

            {patternItem?.other_data && (
              <div
                className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 text-sm sm:text-base"
                dangerouslySetInnerHTML={{
                  __html: patternItem.other_data,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function VideoExplanationSection({ videoData }: { videoData: any }) {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-white pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div
            className="relative w-full lg:max-w-4xl rounded-2xl md:rounded-[40px] lg:rounded-[52px] 
          border-2 border-[#D9D9D9] bg-[#FAFAFA] px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-14 lg:py-16"
          >
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-tight text-[#333333]">
                {videoData?.titlel?.split("||")[0] || "Video explanations for"}
                <br />
                <span className="text-[#F36C45]">
                  {videoData?.titlel?.split("||")[1] || "every question"}
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 md:mt-8 text-[#5F5F5F] text-sm sm:text-base md:text-lg lg:text-[1.2rem] leading-relaxed">
                {videoData?.Subtitle ||
                  "Want to go further? We also include 290+ curated lessons shaped by student feedback to deliver material in the way you learn best."}
              </p>
              <button
                onClick={() => router.push("/auth")}
                className="mt-6 sm:mt-8 md:mt-10 bg-[#F36C45] hover:bg-[#ec5d34] transition-all duration-300 text-white font-semibold rounded-xl px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg shadow-lg w-full sm:w-auto"
              >
                {videoData?.["button-text"] || "Watch Solution Now"}
              </button>
            </div>

            <div className="relative mt-8 sm:mt-10 lg:mt-0 lg:absolute lg:-right-48 lg:top-1/2 lg:-translate-y-1/2 flex justify-center">
              <div className="w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-lg rounded-2xl md:rounded-[36px] bg-white border border-[#FFD8CC] p-4 sm:p-6 md:p-8 shadow-[0_10px_50px_rgba(243,108,69,0.18)]">
                <h3 className="text-center text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#333333]">
                  Video Explanation
                  <br />
                  Question 05
                </h3>
                <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                  <button className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300 flex items-center justify-center hover:scale-105 transition">
                    <Play
                      size={20}
                      className="sm:w-[28px] sm:h-[28px] md:w-[34px] md:h-[34px] ml-1 text-[#333333]"
                      fill="currentColor"
                    />
                  </button>
                </div>
                <div className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-2 sm:gap-3 md:gap-4 justify-center">
                  <img
                    src="/image/logo.png"
                    alt="Instructor"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#333333]">
                      By Roshni
                    </h4>
                    <p className="text-xs sm:text-sm text-[#666666]">
                      Ooshash Prep Expert
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FreeResources({ resourcesData }: { resourcesData: any }) {
  const router = useRouter();
  const resources = [
    {
      title: resourcesData?.resources?.[0]?.title || "--",
      description:
        resourcesData?.resources?.[0]?.description ||
        "Take the GRE practice material and begin your GRE preparation now.",
      button:
        resourcesData?.resources?.[0]?.buttonText ||
        "Take GRE Practice Material",
      filled: true,
    },
    {
      title: resourcesData?.resources?.[1]?.title || "--",
      description:
        resourcesData?.resources?.[1]?.description ||
        "Begin your GRE coaching with resources prepared by our experts to help you with your GRE prep.",
      button:
        resourcesData?.resources?.[1]?.buttonText ||
        "Download GRE Other Resources",
      filled: false,
    },
    {
      title: resourcesData?.resources?.[2]?.title || "--",
      description:
        resourcesData?.resources?.[2]?.description ||
        "Download the GRE syllabus now and get a head start on your GRE preparation.",
      button:
        resourcesData?.resources?.[2]?.buttonText || "Download GRE Syllabus",
      filled: true,
    },
  ];

  return (
    <section className="py-8 md:py-2 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-6 sm:mb-10 md:mb-12">
          <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
            {resourcesData?.title.split("||")[0]}
            <span className="text-primary">{resourcesData?.title.split("||")[1]}</span>
          </h2>
          {/* <div
          className="text-left text-2xl md:text-3xl lg:text-4xl font-bold"
            dangerouslySetInnerHTML={{
              __html:
                resourcesData?.title ||
                "<h2 className='text-left text-2xl md:text-3xl lg:text-5xl font-bold'><span className='text-[#222]'>Free GRE </span><span className='text-[#F5632A]'>Prep Resources</span></h2>",
            }}
          /> */}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {resources.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1E1E1E] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-6 min-h-[50px] sm:min-h-[60px]">
                {item.description}
              </p>
              <div
                className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 md:gap-4"
                onClick={() => router.push("/auth")}
              >
                <button
                  className={`flex-1 rounded-xl py-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-semibold transition ${
                    item.filled
                      ? "bg-gradient-to-r from-[#FF6B00] to-[#F54B00] text-white hover:shadow-lg"
                      : "border-2 border-[#FFB184] text-[#F5632A] hover:bg-orange-50"
                  }`}
                >
                  {item.button}
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border-2 border-[#FFC29C] flex items-center justify-center text-[#F5632A] transition hover:bg-[#F5632A] hover:text-white flex-shrink-0">
                  <ArrowRight size={16} className="sm:w-[20px] sm:h-[20px] md:w-[28px] md:h-[28px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardSection({ dashboardData }: { dashboardData: any }) {
  const features = dashboardData?.Points?.map((p: any) => p.Points) || [];
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FF5B36] via-[#FF7656] to-[#FDB19B]
     py-8 sm:py-10 md:py-12 px-3 sm:px-4 mb-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-white text-center lg:text-left">
            <h2 className="max-w-xl mx-auto lg:mx-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 font-bold leading-tight">
              {dashboardData?.title ||
                "An All-in-One Dashboard for Smarter Prep"}
            </h2>

            <div
              className="[&_ul]:list-disc [&_ul]:ml-4 sm:[&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-4 sm:[&_ol]:ml-6 [&_li]:mb-1 sm:[&_li]:mb-2 text-sm sm:text-base"
              dangerouslySetInnerHTML={{
                __html: dashboardData?.Subtitle || "",
              }}
            />

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5 justify-center lg:justify-start">
              <button
                onClick={() => router.push("/auth")}
                className="rounded-xl bg-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-semibold text-[#FF5B36] transition hover:scale-105 hover:shadow-xl text-sm sm:text-base"
              >
                Try Free for 3 Days →
              </button>
              <button className="rounded-xl border border-white/30 bg-black/30 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-semibold text-white backdrop-blur transition hover:bg-black/40 text-sm sm:text-base">
                ▶ Preview Dashboard
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-6 sm:mt-8 lg:mt-0">
            <div className="rounded-xl md:rounded-[32px] bg-white p-2 md:p-3 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
              <Image
                src="/Gre/dashboard.png"
                alt="Dashboard Preview"
                width={900}
                height={650}
                className="rounded-lg md:rounded-[26px] object-cover w-full"
              />
            </div>
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -z-10 h-32 w-32 sm:h-40 sm:w-40 -translate-x-1/2 rounded-full bg-[#FF7B5C]/40 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Gre({ pageInfo, slug }: { pageInfo: any; slug: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showTestDates, setShowTestDates] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const heroSection = pageInfo?.sections?.["hero-section"]?.fields || {};
  const Registrations = pageInfo?.sections?.["from-section"]?.fields || {};
  const cta_banner = pageInfo?.sections?.["cta-banner-section"]?.fields || {};
  const aiStudySection = pageInfo?.sections?.["ai-study-section"]?.fields || {};
  const testDatesSection =
    pageInfo?.sections?.["test-dates-section"]?.fields || {};
  const scoreGuaranteeSection =
    pageInfo?.sections?.["score-guarantee-section"]?.fields || {};
  const pricingSection = pageInfo?.sections?.["pricing-section"]?.fields || {};
  const mobileAppsSection =
    pageInfo?.sections?.["mobile-apps-section"]?.fields || {};
  const testimonialsSection =
    pageInfo?.sections?.["testimonials-section"]?.fields || {};
  const faqSection = pageInfo?.sections?.["f&q"] || {};
  const examFormatSection =
    pageInfo?.sections?.["exam-Format-section"]?.fields || {};
  const examPatternSection =
    pageInfo?.sections?.["exam-pattern-section"]?.fields || {};
  const boostProfileSection =
    pageInfo?.sections?.["boost-profile-section"]?.fields || {};
  const finalCtaSection =
    pageInfo?.sections?.["final-cta-section"]?.fields || {};
  const freeResourcesSection =
    pageInfo?.sections?.["free-resources-section"]?.fields || {};
  const officialQuestionsSection =
    pageInfo?.sections?.["official-questions-section"]?.fields || {};
  const studentDashboard =
    pageInfo?.sections?.["student-dashboard"]?.fields || {};
  const studentVideo = pageInfo?.sections?.["student-video"]?.fields || {};
  const whatIsGreSection =
    pageInfo?.sections?.["what-is-gre-section"]?.fields || {};

  const [studentsData, setstudentsData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const displayStudents = async () => {
      try {
        const data = await getStudent(slug || "", 1, 8);
        // console.log(data.data, 'klkjoijoijoij')
        if (mounted) setstudentsData(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    displayStudents();
    return () => {
      mounted = false;
    };
  }, []);

  const pricingData = {
    testimonial: pricingSection.testimonial || "",
    pricing_plans: pricingSection || [],
  };

  const testimonials = testimonialsSection.testimonials || [];
  const featuredTestimonial = {
    quote: testimonialsSection.quote || "",
    name: testimonialsSection.name || "",
    meta: testimonialsSection.meta || "",
    ratingImage: testimonialsSection.ratingImage || "",
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      origin: "center",
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          origin: "center",
          perView: 2,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          origin: "center",
          perView: 3,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const startAutoPlay = () => {
      timerRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    };

    if (testimonials.length > 3) {
      startAutoPlay();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [instanceRef, testimonials.length]);

  const router = useRouter();

  return (
    <>
      <section className="relative bg-[#FDF4EF] overflow-visible" style={{"scrollbarWidth":'none'}}>
        <div className="max-w-7xl mx-auto py-8 sm:py-10 lg:py-12">
          {/* Heading */}
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-10 text-center">
            {/* <div
              className="
                flex items-center flex-col
                [&>h1]:text-2xl
                sm:[&>h1]:text-3xl
                md:[&>h1]:text-4xl
                lg:[&>h1]:text-5xl
                [&>h1]:font-bold
                [&>h1]:leading-tight
                [&>h1]:tracking-tight
                [&>h1]:px-2
              "
              dangerouslySetInnerHTML={{
                __html: heroSection.title || "",
              }}
            /> */}

             <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold leading:7 lg:leading-14">
                  {heroSection.title?.split("||")[0]}
                  <span className="text-primary">{heroSection.title?.split("||")[1]}</span>
                  {heroSection.title?.split("||")[2]}
                </h1>

            <p className="mt-2 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 px-2">
              {heroSection.paragraph}
            </p>
          </div>
          <StudentsSlider data={studentsData || []} />
        </div>

        <div className=" md:absolute left-1/2 bottom-0 md:-translate-x-1/2 md:translate-y-1/2 w-[95%] sm:w-full max-w-xl mx-auto
         px-2 sm:px-2 z-20 pb-4 md:p-0 ">
          <div className="bg-[#F86C43] rounded-2xl flex flex-col sm:flex-row items-center justify-between px-3 sm:px-4 py-2 sm:py-2 gap-2 sm:gap-0">
            
            <div className="flex items-center gap-3 sm:gap-5">
              {/* <div 
               style={{ backgroundColor: studentsData?.[0]?.colorCode || "#555" }}
               className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-base sm:text-lg font-bold uppercase">
                  {slug}
                </span>
              </div> */}

              <span className="text-white font-bold text-sm sm:text-lg md:text-lg">
                {heroSection?.ctaButtonText || "Full Courses starts at $99"}
              </span>
            </div>

            
            <button
              onClick={() => router.push("/auth")}
              className=" hover:bg-[#323232] rounded-full px-1 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-4 transition-all w-full sm:w-auto justify-center sm:justify-start"
              style={{ backgroundColor: studentsData?.[0]?.colorCode || "#555" }} 
            >
              <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                Explore Courses
              </span>

              {/* <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center">
                <ChevronRight className="text-[#424242]" size={16} />
              </span> */}
            </button>
          </div>
        </div>
        
      </section>

      <GreForm studentsData={studentsData} formSection={Registrations} />

      <GreSection
        examFormatSection={examFormatSection}
        whatIsGreSection={whatIsGreSection}
        cta_banner={cta_banner}
        slug={slug}
        img={pageInfo?.seoMeta?.navIcon}
      />

      <section className="py-6 sm:py-8 md:py-12 bg-[#F8F9FD]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <GrePatternTable examPatternData={examPatternSection} />
        </div>
      </section>

      <DashboardSection dashboardData={studentDashboard} />

      <AIStudySection aiStudySection={aiStudySection} />

      {/* Boost Profile Section */}
      <div className="w-full max-w-6xl mx-auto my-8 sm:my-10 md:my-12 relative px-3 sm:px-4">
        <div className="bg-[#FDF0EB] rounded-xl md:rounded-[40px] p-4 sm:p-6 md:p-8 grid md:grid-cols-[2fr_1fr] items-center justify-between min-h-[200px] md:min-h-[300px] z-1">
          <div className="flex-1 z-10 text-center md:text-left space-y-3 sm:space-y-4 max-w-5xl pl-0 md:pl-20">
            <span className="text-[#FF6A39] text-xs sm:text-sm md:text-base font-medium tracking-wide block">
              {boostProfileSection.tagline || "Test Prep & Profile Building"}
            </span>
            <h2 className="text-[#333333] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-tight">
              {boostProfileSection.title ||
                "Boost Your <br className='hidden md:inline' /> Study Abroad Profile!"}
            </h2>
            <div className="pt-1 sm:pt-2">
              <button
                onClick={() => router.push("/auth")}
                className="bg-[#FF6A39] hover:bg-[#e05626] text-white font-bold px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl shadow-md transition text-sm sm:text-base"
              >
                {boostProfileSection.buttonText || "Enroll Now"}
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="/girl-preparation.webp"
              alt="Graduate Student"
              className="object-contain md:w-60 lg:w-80 md:absolute md:-top-[80px] lg:-top-[134px] md:right-16 lg:right-25 z-10"
            />
          </div>
        </div>
      </div>

      {/* Score Guarantee Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf0eb] to-white py-8 sm:pt-12 md:pt-12 px-3 sm:px-4">
        <div className="flex justify-center items-center flex-col max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-center">
            {scoreGuaranteeSection?.title?.split("||")[0] || "What is"} <br className="sm:hidden" />
            <p className="text-[#f06437]">
              {scoreGuaranteeSection?.title?.split("||")[1] || "GRE?"}
            </p>
          </h2>

          <p className="my-3 sm:my-4 md:my-6 text-sm sm:text-base text-center px-2 text-justify">
            {scoreGuaranteeSection.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl gap-3 sm:gap-4 md:gap-6 mx-auto mt-6 sm:mt-8 md:mt-10">
          {scoreGuaranteeSection.features?.map((ele: any, idx: number) => (
            <div
              key={idx}
              className="text-black/80 flex flex-col relative isolate"
            >
              <span className="absolute top-0 -left-2 h-12 sm:h-14 md:h-18 w-8 sm:w-10 md:w-12 bg-orange-600 rounded-2xl z-[-1]" />
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white border rounded-xl">
                <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
                  {ele.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {ele.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <PricingSection plans={pricingData.pricing_plans} />
      </section>


      {/* Official Questions Section */}
      <section className=" relative w-full flex items-center justify-center bg-gradient-to-r from-[#F1AA94] to-[#EE653C] my-18">
        
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-10 justify-end items-center mx-auto pt-10 sm:pt-16 lg:pt-20 bg-cover bg-center bg-no-repeat">
          <div className="absolute left-50 hidden lg:block lg:w-[40%] z-10 rounded-full">
            <img src="/Gre/laptop.png" alt="img" className="w-full" />
          </div>

          <div className="w-full lg:w-[45%] relative text-white px-3 sm:px-4 lg:pl-10 text-center lg:text-left">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold block">
              {officialQuestionsSection.title ||
                "Official GRE Questions - only with Ooshas"}
            </span>
            <p className="my-3 sm:my-4 md:my-6 text-sm sm:text-base">
              {officialQuestionsSection.description ||
                "We're the only GRE prep course licensed to use official ETS practice questions, so you know you're studying exactly what you'll see on test day."}
            </p>
            <div className="flex justify-center lg:justify-end">
              <button
                className="bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex gap-2 items-center text-sm sm:text-base"
                onClick={() => router.push("/auth")}
              >
                <Play size={16} />{" "}
                {officialQuestionsSection.buttonText || "Preview Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <VideoExplanationSection videoData={studentVideo} />
      <TextTestimonials testimonialsSection={testimonialsSection} />
      <FreeResources resourcesData={freeResourcesSection} />
      <Consultants data={faqSection} finalCtaSection={finalCtaSection} />
    </>
  );
}






