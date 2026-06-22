"use client";

export function Baners({ heading, img }: { heading?: any; img?: any }) {
  return (
    <section className="bg-white py-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <h2 className="text-4xl md:text-5xl text-[#626363] font-bold text-center mb-16">
          Everything you need to{" "}
          <span className="text-[#E6883C]">prep any time</span>
        </h2>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. Top Large Card (Self-Paced Courses) */}
          <div className="col-span-1 lg:col-span-2 bg-[#F4F5F5] rounded-[40px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm border border-gray-200/50">
            <div className="md:w-1/3 space-y-4">
              <h3 className="text-3xl font-bold text-[#1A1A1A]">Self-Paced Courses</h3>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                Expert-crafted practice questions, engaging video lessons, and detailed explanations—all backed by analytics to track your progress.
              </p>
            </div>
            <div className="md:w-2/3 w-full flex justify-center md:justify-end">
              <img
                src={"/image/s1.png"}
                alt="Self-Paced Courses Interface"
                className="w-full max-w-[550px] h-auto  object-cover "
              />
            </div>
          </div>

          {/* 2. Bottom Left Card (Personalized AI Tutoring) */}
          <div className="col-span-1 bg-[#F4F5F5] rounded-[40px] p-8 flex flex-col justify-between gap-6 shadow-sm border border-gray-200/50 min-h-[400px]">
            <div className="w-full flex justify-center">
              <img
                src="/image/s3.png"
                alt="AI Tutoring Interface"
                className="w-full rounded h-[22rem] object-fit "
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-[#1A1A1A]">Personalized AI Tutoring</h3>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                Instant scoring, step-by-step guidance, and targeted feedback from your own AI-powered tutor. Boost your skills faster with Magoosh.
              </p>
            </div>
          </div>

          {/* 3. Bottom Right Card (Mobile Apps) */}
          <div className="col-span-1 bg-[#F4F5F5] rounded-[40px] p-8 flex flex-col justify-between gap-6 shadow-sm border border-gray-200/50 min-h-[400px]">
            <div className="w-full flex justify-center relative">
              {/* Phone Mockup Layer */}
              <img
                src="/image/s2.png"
                alt="Mobile App Interface"
                className="w-auto  z-10 object-cover"
              />
               {/* Background Card Layer for depth */}
              <div className="absolute right-10 top-4 w-[200px] h-[150px] bg-white/80 rounded-xl shadow-md -z-0 transform rotate-6"></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-[#1A1A1A]">Mobile Apps</h3>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                Turn any minute into study time with our iOS and Android prep and flashcard apps by Magoosh.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}