"use client";

import React from "react";
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className=" min-h-screen text-gray-800">
    
      {/* ---------------- HERO SECTION ---------------- */}
      <div className=" bg-[#FEF9F4]">
        
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">We're Here to Help.</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Let's Connect!</h2>
            <p className="text-gray-600 mb-8">Have questions about studying abroad, exams, applications or anything else? Our team is ready to assist you at every step of your journey.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><Phone size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Call Us</p>
                <p className="text-sm font-medium">+91 9875863347</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><Mail size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Email Us</p>
                <p className="text-sm font-medium truncate">info@ooshasprep.com</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><Clock size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Working Hours</p>
                <p className="text-sm font-medium">Mon - Sat 9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><MessageCircle size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Chat on Whatsapp</p>
                <p className="text-sm font-medium">+91 9875863347</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 relative">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]" />
              <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]" />
            </div>
            <input type="tel" placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]" />
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]">
                <option>Topic</option>
                <option>Study Abroad</option>
                <option>Exams</option>
                <option>Visa</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <textarea placeholder="Your Message" rows={4} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"></textarea>
            
            <button type="button" className="w-full bg-[#FF5E3A] text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-[#e54a2a] transition-colors">
              Send Message <Send size={16} />
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">We usually respond within a few hours.</p>
          </form>
          {/* Decorative Dots / Absolute positioning for the woman image (approx) */}
          <div className="absolute -right-12 -top-12 hidden xl:block z-[-1]">
             {/* Since we don't have the image, we place a placeholder description. Replace this div with an <img /> tag */}
             <div className="w-48 h-56 bg-transparent relative">
                {/* Visual Placeholder for the image */}
                <img src="https://placehold.co/400x500/transparent/png?text=Woman+Image" alt="Woman talking" className="object-contain w-full h-full" style={{mixBlendMode: 'multiply'}}/>
             </div>
          </div>
        </div>
      </section>
      </div>

      {/* ---------------- CONNECT WITH US ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Connect With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <MessageCircle className="text-green-500" size={28} />, link:"https://wa.me/+919875863347?text=Hello" , name: "WhatsApp", desc: "Chat with our experts", btnText: "Chat Now", btnColor: "border-green-500 text-green-600 hover:bg-green-50" },
            { icon: <Instagram className="text-pink-500" size={28} />, link: "https://www.instagram.com/ooshasprep", name: "Instagram", desc: "Follow us for updates", btnText: "Follow Us", btnColor: "border-pink-500 text-pink-600 hover:bg-pink-50" },
            { icon: <Facebook className="text-blue-600" size={28} />,link: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr", name: "Facebook", desc: "Like our page", btnText: "Like Page", btnColor: "border-blue-600 text-blue-600 hover:bg-blue-50" },
            { icon: <Youtube className="text-red-600" size={28} />,link: "https://youtube.com/@ooshasprep", name: "YouTube", desc: "Watch tips & guidance", btnText: "Subscribe", btnColor: "border-red-600 text-red-600 hover:bg-red-50" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="mb-3 p-3 border rounded-full border-gray-100">{item.icon}</div>
              <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
              <p className="text-xs text-gray-500 mb-4">{item.desc}</p>
              <p className="text-sm text-gray-600 mb-4">+91 9875863347</p>
              <a href={item?.link} target="_blank" className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${item.btnColor}`}>
                {item.btnText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- OUR OFFICES ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Offices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { city: "Jaipur (Head Office)", address: "SCO 103-104, 2nd Floor, Sector 34A, Chandigarh", pin: "160022", phone: "+91 9875863347" },
            { city: "Delhi", address: "SCO 8-9, 2nd Floor, Sector 17-G, Chandigarh", pin: "160017", phone: "+91 9875863347" },
            { city: "kolkata", address: "BMC Chowk, Near Bus Stand, Jalandhar, Punjab", pin: "144001", phone: "+91 9875863347" },
            { city: "bangalore", address: "SCO 12, 1st Floor, Ranjit Avenue, near Golden Temple, Amritsar", pin: "143001", phone: "+91 9875863347" },
          ].map((office, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-32 bg-gray-200 relative">
                {/* Replace with actual office image */}
                <img src={`https://placehold.co/400x200/e2e8f0/475569?text=Office+Image`} className="w-full h-full object-cover" alt={office.city} />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-gray-900 mb-1">{office.city}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{office.address}</p>
                <div className="flex items-start gap-2 text-xs text-gray-600 mb-1">
                   <MapPin size={12} className="text-[#FF5E3A] mt-0.5 shrink-0" /> {office.pin}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#FF5E3A] font-medium">
                   <Phone size={12} /> {office.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MAP & CTA ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
          <div className="lg:w-2/3 h-64 lg:h-96 bg-gray-100 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17886.161589645!2d75.7793362!3d26.908390299999997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40cd42722ff%3A0xcfc3ab392fa9adf7!2sGateway%20Abroad%20Education%20%7C%20Study%20Abroad%20Consultants%20%7C%20IELTS%20GRE%20GMAT%20SAT%20TOEFL%20PTE%20Coaching%20%7C%20Spoken%20English%20Class!5e1!3m2!1sen!2sin!4v1784264370950!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
          <div className="lg:w-1/3 p-8 flex flex-col justify-center bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Us Across</h3>
            <h3 className="text-2xl font-bold text-[#FF5E3A] mb-4"> India</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Visit our nearest office for personalized counseling and expert guidance on your study abroad journey.</p>
            <button className="self-start border border-[#FF5E3A] text-[#FF5E3A] font-medium py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-[#FF5E3A] hover:text-white transition-colors">
              Get Directions <MapPin size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* ---------------- BOTTOM CTA (STUDENTS) ---------------- */}
      <section className="bg-[#FEF9F4] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
            <div className="lg:w-1/2 relative h-64 lg:h-80 w-full flex justify-center lg:justify-start">
                {/* Placeholder for couple image */}
                 <img src="https://placehold.co/400x300/transparent/png?text=Img" className="object-contain h-full w-auto" alt="Students" />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Your Dream University</h3>
                <h3 className="text-3xl font-bold text-[#FF5E3A] mb-4">is Just a Conversation Away.</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">Reach out to our experts today and take the first step towards your global education journey.</p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <button className="bg-[#FF5E3A] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-[#e54a2a] transition-colors">Talk to an Expert</button>
                    <button className="border border-[#FF5E3A] text-[#FF5E3A] font-medium py-3 px-8 rounded-lg hover:bg-[#FFF6F2] transition-colors">Book Free Counselling</button>
                </div>
            </div>
        </div>
      </section>


    </div>
  );
}





