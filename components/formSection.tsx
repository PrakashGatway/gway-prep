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
  Users as UsersIcon,
} from "lucide-react";
import axiosInstance from "../app/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  [key: string]: string | string[];
};

interface FieldConfig {
  name: string;
  other?: string;
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
  totalStep?: Number;
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

export default function FormSection({
  FORM_CONFIG,
  onSubmitted,
}: RegistrationSectionProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialFormData: FormData = {};
  FORM_CONFIG.fields.forEach((field) => {
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
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
      (field) => field.step === stepNumber && field.required,
    );

    let isValid = true;
    const newErrors: Record<string, string> = {};

    fieldsToValidate.forEach((field) => {
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

    let allValid = true;
    const allErrors: Record<string, string> = {};

    // Validate required fields
    FORM_CONFIG.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];

        if (!value || (Array.isArray(value) && value.length === 0)) {
          allErrors[field.name] = `${field.label} is required`;
          allValid = false;
        }
      }
    });

    // Validate phone number
    const phoneValue = formData["phone"] || formData["mobile"];

    if (phoneValue) {
      const digitsOnly = String(phoneValue).replace(/\D/g, "");

      if (digitsOnly.length !== 10) {
        const phoneFieldName = formData["phone"] ? "phone" : "mobile";

        allErrors[phoneFieldName] = "Phone number must be exactly 10 digits";

        allValid = false;
      }
    }

