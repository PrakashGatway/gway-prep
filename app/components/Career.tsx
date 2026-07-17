"use client"

import { useState } from 'react';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Heart, 
  GraduationCap, 
  Code, 
  Target, 
  Calendar, 
  BookOpen, 
  Home, 
  FileText, 
  Handshake, 
  Megaphone, 
  Star 
} from 'lucide-react';
import { Consultants } from './destinations-consultants';
// import Consultants from '@/components/Consultants';

const orange = '#ED6B2C';

// Helper function to get icon component
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Users: Users,
    TrendingUp: TrendingUp,
    Heart: Heart,
    GraduationCap: GraduationCap,
    Code: Code,
    Target: Target,
    Calendar: Calendar,
    BookOpen: BookOpen,
    Home: Home,
    FileText: FileText,
    Handshake: Handshake,
    Megaphone: Megaphone
  };
  return icons[iconName] || null;
};

// Helper function to get background color
const getBgColor = (bg: string) => {
  const colors: { [key: string]: string } = {
    '#EFF6FF': '#EFF6FF',
    '#F0FDF4': '#F0FDF4',
    '#FEF3F2': '#FEF3F2'
  };
  return colors[bg] || '#F3F4F6';
};

// Section Title Component
const SectionTitle = ({ pre, accent }: { pre: string; accent: string }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
    {pre} <span style={{ color: orange }}>{accent}</span>
  </h2>
);

// FAQ Item Component
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#E8E0D8] rounded-xl overflow-hidden bg-white">
      <button
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-semibold text-black text-left">{q}</span>
        <span className="text-2xl font-light" style={{ color: orange }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: a }} />
      )}
    </div>
  );
};

