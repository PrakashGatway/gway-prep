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
  Book,
  FileText,
  PenTool,
  TrendingUp,
  Briefcase,
  Calculator,
  CircleDotDashedIcon,
} from "lucide-react";

import FormSection from "./formSection";
import { ContactLink } from "./contact-link";

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
        { value : "", label : "Select the an option"},
        { value: "IELTS", label: "IELTS", icon: Book },
        { value: "TOEFL", label: "TOEFL", icon: FileText },
        { value: "PTE", label: "PTE", icon: PenTool },
        { value: "GRE", label: "GRE", icon: TrendingUp },
        { value: "GMAT", label: "GMAT", icon: Briefcase },
        { value: "SAT", label: "SAT", icon: Calculator },
        { value: "other", label :"Other", icon : CircleDotDashedIcon}
      
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
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6" >
      <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16"  id="form">
        <div>
          <h2 className="my-5 text-left text-xl font-bold sm:my-6 sm:text-2xl md:text-3xl" >
            {title} <span className="text-primary">{highlightText}</span>
          </h2>

          <div className="space-y-4">
            {socialItems.map((item: any, idx: number) => {
              const IconComponent = iconMap[item.icon] || MessageCircle;
              return (
                <div
                  key={idx}
                  className="flex min-w-0 flex-col items-stretch gap-4 border border-[#FFEDE4] bg-[#FFF8F5] p-4 transition-colors sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="text-white" size={28} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-[#17243A] sm:text-lg">
                      {item.name}
                    </div>
                    <div className="text-sm text-[#3E3E3E]">{item.description}</div>
                    {item.contact && (
                      <div className="mt-0.5 text-sm font-medium text-[#4B5563]">
                        <ContactLink value={item.contact} />
                      </div>
                    )}
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                      className="w-full whitespace-nowrap rounded-lg bg-[#F36C45] px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#E05A34] sm:w-auto sm:px-5"
                  >
                    {item.buttonText}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 border border-gray-100 bg-white p-4 sm:p-6 lg:p-10">
          <h3 className="mb-5 text-2xl font-bold text-[#17243A] sm:mb-8 sm:text-3xl">
            {data?.sections?.["message-section"]?.fields?.title || "Send Us a Message"}
          </h3>
          <FormSection FORM_CONFIG={FORM_CONFIG} shadowless />
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
    <div className="contact-page min-h-screen text-[#17243A] [&_button]:shadow-none [&_button:hover]:shadow-none [&_form_button]:rounded-lg">
      {/* ---------------- HERO SECTION ---------------- */}
      <div className="bg-[#fcf4ed]">
        <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 md:gap-10 lg:grid-cols-2 lg:gap-12 lg:px-0">
          <div className="min-w-0 space-y-6 sm:space-y-8">
            <div>
              <h1 className="mb-2 text-left text-3xl font-bold leading-tight tracking-tight text-[#17243A] sm:text-3xl lg:text-4xl">
                {heroTitle}
              </h1>
              <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
                {heroSubtitle}
              </h2>
              <p className="mb-6 text-sm leading-6 text-[#3E3E3E] sm:mb-8 sm:text-base sm:leading-7">{heroDescription}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {contactCards.map((card: any, idx: number) => {
                const IconComponent = contactIconMap[card.icon] || Phone;
                return (
                  <div
                    key={idx}
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:p-4"
                  >
                    <div className="bg-[#FEF9F4] p-2 rounded-full text-[#FF5E3A]">
                      <IconComponent size={20} />
                    </div>
                    <div className="min-w-0 break-words">
                      <p className="text-xs text-[#4B4542]">{card.title}</p>
                      <p className="break-words text-sm font-medium text-[#17243A]"><ContactLink value={card.value} /></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden min-w-0 p-4 md:block lg:p-8">
            <div className="h-full bg-transparent relative">
              <img
                src={heroImage}
                alt={heroData?.heroImageAlt || heroTitle}
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
                  alt={office.imageAlt || office.city}
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
      <section className="relative overflow-hidden bg-[#FEF9F4] py-10 sm:py-12 lg:py-16">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="relative flex h-48 w-full justify-center sm:h-56 md:h-64 lg:h-80 lg:w-1/2 lg:justify-start">
            <img
              src={ctaImage}
              className="h-full max-w-full object-contain"
              alt={ctaData?.ctaImageAlt || ctaData?.title || "Contact our counsellors"}
            />
          </div>
          <div className="mt-6 min-w-0 text-center lg:mt-0 lg:w-1/2 lg:text-left">
            <h3 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              {ctaTitle}
            </h3>
            <h3 className="mb-4 text-xl font-bold leading-tight text-primary sm:text-2xl md:text-3xl">
              {ctaHighlightText}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-[#3E3E3E] sm:text-base sm:leading-7 lg:mx-0">
              {ctaDescription}
            </p>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start">
              <a
                href="tel:+919166146538"
                className="w-full rounded-lg bg-[#F36C45] px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#E05A34] sm:w-auto sm:px-5">
                {ctaPrimaryButton}
              </a>
              <a href="#form" className="w-full rounded-lg bg-[#525252] px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#414141] sm:w-auto sm:px-5">
                {ctaSecondaryButton}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
