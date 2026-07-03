"use client";
import {
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
          <span className="text-[#f06437]">{data.title.split(" - ")[0]}</span> -{" "}
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
  const comparisonSection =
    pageInfo?.sections?.["comparison-section"]?.fields || {};
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
  const registrationSection =
    pageInfo?.sections?.["Registrations"]?.fields || {};
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
              className="text-black/80 flex flex-col relative isolate shadow-sm"
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
      {/* Text Testimonials */}
      <TextTestimonials />

      {/* Comparison Section */}
      <section className="max-w-5xl mx-auto flex flex-col my-12 gap-8">
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
      </section>

      {/* Test Dates Section */}
      <section className="max-w-5xl mx-auto mb-12">
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
      </section>

      {/* Mobile Apps Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
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
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
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
          {/* Featured Testimonial */}
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
      </section>

      <Consultants data={faqSection} />
        
      <Consultants />
    </>
  );
}







// import { ChevronDown, CircleCheckBig, CircleX, PlayCircle } from "lucide-react";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import { useState, useEffect, useRef } from "react";

// const data = [
//   {
//     start_date: "Saturday, March 14, 2026",
//     end_date: "Friday, March 27, 2026",
//   },
//   {
//     start_date: "Saturday, May 2, 2026",
//     end_date: "Friday, May 15, 2026",
//   },
//   {
//     start_date: "Saturday, June 6, 2026",
//     end_date: "Friday, June 19, 2026",
//   },
//   {
//     start_date: "Saturday, August 22, 2026",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, September 12, 2026",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, October 3, 2026",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, November 7, 2026",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, December 5, 2026",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, March 6, 2027",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, May 1, 2027",
//     end_date: "TBD",
//   },
//   {
//     start_date: "Saturday, June 5, 2027",
//     end_date: "TBD",
//   },
// ];

// const gerdata = [
//   {
//     title: "Practice Tests",
//     description: "Timed, full-length practice tests from our pool of questions",
//   },
//   {
//     title: "Official Content",
//     description:
//       "8 full sections worth of licensed official GRE® questions from ETS",
//   },
//   {
//     title: "1600+ Practice Questions",
//     description:
//       "Learn from your mistakes with a video explanation to every question",
//   },
//   {
//     title: "Expert Video Lessons",
//     description: "Prepare for every section, on any device and 100% online",
//   },
//   {
//     title: "Custom Study Schedules",
//     description: "Study checklists to stay motivated, 1 week to 6 months long",
//   },
//   {
//     title: "Accurate Score Predictor",
//     description: "Be confident when you're ready with our score predictor tool",
//   },
// ];

// const priceplan = {
//   testimonial:
//     "Ooshas prep gets rave reviews from students, many of whom have improved their GRE score with this flexible and affordable plan.",
//   pricing_plans: [
//     {
//       plan_name: "Premium · 1 month",
//       bg: "gray-100",
//       subtitle: "Great option for limited study time",
//       content_features: [
//         "8 full sections of official GRE® questions",
//         "290+ video lessons",
//         "Over 1600 practice questions",
//         "Up to 6 practice tests",
//         "Study schedules",
//       ],
//       access_features: [
//         "1 month of access",
//         "+5 total score guarantee",
//         "Ask an expert",
//         "Pause your plan",
//       ],
//       price: "$99 USD",
//     },
//     {
//       plan_name: "Premium · 1 month",
//       is_highlighted: true,
//       bg: "orange-100",
//       subtitle: "Great option for limited study time",
//       content_features: [
//         "8 full sections of official GRE® questions",
//         "290+ video lessons",
//         "Over 1600 practice questions",
//         "Up to 6 practice tests",
//         "Study schedules",
//       ],
//       access_features: [
//         "1 month of access",
//         "+5 total score guarantee",
//         "Ask an expert",
//         "Pause your plan",
//       ],
//       price: "$150 USD",
//     },
//     {
//       plan_name: "Premium · 1 month",
//       bg: "[#00b7ff0f]",
//       subtitle: "Great option for limited study time",
//       bundle_offer: "Bundle and save $854 ($1073 value)",
//       content_features: [
//         "8 full sections of official GRE® questions",
//         "290+ video lessons",
//         "Over 1600 practice questions",
//         "Up to 6 practice tests",
//         "Study schedules",
//       ],
//       access_features: [
//         "1 month of access",
//         "+5 total score guarantee",
//         "Ask an expert",
//         "Pause your plan",
//       ],
//       price: "$170 USD",
//     },
//   ],
// };

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Mitchell",
//     score: 10,
//     rating: 5,
//     testimonial:
//       "Absolutely transformed our workflow! The intuitive design and seamless integration saved us countless hours. Best decision we made this year.",
//   },
//   {
//     id: 2,
//     name: "James Chen",
//     score: 9,
//     rating: 5,
//     testimonial:
//       "Outstanding service and support. The team went above and beyond to ensure everything was perfect. Highly recommend to anyone looking for quality.",
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     score: 10,
//     rating: 5,
//     testimonial:
//       "Game-changer for our business. The results exceeded our expectations and the ROI was visible within the first month. Couldn't be happier!",
//   },
//   {
//     id: 4,
//     name: "Michael Thompson",
//     score: 9,
//     rating: 4,
//     testimonial:
//       "Professional, reliable, and incredibly efficient. They delivered exactly what was promised and more. A pleasure to work with from start to finish.",
//   },
//   {
//     id: 5,
//     name: "Lisa Anderson",
//     score: 10,
//     rating: 5,
//     testimonial:
//       "From the first consultation to final delivery, the experience was flawless. Their attention to detail and commitment to excellence is unmatched.",
//   },
// ];