    // Validation error
    if (!allValid) {
      setErrors(allErrors);

      const firstErrorField = Object.keys(allErrors)[0];

      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`,
      );

      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      // Show error message
      toast.error(
        allErrors[firstErrorField] || "Please fill all required fields",
      );

      return;
    }

    try {
      setIsLoading(true);

      const pagePath = window.location.href;

      const payload = {
        path: pagePath,
        data: formData,
      };

      const response = await axiosInstance.post("/admin/formDetails", payload);

      console.log("Submit response:", response.data);

      if (response.data?.success === true) {
        setSubmitted(true);

        toast.success(response.data?.message || "Form submitted successfully!");

        if (onSubmitted) {
          onSubmitted(response.data);
        }

        return;
      }

      setSubmitted(false);

      toast.error(
        response.data?.message ||
          response.data?.error ||
          "Form submission failed",
      );
    } catch (error: any) {
      console.error(
        "Form Submit Error:",
        error?.response?.data || error?.message,
      );

      setSubmitted(false);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);

      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleSubmit = async (e?: FormEvent) => {
  //   if (e) {
  //     e.preventDefault();
  //   }

  //   // Validate all fields
  //   let allValid = true;
  //   const allErrors: Record<string, string> = {};

  //   FORM_CONFIG.fields.forEach((field) => {
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

  //     const firstErrorField = Object.keys(allErrors)[0];

  //     const errorElement = document.querySelector(
  //       `[name="${firstErrorField}"]`
  //     );

  //     if (errorElement) {
  //       errorElement.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }

  //     return;
  //   }

  //   try {

  //     setIsLoading(true);

  //     // Get current page URL path
  //     const pagePath = window.location.href;
  //     // const pagePath = window.location.pathname;

  //     const payload = {
  //       path: pagePath,
  //       data: formData,
  //     };

  //     // console.log("Form Payload:", payload);
  //     const response = await axiosInstance.post(
  //       "/admin/formDetails",
  //       payload
  //     );

  //      // Check API success
  //       if (response.data?.success === true) {
  //         setSubmitted(true);

  //         // Send response to parent
  //         if (onSubmitted) {
  //           onSubmitted(response.data);
  //         }
  //       } else {
  //         console.error("Form submission failed:", response.data);

  //         // Don't show submitted state
  //         setSubmitted(false);

  //         // Optional error message
  //         alert(response.data?.message)
  //         toast.error(response.data?.message || "Form submission failed");
  //       }

  //   } catch (error: any) {

  //     console.error(
  //       "Form Submit Error:",
  //       error.response?.data || error.message
  //     );

  //     setErrors({
  //       submit:
  //         error.response?.data?.error ||
  //         "Something went wrong. Please try again.",
  //     });

  //         toast.error( error.response?.data?.error ||
  //         "Something went wrong. Please try again.");

  //   } finally {

  //     setIsLoading(false);

  //   }
  // };

  const handleStepAction = async () => {
    const currentStepConfig = FORM_CONFIG.steps.find((s) => s.step === step);

    // Validate current step
    if (!validateStep(step)) {
      return;
    }

    // Check if current step has "submit" button or if it's the last step
    if (
      currentStepConfig?.button === "submit" ||
      step === FORM_CONFIG.steps.length
    ) {
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
    FORM_CONFIG.fields.forEach((field) => {
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
    return FORM_CONFIG.fields.filter((field) => field.step === stepNumber);
  };

  // Get current step fields
  const currentStepFields = getFieldsForStep(step);
  const currentStep = FORM_CONFIG.steps.find((s) => s.step === step);

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
    position: "bottom",
  };

  const SubmitIcon = submitConfig.icon;

  // Determine button text and icon based on step config
  const getButtonConfig = () => {
    const currentStepConfig = FORM_CONFIG.steps.find((s) => s.step === step);
    const isSubmit =
      currentStepConfig?.button === "submit" || step === totalSteps;

    return {
      text: isSubmit ? submitConfig.label || "Submit" : "Next",
      icon: isSubmit ? SubmitIcon : ArrowRight,
      action: handleStepAction,
    };
  };

  const buttonConfig = getButtonConfig();

  const renderSubmitButton = (position: string) => {
    if (
      submitConfig.position !== position &&
      submitConfig.position !== "both"
    ) {
      return null;
    }

    const sizeClasses = {
      small: "px-4 py-2 text-xs",
      medium: "px-6 py-3 text-sm",
      large: "px-8 py-4 text-base",
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
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
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
    router.push("/thank-you");
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
            {currentStep?.title && (
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${primaryColor}15` }}
                >
                  {currentStep && (
                    <currentStep.icon
                      className="w-4 h-4"
                      style={{ color: primaryColor }}
                    />
                  )}
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {currentStep?.title}
                </p>
              </div>
            )}

            {/* Dynamic Fields */}
            <div className=" grid grid-cols-2 gap-3">
              {currentStepFields.map((field) => {
                const gridClass =
                  field.grid === "half" ? "col-span-1" : "col-span-2";

                const hasError = !!errors[field.name];

                return (
                  <div key={field.name} className={gridClass}>
                    {/* ================= SELECT ================= */}
                    {field.type === "select" && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <select
                          name={field.name}
                          value={(formData[field.name] as string) || ""}
                          onChange={(e) =>
                            updateField(field.name, e.target.value)
                          }
                          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all ${
                            hasError
                              ? "border-red-500"
                              : "border-[#f36d45]/40 focus:border-[#f36d45]"
                          }`}
                          style={{
                            boxShadow: "none",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = hasError
                              ? "0 0 0 4px #ef444420"
                              : "0 0 0 4px #f36d4520";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          required={field.required}
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}

                        {formData[field.name] === "other" && (
                          <input
                            type="text"
                            name={field.other}
                            value={(formData[field.other] as string) || ""}
                            onChange={(e) =>
                              updateField(field.other, e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-[#f36d45]/40 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                          />
                        )}
                      </>
                    )}

                    {/* ================= TEXT ================= */}
                    {field.type === "text" && field.icon && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <div className="relative">
                          <field.icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f36d45]" />

                          <input
                            name={field.name}
                            type="text"
                            value={(formData[field.name] as string) || ""}
                            onChange={(e) =>
                              updateField(field.name, e.target.value)
                            }
                            className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                              hasError
                                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-[#f36d45]/40 focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                            }`}
                            required={field.required}
                          />
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= EMAIL ================= */}
                    {field.type === "email" && field.icon && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <div className="relative">
                          <field.icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f36d45]" />

                          <input
                            name={field.name}
                            type="email"
                            value={(formData[field.name] as string) || ""}
                            onChange={(e) =>
                              updateField(field.name, e.target.value)
                            }
                            className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                              hasError
                                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-[#f36d45]/40 focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                            }`}
                            required={field.required}
                          />
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= PHONE ================= */}
                    {field.type === "tel" && field.icon && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <div className="relative">
                          <field.icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f36d45]" />

                          <input
                            name={field.name}
                            type="tel"
                            inputMode="numeric"
                            minLength={10}
                            maxLength={10}
                            value={(formData[field.name] as string) || ""}
                            onChange={(e) => {
                              const digitsOnly = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);

                              updateField(field.name, digitsOnly);
                            }}
                            className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                              hasError
                                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-[#f36d45]/40 focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                            }`}
                            required={field.required}
                          />
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= NUMBER ================= */}
                    {field.type === "number" && field.icon && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <div className="relative">
                          <field.icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f36d45]" />

                          <input
                            name={field.name}
                            type="number"
                            value={(formData[field.name] as string) || ""}
                            onChange={(e) =>
                              updateField(field.name, e.target.value)
                            }
                            className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all ${
                              hasError
                                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-[#f36d45]/40 focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                            }`}
                            required={field.required}
                          />
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= DATE ================= */}
                    {field.type === "date" && field.icon && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <div className="relative">
                          <field.icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f36d45]" />

                          <input
                            name={field.name}
                            type="date"
                            value={(formData[field.name] as string) || ""}
                            onChange={(e) =>
                              updateField(field.name, e.target.value)
                            }
                            className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all ${
                              hasError
                                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-[#f36d45]/40 focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                            }`}
                            required={field.required}
                          />
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= TEXTAREA ================= */}
                    {field.type === "textarea" && (
                      <>
                        {field.label && (
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <textarea
                          name={field.name}
                          value={(formData[field.name] as string) || ""}
                          onChange={(e) =>
                            updateField(field.name, e.target.value)
                          }
                          rows={2}
                          placeholder={field.placeholder}
                          className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                            hasError
                              ? "border-red-500 focus:ring-4 focus:ring-red-100"
                              : "border-[#f36d45]/40 focus:border-[#f36d45] focus:ring-4 focus:ring-[#f36d4520]"
                          }`}
                          required={field.required}
                        />

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= BUTTON GROUP ================= */}
                    {field.type === "button-group" && (
                      <>
                        {field.label && (
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="ml-1 text-red-500">*</span>
                            )}
                          </label>
                        )}

                        <div className="grid grid-cols-3 gap-3">
                          {field.options?.map((option) => {
                            const OptionIcon = option.icon;

                            const isSelected =
                              formData[field.name] === option.value;

                            return (
                              <motion.button
                                key={option.value}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                  updateField(
                                    field.name,
                                    isSelected ? "" : option.value,
                                  )
                                }
                                className="rounded-xl border p-3 text-sm transition-all"
                                style={{
                                  background: isSelected
                                    ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                                    : "#fff",
                                  color: isSelected ? "#fff" : "#374151",
                                  borderColor: isSelected
                                    ? primaryColor
                                    : hasError
                                      ? "#ef4444"
                                      : "#f36d45",
                                  boxShadow: isSelected
                                    ? `0 4px 14px ${primaryColor}30`
                                    : "none",
                                }}
                              >
                                {OptionIcon && (
                                  <OptionIcon className="mx-auto mb-1 h-6 w-6" />
                                )}

                                {option.label}

                                {option.desc && (
                                  <p className="mt-1 text-xs opacity-80">
                                    {option.desc}
                                  </p>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}

                    {/* ================= CHECKBOX GROUP ================= */}
                    {field.type === "checkbox-group" && (
                      <>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {field.label}

                          <span className="ml-1 text-xs text-gray-400">
                            (select all that apply)
                          </span>

                          {field.required && (
                            <span className="ml-1 text-red-500">*</span>
                          )}
                        </label>

                        <div className="grid grid-cols-3 gap-2.5">
                          {field.options?.map((option) => {
                            const OptionIcon = option.icon;

                            const isSelected = (
                              (formData[field.name] as string[]) || []
                            ).includes(option.value);

                            return (
                              <motion.button
                                key={option.value}
                                type="button"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() =>
                                  toggleCheckboxGroup(field.name, option.value)
                                }
                                className={`
                      group flex w-full items-center gap-3
                      rounded-xl border px-3 py-3
                      text-left transition-all duration-200
                      ${
                        isSelected
                          ? "border-[#f36d45]/40 bg-[#fff7f4]"
                          : hasError
                            ? "border-red-400 bg-white"
                            : "border-[#f36d45]/40 bg-white hover:bg-[#fff7f4]"
                      }
                    `}
                              >
                                {/* Checkbox */}
                                <span
                                  className={`
                        flex h-4 w-4 shrink-0 items-center
                        justify-center rounded-[4px] border
                        transition-all duration-200
                        ${
                          isSelected
                            ? "border-[#f36d45] bg-[#f36d45]"
                            : "border-[#f36d45]/40 bg-white"
                        }
                      `}
                                >
                                  {isSelected && (
                                    <svg
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      className="h-3 w-3 text-white"
                                    >
                                      <path
                                        d="M2.5 6L5 8.5L9.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </span>

                                {/* Icon */}
                                {OptionIcon && (
                                  <OptionIcon
                                    className={`
                          h-4 w-4 shrink-0
                          ${isSelected ? "text-[#f36d45]" : "text-gray-500"}
                        `}
                                  />
                                )}

                                {/* Label */}
                                <span
                                  className={`
                        text-sm font-medium
                        ${isSelected ? "text-[#d95732]" : "text-gray-700"}
                      `}
                                >
                                  {option.label}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>

                        {hasError && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[field.name]}
                          </p>
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
        <div
          className={`flex ${FORM_CONFIG.steps.length > 1 ? "justify-start" : "justify-start"} gap-4 mt-2  `}
        >
          {step > 1 && (
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
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={buttonConfig.action}
            className="px-8 py-3 text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl
             flex items-center gap-2 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor})`,
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
