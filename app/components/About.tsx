"use client"
import ThreeDButton from "@/app/components/3dbutton";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion"
import Image from "next/image"



export default function About() {


  const stats = [
    { number: "11+", label: "National Offices" },
    { number: "11+", label: "International Offices" },
    { number: "100K+", label: "Success Stories" },
    { number: "15+", label: "Years Experience" },
  ]


  return (
    <>
     
     <section
  className="
    relative overflow-hidden
    px-4 sm:px-8 lg:px-20
    py-12 md:py-20
    bg-[url('/image/about-hero-bg.jpg')]
    bg-cover bg-center bg-no-repeat
    lg:pt-35
  "
>
  {/* LIGHT GRAY OVERLAY */}
  <div className="absolute inset-0 bg-gray-350/20"></div>

  <div
    className="
      relative z-10
      max-w-7xl mx-auto
      flex flex-col lg:flex-row
      items-center gap-8 md:gap-10
      lg:pt-24 lg:pb-40
    "
  >
    {/* LEFT CONTENT */}
    <div className="w-full lg:w-1/2 text-center lg:text-left">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
        style={{ color: "#e87a4d" }}
      >
        About Us
      </h1>

      <p
        className="text-base sm:text-lg font-medium leading-relaxed mb-6 md:mb-8"
        style={{ color: "#666666" }}
      >
        We empower students and professionals to achieve their dreams with
        expert guidance, personalized coaching, and proven track records.
        Join thousands of success stories.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
        <ThreeDButton
          children="Get Started Today"
          bgColor="bg-brand-orange"
          textColor="text-white"
        />
        <ThreeDButton
          children="Learn More"
          bgColor="bg-white"
          textColor="text-brand-orange"
        />
      </div>
    </div>

    {/* RIGHT IMAGE - LARGER ON MOBILE/TABLET */}
    <div
      className="
        w-full
        flex justify-center
        mt-8 md:mt-12
        
        /* Desktop layout remains UNCHANGED */
        lg:w-[65%]
        lg:absolute
        lg:right-49
        lg:-top-15
        lg:mt-0
      "
    >
      <Image
        alt="About Hero"
        src="/image/about-hero-img.png"
        width={1000}
        height={800}
        className="
          /* Mobile/Tablet: LARGER image size */
          w-full
          max-w-[320px]      /* Increased from 280px */
          sm:max-w-[400px]   /* Increased from 350px */
          md:max-w-[500px]   /* Increased from 420px */
          
          /* Optional: Add scale for even larger appearance */
          scale-105
          sm:scale-110
          md:scale-115
          
          /* Desktop: Original scaling */
          lg:max-w-none
          lg:scale-125
          xl:scale-140
          lg:scale-100       /* Reset mobile scale on desktop */
        "
      />
    </div>
  </div>
</section>


     <section className="py-12 md:py-16 lg:py-20 relative">
  <div className="absolute bg-gray-50 h-full w-full inset-0 -z-10" />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 md:gap-12 items-center relative z-10">
    
    {/* IMAGE CONTAINER - Mobile: Full width, Desktop: 64% */}
    <div className="w-full lg:w-[34%] md:w-[54%] flex justify-center order-2 lg:order-1">
      <div className="relative w-full" style={{ perspective: "600px" }}>
        <motion.div
          initial={{
            rotateY: 30,
            skewY: 0,
            scaleX: 1.02,
          }}
          whileHover={{
            rotateY: 0,
            scale: 1.04,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          className="relative rounded-2xl md:rounded-[32px] border-2 border-brand-orange bg-white  w-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="overflow-hidden rounded-xl md:rounded-[24px]"
            style={{
              transform: "translateZ(0px)",
            }}
          >
            <Image
              src="/image/who-are-we-img.png"
              alt="Education"
              width={620}
              height={400}
              className="h-[180px] sm:h-[200px] md:h-[240px] w-full object-cover"
            />
          </div>

          {/* Depth shadow */}
          <div className="absolute inset-0 rounded-2xl md:rounded-[32px] -z-10" />
        </motion.div>
      </div>
    </div>

    {/* TEXT CONTENT - Mobile: Full width, Desktop: Auto */}
    <div className="w-full lg:w-auto order-1 lg:order-2 lg:flex-1">
      <h2 
        className="text-2xl sm:text-3xl md:text-4xl w-full lg:w-sm border-b-2 border-brand-orange font-bold mb-4 md:mb-6" 
        style={{ color: "#e87a4d" }}
      >
        Who Are We?
      </h2>
      <p 
        className="text-base md:text-lg font-medium leading-relaxed" 
        style={{ color: "#666666" }}
      >
        We are a dedicated team of professionals with years of experience in education and career development. Our
        mission is to provide the highest quality guidance and support to help our students achieve their
        educational and career goals.
      </p>
      <p 
        className="text-base md:text-lg font-medium leading-relaxed mt-3 md:mt-4" 
        style={{ color: "#666666" }}
      >
        Through our extensive network and in-house expertise, we understand the challenges students face and provide
        tailored solutions that work.
      </p>
    </div>
  </div>
</section>




     

      <section className="px-4 py-16 md:py-24 overflow-hidden relative">
     
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">



          {/* TEXT */}
          <div className="lg:w-[45%] w-full">
            <h2
              className="text-3xl md:text-4xl border-b-2 border-brand-orange font-bold mb-6"
              style={{ color: "#e87a4d" }}
            >
              What Will We Do for You?
            </h2>

            <p
              className="text-lg font-medium leading-relaxed"
              style={{ color: "#666666" }}
            >
              Expert Coaching: Master IELTS, PTE, SELT, GRE, GMAT, SAT, and TOEFL with
              experienced faculty, personalized attention, and proven strategies.
              <br /><br />
              Comprehensive Material: Up-to-date study materials, practice tests, and
              mock exams mirroring real test experience.
              <br /><br />
              Personalized Guidance & Confidence Boost.
            </p>
          </div>

          {/* IMAGE */}
          <div className="lg:w-[55%] w-full flex justify-end">
            <img
              src="/image/do-for-you-img.png"
              alt="What we do for you"
              className="
          w-full
          h-auto
          object-contain
          scale-110
          lg:scale-125
          xl:scale-140
        "
            />
          </div>

        </div>
      </section>


     <section className="relative w-full bg-[#F36F45] overflow-hidden pt-8 md:pt-10">
  
  {/* Mobile & Tablet View - Grid Layout */}
  <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-2xl md:rounded-3xl px-4 py-4 md:px-6 md:py-6 
                     shadow-[inset_0_0_10px_rgba(255,255,255,0.45)] border-2 md:border-3 border-white/50 
                     text-center transform rotate-0">
        <h2 className="text-2xl md:text-3xl font-bold">11+</h2>
        <p className="text-sm md:text-base mt-1 md:mt-2">National Office</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-2xl md:rounded-3xl px-4 py-4 md:px-6 md:py-6 
                     shadow-[inset_0_0_10px_rgba(255,255,255,0.45)] border-2 md:border-3 border-white/50 
                     text-center transform rotate-0">
        <h2 className="text-2xl md:text-3xl font-bold">1000000+</h2>
        <p className="text-sm md:text-base mt-1 md:mt-2">Students</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-2xl md:rounded-3xl px-4 py-4 md:px-6 md:py-6 
                     shadow-[inset_0_0_10px_rgba(255,255,255,0.45)] border-2 md:border-3 border-white/50 
                     text-center transform rotate-0">
        <h2 className="text-2xl md:text-3xl font-bold">15+</h2>
        <p className="text-sm md:text-base mt-1 md:mt-2">Experience</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-2xl md:rounded-3xl px-4 py-4 md:px-6 md:py-6 
                     shadow-[inset_0_0_10px_rgba(255,255,255,0.45)] border-2 md:border-3 border-white/50 
                     text-center transform rotate-0">
        <h2 className="text-2xl md:text-3xl font-bold">11+</h2>
        <p className="text-sm md:text-base mt-1 md:mt-2">International Office</p>
      </div>
    </div>
  </div>

  {/* Desktop View - Floating Cards (UNCHANGED) */}
  <div className="hidden lg:block relative max-w-7xl mx-auto px-6 text-center ml-40">
    <div className="absolute left-60 z-1 rotate-[-6deg]">
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-[40px] px-15 py-8 shadow-[inset_0_0_10px_rgba(255,255,255,0.45)]
             border-3 border-white/50">
        <h2 className="text-4xl font-bold">11+</h2>
        <p className="text-lg mt-2">National Office</p>
      </div>
    </div>

    <div className="absolute left-140 top- rotate-[4deg] z-1">
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-[40px] px-10 py-8 shadow-[inset_0_0_10px_rgba(255,255,255,0.45)]
             border-3 border-white/50">
        <h2 className="text-4xl font-bold">1000000+</h2>
        <p className="text-lg mt-2">Students</p>
      </div>
    </div>

    <div className="absolute left-20 top-30">
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-[40px] px-20 py-8 shadow-[inset_0_0_10px_rgba(255,255,255,0.45)]
             border-3 border-white/50">
        <h2 className="text-4xl font-bold">15+</h2>
        <p className="text-lg mt-2">Experience</p>
      </div>
    </div>

    <div className="absolute left-96 top-25 rotate-[6deg]">
      <div className="bg-white/20 backdrop-blur-xl text-white rounded-[40px] px-10 py-8 shadow-[inset_0_0_10px_rgba(255,255,255,0.45)]
             border-3 border-white/50">
        <h2 className="text-4xl font-bold">11+</h2>
        <p className="text-lg mt-2">International Office</p>
      </div>
    </div>
  </div>

  {/* Right Graph Area */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center lg:justify-end overflow-hidden pt-4 lg:pt-0">
    <div className="w-[280px] h-[130px] sm:w-[350px] sm:h-[250px] md:w-[500px] md:h-[240px] lg:w-[420px] lg:h-[320px]">
      {/* Image - Responsive sizing */}
      <div className="lg:absolute -right-4 -top-4 sm:-right-8 sm:-top-6 md:-right-12 md:-top-8 lg:-right-20 lg:-top-10">
        <img
          src="/image/track-img.png"
          alt="man"
          className="w-100 sm:w-56 md:w-130 lg:w-200"
        />
      </div>
    </div>
  </div>
</section>





       <section className="overflow-hidden pt-12 md:pt-16 lg:pt-25 pb-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F36F45]">
              People Behind
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A5A5A] mt-1 md:mt-2">
              Gateway Abroad
            </h3>
          </div>

          {/* RIGHT CARDS */}
          <div className="relative flex flex-col gap-6 md:gap-8">
            {/* CARD 1 */}
            <div className="relative bg-[#fef3f1] backdrop-blur-xl rounded-2xl md:rounded-[28px] px-4 sm:px-6 pt-12 pb-6 md:pt-16 md:pb-8 shadow-lg md:shadow-[0_25px_40px_rgba(0,0,0,0.06)] max-w-full">
              <div className="flex items-start">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                  className="absolute -top-6 -left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 rounded-full border-4 border-white object-cover"
                  alt="Ms. Sakshi T"
                />
                <h4 className="text-lg sm:text-xl font-semibold text-[#F36F45] underline underline-offset-4 ml-20 sm:ml-28 md:ml-32 mt-2">
                  Ms. Sakshi T
                </h4>
              </div>
              <p className="text-[#6B6B6B] text-sm sm:text-base font-medium leading-relaxed mt-4">
                As a prominent figure, she holds certification as a UK Counsellor
                from the British Council. Additionally, she is accredited as an
                IELTS trainer by both the British Council and IDP, along with
                expertise in training for PTE, TOEFL, SELT, GRE, GMAT, and SAT exams.
                Her passion for travel has led her to explore over 20 countries.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="p-[1.5px] relative w-full bg-gradient-to-b from-[#F36F45]/0 via-[#F36F45]/0 to-[#F36F45] rounded-2xl md:rounded-[28px] shadow-lg md:shadow-[0_25px_40px_rgba(0,0,0,0.06)] lg:-top-32">
              <div className="bg-[#fef3f1] rounded-2xl md:rounded-[28px] max-w-full px-4 sm:px-6 pt-12 pb-6 md:pt-16 md:pb-8">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
                    className="absolute -top-6 -left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 rounded-full border-4 border-white object-cover"
                    alt="Mrs. Renu Arora"
                  />
                  <h4 className="text-lg sm:text-xl font-semibold text-[#F36F45] underline underline-offset-4 ml-20 sm:ml-28 md:ml-32 mt-2">
                    Mrs. Renu Arora
                  </h4>
                </div>
                <p className="text-[#6B6B6B] text-sm sm:text-base font-medium leading-relaxed mt-12 sm:mt-15">
                  She holds certification as a UK Counsellor from the British Council
                  and is an accredited IELTS trainer by both British Council and IDP.
                  With years of experience, she has empowered thousands of students
                  to achieve academic and career success with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>




       <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
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