// export default function Gre() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
//     initial: 0,
//     loop: true,
//     mode: "snap",
//     slides: {
//       origin: "center",
//       perView: 1.5,
//       spacing: 16,
//     },
//     breakpoints: {
//       "(min-width: 640px)": {
//         slides: {
//           origin: "center",
//           perView: 2.2,
//           spacing: 20,
//         },
//       },
//       "(min-width: 1024px)": {
//         slides: {
//           origin: "center",
//           perView: 3,
//         },
//       },
//     },
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//   });

//   // Auto-play functionality
//   useEffect(() => {
//     const startAutoPlay = () => {
//       timerRef.current = setInterval(() => {
//         instanceRef.current?.next();
//       }, 4000);
//     };

//     startAutoPlay();

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [instanceRef]);

//   // Pause on hover
//   const handleMouseEnter = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//   };

//   const handleMouseLeave = () => {
//     timerRef.current = setInterval(() => {
//       instanceRef.current?.next();
//     }, 4000);
//   };

//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const [show, setshow] = useState();

//   return (
//     <>
//       <section
//         className="min-h-150 relative overflow-hidden bg-[url('/Gre/bg.jpg')]  bg-cover bg-center
//        bg-no-repeat  "
//       >
//         <div className="lg:max-w-[90%] ml-auto">
//           <div className="flex p-10 lg:flex pt-30 items-center lg:rounded-[0_0_0_10rem] h-auto lg:h-[60vh] lg:bg-gray-200">
//             <div className="w-1/2 relative">
//               <h1 className="text-5xl font-bold ">
//                 The smartest way to{" "}
//                 <span className=" my-2 text-orange-600 flex items-center">
//                   master the GRE
//                   <p className="mx-1 border-2 border-orange-600 rounded-full text-xl flex items-center justify-center h-8 w-8">
//                     R
//                   </p>
//                 </span>
//               </h1>

//               <p className=" my-6">
//                 The original self-paced GRE course. Get Official GRE quetions,
//                 an Al tutor , video lessons, and top-rated mobile apps at a
//                 third of the price of other "premium" options.
//               </p>

//               <button className="bg-black rounded-2xl lg:absolute -bottom-[6rem] left-25 text-base px-4 py-1 text-white">
//                 Full courses starts at $99
//               </button>
//             </div>

//             <div className="w-1/2 pt-10">
//               <img src="/Gre/main.png" alt="img" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <Aboutresult data={[]} />

//       <TextTestimonials />

