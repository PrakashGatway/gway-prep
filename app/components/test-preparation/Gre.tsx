"use client";
import {
  ArrowRight,
  ChevronDown,
  CircleCheckBig,
  CircleX,
  Play,
  PlayCircle,
  Star,
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect, useRef } from "react";

// Import shared components
import { Aboutresult } from "../about_result";
import { TextTestimonials } from "../testimonial_gre";
import PricingSection from "../plan";
import { Consultants } from "../destinations-consultants";

import { motion, useScroll, useTransform } from "framer-motion";
import { getStudent } from "@/app/services/api";
import Image from "next/image";

function AIStudySection({ aiStudySection }: { aiStudySection: any }) {
  return (
    <section className=" px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div
            dangerouslySetInnerHTML={{
              __html: aiStudySection.sectionTitle || "",
            }}
          />

          <p className="text-base text-gray-600 ">
            {aiStudySection.sectionSubtitle}
          </p>
        </div>

        <div className="relative p-2">
          {aiStudySection.aiFeatures?.map((feature: any, index: number) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
          <div className="flex justify-center mb-4">
             <button className="bg-[#FF6A39] hover:bg-[#e05626] text-white text-sm font-semibold px-4 py-3 rounded-md shadow-sm transition">
            Talk to a GRE expert
          </button>
          </div>
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
      className={`h-[46vh] sticky top-42 flex items-center justify-center `}
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
        className={`w-full max-w-5xl rounded-[40px] overflow-hidden  border-2 border-gray-300 flex flex-col lg:flex-row items-center
          ${index % 2 === 0 ? "bg-[#FEFBEA]" : "bg-[#FDF4EF]"}
        ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Image */}
        <div className="w-full lg:w-1/2 px-2" >
          {feature.image && (
            <img
              src={feature.image}
              alt={feature.heading}
              className="w-full h-[350px] lg:h-[350px] object-contain "
            />
          )}
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">
          <span className="text-orange-500 font-semibold uppercase tracking-widest">
            AI Feature {index + 1}
          </span>

          <h2 className="text-4xl lg:text-2xl font-bold mt-4 mb-6">
            {feature.heading}
          </h2>

          <p className="text-gray-600 text-base leading-relaxed">
            {feature.content}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function GreSection() {
  const greData = {
    header: {
      banner_text: "Achieve your target GRE score with expert || guidance",
      cta_button_text: "Get Started Today ",
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

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8  text-[#2d2d2d] bg-white">
      {/* Top Banner */}
      <div className="w-full bg-[#f06437] text-white rounded-[30px] px-20 py-0 flex flex-col md:flex-row items-center justify-between gap-4 mb-12 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Decorative Graduation Cap Icon Placeholder */}
          <h2 className="text-xl md:text-2xl font-bold tracking-wide ">
            {greData.header.banner_text?.split("||")[0]} <br />
            {greData.header.banner_text?.split("||")[1]}
          </h2>
        </div>
        <div>
          <img src="/pc.png" alt="" className="w-30 h-30 object-contain" />
        </div>

        <button
          className="bg-[#fff] hover:bg-black text-black font-semibold py-2.5 px-6 rounded-full text-sm transition-colors
         duration-200 whitespace-nowrap"
        >
          {greData.header.cta_button_text}
        </button>
      </div>

      {/* Main Content Body */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 items-start mb-10">
        {/* Left Side Logo Graphic Header */}
        <div className="flex items-center gap-1 text-[#541e5c]">
          <span className="text-4xl font-extrabold -mt-2 animate-pulse">*</span>
          <h1 className="text-7xl font-black tracking-tight lowercase">gre</h1>
          <span className="text-xs font-bold self-start mt-2">®</span>
        </div>

        {/* Right Side Introduction */}
        <div className="px-6">
          <h3 className="text-3xl font-extrabold  mb-4 flex gap-2 ">
            {/* {greData.main_content.title} */}
            What is <p className="text-[#f06437]">GRE?</p>
          </h3>
          <p className="text-gray-600 text-base leading-relaxed text-justify ">
            {greData.main_content.introduction}
          </p>
        </div>
      </div>

      {/* Lower Cards Stack */}
      <div className="space-y-4">
        <h3 className="text-3xl font-extrabold  m-4 flex gap-2 ">
          <p className="text-[#f06437]">GRE?</p> Format
        </h3>
        {greData.sections.map((item, index) => (
          <div
            key={index}
            className={`${index % 2 === 0 ? "bg-[#fef6f0]" : "bg-[#FEFBEA]"} border border-[#fbe9dc] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 items-center transition-all duration-300 hover:shadow-md`}
          >
            {/* Component Section Left Heading */}
            <h3 className="text-xl font-bold text-[#444] md:text-center pr-4 border-b md:border-b-0 md:border-r border-orange-100 pb-2 md:pb-0">
              {item.section_title.split("||")[0]} <br />
              {item.section_title.split("||")[1]}
            </h3>

            {/* Component Section Right Context */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GrePatternTable() {
  const data = {
    title: "GRE Exam Pattern 2026 - New Format at a Glance",
    subtitle:
      "The GRE General Test was overhauled in September 2023 and this format continues through 2026. It is now the shortest, most focused version in the test's history — under 2 hours, fully section-adaptive, with every answer counting.",
    headers: ["Section", "Questions", "Time", "Score Range", "Format"],
    rows: [
      {
        name: "Analytical Writing (AWA)",
        subName: '"Analyze an Issue" — only task since 2023 update',
        questions: "1 essay task",
        subQuestions: "",
        time: "30 min",
        subTime: "",
        score: "0 - 6",
        subScore: "(0.5 increments)",
        format: "Fixed · Always first",
      },
      {
        name: "Verbal Reasoning",
        subName: "Section 1: 12 Qs  Section 2: 15 Qs",
        questions: "27 total",
        subQuestions: "",
        time: "41 min",
        subTime: "18 + 23 min",
        score: "130 - 170",
        subScore: "(1-point increments)",
        format: "Section-adaptive",
      },
      {
        name: "Quantitative Reasoning",
        subName: "Section 1: 12 Qs  Section 2: 15 Qs",
        questions: "27 total",
        subQuestions: "",
        time: "47 min",
        subTime: "21 + 26 min",
        score: "130 - 170",
        subScore: "(1-point increments)",
        format: "Section-adaptive",
      },
    ],
    total: {
      questions: "54 questions + 1 AWA task",
      time: "1 hr 58 min",
      score: "260–340 + AWA",
      format: "No breaks · No negative marking",
    },
  };

  return (
    <div className="w-full max-w-7xl rounded-xl mx-auto p-4 sm:p-6 bg-[#F8F9FD]">
      {/* Title Header Section */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3">
          <span className="text-[#f06437]">{data.title.split(" - ")[0]}</span> - {" "}
          {data.title.split(" - ")[1]}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-5xl">
          {data.subtitle}
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full min-w-[800px] border-collapse text-left">
          {/* Header Row */}
          <thead>
            <tr className="bg-[#f06437] text-white">
              {data.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="py-3.5 px-4 font-bold text-sm tracking-wide border-r border-orange-400/30 last:border-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Data Rows */}
          <tbody className="text-gray-700 text-xs sm:text-sm">
            {data.rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50"
              >
                {/* Section Column */}
                <td className="py-4 px-4 border-r border-gray-200">
                  <div className="font-bold text-gray-800">{row.name}</div>
                  {row.subName && (
                    <div className="text-[11px] text-gray-400 mt-1 font-normal">
                      {row.subName}
                    </div>
                  )}
                </td>

                {/* Questions Column */}
                <td className="py-4 px-4 border-r border-gray-200 text-gray-600 font-medium">
                  {row.questions}
                </td>

                {/* Time Column */}
                <td className="py-4 px-4 border-r border-gray-200">
                  <div className="font-medium text-gray-600">{row.time}</div>
                  {row.subTime && (
                    <div className="text-[11px] text-gray-400 mt-0.5 font-normal">
                      {row.subTime}
                    </div>
                  )}
                </td>

                {/* Score Range Column */}
                <td className="py-4 px-4 border-r border-gray-200">
                  <div className="font-medium text-gray-600">{row.score}</div>
                  {row.subScore && (
                    <div className="text-[11px] text-gray-400 mt-0.5 font-normal">
                      {row.subScore}
                    </div>
                  )}
                </td>

                {/* Format Column */}
                <td className="py-4 px-4 text-gray-500 font-medium">
                  {row.format}
                </td>
              </tr>
            ))}

            {/* Highlighted Footer Summary Row */}
            <tr className="bg-[#fffdf0] border-t-2 border-gray-200 font-bold text-gray-800">
              {/* Total Title */}
              <td className="py-4 px-4 border-r border-gray-200 flex items-center gap-2">
                <span className="text-base text-gray-600">⏱️</span>
                <span>Total</span>
              </td>

              {/* Total Questions */}
              <td className="py-4 px-4 border-r border-gray-200 text-[#2b2b2b]">
                {data.total.questions}
              </td>

              {/* Total Time */}
              <td className="py-4 px-4 border-r border-gray-200 text-[#2b2b2b]">
                {data.total.time}
              </td>

              {/* Total Score */}
              <td className="py-4 px-4 border-r border-gray-200 text-[#f06437]">
                {data.total.score}
              </td>

              {/* Total Rules */}
              <td className="py-4 px-4 text-[#1a5fb4] text-xs sm:text-sm font-semibold">
                {data.total.format}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Gre({ pageInfo }: { pageInfo: any }) {
  // console.log(pageInfo)
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showTestDates, setShowTestDates] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Extract sections from pageInfo
  const heroSection = pageInfo?.sections?.["hero-section"]?.fields || {};
  const comparisonSection = pageInfo?.sections?.["comparison-section"]?.fields || {};
  const aiStudySection = pageInfo?.sections?.["ai-study-section"]?.fields || {};
  const testDatesSection = pageInfo?.sections?.["test-dates-section"]?.fields || {};
  const scoreGuaranteeSection = pageInfo?.sections?.["score-guarantee-section"]?.fields || {};
  const pricingSection = pageInfo?.sections?.["pricing-section"]?.fields || {};
  const mobileAppsSection = pageInfo?.sections?.["mobile-apps-section"]?.fields || {};
  const testimonialsSection = pageInfo?.sections?.["testimonials-section"]?.fields || {};
  const faqSection = pageInfo?.sections?.["f&q"] || {};
  const registrationSection = pageInfo?.sections?.["Registrations"]?.fields || {};
  const [studentsData, setstudentsData] = useState<any[]>([]);

  // load students once on mount
  useEffect(() => {
    let mounted = true;
    const displayStudents = async () => {
      try {
        const data = await getStudent("", 1, 8);
        if (mounted) setstudentsData(data || []);
      } catch (err) {
        // optionally handle error
        console.error(err);
      }
    };
    displayStudents();
    return () => {
      mounted = false;
    };
  }, []);

  // Pricing data transformation
  const pricingData = {
    testimonial: pricingSection.testimonial || "",
    pricing_plans: pricingSection || [],
  };

  // Testimonials slider setup
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
      perView: 1.5,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          origin: "center",
          perView: 2.2,
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

  // Auto-play functionality
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

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (testimonials.length > 3) {
      timerRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FDF4EF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <div
                className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                dangerouslySetInnerHTML={{
                  __html: heroSection.title || "",
                }}
              />

              <p className="mt-6 text-[#555] text-base sm:text-base leading-8">
                {heroSection.subtitle}
              </p>

              <button className="mt-10 rounded-full bg-[#F86C43] hover:bg-[#ef5a2f] transition px-8 py-4 text-white text-base font-semibold shadow-lg">
                {heroSection.ctaButtonText || "Full Courses starts at $99"}
              </button>
            </div>

            {/* Right Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-md shadow-xl w-full max-w-md p-4">
                <h3 className="text-center text-xl font-semibold mb-8">
                  Speak to an Expert
                </h3>

                <form className="space-y-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#F86C43]"
                  />

                  {/* Mobile Number */}
                  <div className="flex">
                    <div className="w-24 border border-gray-300 rounded-l-md flex items-center justify-center gap-2 bg-white">
                      🇮🇳 +91
                    </div>

                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-4 py-3 outline-none focus:border-[#F86C43]"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email Id"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#F86C43]"
                  />

                  <select className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#F86C43] bg-white">
                    <option>Interested in?</option>
                    <option>GRE</option>
                    <option>IELTS</option>
                    <option>GMAT</option>
                    <option>TOEFL</option>
                  </select>

                  <select className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#F86C43] bg-white">
                    <option>Your City</option>
                  </select>

                  <select className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#F86C43] bg-white">
                    <option>Nearest Center</option>
                  </select>

                  {/* Checkbox */}
                  <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-[#F86C43]"
                    />
                    Stay informed via SMS & WhatsApp
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-[#F86C43] hover:bg-[#ef5a2f] transition text-white font-semibold py-3 rounded-md"
                  >
                    Schedule a Call
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Result Section */}
      <Aboutresult data={studentsData || []} />

      <GreSection />
      <GrePatternTable />

      {/* Official Questions Section */}
      <section className="md:min-h-150 relative lg:overflow-hidden h-150 flex items-center justify-center mb-10">
        <div
          className="flex p-10 pl-0  flex justify-center items-center mx-auto lg:h-[60vh] 
          bg-gradient-to-r from-[#F1AA94] to-[#EE653C] pt-20 bg-cover bg-center bg-no-repeat"
        >
           <div className="hidden lg:block  lg:w-[40%] z-10 rounded-full">
            <img src="/Gre/laptop.png" alt="img" />
          </div>
          <div className="w-full lg:w-[45%] relative text-white pl-20">
            <span className="text-5xl font-bold">
              Official GRE Questions
              - only with Ooshas
            </span>
            <p className="my-6">
              We're the only GRE prep course licensed to use official ETS
              practice questions, so you know you're studying exactly what
              you'll see on test day.
            </p>
           <div className="flex justify-end"> <button className="bg-gray-700 text-white px-6 py-3 rounded-xl flex gap-2 ">
              <Play /> Preview Dashboard
            </button></div>
          </div>
         
        </div>
      </section>

      <AIStudySection aiStudySection={aiStudySection} />

      <div className="w-full max-w-6xl mx-auto my-14 relative">
       

        <div className="bg-[#FDF0EB] rounded-[40px] p-4 md:p-8 grid grid-cols-[800px_100px] items-center justify-between   min-h-[300px] z-1">
          <div className="flex-1 z-10 text-center md:text-left space-y-4 max-w-5xl pl-20">
            <span className="text-[#FF6A39] text-sm md:text-base font-medium tracking-wide block">
              Test Prep & Profile Building
            </span>
            <h1 className="text-[#333333] text-2xl md:text-3xl lg:text-5xl font-extrabold leading-tight">
              Boost Your <br className="hidden md:inline" />
              Study Abroad Profile!
            </h1>
            <div className="pt-2">
              <button className="bg-[#FF6A39] hover:bg-[#e05626] text-white font-bold px-8 py-3 rounded-xl shadow-md transition text-sm md:text-base">
                Enroll Now
              </button>
            </div>
          </div>

          <div className="">
            <img
              src="/girl-preparation.webp"
              alt="Graduate Student"
              className="object-contain 
              md:w-80 md:absolute md:-top-[134px] md:right-25 z-10"
            />
          </div>
        </div>
      </div>

      {/* Score Guarantee Section */}
      <section
        className="relative lg:overflow-hidden bg-cover bg-start bg-no-repeat lg:h-auto bg-gradient-to-b from-[#fdf0eb] to-white"
       
      >
        <div className="flex justify-center items-center flex-col w-full mt-32">
          <div
            dangerouslySetInnerHTML={{
              __html: scoreGuaranteeSection.title || "",
            }}
          />
          <p className="my-6">{scoreGuaranteeSection.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-6 mx-auto mt-10">
          {scoreGuaranteeSection.features?.map((ele: any, idx: number) => (
            <div
              key={idx}
              className="text-black/80 flex flex-col relative isolate "
            >
              <span className="absolute top-0 -left-2 h-18 w-12 bg-orange-600 rounded-2xl z-[-1]" />
              <div className="p-8 bg-white border rounded-xl">
                <h3 className="font-bold text-xl mb-2">{ele.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {ele.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <PricingSection plans={pricingData.pricing_plans} />
      </section>

      {/* Comparison Section */}
      {/* <section className="max-w-5xl mx-auto flex flex-col my-12 gap-8">
        <div className="flex items-center flex-col gap-4">
          <h4 className="text-base">We offer more</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: comparisonSection.sectionTitle || "",
            }}
          />
          <p className="text-base">{comparisonSection.sectionSubtitle}</p>
        </div>
        <div className="flex flex-wrap mt-8 gap-8 border-2 justify-evenly rounded-[2rem] px-10 py-8">
          <ul>
            {comparisonSection.ourFeatures?.map((item: any, idx: number) => (
              <li key={idx} className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
                <CircleCheckBig className="text-orange-600" />
                {item.feature}
              </li>
            ))}
          </ul>
          <ul>
            <li className="font-bold text-[#F36C45] mb-6 text-xl">
              {comparisonSection.competitorLabel}
            </li>
            {comparisonSection.competitorDrawbacks?.map(
              (item: any, idx: number) => (
                <li key={idx} className="flex gap-2 mt-4">
                  <CircleX className="text-gray-600" />
                  {item.drawback}
                </li>
              ),
            )}
          </ul>
        </div>
      </section> */}

      {/* Test Dates Section */}
      {/* <section className="max-w-5xl mx-auto mb-12">
        <div className="rounded-lg border-2">
          <button
            type="button"
            onClick={() => setShowTestDates(!showTestDates)}
            className="flex items-center gap-2 text-white font-bold text-xl rounded-lg bg-gray-600 w-full justify-between"
          >
            <p className="pl-20">{testDatesSection.toggleButtonText}</p>
            <p className="rounded-lg px-6 py-4 bg-[#F36C45]">
              {showTestDates ? "Hide" : "Show"} GRE Test Dates
            </p>
          </button>
          {showTestDates && (
            <table className="w-[90%] mx-auto my-6">
              {testDatesSection.testDates?.map((ele: any, idx: number) => (
                <tr key={idx}>
                  <td>{ele.start_date}</td>
                  <td className="text-center">{ele.end_date}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </section> */}

      {/* Mobile Apps Section */}
      {/* <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="mb-16">
          <div
            dangerouslySetInnerHTML={{
              __html: mobileAppsSection.sectionTitle || "",
            }}
          />
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            {mobileAppsSection.sectionSubtitle}
          </p>
          <div className="flex justify-center gap-4 mt-6">
            {mobileAppsSection.appStoreIcon && (
              <div className="w-6 h-6 opacity-60">
                <img src={mobileAppsSection.appStoreIcon} alt="App Store" />
              </div>
            )}
            {mobileAppsSection.playStoreIcon && (
              <div className="w-6 h-6 opacity-60">
                <img src={mobileAppsSection.playStoreIcon} alt="Play Store" />
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {mobileAppsSection.apps?.map((app: any, idx: number) => (
            <div key={idx} className="group">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {app.title}
              </h3>
              <p className="text-gray-500 mb-8">{app.description}</p>
              <div className="relative h-64 bg-gray-200 rounded-[32px] overflow-hidden flex items-center justify-center">
                {app.screenshot && (
                  <img
                    src={app.screenshot}
                    alt={app.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#ff5733] font-semibold text-sm uppercase tracking-wide mb-8">
          {mobileAppsSection.videoSectionLabel}
        </p>

        <div
          className="bg-gray-100 border-4 rounded-[48px] p-8 md:p-16 flex flex-col 
          md:flex-row items-center gap-12 text-left max-w-4xl relative"
        >
          <div className="flex-1 lg:text-center lg:max-w-1/2">
            <div
              dangerouslySetInnerHTML={{
                __html: mobileAppsSection.videoBoxTitle || "",
              }}
            />
            <p className="text-gray-600 text-base leading-relaxed">
              {mobileAppsSection.videoBoxDescription}
            </p>
          </div>
          <div
            className="flex-1 w-full flex items-center justify-center max-w-sm bg-red-100 rounded-3xl p-8 shadow-xl shadow-gray-200/50 
            lg:absolute -right-34 top-20 h-64 border border-gray-50"
          >
            <PlayCircle />
          </div>
        </div>
      </section> */}


      {/* Testimonials Section */}
      {/* <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-1">
          <div
            dangerouslySetInnerHTML={{
              __html: testimonialsSection.sectionTitle || "",
            }}
          />
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            {testimonialsSection.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div className="md:col-span-2 flex flex-col md:flex-row items-center bg-white p-8 relative">
            <div className="z-10 relative w-full md:w-1/3 md:ml-40 aspect-square bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-gray-300">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gray-800 border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
            <div
              className="border-2 border-gray-500 rounded-3xl md:w-1/2 mt-6 md:mt-0 text-left md:absolute 
              top-[7rem] p-2 md:pl-[10rem] md:pr-10 pt-10 right-[10rem] h-[75%]"
            >
              <div className="hidden md:block lg:w-1/2 absolute -top-3 left-0 rounded-[0_1rem] h-3 bg-[#F36C45]" />
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                "{featuredTestimonial.quote}"
              </p>
              <div className="flex justify-between items-center">
                <span>
                  <p className="font-bold text-gray-900">
                    {featuredTestimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {featuredTestimonial.meta}
                  </p>
                </span>
                {featuredTestimonial.ratingImage && (
                  <img src={featuredTestimonial.ratingImage} alt="rating" />
                )}
              </div>
            </div>
          </div>

          
          {testimonials.slice(0, 2).map((testimonial: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-left"
            >
              <p className="text-gray-600 mb-6 text-base">
                "{testimonial.quote}"
              </p>
              <div className="flex justify-between items-center">
                <span>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.meta}</p>
                </span>
                {testimonial.ratingImage && (
                  <img src={testimonial.ratingImage} alt="rating" />
                )}
              </div>
            </div>
          ))} 
        </div>
      </section> */}

      <DashboardSection />
      <VideoExplanationSection />
      <TextTestimonials />
      <FreeResources />
      <Consultants data={faqSection} />
      <Consultants />
    </>
  );
}




 function VideoExplanationSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 lg:pt-20 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Top Label */}
        <div className="flex justify-center mb-10">
          <span className="text-[#F36C45] text-lg md:text-xl font-medium">
            Video based learning
          </span>
        </div>

        {/* Main Card */}
        <div className="relative flex ">
          <div className="relative w-full max-w-5xl rounded-[40px] md:rounded-[52px] border-2
           border-[#D9D9D9] bg-[#FAFAFA] px-7 py-14 md:px-16 md:py-16 lg:pr-[320px]">

            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight text-[#333333]">
                Video explanations for
                <br />
                <span className="text-[#F36C45]">
                  every question
                </span>
              </h2>

              <p className="mt-8 text-[#5F5F5F] text-lg md:text-[1.2rem] leading-relaxed">
                Want to go further? We also include 290+ curated lessons
                shaped by student feedback to deliver material in the way
                you learn best.
              </p>

              <button className="mt-10 bg-[#F36C45] hover:bg-[#ec5d34] transition-all duration-300 text-white font-semibold rounded-xl px-10 py-4 text-lg shadow-lg">
                Watch Solution Now
              </button>
            </div>

            {/* Floating Video Card */}
            <div className="relative mt-12 lg:mt-0 w-xl lg:absolute lg:-right-64 lg:top-1/2 lg:-translate-y-1/2">

              <div
                className="
                w-full
                max-w-md
                md:max-w-lg
                rounded-[36px]
                bg-white
                border
                border-[#FFD8CC]
                p-8
                shadow-[0_10px_50px_rgba(243,108,69,0.18)]
              "
              >
                <h3 className="text-center text-2xl md:text-3xl font-semibold text-[#333333] ">
                  Video Explanation
                  <br />
                  Question 05
                </h3>

                {/* Play Button */}
                <div className="flex justify-center mt-8">
                  <button className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center hover:scale-105 transition">
                    <Play
                      size={34}
                      fill="currentColor"
                      className="ml-1 text-[#333333]"
                    />
                  </button>
                </div>

                {/* Author */}
                <div className="mt-10 flex items-center gap-4">

                  <img
                    src="https://i.pravatar.cc/120?img=12"
                    alt="Instructor"
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-xl font-semibold text-[#333333]">
                      By Mike McGarry
                    </h4>

                    <p className="text-sm text-[#666666]">
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


function FreeResources() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold">
            <span className="text-[#222]">Free GRE </span>
            <span className="text-[#F5632A]">Prep Resources</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {resources.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-[1rem] leading-6 min-h-[60px]">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  className={`flex-1 rounded-xl py-2 px-6 text-[1rem] font-semibold transition ${
                    item.filled
                      ? "bg-gradient-to-r from-[#FF6B00] to-[#F54B00] text-white hover:shadow-lg"
                      : "border-2 border-[#FFB184] text-[#F5632A] hover:bg-orange-50"
                  }`}
                >
                  {item.button}
                </button>

                <button className="w-18 h-14 rounded-full border-2 border-[#FFC29C] flex items-center justify-center text-[#F5632A] transition hover:bg-[#F5632A] hover:text-white">
                  <ArrowRight size={28} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  const features = [
    "Live video classes with chat",
    "Mock tests with instant results",
    "AI-powered study plans",
    "Score analytics & weak area tracking",
    "Downloadable notes & assignments",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FF5B36] via-[#FF7656] to-[#FDB19B] py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">
              An All-in-One Dashboard for Smarter Prep
            </h2>

            <p className="max-w-xl text-md text-white/90">
              Live classes, mock tests, progress graphs, AI tutor,
              study plans and revision tools all in one place.
            </p>

            <ul className="mt-10 space-y-1">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-lg text-white"
                >
                  <span className="mr-4 h-2.5 w-2.5 rounded-full bg-white"></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-5">
              <button className="rounded-xl bg-white px-8 py-4 font-semibold text-[#FF5B36] transition hover:scale-105 hover:shadow-xl">
                Try Free for 3 Days →
              </button>

              <button className="rounded-xl border border-white/30 bg-black/30 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-black/40">
                ▶ Preview Dashboard
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-[32px] bg-white p-3 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
              <Image
                src="/Gre/dashboard.png"
                alt="Dashboard Preview"
                width={900}
                height={650}
                className="rounded-[26px] object-cover"
              />
            </div>

            {/* Decorative Blur */}
            <div className="absolute -bottom-8 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FF7B5C]/40 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const resources = [
  {
    title: "Practice Material",
    description:
      "Take the GRE practice material and begin your GRE preparation now.",
    button: "Take GRE Practice Material",
    filled: true,
  },
  {
    title: "Other Resources",
    description:
      "Begin your GRE coaching with resources prepared by our experts to help you with your GRE prep.",
    button: "Download GRE Other Resources",
    filled: false,
  },
  {
    title: "Syllabus Download",
    description:
      "Download the GRE syllabus now and get a head start on your GRE preparation.",
    button: "Download GRE Syllabus",
    filled: true,
  },
];








//  function VideoExplanationSection() {
//   return (
//     <section className="py-20 px-6">
//       <div className="relative mx-auto max-w-7xl flex justify-center ">
//         <div className="bg-gray-100 border-4 rounded-[48px] p-8 md:p-16 flex flex-col  md:flex-row items-center gap-12 text-left max-w-4xl relative">
//           <div className="flex-1 lg:text-center lg:max-w-1/2"><div><ul><li data-list-item-id="e2fd5f0d31a61253b6ae2fc61640ab03f">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">Video explanations for</h2></li></ul>
//             <p className="text-[#F36C45]">every question</p></div><p className="text-gray-600 text-lg leading-relaxed">
//                Learn smarter with GRE video lessons covering quant, verbal, and writing. Access on‑demand GRE preparation through 
//                recorded classes anytime. Boost scores using AI‑powered video tools with adaptive practice and instant analytics.</p></div>
//                <div className="flex-1 w-full flex items-center justify-center max-w-sm bg-red-100 rounded-3xl p-8 shadow-xl shadow-gray-200/50 
//                 lg:absolute -right-34 top-20 h-64 border border-gray-50">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
//                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-play">
//                     <circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></div></div>
//       </div>
//     </section>
//   );
// }

// const resources = [
//   {
//     title: "Practice Material",
//     description:
//       "Take the GRE practice material and begin your GRE preparation now.",
//     button: "Take GRE Practice Material",
//     filled: true,
//   },
//   {
//     title: "Other Resources",
//     description:
//       "Begin your GRE coaching with resources prepared by our experts to help you with your GRE prep.",
//     button: "Download GRE Other Resources",
//     filled: false,
//   },
//   {
//     title: "Syllabus Download",
//     description:
//       "Download the GRE syllabus now and get a head start on your GRE preparation.",
//     button: "Download GRE Syllabus",
//     filled: true,
//   },
// ];

// function FreeResources() {
//   return (
//     <section className="py-4 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Heading */}
//         <div className="text-center mb-14">
//           <h2 className="text-4xl md:text-5xl font-bold">
//             <span className="text-[#222]">Free GRE </span>
//             <span className="text-[#F5632A]">Prep Resources</span>
//           </h2>
//         </div>

//         {/* Cards */}
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
//           {resources.map((item, index) => (
//             <div
//               key={index}
//               className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
//               <h3 className="text-3xl font-bold text-[#1E1E1E] mb-2">
//                 {item.title}
//               </h3>

//               <p className="text-gray-600 text-lg leading-6 min-h-[60px]">
//                 {item.description}
//               </p>

//               <div className="mt-8 flex items-center gap-4">
//                 <button
//                   className={`flex-1 rounded-xl py-2 px-6 text-lg font-semibold transition ${
//                     item.filled
//                       ? "bg-gradient-to-r from-[#FF6B00] to-[#F54B00] text-white hover:shadow-lg"
//                       : "border-2 border-[#FFB184] text-[#F5632A] hover:bg-orange-50"
//                   }`}
//                 >
//                   {item.button}
//                 </button>

//                 <button className="w-18 h-14 rounded-full border-2 border-[#FFC29C] flex items-center
//                  justify-center text-[#F5632A] transition hover:bg-[#F5632A] hover:text-white">
//                   <ArrowRight size={28} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

//  function DashboardSection() {
//   const features = [
//     "Live video classes with chat",
//     "Mock tests with instant results",
//     "AI-powered study plans",
//     "Score analytics & weak area tracking",
//     "Downloadable notes & assignments",
//   ];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-r from-[#FF5B36] via-[#FF7656] to-[#FDB19B] py-14">
//       <div className="mx-auto max-w-7xl px-6 lg:px-4">
//         <div className="grid items-center gap-8 lg:grid-cols-2">
//           {/* Left Content */}
//           <div className="text-white">
          

//             <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl ">
//               An All-in-One Dashboard for Smarter Prep
//             </h2>

//             <p className=" max-w-xl text-md  text-white/90">
//               Live classes, mock tests, progress graphs, AI tutor,
//               study plans and revision tools all in one place.
//             </p>

//             <ul className="mt-10 space-y-1">
//               {features.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center text-lg text-white"
//                 >
//                   <span className="mr-4 h-2.5 w-2.5 rounded-full bg-white"></span>
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-12 flex flex-wrap gap-5">
//               <button className="rounded-xl bg-white px-8 py-4 font-semibold text-[#FF5B36] transition hover:scale-105 hover:shadow-xl">
//                 Try Free for 3 Days →
//               </button>

//               <button className="rounded-xl border border-white/30 bg-black/30 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-black/40">
//                 ▶ Preview Dashboard
//               </button>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="relative">
//             <div className="rounded-[32px] bg-white p-3 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
//               <Image
//                 src="/dashboard-preview.png" // Replace with your image
//                 alt="Dashboard Preview"
//                 width={900}
//                 height={650}
//                 className="rounded-[26px] object-cover"
//               />
//             </div>

//             {/* Decorative Blur */}
//             <div className="absolute -bottom-8 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FF7B5C]/40 blur-3xl"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }