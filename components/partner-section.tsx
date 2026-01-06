import Image from "next/image"

export function PartnerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-brand-light-orange rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center">
          <div className="p-12 md:w-1/2">
            <h2 className="text-5xl font-extrabold text-brand-orange mb-6">Become a Partner</h2>
            <p className="text-gray-700 text-xl mb-8 leading-relaxed max-w-md">
              Join thousand of instructors and earn money hassle free!
            </p>
            <button className="bg-brand-dark text-white px-10 py-3 rounded-xl font-bold hover:bg-black transition-all">
              Apply now
            </button>
          </div>
          <div className="md:w-1/2 h-full min-h-[400px] relative">
            <Image
              src="/images/gaway-20prep-20final-202.jpg"
              alt="Become a Partner"
              fill
              className="object-cover"
              style={{ objectPosition: "550px 800px" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
