"use client";

import Image from "next/image";
import Link from "next/link";
import ReviewSlider from "./review-slider";
import SpokenEnglishEnquiryForm from "./spoken-english-enquiry-form";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Phone,
  Presentation,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import styles from "./spoken-english-course.module.css";
import PopupModal from "@/components/popupModel";
import { useState } from "react";

const defaultReviews = [
  "Ooshas Prep helped me improve my spoken English and boost my confidence. Great learning experience!",
  "Ooshas Prep has made learning Spoken English easy and enjoyable. I feel more confident while speaking English now!",
  "Excellent Spoken English classes at Ooshas Prep! The teaching is easy to understand, and my communication skills have improved a lot.",
];

const defaultBenefits = [
  "Experienced & Certified Trainers – Learn from skilled instructors with practical teaching expertise.",
  "Personalised Learning Plans – Courses designed to match your goals, level, and learning pace.",
  "Practical Classroom Training – Improve fluency through conversations, activities, and real-life speaking practice.",
  "One Lakh+ Students Trained Since 1997 – Trusted by learners for quality English education.",
  "Online & Offline Learning Options – Flexible classes that fit your schedule and learning style.",
  "Cambridge University Press Content – Learn with internationally trusted English learning material.",
];

const defaultComparison = [
  { feature: "Class Type", individual: "Live 1:1 Classes", traditional: "Group Classes" },
  { feature: "Speaking Time", individual: "60–70% Speaking Time", traditional: "9–90% Speaking Time" },
  { feature: "Feedback", individual: "Instant Feedback", traditional: "Delayed Feedback" },
  { feature: "Flexibility", individual: "Flexible Scheduling", traditional: "Fixed Timings" },
  { feature: "Practice", individual: "Real Conversations", traditional: "Theory-Based Learning" },
  { feature: "Class Mode", individual: "100% Online", traditional: "Travel Required" },
  { feature: "Learning Module", individual: "Personalized Learning", traditional: "Same for Everyone" },
];

const stepIcons = [Phone, CalendarDays, Presentation, UsersRound];
const defaultSteps = [
  { title: "Contact Us", detail: "Call or fill out the form on our website to get started." },
  { title: "Schedule a Demo", detail: "Attend a free demo class to experience our teaching methods." },
  { title: "Choose your course", detail: "Select the course that matches your goals." },
  { title: "Begin Learning", detail: "Start your journey toward fluency with expert guidance." },
];

const defaultLearningPoints = [
  {
    title: "Daily Conversation Skills",
    detail: "Learn to speak naturally in everyday situations, from greetings and travel to social and work talks.",
  },
  {
    title: "English Grammar",
    detail: "Master grammar through interactive speaking activities, not rote learning, so you speak correctly without overthinking.",
  },
  {
    title: "Vocabulary for Everyday Use",
    detail: "Build a strong vocabulary with useful words and phrases for daily, academic, and professional communication.",
  },
  {
    title: "Pronunciation & Accent Improvement",
    detail: "Enhance clarity and confidence with guided pronunciation practice and voice modulation exercises.",
  },
  {
    title: "Fluency & Confidence Building",
    detail: "Enhance clarity and confidence with guided pronunciation practice and voice modulation exercises.",
  },
  {
    title: "Real-Life Practice Session",
    detail: "Use English in lifelike situations like interviews, discussions, and everyday conversations that prepare you for the real world.",
  },
];

