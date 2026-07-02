// PartnerSection.tsx
import Image from "next/image"
import { Phone, MessageCircle, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function PartnerSection() {
  return (
    <section className="py-8 md:py-10 lg:py-12 bg-[url('/image/bg-contect.jpeg')] bg-cover bg-center relative overflow-hidden font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]" id="partner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 text-white">
          
          {/* Left Column: Contact Info */}
          <div className="lg:w-1/2 w-full space-y-2">
            <p className="text-3xl md:text-5xl font-bold">Get Started</p>
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              Ready to Build Your Score Strategy?
            </p>
            <p className="text-lg opacity-90 max-w-md">
              Take the first step towards your dream university. Our experts will help you plan your roadmap to success.
            </p>

            <div className="space-y-6 pt-4">
              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><MessageCircle className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">WhatsApp Us</p>
                  <p className="text-xl">+91 97403 35125</p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><Phone className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">Call Us</p>
                  <p className="text-xl">+91 9875863347</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><Mail className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">Email Us</p>
                  <p className="text-xl">info@questforsuccess.in</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><MapPin className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">Location</p>
                  <p className="text-xl">Bangalore, India</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4 pt-6">
              <span className="text-2xl font-bold">Follow Us</span>
              <Facebook className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
              <Instagram className="w-6 h-6" />
              <Youtube className="w-6 h-6" />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:w-1/2 w-full bg-white rounded-3xl p-8 text-gray-800 shadow-2xl">
            <form className="space-y-2">
              <div>
                <label className="block text-sm font-semibold mb-1">Student's Name *</label>
                <input type="text" placeholder="Student's Name" className="w-full p-2 bg-gray-50 border rounded-md" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Email *</label>
                  <input type="email" placeholder="Email" className="w-full p-2 bg-gray-50 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Contact No. *</label>
                  <input type="tel" placeholder="081234 56789" className="w-full p-2 bg-gray-50 border rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">City *</label>
                <input type="text" placeholder="City" className="w-full p-2 bg-gray-50 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">School Name *</label>
                <input type="text" placeholder="School Name" className="w-full p-2 bg-gray-50 border rounded-md" />
              </div>
              </div>
              {/* <div>
                <label className="block text-sm font-semibold mb-1">Student Grade *</label>
                <select className="w-full p-2 bg-gray-50 border rounded-md">
                  <option value="">Select Grade</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                </select>
              </div> */}
              <div>
                <label className="block text-sm font-semibold mb-1">Which Program are you looking for? *</label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {['SAT', 'AP', 'IB-Tutoring', 'IGCSE', 'A LEVELS - Tutoring', 'Counselling', 'Others'].map(prog => (
                    <label key={prog} className="flex items-center gap-1">
                      <input type="checkbox" /> {prog}
                    </label>
                  ))}
                </div>
              </div>
              {/* <div>
                <label className="block text-sm font-semibold mb-1">Comment or Message *</label>
                <textarea placeholder="Message" className="w-full p-2 bg-gray-50 border rounded-md h-24"></textarea>
              </div> */}

              <div>
                <label className="block text-sm font-semibold mb-1">How did you come to know about us?</label>
                <select id="2" className="w-full p-2 bg-gray-50 border rounded-md ">
                  <option value="" hidden>Select an option</option>
                  {['Google Search', 'Social Media', 'Advertisement', 'Other'].map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
              <button className="w-full py-4 bg-[#f26e46] text-white font-bold rounded-lg transition">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}