"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  MessageSquare,
  Calendar as CalendarIcon,
  Globe,
  Building,
  UserCheck,
  Users as UsersIcon
} from "lucide-react";
import axiosInstance from "../app/lib/axios";
import { useRouter } from "next/navigation";

type FormData = {
  [key: string]: string | string[];
};

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  step: number;
  grid?: string;
  required?: boolean;
  placeholder?: string;
  icon?: any;
  options?: Array<{ value: string; label: string; icon?: any; desc?: string }>;
}

interface StepConfig {
  step: number;
  title: string;
  icon: any;
  fields: string[];
  button?: "next" | "submit"; // Add button type to step config
}

interface SubmitConfig {
  label: string;
  icon?: any;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
  position?: "bottom" | "top" | "both";
  onSuccess?: {
    message: string;
    redirect?: string;
  };
}

interface FormConfig {
  steps: StepConfig[];
  fields: FieldConfig[];
  submit?: SubmitConfig;
}

interface RegistrationSectionProps {
  FORM_CONFIG: FormConfig;
  onSubmitted?: (response: any) => void;
}

export default function FormSection({ FORM_CONFIG, onSubmitted }: RegistrationSectionProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Initialize form data from config
  const initialFormData: FormData = {};
  FORM_CONFIG.fields.forEach(field => {
    if (field.type === "checkbox-group") {
      initialFormData[field.name] = [];
    } else {
      initialFormData[field.name] = "";
    }
  });
  
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const primaryColor = "#f26e46";

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleCheckboxGroup = (fieldName: string, value: string) => {
    const currentValues = formData[fieldName] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFormData((prev) => ({ ...prev, [fieldName]: newValues }));
  };

  const validateStep = (stepNumber: number): boolean => {
    const fieldsToValidate = FORM_CONFIG.fields.filter(
      field => field.step === stepNumber && field.required
    );
    
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    fieldsToValidate.forEach(field => {
      const value = formData[field.name];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e?: FormEvent) => {
  if (e) {
    e.preventDefault();
  }

  // Validate all fields
  let allValid = true;
  const allErrors: Record<string, string> = {};

  FORM_CONFIG.fields.forEach((field) => {
    if (field.required) {
      const value = formData[field.name];

      if (!value || (Array.isArray(value) && value.length === 0)) {
        allErrors[field.name] = `${field.label} is required`;
        allValid = false;
      }
    }
  });


  if (!allValid) {
    setErrors(allErrors);

    const firstErrorField = Object.keys(allErrors)[0];

    const errorElement = document.querySelector(
      `[name="${firstErrorField}"]`
    );

    if (errorElement) {
      errorElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return;
  }


  try {

    setIsLoading(true);


    // Get current page URL path
    const pagePath = window.location.href;
    // const pagePath = window.location.pathname;


    const payload = {
      path: pagePath,
      data: formData,
    };


    // console.log("Form Payload:", payload);



    const response = await axiosInstance.post(
      "/admin/formDetails",
      payload
    );


    // console.log("Form Submitted:", response.data);

    setSubmitted(true);

    // Send response to parent if callback provided
    if (onSubmitted) onSubmitted(response.data);


  } catch (error: any) {

    console.error(
      "Form Submit Error:",
      error.response?.data || error.message
    );


    setErrors({
      submit:
        error.response?.data?.error ||
        "Something went wrong. Please try again.",
    });


  } finally {

    setIsLoading(false);

  }
};

  // const handleSubmit = async (e?: FormEvent) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
    
  //   // Validate all steps before submission
  //   let allValid = true;
  //   const allErrors: Record<string, string> = {};
    
  //   FORM_CONFIG.fields.forEach(field => {
  //     if (field.required) {
  //       const value = formData[field.name];
  //       if (!value || (Array.isArray(value) && value.length === 0)) {
  //         allErrors[field.name] = `${field.label} is required`;
  //         allValid = false;
  //       }
  //     }
  //   });
    
  //   if (!allValid) {
  //     setErrors(allErrors);
  //     // Scroll to first error
  //     const firstErrorField = Object.keys(allErrors)[0];
  //     const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
  //     if (errorElement) {
  //       errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     }
  //     return;
  //   }
    
  //   setIsLoading(true);

  //   const jsonData = JSON.stringify(formData, null, 2);
  //   // console.log("Form JSON:", jsonData);

  //     const api = axiosInstance('/admin/formDetails')


  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
    
  //   setIsLoading(false);
  //   setSubmitted(true);
  // };

  const handleStepAction = async () => {
    const currentStepConfig = FORM_CONFIG.steps.find(s => s.step === step);
    
    // Validate current step
    if (!validateStep(step)) {
      return;
    }

    // Check if current step has "submit" button or if it's the last step
    if (currentStepConfig?.button === "submit" || step === FORM_CONFIG.steps.length) {
      // Submit the form
      await handleSubmit();
    } else {
      // Go to next step
      setStep((s) => Math.min(s + 1, FORM_CONFIG.steps.length));
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, FORM_CONFIG.steps.length));
    }
  };
  
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const restart = () => {
    setStep(1);
    setSubmitted(false);
    const resetData: FormData = {};
    FORM_CONFIG.fields.forEach(field => {
      if (field.type === "checkbox-group") {
        resetData[field.name] = [];
      } else {
        resetData[field.name] = "";
      }
    });
    setFormData(resetData);
    setErrors({});
  };

  const getFieldsForStep = (stepNumber: number) => {
    return FORM_CONFIG.fields.filter(field => field.step === stepNumber);
  };

  // Get current step fields
  const currentStepFields = getFieldsForStep(step);
  const currentStep = FORM_CONFIG.steps.find(s => s.step === step);

  // Get total steps
  const totalSteps = FORM_CONFIG.steps.length;

  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  // Get submit configuration
  const submitConfig = FORM_CONFIG.submit || {
    label: "Submit Enquiry",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom"
  };

  const SubmitIcon = submitConfig.icon;

  // Determine button text and icon based on step config
  const getButtonConfig = () => {
    const currentStepConfig = FORM_CONFIG.steps.find(s => s.step === step);
    const isSubmit = currentStepConfig?.button === "submit" || step === totalSteps;
    
    return {
      text: isSubmit ? (submitConfig.label || "Submit") : "Continue",
      icon: isSubmit ? SubmitIcon : ArrowRight,
      action: handleStepAction
    };
  };

  const buttonConfig = getButtonConfig();

  const renderSubmitButton = (position: string) => {
    if (submitConfig.position !== position && submitConfig.position !== "both") {
      return null;
    }

    const sizeClasses = {
      small: "px-4 py-2 text-xs",
      medium: "px-6 py-3 text-sm",
      large: "px-8 py-4 text-base"
    };

    return (
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`${sizeClasses[submitConfig.size || "large"]} font-bold text-white rounded-xl transition-all shadow-lg
         hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full`}
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
        }}
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
          <>
            {submitConfig.label || "Submit"}
            {SubmitIcon && <SubmitIcon className="w-4 h-4" />}
          </>
        )}
      </motion.button>
    );
  };

  const router = useRouter();
  if (submitted) {
    router.push('/thank-you')
    // return (
    //   <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    //     <motion.div
    //       initial={{ scale: 0.8, opacity: 0 }}
    //       animate={{ scale: 1, opacity: 1 }}
    //       transition={{ duration: 0.5 }}
    //       className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
    //     >
    //       <motion.div
    //         initial={{ scale: 0 }}
    //         animate={{ scale: 1 }}
    //         transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    //         className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
    //         style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
    //       >
    //         <CheckCircle className="w-10 h-10 text-white" />
    //       </motion.div>
    //       <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
    //       <p className="text-gray-600 mb-6 text-lg">
    //         {submitConfig.onSuccess?.message || "Our counsellor will contact you within 24 hours."}
    //       </p>
    //       <div className="flex justify-center gap-3 mb-6">
    //         <motion.div
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: 0.4 }}
    //           className="w-12 h-12 rounded-full flex items-center justify-center"
    //           style={{ background: `${primaryColor}15` }}
    //         >
    //           <Phone className="w-5 h-5" style={{ color: primaryColor }} />
    //         </motion.div>
    //         <motion.div
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: 0.5 }}
    //           className="w-12 h-12 rounded-full flex items-center justify-center"
    //           style={{ background: `${primaryColor}15` }}
    //         >
    //           <Mail className="w-5 h-5" style={{ color: primaryColor }} />
    //         </motion.div>
    //         <motion.div
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: 0.6 }}
    //           className="w-12 h-12 rounded-full flex items-center justify-center"
    //           style={{ background: `${primaryColor}15` }}
    //         >
    //           <MessageSquare className="w-5 h-5" style={{ color: primaryColor }} />
    //         </motion.div>
    //       </div>
    //       <button
    //         onClick={restart}
    //         className="px-6 py-2 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
    //         style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
    //       >
    //         Submit Another Enquiry
    //       </button>
    //     </motion.div>
    //   </section>
    // );
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="bg-white ">
        {/* Top Submit Button */}
        {renderSubmitButton("top")}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step Header */}
           {currentStep?.title &&
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                {currentStep && <currentStep.icon className="w-4 h-4" style={{ color: primaryColor }} />}
              </div>
              <p className="text-xl font-bold text-gray-900">{currentStep?.title}</p>
            </div>
            }

            {/* Dynamic Fields */}
            <div className="space-y-2 grid grid-cols-2 gap-2">
              {currentStepFields.map((field) => {
                const gridClass = field.grid === "half" ? "col-span-1" : "col-span-2";
                const hasError = !!errors[field.name];
                
                return (
                  <div key={field.name} className={gridClass}>
                    {field.type === "select" && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <select
                          name={field.name}
                          value={formData[field.name] as string || ""}
                          onChange={(e) => updateField(field.name, e.target.value)}
                          className={`w-full border-2 rounded-xl px-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white ${
                            hasError ? 'border-red-500' : 'border-gray-200'
                          }`}
                          style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                          onFocus={(e) => {
                            e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                            e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                          }}
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "text" && field.icon && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            name={field.name}
                            type="text"
                            value={formData[field.name] as string || ""}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            className={`w-full border-2 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white ${
                              hasError ? 'border-red-500' : 'border-gray-200'
                            }`}
                            style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                            onFocus={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                              e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "email" && field.icon && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            name={field.name}
                            type="email"
                            value={formData[field.name] as string || ""}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            className={`w-full border-2 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white ${
                              hasError ? 'border-red-500' : 'border-gray-200'
                            }`}
                            style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                            onFocus={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                              e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "tel" && field.icon && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            name={field.name}
                            type="tel"
                            value={formData[field.name] as string || ""}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            className={`w-full border-2 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white ${
                              hasError ? 'border-red-500' : 'border-gray-200'
                            }`}
                            style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                            onFocus={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                              e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "number" && field.icon && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            name={field.name}
                            type="number"
                            value={formData[field.name] as string || ""}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            className={`w-full border-2 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white ${
                              hasError ? 'border-red-500' : 'border-gray-200'
                            }`}
                            style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                            onFocus={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                              e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "date" && field.icon && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            name={field.name}
                            type="date"
                            value={formData[field.name] as string || ""}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            className={`w-full border-2 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white ${
                              hasError ? 'border-red-500' : 'border-gray-200'
                            }`}
                            style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                            onFocus={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                              e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                            required={field.required}
                          />
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "textarea" && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <textarea
                          name={field.name}
                          value={formData[field.name] as string || ""}
                          onChange={(e) => updateField(field.name, e.target.value)}
                          rows={4}
                          className={`w-full border-2 rounded-xl px-4 py-2 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white resize-none ${
                            hasError ? 'border-red-500' : 'border-gray-200'
                          }`}
                          style={{ borderColor: hasError ? '#ef4444' : '#e5e7eb' }}
                          onFocus={(e) => {
                            e.target.style.borderColor = hasError ? '#ef4444' : primaryColor;
                            e.target.style.boxShadow = `0 0 0 4px ${hasError ? '#ef444420' : `${primaryColor}20`}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = hasError ? '#ef4444' : '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "button-group" && (
                      <>
                        {
                        field.label &&
                         <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                         </label>
                        }
                        <div className="grid grid-cols-3 gap-3">
                          {field.options?.map((option) => {
                            const OptionIcon = option.icon;
                            const isSelected = formData[field.name] === option.value;
                            return (
                              <motion.button
                                key={option.value}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateField(field.name, isSelected ? "" : option.value)}
                                className="p-3 rounded-xl border-2 text-sm transition-all"
                                style={{
                                  background: isSelected 
                                    ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                                    : "#f9fafb",
                                  color: isSelected ? "white" : "#374151",
                                  borderColor: isSelected ? "transparent" : hasError ? "#ef4444" : "#e5e7eb",
                                  boxShadow: isSelected ? `0 4px 14px ${primaryColor}40` : "none"
                                }}
                              >
                                {OptionIcon && <OptionIcon className="w-6 h-6 mx-auto mb-1" />}
                                {option.label}
                                {option.desc && (
                                  <p className="text-xs mt-1 opacity-80">{option.desc}</p>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}

                    {field.type === "checkbox-group" && (
                      <>
                        <label className="block text-sm text-gray-700 mb-1">
                          {field.label}
                          <span className="text-gray-400 text-xs ml-1">(select all that apply)</span>
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {field.options?.map((option) => {
                            const OptionIcon = option.icon;
                            const isSelected = (formData[field.name] as string[] || []).includes(option.value);
                            return (
                              <motion.button
                                key={option.value}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleCheckboxGroup(field.name, option.value)}
                                className="p-3 rounded-xl border-2 font-medium text-sm transition-all flex items-center gap-2"
                                style={{
                                  background: isSelected 
                                    ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                                    : "#f9fafb",
                                  color: isSelected ? "white" : "#374151",
                                  borderColor: isSelected ? "transparent" : hasError ? "#ef4444" : "#e5e7eb",
                                  boxShadow: isSelected ? `0 4px 14px ${primaryColor}40` : "none"
                                }}
                              >
                                {OptionIcon && <OptionIcon className="w-4 h-4" />}
                                {option.label}
                              </motion.button>
                            );
                          })}
                        </div>
                        {hasError && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
          {step > 1 ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </motion.button>
          ) : (
            <div />
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={buttonConfig.action}
            className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
            }}
          >
            {buttonConfig.text}
            {buttonConfig.icon && <buttonConfig.icon className="w-4 h-4" />}
          </motion.button>
        </div>
      </form>
    </>
  );
}