interface CareersData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
  whyJoin: Array<{
    icon: string;
    bg: string;
    title: string;
    desc: string;
  }>;
  stats: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  departments: Array<{
    icon: string;
    title: string;
    points: string;
  }>;
  lifeGallery: Array<{
    label: string;
    img: string;
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  hiringProcess: Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  openPositions: Array<{
    icon: string;
    title: string;
    exp: string;
    loc: string;
    type: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
    img: string;
    rating: number;
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  cta: {
    title: string;
    description: string;
    image: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
}

export default function CareersPage({ sections }: any) {
  console.log(sections['Career-FAQ'],"main");

  const [data, setData] = useState<CareersData>({
    hero: {
      title: sections['Career-Hero']?.fields?.title || "Build Your Future While Helping Students Build Theirs",
      subtitle: sections['Career-Hero']?.fields?.subtitle || "Join a team that's redefining test preparation",
      description: sections['Career-Hero']?.fields?.description?.replace(/<[^>]*>/g, '') || "",
      image: sections['Career-Hero']?.fields?.image || "",
      buttons: {
        primary: sections['Career-Hero']?.fields?.primaryButton || "Explore Open Roles",
        secondary: sections['Career-Hero']?.fields?.secondaryButton || "Meet Our Team"
      }
    },
    whyJoin: sections['Career-Why-Join']?.fields?.items?.map((item: any) => ({
      icon: item.icon || "Users",
      bg: item.background || "#EFF6FF",
      title: item.title || "",
      desc: item.description || ""
    })) || [],
    stats: sections['Career-Stats']?.fields?.items?.map((item: any) => ({
      icon: item.icon || "👥",
      value: item.value || "",
      label: item.label || ""
    })) || [],
    departments: sections['Career-Departments']?.fields?.items?.map((item: any) => ({
      icon: item.icon || "GraduationCap",
      title: item.title || "",
      points: item.points || ""
    })) || [],
    lifeGallery: sections['Career-Life']?.fields?.items?.map((item: any) => ({
      label: item.label || "",
      img: item.image || ""
    })) || [],
    benefits: sections['Career-Benefits']?.fields?.items?.map((item: any) => ({
      icon: item.icon || "Heart",
      title: item.title || "",
      desc: item.description || ""
    })) || [],
    hiringProcess: sections['Career-Hiring-Process']?.fields?.items?.map((item: any) => ({
      icon: item.icon || "FileText",
      title: item.title || "",
      desc: item.description || ""
    })) || [],
    openPositions: sections['Career-Open-Positions']?.fields?.items?.map((item: any) => ({
      icon: item.icon || "GraduationCap",
      title: item.title || "",
      exp: item.experience || "",
      loc: item.location || "",
      type: item.type || "Full-time"
    })) || [],
    testimonials: sections['Career-Testimonials']?.fields?.items?.map((item: any) => ({
      name: item.name || "",
      role: item.role || "",
      quote: item.quote || "",
      img: item.image || "",
      rating: item.rating || 5
    })) || [],
    faqs: sections['Career-FAQ'],
    cta: {
      title: sections['Career-CTA']?.fields?.title || "Ready to Make an Impact?",
      description: sections['Career-CTA']?.fields?.description?.replace(/<[^>]*>/g, '') || "",
      image: sections['Career-CTA']?.fields?.image || "",
      buttons: {
        primary: sections['Career-CTA']?.fields?.primaryButton || "Apply Now",
        secondary: sections['Career-CTA']?.fields?.secondaryButton || "Browse All Jobs"
      }
    }
  });

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ED6B2C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading careers data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black">
      {/* ---------------- Hero ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-[42px] md:text-[52px] font-extrabold leading-tight text-black">
              {data.hero?.title.split('||')[0]}
              <span style={{ color: orange }}>{data.hero?.title.split('||')[1]}</span> 
              {/* <br />
              {data.hero.subtitle}
              <br />
              */}
            </h1>
            <p className="mt-6 text-black/80 text-lg max-w-md leading-relaxed">
              {data.hero.description}
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                className="px-8 py-4 rounded-lg text-white text-base font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: orange }}
              >
                {data.hero.buttons.primary}
              </button>
              <button className="px-8 py-4 rounded-lg text-base font-semibold border-2 border-black text-black bg-white hover:bg-gray-50 transition">
                {data.hero.buttons.secondary}
              </button>
            </div>
          </div>
          <div className="relative">
            {/* <div
              className="absolute -top-4 left-8 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: orange }}
            >
              <MapPin size={20} className="text-white" />
            </div> */}
            <img
              src={data.hero.image || "/herom image.webp"}
              alt="Team collaborating"
              className="rounded w-full h-[460px] object-contain "
            />
          </div>
        </div>
      </section>

      {/* ---------------- Why Join ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
        <SectionTitle pre="Why" accent="Join Oosha's" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whyJoin.map((w, i) => {
            const Icon = getIcon(w.icon);
            return (
              <div
                key={i}
                className="border border-[#E8E0D8] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-shadow bg-white"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: w.bg }}
                >
                  {Icon && <Icon size={24} style={{ color: orange }} />}
                </div>
                <h3 className="text-[16px] font-bold text-black">{w.title}</h3>
                <p className="text-sm text-gray-700 leading-snug">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

    
    {/* ---------------- Built For Career ---------------- */}
<section className="bg-[#FCEEE5]  ">
  <div className="max-w-7xl mx-auto px-4">
    <div className="rounded-sm overflow-hidden">
      <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16 px-8 md:px-14 py-6">

        {/* Left Content */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-[#2F2F2F]">
            Built For{" "}
            <span className="text-[#F26E46]">
              Your Career.
            </span>
          </h2>

          <p className="mt-6 text-lg md:text-[20px] leading-9 text-[#444]">
            Whether you're a counselor, developer, designer,
            marketer or content creator, you'll find
            opportunities to learn, grow and make an impact.
          </p>

          <button className="mt-10 bg-[#F26E46] hover:bg-[#e65f35] text-white font-semibold text-xl px-8 py-4 rounded-xl transition-all duration-300">
            Explore Careers
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/herom image 22.webp"
            alt="Career Illustration"
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </div>

      </div>
    </div>
  </div>
</section>

      {/* ---------------- Stats + Growth path ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-0 py-12 gap-8">
        <div className="border border-[#E8E0D8] rounded-2xl p-10 shadow-sm bg-white">
          <h3 className="text-center text-2xl font-bold text-black mb-10">
            Our People. <span style={{ color: orange }}>Our Strength.</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <span className="text-4xl">{s.icon}</span>
                <span className="text-2xl font-bold text-black">{s.value}</span>
                <span className="text-sm text-gray-700 leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ---------------- Departments hiring ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-12">
          <SectionTitle pre="Departments We Are" accent="Hiring For" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.departments.map((d, i) => {
              const Icon = getIcon(d.icon);
              return (
                <div key={i} className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-lg transition">
                  {Icon && <Icon size={26} style={{ color: orange }} />}
                  <h3 className="text-[15px] font-bold text-black leading-snug min-h-[40px]">
                    {d.title}
                  </h3>
                  <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: d.points }} />
                  <button
                    className="mt-2 text-white text-sm font-semibold rounded-lg py-2.5 hover:opacity-90 transition"
                    style={{ backgroundColor: orange }}
                  >
                    Apply →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Life at Ooshas ---------------- */}
      <section className="bg-[#FCEEE5] pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-0">
          <SectionTitle pre="Life At" accent="Ooshas" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.lifeGallery.map((g, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                <img src={g.img} alt={g.label} className="w-full h-28 object-cover" />
                <div className="bg-white text-center text-sm font-semibold text-black py-2.5">
                  {g.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="px-8 py-4 rounded-lg text-white text-base font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: orange }}
            >
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- Benefits ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
        <SectionTitle pre="Employee" accent="Benefits" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.benefits.map((b, i) => {
            const Icon = getIcon(b.icon);
            return (
              <div
                key={i}
                className="border border-[#E8E0D8] rounded-2xl p-6 flex flex-col items-center text-center gap-4 bg-white hover:shadow-lg transition"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: i % 2 === 0 ? orange : "#EC4899" }}
                >
                  {Icon && <Icon size={24} className="text-white" />}
                </div>
                <h3 className="text-[16px] font-bold text-black">{b.title}</h3>
                <p className="text-sm text-gray-700 leading-snug">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Hiring process ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-12">
          <SectionTitle pre="Our" accent="Hiring Process" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.hiringProcess.map((h, i) => {
              const Icon = getIcon(h.icon);
              return (
                <div key={i} className="flex flex-col items-center text-center gap-4 relative">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white z-10"
                    style={{ borderColor: orange }}
                  >
                    {Icon && <Icon size={22} style={{ color: orange }} />}
                  </div>
                  <h3 className="text-[15px] font-bold text-black">{h.title}</h3>
                  <p className="text-sm text-gray-700 leading-snug">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Open Positions ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
        <SectionTitle pre="Open" accent="Positions" />
        <div className="grid md:grid-cols-2 gap-6">
          {data.openPositions.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <div
                key={i}
                className="border border-[#E8E0D8] rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FCEEE5] flex items-center justify-center shrink-0">
                  {Icon && <Icon size={22} style={{ color: orange }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-bold text-black">{p.title}</h3>
                    <span
                      className="text-[11px] font-semibold px-3 py-1 rounded-full border shrink-0"
                      style={{ color: orange, borderColor: orange }}
                    >
                      {p.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">Experience: {p.exp}</p>
                  <p className="text-sm text-gray-700">Location: {p.loc}</p>
                  <button
                    className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg border-2 hover:bg-orange-50 transition"
                    style={{ color: orange, borderColor: orange }}
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-12">
          <SectionTitle pre="What Our" accent="Employees Say" />
          <div className="grid md:grid-cols-2 gap-6">
            {data.testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col gap-4">
                <div className="flex gap-1" style={{ color: orange }}>
                  {Array.from({ length: t.rating || 5 }).map((_, s) => (
                    <Star key={s} size={16} fill={orange} strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed flex-1">{t.quote}</p>
                <div className="flex items-center gap-4 mt-2">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="text-[15px] font-bold text-black">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ---------------- CTA ---------------- */}
      {/* <section style={{ backgroundColor: orange }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-16 md:py-12 grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <img
            src={data.cta.image}
            alt="Team members"
            className="rounded-2xl w-full h-[260px] object-cover order-2 md:order-1 shadow-xl"
          />
          <div className="order-1 md:order-2 text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold">{data.cta.title}</h2>
            <p className="mt-4 text-white/90 text-base max-w-sm leading-relaxed">
              {data.cta.description}
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <button className="px-8 py-4 rounded-lg bg-white text-black text-base font-semibold hover:bg-gray-100 transition">
                {data.cta.buttons.primary}
              </button>
              <button className="px-8 py-4 rounded-lg bg-black text-white text-base font-semibold hover:bg-gray-900 transition">
                {data.cta.buttons.secondary}
              </button>
            </div>
          </div>
        </div>
      </section> */}

      <Consultants data={data.faqs} finalCtaSection={[]} />
    </div>
  );
}












// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   TrendingUp,
//   Clock,
//   DollarSign,
//   BookOpen,
//   Globe,
//   Users,
//   MapPin,
//   Star,
//   ChevronDown,
//   Phone,
//   Mail,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Monitor,
//   Code2,
//   Megaphone,
//   PenLine,
//   UserPlus,
//   GraduationCap,
//   HeartPulse,
//   CalendarDays,
//   BookMarked,
//   Trophy,
//   Home as HomeIcon,
//   FileText,
//   Search,
//   Wrench,
//   MessageSquare,
//   Send,
//   ArrowRight,
//   Briefcase,
//   Award,
//   Zap,
// } from "lucide-react";
// import { Consultants } from "./destinations-consultants";

// const orange = "#ED6B2C";

// // Types
// interface WhyJoin {
//   icon: string;
//   bg: string;
//   title: string;
//   desc: string;
// }

// interface Stat {
//   icon: string;
//   value: string;
//   label: string;
// }

// interface Department {
//   icon: string;
//   title: string;
//   description?: string;
// }

// interface Gallery {
//   label: string;
//   img: string;
// }

// interface Benefit {
//   icon: string;
//   title: string;
//   desc: string;
// }

// interface HiringStep {
//   icon: string;
//   title: string;
//   desc: string;
// }

// interface Position {
//   icon: string;
//   title: string;
//   exp: string;
//   loc: string;
//   type?: string;
// }

// interface Testimonial {
//   name: string;
//   role: string;
//   quote: string;
//   img: string;
//   rating?: number;
// }

// interface Faq {
//   q: string;
//   a: string;
// }

// interface CareersData {
//   hero: {
//     title: string;
//     subtitle: string;
//     description: string;
//     image: string;
//     buttons: {
//       primary: string;
//       secondary: string;
//     };
//   };
//   whyJoin: WhyJoin[];
//   stats: Stat[];
//   growthPath: string[];
//   departments: Department[];
//   lifeGallery: Gallery[];
//   benefits: Benefit[];
//   hiringProcess: HiringStep[];
//   openPositions: Position[];
//   testimonials: Testimonial[];
//   faqs: Faq[];
//   cta: {
//     title: string;
//     description: string;
//     image: string;
//     buttons: {
//       primary: string;
//       secondary: string;
//     };
//   };
// }

// const iconMap: Record<string, any> = {
//   TrendingUp,
//   Clock,
//   DollarSign,
//   BookOpen,
//   Globe,
//   Users,
//   MapPin,
//   Star,
//   ChevronDown,
//   Phone,
//   Mail,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Monitor,
//   Code2,
//   Megaphone,
//   PenLine,
//   UserPlus,
//   GraduationCap,
//   HeartPulse,
//   CalendarDays,
//   BookMarked,
//   Trophy,
//   Home: HomeIcon,
//   FileText,
//   Search,
//   Wrench,
//   MessageSquare,
//   Send,
//   ArrowRight,
//   Briefcase,
//   Award,
//   Zap,
// };

// // Default data
// const defaultData: CareersData = {
//   hero: {
//     title: "Build Your Future.",
//     subtitle: "Join the Team That",
//     description:
//       "Help students achieve their study abroad goals while growing your own career in a collaborative, innovative, and purpose-driven environment.",
//     image:
//       "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
//     buttons: {
//       primary: "View Open Positions",
//       secondary: "Life at Ooshas",
//     },
//   },
//   whyJoin: [
//     {
//       icon: "TrendingUp",
//       bg: "#ED6B2C",
//       title: "Growth Opportunities",
//       desc: "Continuous learning, mentorship and promotions.",
//     },
//     {
//       icon: "Clock",
//       bg: "#EC4899",
//       title: "Flexible Work Culture",
//       desc: "Hybrid and flexible schedules for a healthy work-life balance.",
//     },
//     {
//       icon: "DollarSign",
//       bg: "#8B5CF6",
//       title: "Competitive Salary",
//       desc: "Performance-based rewards and incentives.",
//     },
//     {
//       icon: "BookOpen",
//       bg: "#ED6B2C",
//       title: "Learning & Training",
//       desc: "Regular workshops, certifications and skill development.",
//     },
//     {
//       icon: "Globe",
//       bg: "#22C55E",
//       title: "International Exposure",
//       desc: "Work with students from around the world.",
//     },
//     {
//       icon: "Users",
//       bg: "#8B5CF6",
//       title: "Supportive Team",
//       desc: "Positive culture with a collaborative environment.",
//     },
//   ],
//   stats: [
//     { icon: "🙂", value: "95%", label: "Employee Satisfaction" },
//     { icon: "⭐", value: "4.8/5", label: "Glassdoor Rating" },
//     { icon: "👥", value: "200+", label: "Employees" },
//     { icon: "🎓", value: "30+", label: "Career Growth Programs" },
//     { icon: "📈", value: "85%", label: "Internal Promotions" },
//   ],
//   growthPath: ["Intern", "Associate", "Senior Executive", "Manager", "Team Lead"],
//   departments: [
//     { icon: "MessageSquare", title: "Study Abroad Counselors" },
//     { icon: "Monitor", title: "Frontend Developers" },
//     { icon: "Code2", title: "Backend Developers" },
//     { icon: "Megaphone", title: "Digital Marketing" },
//     { icon: "PenLine", title: "Content Writers" },
//     { icon: "UserPlus", title: "HR & Recruitment" },
//   ],
//   lifeGallery: [
//     {
//       label: "Office",
//       img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80&auto=format&fit=crop",
//     },
//     {
//       label: "Team Meetings",
//       img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80&auto=format&fit=crop",
//     },
//     {
//       label: "Events",
//       img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80&auto=format&fit=crop",
//     },
//     {
//       label: "Learning Sessions",
//       img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80&auto=format&fit=crop",
//     },
//     {
//       label: "Celebrations",
//       img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&q=80&auto=format&fit=crop",
//     },
//     {
//       label: "Workspaces",
//       img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80&auto=format&fit=crop",
//     },
//   ],
//   benefits: [
//     {
//       icon: "HeartPulse",
//       title: "Health Insurance",
//       desc: "Comprehensive health coverage for you and your family.",
//     },
//     {
//       icon: "CalendarDays",
//       title: "Paid Leaves",
//       desc: "Earned leaves, sick leaves and personal time off.",
//     },
//     {
//       icon: "BookMarked",
//       title: "Learning Budget",
//       desc: "Annual learning budget for courses, workshops and conferences.",
//     },
//     {
//       icon: "Trophy",
//       title: "Performance Bonus",
//       desc: "Rewarding performance with attractive bonuses and recognition.",
//     },
//     {
//       icon: "Home",
//       title: "Work From Home Support",
//       desc: "Flexible work options and WFH allowances.",
//     },
//   ],
//   hiringProcess: [
//     { icon: "FileText", title: "Application", desc: "Submit your application online." },
//     {
//       icon: "Search",
//       title: "Resume Screening",
//       desc: "Our team reviews your profile and experience.",
//     },
//     {
//       icon: "MessageSquare",
//       title: "Interview",
//       desc: "Initial interview with the hiring manager.",
//     },
//     {
//       icon: "Wrench",
//       title: "Technical Round",
//       desc: "Role specific assessment or technical test.",
//     },
//     {
//       icon: "Users",
//       title: "HR Discussion",
//       desc: "Discussion about culture, role and expectations.",
//     },
//     {
//       icon: "Send",
//       title: "Offer Letter",
//       desc: "Welcome aboard! You're now a part of the Ooshas family.",
//     },
//   ],
//   openPositions: [
//     {
//       icon: "Monitor",
//       title: "Frontend Developer",
//       exp: "2-4 Years",
//       loc: "Mohali (Hybrid)",
//       type: "Full Time",
//     },
//     {
//       icon: "MessageSquare",
//       title: "Study Abroad Counselor",
//       exp: "1-3 Years",
//       loc: "Delhi (On-site)",
//       type: "Full Time",
//     },
//     {
//       icon: "Megaphone",
//       title: "Digital Marketing Executive",
//       exp: "1-2 Years",
//       loc: "Mohali (Hybrid)",
//       type: "Full Time",
//     },
//     {
//       icon: "Code2",
//       title: "Backend Developer",
//       exp: "2-4 Years",
//       loc: "Mohali (Hybrid)",
//       type: "Full Time",
//     },
//     {
//       icon: "PenLine",
//       title: "Content Writer",
//       exp: "1-2 Years",
//       loc: "Mohali (Hybrid)",
//       type: "Full Time",
//     },
//     {
//       icon: "UserPlus",
//       title: "HR Executive",
//       exp: "1-3 Years",
//       loc: "Delhi (On-site)",
//       type: "Full Time",
//     },
//   ],
//   testimonials: [
//     {
//       name: "Rohul",
//       role: "Frontend Developer",
//       quote:
//         "Working here has been one of the best career decisions. Amazing mentors, great work culture and constant growth.",
//       img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop",
//       rating: 5,
//     },
//     {
//       name: "Anjali",
//       role: "Study Abroad Counselor",
//       quote:
//         "Ooshas gives you the freedom to learn, the support to grow and the purpose to make a difference.",
//       img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80&auto=format&fit=crop",
//       rating: 5,
//     },
//     {
//       name: "Karan",
//       role: "Digital Marketing Executive",
//       quote:
//         "The flexibility, people and culture make Ooshas a wonderful place to build a long-term career.",
//       img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop",
//       rating: 5,
//     },
//     {
//       name: "Neha",
//       role: "HR Executive",
//       quote:
//         "Great place to work with amazing opportunities and a supportive leadership team.",
//       img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format&fit=crop",
//       rating: 5,
//     },
//   ],
//   faqs: [
//     {
//       q: "Can freshers apply?",
//       a: "Yes! We welcome applications from freshers for select roles and provide structured onboarding and mentorship to help you grow.",
//     },
//     {
//       q: "What benefits do employees receive?",
//       a: "Health insurance, paid leaves, a learning budget, performance bonuses and work-from-home support, among others.",
//     },
//     {
//       q: "Do you offer remote jobs?",
//       a: "Most roles are hybrid, with some on-site and remote-friendly positions depending on the department.",
//     },
//     {
//       q: "Can I apply for multiple positions?",
//       a: "Yes, you're welcome to apply for as many open positions as match your skills and interests.",
//     },
//     {
//       q: "How long is the hiring process?",
//       a: "On average, our hiring process takes 2-3 weeks from application to offer letter, depending on the role.",
//     },
//   ],
//   cta: {
//     title: "Ready to Build Your Dream Career?",
//     description: "Join a passionate team that's changing students' lives every day.",
//     image:
//       "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&auto=format&fit=crop",
//     buttons: {
//       primary: "View Openings",
//       secondary: "Submit Resume",
//     },
//   },
// };



// function SectionTitle({ pre, accent }: { pre: string; accent: string }) {
//   return (
//     <h2 className="text-center text-[32px] md:text-[40px] font-bold text-black mb-12">
//       {pre} <span style={{ color: orange }}>{accent}</span>
//     </h2>
//   );
// }

// function FaqItem({ q, a }: { q: string; a: string }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <button
//       onClick={() => setOpen(!open)}
//       className="w-full text-left bg-white border border-[#E8E0D8] rounded-xl px-6 py-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
//     >
//       <span className="flex items-center justify-between">
//         <span className="text-[17px] md:text-[19px] font-semibold text-black">{q}</span>
//         <ChevronDown
//           size={22}
//           style={{ color: orange }}
//           className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
//         />
//       </span>
//       {open && <span className="text-base text-gray-700 leading-relaxed">{a}</span>}
//     </button>
//   );
// }

// function getIcon(iconName: string) {
//   return iconMap[iconName] || null;
// }

// function getBgColor(bg: string) {
//   return bg;
// }

// export default function CareersPage({sections}: any) {
//   console.log(sections)
//   const [data, setData] = useState<CareersData>(defaultData);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/careers-data");
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error fetching careers data:", error);
//         setData(defaultData);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#ED6B2C] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600 text-lg">Loading careers data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white text-black">
//       {/* ---------------- Hero ---------------- */}
//       <section className="bg-[#FCEEE5]">
//         <div className="max-w-7xl mx-auto px-6 md:px-0 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1 className="text-[42px] md:text-[52px] font-extrabold leading-tight text-black">
//               {data.hero.title}
//               <br />
//               {data.hero.subtitle}
//               <br />
//               <span style={{ color: orange }}>Builds Dreams.</span>
//             </h1>
//             <p className="mt-6 text-black/80 text-lg max-w-md leading-relaxed">
//               {data.hero.description}
//             </p>
//             <div className="mt-8 flex gap-4 flex-wrap">
//               <button
//                 className="px-8 py-4 rounded-lg text-white text-base font-semibold hover:opacity-90 transition"
//                 style={{ backgroundColor: orange }}
//               >
//                 {data.hero.buttons.primary}
//               </button>
//               <button className="px-8 py-4 rounded-lg text-base font-semibold border-2 border-black text-black bg-white hover:bg-gray-50 transition">
//                 {data.hero.buttons.secondary}
//               </button>
//             </div>
//           </div>
//           <div className="relative">
//             <div
//               className="absolute -top-4 left-8 w-10 h-10 rounded-full flex items-center justify-center"
//               style={{ backgroundColor: orange }}
//             >
//               <MapPin size={20} className="text-white" />
//             </div>
//             <img
//               src={data.hero.image}
//               alt="Team collaborating"
//               className="rounded-2xl w-full h-[360px] object-cover shadow-xl"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ---------------- Why Join ---------------- */}
//       <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//         <SectionTitle pre="Why" accent="Join Oosha's" />
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {data.whyJoin.map((w, i) => {
//             const Icon = getIcon(w.icon);
//             return (
//               <div
//                 key={i}
//                 className="border border-[#E8E0D8] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-shadow bg-white"
//               >
//                 <div
//                   className="w-14 h-14 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: getBgColor(w.bg) }}
//                 >
//                   {Icon && <Icon size={24} className="text-white" />}
//                 </div>
//                 <h3 className="text-[16px] font-bold text-black">{w.title}</h3>
//                 <p className="text-sm text-gray-700 leading-snug">{w.desc}</p>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ---------------- Built for career ---------------- */}
//       <section className="bg-[#FCEEE5]">
//         <div className="max-w-7xl mx-auto px-6 md:px-0 py-12 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-[36px] md:text-[42px] font-bold text-black">
//               Built For <span style={{ color: orange }}>Your Career.</span>
//             </h2>
//             <p className="mt-5 text-black/80 text-lg max-w-md leading-relaxed">
//               Whether you're a counselor, developer, designer, marketer or content creator, you'll
//               find opportunities to learn, grow and make an impact.
//             </p>
//             <button
//               className="mt-8 px-8 py-4 rounded-lg text-white text-base font-semibold hover:opacity-90 transition"
//               style={{ backgroundColor: orange }}
//             >
//               Explore Careers
//             </button>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop"
//             alt="Team meeting room"
//             className="rounded-2xl w-full h-[300px] object-cover shadow-xl"
//           />
//         </div>
//       </section>

//       {/* ---------------- Stats + Growth path ---------------- */}
//       <section className="max-w-7xl mx-auto px-6 md:px-0 py-12 grid md:grid-cols-[1.4fr_1fr] gap-8">
//         <div className="border border-[#E8E0D8] rounded-2xl p-10 shadow-sm bg-white">
//           <h3 className="text-center text-2xl font-bold text-black mb-10">
//             Our People. <span style={{ color: orange }}>Our Strength.</span>
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
//             {data.stats.map((s, i) => (
//               <div key={i} className="flex flex-col items-center text-center gap-3">
//                 <span className="text-4xl">{s.icon}</span>
//                 <span className="text-2xl font-bold text-black">{s.value}</span>
//                 <span className="text-sm text-gray-700 leading-snug">{s.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="border border-[#E8E0D8] rounded-2xl p-10 shadow-sm bg-white">
//           <h3 className="text-xl font-bold text-black mb-8">
//             Your Growth <span style={{ color: orange }}>Path</span>
//           </h3>
//           <div className="relative flex flex-col gap-6 pl-5 border-l-2 border-dotted border-[#ED6B2C]/40">
//             {data.growthPath.map((step, i) => (
//               <div key={i} className="relative flex items-center gap-4 -ml-[11px]">
//                 <span
//                   className="w-4 h-4 rounded-full shrink-0"
//                   style={{ backgroundColor: orange }}
//                 />
//                 <span className="text-base text-black bg-[#FBF6F3] border border-[#E8E0D8] rounded-lg px-5 py-3 flex-1 font-medium">
//                   {step}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------------- Departments hiring ---------------- */}
//       <section className="bg-[#FCEEE5]">
//         <div className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//           <SectionTitle pre="Departments We Are" accent="Hiring For" />
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {data.departments.map((d, i) => {
//               const Icon = getIcon(d.icon);
//               return (
//                 <div key={i} className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-lg transition">
//                   {Icon && <Icon size={26} style={{ color: orange }} />}
//                   <h3 className="text-[15px] font-bold text-black leading-snug min-h-[40px]">
//                     {d.title}
//                   </h3>
//                   <ul className="text-sm text-gray-700 space-y-1.5">
//                     <li>• Job Description</li>
//                     <li>• Experience</li>
//                     <li>• Open Positions</li>
//                   </ul>
//                   <button
//                     className="mt-2 text-white text-sm font-semibold rounded-lg py-2.5 hover:opacity-90 transition"
//                     style={{ backgroundColor: orange }}
//                   >
//                     Apply →
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ---------------- Life at Ooshas ---------------- */}
//       <section className="bg-[#FCEEE5] pb-20">
//         <div className="max-w-7xl mx-auto px-6 md:px-0">
//           <SectionTitle pre="Life At" accent="Ooshas" />
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {data.lifeGallery.map((g, i) => (
//               <div key={i} className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
//                 <img src={g.img} alt={g.label} className="w-full h-28 object-cover" />
//                 <div className="bg-white text-center text-sm font-semibold text-black py-2.5">
//                   {g.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center mt-10">
//             <button
//               className="px-8 py-4 rounded-lg text-white text-base font-semibold hover:opacity-90 transition"
//               style={{ backgroundColor: orange }}
//             >
//               View Gallery
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ---------------- Benefits ---------------- */}
//       <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//         <SectionTitle pre="Employee" accent="Benefits" />
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//           {data.benefits.map((b, i) => {
//             const Icon = getIcon(b.icon);
//             return (
//               <div
//                 key={i}
//                 className="border border-[#E8E0D8] rounded-2xl p-6 flex flex-col items-center text-center gap-4 bg-white hover:shadow-lg transition"
//               >
//                 <div
//                   className="w-14 h-14 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: i % 2 === 0 ? orange : "#EC4899" }}
//                 >
//                   {Icon && <Icon size={24} className="text-white" />}
//                 </div>
//                 <h3 className="text-[16px] font-bold text-black">{b.title}</h3>
//                 <p className="text-sm text-gray-700 leading-snug">{b.desc}</p>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ---------------- Hiring process ---------------- */}
//       <section className="bg-[#FCEEE5]">
//         <div className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//           <SectionTitle pre="Our" accent="Hiring Process" />
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
//             {data.hiringProcess.map((h, i) => {
//               const Icon = getIcon(h.icon);
//               return (
//                 <div key={i} className="flex flex-col items-center text-center gap-4 relative">
//                   <div
//                     className="w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white z-10"
//                     style={{ borderColor: orange }}
//                   >
//                     {Icon && <Icon size={22} style={{ color: orange }} />}
//                   </div>
//                   <h3 className="text-[15px] font-bold text-black">{h.title}</h3>
//                   <p className="text-sm text-gray-700 leading-snug">{h.desc}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ---------------- Open Positions ---------------- */}
//       <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//         <SectionTitle pre="Open" accent="Positions" />
//         <div className="grid md:grid-cols-3 gap-6">
//           {data.openPositions.map((p, i) => {
//             const Icon = getIcon(p.icon);
//             return (
//               <div
//                 key={i}
//                 className="border border-[#E8E0D8] rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition bg-white"
//               >
//                 <div className="w-12 h-12 rounded-xl bg-[#FCEEE5] flex items-center justify-center shrink-0">
//                   {Icon && <Icon size={22} style={{ color: orange }} />}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between gap-2">
//                     <h3 className="text-[16px] font-bold text-black">{p.title}</h3>
//                     <span
//                       className="text-[11px] font-semibold px-3 py-1 rounded-full border shrink-0"
//                       style={{ color: orange, borderColor: orange }}
//                     >
//                       {p.type || "Full Time"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-700 mt-2">Experience: {p.exp}</p>
//                   <p className="text-sm text-gray-700">Location: {p.loc}</p>
//                   <button
//                     className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg border-2 hover:bg-orange-50 transition"
//                     style={{ color: orange, borderColor: orange }}
//                   >
//                     Apply Now →
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ---------------- Testimonials ---------------- */}
//       <section className="bg-[#FCEEE5]">
//         <div className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//           <SectionTitle pre="What Our" accent="Employees Say" />
//           <div className="grid md:grid-cols-4 gap-6">
//             {data.testimonials.map((t, i) => (
//               <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col gap-4">
//                 <div className="flex gap-1" style={{ color: orange }}>
//                   {Array.from({ length: t.rating || 5 }).map((_, s) => (
//                     <Star key={s} size={16} fill={orange} strokeWidth={0} />
//                   ))}
//                 </div>
//                 <p className="text-[15px] text-gray-700 leading-relaxed flex-1">{t.quote}</p>
//                 <div className="flex items-center gap-4 mt-2">
//                   <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
//                   <div>
//                     <p className="text-[15px] font-bold text-black">{t.name}</p>
//                     <p className="text-sm text-gray-600">{t.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------------- FAQs ---------------- */}
//       <section className="max-w-7xl mx-auto px-6 md:px-0 py-12">
//         <SectionTitle pre="Frequently Asked" accent="Questions" />
//         <div className="max-w-3xl mx-auto grid gap-5">
//           {data.faqs.map((f, i) => (
//             <FaqItem key={i} q={f.q} a={f.a} />
//           ))}
//         </div>
//       </section>

//       {/* ---------------- CTA ---------------- */}
//       <section style={{ backgroundColor: orange }} className="relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 md:px-0 py-16 md:py-12 grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
//           <img
//             src={data.cta.image}
//             alt="Team members"
//             className="rounded-2xl w-full h-[260px] object-cover order-2 md:order-1 shadow-xl"
//           />
//           <div className="order-1 md:order-2 text-white">
//             <h2 className="text-3xl md:text-4xl font-extrabold">{data.cta.title}</h2>
//             <p className="mt-4 text-white/90 text-base max-w-sm leading-relaxed">
//               {data.cta.description}
//             </p>
//             <div className="mt-8 flex gap-4 flex-wrap">
//               <button className="px-8 py-4 rounded-lg bg-white text-black text-base font-semibold hover:bg-gray-100 transition">
//                 {data.cta.buttons.primary}
//               </button>
//               <button className="px-8 py-4 rounded-lg bg-black text-white text-base font-semibold hover:bg-gray-900 transition">
//                 {data.cta.buttons.secondary}
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Consultants data={[]} finalCtaSection={[]} />
//     </div>
//   );
// }