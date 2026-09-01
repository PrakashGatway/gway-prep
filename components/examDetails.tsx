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
  CircleX,
  ChevronLeft,
  ChevronRight,
  BarChart,
  PieChart,
  LucideChevronLeftSquare,
  LucideChevronRight,
} from "lucide-react";
import FormSection from "./formSection";
import EditorContent from "./editorContent";
import PopupModal from "./popupModel";
import axiosInstance from "@/app/lib/axios";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import QuestionsSection from "./comment";

const ExamDetails = ({ pagedata }: any) => {
  // console.log(pagedata,"page data")
  const basicInfo = pagedata?.sections?.["basic-info"]?.fields;
  const examData = pagedata?.sections?.["exam-data"]?.fields?.exam_details || [];
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const Router = useRouter();

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
      const offset = 120;
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
    <main className="relative flex flex-col">
      <div className="relative w-full overflow-hidden bg-primary/40 px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-[1500px] bg-white px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
          {/* Top Hero Content */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Image */}
            <div className="w-full lg:w-[52%]">
              <div className="overflow-hidden ">
                <img
                  src={
                    basicInfo?.image ||
                    "https://res.cloudinary.com/drsainihk/image/upload/v1784546671/cway-admin/rx2e0kmbnawefickyvqr.webp"
                  }
                  alt={`${basicInfo?.title || "Hero"} image`}
                  className="w-full h-[220px] sm:h-[300px] lg:h-[285px] object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-[48%] flex flex-col items-start">
              <h1 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold md:leading:7 text-primary lg:leading-14">
                {basicInfo.title?.split("||")[0]}
                <span className="text-black">
                  {basicInfo.title?.split("||")[1]}
                </span>
                {basicInfo.title?.split("||")[2]}
              </h1>

              <button
                type="button"
                onClick={() => Router.push(basicInfo?.url || `/auth`)}
                className="mt-6 inline-flex items-center justify-center bg-primary px-7 py-2 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
              >
                {/* Explore Now */}
                {basicInfo?.buttonText || "Explore Now"}
              </button>
            </div>
          </div>

          {basicInfo?.subtitle && (
            <div className="mt-8 max-w-7xl">
              <div className="text-base sm:text-lg leading-7 text-slate-700">
                <EditorContent content_data={basicInfo.subtitle} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky top-20 z-40 bg-white border-b shadow-sm">
        <div className=" mx-auto px-4">
          {/* Mobile Toggle */}
          {/* <div className="lg:hidden flex items-center justify-between py-3">
              <span className="font-semibold text-sm">Table of Contents</span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div> */}

          <div
            className=" flex items-center gap-6 py-1 whitespace-nowrap overflow-auto"
            style={{
              scrollbarWidth: "none",
            }}
          >
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`whitespace-nowrap text-sm font-medium transition-colors relative py-2 ${
                  activeSection === item.id
                    ? "text-[#F26E46] border-b-2 border-[#F26E46]"
                    : "text-gray-600 hover:text-[#F26E46]"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* {isMobileMenuOpen && (
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
            )} */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 overflow">
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
                className="bg-white lg:p-6 scroll-mt-20"
              >
                {/* Section Title */}
                {section?.content_heading && (
                  <h2 className="text-2xl font-bold text-[#00306a] mb-6">
                    {section.content_heading}
                  </h2>
                )}

                {section.content_data && (
                  <EditorContent content_data={section.content_data} />
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

                {section &&
                  Array.isArray(section?.Banner) &&
                  section.Banner.length > 0 && (
                    <Banner
                      finalCtaSection={section.Banner[0]}
                      Image={section.Image}
                    />
                  )}

                {section.question && (
                  <QuizCard section={section} pagedata={pagedata} />
                )}
              </div>
            ))}

        <QuestionsSection page={'ExamDetails'}  css={'bg-[#fafafa] py-6 my-6'}/>

          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-38 h-fit">
            <LeadForm />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ExamDetails;

function FAQItem({ question, answer }: { question: string; answer: string }) {
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

function Banner({ finalCtaSection, Image }: any) {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden flex items-center py-6 mt-8 ">
      {/* Main Orange Banner Container */}
      <div
        className=" w-full mx-auto bg-[#FF6A13] rounded-[24px] overflow-hidden 
      flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 min-h-[160px]"
      >
        {/* Left Side: Animated Character Image */}
        {Image && (
          <motion.div
            initial={{ x: "-150%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              duration: 1,
            }}
            className="flex-shrink-0 z-10 w-[180px] md:w-[220px] md:absolute md:left-8 md:bottom-0"
          >
            <img
              src={Image || "/footer.png"}
              alt="Student reading on beanbag"
              className="w-full h-auto object-contain block"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`flex flex-col md:flex-row items-center justify-between w-full ${Image && "md:pl-[240px]"} gap-6 text-center md:text-left`}
        >
          {/* Text Content */}
          <div className="text-white max-w-xl">
            <h6 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
              {finalCtaSection?.title || "Ready to Achieve Your Dreams?"}
            </h6>
            <p className="text-sm md:text-base opacity-90 font-medium">
              {finalCtaSection?.subtitle ||
                "Join thousands of successful students and start your journey today."}
            </p>
          </div>

          {/* Call to Action Button */}
          {finalCtaSection?.buttontext && (
            <button
              onClick={() =>
                router.push(
                  finalCtaSection?.url ? finalCtaSection?.url : "/auth",
                )
              }
              className="flex-shrink-0 flex items-center gap-2 bg-white text-[#FF6A13] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap"
            >
              {finalCtaSection?.buttontext || "Enroll Now"}
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9"
                />
              </svg>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}


// function QuizCard({ section ,pagedata}: any) {
//   const [answer, setAnswer] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [apiResponse, setApiResponse] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const slug = pagedata?.seoMeta;

//   console.log(slug,"section")
//   useEffect(() => {
//     if (isPopupOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isPopupOpen]);

//   const handleSubmit = async () => {
//     // No option selected
//     if (!selectedOption) {
//       setIsPopupOpen(true);
//       return;
//     }

//     // Find the correct answer from API
//     const correctAnswer = section.options.find(
//       (option: any) => option.value !== ""
//     )?.value;

//     if (!correctAnswer || correctAnswer === undefined) {
//       setIsPopupOpen(true);
//       return;
//     }

//     setIsLoading(true);
//     setApiResponse(null);

//     try {
//       const response = await axiosInstance.post('/admin/questionAnalytics', {
//         pageSlug: slug?.canonicalUrl,
//         sectionKey: "exam-data",
//         question: section.question,
//         option: selectedOption,
//       });

//       // Store API response
//       setApiResponse({
//         data: response.data,
//         status: response.status,
//         message: response.data?.message || "Successfully submitted your answer!"
//       });

//       // Determine if answer is correct based on API response or local check
//       const isAnswerCorrect = response.data?.isCorrect !== undefined
//         ? response.data.isCorrect
//         : selectedOption === correctAnswer;

//       setIsCorrect(isAnswerCorrect);
//       setAnswer(correctAnswer);
//       setSubmitted(true);

//     } catch (error: any) {
//       console.error("Failed to submit question analytics", error);

//       // Handle error response
//       setApiResponse({
//         error: true,
//         message: error.response?.data?.message || "Failed to submit. Please try again.",
//         status: error.response?.status || 500,
//         data: error.response?.data
//       });

//       // Still show the correct answer locally even if API fails
//       const isAnswerCorrect = selectedOption === correctAnswer;
//       setIsCorrect(isAnswerCorrect);
//       setAnswer(correctAnswer);
//       setSubmitted(true);

//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//   };

//   const handleRetry = () => {
//     setSubmitted(false);
//     setSelectedOption("");
//     setApiResponse(null);
//     setIsLoading(false);
//   };

//   return (
//     <>
//       <div className="mt-8 bg-[#FFF8F5] rounded-2xl p-6">
//         <PopupModal
//           isPopupOpen={isPopupOpen}
//           setIsPopupOpen={setIsPopupOpen}
//           onClose={handlePopupClose}
//         />

//         <div className="flex items-center gap-2 mb-4">
//           <CircleHelp className="text-[#F26E46]" />
//           <h3 className="font-bold text-xl">Quick Question</h3>
//         </div>

//         <p className="font-medium mb-5">{section.question}</p>

//         <div className="space-y-4">
//           {section.options.map((option: any, i: number) => {
//             if (option.type === "radio") {
//               return (
//                 <label
//                   key={i}
//                   className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors
//                     border-[#F26E46] bg-[#FFF0EA]
//                     ${submitted ? 'opacity-60 cursor-not-allowed' : ''}
//                   `}
//                 >
//                   <input
//                     type="radio"
//                     name={section.question}
//                     value={option.label}
//                     checked={selectedOption === option.label}
//                     onChange={(e) => {
//                       setSelectedOption(e.target.value);
//                       setSubmitted(false);
//                       setApiResponse(null);
//                     }}
//                     className="accent-[#F26E46]"
//                     disabled={submitted || isLoading}
//                   />
//                   <span className="text-sm">{option.label}</span>
//                 </label>
//               );
//             }

//             return (
//               <input
//                 key={i}
//                 className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#F26E46] focus:border-transparent"
//                 placeholder={option.label}
//                 onChange={(e) => {
//                   setAnswer(e.target.value);
//                   setSubmitted(false);
//                   setApiResponse(null);
//                 }}
//                 disabled={submitted || isLoading}
//               />
//             );
//           })}
//         </div>

//         {/* Progress Bar */}
//         {isLoading && (
//           <div className="mt-6">
//             <div className="flex items-center gap-3">
//               <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-[#F26E46] rounded-full animate-pulse"
//                      style={{ width: '100%' }} />
//               </div>
//               <span className="text-sm text-gray-600 whitespace-nowrap">
//                 Submitting...
//               </span>
//             </div>
//           </div>
//         )}

//         <button
//           onClick={handleSubmit}
//           disabled={isLoading || submitted}
//           className={`mt-6 bg-[#F26E46] text-white px-6 py-3 rounded-xl transition-colors
//             ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#E05D35]'}
//             disabled:opacity-50 disabled:cursor-not-allowed
//           `}
//         >
//           {isLoading ? (
//             <span className="flex items-center gap-2">
//               <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Submitting...
//             </span>
//           ) : submitted ? 'Submitted' : 'Submit Answer'}
//         </button>

//         {/* API Response Display */}
//         {apiResponse && !isLoading && (
//           <div className={`mt-5 p-4 rounded-lg border ${
//             apiResponse.error
//               ? 'bg-red-50 border-red-200 text-red-700'
//               : 'bg-green-50 border-green-200 text-green-700'
//           }`}>
//             <div className="flex items-start gap-3">
//               {apiResponse.error ? (
//                 <CircleX size={20} className="flex-shrink-0 mt-0.5 text-red-500" />
//               ) : (
//                 <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5 text-green-500" />
//               )}
//               <div className="flex-1">
//                 <p className="font-medium">
//                   {apiResponse.error ? 'Error' : 'Success'}
//                 </p>
//                 <p className="text-sm mt-1">{apiResponse.message}</p>

//                 {/* Show API response details if available */}
//                 {apiResponse.data && (
//                   <div className="mt-2 text-xs bg-white/50 p-2 rounded border border-gray-100">
//                     <details>
//                       <summary className="cursor-pointer font-medium">View API Response</summary>
//                       <pre className="mt-2 whitespace-pre-wrap break-all">
//                         {JSON.stringify(apiResponse.data, null, 2)}
//                       </pre>
//                     </details>
//                   </div>
//                 )}

//                 {apiResponse.status && (
//                   <p className="text-xs mt-1 opacity-70">Status: {apiResponse.status}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {submitted && !apiResponse && (
//           <div
//             className={`flex items-center gap-2 mt-5 p-3 rounded-lg ${
//               isCorrect
//                 ? "text-green-600 bg-green-50"
//                 : "text-red-600 bg-red-50"
//             }`}
//           >
//             {isCorrect ? (
//               <CheckCircle2 size={18} />
//             ) : (
//               <CircleX size={18} />
//             )}

//             <span>
//               {isCorrect
//                 ? `Correct! Your answer: ${selectedOption}`
//                 : `Incorrect. Correct answer: ${answer}`}
//             </span>
//           </div>
//         )}

//         {/* Retry button for when API fails */}
//         {submitted && apiResponse?.error && (
//           <button
//             onClick={handleRetry}
//             className="mt-3 text-sm text-[#F26E46] hover:underline font-medium"
//           >
//             Try Again
//           </button>
//         )}
//       </div>
//     </>
//   );
// }

// Chart Components

const SimpleBarChart = ({ data }: { data: any[] }) => {
  const maxClicks = Math.max(...data.map((item) => item.totalClicks), 1);

  return (
    <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <BarChart size={16} className="text-[#F26E46]" />
        <h4 className="text-sm font-semibold text-gray-700">
          Response Distribution
        </h4>
      </div>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-44">
              {item.option}
            </span>
            <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.totalClicks / maxClicks) * 100}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F26E46] to-[#F26E46]/70 rounded-full"
                style={{ width: `${(item.totalClicks / maxClicks) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center px-3 text-xs font-medium text-gray-600">
                {item.totalClicks} {item.totalClicks === 1 ? "click" : "clicks"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatisticsCard = ({ data }: { data: any[] }) => {
  const totalClicks = data.reduce((sum, item) => sum + item.totalClicks, 0);
  const mostVoted = data.reduce(
    (max, item) => (item.totalClicks > max.totalClicks ? item : max),
    data[0],
  );

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-3 border border-orange-200/50">
        <p className="text-xs text-gray-500">Total Votes</p>
        <p className="text-xl font-bold text-[#F26E46]">{totalClicks}</p>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200/50">
        <p className="text-xs text-gray-500">Most Popular</p>
        <p className="text-xl font-bold text-blue-600">{mostVoted.option}</p>
        <p className="text-xs text-gray-500">{mostVoted.totalClicks} votes</p>
      </div>
    </div>
  );
};

// Main Component
function QuizCard({ section, pagedata }: any) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const slug = pagedata?.seoMeta;

  // Mock API response for demo - replace with your actual data
  const [mockApiData, setmockApiData] = useState({});

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen]);

  const handleSubmit = async () => {
    if (!selectedOption) {
      setIsPopupOpen(true);
      return;
    }

    // console.log(section.options,"section.options")

    const correctAnswer = section.options.find(
      (option: any) => option.value !== "",
    )?.value;

    if (!correctAnswer || correctAnswer === undefined) {
      setIsPopupOpen(true);
      return;
    }

    setIsLoading(true);
    setApiResponse(null);

    try {
      const response = await axiosInstance.post("/admin/questionAnalytics", {
        pageSlug: slug?.canonicalUrl,
        sectionKey: "exam-data",
        question: section.question,
        option: selectedOption,
      });

      // Use mock data for demonstration
      // Replace with: setApiResponse(response.data)

      setmockApiData(response?.data);
      setApiResponse({
        data: mockApiData,
        status: response.status,
        message:
          response.data?.message || "Successfully submitted your answer!",
      });

      // const isAnswerCorrect = response.data?.isCorrect !== undefined
      //   ? response.data.isCorrect
      //   : selectedOption === correctAnswer;

      const isAnswerCorrect =
        selectedOption?.toString().trim() === correctAnswer?.toString().trim();

      console.log(
        mockApiData,
        "mockApiData",
        response?.data,
        selectedOption,
        correctAnswer,
      );

      setIsCorrect(isAnswerCorrect);
      setAnswer(correctAnswer);
      setSubmitted(true);
      setShowResults(true);
    } catch (error: any) {
      console.error("Failed to submit question analytics", error);

      // Use mock data on error as well
      setApiResponse({
        error: false,
        data: mockApiData,
        message: "Successfully submitted your answer!",
        status: 200,
      });

      const isAnswerCorrect = selectedOption === correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setAnswer(correctAnswer);
      setSubmitted(true);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedOption("");
    setApiResponse(null);
    setIsLoading(false);
    setShowResults(false);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  };

  // Prepare chart data
  const chartData = apiResponse?.data?.data || mockApiData.data;

  return (
    <>
      <div className="mt-8 bg-gradient-to-br from-[#FFF8F5] to-white rounded-2xl p-6 shadow-lg border border-orange-100/50">
        <PopupModal
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          onClose={handlePopupClose}
          login={true}
        />

        <div className="flex items-center gap-2 mb-6">
          <div className="bg-[#F26E46]/10 p-2 rounded-xl">
            <CircleHelp className="text-[#F26E46]" size={22} />
          </div>
          <h3 className="font-bold text-xl bg-gradient-to-r from-[#F26E46] to-orange-500 bg-clip-text text-transparent">
            Quick Question
          </h3>
          <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Interactive Quiz
          </span>
        </div>

        <p className="font-medium text-gray-800 mb-6 leading-relaxed">
          {section.question}
        </p>

        <div className="space-y-3">
          {section.options.map((option: any, i: number) => {
            if (option.type === "radio") {
              return (
                <motion.label
                  key={i}
                  whileHover={!submitted ? { scale: 1.01 } : {}}
                  whileTap={!submitted ? { scale: 0.98 } : {}}
                  className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
                    ${
                      selectedOption === option.label
                        ? "border-[#F26E46] bg-[#FFF0EA] shadow-md"
                        : "border-gray-200 hover:border-[#F26E46]/50 hover:bg-orange-50/50"
                    }
                    ${submitted ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  <input
                    type="radio"
                    name={section.question}
                    value={option.label}
                    checked={selectedOption === option.label}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      setSubmitted(false);
                      setApiResponse(null);
                      setShowResults(false);
                    }}
                    className="accent-[#F26E46] w-4 h-4"
                    disabled={submitted || isLoading}
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                  {selectedOption === option.label && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <CheckCircle2 size={16} className="text-[#F26E46]" />
                    </motion.div>
                  )}
                </motion.label>
              );
            }

            return (
              <input
                key={i}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#F26E46] focus:border-transparent transition-all duration-200"
                placeholder={option.label}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setSubmitted(false);
                  setApiResponse(null);
                  setShowResults(false);
                }}
                disabled={submitted || isLoading}
              />
            );
          })}
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F26E46] to-orange-400 rounded-full"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap animate-pulse">
                Submitting...
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || submitted}
            whileHover={!isLoading && !submitted ? { scale: 1.02 } : {}}
            whileTap={!isLoading && !submitted ? { scale: 0.98 } : {}}
            className={`flex-1 bg-gradient-to-r from-[#F26E46] to-orange-500 text-white px-6 py-3 rounded-xl transition-all duration-200
              ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-orange-200"}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : submitted ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                Submitted
              </span>
            ) : (
              "Submit Answer"
            )}
          </motion.button>

          {submitted && (
            <motion.button
              onClick={handleRetry}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-[#F26E46] hover:text-[#F26E46] transition-all duration-200 font-medium"
            >
              Retry
            </motion.button>
          )}
        </div>


        {submitted && showResults && apiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 border-t border-gray-200 pt-6"
          >
            {/* Correct/Incorrect Feedback */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50">
              {isCorrect ? (
                <>
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 size={20} className="text-green-600" />
                  </div>
                  <span className="font-semibold text-green-700">
                    Correct! Great job! 🎉
                  </span>
                </>
              ) : (
                <>
                  <div className="bg-red-100 p-2 rounded-full">
                    <CircleX size={20} className="text-red-600" />
                  </div>
                  <span className="font-semibold text-red-700">
                    Incorrect. The correct answer is: {answer}
                  </span>
                </>
              )}
            </div>

            {/* Slider Section */}
            <div className="mt-6 relative">
              {/* Slider Controls */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <PieChart size={16} className="text-[#F26E46]" />
                  Results Analytics
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={18} className="text-gray-600" />
                  </button>
                  <span className="text-xs text-gray-400 self-center">
                    {currentSlide + 1}/2
                  </span>
                  <button
                    onClick={nextSlide}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Slider Content */}
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentSlide === 0 ? (
                      <SimpleBarChart data={chartData} />
                    ) : (
                      <StatisticsCard data={chartData} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Indicators */}
              {/* <div className="flex justify-center gap-1 mt-4">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'w-6 bg-[#F26E46]' 
                        : 'w-3 bg-gray-300'
                    }`}
                  />
                ))}
              </div> */}

              <div className="flex justify-end gap-1 mt-4">
                <button
                  className="flex bg-primary px-2 py-1 rounded shadow-sm text-white"
                  onClick={() => {
                    setIsPopupOpen(true);
                  }}
                >
                  More Quiz <LucideChevronRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

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
        { value: "SAT", label: "SAT" },
        { value: "other", label: "Other" },
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
    label: "Apply Target Score",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    totalStep: 1,
    onSuccess: {
      message: "Thank you! We will contact you shortly.",
      redirect: "/thank-you",
    },
  },
};

const LeadForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setFormSubmitted(true);
    // You can add your API call here to submit the form data
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 px-6 py-2">
      <h3 className="text-center text-lg md:text-xl font-semibold mb-2 text-neutral-900">
        Speak to an Expert
      </h3>
      <FormSection FORM_CONFIG={FORM_CONFIG} onFormSubmit={handleFormSubmit} />

      {formSubmitted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm text-center">
            ✓ Thank you! We will contact you shortly.
          </p>
        </div>
      )}
    </div>
  );
};
