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
    <div className="bg-[#FEF9F4] min-h-screen font-sans text-gray-800">
    
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        {/* Left Column: Text & Contact Cards */}
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
                <p className="text-sm font-medium">+91 88704 42190</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><Mail size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Email Us</p>
                <p className="text-sm font-medium truncate">info@ooshas.com</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><Clock size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Working Hours</p>
                <p className="text-sm font-medium">Mon - Sat 10:00 AM - 7:00 PM</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]"><MessageCircle size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Chat on Whatsapp</p>
                <p className="text-sm font-medium">+91 88704 42190</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
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

      {/* ---------------- CONNECT WITH US ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Connect With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <MessageCircle className="text-green-500" size={28} />, name: "WhatsApp", desc: "Chat with our experts", btnText: "Chat Now", btnColor: "border-green-500 text-green-600 hover:bg-green-50" },
            { icon: <Instagram className="text-pink-500" size={28} />, name: "Instagram", desc: "Follow us for updates", btnText: "Follow Us", btnColor: "border-pink-500 text-pink-600 hover:bg-pink-50" },
            { icon: <Facebook className="text-blue-600" size={28} />, name: "Facebook", desc: "Like our page", btnText: "Like Page", btnColor: "border-blue-600 text-blue-600 hover:bg-blue-50" },
            { icon: <Youtube className="text-red-600" size={28} />, name: "YouTube", desc: "Watch tips & guidance", btnText: "Subscribe", btnColor: "border-red-600 text-red-600 hover:bg-red-50" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="mb-3 p-3 border rounded-full border-gray-100">{item.icon}</div>
              <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
              <p className="text-xs text-gray-500 mb-4">{item.desc}</p>
              <p className="text-sm text-gray-600 mb-4">+91 88704 42190</p>
              <button className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${item.btnColor}`}>
                {item.btnText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- OUR OFFICES ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Offices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { city: "Mohali (Head Office)", address: "SCO 103-104, 2nd Floor, Sector 34A, Chandigarh", pin: "160022", phone: "+91 88704 42190" },
            { city: "Chandigarh", address: "SCO 8-9, 2nd Floor, Sector 17-G, Chandigarh", pin: "160017", phone: "+91 88704 42190" },
            { city: "Jalandhar", address: "BMC Chowk, Near Bus Stand, Jalandhar, Punjab", pin: "144001", phone: "+91 88704 42190" },
            { city: "Amritsar", address: "SCO 12, 1st Floor, Ranjit Avenue, near Golden Temple, Amritsar", pin: "143001", phone: "+91 88704 42190" },
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
             {/* Replace with actual Map component or image */}
             <img src="https://placehold.co/800x400/e2e8f0/475569?text=Map+Image" className="w-full h-full object-cover" alt="Map" />
             <div className="absolute top-10 left-10 p-3 bg-white rounded-full shadow-lg border border-[#FF5E3A] text-[#FF5E3A]"><MapPin size={24} /></div>
             <div className="absolute bottom-1/3 right-1/4 p-3 bg-white rounded-full shadow-lg border border-[#FF5E3A] text-[#FF5E3A]"><MapPin size={24} /></div>
             <div className="absolute top-1/3 right-10 p-3 bg-white rounded-full shadow-lg border border-[#FF5E3A] text-[#FF5E3A]"><MapPin size={24} /></div>
          </div>
          <div className="lg:w-1/3 p-8 flex flex-col justify-center bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Us Across</h3>
            <h3 className="text-2xl font-bold text-[#FF5E3A] mb-4">North India</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Visit our nearest office for personalized counseling and expert guidance on your study abroad journey.</p>
            <button className="self-start border border-[#FF5E3A] text-[#FF5E3A] font-medium py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-[#FF5E3A] hover:text-white transition-colors">
              Get Directions <MapPin size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
            <span className="text-sm font-medium text-gray-800">How can I contact Ooshas?</span>
            <ChevronDown size={16} className="text-[#FF5E3A]" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
            <span className="text-sm font-medium text-gray-800">Can I visit your office without an appointment?</span>
            <ChevronDown size={16} className="text-[#FF5E3A]" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
            <span className="text-sm font-medium text-gray-800">What are your working hours?</span>
            <ChevronDown size={16} className="text-[#FF5E3A]" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
            <span className="text-sm font-medium text-gray-800">How soon will I get a response?</span>
            <ChevronDown size={16} className="text-[#FF5E3A]" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
            <span className="text-sm font-medium text-gray-800">Do you offer online counselling?</span>
            <ChevronDown size={16} className="text-[#FF5E3A]" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
            <span className="text-sm font-medium text-gray-800">Which documents do I need for counselling?</span>
            <ChevronDown size={16} className="text-[#FF5E3A]" />
          </div>
        </div>
      </section>

      {/* ---------------- BOTTOM CTA (STUDENTS) ---------------- */}
      <section className="bg-[#FEF9F4] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
            <div className="lg:w-1/2 relative h-64 lg:h-80 w-full flex justify-center lg:justify-start">
                {/* Placeholder for couple image */}
                 <img src="https://placehold.co/400x300/transparent/png?text=Couple+Image" className="object-contain h-full w-auto" alt="Students" />
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











