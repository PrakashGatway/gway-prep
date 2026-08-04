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
  options?: Array<{ value: string; label: string; icon?: any; desc?: string }>;
  step: number;
  grid?: "full" | "half" | "third";
  icon?: any;
};

type StepConfig = {
  step: number;
  title: string;
  icon: any;
  fields: string[];
  button : string;
};

type SubmitConfig = {
  label: string;
  icon?: any;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
  position?: "bottom" | "top" | "both";
  onSuccess?: {
    message: string;
    redirect?: string;
  };
};

interface FormConfigType {
  steps: StepConfig[];
  fields: FieldConfig[];
  submit?: SubmitConfig;
}

const FORM_CONFIG: FormConfigType = {
  steps: [
    {
      step: 1,
      title: "",
      icon: User,
      fields: ["fullName", "email", "phone", "city", "age", "profile", "source"],
      button: "next"
    },
    {
      step: 2,
      title: "Exam Details",
      icon: BookOpen,
      fields: ["exam", "purpose", "targetScore", "examDate", "attempts"],
      button: "next"
    },
    {
      step: 3,
      title: "Current Level & Preferences",
      icon: BarChart,
      fields: ["englishLevel", "weakAreas", "batchType", "startTimeline", "notes"],
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
  ],
  submit: {
    label: "Submit Application",
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

export function RegistrationSection({ data }: any) {
  const primaryColor = "#f26e46";

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
        {/* Left Side - Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block lg:w-1/2 bg-[#F8F8F8] rounded-2xl px-6 py-19 border border-gray-100"
        >
          <div className="relative">
            <img
              src={data?.fields?.Formsection ?? "/home/1.png"}
              alt="Registration"
              className="relative w-full h-[60%]"
            />
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Optional: Add a header above the form */}
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Register Now
              </h2>
              <p className="text-gray-600">
                Fill in your details and our team will reach out to you
              </p>
            </div>

            <div className="bg-white border-2 rounded-lg  p-4">
              <FormSection FORM_CONFIG={FORM_CONFIG} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}