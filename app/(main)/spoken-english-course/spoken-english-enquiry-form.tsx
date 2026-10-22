"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/app/lib/axios";

type Enquiry = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  learningGoal: string;
};

const initialEnquiry: Enquiry = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  learningGoal: "",
};

const inputClass = "min-h-12 w-full rounded-xl border border-[#ebdce0] bg-white px-4 text-sm text-[#25212a] outline-none transition focus:border-[#f33258] focus:ring-4 focus:ring-[#f33258]/10 placeholder:text-slate-400";

export default function SpokenEnglishEnquiryForm() {
  const router = useRouter();
  const [form, setForm] = useState<Enquiry>(initialEnquiry);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof Enquiry, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    if (form.phone.replace(/\D/g, "").length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await axiosInstance.post("/admin/formDetails", {
        path: window.location.href,
        data: { ...form, interest: "Spoken English coaching" },
      });

      if (response.data?.success !== true) {
        throw new Error(response.data?.message || "We couldn't send your enquiry. Please try again.");
      }

      toast.success(response.data?.message || "Thanks! Our team will contact you soon.");
      setForm(initialEnquiry);
      router.push("/thank-you");
    } catch (error: any) {
      setError(error?.response?.data?.message || error?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className="relative overflow-hidden  bg-[#FFF0F3] p-5 sm:p-7 lg:p-8" aria-labelledby="spoken-form-title">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ffdbe4]/50 blur-3xl" />
      <div className="relative">
        <h3 id="spoken-form-title" className="text-2xl font-bold leading-tight text-[#211d25] sm:text-[28px]">Speak English with confidence.</h3>
        <p className="mt-1 text-sm leading-6 text-[#6b6570]">Tell us a little about yourself. We’ll help you find the right Spoken English class and answer your questions.</p>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#302933]">
              Full name <span className="text-[#e5375c]">*</span>
              <span className="relative mt-1.5 block"><UserRound size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-[#ab929b]" /><input className={`${inputClass} pl-10`} type="text" name="fullName" autoComplete="name" placeholder="Your name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required /></span>
            </label>
            <label className="block text-sm font-semibold text-[#302933]">
              Phone number <span className="text-[#e5375c]">*</span>
              <span className="relative mt-1.5 block"><Phone size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-[#ab929b]" /><input className={`${inputClass} pl-10`} type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="10-digit number" value={form.phone} onChange={(e) => update("phone", e.target.value)} required /></span>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#302933]">
              Email address <span className="text-[#e5375c]">*</span>
              <span className="relative mt-1.5 block"><Mail size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-[#ab929b]" /><input className={`${inputClass} pl-10`} type="email" name="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required /></span>
            </label>
            <label className="block text-sm font-semibold text-[#302933]">
              City
              <span className="relative mt-1.5 block"><MapPin size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-[#ab929b]" /><input className={`${inputClass} pl-10`} type="text" name="city" autoComplete="address-level2" placeholder="Your city" value={form.city} onChange={(e) => update("city", e.target.value)} /></span>
            </label>
          </div>
          <label className="block text-sm font-semibold text-[#302933]">
            What would you like to improve?
            <select className={`${inputClass} mt-1.5`} name="learningGoal" value={form.learningGoal} onChange={(e) => update("learningGoal", e.target.value)}>
              <option className="font-semibold" value="">Select your goal</option>
              <option className="font-semibold" value="Everyday conversation">Everyday conversation</option>
              <option className="font-semibold" value="Workplace communication">Workplace communication</option>
              <option className="font-semibold" value="Interview confidence">Interview confidence</option>
              <option className="font-semibold" value="Fluency and pronunciation">Fluency and pronunciation</option>
              <option className="font-semibold" value="other">Other</option>
            </select>
          </label>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={submitting} className="flex mt-8 min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f33258] px-5 py-3 text-sm font-bold text-white shadow-[0_9px_20px_rgba(243,50,88,.22)] transition hover:bg-[#d9234b] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Sending your enquiry…" : "Find My Spoken English Class"} <ArrowRight size={17} />
          </button>
          <p className="text-center text-sm leading-5 text-[#7c747e]">Our team will contact you about Spoken English classes.</p>
        </form>
      </div>
    </aside>
  );
}
