"use client"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

import { useState } from "react"
import ThreeDButton from "../3dbutton"


export default function Gre(){



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
  ]



   const countries = [
    { flag: "🇺🇸", name: "USA" },
    { flag: "🇨🇦", name: "Canada" },
    { flag: "🇬🇧", name: "United Kingdom" },
    { flag: "🇦🇺", name: "Australia" },
    { flag: "🇩🇪", name: "Germany" },
    { flag: "🇳🇿", name: "New Zealand" },
  ]


   const features = [
    {
      icon: "👨‍🏫",
      title: "Elite Instructors",
      description: "Conquer Quant & Verbal with our GRE gurus, masters of strategy & high scores.",
    },
    {
      icon: "📱",
      title: "Personalized Playbook",
      description: "No cookie-cutter prep! We craft a study plan that flexes with your strengths & weaknesses.",
    },
    {
      icon: "🎯",
      title: "Practice Makes Perfect",
      description: "Dive into a sea of mock tests & drills, pinpoint your blind spots & slay them.",
    },
    {
      icon: "👨‍🏫",
      title: "Elite Instructors",
      description: "Conquer Quant & Verbal with our GRE gurus, masters of strategy & high scores.",
    },
    {
      icon: "📱",
      title: "Personalized Playbook",
      description: "No cookie-cutter prep! We craft a study plan that flexes with your strengths & weaknesses.",
    },
    {
      icon: "🎯",
      title: "Practice Makes Perfect",
      description: "Dive into a sea of mock tests & drills, pinpoint your blind spots & slay them.",
    },
  ]



   const resources = [
    {
      title: "Practice Material",
      description: "Take the GRE practice material and begin your GRE preparation now",
      image: "Day 1 CPT Programs in the USA",
    },
    {
      title: "Other Resources",
      description: "Take the GRE practice material and begin your GRE preparation now",
      image: "Day 1 CPT Programs in the USA",
    },
    {
      title: "Syllabus Download",
      description: "Take the GRE practice material and begin your GRE preparation now",
      image: "Day 1 CPT Programs in the USA",
    },
  ]


    const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { question: "What is the GRE used for?" },
    { question: "What sections are in the GRE?" },
    { question: "Does Gateway Abroad Jaipur offer GRE quantitative coaching?" },
    { question: "How long should I prepare for the GRE?" },
    { question: "What is a good GRE score?" },
  ]



    return(
        <>
         <section className="lg:min-h-150 relative overflow-hidden bg-[url('/image/about-hero-bg.jpg')]  bg-cover bg-center bg-no-repeat h-60 px-4 py-12 md:py-20 lg:pt-20 lg:pb-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex lg:flex gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6  ">
            <h1 className="inline lg:w-full text-2xl lg:text-3xl font-bold text-balance ">
                <span className="text-orange-500 lg:text-6xl">G</span>
              <span className="text-orange-500 border-b-2 border-gray-900">raduate</span>
              
              <span className="text-orange-500 lg:text-6xl">R</span>
              <span className="text-orange-500 border-b-2 border-gray-900">ecord</span>

              <span className="text-orange-500 lg:text-6xl">E</span>
              <span className="text-orange-500 border-b-2 border-gray-900">xaminations</span>

            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed text-balance lg:w-xl lg:mt-10">
              Conquer the GRE with Gateway Abroad's expert guidance. Master Verbal Reasoning, dissect Quantitative
              problems, and shine in Analytical Writing. We'll refine your critical thinking, sharpen your analytical
              skills, and build your vocabulary to propel your past top score thresholds and into the graduate programs
              of your dreams. Gateway abroad Jaipur is the best GRE Coaching in Jaipur; they can provide the best
              environment and test prep strategies to build your strength.
            </p>
            <ThreeDButton children={"Enroll Now"} textColor="text-white" />
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md h-80 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simple illustration placeholder - can be replaced with actual image */}
                <rect width="400" height="400" fill="#E5E7EB" />
                <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="#9CA3AF">
                  [Illustration]
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>



     <section className="bg-gray-100 px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:flex gap-8 lg:gap-16 items-center">
          {/* Left - Large GRE Text */}
          <div className="flex items-center justify-center ">
            <div className="text-blue-900 text-9xl md:text-[180px] italic font-bold opacity-80">GRE</div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 ">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              <span className="text-orange-500">What is</span> <span className="text-gray-700">GRE ?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-balance lg:text-lg">
              At Gateway Abroad Education, we are a trusted Overseas education consultants dedicated to helping students
              achieve their dreams of pursuing overseas study. Our expert team supports you at every step, from
              selecting the ideal course to excelling in test preparation for crucial exams, such as the English
              Proficiency test like IELTS, TOEFL, GRE, PTE, GMAT, SAT and more. We're more than just educators; we're
              your mentors and advisors, guiding you toward success in abroad education. Whether it's securing a study
              abroad scholarship, navigating the study visa process, or applying for a study loan, we are here to make
              your journey smoother and brighter.
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
                <div className="p-50
                
                text-white
                bg-gradient-to-b
                from-white
                via-[white]
                to-[#FF6A3D]
                shadow-lg absolute inset-0  rounded-tr-[110px] rounded-[30px] -z-1 -left-[3px] "/>

                
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Analytical Writing
                  <br /> (AWA)
                </h3>

                <p className="text-base leading-relaxed text-center ">
                  Flex your critical thinking muscles! This section includes
                  only one task, “Analyse an Issue,” which is timed for
                  30 minutes. You'll showcase your ability to write
                  persuasive, well-structured essays within a limited time.
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
            <div key={index} className="bg-gray-600 rounded-4xl p-6 md:px-8 md:py:6 flex gap-4 relative">
              <div className="flex-shrink-0  ">
                <div className="flex items-center  justify-center h-12 w-12 md:h-24 md:w-24 rounded-[30px] bg-orange-500 text-white text-2xl absolute -top-5 left-2 ">
                  {feature.icon}
                </div>
              </div>
              <div className="ml-20">
                <h3 className="text-white font-bold text-base md:text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-200 text-sm md:text-base">{feature.description}</p>
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
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready, set, knowledge!
            br Download our brochure and get started.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Card - Blurred */}
          <div className="hidden lg:block opacity-40">
            <div className="bg-white border-2 border-orange-500 rounded-3xl p-6 md:p-8">
              <div className="space-y-3 mb-4">
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 rounded w-4/4"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Center Card - Featured */}
          <div className="lg:col-span-1 relative">
            <div className="bg-white border-2 border-orange-500 rounded-3xl p-6 md:p-8 shadow-lg">
              <div className="mb-4">
                <h4 className="text-orange-500 font-bold text-lg md:text-xl">Khushal: 80</h4>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-balance">
                My journey with Gateway Abroad Jaipur went beyond my expectations. The mock tests provided by my
                trainers gave an accurate simulation of the real exam, regular feedback on my performance was
                invaluable. With their help, I aced my PTE exam.
              </p>
            </div>
          </div>

          {/* Right Card - Blurred */}
          <div className="hidden lg:block opacity-40">
            <div className="bg-white border-2 border-orange-500 rounded-3xl p-6 md:p-8">
              <div className="space-y-3 mb-4">
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 rounded w-4/4"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </section>



      <section className="bg-white px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-orange-500">Plans & Pricing</h2>
          <p className="text-gray-600 text-base md:text-lg">
            We are accepting PayPal, Paytm, PhonePe and Debit & Credit Card
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Classroom Training */}
          <div className="bg-gray-600 text-white rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Classroom training</h3>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-balance">
              Gateway Abroad Jaipur empowers you to achieve your GRE goals with top-notch instructors. They provide
              in-person guidance through a comprehensive offline preparation program. Don't let academic hurdles hold
              you back from achieving success. Conquer the GRE exam entirely offline and unlock the door to a thriving
              academic journey.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors mt-8">
              Choose Plan
            </button>
          </div>

          {/* Live Online Training */}
          <div className="bg-gray-600 text-white rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Live online training</h3>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-balance">
              Level Up Your Scores: Anytime, Anywhere. Conquer standardized tests from the comfort of your home with our
              interactive online prep courses. Our flexible online classes and dedicated support ensure you can progress
              at your own pace, tailoring your learning journey to your busy schedule.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors mt-8">
              Choose Plan
            </button>
          </div>

          {/* Hybrid - Most Popular */}
          <div className="relative lg:col-span-1">
            <div className="absolute -top-4 right-6 bg-gray-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <div className="bg-orange-500 rounded-3xl p-6 md:p-8 text-white h-full flex flex-col justify-between pt-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Hybrid</h3>
                <p className="text-sm md:text-base leading-relaxed mb-6 text-balance">
                  Get the best of both worlds with our hybrid courses - the flexibility of online learning combined with
                  the personalized support of in-person instruction! Why choose between online convenience and offline
                  expertise when you can have both? Experience the ultimate exam prep fusion with our hybrid courses!
                </p>
              </div>
              <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-full transition-colors mt-8">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


      <section className="bg-white px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance">
          <span className="text-orange-500">Free GRE Prep</span> <span className="text-gray-700">Resources</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="border-2 border-orange-500 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 md:h-56 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-white text-center px-4 font-semibold text-sm md:text-base">{resource.image}</span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-3">{resource.title}</h3>
                <p className="text-gray-600 text-sm md:text-base mb-6 text-balance">{resource.description}</p>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition-colors">
                  Take GRE Practice Material
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



     <section className="bg-gray-50 px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-orange-500">Frequently asked questions</h2>
        <p className="text-center text-gray-600 mb-12 text-base md:text-lg">
          Can't find the answer you are looking for?
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700 font-semibold text-base md:text-lg text-left">{faq.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm md:text-base">
                    Answer content would go here. Currently showing as a placeholder.
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
                  <div className="
                    bg-[#666666]
                    text-white
                    rounded-3xl md:rounded-[40px] md:rounded-bl-[80px] lg:rounded-bl-[120px]
                    px-6 sm:px-10 md:px-16 lg:px-20
                    pb-16 md:pb-20 lg:pb-24
                    pt-8 md:pt-10
                    text-center lg:text-left
                  ">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                      Avail A Complementary <br className="hidden sm:block" />
                      Counselling Session
                    </h2>
                  </div>
    
                  {/* CTA BUTTON */}
                  <div className="absolute left-1/2 lg:left-1/2 -bottom-6 -translate-x-1/2">
                    <button className="
                      bg-[#F36F45]
                      text-white
                      px-8 py-3 sm:px-10 sm:py-3
                      rounded-3xl md:rounded-[40px] md:rounded-bl-[80px] lg:rounded-bl-[120px]
                      text-base sm:text-lg
                      font-semibold
                      shadow-lg
                      hover:bg-[#e0623b]
                      transition
                    ">
                      Contact us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>


    
        </>
    )
}