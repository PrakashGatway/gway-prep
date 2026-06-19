"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  profile: string;
  source: string;
  exam: string;
  purpose: string;
  targetScore: string;
  examDate: string;
  attempts: string;
  englishLevel: string;
  weakAreas: string[];
  batchType: string;
  startTimeline: string;
  notes: string;
};

/* ------------------------------------------------------------------ */
/* Main Form Component                                                 */
/* ------------------------------------------------------------------ */
export function RegistrationSection({ data }: any) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    profile: "",
    source: "",
    exam: "",
    purpose: "",
    targetScore: "",
    examDate: "",
    attempts: "",
    englishLevel: "",
    weakAreas: [],
    batchType: "",
    startTimeline: "",
    notes: "",
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleWeakArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      weakAreas: prev.weakAreas.includes(area)
        ? prev.weakAreas.filter((a) => a !== area)
        : [...prev.weakAreas, area],
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const jsonData = JSON.stringify(formData, null, 2);
    console.log("Form JSON:", jsonData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
  };

  const restart = () => {
    setStep(1);
    setSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      age: "",
      profile: "",
      source: "",
      exam: "",
      purpose: "",
      targetScore: "",
      examDate: "",
      attempts: "",
      englishLevel: "",
      weakAreas: [],
      batchType: "",
      startTimeline: "",
      notes: "",
    });
  };

  const steps = [
    { num: 1, label: "Personal", icon: "👤" },
    { num: 2, label: "Exam", icon: "📝" },
    { num: 3, label: "Level", icon: "📊" },
    { num: 4, label: "Review", icon: "✅" },
  ];

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Our counsellor will contact you within 24 hours.
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {["📞", "✉️", "💬"].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-2xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <button
            onClick={restart}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            Submit Another Enquiry
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-8 sm:gap-10 lg:gap-12">
        {/* Left Side - Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 " />
            <img
              src={data?.fields?.Formsection ?? "/home/1.png"}
              alt="Registration"
              // height={850}
              className="relative "
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">98% Success Rate</p>
                  <p className="text-xs text-gray-600">In First Attempt</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">4.9 Rating</p>
                  <p className="text-xs text-gray-600">By 10,000+ Students</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="max-w-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                Limited Seats Available
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Let Our Team Reach Out To You
              </h1>
              <p className="text-gray-600 text-lg">
                Start your journey to success today
              </p>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              {/* <div className="flex items-center justify-between mb-8">
                {steps.map((s, i) => (
                  <div key={s.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={s.num === step ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          s.num < step
                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                            : s.num === step
                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white ring-4 ring-teal-100 shadow-xl scale-110"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {s.num < step ? "✓" : s.icon}
                      </motion.div>
                      <span
                        className={`text-xs mt-2 font-semibold transition-colors duration-300 ${
                          s.num === step ? "text-teal-700" : "text-gray-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${
                          s.num < step ? "bg-gradient-to-r from-teal-600 to-emerald-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div> */}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">👤</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={(e) => updateField("firstName", e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                                placeholder="Priya"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) => updateField("lastName", e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                                placeholder="Mehta"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                              placeholder="priya@email.com"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                              placeholder="+91 98765 43210"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => updateField("city", e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                                placeholder="Jaipur"
                              />
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏙️</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => updateField("age", e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                                placeholder="24"
                              />
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🎂</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Current Profile
                          </label>
                          <select
                            value={formData.profile}
                            onChange={(e) => updateField("profile", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          >
                            <option value="">Select your profile</option>
                            <option>📚 School student</option>
                            <option>🎓 Undergraduate student</option>
                            <option>💼 Recent graduate</option>
                            <option>👔 Working professional</option>
                            <option>🏠 Homemaker</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How did you hear about us?
                          </label>
                          <select
                            value={formData.source}
                            onChange={(e) => updateField("source", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          >
                            <option value="">Select source</option>
                            <option>🔍 Google Search</option>
                            <option>📸 Instagram</option>
                            <option>👍 Facebook</option>
                            <option>▶️ YouTube</option>
                            <option>🤝 Friend Referral</option>
                            <option>🏫 Education Fair</option>
                            <option>🚶 Walk-in</option>
                            <option>📌 Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Exam Details */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">📝</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Exam Details</h3>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Target Exam <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { name: "IELTS", icon: "📗" },
                              { name: "TOEFL", icon: "📘" },
                              { name: "PTE", icon: "📙" },
                              { name: "GRE", icon: "🧠" },
                              { name: "GMAT", icon: "💼" },
                              { name: "SAT", icon: "📐" },
                            ].map((exam) => (
                              <motion.button
                                key={exam.name}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateField("exam", formData.exam === exam.name ? "" : exam.name)}
                                className={`p-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                                  formData.exam === exam.name
                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-lg"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-400 hover:shadow-md"
                                }`}
                              >
                                <span className="text-xl mb-1 block">{exam.icon}</span>
                                {exam.name}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Purpose
                          </label>
                          <select
                            value={formData.purpose}
                            onChange={(e) => updateField("purpose", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          >
                            <option value="">Select purpose</option>
                            <option>✈️ Study Abroad</option>
                            <option>💼 Job / PR Visa</option>
                            <option>🎓 MBA Admission</option>
                            <option>🗣️ English Proficiency</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Target Score
                          </label>
                          <input
                            type="text"
                            value={formData.targetScore}
                            onChange={(e) => updateField("targetScore", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                            placeholder="e.g. IELTS 7.5, GRE 320"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Exam Date
                          </label>
                          <input
                            type="date"
                            value={formData.examDate}
                            onChange={(e) => updateField("examDate", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Previous Attempts
                          </label>
                          <select
                            value={formData.attempts}
                            onChange={(e) => updateField("attempts", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          >
                            <option value="">Select attempts</option>
                            <option>1️⃣ First attempt</option>
                            <option>2️⃣ Second attempt</option>
                            <option>3️⃣ Third attempt or more</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Current Level */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">📊</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Current Level & Preferences
                          </h3>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            English Level
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { level: "Beginner", icon: "🌱", desc: "Just starting" },
                              { level: "Intermediate", icon: "📈", desc: "Can communicate" },
                              { level: "Upper-Intermediate", icon: "⭐", desc: "Good command" },
                              { level: "Advanced", icon: "🏆", desc: "Fluent speaker" },
                            ].map((item) => (
                              <motion.button
                                key={item.level}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                  updateField(
                                    "englishLevel",
                                    formData.englishLevel === item.level ? "" : item.level
                                  )
                                }
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  formData.englishLevel === item.level
                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-lg"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-400 hover:shadow-md"
                                }`}
                              >
                                <span className="text-2xl mb-1 block">{item.icon}</span>
                                <span className="font-semibold text-sm">{item.level}</span>
                                <p className="text-xs mt-1 opacity-80">{item.desc}</p>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Weak Areas <span className="text-gray-400 text-xs">(select all that apply)</span>
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { area: "Reading", icon: "📖" },
                              { area: "Writing", icon: "✍️" },
                              { area: "Listening", icon: "👂" },
                              { area: "Speaking", icon: "🗣️" },
                              { area: "Verbal", icon: "🔤" },
                              { area: "Quant/Math", icon: "🔢" },
                            ].map((item) => (
                              <motion.button
                                key={item.area}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleWeakArea(item.area)}
                                className={`p-3 rounded-xl border-2 font-medium text-sm transition-all ${
                                  formData.weakAreas.includes(item.area)
                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-lg"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-400 hover:shadow-md"
                                }`}
                              >
                                <span className="mr-2">{item.icon}</span>
                                {item.area}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Batch
                          </label>
                          <select
                            value={formData.batchType}
                            onChange={(e) => updateField("batchType", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          >
                            <option value="">Select batch type</option>
                            <option>🌅 Weekday Morning</option>
                            <option>🌆 Weekday Evening</option>
                            <option>📅 Weekend</option>
                            <option>💻 Online</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Start Timeline
                          </label>
                          <select
                            value={formData.startTimeline}
                            onChange={(e) => updateField("startTimeline", e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white"
                          >
                            <option value="">Select timeline</option>
                            <option>⚡ Immediately (within 1 week)</option>
                            <option>📅 Within 2-4 weeks</option>
                            <option>🗓️ Within 1-2 months</option>
                            <option>🔍 Just exploring</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Notes
                          </label>
                          <textarea
                            value={formData.notes}
                            onChange={(e) => updateField("notes", e.target.value)}
                            rows={4}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all bg-gray-50 hover:bg-white resize-none"
                            placeholder="Any specific requirements or questions..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">✅</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Review Your Details</h3>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Full Name</p>
                              <p className="font-semibold text-gray-900">
                                {formData.firstName} {formData.lastName}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Email</p>
                              <p className="font-semibold text-gray-900">{formData.email}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Phone</p>
                              <p className="font-semibold text-gray-900">{formData.phone}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Target Exam</p>
                              <p className="font-semibold text-gray-900">{formData.exam || "—"}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">English Level</p>
                              <p className="font-semibold text-gray-900">{formData.englishLevel || "—"}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Batch Preference</p>
                              <p className="font-semibold text-gray-900">{formData.batchType || "—"}</p>
                            </div>
                          </div>
                          {formData.weakAreas.length > 0 && (
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-500 mb-2">Weak Areas</p>
                              <div className="flex flex-wrap gap-2">
                                {formData.weakAreas.map((area) => (
                                  <span
                                    key={area}
                                    className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold"
                                  >
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🔒</span>
                            <p className="text-sm text-teal-800">
                              Your information is secure and will only be used to contact you about our
                              test preparation programs.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {step > 1 ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      ← Back
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Continue →
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Enquiry 🚀"
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




// "use client"

// import Image from "next/image"
// import { useEffect, useState } from "react"

// const images = [
//   "https://t3.ftcdn.net/jpg/06/23/84/22/360_F_623842281_ECGgEpMEkQdH83gbmexIn5l3ACl7V3M0.jpg",
//   "https://img.freepik.com/premium-photo/young-handsome-man-pointing-camera-choosing-you-university-student-concept_1194-262936.jpg",
//   "https://as2.ftcdn.net/jpg/05/29/12/57/1000_F_529125762_omW1yTehDLLFJKwLJjRET0G3sXiQnK5g.jpg",
// ]

// const formdata = [
//   {
//     type: 'text',
//     placeholder: 'First Name' 
//   },
//   {
//     type: 'text',
//     placeholder: 'Last Name' 
//   },
//   {
//     type: 'email',
//     placeholder: 'Email Id'
//   },
//   {
//     type: 'tel',
//     placeholder: 'Mobile Number'
//   },
//   {
//     type: 'option',
//     placeholder:'Preferred Destination',
//     options: ['USA', 'UK', 'Canada', 'Australia', 'Germany']
//   },

//   {
//     type: 'text',
//     placeholder: 'Course' 
//   },
//   {
//     type: 'month',
//     placeholder:'When do you plan to study'
//   },

//   {
//     type: 'year',
//     placeholder:'Your Preferred Year'
//   }
// ]

// export function RegistrationSection({data}:{data : any}) {

//   const [index, setIndex] = useState(0)

//   // AUTO SLIDE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length)
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])


//   return (
//     <section className="py-8 sm:py-10 lg:py-12 bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
//   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
    
//     <div>
//         <img src={data.fields.img ?? "/home/1.png"} alt="img"  />
//     </div>

//     <div className=" w-full">
//       <div className=" rounded-2xl sm:rounded-3xl text-black lg:rounded-[32px] p-6 sm:p-7 lg:p-8  
//       ">
//         <h3 className=" font-bold  text-xl sm:text-2xl mb-10 uppercase">
//           Let Our Team Reach Out To You
//         </h3>

//         <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         
//           {formdata.map((ele, index) => (
//              <div key={index} className="col-span-1">
//               <label htmlFor={ele.placeholder} className="text-gray-600 my-2 px-1">{ele.placeholder}</label>
//               {ele.type === 'option' ? (
//                 <select className="w-full border-gray-300 border-2 rounded-lg px-3 py-2 ">
//                   <option value="" disabled hidden>{ele.placeholder}</option>
//                   {ele?.options?.map((option, idx) => (<option key={idx} value={option}>{option}</option>))}
//                 </select>
//               ):
//               (
//                 <input type={ele.type} placeholder={ele.placeholder} className="w-full border-gray-300 rounded-lg px-3 py-2 border-2" /> 
//               )
//               }
//               </div>
//           ))}
        
//           <button
//             type="submit"
//             className="w-full bg-[#F36C45] text-white mt-4 font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl tracking-widest 
//             hover:opacity-90 transition text-sm sm:text-base"
//           >
//             SUBMIT
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
//   )
// }







