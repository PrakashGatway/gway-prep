"use client";

import React from "react";
import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Target,
  Send,
  CheckCircle,
} from "lucide-react";
import FormSection from "../formSection";

interface StudentData {
  message: string;
  score: string;
  course: string;
  name: string;
  university: string;
}

// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "",
      icon: User,
      fields: [
        "name",
        "mobile",
        "email",
        "interest",
        "city",
        "message",
        "consent",
      ],
      button: "submit",
    },
  ],
  fields: [
    {
      name: "name",
      label: "",
      type: "text",
      required: true,
      placeholder: "Name *",
      step: 1,
      grid: "full",
      icon: User,
    },
    {
      name: "mobile",
      label: "",
      type: "tel",
      required: true,
      placeholder: "Mobile Number *",
      step: 1,
      grid: "full",
      icon: Phone,
      pattern: "^[0-9]{10}$",
    },
    {
      name: "email",
      label: "",
      type: "email",
      required: true,
      placeholder: "Email Id *",
      step: 1,
      grid: "full",
      icon: Mail,
    },
    {
      name: "city",
      label: "",
      type: "text",
      required: true,
      placeholder: "Enter your city ",
      step: 1,
      grid: "full",
      icon: User,
    },
    {
      name: "message",
      label: "",
      type: "textarea",
      required: true,
      placeholder: "Enter Message *",
      step: 1,
      grid: "full",
      icon: User,
    },
    // {
    //   name: "city",
    //   label: "Your City",
    //   type: "select",
    //   required: false,
    //   step: 1,
    //   grid: "full",
    //   options: [
    //     { value: "", label: "Your City" },
    //     { value: "mumbai", label: "Mumbai" },
    //     { value: "delhi", label: "Delhi" },
    //     { value: "bangalore", label: "Bangalore" },
    //     { value: "chennai", label: "Chennai" },
    //     { value: "hyderabad", label: "Hyderabad" },
    //     { value: "pune", label: "Pune" }
    //   ]
    // },
    // {
    //   name: "center",
    //   label: "Nearest Center",
    //   type: "select",
    //   required: false,
    //   step: 1,
    //   grid: "full",
    //   options: [
    //     { value: "", label: "Nearest Center" },
    //     { value: "andheri", label: "Andheri" },
    //     { value: "bandra", label: "Bandra" },
    //     { value: "dadar", label: "Dadar" },
    //     { value: "thane", label: "Thane" },
    //   ],
    // },
    {
      name: "consent",
      label: "Stay informed via SMS & WhatsApp",
      type: "checkbox",
      required: false,
      step: 1,
      grid: "full",
      defaultValue: true,
    },
  ],
  submit: {
    label: "Schedule a Call",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    onSuccess: {
      message: "Thank you! We'll contact you shortly.",
      redirect: "/thank-you",
    },
  },
};

interface GreFormProps {
  studentsData?: {
    data: StudentData[];
  };
}

const GreForm: React.FC<GreFormProps> = ({ studentsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!studentsData?.data?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % studentsData.data.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [studentsData]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <section className="h-full bg-white pt-16">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full bg-[#FDF8E9] p-3 md:p-4 lg:p-6">
            <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-4 lg:gap-6 items-start">
              {/* LEFT - Testimonial */}
              <div className="bg-white border border-[#F5ECD6] p-3 md:p-4 lg:p-5 h-[500px] md:h-[540px]  flex flex-col">
                <div className="flex-1 min-h-0">
                  <AnimatePresence mode="wait">
                    {studentsData?.data?.length > 0 && (
                      <motion.div
                        key={activeIndex}
                        className="h-full"
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
                            <div className="border-4 border-[#F7EED8] p-3 md:p-4 lg:p-5 h-full flex flex-col">
                              {/* Quote */}
                              <div className="text-[#F7C76A] text-2xl md:text-3xl lg:text-4xl leading-none">
                                “
                              </div>

                              {/* Scrollable Message */}
                              <div className="flex-1 overflow-y-auto pr-2 mt-2">
                                <p className="text-sm md:text-base lg:text-lg leading-[1.5] italic font-serif text-[#2C2C2C]">
                                  {ele.message ||
                                    "Data Insights was the section I ignored longest-turns out it was worth the most points."}
                                </p>
                              </div>

                              {/* Score */}
                              <div className="mt-4 flex items-center gap-2">
                                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#4A2B0F]">
                                  {ele.score}
                                </span>

                                <span className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] text-gray-600">
                                  {ele.course} TOTAL
                                </span>
                              </div>

                              {/* Student */}
                              <div className="mt-4 flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-[#FFF5D8] flex items-center justify-center font-bold text-[#7B5B00] text-sm md:text-base lg:text-lg">
                                  {ele.name
                                    ?.split(" ")
                                    ?.map((n: string) => n[0])
                                    ?.join("")}
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
                </div>

                {/* Bottom Stats - Fixed */}
                <div className="grid grid-cols-2 mt-4 border-t border-[#F5ECD6] flex-shrink-0">
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
              {/* <div className="bg-white border border-[#F5ECD6] p-3 md:p-4 lg:p-5">
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
              </div> */}

              <div className="bg-white border border-[#EFE7D4] p-3 md:p-4 lg:p-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold mb-3 md:mb-7">
                  Speak to an Expert
                </h2>

                <FormSection FORM_CONFIG={FORM_CONFIG} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreForm;
