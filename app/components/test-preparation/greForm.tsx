"use client";

import React from "react";
import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StudentData {
  message: string;
  score: string;
  course: string;
  name: string;
  university: string;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  interest: string;
  city: string;
  center: string;
  consent: boolean;
}

const greForm = ({ studentsData }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    interest: "",
    city: "",
    center: "",
    consent: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (!studentsData?.data?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % studentsData.data.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [studentsData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (!formData.name || !formData.mobile || !formData.email) {
        throw new Error("Please fill in all required fields");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile.replace(/\s/g, ""))) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll contact you shortly.",
      });

      setFormData({
        name: "",
        mobile: "",
        email: "",
        interest: "",
        city: "",
        center: "",
        consent: true,
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <section className="h-full bg-white pt-16">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full bg-[#FDF8E9] p-3 md:p-4 lg:p-6">
            <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-4 lg:gap-6 items-start">
              {/* LEFT - Testimonial */}
              <div className="bg-white border border-[#F5ECD6] p-3 md:p-4 lg:p-5">
                <AnimatePresence mode="wait">
                  {studentsData?.data?.length > 0 && (
                    <motion.div
                      key={activeIndex}
                      initial={{
                        opacity: 0,
                        y: 80,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -80,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                    >
                      {(() => {
                        const ele = studentsData.data[activeIndex];

                        return (
                          <div className="border-4 border-[#F7EED8] p-3 md:p-4 lg:p-5">
                            <div className="text-[#F7C76A] text-2xl md:text-3xl lg:text-4xl leading-none">
                              “
                            </div>

                            <p className="mt-2 text-sm md:text-base lg:text-lg leading-[1.4] italic font-serif text-[#2C2C2C]">
                              {ele.message || "Data Insights was the section I ignored longest-turns out it was worth the most points."}
                            </p>

                            <div className="mt-3 md:mt-4 flex items-center gap-2">
                              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#4A2B0F]">
                                {ele.score}
                              </span>

                              <span className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] text-gray-600">
                                {ele.course} TOTAL
                              </span>
                            </div>

                            <div className="mt-3 md:mt-4 flex items-center gap-3">
                              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-[#FFF5D8] flex items-center justify-center font-bold text-[#7B5B00] text-sm md:text-base lg:text-lg">
                                {ele.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </div>

                              <div>
                                <h4 className="font-semibold text-sm md:text-base lg:text-lg">
                                  {ele.name}
                                </h4>

                                <p className="text-gray-500 text-xs md:text-sm">
                                  {ele.university}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 mt-3 md:mt-4 border-t border-[#F5ECD6]">
                  <div className="py-3 md:py-4 text-center border-r border-[#F5ECD6]">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-[#6A4700]">
                      +68
                    </h3>
                    <p className="mt-0.5 text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gray-500">
                      Avg. Score Gain
                    </p>
                  </div>

                  <div className="py-3 md:py-4 text-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl text-[#6A4700]">
                      3,100+
                    </h3>
                    <p className="mt-0.5 text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gray-500">
                      MBA Candidates Coached
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT - Form */}
              <div className="bg-white border border-[#EFE7D4] p-3 md:p-4 lg:p-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold mb-3 md:mb-4">
                  Speak to an Expert
                </h2>

                {submitStatus.type === "success" && (
                  <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded-md text-green-700 text-center text-xs">
                    {submitStatus.message}
                  </div>
                )}

                {submitStatus.type === "error" && (
                  <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-center text-xs">
                    {submitStatus.message}
                  </div>
                )}

                <form className="space-y-2" onSubmit={handleSubmit}>
                  <input
                    className="w-full h-9 md:h-10 lg:h-11 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F86C43] focus:border-transparent text-sm"
                    placeholder="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="flex">
                    <div className="w-16 md:w-20 lg:w-24 border border-gray-200 rounded-l-md flex items-center justify-center bg-white text-xs">
                      🇮🇳 +91
                    </div>

                    <input
                      className="flex-1 h-9 md:h-10 lg:h-11 border border-l-0 border-gray-200 rounded-r-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F86C43] focus:border-transparent text-sm"
                      placeholder="Mobile Number *"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={10}
                      required
                    />
                  </div>

                  <input
                    className="w-full h-9 md:h-10 lg:h-11 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F86C43] focus:border-transparent text-sm"
                    placeholder="Email Id *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <select
                    className="w-full h-9 md:h-10 lg:h-11 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F86C43] focus:border-transparent text-sm"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                  >
                    <option value="">Interested in?</option>
                    <option value="gre">GRE</option>
                    <option value="gmat">GMAT</option>
                    <option value="toefl">TOEFL</option>
                    <option value="ielts">IELTS</option>
                    <option value="sat">SAT</option>
                  </select>

                  <select
                    className="w-full h-9 md:h-10 lg:h-11 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F86C43] focus:border-transparent text-sm"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Your City</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="pune">Pune</option>
                  </select>

                  <select
                    className="w-full h-9 md:h-10 lg:h-11 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F86C43] focus:border-transparent text-sm"
                    name="center"
                    value={formData.center}
                    onChange={handleInputChange}
                  >
                    <option value="">Nearest Center</option>
                    <option value="andheri">Andheri</option>
                    <option value="bandra">Bandra</option>
                    <option value="dadar">Dadar</option>
                    <option value="thane">Thane</option>
                  </select>

                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="accent-[#F86C43] w-3 h-3"
                    />
                    Stay informed via SMS & WhatsApp
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-9 md:h-10 lg:h-11 rounded-xl bg-[#F86C43] text-white font-semibold text-sm hover:bg-[#ef5a2f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Schedule a Call"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default greForm;