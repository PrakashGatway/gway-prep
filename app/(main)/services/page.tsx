"use client";

import {
  ChevronDown,
  CircleCheckBig,
  CircleX,
  Play,
  PlayCircle,
  Star,
  GraduationCap,
  FileCheck,
  Globe,
  Users,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  Rocket,
  Target,
  BookOpen,
  PenTool,
  Shield,
  ThumbsUp,
  TrendingUp,
  Calendar,
  MapPin,
  Building,
  Briefcase,
  Headphones,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect, useRef } from "react";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { getStudent } from "@/app/services/api";

// ========== ANIMATED COUNTER ==========
function AnimatedCounter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-[#F86C43]">
        {count}{suffix}
      </div>
      <p className="text-gray-600 mt-2 font-medium">{label}</p>
    </div>
  );
}

// ========== SERVICE FEATURE CARD (Enhanced with glassmorphism) ==========
function ServiceFeatureCard({ feature, index }: { feature: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -80]);

  return (
    <div
      ref={ref}
      className="h-[50vh] sticky top-24 flex items-center justify-center"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, opacity, y }}
        className={`w-full max-w-6xl rounded-[50px] overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm
          ${index % 2 === 0 ? "bg-gradient-to-br from-[#FEFBEA] to-[#FFF8E7]" : "bg-gradient-to-br from-[#FDF4EF] to-[#FFF5ED]"}
          flex flex-col lg:flex-row items-center transition-all duration-500 hover:shadow-3xl`}
      >
        {/* Image with overlay gradient */}
        <div className="w-full lg:w-1/2 px-4 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F86C43]/10 to-transparent rounded-[50px] lg:rounded-l-[50px]"></div>
          {feature.image && (
            <img
              src={feature.image}
              alt={feature.heading}
              className="w-full h-[380px] lg:h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-700"
            />
          )}
          {/* Floating badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-xs font-semibold text-[#F86C43] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Premium Service
            </span>
          </div>
        </div>

        {/* Content with enhanced typography */}
        <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-12 h-1 bg-[#F86C43] rounded-full"></span>
            <span className="text-[#F86C43] font-semibold uppercase tracking-widest text-sm">
              Service {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h2 className="text-4xl lg:text-4xl font-bold mb-6 leading-tight text-[#2d2d2d]">
            {feature.heading}
          </h2>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {feature.content}
          </p>

          <div className="flex items-center gap-4">
            <button className="group bg-[#F86C43] hover:bg-[#e05626] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-200/50 hover:shadow-orange-300/70 hover:scale-105">
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-[#F86C43] font-medium hover:text-[#e05626] transition-colors flex items-center gap-1">
              Watch Demo <PlayCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ========== HERO SECTION (Enhanced) ==========
function ServiceHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF4EF] via-white to-[#FEFBEA]">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F86C43]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F86C43]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#F86C43]/10 text-[#F86C43] px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Premium Services
              </span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-500 text-sm">Trusted by 10,000+ students</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#2d2d2d]">
              Your <span className="text-[#F86C43]">Dream</span> University
              <br />
              <span className="relative">
                Starts Here
                <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q25 0 50 5 T100 5" stroke="#F86C43" strokeWidth="3" fill="none" opacity="0.3"/>
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-[#555] text-lg leading-relaxed">
              From test preparation to visa approval, we provide end-to-end guidance 
              with personalized support at every step of your study abroad journey.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 mt-8">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">4.9/5 from 2,000+ reviews</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="group bg-[#F86C43] hover:bg-[#e05626] text-white px-8 py-4 rounded-full font-semibold text-base shadow-xl shadow-orange-200/50 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-orange-300/70">
                Get Free Consultation <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="bg-white hover:bg-gray-50 text-[#2d2d2d] px-8 py-4 rounded-full font-semibold border border-gray-200 shadow-sm transition-all duration-300 flex items-center gap-2 hover:shadow-md">
                <PlayCircle className="w-5 h-5 text-[#F86C43]" /> Watch Overview
              </button>
            </div>
          </motion.div>

          {/* Right Form - Enhanced with glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/50">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#2d2d2d]">Speak to an Expert</h3>
                <p className="text-gray-500 text-sm mt-1">Get personalized guidance in 24 hours</p>
              </div>

              <form className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#F86C43] focus:ring-2 focus:ring-orange-100 transition-all bg-white/50"
                  />
                </div>

                <div className="flex">
                  <div className="w-24 border border-gray-200 rounded-l-xl flex items-center justify-center gap-1 bg-gray-50 text-sm px-2">
                    🇮🇳 +91
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    className="flex-1 border border-l-0 border-gray-200 rounded-r-xl px-4 py-3.5 outline-none focus:border-[#F86C43] focus:ring-2 focus:ring-orange-100 transition-all bg-white/50"
                  />
                </div>

                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#F86C43] focus:ring-2 focus:ring-orange-100 transition-all bg-white/50"
                />

                <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#F86C43] focus:ring-2 focus:ring-orange-100 transition-all bg-white/50 appearance-none">
                  <option>Interested in?</option>
                  <option>Study Abroad</option>
                  <option>Test Prep (GRE/GMAT/IELTS/TOEFL)</option>
                  <option>Application Assistance</option>
                  <option>Visa Guidance</option>
                </select>

                <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#F86C43] focus:ring-2 focus:ring-orange-100 transition-all bg-white/50 appearance-none">
                  <option>Preferred Country</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" defaultChecked className="accent-[#F86C43] w-4 h-4" />
                  Stay informed via SMS & WhatsApp
                </label>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#F86C43] to-[#e05626] hover:from-[#e05626] hover:to-[#c94a1f] transition-all text-white font-semibold py-4 rounded-xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300/70 transform hover:scale-[1.02] transition-all duration-300"
                >
                  Schedule a Free Call
                </button>

                <p className="text-center text-xs text-gray-400 mt-2">
                  🚀 100% free · No spam · Expert advice guaranteed
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ========== SERVICES OVERVIEW (Enhanced with hover cards) ==========
function ServicesOverview() {
  const servicesData = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Test Preparation",
      description: "Expert coaching for GRE, GMAT, IELTS, TOEFL with personalized study plans and official ETS materials.",
      color: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-100",
      iconColor: "text-[#F86C43]"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Application Strategy",
      description: "University selection, essay editing, LOR guidance, and comprehensive interview preparation.",
      color: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Visa Assistance",
      description: "Complete visa application support, mock interviews, and up-to-date documentation guidance.",
      color: "from-green-50 to-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Profile Building",
      description: "Internships, research opportunities, and extracurricular planning to strengthen your profile.",
      color: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Career Counseling",
      description: "Industry insights, resume building, and career path guidance for your target field.",
      color: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Scholarship Guidance",
      description: "Identify and apply for scholarships, assistantships, and financial aid opportunities.",
      color: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 text-[#2d2d2d]">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-16 h-0.5 bg-[#F86C43]"></span>
          <span className="text-[#F86C43] font-semibold uppercase tracking-widest text-sm">Our Services</span>
          <span className="w-16 h-0.5 bg-[#F86C43]"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Comprehensive <span className="text-[#F86C43]">Support</span> for Your Journey
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg">
          We provide end-to-end guidance across every aspect of your study abroad journey
        </p>
      </motion.div>

      {/* Services Grid - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 hover:border-[#F86C43]/20 hover:-translate-y-2"
          >
            {/* Gradient hover effect */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative z-10">
              <div className={`${service.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`${service.iconColor}`}>{service.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#F86C43] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-[#F86C43] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Row */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-10 bg-gradient-to-r from-[#FDF4EF] to-[#FEFBEA] rounded-3xl"
      >
        <AnimatedCounter target={10000} label="Students Guided" suffix="+" />
        <AnimatedCounter target={98} label="Visa Success Rate" suffix="%" />
        <AnimatedCounter target={500} label="University Partners" suffix="+" />
        <AnimatedCounter target={4.9} label="Average Rating" suffix="★" />
      </motion.div>
    </section>
  );
}

// ========== PROCESS SECTION ==========
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Free Consultation",
      description: "Speak with our experts to understand your goals and create a personalized roadmap.",
      icon: <MessageSquare className="w-8 h-8" />
    },
    {
      number: "02",
      title: "Assessment & Planning",
      description: "Evaluate your current standing and develop a comprehensive preparation strategy.",
      icon: <Target className="w-8 h-8" />
    },
    {
      number: "03",
      title: "Execution & Support",
      description: "Get ongoing guidance, resources, and mentorship throughout your journey.",
      icon: <ThumbsUp className="w-8 h-8" />
    },
    {
      number: "04",
      title: "Success & Beyond",
      description: "Achieve your goals and receive continued support for your academic journey.",
      icon: <Rocket className="w-8 h-8" />
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-16 h-0.5 bg-[#F86C43]"></span>
          <span className="text-[#F86C43] font-semibold uppercase tracking-widest text-sm">How It Works</span>
          <span className="w-16 h-0.5 bg-[#F86C43]"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Your <span className="text-[#F86C43]">Journey</span> in 4 Simple Steps
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-20 left-[12.5%] w-[75%] h-0.5 bg-gray-200">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#F86C43] via-[#F86C43] to-transparent"></div>
        </div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 hover:border-[#F86C43]/20 hover:-translate-y-2 group">
              {/* Step number */}
              <div className="text-6xl font-extrabold text-gray-100 group-hover:text-[#F86C43]/10 transition-colors absolute top-4 right-4">
                {step.number}
              </div>
              
              <div className="w-20 h-20 bg-[#F86C43]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F86C43] group-hover:scale-110 transition-all duration-300">
                <div className="text-[#F86C43] group-hover:text-white transition-colors">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ========== COMPARISON TABLE (Enhanced) ==========
function ServiceComparisonTable() {
  const data = {
    title: "Why Choose Ooshas?",
    subtitle: "We deliver exceptional value with unmatched expertise and personalized attention",
    headers: ["Feature", "Ooshas", "Others"],
    rows: [
      {
        feature: "Official Test Materials",
        ooshas: "✅ Licensed ETS materials",
        others: "❌ Third-party only"
      },
      {
        feature: "Personalized Study Plans",
        ooshas: "✅ AI-powered adaptive learning",
        others: "❌ One-size-fits-all"
      },
      {
        feature: "Expert Mentorship",
        ooshas: "✅ 1-on-1 with top scorers",
        others: "❌ Group sessions only"
      },
      {
        feature: "Application Support",
        ooshas: "✅ End-to-end guidance",
        others: "❌ Limited assistance"
      },
      {
        feature: "Visa Success Rate",
        ooshas: "✅ 98% success rate",
        others: "❌ Industry average 70%"
      },
      {
        feature: "Scholarship Assistance",
        ooshas: "✅ Dedicated counselor",
        others: "❌ Generic advice"
      }
    ]
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-16 h-0.5 bg-[#F86C43]"></span>
          <span className="text-[#F86C43] font-semibold uppercase tracking-widest text-sm">Comparison</span>
          <span className="w-16 h-0.5 bg-[#F86C43]"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-[#F86C43]">Why</span> Choose Us
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4">{data.subtitle}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full overflow-x-auto rounded-3xl border border-gray-200 shadow-xl bg-white"
      >
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#F86C43] to-[#e05626] text-white">
              {data.headers.map((header, idx) => (
                <th
                  key={idx}
                  className={`py-4 px-6 font-bold text-sm tracking-wide ${idx < data.headers.length - 1 ? 'border-r border-orange-400/30' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
              >
                <td className="py-4 px-6 border-r border-gray-100 font-semibold text-gray-800">
                  {row.feature}
                </td>
                <td className="py-4 px-6 border-r border-gray-100 text-[#F86C43] font-medium">
                  {row.ooshas}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {row.others}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}

// ========== CTA BANNER (Enhanced) ==========
function CtaBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-r from-[#F86C43] to-[#e05626] rounded-[50px] p-12 md:p-16 text-white"
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-widest text-white/80">Limited Time Offer</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Ready to Start Your <br />
              <span className="text-white/90">Study Abroad Journey?</span>
            </h2>
            <p className="mt-4 text-white/80 text-lg max-w-md">
              Book your free consultation today and get personalized guidance from our experts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-[#F86C43] hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group">
              Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white/50 hover:border-white px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm">
              Call Us: +91 98765 43210
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ========== MAIN SERVICE PAGE ==========
export default function Services({ pageInfo }: { pageInfo: any }) {
  const [studentsData, setStudentsData] = useState<any[]>([]);

  // Imported components (adjust paths as needed)
  const Aboutresult = ({ data }: any) => (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#FDF4EF] rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-center">Student Success Stories</h3>
        <p className="text-center text-gray-600 mt-2">Real results from real students</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {/* {data?.slice(0, 4).map((student: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="w-16 h-16 bg-[#F86C43]/10 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-[#F86C43]">
                {student?.name?.[0] || "A"}
              </div>
              <p className="font-semibold mt-2 text-sm">{student?.name || "Student"}</p>
              <p className="text-xs text-gray-500">{student?.university || "University"}</p>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );

  const TextTestimonials = () => (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="bg-[#FEFBEA] rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-bold">What Our Students Say</h3>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          "Ooshas transformed my study abroad journey. From GRE prep to visa approval, 
          they were with me every step of the way."
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="font-semibold mt-2">Priya Sharma</p>
        <p className="text-sm text-gray-500">MIT Graduate Student</p>
      </div>
    </section>
  );

  const PricingSection = ({ plans }: any) => (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`bg-white rounded-3xl p-8 shadow-lg border ${i === 2 ? 'border-[#F86C43] shadow-2xl' : 'border-gray-100'} hover:shadow-2xl transition-shadow`}>
            <h4 className="text-xl font-bold">{i === 1 ? 'Basic' : i === 2 ? 'Pro' : 'Premium'}</h4>
            <div className="mt-4">
              <span className="text-4xl font-bold">${i === 1 ? '99' : i === 2 ? '199' : '299'}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {['Feature 1', 'Feature 2', i > 1 ? 'Feature 3' : null, i > 2 ? 'Feature 4' : null].filter(Boolean).map((f, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <CircleCheckBig className="w-4 h-4 text-[#F86C43]" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full mt-8 py-3 rounded-full font-semibold transition-all ${i === 2 ? 'bg-[#F86C43] text-white hover:bg-[#e05626]' : 'border-2 border-[#F86C43] text-[#F86C43] hover:bg-[#F86C43] hover:text-white'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  const Consultants = ({ data }: any) => (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="bg-[#FDF4EF] rounded-3xl p-12">
        <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {['How do I get started?', 'What services do you offer?', 'How long does the process take?', 'Do you offer refunds?'].map((q, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
              <button className="flex items-center justify-between w-full text-left font-semibold">
                <span>{q}</span>
                <ChevronDown className="w-5 h-5 text-[#F86C43]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Load students
  useEffect(() => {
    let mounted = true;
    const displayStudents = async () => {
      try {
        const data = await getStudent("", 1, 8);
        if (mounted) setStudentsData(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    displayStudents();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* Hero */}
      <ServiceHero />

      {/* About Result */}
      <Aboutresult data={studentsData || []} />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Process Section */}
      <ProcessSection />

      {/* Service Features (Sticky Scroll) */}
      <section className="px-4 bg-white py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-16 h-0.5 bg-[#F86C43]"></span>
              <span className="text-[#F86C43] font-semibold uppercase tracking-widest text-sm">Features</span>
              <span className="w-16 h-0.5 bg-[#F86C43]"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-[#F86C43]">Signature</span> Services
            </h2>
          </motion.div>

          <div className="relative p-2">
            {[
              {
                heading: "AI-Powered Test Preparation",
                content: "Leverage cutting-edge AI to create personalized study plans, track progress, and identify areas for improvement. Get real-time feedback and adaptive practice tests that mirror the actual exam.",
                image: "/services/test-prep.png"
              },
              {
                heading: "Comprehensive Application Support",
                content: "From university selection to essay crafting and interview preparation, our experts guide you through every step. Get personalized feedback on your applications from former admissions officers.",
                image: "/services/applications.png"
              },
              {
                heading: "End-to-End Visa Guidance",
                content: "Navigate the complex visa process with confidence. Our team provides document preparation, mock interviews, and up-to-date policy insights to ensure a smooth visa approval process.",
                image: "/services/visa.png"
              }
            ].map((feature, index) => (
              <ServiceFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ServiceComparisonTable />

      {/* CTA Banner */}
      <CtaBanner />

      {/* Pricing */}
      <PricingSection plans={{}} />

      {/* Testimonials */}
      <TextTestimonials />

      {/* Consultants / FAQ */}
      <Consultants data={{}} />
      <Consultants />
    </>
  );
}

