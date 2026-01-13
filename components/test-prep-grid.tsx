import { cn } from "@/lib/utils"
const exams = [
  { name: "GRE", desc: "Gateway Abroad: Your pathway to triumph in graduate school", color: "bg-brand-orange" },
  { name: "GMAT", desc: "Crack the business school code with our data-driven insights & practice", color: "bg-[#666]" },
  {
    name: "TOEFL",
    desc: "Open doors to foreign universities with our comprehensive TOEFL prep",
    color: "bg-brand-orange",
  },
  { name: "IELTS", desc: "Master English for global study & migration with expert guidance", color: "bg-brand-orange" },
  {
    name: "SAT",
    desc: "Ace US university admissions with personalized strategies & top-notch materials",
    color: "bg-[#666]",
  },
  { name: "PTE", desc: "Conquer the computer-based test with our flexible & focused prep", color: "bg-brand-orange" },
  { name: "DUOLINGO", desc: "Duolingo", color: "bg-[#666]" },
]

export function TestPrepGrid() {
  return (
    <section className="py-20 bg-white sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-16 border-b-2 border-brand-orange pb-[15px] ">
          <span className="text-brand-orange">Test</span> <span className="text-[#626363]">Preparation</span> 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, i) => (
            <div
              key={i}
              className={cn(
                "rounded-3xl p-8 text-white flex flex-col items-center text-center justify-center transition-transform hover:scale-105 shadow-lg",
                exam.color,
                exam.name === "DUOLINGO" && "lg:col-start-2",
              )}
            >
              <h3 className="text-3xl font-black mb-2">{exam.name}</h3>
              <p className="text-base text-white/90 leading-relaxed max-w-[400px]">{exam.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
