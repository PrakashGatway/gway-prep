
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { useState } from "react";
import FormSection from "./formSection";

interface PopupModalProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
  onClose?: () => void;
}

export default function PopupModal({
  isPopupOpen,
  setIsPopupOpen,
  onClose,
}: PopupModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    country: "Study In Italy",
    consent: false,
  });

  const handleClose = () => {
    setIsPopupOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consultation form:", formData);
    
    // Add your API call here

    // Optional: window.location.href = "/thank-you";
    handleClose();
  };

  const FORM_CONFIG: any = {
    steps: [
      {
        step: 1,
        title: "",
        icon: User,
        fields: ["fullName", "email", "phone", "city", "source"],
        button: "submit"
      }
    ],
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Priya",
        step: 1,
        grid: "full",
        icon: User
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "priya@email.com",
        step: 1,
        grid: "full",
        icon: Mail
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "+91 98765 43210",
        step: 1,
        grid: "full",
        icon: Phone
      },
      {
        name: "city",
        label: "City",
        type: "text",
        required: false,
        placeholder: "Jaipur",
        step: 1,
        grid: "full",
        icon: MapPin
      },
    ],
    submit: {
      label: "Book Consultation",
      icon: Send,
      variant: "primary",
      size: "large",
      position: "bottom",
      onSuccess: {
        message: "Thank you! Our team will reach out to you shortly.",
        redirect: "/thank-you"
      }
    }
  };

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close consultation popup"
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex max-h-[92vh] flex-col lg:flex-row">
              
              {/* =========================================================
                  LEFT PANEL (Hidden on Mobile, visible on Desktop)
              ========================================================== */}
              <div className="relative hidden w-[42%] flex-shrink-0 flex-col overflow-hidden bg-gradient-to-br from-[#FFF6F1] to-[#FFE8DA] p-12 lg:flex">
                {/* Decorative abstract shapes */}
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />
                <div className="absolute right-10 top-10 h-24 w-24 rounded-full border-[8px] border-white/40" />

                <div className="relative z-10">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-800">
                    Guidance for Your
                  </h2>
                  <h3 className="mt-1 text-4xl font-bold leading-tight tracking-tight text-[#F36C45]">
                    Dream Career
                  </h3>
                </div>

                {/* Benefits */}
                <div className="relative z-10 mt-12 space-y-8">
                  <Benefit
                    title="Trusted by 300,000+ Learners"
                    description="Join a thriving community of students pursuing global education."
                  />
                  <Benefit
                    title="360° Expert Support at Every Step"
                    description="End-to-end guidance from application to admission."
                  />
                  <Benefit
                    title="Access 1000+ Global University Partners"
                    description="Explore top universities across the world."
                  />
                </div>

                {/* Decorative Bottom Badge */}
                <div className="absolute bottom-8 left-12 z-10 flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F36C45] text-white">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Global Education</p>
                    <p className="text-xs text-slate-500">Expert Counseling</p>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  RIGHT FORM PANEL
              ========================================================== */}
              <div className="flex w-full min-w-0 flex-1 flex-col overflow-y-auto bg-white">
                <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                  
                  <div className="mb-8">
                    <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold tracking-wide text-[#F36C45] uppercase">
                      Get Started Today
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                      Book Your Free Consultation
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Fill in your details and our expert counselors will reach out to you shortly.
                    </p>
                  </div>

             <FormSection
                FORM_CONFIG={FORM_CONFIG} 
                onSubmitted={handleClose}
              />
                  {/* <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField
                        label="Full Name"
                        required
                        icon={<User />}
                        name="fullName"
                        value={formData.fullName}
                        placeholder="John Doe"
                        onChange={handleChange}
                      />
                      <FormField
                        label="Mobile Number"
                        required
                        icon={<Phone />}
                        name="phone"
                        value={formData.phone}
                        placeholder="Enter 10-digit number"
                        type="tel"
                        onChange={handleChange}
                      />
                    </div>

                    
                    <FormField
                      label="Email ID"
                      required
                      icon={<Mail />}
                      name="email"
                      value={formData.email}
                      placeholder="johndoe@example.com"
                      type="email"
                      onChange={handleChange}
                    />


                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField
                        label="State"
                        required
                        icon={<MapPin />}
                        name="state"
                        value={formData.state}
                        placeholder="Your state"
                        onChange={handleChange}
                      />
                      <FormField
                        label="City"
                        required
                        icon={<MapPin />}
                        name="city"
                        value={formData.city}
                        placeholder="Your city"
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Country to Study <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="h-[52px] w-full appearance-none rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-base text-slate-800 outline-none transition focus:border-[#F36C45] focus:ring-4 focus:ring-orange-500/10 hover:border-slate-300"
                        >
                          <option>Study In Italy</option>
                          <option>Study In UK</option>
                          <option>Study In USA</option>
                          <option>Study In Canada</option>
                          <option>Study In Australia</option>
                          <option>Study In Germany</option>
                          <option>Study In France</option>
                          <option>Study In Ireland</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    
                    <label className="flex cursor-pointer items-start gap-3 pt-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-[2px] h-5 w-5 flex-shrink-0 cursor-pointer rounded border-slate-300 text-[#F36C45] transition focus:ring-orange-500/20"
                        required
                      />
                      <span className="leading-relaxed">
                        I agree to receive information about study abroad programs, scholarships, and updates.
                      </span>
                    </label>

                    
                    <button
                      type="submit"
                      className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#F96B47] px-6 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-[#ed5e3b] hover:shadow-xl hover:shadow-orange-500/40 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-orange-500/30"
                    >
                      <span>Book Free Consultation</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form> */}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================================
   BENEFIT COMPONENT
============================================================= */
function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        <Check className="h-5 w-5 text-[#F36C45]" />
      </div>
      <div>
        <h4 className="text-base font-bold leading-tight text-slate-800">
          {title}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */
function FormField({
  label,
  required,
  icon,
  name,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#F36C45] focus:ring-4 focus:ring-orange-500/10 hover:border-slate-300"
        />
      </div>
    </div>
  );
}










// "use client"
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, MapPin, Phone, Send, User, X } from "lucide-react";
// import FormSection from "./formSection";

