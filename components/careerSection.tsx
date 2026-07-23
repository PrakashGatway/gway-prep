"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  Send,
  FileText,
  CheckCircle,
  Clock,
  Building,
  Upload,
  MessageSquare
} from "lucide-react";
import FormSection from "./formSection";

// ─── Form Configuration for Job Application ───
const JOB_APPLICATION_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "Apply for Position",
      icon: Briefcase,
      fields: ["fullName", "email", "phone", "experience", "currentCompany", "resume", "coverLetter"],
      button: "submit"
    }
  ],
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "John Doe",
      step: 1,
      grid: "full",
      icon: User
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "john@email.com",
      step: 1,
      grid: "half",
      icon: Mail
    },
    // {
    //   name: "phone",
    //   label: "Phone Number",
    //   type: "tel",
    //   required: true,
    //   placeholder: "+91 98765 43210",
    //   step: 1,
    //   grid: "half",
    //   icon: Phone
    // },
    // {
    //   name: "experience",
    //   label: "Years of Experience",
    //   type: "select",
    //   required: true,
    //   step: 1,
    //   grid: "half",
    //   options: [
    //     { value: "", label: "Select Experience" },
    //     { value: "0-1", label: "0-1 Years" },
    //     { value: "1-3", label: "1-3 Years" },
    //     { value: "3-5", label: "3-5 Years" },
    //     { value: "5-8", label: "5-8 Years" },
    //     { value: "8-12", label: "8-12 Years" },
    //     { value: "12+", label: "12+ Years" }
    //   ]
    // },
    // {
    //   name: "currentCompany",
    //   label: "Current Company",
    //   type: "text",
    //   required: false,
    //   placeholder: "Current Company (if any)",
    //   step: 1,
    //   grid: "half",
    //   icon: Building
    // },
    {
      name: "resume",
      label: "Upload Resume/CV",
      type: "file",
      required: true,
      step: 1,
      grid: "half",
      accept: ".pdf,.doc,.docx",
      icon: Upload
    },
    {
      name: "coverLetter",
      label: "Cover Letter",
      type: "textarea",
      required: false,
      placeholder: "Why do you want to join us? Tell us about yourself...",
      step: 1,
      grid: "full",
      rows: 4,
      icon: MessageSquare
    }
  ],
  submit: {
    label: "Submit Application",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    onSuccess: {
      message: "Thank you! Your application has been submitted successfully.",
      redirect: "/thank-you"
    }
  }
};

interface OpenPosition {
  title: string;
  type: string;
  exp: string;
  loc: string;
  des: string;
  icon: string;
}

interface CareersSectionProps {
  data: {
    openPositions: OpenPosition[];
  };
}

const CareersSection: React.FC<CareersSectionProps> = ({ data }) => {
  const [selectedPosition, setSelectedPosition] = useState<OpenPosition | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Briefcase: Briefcase,
      FileText: FileText,
    };
    return icons[iconName] || Briefcase;
  };

  const orange = "#F26E46";

  const openPopup = (position: OpenPosition) => {
    setSelectedPosition(position);
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedPosition(null), 300);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Open <span className="text-[#F26E46]">Positions</span>
          </h2>
          <p className="text-gray-600 mt-2">Join our team and make a difference</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.openPositions.map((p, i) => {
            const Icon = getIcon(p.icon);
          

  const colors = [ "#fcf3ed", "#FEF0BF", "#ffb399" ];
  const currentBg = colors[i % colors.length]; 


            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={` border-[#E8E0D8] px-6 py-10 flex items-start gap-5
                 transition-all duration-300  group cursor-pointer`}
                 style={{ backgroundColor: currentBg }}
                onClick={() => openPopup(p)}
              >
                {/* <div className="w-12 h-12 rounded-xl bg-[#FCEEE5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {Icon && <Icon size={22} style={{ color: orange }} />}
                </div> */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-black group-hover:text-[#F26E46] transition-colors">
                      {p.title}
                    </h3>
                    <span
                      className="text-[11px] font-semibold px-3 py-1 rounded-full border shrink-0 border-black"
                    //   style={{ color: orange, borderColor: orange }}
                    >
                      {p.type}
                    </span>
                  </div>
                  
                  <div className=" gap-4 mt-2 text-lg ">
                    <span className="flex items-center gap-1">
                      {/* <Clock className="w-3 h-3" /> */}
                      Experience :
                      {p.exp}
                    </span>
                    <span className="flex items-center gap-1">
                      {/* <MapPin className="w-3 h-3" /> */}
                      Location : 
                      {p.loc}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-gray-600 line-clamp-2">
                    <div dangerouslySetInnerHTML={{ __html: p.des.substring(0, 150) + '...' }} />
                  </div>

                  <button
                    className="mt-5 text-sm font-semibold px-4 py-2  border-2 text-white bg-primary hover:border-[#F26E46] transition-all duration-300"
                    // style={{ color: orange, borderColor: orange }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openPopup(p);
                    }}
                  >
                    Apply Now →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Popup Modal ─── */}
      <AnimatePresence>
        {isPopupOpen && selectedPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all hover:scale-110 border border-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid lg:grid-cols-2 h-full max-h-[90vh] min-h-0">
                {/* Left Side - Job Details */}
                <div className="p-8 lg:p-10 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#FEF0BF]/30 to-[#FDF4EF]/30 min-h-0">
                  {/* Job Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                        style={{ color: orange, borderColor: orange }}
                      >
                        {selectedPosition.type}
                      </span>
                      <span className="text-xs text-gray-500">{selectedPosition.loc}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-black">
                      {selectedPosition.title}
                    </h2>
                  </div>

                  {/* Job Meta Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-white/60 rounded-xl mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" style={{ color: orange }} />
                      <span>
                        <span className="font-semibold">Experience:</span> {selectedPosition.exp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4" style={{ color: orange }} />
                      <span>
                        <span className="font-semibold">Type:</span> {selectedPosition.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <MapPin className="w-4 h-4" style={{ color: orange }} />
                      <span>
                        <span className="font-semibold">Location:</span> {selectedPosition.loc}
                      </span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="min-h-40">
                    <h4 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" style={{ color: orange }} />
                      Job Description
                    </h4>
                    <div className="prose prose-sm max-w-none text-gray-700 overflow-y-auto overflow-x-hidden [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:text-black bg-white/80 p-4 rounded-xl border border-black/5 shadow-sm max-h-[45vh] scrollbar-thin scrollbar-thumb-[#f0b429]/60 scrollbar-track-transparent">
                      <div dangerouslySetInnerHTML={{ __html: selectedPosition.des }} />
                    </div>
                  </div>
                </div>

                {/* Right Side - Application Form */}
                <div className="p-8 lg:p-10 overflow-y-auto overflow-x-hidden bg-white min-h-0">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-black">Apply Now</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Fill in the details below to apply for this position
                    </p>
                  </div>
                  
                  <FormSection FORM_CONFIG={JOB_APPLICATION_CONFIG} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CareersSection;