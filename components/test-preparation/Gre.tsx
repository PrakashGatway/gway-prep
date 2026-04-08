"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import ThreeDButton from "../3dbutton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect, useRef } from "react";

export default function Gre() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      score: 10,
      rating: 5,
      testimonial:
        "Absolutely transformed our workflow! The intuitive design and seamless integration saved us countless hours. Best decision we made this year.",
    },
    {
      id: 2,
      name: "James Chen",
      score: 9,
      rating: 5,
      testimonial:
        "Outstanding service and support. The team went above and beyond to ensure everything was perfect. Highly recommend to anyone looking for quality.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      score: 10,
      rating: 5,
      testimonial:
        "Game-changer for our business. The results exceeded our expectations and the ROI was visible within the first month. Couldn't be happier!",
    },
    {
      id: 4,
      name: "Michael Thompson",
      score: 9,
      rating: 4,
      testimonial:
        "Professional, reliable, and incredibly efficient. They delivered exactly what was promised and more. A pleasure to work with from start to finish.",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      score: 10,
      rating: 5,
      testimonial:
        "From the first consultation to final delivery, the experience was flawless. Their attention to detail and commitment to excellence is unmatched.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

    startAutoPlay();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [instanceRef]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
  };

  const cards = [
    {
      title: "Analytical Writing (AWA)",
      description:
        'Flex your critical thinking muscles! This section includes only one task, "Analyse an Issue," which is timed for 30 minutes. You\'ll showcase your ability to write persuasive, well-structured essays within a limited time.',
    },
    {
      title: "Analytical Writing (AWA)",
      description:
        'Flex your critical thinking muscles! This section includes only one task, "Analyse an Issue," which is timed for 30 minutes. You\'ll showcase your ability to write persuasive, well-structured essays within a limited time.',
    },
    {
      title: "Analytical Writing (AWA)",
      description:
        'Flex your critical thinking muscles! This section includes only one task, "Analyse an Issue," which is timed for 30 minutes. You\'ll showcase your ability to write persuasive, well-structured essays within a limited time.',
    },
  ];

  const countries = [
    { flag: "🇺🇸", name: "USA" },
    { flag: "🇨🇦", name: "Canada" },
    { flag: "🇬🇧", name: "United Kingdom" },
    { flag: "🇦🇺", name: "Australia" },
    { flag: "🇩🇪", name: "Germany" },
    { flag: "🇳🇿", name: "New Zealand" },
  ];

  const features = [
    {
      icon: "👨‍🏫",
      title: "Elite Instructors",
      description:
        "Conquer Quant & Verbal with our GRE gurus, masters of strategy & high scores.",
    },
    {
      icon: "📱",
      title: "Personalized Playbook",
      description:
        "No cookie-cutter prep! We craft a study plan that flexes with your strengths & weaknesses.",
    },
    {
      icon: "🎯",
      title: "Practice Makes Perfect",
      description:
        "Dive into a sea of mock tests & drills, pinpoint your blind spots & slay them.",
    },
    {
      icon: "👨‍🏫",
      title: "Elite Instructors",
      description:
        "Conquer Quant & Verbal with our GRE gurus, masters of strategy & high scores.",
    },
    {
      icon: "📱",
      title: "Personalized Playbook",
      description:
        "No cookie-cutter prep! We craft a study plan that flexes with your strengths & weaknesses.",
    },
    {
      icon: "🎯",
      title: "Practice Makes Perfect",
      description:
        "Dive into a sea of mock tests & drills, pinpoint your blind spots & slay them.",
    },
  ];

  const resources = [
    {
      title: "Practice Material",
      description:
        "Take the GRE practice material and begin your GRE preparation now",
      image: "Day 1 CPT Programs in the USA",
    },
    {
      title: "Other Resources",
      description:
        "Take the GRE practice material and begin your GRE preparation now",
      image: "Day 1 CPT Programs in the USA",
    },
    {
      title: "Syllabus Download",
      description:
        "Take the GRE practice material and begin your GRE preparation now",
      image: "Day 1 CPT Programs in the USA",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "What is the GRE used for?" },
    { question: "What sections are in the GRE?" },
    { question: "Does Gateway Abroad Jaipur offer GRE quantitative coaching?" },
    { question: "How long should I prepare for the GRE?" },
    { question: "What is a good GRE score?" },
  ];

  return (
    <>
      <section className="lg:min-h-150 relative overflow-hidden bg-[url('/image/about-hero-bg.jpg')]  bg-cover bg-center
       bg-no-repeat h-60 ">
        <div className="max-w-[90%] ml-auto">
          <div className="flex p-10 lg:flex  items-center rounded-[0_0_0_10rem] h-[60vh] bg-gray-200">
            <div className="w-1/2 relative">
                <span className="text-5xl font-bold ">
                  The smartest way to <p className=" my-2 text-orange-600 flex items-center">master the GRE
                     <p className="mx-1 border-2 border-orange-600 rounded-full text-xl flex items-center justify-center h-8 w-8">R</p>
                  </p>
                </span>

                <p className=" my-6">
                  The original self-paced GRE course. Get Official GRE quetions, an Al tutor , video lessons, and top-rated mobile apps at a third of the price of other "premium" options. 
                </p>

                <button className="bg-black rounded-2xl lg:absolute -bottom-[6rem] left-25 text-lg px-4 py-1 text-white">Full courses starts at $99</button>
            </div>

            <div className="w-1/2">

            </div>
          </div>
        </div>
      </section>

      <Aboutresult />

      <TextTestimonials />

      <section className="bg-gray-100 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:flex gap-8 lg:gap-16 items-center">
            {/* Left - Large GRE Text */}
            <div className="flex items-center justify-center ">
              <div className="text-blue-900 text-9xl md:text-[180px] italic font-bold opacity-80">
                GRE
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6 ">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                <span className="text-orange-500">What is</span>{" "}
                <span className="text-gray-700">GRE ?</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-balance lg:text-lg">
                At Gateway Abroad Education, we are a trusted Overseas education
                consultants dedicated to helping students achieve their dreams
                of pursuing overseas study. Our expert team supports you at
                every step, from selecting the ideal course to excelling in test
                preparation for crucial exams, such as the English Proficiency
                test like IELTS, TOEFL, GRE, PTE, GMAT, SAT and more. We're more
                than just educators; we're your mentors and advisors, guiding
                you toward success in abroad education. Whether it's securing a
                study abroad scholarship, navigating the study visa process, or
                applying for a study loan, we are here to make your journey
                smoother and brighter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-[#FF6A3D]">What is on the</span>{" "}
            <span className="text-gray-700">GRE?</span>
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="relative ">
                {/* Orange offset layer */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded-tr-[110px] rounded-[30px] bg-[#FF6A3D] -z-11" />

                {/* Main card */}

                <div className="relative bg-[#6B6B6B] text-white rounded-tr-[110px] rounded-[30px] p-18 h-full ">
                  <div
                    className="p-50
                
                text-white
                bg-gradient-to-b
                from-white
                via-[white]
                to-[#FF6A3D]
                shadow-lg absolute inset-0  rounded-tr-[110px] rounded-[30px] -z-1 -left-[3px] "
                  />

                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Analytical Writing
                    <br /> (AWA)
                  </h3>

                  <p className="text-base leading-relaxed text-center ">
                    Flex your critical thinking muscles! This section includes
                    only one task, “Analyse an Issue,” which is timed for 30
                    minutes. You'll showcase your ability to write persuasive,
                    well-structured essays within a limited time.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-orange-500">Countries Accepting</span>{" "}
            <span className="text-gray-700">GRE Scores</span>
          </h2>

          <p className="text-gray-600 mb-2">
            GRE is accepted in 160 countries around the world
          </p>

          <p className="text-gray-600 mb-12">
            Some of the popular countries accepting GRE scores are as follows:
          </p>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Map Image */}
            <div className="relative w-full h-[260px] md:h-[360px]">
              <Image
                src="/image/world-map-flags.png"
                alt="Countries accepting GRE"
                fill
                className="object-contain"
              />
            </div>

            {/* Right: Country Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-[45%]">
              <div className="country-pill border-2 border-gray-500 lg:px-10 lg:py-5 w-fit text-2xl font-semibold rounded-2xl">
                <div></div>
                USA
              </div>

              <div className="country-pill border-2 border-gray-500 lg:px-10 lg:py-5 w-fit text-2xl font-semibold rounded-2xl lg:w-[220px] text-center">
                Canada
              </div>

              <div className="country-pill sm:col-span-2 border-2 border-gray-500 lg:px-10 lg:py-5 w-fit text-2xl font-semibold rounded-2xl lg:w-[370px] text-center">
                United Kingdom
              </div>

              <div className="country-pill border-2 border-gray-500 lg:px-8 lg:py-5 w-fit text-2xl font-semibold rounded-2xl text-center">
                Australia
              </div>

              <div className="country-pill border-2 border-gray-500 lg:px-8 lg:py-5 w-fit text-2xl font-semibold rounded-2xl  text-center ml-10">
                Germany
              </div>

              <div className="country-pill sm:col-span-2 border-2 border-gray-500 lg:px-10 lg:py-5 w-fit text-2xl font-semibold rounded-2xl lg:w-[370px] text-center">
                New Zealand
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-24 md:mb-30">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b-2 border-orange-500 inline-block text-balance">
              <span className="text-orange-500">Why Choose Gateway Abroad</span>{" "}
              <span className="text-gray-700">for GRE Test Prep?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-600 rounded-4xl p-6 md:px-8 md:py:6 flex gap-4 relative"
              >
                <div className="flex-shrink-0  ">
                  <div className="flex items-center  justify-center h-12 w-12 md:h-24 md:w-24 rounded-[30px] bg-orange-500 text-white text-2xl absolute -top-5 left-2 ">
                    {feature.icon}
                  </div>
                </div>
                <div className="ml-20">
                  <h3 className="text-white font-bold text-base md:text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-4 py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto">
          {/* CTA Box */}
          <div className="mt-12 bg-orange-500 rounded-3xl p-8 md:pt-10 md:pb-20 text-white max-w-md ml-auto absolute right-10 -top-40">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Ready, set, knowledge! br Download our brochure and get started.
            </h3>

            <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-full transition-colors absolute right-10">
              Download
            </button>
          </div>
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-gray-600 text-4xl">What Our</span>
              <br />
              <span className="text-orange-500 text-[100px]">GRE Prep</span>
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-600 border-b-2 border-gray-600  inline-block pb-2">
              Achievers Say
            </h3>
          </div>

          {/* Testimonial Cards */}
          <section className="py-16 px-4  ">
            <div className=" mx-auto">
              <div
                ref={sliderRef}
                className="keen-slider"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="keen-slider__slide">
                    <TestimonialCard
                      name={testimonial.name}
                      score={testimonial.score}
                      rating={testimonial.rating}
                      testimonial={testimonial.testimonial}
                      isActive={currentSlide === index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative -left-5   py-12 md:py-20 lg:w-[90%]">
        <div className=" mx-auto ">
          <div className="mb-12 ml-30">
            <h2 className="text-2xl md:text-4xl font-bold text-brand-orange mb-2">
              Plans & Pricing
            </h2>
            <p className="text-zinc-500 text-lg font-medium">
              We are accepting PayPal, Paytm, PhonePe and Debit & Credit Card
            </p>
          </div>

          <div className="backdrop-blur-lg bg-[#636363] shadow-2xl rounded-3xl  px-4 md:px-6 md:pt-15">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Classroom Training */}
              <div className="px-4 md:px-6 ">
                <h5 className="text-2xl md:text-[28px] font-medium text-white mb-6 ml-10 ">
                  Classroom training
                </h5>
                <div className="mb-8">
                  <ul className="space-y-4 min-h-[200px] md:min-h-[242px] lg:w-80">
                    <li className="relative text-white font-medium text-justify pl-8  before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-[url('https://www.gatewayabroadeducations.com/_next/static/media/check-circle.532cdb95.svg')] before:bg-cover">
                      Gateway Abroad Jaipur empowers you to achieve your goals
                      with top-notch instructors. They provide in-person
                      guidance through a comprehensive offline preparation
                      program.
                    </li>
                    <li className="relative text-white font-medium text-justify pl-8 pb-15 before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-[url('https://www.gatewayabroadeducations.com/_next/static/media/check-circle.532cdb95.svg')] before:bg-cover">
                      Don't let academic hurdles hold you back from achieving
                      success. Conquer the exam entirely offline and unlock the
                      door to a thriving academic journey.
                    </li>
                  </ul>
                </div>
                <div className="text-center absolute -bottom-5 left-35">
                  <button className="text-white text-base md:text-lg font-bold bg-brand-orange shadow-lg px-12 py-3 rounded-full transition-colors duration-300">
                    Choose Plan
                  </button>
                </div>
              </div>

              <div className="w-[2px] h-90 bg-white mx-auto lg:absolute left-110"></div>

              {/* Live Online Training */}
              <div className="px-4 md:px-6">
                <h5 className="text-2xl md:text-[28px] font-medium text-white mb-6">
                  Live online training
                </h5>
                <div className="mb-8">
                  <ul className="space-y-4 min-h-[200px] md:min-h-[242px]">
                    <li className="relative text-white font-medium text-justify  before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-[url('https://www.gatewayabroadeducations.com/_next/static/media/check-circle.532cdb95.svg')] before:bg-cover lg:w-80">
                      Level Up Your Scores: Anytime, Anywhere. Conquer
                      standardized tests from the comfort of your home with our
                      interactive online prep courses.
                    </li>
                    <li className="relative text-white font-medium text-justify before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-[url('https://www.gatewayabroadeducations.com/_next/static/media/check-circle.532cdb95.svg')] before:bg-cover lg:w-80">
                      Our flexible online classes and dedicated support ensure
                      you can progress at your own pace, tailoring your learning
                      journey to your busy schedule.
                    </li>
                  </ul>
                </div>
                <div className="text-center absolute -bottom-5 left-150 ">
                  <button className="text-white text-base md:text-lg font-bold bg-brand-orange shadow-lg px-12 py-3 rounded-full transition-colors duration-300">
                    Choose Plan
                  </button>
                </div>
              </div>

              {/* Hybrid - Most Popular */}
              <div className="px-4 md:px-6 bg-brand-orange shadow-2xl rounded-4xl p-6 md:p-8 md:-mt-30 md:mr-8 mb-5 relative">
                <div
                  className="bg-gradient-to-b from-white to-orange-100 
 absolute inset-0 rounded-4xl -z-1 p-49 -left-[3px]"
                />
                <div className="text-right ">
                  <span className="text-white text-[16px] font-extrabold bg-[#636363] tracking-wider px-6 py-2 absolute right-11 rounded-full">
                    Most Popular
                  </span>
                </div>
                <h5 className="text-2xl pl-8 md:text-[28px] font-medium text-white mb-6">
                  Hybrid
                </h5>
                <div className="mb-8">
                  <ul className="space-y-4 min-h-[200px] md:min-h-[242px]">
                    <li className="relative text-white font-medium text-justify pl-8 before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-[url('https://www.gatewayabroadeducations.com/_next/static/media/check-circle-2.3eccd6cf.svg')] before:bg-cover">
                      Get the best of both worlds with our hybrid courses - the
                      flexibility of online learning combined with the
                      personalized support of in-person instruction!
                    </li>
                    <li className="relative text-white font-medium text-justify pl-8 before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-[url('https://www.gatewayabroadeducations.com/_next/static/media/check-circle-2.3eccd6cf.svg')] before:bg-cover">
                      Why choose between online convenience and offline
                      expertise when you can have both? Experience the ultimate
                      exam prep fusion with our hybrid courses!
                    </li>
                  </ul>
                </div>
                <div className="text-center absolute bottom-2 right-22">
                  <button className="text-white text-base md:text-lg font-bold bg-[#636363] shadow-lg px-12 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#FF6A3D]">Free GRE Prep</span>{" "}
            <span className="text-gray-600">Resources</span>
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {/* CARD 1 */}
            {/* CARD */}
            <div className="relative rounded-[36px]">
              {/* BACKSIDE GRADIENT BORDER */}
              <div
                className="absolute inset-0 rounded-[36px] 
    bg-gradient-to-b from-gray-300 via-gray-200 to-orange-500 
    translate-x-[2px] translate-y-[2px] -left-1"
              ></div>

              {/* MAIN CARD */}
              <div className="relative rounded-[36px] bg-white overflow-hidden ">
                {/* IMAGE */}
                <div className="h-[210px] bg-gray-100">
                  <img
                    src="/image/blog-img.jpg"
                    alt="Practice Material"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-6 pt-8 pb-14 text-center">
                  <h3 className="text-3xl font-bold text-[#FF6A3D] mb-3">
                    Practice Material
                  </h3>

                  <p className="text-gray-600 text-sm font-bold mb-8">
                    Take the GRE practice material and begin your GRE
                    preparation now
                  </p>
                </div>
              </div>
              {/* BUTTON */}
              <button className="bg-[#4A4A4A] w-70 text-white px-3 py-3 rounded-full font-semibold shadow-md absolute left-1/2 -translate-x-1/2 -bottom-5 ">
                Take GRE Practice Material
              </button>
            </div>

            {/* CARD 2 */}
            <div className="relative rounded-[36px]">
              {/* BACKSIDE GRADIENT BORDER */}
              <div
                className="absolute inset-0 rounded-[36px] 
    bg-gradient-to-b from-gray-300 via-gray-200 to-orange-500 
    translate-x-[2px] translate-y-[2px] -left-1"
              ></div>

              {/* MAIN CARD */}
              <div className="relative rounded-[36px] bg-white overflow-hidden ">
                {/* IMAGE */}
                <div className="h-[210px] bg-gray-100">
                  <img
                    src="/image/blog-img.jpg"
                    alt="Practice Material"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-6 pt-8 pb-14 text-center">
                  <h3 className="text-3xl font-bold text-[#FF6A3D] mb-3">
                    Practice Material
                  </h3>

                  <p className="text-gray-600 text-sm font-bold mb-8">
                    Take the GRE practice material and begin your GRE
                    preparation now
                  </p>
                </div>
              </div>
              {/* BUTTON */}
              <button className="bg-[#4A4A4A] w-70 text-white px-3 py-3 rounded-full font-semibold shadow-md absolute left-1/2 -translate-x-1/2 -bottom-5 ">
                Take GRE Practice Material
              </button>
            </div>

            {/* CARD 3 */}
            <div className="relative rounded-[36px]">
              {/* BACKSIDE GRADIENT BORDER */}
              <div
                className="absolute inset-0 rounded-[36px] 
    bg-gradient-to-b from-gray-300 via-gray-300 to-orange-500 
    translate-x-[2px] translate-y-[2px] -left-1"
              ></div>

              {/* MAIN CARD */}
              <div className="relative rounded-[36px] bg-white overflow-hidden ">
                {/* IMAGE */}
                <div className="h-[210px] bg-gray-100">
                  <img
                    src="/image/blog-img.jpg"
                    alt="Practice Material"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-6 pt-8 pb-14 text-center">
                  <h3 className="text-3xl font-bold text-[#FF6A3D] mb-3">
                    Practice Material
                  </h3>

                  <p className="text-gray-600 text-sm font-bold mb-8">
                    Take the GRE practice material and begin your GRE
                    preparation now
                  </p>
                </div>
              </div>
              {/* BUTTON */}
              <button className="bg-[#4A4A4A] w-70 text-white px-3 py-3 rounded-full font-semibold shadow-md absolute left-1/2 -translate-x-1/2 -bottom-5 ">
                Take GRE Practice Material
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-orange-500">
            Frequently asked questions
          </h2>
          <p className="text-center text-gray-600 mb-12 text-base md:text-lg">
            Can't find the answer you are looking for?
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700 font-semibold text-base md:text-lg text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 text-sm md:text-base">
                      Answer content would go here. Currently showing as a
                      placeholder.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center gap-8 md:gap-10">
            {/* LEFT ILLUSTRATION */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-start order-2 lg:order-1">
              <Image
                src="/image/counselling-img.png"
                alt="Counselling Illustration"
                width={900}
                height={900}
                className="
                      w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]
                      h-auto
                      lg:max-w-none lg:scale-125 xl:scale-140
                      lg:-translate-x-10
                    "
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative w-full lg:w-[60%] order-1 lg:order-2 lg:left-25 lg:translate-x-16">
              {/* PANEL */}
              <div
                className="
                    bg-[#666666]
                    text-white
                    rounded-3xl md:rounded-[40px] md:rounded-bl-[80px] lg:rounded-bl-[120px]
                    px-6 sm:px-10 md:px-16 lg:px-20
                    pb-16 md:pb-20 lg:pb-24
                    pt-8 md:pt-10
                    text-center lg:text-left
                  "
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                  Avail A Complementary <br className="hidden sm:block" />
                  Counselling Session
                </h2>
              </div>

              {/* CTA BUTTON */}
              <div className="absolute left-1/2 lg:left-1/2 -bottom-6 -translate-x-1/2">
                <button
                  className="
                      bg-[#F36F45]
                      text-white
                      px-8 py-3 sm:px-10 sm:py-3
                      rounded-3xl md:rounded-[40px] md:rounded-bl-[80px] lg:rounded-bl-[120px]
                      text-base sm:text-lg
                      font-semibold
                      shadow-lg
                      hover:bg-[#e0623b]
                      transition
                    "
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Star } from "lucide-react";
import { Aboutresult } from "../about_result";
import { TextTestimonials } from "../testimonial_gre";

function TestimonialCard({ name, score, rating, testimonial, isActive }) {
  return (
    <div
      className={`
        relative max-w-[520px] rounded-3xl bg-white px-6 py-20
        transition-all duration-500 ease-out
        ${
          isActive
            ? "border-2 border-orange-500 shadow-2xl scale-100 opacity-100 z-20"
            : "border border-orange-300 scale-90 opacity-40 blur-[1.5px] z-10 -mx-8 "
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-xl text-orange-500">
          {name}: {score}
        </span>

        <div className="flex gap-1 ml-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "fill-orange-500 text-orange-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <p className="text-gray-600 text-lg font-semibold leading-relaxed">
        {testimonial}
      </p>
    </div>
  );
}
