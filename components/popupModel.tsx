"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import FormSection from "./formSection";



export default function PopupModal({ isPopupOpen, setIsPopupOpen, onClose, login }: any) {
  const router = useRouter();

  const handleClose = () => {
    setIsPopupOpen(false);
    if (onClose) onClose();
  };

  // ─── Form Configuration ───
  const FORM_CONFIG: any = {
    steps: [
      {
        step: 1,
        title: "Share Your Info ",
        icon: User,
        fields: ["fullName", "email", "phone", "city", "source"],
        button: "submit",
      },
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
        icon: User,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "priya@email.com",
        step: 1,
        grid: "full",
        icon: Mail,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "+91 98765 43210",
        step: 1,
        grid: "half",
        icon: Phone,
      },
      {
        name: "city",
        label: "City",
        type: "text",
        required: false,
        placeholder: "Jaipur",
        step: 1,
        grid: "half",
        icon: MapPin,
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
        redirect: "/thank-you",
      },
    },
  };

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3,
            }}
            className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-auto "
            style={{
              "scrollbarWidth":"none"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ─── Header ─── */}
            <div className="bg-gradient-to-r from-[#F36C45] to-[#e05a34] px-6 py-5 sticky top-0 z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white truncate">
                    Book a Free Consultation
                  </h2>
                  <p className="text-white/80 text-sm mt-1">
                    Fill in your details and our team will reach out
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ─── Form Body ─── */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
              <FormSection FORM_CONFIG={FORM_CONFIG} onSubmitted={handleClose} />
            </div>

            {/* ─── "or" Divider ─── */}
            <div className="flex items-center gap-4 px-6 py-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* ─── Start Free Trial Button ─── */}
            <div className="flex justify-center items-center px-6 pb-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/auth")}
                className="w-full py-3.5 text-base font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 tracking-wide bg-gradient-to-r from-[#F36C45] to-[#e05a34]"
              >
                Start Free Trial
              </motion.button>
            </div>

            {/* ─── Footer ─── */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 sticky bottom-0 backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-base">🔒</span> Your information is secure
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-base">⏱️</span> Response within 24 hours
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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




