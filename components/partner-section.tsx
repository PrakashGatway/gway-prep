import Image from "next/image"
import ThreeDButton from "./3dbutton"

export function PartnerSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 md:gap-16">
          <div className="p-6 sm:p-8 md:p-12 lg:w-1/2 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-orange mb-4 md:mb-6 border-b-4 border-brand-orange">
              Become a Partner
            </h2>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed max-w-md">
              Join thousand of instructors and earn money hassle free!
            </p>
            <div className="w-full sm:w-auto">
              <ThreeDButton children="Apply Now" bgColor="bg-[#666666]" textColor="text-white" border="none" />
            </div>
          </div>

          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Orange background elements - smaller on mobile */}
              <div className="absolute h-32 sm:h-40 md:h-48 lg:h-50 -top-2 sm:-top-3 -left-2 sm:-left-3 w-32 sm:w-40 md:w-48 lg:w-50 bg-brand-orange z-0 rounded-3xl md:rounded-4xl"></div>
              <div className="absolute h-32 sm:h-40 md:h-48 lg:h-50 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-32 sm:w-40 md:w-48 lg:w-50 bg-brand-orange z-0 rounded-3xl md:rounded-4xl"></div>

              <div className="relative">
                <Image
                  src="https://img.freepik.com/premium-photo/close-uphandshake-business-people-modern-officeconcept-partnership_252847-15482.jpg"
                  alt="Become a Partner"
                  height={500}
                  width={500}
                  className="object-cover z-50 rounded-2xl sm:rounded-3xl md:rounded-4xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}