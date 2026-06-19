"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Target, 
  Clock, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Lock,
  Star,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Home,
  Search,
  Instagram,
  Facebook,
  Youtube,
  Share2,
  FileText,
  ClipboardCheck,
  BarChart,
  TrendingUp,
  Book,
  PenTool,
  Headphones,
  MessageSquare,
  Hash,
  Calculator,
  Sun,
  Moon,
  Monitor,
  Zap,
  Calendar as CalendarIcon,
  Globe,
  Building,
  UserCheck,
  Users as UsersIcon
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type FormData = {
  [key: string]: string | string[];
};

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea" | "checkbox-group" | "button-group";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string; icon?: any }>;
  step: number;
  grid?: "full" | "half" | "third";
  icon?: any;
};

type StepConfig = {
  step: number;
  title: string;
  icon: any;
  fields: string[];
};

/* ------------------------------------------------------------------ */
/* Form Configuration - JSON                                          */
/* ------------------------------------------------------------------ */
const FORM_CONFIG = {
  steps: [
    {
      step: 1,
      title: "Personal Information",
      icon: User,
      fields: ["firstName", "lastName", "email", "phone", "city", "age", "profile", "source"]
    },
    {
      step: 2,
      title: "Exam Details",
      icon: BookOpen,
      fields: ["exam", "purpose", "targetScore", "examDate", "attempts"]
    },
    {
      step: 3,
      title: "Current Level & Preferences",
      icon: BarChart,
      fields: ["englishLevel", "weakAreas", "batchType", "startTimeline", "notes"]
    }
  ],
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      placeholder: "Priya",
      step: 1,
      grid: "half",
      icon: User
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      placeholder: "Mehta",
      step: 1,
      grid: "half",
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
      grid: "half",
      icon: MapPin
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: false,
      placeholder: "24",
      step: 1,
      grid: "half",
      icon: Calendar
    },
    {
      name: "profile",
      label: "Current Profile",
      type: "select",
      required: false,
      step: 1,
      grid: "full",
      options: [
        { value: "", label: "Select your profile" },
        { value: "School student", label: "School student" },
        { value: "Undergraduate student", label: "Undergraduate student" },
        { value: "Recent graduate", label: "Recent graduate" },
        { value: "Working professional", label: "Working professional" },
        { value: "Homemaker", label: "Homemaker" }
      ]
    },
    {
      name: "source",
      label: "How did you hear about us?",
      type: "select",
      required: false,
      step: 1,
      grid: "full",
      options: [
        { value: "", label: "Select source" },
        { value: "Google Search", label: "Google Search" },
        { value: "Instagram", label: "Instagram" },
        { value: "Facebook", label: "Facebook" },
        { value: "YouTube", label: "YouTube" },
        { value: "Friend Referral", label: "Friend Referral" },
        { value: "Education Fair", label: "Education Fair" },
        { value: "Walk-in", label: "Walk-in" },
        { value: "Other", label: "Other" }
      ]
    },
    {
      name: "exam",
      label: "Target Exam",
      type: "button-group",
      required: true,
      step: 2,
      grid: "full",
      options: [
        { value: "IELTS", label: "IELTS", icon: Book },
        { value: "TOEFL", label: "TOEFL", icon: FileText },
        { value: "PTE", label: "PTE", icon: PenTool },
        { value: "GRE", label: "GRE", icon: TrendingUp },
        { value: "GMAT", label: "GMAT", icon: Briefcase },
        { value: "SAT", label: "SAT", icon: Calculator }
      ]
    },
    {
      name: "purpose",
      label: "Purpose",
      type: "select",
      required: false,
      step: 2,
      grid: "full",
      options: [
        { value: "", label: "Select purpose" },
        { value: "Study Abroad", label: "Study Abroad" },
        { value: "Job / PR Visa", label: "Job / PR Visa" },
        { value: "MBA Admission", label: "MBA Admission" },
        { value: "English Proficiency", label: "English Proficiency" }
      ]
    },
    {
      name: "targetScore",
      label: "Target Score",
      type: "text",
      required: false,
      placeholder: "e.g. IELTS 7.5, GRE 320",
      step: 2,
      grid: "full",
      icon: Target
    },
    {
      name: "examDate",
      label: "Exam Date",
      type: "date",
      required: false,
      step: 2,
      grid: "full",
      icon: CalendarIcon
    },
    {
      name: "attempts",
      label: "Previous Attempts",
      type: "select",
      required: false,
      step: 2,
      grid: "full",
      options: [
        { value: "", label: "Select attempts" },
        { value: "First attempt", label: "First attempt" },
        { value: "Second attempt", label: "Second attempt" },
        { value: "Third attempt or more", label: "Third attempt or more" }
      ]
    },
    {
      name: "englishLevel",
      label: "English Level",
      type: "button-group",
      required: false,
      step: 3,
      grid: "full",
      options: [
        { value: "Beginner", label: "Beginner", icon: Book, desc: "Just starting" },
        { value: "Intermediate", label: "Intermediate", icon: TrendingUp, desc: "Can communicate" },
        { value: "Upper-Intermediate", label: "Upper-Intermediate", icon: Award, desc: "Good command" },
        { value: "Advanced", label: "Advanced", icon: Star, desc: "Fluent speaker" }
      ]
    },
    {
      name: "weakAreas",
      label: "Weak Areas",
      type: "checkbox-group",
      required: false,
      step: 3,
      grid: "full",
      options: [
        { value: "Reading", label: "Reading", icon: Book },
        { value: "Writing", label: "Writing", icon: PenTool },
        { value: "Listening", label: "Listening", icon: Headphones },
        { value: "Speaking", label: "Speaking", icon: MessageSquare },
        { value: "Verbal", label: "Verbal", icon: Hash },
        { value: "Quant/Math", label: "Quant/Math", icon: Calculator }
      ]
    },
    {
      name: "batchType",
      label: "Preferred Batch",
      type: "select",
      required: false,
      step: 3,
      grid: "full",
      options: [
        { value: "", label: "Select batch type" },
        { value: "Weekday Morning", label: "Weekday Morning" },
        { value: "Weekday Evening", label: "Weekday Evening" },
        { value: "Weekend", label: "Weekend" },
        { value: "Online", label: "Online" }
      ]
    },
    {
      name: "startTimeline",
      label: "Start Timeline",
      type: "select",
      required: false,
      step: 3,
      grid: "full",
      options: [
        { value: "", label: "Select timeline" },
        { value: "Immediately (within 1 week)", label: "Immediately (within 1 week)" },
        { value: "Within 2-4 weeks", label: "Within 2-4 weeks" },
        { value: "Within 1-2 months", label: "Within 1-2 months" },
        { value: "Just exploring", label: "Just exploring" }
      ]
    },
    {
      name: "notes",
      label: "Additional Notes",
      type: "textarea",
      required: false,
      placeholder: "Any specific requirements or questions...",
      step: 3,
      grid: "full"
    }
  ]
};

