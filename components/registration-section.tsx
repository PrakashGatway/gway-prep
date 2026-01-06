import Image from "next/image"

export function RegistrationSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <p className="text-2xl font-bold text-brand-orange leading-tight mb-8">
            Established in 2009, this institute is a leader in preparing students for standardized tests like GMAT, GRE,
            SAT, TOEFL, IELTS, and PTE.
          </p>
          <div className="relative inline-block">
            <Image
              src="/images/gaway-20prep-20final-202.jpg"
              alt="Radhika"
              width={350}
              height={350}
              className="rounded-full object-cover"
              style={{ objectPosition: "140px 515px", height: "350px" }}
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-[#555] rounded-full overflow-hidden shadow-xl w-64">
              <div className="flex-1 bg-white/10 px-4 py-2 text-white font-bold text-center">Radhika</div>
              <div className="bg-brand-orange px-4 py-2 text-white flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase">GMAT score</span>
                <span className="text-2xl font-black">8</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="bg-[#666] rounded-3xl p-8 shadow-2xl">
            <h3 className="text-white font-bold text-center text-2xl mb-6 uppercase">REGISTER NOW</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white placeholder:text-white/60 focus:outline-none focus:border-brand-orange"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white placeholder:text-white/60 focus:outline-none focus:border-brand-orange"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white placeholder:text-white/60 focus:outline-none focus:border-brand-orange"
              />
              <select className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white/60 focus:outline-none focus:border-brand-orange">
                <option>Test Prepration</option>
              </select>
              <textarea
                placeholder="Message"
                className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white placeholder:text-white/60 focus:outline-none focus:border-brand-orange h-24"
              />
              <button className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors uppercase tracking-wider">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