// export default function PopupModal({ isPopupOpen, setIsPopupOpen, onClose }: any) {
  
//   // ─── Form Configuration ───
//   const FORM_CONFIG: any = {
//     steps: [
//       {
//         step: 1,
//         title: "Share Your Info ",
//         icon: User,
//         fields: ["fullName", "email", "phone", "city", "source"],
//         button: "submit"
//       }
//     ],
//     fields: [
//       {
//         name: "fullName",
//         label: "Full Name",
//         type: "text",
//         required: true,
//         placeholder: "Priya",
//         step: 1,
//         grid: "full",
//         icon: User
//       },
//       {
//         name: "email",
//         label: "Email Address",
//         type: "email",
//         required: true,
//         placeholder: "priya@email.com",
//         step: 1,
//         grid: "full",
//         icon: Mail
//       },
//       {
//         name: "phone",
//         label: "Phone Number",
//         type: "tel",
//         required: true,
//         placeholder: "+91 98765 43210",
//         step: 1,
//         grid: "half",
//         icon: Phone
//       },
//       {
//         name: "city",
//         label: "City",
//         type: "text",
//         required: false,
//         placeholder: "Jaipur",
//         step: 1,
//         grid: "half",
//         icon: MapPin
//       },
//     ],
//     submit: {
//       label: "Book Consultation",
//       icon: Send,
//       variant: "primary",
//       size: "large",
//       position: "bottom",
//       onSuccess: {
//         message: "Thank you! Our team will reach out to you shortly.",
//         redirect: "/thank-you"
//       }
//     }
//   };

//   const handleClose = () => {
//     setIsPopupOpen(false);
//     if (onClose) onClose();
//   };

  

//   return (
//     <AnimatePresence>
//       {isPopupOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={handleClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9, y: 30, opacity: 0 }}
//             animate={{ scale: 1, y: 0, opacity: 1 }}
//             exit={{ scale: 0.9, y: 30, opacity: 0 }}
//             transition={{ 
//               type: "spring", 
//               damping: 20, 
//               stiffness: 300,
//               duration: 0.3
//             }}
//             className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-[#F36C45] to-[#e05a34] px-6 py-5 sticky top-0 z-10">
//               <div className="flex items-start justify-between gap-4">
//                 <div className="flex-1 min-w-0">
//                   <h2 className="text-xl font-bold text-white truncate">
//                     Book a Free Consultation
//                   </h2>
//                   <p className="text-white/80 text-sm mt-1">
//                     Fill in your details and our team will reach out
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleClose}
//                   className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
//                   aria-label="Close popup"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Form Body - Scrollable */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
//               <FormSection 
//                 FORM_CONFIG={FORM_CONFIG} 
//                 onSubmitted={handleClose}
//               />
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 sticky bottom-0 bg-gray-50/95 backdrop-blur-sm">
//               <span className="flex items-center gap-1">
//                 <span>🔒</span> Your information is secure
//               </span>
//               <span className="flex items-center gap-1">
//                 <span>⏱️</span> Response within 24 hours
//               </span>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }




