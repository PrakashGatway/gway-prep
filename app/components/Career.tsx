"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Clock,
  DollarSign,
  BookOpen,
  Globe,
  Users,
  MapPin,
  Star,
  ChevronDown,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Monitor,
  Code2,
  Megaphone,
  PenLine,
  UserPlus,
  GraduationCap,
  HeartPulse,
  CalendarDays,
  BookMarked,
  Trophy,
  Home as HomeIcon,
  FileText,
  Search,
  Wrench,
  MessageSquare,
  Send,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */
// primary orange   #ED6B2C
// orange dark      #D9531A
// peach section bg #FCEEE5
// dark navy/black  #1C1C1C
// text             #262626
// muted text       #6B7280

const orange = "#ED6B2C";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const whyJoin = [
  { icon: TrendingUp, bg: "#ED6B2C", title: "Growth Opportunities", desc: "Continuous learning, mentorship and promotions." },
  { icon: Clock, bg: "#EC4899", title: "Flexible Work Culture", desc: "Hybrid and flexible schedules for a healthy work-life balance." },
  { icon: DollarSign, bg: "#8B5CF6", title: "Competitive Salary", desc: "Performance-based rewards and incentives." },
  { icon: BookOpen, bg: "#ED6B2C", title: "Learning & Training", desc: "Regular workshops, certifications and skill development." },
  { icon: Globe, bg: "#22C55E", title: "International Exposure", desc: "Work with students from around the world." },
  { icon: Users, bg: "#8B5CF6", title: "Supportive Team", desc: "Positive culture with a collaborative environment." },
];

const stats = [
  { icon: "🙂", value: "95%", label: "Employee Satisfaction" },
  { icon: "⭐", value: "4.8/5", label: "Glassdoor Rating" },
  { icon: "👥", value: "200+", label: "Employees" },
  { icon: "🎓", value: "30+", label: "Career Growth Programs" },
  { icon: "📈", value: "85%", label: "Internal Promotions" },
];

const growthPath = ["Intern", "Associate", "Senior Executive", "Manager", "Team Lead"];

const departments = [
  { icon: MessageSquare, title: "Study Abroad Counselors" },
  { icon: Monitor, title: "Frontend Developers" },
  { icon: Code2, title: "Backend Developers" },
  { icon: Megaphone, title: "Digital Marketing" },
  { icon: PenLine, title: "Content Writers" },
  { icon: UserPlus, title: "HR & Recruitment" },
];

const lifeGallery = [
  { label: "Office", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80&auto=format&fit=crop" },
  { label: "Team Meetings", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80&auto=format&fit=crop" },
  { label: "Events", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80&auto=format&fit=crop" },
  { label: "Learning Sessions", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80&auto=format&fit=crop" },
  { label: "Celebrations", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&q=80&auto=format&fit=crop" },
  { label: "Workspaces", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80&auto=format&fit=crop" },
];

const benefits = [
  { icon: HeartPulse, title: "Health Insurance", desc: "Comprehensive health coverage for you and your family." },
  { icon: CalendarDays, title: "Paid Leaves", desc: "Earned leaves, sick leaves and personal time off." },
  { icon: BookMarked, title: "Learning Budget", desc: "Annual learning budget for courses, workshops and conferences." },
  { icon: Trophy, title: "Performance Bonus", desc: "Rewarding performance with attractive bonuses and recognition." },
  { icon: HomeIcon, title: "Work From Home Support", desc: "Flexible work options and WFH allowances." },
];

const hiringProcess = [
  { icon: FileText, title: "Application", desc: "Submit your application online." },
  { icon: Search, title: "Resume Screening", desc: "Our team reviews your profile and experience." },
  { icon: MessageSquare, title: "Interview", desc: "Initial interview with the hiring manager." },
  { icon: Wrench, title: "Technical Round", desc: "Role specific assessment or technical test." },
  { icon: Users, title: "HR Discussion", desc: "Discussion about culture, role and expectations." },
  { icon: Send, title: "Offer Letter", desc: "Welcome aboard! You're now a part of the Ooshas family." },
];

const openPositions = [
  { icon: Monitor, title: "Frontend Developer", exp: "2-4 Years", loc: "Mohali (Hybrid)" },
  { icon: MessageSquare, title: "Study Abroad Counselor", exp: "1-3 Years", loc: "Delhi (On-site)" },
  { icon: Megaphone, title: "Digital Marketing Executive", exp: "1-2 Years", loc: "Mohali (Hybrid)" },
  { icon: Code2, title: "Backend Developer", exp: "2-4 Years", loc: "Mohali (Hybrid)" },
  { icon: PenLine, title: "Content Writer", exp: "1-2 Years", loc: "Mohali (Hybrid)" },
  { icon: UserPlus, title: "HR Executive", exp: "1-3 Years", loc: "Delhi (On-site)" },
];

const testimonials = [
  { name: "Rohul", role: "Frontend Developer", quote: "Working here has been one of the best career decisions. Amazing mentors, great work culture and constant growth.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop" },
  { name: "Anjali", role: "Study Abroad Counselor", quote: "Ooshas gives you the freedom to learn, the support to grow and the purpose to make a difference.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80&auto=format&fit=crop" },
  { name: "Karan", role: "Digital Marketing Executive", quote: "The flexibility, people and culture make Ooshas a wonderful place to build a long-term career.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop" },
  { name: "Neha", role: "HR Executive", quote: "Great place to work with amazing opportunities and a supportive leadership team.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format&fit=crop" },
];

const faqs = [
  { q: "Can freshers apply?", a: "Yes! We welcome applications from freshers for select roles and provide structured onboarding and mentorship to help you grow." },
  { q: "What benefits do employees receive?", a: "Health insurance, paid leaves, a learning budget, performance bonuses and work-from-home support, among others." },
  { q: "Do you offer remote jobs?", a: "Most roles are hybrid, with some on-site and remote-friendly positions depending on the department." },
  { q: "Can I apply for multiple positions?", a: "Yes, you're welcome to apply for as many open positions as match your skills and interests." },
  { q: "How long is the hiring process?", a: "On average, our hiring process takes 2-3 weeks from application to offer letter, depending on the role." },
];

const navLinks = ["Home", "About Us", "Study Abroad", "Exams", "Apply", "Career", "Contact Us"];

/* -------------------------------------------------------------------------- */
/*  Small reusable bits                                                      */
/* -------------------------------------------------------------------------- */

function SectionTitle({ pre, accent }: { pre: string; accent: string }) {
  return (
    <h2 className="text-center text-[28px] md:text-[32px] font-bold text-[#1C1C1C] mb-10">
      {pre} <span style={{ color: orange }}>{accent}</span>
    </h2>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white border border-[#F0E4DC] rounded-xl px-5 py-4 flex flex-col gap-2 shadow-sm"
    >
      <span className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-[#1C1C1C]">{q}</span>
        <ChevronDown
          size={18}
          style={{ color: orange }}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </span>
      {open && <span className="text-sm text-[#6B7280] leading-relaxed">{a}</span>}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                     */
/* -------------------------------------------------------------------------- */

export default function CareersPage() {
  return (
    <div className="bg-white text-[#262626] ">
   

      {/* ---------------- Hero ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-[34px] md:text-[42px] font-extrabold leading-tight text-[#1C1C1C]">
              Build Your Future.
              <br />
              Join the Team That
              <br />
              <span style={{ color: orange }}>Builds Dreams.</span>
            </h1>
            <p className="mt-5 text-[#5B5B5B] text-[15px] max-w-md leading-relaxed">
              Help students achieve their study abroad goals while growing your own career in a
              collaborative, innovative, and purpose-driven environment.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                className="px-6 py-3 rounded-md text-white text-sm font-semibold"
                style={{ backgroundColor: orange }}
              >
                View Open Positions
              </button>
              <button className="px-6 py-3 rounded-md text-sm font-semibold border border-[#1C1C1C] text-[#1C1C1C] bg-white">
                Life at Ooshas
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 left-8 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: orange }}>
              <MapPin size={16} className="text-white" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
              alt="Team collaborating"
              className="rounded-2xl w-full h-[320px] object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ---------------- Why Join ---------------- */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <SectionTitle pre="Why" accent="Join Oosha's" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {whyJoin.map((w, i) => {
            const Icon = w.icon;
            return (
              <div
                key={i}
                className="border border-[#F0E4DC] rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: w.bg }}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-[13px] font-semibold text-[#1C1C1C]">{w.title}</h3>
                <p className="text-[11px] text-[#8A8A8A] leading-snug">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Built for career ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-[28px] font-bold text-[#1C1C1C]">
              Built For <span style={{ color: orange }}>Your Career.</span>
            </h2>
            <p className="mt-4 text-[#5B5B5B] text-[15px] max-w-md leading-relaxed">
              Whether you're a counselor, developer, designer, marketer or content creator, you'll
              find opportunities to learn, grow and make an impact.
            </p>
            <button
              className="mt-6 px-6 py-3 rounded-md text-white text-sm font-semibold"
              style={{ backgroundColor: orange }}
            >
              Explore Careers
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop"
            alt="Team meeting room"
            className="rounded-2xl w-full h-[280px] object-cover shadow-lg"
          />
        </div>
      </section>

      {/* ---------------- Stats + Growth path ---------------- */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr] gap-6">
        {/* stats card */}
        <div className="border border-[#F0E4DC] rounded-2xl p-8 shadow-sm">
          <h3 className="text-center text-lg font-bold text-[#1C1C1C] mb-8">
            Our People. <span style={{ color: orange }}>Our Strength.</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-lg font-bold text-[#1C1C1C]">{s.value}</span>
                <span className="text-[11px] text-[#8A8A8A] leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* growth path card */}
        <div className="border border-[#F0E4DC] rounded-2xl p-8 shadow-sm">
          <h3 className="text-[15px] font-bold text-[#1C1C1C] mb-6">
            Your Growth <span style={{ color: orange }}>Path</span>
          </h3>
          <div className="relative flex flex-col gap-5 pl-4 border-l-2 border-dotted border-[#ED6B2C]/40">
            {growthPath.map((step, i) => (
              <div key={i} className="relative flex items-center gap-3 -ml-[9px]">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: orange }} />
                <span className="text-sm text-[#3A3A3A] bg-[#FBF6F3] border border-[#F0E4DC] rounded-md px-4 py-2 flex-1">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Departments hiring ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <SectionTitle pre="Departments We Are" accent="Hiring For" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                  <Icon size={22} style={{ color: orange }} />
                  <h3 className="text-[13px] font-semibold text-[#1C1C1C] leading-snug min-h-[32px]">
                    {d.title}
                  </h3>
                  <ul className="text-[11px] text-[#8A8A8A] space-y-1">
                    <li>• Job Description</li>
                    <li>• Experience</li>
                    <li>• Open Positions</li>
                  </ul>
                  <button
                    className="mt-2 text-white text-xs font-semibold rounded-md py-2"
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
      <section className="bg-[#FCEEE5] pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionTitle pre="Life At" accent="Ooshas" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {lifeGallery.map((g, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm">
                <img src={g.img} alt={g.label} className="w-full h-24 object-cover" />
                <div className="bg-white text-center text-[11px] font-medium text-[#3A3A3A] py-1.5">
                  {g.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 rounded-md text-white text-sm font-semibold"
              style={{ backgroundColor: orange }}
            >
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- Benefits ---------------- */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <SectionTitle pre="Employee" accent="Benefits" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="border border-[#F0E4DC] rounded-xl p-5 flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: i % 2 === 0 ? orange : "#EC4899" }}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-[13px] font-semibold text-[#1C1C1C]">{b.title}</h3>
                <p className="text-[11px] text-[#8A8A8A] leading-snug">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Hiring process ---------------- */}
      <section className="bg-[#FCEEE5]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <SectionTitle pre="Our" accent="Hiring Process" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {hiringProcess.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center gap-3 relative">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center border-2 bg-white z-10"
                    style={{ borderColor: orange }}
                  >
                    <Icon size={18} style={{ color: orange }} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#1C1C1C]">{h.title}</h3>
                  <p className="text-[11px] text-[#8A8A8A] leading-snug">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Open Positions ---------------- */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <SectionTitle pre="Open" accent="Positions" />
        <div className="grid md:grid-cols-3 gap-5">
          {openPositions.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="border border-[#F0E4DC] rounded-xl p-5 flex items-start gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FCEEE5] flex items-center justify-center shrink-0">
                  <Icon size={18} style={{ color: orange }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[14px] font-semibold text-[#1C1C1C]">{p.title}</h3>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                      style={{ color: orange, borderColor: orange }}
                    >
                      Full Time
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8A8A8A] mt-1">Experience: {p.exp}</p>
                  <p className="text-[11px] text-[#8A8A8A]">Location: {p.loc}</p>
                  <button
                    className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-md border"
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
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <SectionTitle pre="What Our" accent="Employees Say" />
          <div className="grid md:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex gap-0.5" style={{ color: orange }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} fill={orange} strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[12px] text-[#5B5B5B] leading-relaxed flex-1">{t.quote}</p>
                <div className="flex items-center gap-3 mt-2">
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#1C1C1C]">{t.name}</p>
                    <p className="text-[10px] text-[#8A8A8A]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQs ---------------- */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <SectionTitle pre="" accent="FAQs" />
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section style={{ backgroundColor: orange }} className="relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-14 grid md:grid-cols-[1fr_1.1fr] gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&auto=format&fit=crop"
            alt="Team members"
            className="rounded-2xl w-full h-[220px] object-cover order-2 md:order-1"
          />
          <div className="order-1 md:order-2 text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Ready to Build
              <br />
              Your Dream Career?
            </h2>
            <p className="mt-3 text-white/90 text-sm max-w-sm">
              Join a passionate team that's changing students' lives every day.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="px-6 py-3 rounded-md bg-white text-[#1C1C1C] text-sm font-semibold">
                View Openings
              </button>
              <button className="px-6 py-3 rounded-md bg-[#1C1C1C] text-white text-sm font-semibold">
                Submit Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-[#1C1C1C] text-[#B9B9B9] text-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-14 grid md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-extrabold mb-3">
              <span style={{ color: orange }}>Oosha</span>
              <span className="text-white">S</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">
              Your trusted partner in global education. We help students achieve their dreams and
              build brighter futures.
            </p>
            <div className="flex gap-3">
              <Facebook size={16} />
              <Instagram size={16} />
              <Linkedin size={16} />
              <Youtube size={16} />
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Study Destinations</h4>
            <ul className="space-y-1.5 text-xs">
              <li>USA</li>
              <li>Canada</li>
              <li>UK</li>
              <li>Australia</li>
              <li>New Zealand</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Our Services</h4>
            <ul className="space-y-1.5 text-xs">
              <li>Study Abroad</li>
              <li>University Applications</li>
              <li>Visa Assistance</li>
              <li>Test Preparation</li>
              <li>Counseling</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-1.5 text-xs">
              <li>Blogs</li>
              <li>Exams</li>
              <li>Guides</li>
              <li>Scholarships</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-1.5 text-xs mb-4">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-3 text-xs">
            <span>© 2024 Ooshas. All rights reserved.</span>
            <div className="flex gap-6">
              <span className="flex items-center gap-1">
                <Phone size={12} /> +91 88765-43210
              </span>
              <span className="flex items-center gap-1">
                <Mail size={12} /> info@ooshas.com
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> SCO 125-126, 2nd Floor, Sector 34A, Chandigarh
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}








// "use client"

// import { PartnerSection } from "./partner-section"


// export default function Career(){

//      const vacancies = [
//     {
//       title: "Front Desk Receptionist",
//       count: "2",
//       location: "civil lines",
//       description:
//         "This is a full-time on-site role for a Front Desk Receptionist located in Jaipur. The Front Desk Receptionist will be responsible for phone etiquette, receptionist duties, clerical communication, and customer service.",
//       tags: ["Full-Time", "3 Year", "Mid-Senior Level"],
//     },
//     {
//       title: "Counselor",
//       count: "2",
//       location: "jaipur",
//       description:
//         "This is a full-time on-site role for a test preparation counselor located in Jaipur. Providing counseling for all the test preparations (IELTS, PTE, SAT, GRE, GMAT, TOEFL, SELT & DUOLINGO)",
//       tags: ["Full-Time", "2 Year", "Mid Level"],
//     },
//     {
//       title: "Study Abroad Consultants",
//       count: "1",
//       location: "105, first floor, Geetanjali Tower, Ajmer Road, Civil Lines, Jaipur, Rajasthan",
//       description:
//         "Gateway Abroad Jaipur, a trusted Abroad education Consultants in Jaipur, is seeking a Study Abroad Counselor. With 16+ years of excellence in guiding students to prestigious universities across the UK, Ireland, Australia, USA, Canada, New Zealand, and Singapore we offer career counseling, course selection, exam prep (IELTS, PTE, TOEFL), visa assistance, and financial planning.",
//       tags: ["Full-Time", "1 Year", "Mid Level"],
//     },
//   ]


//    const jobs = [
//     {
//       title: "Front-End Developer",
//       vacancies: "1",
//       location: "Gateway Abroad Jaipur, 105 Geetanjali Tower, Civil line, Jaipur, Rajasthan, India",
//       about:
//         "Gateway Abroad Jaipur is a trusted study abroad consultancy and Test Preparation institute with 16+ years of experience helping students achieve their international education goals.\n\nWe are expanding our digital team and seeking a talented Front-End Developer in Jaipur skilled in React, Next.js, and modern web development technologies — with basic backend knowledge.\n\nIf you're passionate about creating interactive, SEO-friendly, and high-performance websites, we'd love to meet you!",
//       responsibilities: "Full-Time • 2 Year • Mid Level",
//     },
//     {
//       title: "Graphic Designer",
//       vacancies: "1",
//       location: "Geetanjali Tower, Ajmer Road Civil Lines, jaipur, Rajasthan, India 302006",
//       about:
//         "We're looking for a creative and detail-oriented Graphic Designer to join our team at Gateway Abroad Education. The ideal candidate should have experience in designing social media creatives, banners, and branding materials using tools like Photoshop, Illustrator, and Canva. If you're passionate about visual storytelling and want to work in the education sector, apply now through our website.",
//       responsibilities: "Full-Time • 1 Year • Mid Level",
//     },
//     {
//       title: "Video Editor",
//       vacancies: "1",
//       location: "Geetanjali Tower, Ajmer Road Civil Lines, jaipur, Rajasthan, India 302006",
//       about:
//         "Gateway Abroad Education is hiring a talented Video Editor to create engaging YouTube videos and educational content for our study abroad campaigns. The ideal candidate should have strong storytelling skills, proficiency in editing software, and a passion for creative content. Please apply now to join our creative team that helps students achieve their global dreams.",
//       responsibilities: "Full-Time • 1 Year • Mid Level",
//     },
//   ]

//     return(
//         <>
//         <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-16 bg-[url('/image/bg-test-pre.jpg')]
//     bg-cover
//     bg-center
//     bg-no-repeat" >
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="text-4xl sm:text-5xl font-bold mb-4">
//           Join Our <span className="text-[#e87a4d]">Team</span>
//         </h2>
//         <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
//           Be part of a dynamic team that helps students achieve their study abroad dreams. Explore exciting career
//           opportunities with Gateway Abroad Education.
//         </p>
//       </div>
//     </section>

//      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white my-10">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div>
//             <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6">Working with Gateway Abroad</h2>
//             <p className="text-[#666666] leading-relaxed mb-4">
//               In a relatively short period of time, Gateway Abroad has assembled such a strong team. Staff members that
//               are committed and diligent have made this possible. We make an effort to encourage and reward personnel on
//               a regular basis. After all, what good is labour without praise? We seek people who can contribute to our
//               team with innovative ideas and effectively interact with clients.
//             </p>
//             <p className="text-[#666666] leading-relaxed">
//               Join us immediately if you're looking for opportunities to improve your talents and have excellent
//               communication skills.
//             </p>
//           </div>

//           {/* Right Illustration */}
//           <div className="bg-[#f5d5c8] rounded-2xl h-64 flex items-center justify-center">
//             <img src="/image/career-img.jpeg" alt="" />
//           </div>
//         </div>
//       </div>
//     </section>



//      <section className="bg-gradient-to-b from-[#fef5e8] to-[#f9f6f3] py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-[#1a1a1a] text-center mb-12">Vacancies</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {vacancies.map((vacancy, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#e87a4d]"
//             >
//               <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{vacancy.title}</h3>
//               <p className="text-sm text-[#666666] mb-2">No. of Vacancy: {vacancy.count}</p>
//               <p className="text-sm text-[#666666] mb-4">Location: {vacancy.location}</p>

//               <p className="text-sm text-[#666666] leading-relaxed mb-6 line-clamp-4">{vacancy.description}</p>

//               <div className="flex flex-wrap gap-2 mb-6">
//                 {vacancy.tags.map((tag, i) => (
//                   <span
//                     key={i}
//                     className="inline-block px-3 py-1 bg-[#ffe8dc] text-[#e87a4d] text-xs font-medium rounded-full"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               <button className="w-full bg-[#e87a4d] hover:bg-[#d66a3d] text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
//                 Apply Now
//                 <span>→</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-10">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {jobs.map((job, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#e87a4d]"
//             >
//               <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{job.title}</h3>
//               <p className="text-sm text-[#666666] mb-2">No. of Vacancy: {job.vacancies}</p>
//               <p className="text-sm text-[#666666] mb-4">Location: {job.location}</p>

//               <div className="mb-6">
//                 <p className="text-sm font-semibold text-[#1a1a1a] mb-2">About Gateway Abroad Jaipur:</p>
//                 <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-line line-clamp-4">{job.about}</p>
//               </div>

//               <div className="flex flex-wrap gap-2 mb-6">
//                 <span className="inline-block px-3 py-1 bg-[#ffe8dc] text-[#e87a4d] text-xs font-medium rounded-full">
//                   Full-Time
//                 </span>
//                 <span className="inline-block px-3 py-1 bg-[#f5f5f5] text-[#666666] text-xs font-medium rounded-full">
//                   2 Year
//                 </span>
//                 <span className="inline-block px-3 py-1 bg-[#f5f5f5] text-[#666666] text-xs font-medium rounded-full">
//                   Mid Level
//                 </span>
//               </div>

//               <button className="w-full bg-[#e87a4d] hover:bg-[#d66a3d] text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
//                 Apply Now
//                 <span>→</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>


//      <section className="min-h-screen bg-gradient-to-b from-[#f9f6f3] to-white flex items-center">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//           {/* Left Content */}
//           <div>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
//               Boost Your Career! Find the Perfect Role with Gateway Abroad
//             </h1>
//             <p className="text-lg text-[#666666] mb-8 leading-relaxed hidden md:block">
//               Join our team and grow with us. Explore exciting career opportunities in education and recruitment.
//             </p>
//           </div>

//           {/* Right Form */}
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <form className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] placeholder:text-[#999999] focus:outline-none focus:border-[#e87a4d]"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] placeholder:text-[#999999] focus:outline-none focus:border-[#e87a4d]"
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] placeholder:text-[#999999] focus:outline-none focus:border-[#e87a4d]"
//               />
//               <select className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[#666666] focus:outline-none focus:border-[#e87a4d] appearance-none bg-white">
//                 <option>Select Vacancy</option>
//                 <option>Frontend Developer</option>
//                 <option>UI/UX Designer</option>
//                 <option>Content Strategist</option>
//               </select>

//               {/* File Upload */}
//               <div className="border-2 border-dashed border-[#e0e0e0] rounded-lg p-6 text-center hover:bg-[#f9f6f3] transition">
//                 <svg
//                   className="w-8 h-8 mx-auto text-[#e87a4d] mb-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
//                   />
//                 </svg>
//                 <p className="text-[#666666] text-sm font-medium">upload your CV Here</p>
//                 <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
//               </div>

//               <button className="w-full bg-[#e87a4d] hover:bg-[#d66a3d] text-white font-bold py-3 rounded-lg transition duration-200">
//                 SUBMIT
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>

//     <PartnerSection/>

    


    
//         </>
//     )
// }