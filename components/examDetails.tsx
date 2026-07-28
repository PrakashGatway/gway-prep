"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  CircleHelp,
  CheckCircle2,
  FileText,
  Menu,
  X,
  Send,
  MapPin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import FormSection from "./formSection";
import EditorContent from "./editorContent";

const ExamDetails = ({ pagedata }: any) => {
  const basicInfo = pagedata?.sections?.["basic-info"]?.fields;
  const examData =
    pagedata?.sections?.["exam-data"]?.fields?.exam_details || [];

  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toc = useMemo(() => {
    return examData.map((item: any, index: number) => ({
      id: `section-${index}`,
      title:
        // item.question || item.faq?.length
        //   ? "Frequently Asked Questions"
        //   :
           item.content_heading || `Section ${index + 1}`,
    }));
  }, [examData]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "";
      const scrollPosition = window.scrollY + 100;

      // Check each section
      toc.forEach((item) => {
        const element = sectionRefs.current[item.id];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentActive = item.id;
          }
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* ── HEADER CARD ─────────────────────────────────────────────────── */}
        <div className="relative max-w-[100vw] overflow-hidden mx-auto h-[30rem] px-2 sm:px-10 py-10 flex items-center justify-center">
          <div
            className="absolute bg-primary w-full h-[35rem] left-0 -top-[100px]"
            style={{
              borderRadius: "0 0 50% 50%/0 0 100% 100%",
              transform: "scaleX(2.4)",
            }}
          ></div>

          <div className="flex md:flex-col lg:flex-row bg-white rounded overflow-hidden w-full h-[100%] z-50 mt-20">
            <div className="p-6 flex items-start gap-4 flex-col w-full lg:w-1/3">
             
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {basicInfo?.title}
                </h1>
                {basicInfo?.subtitle && (
                //   <p className="text-gray-600 mt-2">{basicInfo.subtitle}</p>
                <div
                    className="text-gray-600 mt-2 text-justify"
                    dangerouslySetInnerHTML={{
                    __html: basicInfo.subtitle,
                    }}
                />
                )}
              </div>
            </div>
            <div className="hedding lg:block lg:w-fit p-2">
                
             <img
                src={basicInfo?.Image || "https://res.cloudinary.com/drsainihk/image/upload/v1784546671/cway-admin/rx2e0kmbnawefickyvqr.webp"}
                alt={`${basicInfo?.title} logo`}
                className="h-full w-full object-contain bg-white rounded-xl"
              />
            </div>

          </div>
        </div>

        {/* ── SUB-NAVIGATION BAR ──────────────────────────────────────── */}
        <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center justify-between py-3">
              <span className="font-semibold text-sm">Table of Contents</span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 py-3 overflow-x-auto">
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`whitespace-nowrap text-sm font-medium transition-colors relative pb-1 ${
                    activeSection === item.id
                      ? "text-[#F26E46] border-b-2 border-[#F26E46]"
                      : "text-gray-600 hover:text-[#F26E46]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden py-4 border-t">
                <ul className="space-y-3">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          activeSection === item.id
                            ? "bg-[#F26E46] text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Main */}
            <div className="space-y-0">
              {examData.map((section: any, index: number) => (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[`section-${index}`] = el;
                  }}
                  id={`section-${index}`}
                  className="bg-white p-8 scroll-mt-20"
                >
                  {/* Section Title */}
                  {section.content_heading && (
                    <h2 className="text-2xl font-bold text-[#00306a] mb-6">
                      {section.content_heading}
                    </h2>
                  )}

                 

                  {section.content_data && (
                    <EditorContent content_data={section.content_data}/>
           
                  )}

                  {section.faq?.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold mb-6 text-[#183153]">
                        Frequently Asked Questions
                      </h2>

                      {section.faq.map((faq: any, i: number) => (
                        <FAQItem
                          key={i}
                          question={faq.question}
                          answer={faq.answer}
                        />
                      ))}
                    </div>
                  )}

                  {section.question && <QuizCard section={section} />}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-24 h-fit">
              
              <LeadForm />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExamDetails;

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl mb-3 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 text-gray-600 border-t pt-4">{answer}</div>
      )}
    </div>
  );
}

function QuizCard({ section }: any) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (answer) {
      setSubmitted(true);
    }
  };

  return (
    <div className="mt-8 bg-[#FFF8F5] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <CircleHelp className="text-[#F26E46]" />
        <h3 className="font-bold text-xl">Quick Question</h3>
      </div>

      <p className="font-medium mb-5">{section.question}</p>

      <div className="space-y-4">
        {section.options.map((option: any, i: number) => {
          if (option.type === "radio") {
            return (
              <label
                key={i}
                className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${
                  answer === option.value
                    ? "border-[#F26E46] bg-[#FFF0EA]"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={section.question}
                  value={option.value}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setSubmitted(false);
                  }}
                  className="accent-[#F26E46]"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            );
          }

          return (
            <input
              key={i}
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#F26E46] focus:border-transparent"
              placeholder={option.label}
              onChange={(e) => {
                setAnswer(e.target.value);
                setSubmitted(false);
              }}
            />
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-[#F26E46] text-white px-6 py-3 rounded-xl hover:bg-[#E05D35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!answer}
      >
        Submit Answer
      </button>

      {submitted && answer && (
        <div className="flex items-center gap-2 mt-5 text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle2 size={18} />
          <span>Your answer: {answer}</span>
        </div>
      )}
    </div>
  );
}






// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "",
      icon: User,
      fields: ["name", "mobile", "email", "interest", "city", "consent"],
      button: "submit",
    },
  ],
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Name",
      step: 1,
      grid: "full",
      icon: User,
    },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "tel",
      required: true,
      placeholder: "Mobile Number",
      step: 1,
      grid: "full",
      icon: Phone,
      pattern: "^[0-9]{10}$",
      countryCode: "+91",
    },
    {
      name: "email",
      label: "Email Id",
      type: "email",
      required: true,
      placeholder: "Email Id",
      step: 1,
      grid: "full",
      icon: Mail,
    },
    {
      name: "interest",
      label: "Interested in?",
      type: "select",
      required: true,
      step: 1,
      grid: "full",
      options: [
        { value: "", label: "Interested in?" },
        { value: "GRE", label: "GRE" },
        { value: "IELTS", label: "IELTS" },
        { value: "GMAT", label: "GMAT" },
        { value: "TOEFL", label: "TOEFL" },
        { value: "PET", label: "PET" },
        { value: "SAT", label: "SAT" }
      ],
    },
    {
      name: "city",
      label: "City Name",
      type: "text",
      required: false,
      placeholder: "City Name",
      step: 1,
      grid: "full",
      icon: MapPin,
    },
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
      message: "Thank you! We will contact you shortly.",
      redirect: "/thank-you",
    },
  },
};

const LeadForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
      <h3 className="text-center text-lg md:text-xl font-semibold mb-6 text-neutral-900">
        Speak to an Expert
      </h3>
      <FormSection FORM_CONFIG={FORM_CONFIG} />
    </div>
  );
};


