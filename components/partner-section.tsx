// PartnerSection.tsx
"use client";

import Image from "next/image"
import { Phone, MessageCircle, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, User, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FormSection from "./formSection"

// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "Get Started ",
      icon: User,
      fields: ["fullName", "email", "phone", "city", "programs"],
      button: "submit"
    }
  ],
  fields: [
    {
      name: "fullName",
      label: "Student's Name",
      type: "text",
      required: true,
      placeholder: "Student's Name",
      step: 1,
      grid: "full",
      icon: User
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Email",
      step: 1,
      grid: "half",
      icon: Mail
    },
    {
      name: "phone",
      label: "Contact Number",
      type: "tel",
      required: true,
      placeholder: "081234 56789",
      step: 1,
      grid: "half",
      icon: Phone
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: true,
      placeholder: "City",
      step: 1,
      grid: "half",
      icon: MapPin
    },
    {
      name: "programs",
      label: "Which Program are you looking for?",
      type: "checkbox-group",
      required: true,
      step: 1,
      grid: "full",
      options: [
        { value: "Gre", label: "Gre" },
        { value: "Gmat", label: "Gmat" },
        { value: "Act", label: "Act" },
        { value: "Ielts", label: "Ielts" },
        { value: "Toefl", label: "Toefl" },
        { value: "Pte", label: "Pte" },
        // { value: "Others", label: "Others" }
      ]
    }
  ],
  submit: {
    label: "Send Message",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    onSuccess: {
      message: "Thank you! Our team will get back to you shortly.",
      redirect: "/thank-you"
    }
  }
};

export function PartnerSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-[url('/image/bg-contect.jpeg')] bg-cover bg-center relative overflow-hidden " id="partner">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
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
                  <p className="text-xl">+91 9166146538</p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><Phone className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">Call Us</p>
                  <p className="text-xl">+91 9166146538</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><Mail className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">Email Us</p>
                  <p className="text-xl">info@ooshasprap.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg"><MapPin className="text-black w-8 h-8" /></div>
                <div>
                  <p className="text-2xl font-bold">Location</p>
                  <p className="text-xl">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            {/* <div className="flex items-center gap-4 pt-6">
              <span className="text-2xl font-bold">Follow Us</span>
              <Facebook className="w-6 h-6 cursor-pointer hover:text-[#f26e46] transition-colors" />
              <Twitter className="w-6 h-6 cursor-pointer hover:text-[#f26e46] transition-colors" />
              <Instagram className="w-6 h-6 cursor-pointer hover:text-[#f26e46] transition-colors" />
              <Youtube className="w-6 h-6 cursor-pointer hover:text-[#f26e46] transition-colors" />
            </div> */}
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:w-1/2 w-full bg-white rounded-3xl p-8 text-gray-800 shadow-2xl">
            
            <FormSection FORM_CONFIG={FORM_CONFIG} />
          </div>

        </div>
      </div>
    </section>
  )
}