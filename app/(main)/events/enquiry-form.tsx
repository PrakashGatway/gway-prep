"use client";

import { Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormSection from "@/components/formSection";

type EventCtaContent = {
  heading?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonUrl?: string;
};

const createConfig = (eventTitle?: string) => ({
  steps: [{ step: 1, title: "Ask about an event", icon: MessageSquare, fields: ["fullName", "email", "phone", "city", "interest"], button: "submit" as const }],
  fields: [
    { name: "fullName", label: "Your full name", type: "text", step: 1, grid: "half", required: true, icon: User },
    { name: "email", label: "Email address", type: "email", step: 1, grid: "half", required: true, icon: Mail },
    { name: "phone", label: "Phone number", type: "tel", step: 1, grid: "half", required: true, icon: Phone },
    { name: "city", label: "Your city", type: "text", step: 1, grid: "half", icon: MapPin },
    { name: "interest", label: "Which event or study goal interests you?", type: "text", step: 1, grid: "full", required: true, icon: MessageSquare, placeholder: eventTitle || "Tell us what you’d like to join" },
  ],
  submit: { label: "Send my enquiry", icon: Send, size: "large" as const, position: "bottom" as const, onSuccess: { message: "Thanks. Our events team will be in touch soon." } },
});

export default function EventEnquiryForm({
  eventTitle,
  cta,
}: {
  eventTitle?: string;
  cta?: EventCtaContent;
}) {
  const heading = cta?.heading || "Make room for your next breakthrough.";
  const description =
    cta?.description ||
    "Ask us about a session, get help choosing the right event, or talk through your study goals with our team.";
  const buttonText = cta?.buttonText || "Talk to our team";
  const buttonUrl = cta?.buttonUrl || "/contact";

  return <section id="event-enquiry" className="bg-[#292522] px-5 py-10 text-white sm:px-8 sm:py-12"><div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-12">
    <div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#FFB09D]">Join the next session</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{heading}</h2><p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{description}</p><Link href={buttonUrl} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#F36D45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#DD5D38]">{buttonText}</Link><div className="mt-7 flex items-center gap-3 text-sm font-semibold text-white/85"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F36D45]"><MessageSquare size={19} /></span>We’ll help you find the right session</div></div>
    <div className="rounded-[1.75rem] bg-white p-5 text-[#292522] shadow-[0_24px_70px_rgba(0,0,0,.24)] sm:p-8 lg:p-9"><FormSection FORM_CONFIG={createConfig(eventTitle)} /></div>
  </div></section>;
}
