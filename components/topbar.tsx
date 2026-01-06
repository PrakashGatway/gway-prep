import { Phone, MapPin, GraduationCap } from "lucide-react"

export function Topbar() {
  return (
    <div className="bg-brand-dark text-white py-2 text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Phone size={14} className="text-brand-orange" />
            <span>Contact Your Nearest Centre</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-brand-orange" />
            <span>Our Centres</span>
          </div>
          <button className="bg-brand-yellow text-black px-4 py-1 rounded font-bold hover:bg-yellow-400 transition-colors">
            Free Demo
          </button>
          <div className="flex items-center gap-1">
            <GraduationCap size={14} className="text-brand-orange" />
            <span>Student Login</span>
          </div>
        </div>
      </div>
    </div>
  )
}