/* ------------------------------------------------------------------ */
/* Main Form Component                                                 */
/* ------------------------------------------------------------------ */
export function RegistrationSection({ data }: any) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
  };

  const toggleCheckboxGroup = (fieldName: string, value: string) => {
    const currentValues = formData[fieldName] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFormData((prev) => ({ ...prev, [fieldName]: newValues }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, FORM_CONFIG.steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const jsonData = JSON.stringify(formData, null, 2);
    console.log("Form JSON:", jsonData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
  };

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
  };

  const getFieldsForStep = (stepNumber: number) => {
    return FORM_CONFIG.fields.filter(field => field.step === stepNumber);
  };

  // Get current step fields
  const currentStepFields = getFieldsForStep(step);
  const currentStep = FORM_CONFIG.steps.find(s => s.step === step);

  // Get total steps
  const totalSteps = FORM_CONFIG.steps.length;

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Our counsellor will contact you within 24 hours.
          </p>
          <div className="flex justify-center gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${primaryColor}15` }}
            >
              <Phone className="w-5 h-5" style={{ color: primaryColor }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${primaryColor}15` }}
            >
              <Mail className="w-5 h-5" style={{ color: primaryColor }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${primaryColor}15` }}
            >
              <MessageSquare className="w-5 h-5" style={{ color: primaryColor }} />
            </motion.div>
          </div>
          <button
            onClick={restart}
            className="px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
          >
            Submit Another Enquiry
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-34 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Left Side - Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block lg:w-1/2 sticky top-32"
        >
          <div className="relative">
            <img
              src={data?.fields?.Formsection ?? "/home/1.png"}
              alt="Registration"
              className="relative w-full h-auto rounded-2xl shadow-2xl"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                  <Target className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">98% Success Rate</p>
                  <p className="text-xs text-gray-600">In First Attempt</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                  <Star className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">4.9 Rating</p>
                  <p className="text-xs text-gray-600">By 10,000+ Students</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                Limited Seats Available
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Let Our Team Reach Out To You
              </h1>
              <p className="text-gray-600 text-lg">
                Start your journey to success today
              </p>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                        {currentStep && <currentStep.icon className="w-4 h-4" style={{ color: primaryColor }} />}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{currentStep?.title}</h3>
                    </div>

                    {/* Dynamic Fields */}
                    <div className="space-y-4">
                      {currentStepFields.map((field) => {
                        const gridClass = field.grid === "half" ? "col-span-1" : "col-span-2";
                        
                        return (
                          <div key={field.name} className={gridClass}>
                            {field.type === "select" && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <select
                                  value={formData[field.name] as string || ""}
                                  onChange={(e) => updateField(field.name, e.target.value)}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white"
                                  style={{ borderColor: "#e5e7eb" }}
                                  onFocus={(e) => {
                                    e.target.style.borderColor = primaryColor;
                                    e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.borderColor = "#e5e7eb";
                                    e.target.style.boxShadow = "none";
                                  }}
                                  required={field.required}
                                >
                                  {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}

                            {field.type === "text" && field.icon && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <div className="relative">
                                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <input
                                    type="text"
                                    value={formData[field.name] as string || ""}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white"
                                    style={{ borderColor: "#e5e7eb" }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = primaryColor;
                                      e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = "#e5e7eb";
                                      e.target.style.boxShadow = "none";
                                    }}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                  />
                                </div>
                              </>
                            )}

                            {field.type === "email" && field.icon && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <div className="relative">
                                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <input
                                    type="email"
                                    value={formData[field.name] as string || ""}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white"
                                    style={{ borderColor: "#e5e7eb" }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = primaryColor;
                                      e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = "#e5e7eb";
                                      e.target.style.boxShadow = "none";
                                    }}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                  />
                                </div>
                              </>
                            )}

                            {field.type === "tel" && field.icon && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <div className="relative">
                                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <input
                                    type="tel"
                                    value={formData[field.name] as string || ""}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white"
                                    style={{ borderColor: "#e5e7eb" }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = primaryColor;
                                      e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = "#e5e7eb";
                                      e.target.style.boxShadow = "none";
                                    }}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                  />
                                </div>
                              </>
                            )}

                            {field.type === "number" && field.icon && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <div className="relative">
                                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <input
                                    type="number"
                                    value={formData[field.name] as string || ""}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white"
                                    style={{ borderColor: "#e5e7eb" }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = primaryColor;
                                      e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = "#e5e7eb";
                                      e.target.style.boxShadow = "none";
                                    }}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                  />
                                </div>
                              </>
                            )}

                            {field.type === "date" && field.icon && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <div className="relative">
                                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <input
                                    type="date"
                                    value={formData[field.name] as string || ""}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white"
                                    style={{ borderColor: "#e5e7eb" }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = primaryColor;
                                      e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = "#e5e7eb";
                                      e.target.style.boxShadow = "none";
                                    }}
                                    required={field.required}
                                  />
                                </div>
                              </>
                            )}

                            {field.type === "textarea" && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <textarea
                                  value={formData[field.name] as string || ""}
                                  onChange={(e) => updateField(field.name, e.target.value)}
                                  rows={4}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all bg-gray-50 hover:bg-white resize-none"
                                  style={{ borderColor: "#e5e7eb" }}
                                  onFocus={(e) => {
                                    e.target.style.borderColor = primaryColor;
                                    e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`;
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.borderColor = "#e5e7eb";
                                    e.target.style.boxShadow = "none";
                                  }}
                                  placeholder={field.placeholder}
                                  required={field.required}
                                />
                              </>
                            )}

                            {field.type === "button-group" && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
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
                                        className="p-3 rounded-xl border-2 font-semibold text-sm transition-all"
                                        style={{
                                          background: isSelected 
                                            ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                                            : "#f9fafb",
                                          color: isSelected ? "white" : "#374151",
                                          borderColor: isSelected ? "transparent" : "#e5e7eb",
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
                              </>
                            )}

                            {field.type === "checkbox-group" && (
                              <>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                                          borderColor: isSelected ? "transparent" : "#e5e7eb",
                                          boxShadow: isSelected ? `0 4px 14px ${primaryColor}40` : "none"
                                        }}
                                      >
                                        {OptionIcon && <OptionIcon className="w-4 h-4" />}
                                        {option.label}
                                      </motion.button>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
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

                  {step < totalSteps ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                      style={{ 
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                      }}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                          Submit Enquiry
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// "use client"

// import Image from "next/image"
// import { useEffect, useState } from "react"

// const images = [
//   "https://t3.ftcdn.net/jpg/06/23/84/22/360_F_623842281_ECGgEpMEkQdH83gbmexIn5l3ACl7V3M0.jpg",
//   "https://img.freepik.com/premium-photo/young-handsome-man-pointing-camera-choosing-you-university-student-concept_1194-262936.jpg",
//   "https://as2.ftcdn.net/jpg/05/29/12/57/1000_F_529125762_omW1yTehDLLFJKwLJjRET0G3sXiQnK5g.jpg",
// ]

// const formdata = [
//   {
//     type: 'text',
//     placeholder: 'First Name' 
//   },
//   {
//     type: 'text',
//     placeholder: 'Last Name' 
//   },
//   {
//     type: 'email',
//     placeholder: 'Email Id'
//   },
//   {
//     type: 'tel',
//     placeholder: 'Mobile Number'
//   },
//   {
//     type: 'option',
//     placeholder:'Preferred Destination',
//     options: ['USA', 'UK', 'Canada', 'Australia', 'Germany']
//   },

//   {
//     type: 'text',
//     placeholder: 'Course' 
//   },
//   {
//     type: 'month',
//     placeholder:'When do you plan to study'
//   },

//   {
//     type: 'year',
//     placeholder:'Your Preferred Year'
//   }
// ]

// export function RegistrationSection({data}:{data : any}) {

//   const [index, setIndex] = useState(0)

//   // AUTO SLIDE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length)
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])


//   return (
//     <section className="py-8 sm:py-10 lg:py-12 bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
//   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
    
//     <div>
//         <img src={data.fields.img ?? "/home/1.png"} alt="img"  />
//     </div>

//     <div className=" w-full">
//       <div className=" rounded-2xl sm:rounded-3xl text-black lg:rounded-[32px] p-6 sm:p-7 lg:p-8  
//       ">
//         <h3 className=" font-bold  text-xl sm:text-2xl mb-10 uppercase">
//           Let Our Team Reach Out To You
//         </h3>

//         <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         
//           {formdata.map((ele, index) => (
//              <div key={index} className="col-span-1">
//               <label htmlFor={ele.placeholder} className="text-gray-600 my-2 px-1">{ele.placeholder}</label>
//               {ele.type === 'option' ? (
//                 <select className="w-full border-gray-300 border-2 rounded-lg px-3 py-2 ">
//                   <option value="" disabled hidden>{ele.placeholder}</option>
//                   {ele?.options?.map((option, idx) => (<option key={idx} value={option}>{option}</option>))}
//                 </select>
//               ):
//               (
//                 <input type={ele.type} placeholder={ele.placeholder} className="w-full border-gray-300 rounded-lg px-3 py-2 border-2" /> 
//               )
//               }
//               </div>
//           ))}
        
//           <button
//             type="submit"
//             className="w-full bg-[#F36C45] text-white mt-4 font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl tracking-widest 
//             hover:opacity-90 transition text-sm sm:text-base"
//           >
//             SUBMIT
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
//   )
// }







