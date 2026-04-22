"use client"

import { PartnerSection } from "./partner-section"


export default function Career(){

     const vacancies = [
    {
      title: "Front Desk Receptionist",
      count: "2",
      location: "civil lines",
      description:
        "This is a full-time on-site role for a Front Desk Receptionist located in Jaipur. The Front Desk Receptionist will be responsible for phone etiquette, receptionist duties, clerical communication, and customer service.",
      tags: ["Full-Time", "3 Year", "Mid-Senior Level"],
    },
    {
      title: "Counselor",
      count: "2",
      location: "jaipur",
      description:
        "This is a full-time on-site role for a test preparation counselor located in Jaipur. Providing counseling for all the test preparations (IELTS, PTE, SAT, GRE, GMAT, TOEFL, SELT & DUOLINGO)",
      tags: ["Full-Time", "2 Year", "Mid Level"],
    },
    {
      title: "Study Abroad Consultants",
      count: "1",
      location: "105, first floor, Geetanjali Tower, Ajmer Road, Civil Lines, Jaipur, Rajasthan",
      description:
        "Gateway Abroad Jaipur, a trusted Abroad education Consultants in Jaipur, is seeking a Study Abroad Counselor. With 16+ years of excellence in guiding students to prestigious universities across the UK, Ireland, Australia, USA, Canada, New Zealand, and Singapore we offer career counseling, course selection, exam prep (IELTS, PTE, TOEFL), visa assistance, and financial planning.",
      tags: ["Full-Time", "1 Year", "Mid Level"],
    },
  ]


   const jobs = [
    {
      title: "Front-End Developer",
      vacancies: "1",
      location: "Gateway Abroad Jaipur, 105 Geetanjali Tower, Civil line, Jaipur, Rajasthan, India",
      about:
        "Gateway Abroad Jaipur is a trusted study abroad consultancy and Test Preparation institute with 16+ years of experience helping students achieve their international education goals.\n\nWe are expanding our digital team and seeking a talented Front-End Developer in Jaipur skilled in React, Next.js, and modern web development technologies — with basic backend knowledge.\n\nIf you're passionate about creating interactive, SEO-friendly, and high-performance websites, we'd love to meet you!",
      responsibilities: "Full-Time • 2 Year • Mid Level",
    },
    {
      title: "Graphic Designer",
      vacancies: "1",
      location: "Geetanjali Tower, Ajmer Road Civil Lines, jaipur, Rajasthan, India 302006",
      about:
        "We're looking for a creative and detail-oriented Graphic Designer to join our team at Gateway Abroad Education. The ideal candidate should have experience in designing social media creatives, banners, and branding materials using tools like Photoshop, Illustrator, and Canva. If you're passionate about visual storytelling and want to work in the education sector, apply now through our website.",
      responsibilities: "Full-Time • 1 Year • Mid Level",
    },
    {
      title: "Video Editor",
      vacancies: "1",
      location: "Geetanjali Tower, Ajmer Road Civil Lines, jaipur, Rajasthan, India 302006",
      about:
        "Gateway Abroad Education is hiring a talented Video Editor to create engaging YouTube videos and educational content for our study abroad campaigns. The ideal candidate should have strong storytelling skills, proficiency in editing software, and a passion for creative content. Please apply now to join our creative team that helps students achieve their global dreams.",
      responsibilities: "Full-Time • 1 Year • Mid Level",
    },
  ]

    return(
        <>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-16 bg-[url('/image/bg-test-pre.jpg')]
    bg-cover
    bg-center
    bg-no-repeat" >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Join Our <span className="text-[#e87a4d]">Team</span>
        </h2>
        <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
          Be part of a dynamic team that helps students achieve their study abroad dreams. Explore exciting career
          opportunities with Gateway Abroad Education.
        </p>
      </div>
    </section>

     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white my-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6">Working with Gateway Abroad</h2>
            <p className="text-[#666666] leading-relaxed mb-4">
              In a relatively short period of time, Gateway Abroad has assembled such a strong team. Staff members that
              are committed and diligent have made this possible. We make an effort to encourage and reward personnel on
              a regular basis. After all, what good is labour without praise? We seek people who can contribute to our
              team with innovative ideas and effectively interact with clients.
            </p>
            <p className="text-[#666666] leading-relaxed">
              Join us immediately if you're looking for opportunities to improve your talents and have excellent
              communication skills.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="bg-[#f5d5c8] rounded-2xl h-64 flex items-center justify-center">
            <img src="/image/career-img.jpeg" alt="" />
          </div>
        </div>
      </div>
    </section>



     <section className="bg-gradient-to-b from-[#fef5e8] to-[#f9f6f3] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1a1a1a] text-center mb-12">Vacancies</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vacancies.map((vacancy, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#e87a4d]"
            >
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{vacancy.title}</h3>
              <p className="text-sm text-[#666666] mb-2">No. of Vacancy: {vacancy.count}</p>
              <p className="text-sm text-[#666666] mb-4">Location: {vacancy.location}</p>

              <p className="text-sm text-[#666666] leading-relaxed mb-6 line-clamp-4">{vacancy.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {vacancy.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1 bg-[#ffe8dc] text-[#e87a4d] text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-[#e87a4d] hover:bg-[#d66a3d] text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                Apply Now
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#e87a4d]"
            >
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{job.title}</h3>
              <p className="text-sm text-[#666666] mb-2">No. of Vacancy: {job.vacancies}</p>
              <p className="text-sm text-[#666666] mb-4">Location: {job.location}</p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#1a1a1a] mb-2">About Gateway Abroad Jaipur:</p>
                <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-line line-clamp-4">{job.about}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block px-3 py-1 bg-[#ffe8dc] text-[#e87a4d] text-xs font-medium rounded-full">
                  Full-Time
                </span>
                <span className="inline-block px-3 py-1 bg-[#f5f5f5] text-[#666666] text-xs font-medium rounded-full">
                  2 Year
                </span>
                <span className="inline-block px-3 py-1 bg-[#f5f5f5] text-[#666666] text-xs font-medium rounded-full">
                  Mid Level
                </span>
              </div>

              <button className="w-full bg-[#e87a4d] hover:bg-[#d66a3d] text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                Apply Now
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>


     <section className="min-h-screen bg-gradient-to-b from-[#f9f6f3] to-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Boost Your Career! Find the Perfect Role with Gateway Abroad
            </h1>
            <p className="text-lg text-[#666666] mb-8 leading-relaxed hidden md:block">
              Join our team and grow with us. Explore exciting career opportunities in education and recruitment.
            </p>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] placeholder:text-[#999999] focus:outline-none focus:border-[#e87a4d]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] placeholder:text-[#999999] focus:outline-none focus:border-[#e87a4d]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] placeholder:text-[#999999] focus:outline-none focus:border-[#e87a4d]"
              />
              <select className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] focus:outline-none focus:border-[#e87a4d] appearance-none bg-white">
                <option>Select Vacancy</option>
                <option>Frontend Developer</option>
                <option>UI/UX Designer</option>
                <option>Content Strategist</option>
              </select>

              {/* File Upload */}
              <div className="border-2 border-dashed border-[#e0e0e0] rounded-lg p-6 text-center hover:bg-[#f9f6f3] transition">
                <svg
                  className="w-8 h-8 mx-auto text-[#e87a4d] mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                  />
                </svg>
                <p className="text-[#666666] text-sm font-medium">upload your CV Here</p>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </div>

              <button className="w-full bg-[#e87a4d] hover:bg-[#d66a3d] text-white font-bold py-3 rounded-lg transition duration-200">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <PartnerSection/>

    


    
        </>
    )
}