//       <section className="max-w-5xl mx-auto flex flex-col my-20  gap-8">
//         <div className="flex items-center flex-col gap-4">
//           <h4 className="text-base">We offer more</h4>
//           <h2 className="flex flex-wrap  gap-2 text-2xl md:text-4xl lg:text-5xl font-bold">
//             Better scores. Better{" "}
//             <p className="text-[#F36C45]">Price. Guaranteed.</p>
//           </h2>
//           <p className="text-base">
//             Improve your score by 5 points or your money back.
//           </p>
//         </div>
//         <div className="flex flex-wrap mt-8 gap-8 border-2 justify-evenly rounded-[2rem] px-10 py-8">
//           <ul>
//             <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
//               <CircleCheckBig className="text-orange-600" />
//               The only course with official GRE questions
//             </li>
//             <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
//               <CircleCheckBig className="text-orange-600" />
//               Get a Ooshas-trained Al tutor that works with ou until you get it
//             </li>
//             <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
//               <CircleCheckBig className="text-orange-600" />
//               Video and text-based lessons to support multiple learning styles
//             </li>
//             <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
//               <CircleCheckBig className="text-orange-600" />
//               Download our mobile apps to practice on the go{" "}
//             </li>
//             <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
//               <CircleCheckBig className="text-orange-600" />
//               Starts at affordable $99
//             </li>
//           </ul>
//           <ul>
//             <li className="font-bold text-[#F36C45] mb-6 text-xl">
//               other "Premium" Courses
//             </li>
//             <li className="flex gap-2 mt-4">
//               <CircleX className="text-gray-600" />
//               No access to real GRE questions
//             </li>
//             <li className="flex gap-2 mt-4">
//               <CircleX className="text-gray-600" />
//               No Al support to guide you studying
//             </li>
//             <li className="flex gap-2 mt-4">
//               <CircleX className="text-gray-600" />
//               No access to real GRE questions
//             </li>
//             <li className="flex gap-2 mt-4">
//               <CircleX className="text-gray-600" />
//               Not optimized for mobile{" "}
//             </li>
//             <li className="flex gap-2 mt-4">
//               <CircleX className="text-gray-600" />
//               Costs upwards of $500
//             </li>
//           </ul>
//         </div>
//       </section>

//       <section className="lg:min-h-150 relative lg:overflow-hidden  h-60 ">
//         <div
//           className="flex p-10 pl-20  flex-row-reverse items-center mx-auto lg:h-[60vh]
//         bg-[url('/Gre/bg2.jpg')] pt-20 bg-cover bg-center bg-no-repeat"
//         >
//           <div className="lg:w-1/2 relative text-white px-auto">
//             <span className="text-5xl font-bold ">
//               Official GRE Questions
//               <br /> - only with Ooshas
//             </span>

//             <p className=" my-6">
//               We're the only GRE prep course licensed to use official ETS
//               practice questions, so you know you're studying exactly what
//               you'll see on test day.
//             </p>
//           </div>

//           <div className="lg:w-1/2  z-10  rounded-full">
//             <img src="/Gre/laptop.png" alt="img" />
//           </div>
//         </div>
//       </section>

//       <section className=" py-16 px-4">
//         <div className="max-w-7xl mx-auto flex items-center flex-col">
//           {/* Heading */}
//           <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
//             <span className="text-gray-700">Study smarter with </span>{" "}
//             <span className="text-[#F36C45]">Al</span>{" "}
//           </h2>

//           <p className="text-gray-600 mb-12 text-base">
//             Get instant, GRE-style essay scoring and targete eedback , chate
//             with and expert Al tutor, and practice with Ooshas.
//           </p>

//           <div className=" flex flex-col gap-6">
//             {[
//               {
//                 heading: "5,000+ Similar Practice Questions",
//                 content:
//                   "Missed a question? Get similar, high-quality Al-genrated problems to practice again",
//                 img: "/Gre/que.png",
//               },
//               {
//                 heading: "AL Tutor",
//                 content:
//                   "Chat with an Al expert trained on lessons and content and ready to explain whatever you don't grasp.",
//                 img: "/Gre/que.png",
//               },
//             ].map((ele, idx) => (
//               <div
//                 className={`border-2 rounded-xl bg-gray-100 w-full flex items-center gap-4  ${idx === 1 && "flex-row-reverse"}`}
//               >
//                 <img src={ele.img} alt="img" className="h-1/4" />
//                 <span className="p-4">
//                   <h2 className="font-bold text-xl mb-4">{ele.heading}</h2>
//                   <p>{ele.content}</p>
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="max-w-5xl  mx-auto my-20">
//         <div className="rounded-lg border-2">
//           <button
//             type="button"
//             onClick={() => setshow(!show)}
//             className="flex items-center gap-2 text-white font-bold text-xl  rounded-lg bg-gray-600 w-full justify-between "
//           >
//             <p className="pl-20">
//               {" "}
//               Choose the best schedule for your test date!{" "}
//             </p>
//             <p className="rounded-lg px-6 py-4 bg-[#F36C45]">
//               {show && "Hide"} GRE Test Dates
//             </p>
//           </button>