// "use client";

// import { PartnerSection } from "./partner-section";
// import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';

// const iconMap: Record<string, any> = {
//   Phone,
//   Mail,
//   MapPin,
//   MessageSquare,
//   Clock,
//   Globe,
// };

// export default function ContactUs({ Data }: any) {
//   const heroFields = Data?.['hero-section']?.fields || {};
//   const contactFields = Data?.['Contectus-detils']?.fields || {};
//   const contactDetails = contactFields['contect-details'] || [];
//   const contactImage = contactFields.image || "";
//   const mapEmbedUrl = contactFields.mapEmbedUrl || "";

//   return (
//     <>

//       <section className="relative py-20 bg-gradient-to-br from-orange-50 to-white">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           {heroFields.title ? (
//             <div
//               dangerouslySetInnerHTML={{ __html: heroFields.title }}
//               className="text-4xl md:text-6xl font-bold text-gray-900"
//             />
//           ) : (
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
//               Contact <span className="text-[#F36C45]">Us</span>
//             </h1>
//           )}
//           {heroFields.subtitle && (
//             <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
//               {heroFields.subtitle}
//             </p>
//           )}
//         </div>
//       </section>



//       <PartnerSection />


//       <section className="py-20 px-6 lg:px-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-start">

//             {/* Left Column: Content & Visual */}
//             <div className="space-y-8">
//               <div className="space-y-4">
//                 {contactFields.title ? (
//                   <div
//                     dangerouslySetInnerHTML={{ __html: contactFields.title }}
//                   />
//                 ) : (
//                   <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
//                     We're Here, <span style={{ color: "#e87a4d" }}>Let's Talk</span>
//                   </h2>
//                 )}
//                 {contactFields.subtitle && (
//                   <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
//                     {contactFields.subtitle}
//                   </p>
//                 )}
//               </div>

//               <div className="relative group">
//                 <div className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//                 <img
//                   src={
//                     contactImage ||
//                     "https://img.freepik.com/premium-vector/vector-characters-teenage-couple-talking-simple-minimalist-flat-design-style_995281-2526.jpg"
//                   }
//                   alt="Contact illustration"
//                   className="relative w-full max-w-md rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
//                 />
//               </div>
//             </div>

//             {/* Right Column: Map & Info Cards */}
//             <div className="space-y-6">
//               {/* Map Container */}
//               <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white p-2">
//                 {mapEmbedUrl ? (
//                   <iframe
//                     title="Location map"
//                     src={mapEmbedUrl}
//                     className="w-full h-64 rounded-xl"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                   />
//                 ) : (
//                   <iframe
//                     title="Gateway Abroad location"
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8454158773748!2d75.77696207522415!3d26.908400676649794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40cd42722ff%3A0xcfc3ab392fa9adf7!2sGateway%20Abroad%20Education%20%7C%20Study%20Abroad%20Consultants%20%7C%20IELTS%20GRE%20GMAT%20SAT%20TOEFL%20PTE%20Coaching%20%7C%20Spoken%20English%20Class!5e0!3m2!1sen!2sin!4v1777016093406!5m2!1sen!2sin"
//                     className="w-full h-64 rounded-xl"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                   />
//                 )}
//               </div>

