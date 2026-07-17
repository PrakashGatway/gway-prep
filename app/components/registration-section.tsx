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
import FormSection from "./formSection";

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


const FORM_CONFIG = {
  steps: [
    {
      step: 1,
      title: "Share Your Info & Let Our Team Reach Out",
      icon: User,
      fields: ["fullName", "email", "phone", "city", "age", "profile", "source"]
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
      grid: "half",
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
      grid: "half",
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
            className="px-6 py-2 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
          >
            Submit Another Enquiry
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="  py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
        {/* Left Side - Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block lg:w-1/2 bg-[#F8F8F8] rounded-2xl px-6 py-19 border border-gray-100"
        >
          <div className="relative ">
            <img
              src={data?.fields?.Formsection ?? "/home/1.png"}
              alt="Registration"
              className="relative w-full h-[60%] "
            />
            {/* <motion.div
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
            </motion.div> */}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
         


            <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-100">
              <FormSection  FORM_CONFIG={FORM_CONFIG}/>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