//           {show && (
//             <table className="w-[90%] mx-auto my-6">
//               {data.map((ele, idx) => (
//                 <tr key={idx}>
//                   <td className="">{ele.start_date}</td>
//                   <td className="text-center">{ele.end_date}</td>
//                 </tr>
//               ))}
//             </table>
//           )}
//         </div>
//       </section>

//       <section
//         className=" relative lg:overflow-hidden bg-[url('/Gre/orangebg.jpg')]  bg-cover bg-start
//        bg-no-repeat lg:h-[100vh] "
//       >
//         <div className="flex justify-center items-center flex-col w-full mt-20">
//           <span className="text-5xl font-bold ">
//             <span className=" my-2 flex items-center flex-wrap">
//               Improve Your GRE
//               <p
//                 className="mx-1 border-2 border-orange-600 rounded-full text-xl
//                      flex items-center justify-center h-8 w-8"
//               >
//                 R
//               </p>
//               Score,
//             </span>
//             <p className="text-[#F36C45] lg:text-center">Guaranted!</p>
//           </span>

//           <p className=" my-6">
//             Prep smart at an affordable price. fully optimized for the shorter
//             GRE.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-6 mx-auto mt-10">
//           {gerdata.map((ele, idx) => (
//             <div
//               key={idx}
//               className="  text-black/80 flex flex-col relative isolate shadow-sm"
//             >
//               <span className="absolute top-0 -left-2 h-18 w-12 bg-orange-600 rounded-2xl z-[-1]" />
//               <div className="p-8 bg-white border rounded-xl">
//                 <h3 className="font-bold text-xl mb-2">{ele.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {ele.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <PricingSection plans={priceplan.pricing_plans} />

//       <section className="max-w-6xl mx-auto px-6 py-20  text-center">
//         <div className="mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
//             Turn any free minute into{" "}
//             <span className="text-[#ff5733]">study time</span>
//           </h1>
//           <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
//             Review key vocab with our Flashcard App or dive into lessons and
//             practice using the Prep-on-the-Go App.
//           </p>

//           <div className="flex justify-center gap-4 mt-6">
//             <div className="w-6 h-6 opacity-60">
//               <img src="/image/app-store.png" alt="Apple" />
//             </div>
//             <div className="w-6 h-6 opacity-60">
//               <img src="/image/play-store.png" alt="Android" />
//             </div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12 mb-24">
//           <div className="group">
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">
//               Flashcard App
//             </h3>
//             <p className="text-gray-500 mb-8">
//               Study the words you'll face on test day — no fluff or
//             </p>
//             <div className="relative h-64 bg-gray-200 rounded-[32px] overflow-hidden flex items-center justify-center"></div>
//           </div>

//           <div className="group">
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">
//               Prep-on-the-Go App
//             </h3>
//             <p className="text-gray-500 mb-8">
//               Access our video lessons & practice questions
//             </p>
//             <div className="relative h-64 bg-gray-200 rounded-[32px] overflow-hidden flex items-center justify-center"></div>
//           </div>
//         </div>

//         <p className="text-[#ff5733] font-semibold text-sm uppercase tracking-wide mb-8">
//           Video based learning
//         </p>

//         <div
//           className="bg-gray-100 border-4  rounded-[48px] p-8 md:p-16 flex flex-col
//          md:flex-row items-center gap-12 text-left max-w-4xl relative"
//         >
//           <div className="flex-1 lg:text-center lg:max-w-1/2">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
//               Video explanations for
//               <p className="text-[#F36C45]">every question</p>
//             </h2>
//             <p className="text-gray-600 text-base leading-relaxed">
//               Want to go further? We also include 290+ curated lessons shaped by
//               student feedback to deliver material in the way you learn best.
//             </p>
//           </div>

//           <div
//             className="flex-1 w-full flex items-center justify-center max-w-sm bg-red-100 rounded-3xl p-8 shadow-xl shadow-gray-200/50
//            lg:absolute -right-34 top-20 h-44 border border-gray-50"
//           >
//             <PlayCircle />
//           </div>
//         </div>
//       </section>

