"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, User, X } from "lucide-react";
import FormSection from "./formSection";


export default function PopupModal({isPopupOpen,setIsPopupOpen} : any) {
  
// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "Share Your Info ",
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
      grid: "half",
      icon: Phone
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: false,
      placeholder: "Jaipur",
      step: 1,
      grid: "half",
      icon: MapPin
    },
   
    // {
    //   name: "source",
    //   label: "How did you hear about us?",
    //   type: "select",
    //   required: false,
    //   step: 1,
    //   grid: "half",
    //   options: [
    //     { value: "", label: "Select source" },
    //     { value: "Google Search", label: "Google Search" },
    //     { value: "Instagram", label: "Instagram" },
    //     { value: "Facebook", label: "Facebook" },
    //     { value: "YouTube", label: "YouTube" },
    //     { value: "Friend Referral", label: "Friend Referral" },
    //     { value: "Education Fair", label: "Education Fair" },
    //     { value: "Walk-in", label: "Walk-in" },
    //     { value: "Other", label: "Other" }
    //   ]
    // }
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

  return(
    
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-1000 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#F36C45] to-[#e05a34] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Book a Free Consultation</h2>
                    <p className="text-white/80 text-sm mt-1">Fill in your details and our team will reach out</p>
                  </div>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <FormSection FORM_CONFIG={FORM_CONFIG} onSubmitted={() => setIsPopupOpen(false)} />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>🔒 Your information is secure</span>
                <span>⏱️ Response within 24 hours</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}
