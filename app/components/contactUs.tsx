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
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import FormSection from "./formSection";

// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "",
      icon: User,
      fields: ["fullName", "email", "phone", "topic", "message"],
      button: "submit",
    },
  ],
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Full Name",
      step: 1,
      grid: "half",
      icon: User,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Email Address",
      step: 1,
      grid: "half",
      icon: Mail,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "Phone Number",
      step: 1,
      grid: "full",
      icon: Phone,
    },
    {
      name: "topic",
      label: "Topic",
      type: "select",
      required: false,
      step: 1,
      grid: "full",
      options: [
        { value: "", label: "Topic" },
        { value: "study-abroad", label: "Study Abroad" },
        { value: "exams", label: "Exams" },
        { value: "visa", label: "Visa" },
        { value: "counselling", label: "Counselling" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "message",
      label: "Your Message",
      type: "textarea",
      required: false,
      placeholder: "Your Message",
      step: 1,
      grid: "full",
      rows: 5,
    },
  ],
  submit: {
    label: "Send Message",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    onSuccess: {
      message: "Thank you! We'll get back to you within a few hours.",
      redirect: "/thank-you",
    },
  },
};

function ConnectSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Connect With Us - Left Side */}
        <div>
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-10">
            Connect <span className="text-[#FF5E3A]">With Us</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                icon: <MessageCircle className="text-white" size={28} />,
                link: "https://wa.me/919166146538",
                name: "WhatsApp",
                desc: "Chat with our experts",
                number: "+91 9166146538",
                btnText: "Chat Now",
                color: "#25D366",
              },
              {
                icon: <Instagram className="text-white" size={28} />,
                link: "https://www.instagram.com/ooshasprep",
                name: "Instagram",
                desc: "Follow us for updates",
                number: "",
                btnText: "Follow Us",
                color: "#E4405F",
              },
              {
                icon: <Facebook className="text-white" size={28} />,
                link: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
                name: "Facebook",
                desc: "Like our page",
                number: "",
                btnText: "Like Page",
                color: "#1877F2",
              },
              {
                icon: <Youtube className="text-white" size={28} />,
                link: "https://youtube.com/@ooshasprep",
                name: "YouTube",
                desc: "Watch tips & guidance",
                number: "",
                btnText: "Subscribe",
                color: "#FF0000",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFF8F5] border border-[#FFEDE4]  p-6 flex items-center gap-5 hover:shadow-md transition-all"
              >
                {/* Icon Container */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg text-[#1a1a2e]">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                  {item.number && (
                    <div className="text-sm font-medium text-gray-700 mt-0.5">
                      {item.number}
                    </div>
                  )}
                </div>

                {/* Button */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-[#FF5E3A] hover:bg-[#e54a2a] text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  {item.btnText}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Send Us a Message - Right Side */}
        <div className="bg-white  p-8 lg:p-10 shadow-sm border border-gray-100">
          <h3 className="text-3xl font-bold text-[#1a1a2e] mb-8">
            Send Us a Message
          </h3>

          <FormSection FORM_CONFIG={FORM_CONFIG} />
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className=" min-h-screen text-gray-800">
      {/* ---------------- HERO SECTION ---------------- */}
      <div className=" bg-[#FEF9F4]">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                We're Here to Help.
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Let's Connect!
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about studying abroad, exams, applications or
                anything else? Our team is ready to assist you at every step of
                your journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call Us</p>
                  <p className="text-sm font-medium">+91 9166146538</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Us</p>
                  <p className="text-sm font-medium truncate">
                    info@ooshasprep.com
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Working Hours</p>
                  <p className="text-sm font-medium">
                    Mon - Sat 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Chat on Whatsapp</p>
                  <p className="text-sm font-medium">+91 9166146538</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" p-8 relative">
            {/* */}
            {/* Decorative Dots / Absolute positioning for the woman image (approx) */}
            <div className="  ">
              <div className=" h-full bg-transparent relative">
                <img
                  src="/contactshero.webp"
                  alt="Woman talking"
                  className="object-contain w-full h-full"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- CONNECT WITH US ---------------- */}
      <ConnectSection />

      {/* ---------------- OUR OFFICES ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Our Offices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              city: "Jaipur (Head Office)",
              address: "SCO 103-104, 2nd Floor, Sector 34A, Chandigarh",
              pin: "160022",
              phone: "+91 9166146538",
            },
            {
              city: "Delhi",
              address: "SCO 8-9, 2nd Floor, Sector 17-G, Chandigarh",
              pin: "160017",
              phone: "+91 9166146538",
            },
            {
              city: "kolkata",
              address: "BMC Chowk, Near Bus Stand, Jalandhar, Punjab",
              pin: "144001",
              phone: "+91 9166146538",
            },
            {
              city: "bangalore",
              address:
                "SCO 12, 1st Floor, Ranjit Avenue, near Golden Temple, Amritsar",
              pin: "143001",
              phone: "+91 9166146538",
            },
          ].map((office, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <div className="h-32 bg-gray-200 relative">
                {/* Replace with actual office image */}
                <img
                  src={`https://placehold.co/400x200/e2e8f0/475569?text=Office+Image`}
                  className="w-full h-full object-cover"
                  alt={office.city}
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-900 mb-1">
                  {office.city}
                </h4>
                {/* <p className="text-xs text-gray-500 leading-relaxed mb-2">{office.address}</p> */}
                {/* <div className="flex items-start gap-2 text-xs text-gray-600 mb-1">
                   <MapPin size={12} className="text-[#FF5E3A] mt-0.5 shrink-0" /> {office.pin}
                </div> */}
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13027.046312498469!2d75.76255926571812!3d26.907153148223077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40d51d0b52b%3A0x839fb9b5210e18c1!2sCivil%20Lines%2C%20Jaipur%2C%20Rajasthan!5e1!3m2!1sen!2sin!4v1784363697294!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="lg:w-1/3 p-8 flex flex-col justify-center bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Find Us Across
            </h3>
            <h3 className="text-2xl font-bold text-[#FF5E3A] mb-4"> India</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Visit our nearest office for personalized counseling and expert
              guidance on your study abroad journey.
            </p>
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
            <img
              src="/contact.webp"
              className="object-contain h-full w-auto"
              alt="Students"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Your Dream University
            </h3>
            <h3 className="text-3xl font-bold text-[#FF5E3A] mb-4">
              is Just a Conversation Away.
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
              Reach out to our experts today and take the first step towards
              your global education journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-[#FF5E3A] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-[#e54a2a] transition-colors">
                Talk to an Expert
              </button>
              <button className="border border-[#FF5E3A] text-[#FF5E3A] font-medium py-3 px-8 rounded-lg hover:bg-[#FFF6F2] transition-colors">
                Book Free Counselling
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
