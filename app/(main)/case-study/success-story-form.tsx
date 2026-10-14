"use client";

import { Mail, MessageSquare, Phone, Send, User, MapPin } from "lucide-react";
import FormSection from "@/components/formSection";

const FORM_CONFIG = {
  steps: [
    {
      step: 1,
      title: "Start your success story",
      icon: MessageSquare,
      fields: ["fullName", "email", "phone", "city", "interest"],
      button: "submit" as const,
    },
  ],
  fields: [
    { name: "fullName", label: "Your full name", type: "text", step: 1, grid: "half", required: true, icon: User },
    { name: "email", label: "Email address", type: "email", step: 1, grid: "half", required: true, icon: Mail },
    { name: "phone", label: "Phone number", type: "tel", step: 1, grid: "half", required: true, icon: Phone },
    { name: "city", label: "Your city", type: "text", step: 1, grid: "half", icon: MapPin },
    { name: "interest", label: "What would you like to achieve?", type: "text", step: 1, grid: "full", required: true, icon: MessageSquare },
  ],
  submit: {
    label: "Start my success story",
    icon: Send,
    size: "large" as const,
    position: "bottom" as const,
    onSuccess: { message: "Thank you. Our team will be in touch soon." },
  },
};

export default function SuccessStoryForm() {
  return (
    <section id="write-your-story" className="bg-[#292522] px-5 py-10 text-white sm:px-8 sm:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#FFB09D]">Your story starts here</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Ready to write your <span className="text-[#FF907F]">success story?</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Tell us what you’re working toward. Our team will help you find a preparation plan that fits your goal, timeline, and next chapter.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white/85">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F36D45] text-white"><MessageSquare size={19} /></span>
            A counsellor will get back to you shortly
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 text-[#292522] shadow-[0_24px_70px_rgba(0,0,0,.24)] sm:p-8 lg:p-9">
          <FormSection FORM_CONFIG={FORM_CONFIG} />
        </div>
      </div>
    </section>
  );
}