//               {/* Info Cards Grid */}
//               <div className="grid gap-4">
//                 {contactDetails.length > 0
//                   ? contactDetails.map((card: any, index: number) => {
//                       const IconComponent = iconMap[card.icon] || Phone;
//                       return (
//                         <div
//                           key={index}
//                           className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300"
//                         >
//                           <div
//                             style={{ backgroundColor: "#fdf1ec" }}
//                             className="p-4 rounded-xl mr-6"
//                           >
//                             <IconComponent size={24} style={{ color: "#e87a4d" }} />
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
//                               {card.title}
//                             </h3>
//                             <div className="flex flex-wrap gap-x-4 text-gray-700">
//                               {card.value}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })
//                   : // Fallback static cards if no dynamic data
//                     [
//                       {
//                         title: "Call Us",
//                         icon: "Phone",
//                         value: "+91 12345 67890",
//                       },
//                       {
//                         title: "Email Us",
//                         icon: "Mail",
//                         value: "info@gatewayabroad.com",
//                       },
//                     ].map((card, index) => {
//                       const IconComponent = iconMap[card.icon] || Phone;
//                       return (
//                         <div
//                           key={index}
//                           className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300"
//                         >
//                           <div
//                             style={{ backgroundColor: "#fdf1ec" }}
//                             className="p-4 rounded-xl mr-6"
//                           >
//                             <IconComponent size={24} style={{ color: "#e87a4d" }} />
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
//                               {card.title}
//                             </h3>
//                             <div className="flex flex-wrap gap-x-4 text-gray-700">
//                               {card.value}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//     </>
//   );
// }









// // 
// // 
// // "use client";

// // import { PartnerSection } from "./partner-section";
// // import { Phone, Mail, MapPin } from 'lucide-react'; 

// // export default function ContactUs({Data}:any) {

  
// //   const infoCards = [
// //     {
// //       title: "Call Us",
// //       icon: Phone,
// //       details: ["+91 12345 67890", "+91 09876 54321"]
// //     },
// //     {
// //       title: "Email Us",
// //       icon: Mail,
// //       details: ["info@gatewayabroad.com", "support@gatewayabroad.com"]
// //     }
// //   ];


// //   return (
// //     <>
    
// //       <section className="relative py-20 bg-gradient-to-br from-orange-50 to-white">
// //         <div className="max-w-6xl mx-auto px-4 text-center">
// //           {/* <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
// //             Contact <span className="text-[#F36C45]">Us</span>
// //           </h1> */}
// //           <div dangerouslySetInnerHTML={{__html : Data['hero-section'].fields.title}} className="text-4xl md:text-6xl font-bold text-gray-900"/>

// //           <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
// //             { Data['hero-section'].fields.subtitle}
// //           </p>
// //         </div>
// //       </section>

      


// //       <PartnerSection />
      
    
// //     <section className="py-20 px-6 lg:px-12 bg-gray-50">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="grid lg:grid-cols-2 gap-16 items-start">
          
// //           {/* Left Column: Content & Visual */}
// //           <div className="space-y-8">
// //             <div className="space-y-4">
// //               {/* <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
// //                 We're Here, <span style={{ color: "#e87a4d" }}>Let's Talk</span>
// //               </h2> */}
// //               <div dangerouslySetInnerHTML={{__html: Data['Contectus-detils'].fields.title}} />
// //               <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
// //                 {Data['Contectus-detils'].fields.subtitle}  
// //               </p>
// //             </div>
            
// //             <div className="relative group">
// //               <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
// //               <img
// //                 src="https://img.freepik.com/premium-vector/vector-characters-teenage-couple-talking-simple-minimalist-flat-design-style_995281-2526.jpg"
// //                 alt="Contact illustration"
// //                 className="relative w-full max-w-md rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
// //               />
// //             </div>
// //           </div>

// //           {/* Right Column: Map & Info Cards */}
// //           <div className="space-y-6">
// //             {/* Map Container */}
// //             <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white p-2">
// //               <iframe
// //                 title="Gateway Abroad location"
// //                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8454158773748!2d75.77696207522415!3d26.908400676649794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40cd42722ff%3A0xcfc3ab392fa9adf7!2sGateway%20Abroad%20Education%20%7C%20Study%20Abroad%20Consultants%20%7C%20IELTS%20GRE%20GMAT%20SAT%20TOEFL%20PTE%20Coaching%20%7C%20Spoken%20English%20Class!5e0!3m2!1sen!2sin!4v1777016093406!5m2!1sen!2sin"
// //                 className="w-full h-64 rounded-xl"
// //                 style={{ border: 0 }}
// //                 allowFullScreen
// //                 loading="lazy"
// //               />
// //               {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
// //             </div>

// //             {/* Info Cards Grid */}
// //             <div className="grid gap-4">
// //               {Data['Contectus-detils'].fields['contect-details'].map((card, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300"
// //                 >
// //                   <div 
// //                     style={{ backgroundColor: "#fdf1ec" }} 
// //                     className="p-4 rounded-xl mr-6"
// //                   >
// //                     <card.icon size={24} style={{ color: "#e87a4d" }} />
// //                   </div>
// //                   <div>
// //                     <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
// //                       {card.title}
// //                     </h3>
// //                     <div className="flex flex-wrap gap-x-4">
// //                       {card.value}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>

// //     </>
// //   );
// // }