//       <section className="max-w-6xl mx-auto px-6 py-20 ">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
//             More students choose <br />
//             <span className="text-[#ff5733]">Ooshas prep</span> than anyone{" "}
//             <br />
//             else.
//           </h1>
//           <p className="text-gray-500 max-w-2xl mx-auto text-base">
//             Check out what others say about us.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
//           <div className="md:col-span-2 flex flex-col md:flex-row items-center bg-white p-8 relative ">
//             <div className="z-10 relative w-full md:w-1/3 md:ml-40 aspect-square bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-gray-300">
//               <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
//                 <div
//                   className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gray-800
//               border-b-[8px] border-b-transparent ml-1"
//                 />
//               </div>

//               {/* <div className="absolute inset-0 bg-gradient-to-t from-red/20 to-transparent" /> */}
//             </div>

//             <div
//               className="border-2 border-gray-500 rounded-3xl md:w-1/2  mt-6 md:mt-0 text-left md:absolute
//             top-[7rem] p-2 md:pl-[10rem] md:pr-10 pt-10 right-[10rem] h-[75%] "
//             >
//               <div className="hidden md:block lg:w-1/2 absolute -top-3 left-0 rounded-[0_1rem] h-3 bg-[#F36C45]" />

//               <p className="text-gray-700 text-base leading-relaxed mb-4 ">
//                 "The best thing for me about Ooshas prep was the flexibility...
//                 Ooshas being within my price range was the difference between me
//                 potentially getting into grad school and not getting in
//                 anywhere."
//               </p>
//               <div className="flex justify-between items-center ">
//                 <span>
//                   <p className="font-bold text-gray-900">Eleanore P.</p>
//                   <p className="text-sm text-gray-500">Ooshas Student - 2021</p>
//                 </span>
//                 <img src="/Gre/002.png" alt="img" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-left">
//             <p className="text-gray-600 mb-6 text-base">
//               "Vast question bank provided for various levels of questions with
//               helpful explanations. Also, the AI tutor helped clear any further
//               doubts."
//             </p>

//             <div className="flex justify-between items-center ">
//               <span>
//                 <p className="font-bold text-gray-900">Eleanore P.</p>
//                 <p className="text-sm text-gray-500">Ooshas Student - 2021</p>
//               </span>
//               <img src="/Gre/002.png" alt="img" />
//             </div>
//           </div>

//           <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-left">
//             <p className="text-gray-600 mb-6 text-base">
//               "There were plenty of practice questions and tests available, and
//               everything was super easy to use! A bonus is that Magoosh has
//               official ETS practice sections..."
//             </p>

//             <div className="flex justify-between items-center ">
//               <span>
//                 <p className="font-bold text-gray-900">Eleanore P.</p>
//                 <p className="text-sm text-gray-500">Ooshas Student - 2021</p>
//               </span>
//               <img src="/Gre/002.png" alt="img" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <Consultants />
//     </>
//   );
// }

// import { Star } from "lucide-react";
// import { Aboutresult } from "../about_result";
// import { TextTestimonials } from "../testimonial_gre";
// import PricingSection from "../plan";
// import { Consultants } from "../destinations-consultants";
// import { bg } from "date-fns/locale";

// function TestimonialCard({
//   name = "",
//   score = 0,
//   rating = 0,
//   testimonial = "",
//   isActive = false,
// }: {
//   name?: string;
//   score?: number;
//   rating?: number;
//   testimonial?: string;
//   isActive?: boolean;
// }) {
//   return (
//     <div
//       className={`
//         relative max-w-[520px] rounded-3xl bg-white px-6 py-20
//         transition-all duration-500 ease-out
//         ${
//           isActive
//             ? "border-2 border-[#F36C45] shadow-2xl scale-100 opacity-100 z-20"
//             : "border border-orange-300 scale-90 opacity-40 blur-[1.5px] z-10 -mx-8 "
//         }
//       `}
//     >
//       {/* HEADER */}
//       <div className="flex items-center gap-2 mb-4">
//         <span className="font-bold text-xl text-[#F36C45]">
//           {name}: {score}
//         </span>

//         <div className="flex gap-1 ml-3">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               className={`w-5 h-5 ${
//                 i < rating ? "fill-[#F36C45] text-[#F36C45]" : "text-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <p className="text-gray-600 text-base font-semibold leading-relaxed">
//         {testimonial}
//       </p>
//     </div>
//   );
// }