export default function SpokenEnglishTemplate({ pageInfo }: { pageInfo?: any }) {
  const fields = (section: string) => pageInfo?.sections?.[section]?.fields || {};
  const value = (section: string, name: string, fallback: string) =>
    fields(section)[name] || fallback;
  const items = <T,>(section: string, name: string, fallback: T[]): T[] => {
    const result = fields(section)[name];
    return Array.isArray(result) && result.length ? result : fallback;
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const heroButtonUrl = value("hero", "buttonUrl", "#start-learning").trim();

  const reviews = items("reviews", "items", defaultReviews.map((text) => ({ text, rating: "5" })));
  const benefits = items("why-choose-us", "items", defaultBenefits.map((text) => ({ text })));
  const comparison = items("comparison", "items", defaultComparison);
  const steps = items("course-process", "items", defaultSteps);
  const learningPoints = items("learning", "items", defaultLearningPoints);
  const classItems = items("classes", "items", [
    { title: "Best English Speaking Course in Delhi", description: "Oxford School of English offers one of the best English speaking courses in Delhi for beginners, students, working professionals, and job seekers. Our English course improves grammar, vocabulary, pronunciation, fluency, and communication skills through practical classroom training and personalised learning. We provide both online and offline English speaking classes to suit every learner’s schedule." },
    { title: "English Speaking Classes with Practical Learning", description: "Looking for an English speaking course near me? Our interactive classes focus on real-life communication through conversations, role-plays, presentations, group discussions, and speaking activities. With continuous trainer guidance and personalised feedback, students develop the confidence to communicate effectively in interviews, workplaces, business meetings, and everyday situations." },
    { title: "More Than an English Course", description: "Along with our English speaking course, we also offer IELTS, PTE, TOEIC, and Personality Development classes under one roof. Since 1997, Oxford School of English has trained more than One Lakh students using Cambridge University Press content, experienced trainers, smart classrooms, and personalised coaching through both online and offline learning." },
  ]);

  return (
    <main className={styles.page}>
      {/* <section className={styles.hero} aria-labelledby="hero-title">
        
<div className={styles.heroArt}>
  <Image
    src={value("hero", "image", "/spoken-english/hero.webp")}
    alt={value(
      "hero",
      "imageAlt",
      "A student reading and enjoying a book"
    )}
    fill
    priority
    sizes="(max-width: 700px) 100vw, 52vw"
    className={styles.heroImage}
  />
</div>


        <div className={`${styles.heroInner} ${styles.container}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title">
              {value("hero", "title", "English Speaking Course")}
              <span>{value("hero", "subtitle", "Ooshas Prep Spoken Curriculum")}</span>
            </h1>
            <p className={styles.heroMeta}>{value("hero", "deliveryModes", "Classroom | Online | Personalised")}</p>
            <p className={styles.heroMeta}>{value("hero", "examTypes", "English | IELTS | PTE | PD | Competitive")}</p>
            <Link className={styles.primaryButton} href={value("hero", "buttonUrl", "#start-learning")}>
              {value("hero", "buttonText", "Start Spoken English Test")} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section> */}
         

<section
  className="relative min-h-[565px] overflow-hidden bg-[#FFF5F8]"
  aria-labelledby="hero-title"
>
  {/* Main layout */}
  <div className="relative mx-auto grid min-h-[565px] max-w-7xl grid-cols-1 items-center px-5 sm:px-8 lg:grid-cols-[55%_45%] lg:px-10 xl:px-0">

    {/* Right-side image */}
    <div className="pointer-events-none absolute inset-y-0 -right-5 z-0 hidden w-[55%] xl:block">
      <Image
        src={value("hero", "image", "/spoken-english/hero.webp")}
        alt={value(
          "hero",
          "imageAlt",
          "A student reading and enjoying a book"
        )}
        width={1000}
        height={900}
        priority
        sizes="(max-width: 1279px) 50vw, 60vw"
        className="absolute bottom-0 right-[-100px] h-auto w-[950px] max-w-none object-contain object-bottom"
      />
    </div>

    {/* Left content */}
    <div className="relative z-10 py-14 lg:py-0">
      <h1
        id="hero-title"
        className="text-[38px] font-bold leading-[1.25] tracking-[-1.5px] text-[#F23858] sm:text-[40px]"
      >
        <span className="text-black/80">
        {value("hero", "title", "English Speaking Course").split("|")[0]}

        </span>
        {value("hero", "title", "English Speaking Course").split("|")[1]}


        {/* <span className="mt-3 block text-[27px] font-semibold leading-tight tracking-[-0.8px] text-black sm:text-[34px] lg:text-[32px]">
          {value("hero", "subtitle", "Ooshas Prep Spoken Curriculum")}
        </span> */}
      </h1>

      <p className="mt-4 text-base sm:text-lg leading-[1.5] text-[#555555]">
        {value(
          "hero",
          "deliveryModes",
          "Classroom | Online | Personalised"
        )}
      </p>

      <p className="mt-2 text-base sm:text-lg leading-[1.6] text-[#555555]">
        {value(
          "hero",
          "examTypes",
          "English | IELTS | PTE | PD | Competitive"
        )}
      </p>

      {heroButtonUrl === "*" ? (
        <button
          type="button"
          onClick={() => setIsPopupOpen(true)}
          className="mt-6 inline-flex items-center justify-center gap-3 bg-[#F2183D] px-5 py-3 text-[16px] font-bold text-white transition-colors hover:bg-[#D91032]"
        >
          {value("hero", "buttonText", "Start Spoken English Test")}
          <ArrowRight size={19} />
        </button>
      ) : (
        <Link
          href={heroButtonUrl}
          className="mt-6 inline-flex items-center justify-center gap-3 bg-[#F2183D] px-5 py-3 text-[16px] font-bold text-white transition-colors hover:bg-[#D91032]"
        >
          {value("hero", "buttonText", "Start Spoken English Test")}
          <ArrowRight size={19} />
        </Link>
      )}
    </div>
  </div>
</section>

      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />




      <section className={`${styles.reviews} ${styles.container}`} aria-labelledby="reviews-title">
        <div className={styles.reviewsLayout}>
          <div className={styles.reviewsCopy}>
            <h2 id="reviews-title"><span>{value("reviews", "title", "Student Reviews")}</span> &amp; {value("reviews", "suffix", "Google Rating")}</h2>
            <p className={styles.reviewsIntro}>Real stories from learners building confidence, fluency, and stronger everyday communication.</p>
            <ReviewSlider reviews={reviews} />
          </div>
          <SpokenEnglishEnquiryForm />
        </div>
      </section>

     
<section className="w-full bg-white px-2 py-5 sm:px-0">
  <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 md:grid-cols-[minmax(0,3.1fr)_minmax(100px,1fr)]">

    {/* Main Content */}
    <div className="flex min-w-0 flex-col bg-[#F0F4F7] px-5 py-8 sm:px-10 md:px-12 lg:px-[124px] lg:py-[55px]">

      <h2
        id="growth-title"
        className="mb-4 text-[27px] font-bold leading-[1.35] tracking-[-0.8px] text-black sm:text-[32px]"
      >
        {value("classes", "titleLead", "English Speaking ")}
        <span className="text-[#F23858]">
          {value("classes", "titleAccent", "Classes for Career Growth")}
        </span>
      </h2>

      <div className="space-y-6 text-[15px] leading-[1.6] text-[#111111] sm:text-[16px]">
        {classItems.map((item: any, index) => (
          <div key={`${item.title}-${index}`}>
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="inline-flex items-center justify-center bg-black px-3 py-2 text-xs font-bold text-white transition-colors duration-200 hover:bg-[#F23858] sm:text-sm"
        >
          {value("classes", "buttonText", "Start Spoken English Test")}
        </button>
      </div>
    </div>

    {/* Vertical ENGLISH Text */}
    <div className="relative hidden min-h-full overflow-hidden bg-white md:flex md:items-center md:justify-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 select-none whitespace-nowrap text-[100px] font-extrabold leading-none tracking-[3px] text-[#E3EBF7] lg:text-[130px] xl:text-[150px]"
        style={{
          transform: "translate(-50%, -50%) rotate(-90deg)",
        }}
      >
        ENGLISH
      </span>

      {/* Soft white blur overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-33 top-0 z-10 h-full w-[50px] -translate-x-1/2 bg-white/60 blur-xl"
      />
    </div>

  </div>
</section>


      {/* <section className={styles.growth} aria-labelledby="growth-title">
        <div className={`${styles.growthInner} ${styles.container}`}>
          <div className={styles.growthCopy}>
            <h2 id="growth-title">{value("classes", "titleLead", "English Speaking ")}<span>{value("classes", "titleAccent", "Classes for Career Growth")}</span></h2>
            {classItems.map((item: any, index) => (
              <div key={`${item.title}-${index}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
            <Link className={styles.darkButton} href={value("classes", "buttonUrl", "#start-learning")}>{value("classes", "buttonText", "Start Spoken English Test")}</Link>
          </div>
          <div className={styles.verticalWord} aria-hidden="true">ENGLISH</div>
        </div>
      </section> */}

      {/* <section className={styles.why} aria-labelledby="why-title">
        <div className={`${styles.whyInner} ${styles.container}`}>
          <div className={styles.whyHeading}>
            <Image src={value("why-choose-us", "image", "/spoken-english/why-choose-us.webp")} alt={value("why-choose-us", "imageAlt", "A bright idea light bulb")} width={360} height={400} sizes="(max-width: 760px) 40vw, 280px" />
            <h2 id="why-title">{value("why-choose-us", "title", "WHY\nCHOOSE\nUS?").split("\n").map((line: string, index: number) => <span key={index}>{line}<br /></span>)}</h2>
          </div>
          <ul className={styles.benefitList}>
            {benefits.map((benefit: any, index: number) => (
              <li key={`${benefit.text || benefit}-${index}`}><Check size={18} strokeWidth={2.5} /><span>{benefit.text || benefit}</span></li>
            ))}
          </ul>
        </div>
      </section> */}
      
<section className="w-full bg-white px-0 py-1" aria-labelledby="why-title">
  <div className="relative mx-auto grid min-h-[450px] grid-cols-1 overflow-hidden bg-[#F23858] md:grid-cols-[28%_72%]">
    {/* Decorative circles */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-16 bottom-0 h-52 w-40 rounded-full bg-white/15"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 top-20 h-44 w-32 rounded-full bg-white/15"
    />

    {/* Left Side - Image + Heading */}
    <div className="relative z-10 flex min-w-0 items-center justify-center px-5 py-8 md:justify-end md:px-0 md:py-0">
      <div className="flex w-full max-w-[340px] flex-col items-center md:items-start">
        <div className="flex w-full justify-end">
          <Image
            src={value(
              "why-choose-us",
              "image",
              "/spoken-english/why-choose-us.webp"
            )}
            alt={value(
              "why-choose-us",
              "imageAlt",
              "A bright idea light bulb"
            )}
            width={360}
            height={400}
            sizes="(max-width: 760px) 40vw, 280px"
            className="h-40 w-40 object-contain"
          />
        </div>

        <h2
          id="why-title"
          className="mt-[-20px] px-10 text-center text-[42px] font-extrabold uppercase leading-[1.12] tracking-[-1.5px] text-white sm:text-[50px] md:mt-[-30px] md:text-left md:text-[58px]"
        >
          {value("why-choose-us", "title", "WHY\nCHOOSE\nUS?")
            .split("\n")
            .map((line: string, index: number) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </h2>
      </div>
    </div>

    {/* Right Side - Dynamic Benefits */}
    <div className="relative z-10 flex items-center p-4 sm:p-6 md:py-[14px] md:pl-0 md:pr-16">
      <div className="w-full bg-white px-5 py-7 sm:px-8 md:min-h-[418px] md:px-[50px] md:py-[42px]">
        <ul className="flex h-full flex-col justify-center gap-4 sm:gap-[18px]">
          {benefits.map((benefit: any, index: number) => (
            <li
              key={`${benefit.text || benefit}-${index}`}
              className="flex items-center gap-4"
            >
              <svg
                className="mt-[3px] h-[26px] w-[26px] flex-shrink-0 text-[#F23858]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5"
                />
                <path d="m7 12 3.2 3.2L21 4.8" />
              </svg>

              <span className="text-[16px] font-normal leading-[1.08] tracking-[-0.35px] text-[#111111] sm:text-[18px] md:text-[16px]">
                {benefit.text || benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>


      <section className={`${styles.comparisonSection} ${styles.container}`} aria-labelledby="comparison-title">
        <h2 id="comparison-title"><span>{value("comparison", "titleLead", "Speaking Fever")} {value("comparison", "titleConnector", "vs")}</span> {value("comparison", "titleTail", "Traditional English Classes")}</h2>
        <div className={styles.comparisonGrid}>
          <div className={`${styles.comparisonCard} ${styles.featureCard} relative`}>
            <h3 className="!text-2xl">{value("comparison", "featureHeading", "Features")}</h3>
            {comparison.map((row: any, index: number) => <p key={`${row.feature}-${index}`}>{row.feature}</p>)}
            
<div
  aria-hidden="true"
  className="absolute -left-[21px] top-9 h-5 w-5.5 bg-[#3D3D3D]"
  style={{
    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
  }}
/>

          </div>
          <div className={`${styles.comparisonCard} ${styles.speakingCard}`}>
            <h3 className="!text-2xl">{value("comparison", "individualHeading", "Speaking Fever 1:1")}</h3>
            {comparison.map((row: any, i: number) => <p key={i}><Check size={15} />{row.individual}</p>)}
            <div
  aria-hidden="true"
  className="absolute -left-[21px] top-9 h-5 w-5.5 bg-[#3D3D3D]"
  style={{
    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
  }}
/>
          </div>
          <div className={`${styles.comparisonCard} ${styles.traditionalCard}`}>
            <h3 className="!text-2xl">{value("comparison", "traditionalHeading", "Traditional Classes")}</h3>
            {comparison.map((row: any, i: number) => <p key={i}><X size={15} />{row.traditional}</p>)}
            <div
  aria-hidden="true"
  className="absolute -left-[21px] top-9 h-5 w-5.5 bg-[#3D3D3D]"
  style={{
    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
  }}
/>
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={`${styles.container} ${styles.processInner}`}>
          <h2 id="process-title">{value("course-process", "titleLead", "How Our Online ")}<span>{value("course-process", "titleAccent", "English Speaking Course")}</span> {value("course-process", "titleTail", "Works?")}</h2>
          <div className={styles.stepGrid}>
            {steps.map(({ title, detail }: any, index: number) => {
              const Icon = stepIcons[index % stepIcons.length];
              return <article className={styles.step} key={`${title}-${index}`}>
                <div className={styles.stepIcon}><Icon size={27} strokeWidth={1.8} /></div>
                {index < steps.length - 1 && <span className={styles.stepArrow} aria-hidden="true">»</span>}
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.learn} ${styles.container}`} aria-labelledby="learn-title">
        <h2 id="learn-title"><span>{value("learning", "titleLead", "What")}</span> {value("learning", "titleTail", "You’ll Learn")}</h2>
        <div className={styles.learnLayout}>
          <div className={styles.learnColumn}>
            {learningPoints.slice(0, 3).map((point) => <LearningPoint key={point.title} {...point} />)}
          </div>
          <div className={styles.learnArt}>
            <Image src={value("learning", "image", "/spoken-english/what-you-learn.webp")} alt={value("learning", "imageAlt", "Illustration of communication and learning skills")} fill sizes="(max-width: 760px) 80vw, 32vw" />
          </div>
          <div className={styles.learnColumn}>
            {learningPoints.slice(3).map((point) => <LearningPoint key={point.title} {...point} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.cta} ${styles.container}`} id="start-learning" aria-labelledby="cta-title">
        <div className={styles.ctaCopy}>
          <span className={styles.ctaPill}><Sparkles size={13} /> {value("final-cta", "eyebrow", "New Spoken English Test")}</span>
          <h2 id="cta-title">{value("final-cta", "title", "Start Your Spoken English Test")}</h2>
          <p>{value("final-cta", "subtitle", "Prep Your Journey with Ooshas Prep")}</p>
          <button className={styles.primaryButton} onClick={() => setIsPopupOpen(true)}>{value("final-cta", "buttonText", "Start Spoken English Test")} <ArrowRight size={16} /></button>
        </div>
        <div className={styles.ctaImage}>
          <Image src={value("final-cta", "image", "/spoken-english/students.webp")} alt={value("final-cta", "imageAlt", "Students learning English together")} fill sizes="(max-width: 760px) 100vw, 45vw" />
        </div>
      </section>
    </main>
  );
}


export const WhyChooseUs =()=> {
  const features = [
    "Experienced & Certified Trainers - Learn from skilled instructors with practical teaching expertise.",
    "Personalised Learning Plans - Courses designed to match your goals, level, and learning pace.",
    "Practical Classroom Training - Improve fluency through conversations, activities, and real-life speaking practice",
    "One Lakh+ Students Trained Since 1997 - Trusted by learners for quality English education.",
    "Online & Offline Learning Options - Flexible classes that fit your schedule and learning style",
    "Cambridge University Press Content - Learn with internationally trusted English learning material",
  ];

  return (
    <section className="w-full bg-white px-0 py-1">
      <div className="relative mx-auto grid min-h-[450px]  grid-cols-1 overflow-hidden bg-[#F23858] md:grid-cols-[28%_72%]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-40 rounded-full bg-white/15" />
        <div className="pointer-events-none absolute -right-16 top-20 h-44 w-32 rounded-full bg-white/15" />

        {/* Left Image */}
       
{/* Left Side - Heading + Image */}
<div className="relative z-10 flex min-w-0 items-center justify-center px-5 py-8 md:justify-end md:px-0 md:py-0">
  <div className="flex w-full max-w-[340px] flex-col items-center md:items-start ">

    <div className="flex justify-end w-full">
    {/* Lightbulb Image */}
    <img
      src="/spoken-english/why-choose-us.webp"
      alt="Why choose us lightbulb"
      className="w-40 h-40"
    /></div>

    {/* Heading */}
    <h2 className="mt-[-20px] text-center text-[42px] font-extrabold uppercase leading-[1.12] tracking-[-1.5px] text-white sm:text-[50px] md:mt-[-30px] md:text-left md:text-[58px] px-10">
      WHY
      <br />
      CHOOSE
      <br />
      US ?
    </h2>
  </div>
</div>


        {/* Right Content */}
        <div className="relative z-10 flex items-center p-4 sm:p-6 md:py-[14px] md:pl-0 md:pr-16">
          <div className="w-full bg-white px-5 py-7 sm:px-8 md:min-h-[418px] md:px-[50px] md:py-[42px]">
            <div className="flex h-full flex-col justify-center gap-4 sm:gap-[18px]">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <svg
                    className="mt-[3px] h-[26px] w-[26px] flex-shrink-0 text-[#F23858]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect
                      x="2.5"
                      y="2.5"
                      width="19"
                      height="19"
                      rx="5"
                    />
                    <path d="m7 12 3.2 3.2L21 4.8" />
                  </svg>

                  <p className="text-[16px] font-normal leading-[1.08] tracking-[-0.35px] text-[#111111] sm:text-[18px] md:text-[20px]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export const EnglishSpeakingSection =()=> {
  return (
    <section className="w-full bg-white px-2 py-5 sm:px-0">
      <div className="mx-au grid max-w-[1400px] grid-cols-1 gap-0 md:grid-cols-[minmax(0,3.1fr)_minmax(100px,1fr)]">
        {/* Main Content */}
        <div className="flex flex-col bg-[#F0F4F7] px-5 py-8 sm:px-10 md:px-12 lg:px-[124px] lg:py-[55px] ">
          <h1 className="mb-4 text-[27px] font-bold leading-[1.6] tracking-[-0.8px] text-black sm:text-[32px]">
            English Speaking{" "}
            <span className="text-[#F23858]">
              Classes for Career Growth
            </span>
          </h1>

          <div className="space-y-6 text-[15px] leading-[1.6] text-[#111111] sm:text-[16px]">
            {/* Section 1 */}
            <div>
              <h2 className="font-bold">
                Best English Speaking Course in Delhi
              </h2>
              <p>
                Oxford School of English offers one of the best English
                speaking courses in Delhi for beginners, students, working
                professionals, and job seekers. Our English course improves
                grammar, vocabulary, pronunciation, fluency, and communication
                skills through practical classroom training and personalised
                learning. We provide both online and offline English speaking
                classes to suit every learner&apos;s schedule.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="font-bold">
                English Speaking Classes with Practical Learning
              </h2>
              <p>
                Looking for an English speaking course near me? Our
                interactive classes focus on real-life communication through
                conversations, role-plays, presentations, group discussions,
                and speaking activities. With continuous trainer guidance and
                personalised feedback, students develop the confidence to
                communicate effectively in interviews, workplaces, business
                meetings, and everyday situations.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="font-bold">
                More Than an English Course
              </h2>
              <p>
                Along with our English speaking course, we also offer IELTS,
                PTE, TOEIC, and Personality Development classes under one roof.
                Since 1997, Oxford School of English has trained more than One
                Lakh students using Cambridge University Press content,
                experienced trainers, smart classrooms, and personalised
                coaching through both online and offline learning.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="bg-black px-3 py-2 text-base font-bold text-white transition-colors duration-200 hover:bg-[#F23858]"
            >
              Start Spoken English Test
            </button>
          </div>
        </div>

        {/* Vertical English Text */}
        
{/* Vertical English Text */}
<div className="relative hidden min-h-full overflow-hidden bg-white md:flex md:items-center md:justify-center">
  <span
    className="absolute left-1/2 top-1/2 whitespace-nowrap text-[150px] font-extrabold leading-none tracking-[3px] text-[#E3EBF7] select-none"
    style={{
      transform: "translate(-50%, -50%) rotate(-90deg)",
    }}
  >
    ENGLISH
  </span>

  <div
    className="pointer-events-none absolute bg-white left-32 top-1/2 z-10 h-[700px] w-[50px] blur-xl -translate-x-1/2 -translate-y-1/2"
   
  />
</div>

      </div>
    </section>
  );
}


function LearningPoint({ title, detail }: { title: string; detail: string }) {
  return (
    <article className={styles.learningPoint}>
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>
  );
}
