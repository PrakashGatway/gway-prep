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

function ConnectSection({ data }: { data?: any }) {
  const connectData = data?.sections?.["connect-section"]?.fields;
  
  // Fallback data if CMS data is not available
  const socialItems = connectData?.socialItems || [
    {
      icon: "MessageCircle",
      name: "WhatsApp",
      description: "Chat with our experts",
      buttonText: "Chat Now",
      link: "https://wa.me/919166146538",
      contact: "+91 9166146538",
      color: "#25D366",
    },
    {
      icon: "Instagram",
      name: "Instagram",
      description: "Follow us for updates",
      buttonText: "Follow Us",
      link: "https://www.instagram.com/ooshasprep",
      contact: "",
      color: "#E4405F",
    },
    {
      icon: "Facebook",
      name: "Facebook",
      description: "Like our page",
      buttonText: "Like Page",
      link: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
      contact: "",
      color: "#1877F2",
    },
    {
      icon: "Youtube",
      name: "YouTube",
      description: "Watch tips & guidance",
      buttonText: "Subscribe",
      link: "https://youtube.com/@ooshasprep",
      contact: "",
      color: "#FF0000",
    },
  ];

  const title = connectData?.title || "Connect";
  const highlightText = connectData?.highlightText || "With Us";

  // Map icon strings to components
  const iconMap: { [key: string]: any } = {
    MessageCircle,
    Instagram,
    Facebook,
    Youtube,
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold my-6">
            {title} <span className="text-primary">{highlightText}</span>
          </h2>

          <div className="space-y-4">
            {socialItems.map((item: any, idx: number) => {
              const IconComponent = iconMap[item.icon] || MessageCircle;
              return (
                <div
                  key={idx}
                  className="bg-[#FFF8F5] border border-[#FFEDE4] p-6 flex items-center gap-5 hover:shadow-md transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="text-white" size={28} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-lg text-[#1a1a2e]">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                    {item.contact && (
                      <div className="text-sm font-medium text-gray-700 mt-0.5">
                        {item.contact}
                      </div>
                    )}
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-[#FF5E3A] hover:bg-[#e54a2a] text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                  >
                    {item.buttonText}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-8 lg:p-10 shadow-sm border border-gray-100">
          <h3 className="text-3xl font-bold text-[#1a1a2e] mb-8">
            {data?.sections?.["message-section"]?.fields?.title || "Send Us a Message"}
          </h3>
          <FormSection FORM_CONFIG={FORM_CONFIG} />
        </div>
      </div>
    </section>
  );
}

export default function ContactPage({ Data }: any) {
  const pageData = Data?.data;
  const heroData = pageData?.sections?.["hero-section"]?.fields;
  const officesData = pageData?.sections?.["offices-section"]?.fields;
  const mapData = pageData?.sections?.["map-section"]?.fields;
  const ctaData = pageData?.sections?.["cta-section"]?.fields;

  // Hero section data
  const heroTitle = heroData?.title || "We're Here to Help.";
  const heroSubtitle = heroData?.subtitle || "Let's Connect!";
  const heroDescription = heroData?.description || "Have questions about studying abroad, exams, applications or anything else? Our team is ready to assist you at every step of your journey.";
  const heroImage = heroData?.heroImage || "/contactshero.webp";
  
  // Contact cards from hero section
  const contactCards = heroData?.contactCards || [
    { title: "Call Us", icon: "Phone", value: "+91 9166146538", subtext: "Call Us" },
    { title: "Email Us", icon: "Mail", value: "info@ooshasprep.com", subtext: "Email Us" },
    { title: "Working Hours", icon: "Clock", value: "Mon - Sat 9:00 AM - 6:00 PM", subtext: "Working Hours" },
    { title: "Chat on WhatsApp", icon: "MessageCircle", value: "+91 9166146538", subtext: "Chat on Whatsapp" },
  ];

  // Offices data
  const officeItems = officesData?.officeItems || [
    {
      city: "Jaipur (Head Office)",
      address: "SCO 103-104, 2nd Floor, Sector 34A, Chandigarh",
      pin: "160022",
      phone: "+91 9166146538",
      image: "https://placehold.co/400x200/e2e8f0/475569?text=Office+Image",
      isHeadOffice: true,
    },
    {
      city: "Delhi",
      address: "SCO 8-9, 2nd Floor, Sector 17-G, Chandigarh",
      pin: "160017",
      phone: "+91 9166146538",
      image: "https://placehold.co/400x200/e2e8f0/475569?text=Office+Image",
      isHeadOffice: false,
    },
    {
      city: "Kolkata",
      address: "BMC Chowk, Near Bus Stand, Jalandhar, Punjab",
      pin: "144001",
      phone: "+91 9166146538",
      image: "https://placehold.co/400x200/e2e8f0/475569?text=Office+Image",
      isHeadOffice: false,
    },
    {
      city: "Bangalore",
      address: "SCO 12, 1st Floor, Ranjit Avenue, near Golden Temple, Amritsar",
      pin: "143001",
      phone: "+91 9166146538",
      image: "https://placehold.co/400x200/e2e8f0/475569?text=Office+Image",
      isHeadOffice: false,
    },
  ];

  // Map data
  const mapTitle = mapData?.title || "Find Us Across";
  const mapHighlightText = mapData?.highlightText || "India";
  const mapDescription = mapData?.description || "Visit our nearest office for personalized counseling and expert guidance on your study abroad journey.";
  const mapButtonText = mapData?.buttonText || "Get Directions";
  // <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  const mapEmbedUrl = mapData?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208472.84612209158!2d75.62574481854843!3d26.885421390638445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e1!3m2!1sen!2sin!4v1784547837337!5m2!1sen!2sin";

  // CTA data
  const ctaTitle = ctaData?.title || "Your Dream University";
  const ctaHighlightText = ctaData?.highlightText || "is Just a Conversation Away.";
  const ctaDescription = ctaData?.description || "Reach out to our experts today and take the first step towards your global education journey.";
  const ctaPrimaryButton = ctaData?.primaryButton || "Talk to an Expert";
  const ctaSecondaryButton = ctaData?.secondaryButton || "Book Free Counselling";
  const ctaImage = ctaData?.image || "/contact.webp";

  // Map icon strings to components for contact cards
  const contactIconMap: { [key: string]: any } = {
    Phone,
    Mail,
    Clock,
    MessageCircle,
  };

  return (
    <div className="min-h-screen text-gray-800">
      {/* ---------------- HERO SECTION ---------------- */}
      <div className="bg-[#fcf4ed]">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8">
            <div>
              <h1 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold mb-2">
                {heroTitle}
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
                {heroSubtitle}
              </h2>
              <p className="text-gray-600 mb-8">{heroDescription}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card: any, idx: number) => {
                const IconComponent = contactIconMap[card.icon] || Phone;
                return (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3"
                  >
                    <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{card.title}</p>
                      <p className="text-sm font-medium">{card.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-8 relative hidden md:block">
            <div className="h-full bg-transparent relative">
              <img
                src={heroImage}
                alt={heroTitle}
                className="object-contain w-full h-full"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- CONNECT WITH US ---------------- */}
      <ConnectSection data={pageData} />

      {/* ---------------- OUR OFFICES ---------------- */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          {officesData?.title || "Our Offices"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeItems.map((office: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <div className="h-32 bg-gray-200 relative">
                <img
                  src={office.image}
                  className="w-full h-full object-cover"
                  alt={office.city}
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-900 mb-1">
                  {office.city}
                  {office.isHeadOffice && (
                    <span className="ml-2 text-xs bg-[#FF5E3A] text-white px-2 py-0.5 rounded-full">
                      HQ
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#FF5E3A] font-medium">
                  <Phone size={12} /> {office.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ---------------- MAP & CTA ---------------- */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
          <div className="lg:w-2/3 h-64 lg:h-96 bg-gray-100 relative">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="lg:w-1/3 p-8 flex flex-col justify-center bg-white">
            <h3 className="text-2xl md:text-3xl font-bold  mb-2">
              {mapTitle}
            </h3>
            <h3 className="text-2xl font-bold text-primary mb-2">
              {mapHighlightText}
            </h3>
            <p className="text-sm  mb-6 leading-relaxed">
              {mapDescription}
            </p>
            <button className="self-start border border-[#FF5E3A] tfont-medium py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-[#FF5E3A] hover:text-white transition-colors">
              {mapButtonText} <MapPin size={16} />
            </button>
          </div>
        </div>
      </section> */}

      {/* ---------------- BOTTOM CTA (STUDENTS) ---------------- */}
      <section className="bg-[#FEF9F4] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 relative h-64 lg:h-80 w-full flex justify-center lg:justify-start">
            <img
              src={ctaImage}
              className="object-contain h-full w-auto"
              alt="Students"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0">
            <h3 className="text-3xl md:text-4xl font-bold  mb-2">
              {ctaTitle}
            </h3>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {ctaHighlightText}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-[#FF5E3A] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-[#e54a2a] transition-colors">
                {ctaPrimaryButton}
              </button>
              <button className="border border-[#FF5E3A] text-[#FF5E3A] font-medium py-3 px-8 rounded-lg hover:bg-[#FFF6F2] transition-colors">
                {ctaSecondaryButton}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}