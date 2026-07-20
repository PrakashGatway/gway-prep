





"use client";

import { useState } from "react";
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
  Star,
} from "lucide-react";
import { Consultants } from "./destinations-consultants";
// import Consultants from '@/components/Consultants';

const orange = "#ED6B2C";

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
    Megaphone: Megaphone,
  };
  return icons[iconName] || null;
};

// Helper function to get background color
const getBgColor = (bg: string) => {
  const colors: { [key: string]: string } = {
    "#EFF6FF": "#EFF6FF",
    "#F0FDF4": "#F0FDF4",
    "#FEF3F2": "#FEF3F2",
  };
  return colors[bg] || "#F3F4F6";
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
        <span className="text-base font-semibold text-black text-left">
          {q}
        </span>
        <span className="text-2xl font-light" style={{ color: orange }}>
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div
          className="px-6 pb-4 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: a }}
        />
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
   build: {
    title: string;
    description: string;
    image: string;
    buttons: {
      primary: string;
    };
  };
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
  console.log(sections["Career-FAQ"], "main");

  const [data, setData] = useState<CareersData>({
    hero: {
      title:
        sections["Career-Hero"]?.fields?.title ||
        "Build Your Future While Helping Students Build Theirs",
      subtitle:
        sections["Career-Hero"]?.fields?.subtitle ||
        "Join a team that's redefining test preparation",
      description:
        sections["Career-Hero"]?.fields?.description?.replace(/<[^>]*>/g, "") ||
        "",
      image: sections["Career-Hero"]?.fields?.image || "",
      buttons: {
        primary:
          sections["Career-Hero"]?.fields?.primaryButton ||
          "Explore Open Roles",
        secondary:
          sections["Career-Hero"]?.fields?.secondaryButton || "Meet Our Team",
      },
    },
    whyJoin:
      sections["Career-Why-Join"]?.fields?.items?.map((item: any) => ({
        icon: item.icon || "Users",
        bg: item.background || "#EFF6FF",
        title: item.title || "",
        desc: item.description || "",
      })) || [],
    stats:
      sections["Career-Stats"]?.fields?.items?.map((item: any) => ({
        icon: item.icon || "👥",
        value: item.value || "",
        label: item.label || "",
      })) || [],
    build : {
      title:
        sections["Career-Hero"]?.fields?.title ||
        "Build Your Future While Helping Students Build Theirs",
      description:
        sections["Career-Hero"]?.fields?.description?.replace(/<[^>]*>/g, "") ||
        "",
      image: sections["Career-Hero"]?.fields?.image || "",
      buttons: {
        primary:
          sections["Career-Hero"]?.fields?.primaryButton ||
          "Explore Open Roles"
      },
    
    },
    departments:
      sections["Career-Departments"]?.fields?.items?.map((item: any) => ({
        icon: item.icon || "GraduationCap",
        title: item.title || "",
        points: item.points || "",
      })) || [],
    lifeGallery:
      sections["Career-Life"]?.fields?.items?.map((item: any) => ({
        label: item.label || "",
        img: item.image || "",
      })) || [],
    benefits:
      sections["Career-Benefits"]?.fields?.items?.map((item: any) => ({
        icon: item.icon || "Heart",
        title: item.title || "",
        desc: item.description || "",
      })) || [],
    hiringProcess:
      sections["Career-Hiring-Process"]?.fields?.items?.map((item: any) => ({
        icon: item.icon || "FileText",
        title: item.title || "",
        desc: item.description || "",
      })) || [],
    openPositions:
      sections["Career-Open-Positions"]?.fields?.items?.map((item: any) => ({
        icon: item.icon || "GraduationCap",
        title: item.title || "",
        exp: item.experience || "",
        loc: item.location || "",
        type: item.type || "Full-time",
      })) || [],
    testimonials:
      sections["Career-Testimonials"]?.fields?.items?.map((item: any) => ({
        name: item.name || "",
        role: item.role || "",
        quote: item.quote || "",
        img: item.image || "",
        rating: item.rating || 5,
      })) || [],
    faqs: sections["Career-FAQ"],
    cta: {
      title:
        sections["Career-CTA"]?.fields?.title || "Ready to Make an Impact?",
      description:
        sections["Career-CTA"]?.fields?.description?.replace(/<[^>]*>/g, "") ||
        "",
      image: sections["Career-CTA"]?.fields?.image || "",
      buttons: {
        primary: sections["Career-CTA"]?.fields?.primaryButton || "Apply Now",
        secondary:
          sections["Career-CTA"]?.fields?.secondaryButton || "Browse All Jobs",
      },
    },
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
              {data.hero?.title.split("||")[0]}
              <span style={{ color: orange }}>
                {data.hero?.title.split("||")[1]}
              </span>
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
            
            <h1 className="text-[42px] md:text-[52px] font-extrabold leading-tight text-black">
              {data.build?.title.split("||")[0]}
              <span style={{ color: orange }}>
                {data.build?.title.split("||")[1]}
              </span>
             
            </h1>
            <p className="mt-6 text-black/80 text-lg max-w-md leading-relaxed">
              {data.build.description}
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                className="px-8 py-4 rounded-lg text-white text-base font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: orange }}
              >
                {data.build.buttons.primary}
              </button>
            </div>
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
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3"
              >
                <span className="text-4xl">{s.icon}</span>
                <span className="text-2xl font-bold text-black">{s.value}</span>
                <span className="text-sm text-gray-700 leading-snug">
                  {s.label}
                </span>
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
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-lg transition"
                >
                  {Icon && <Icon size={26} style={{ color: orange }} />}
                  <h3 className="text-[15px] font-bold text-black leading-snug min-h-[40px]">
                    {d.title}
                  </h3>
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: d.points }}
                  />
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
      {/* <section className="bg-[#FCEEE5] pb-20">
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
      </section> */}

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
    <section
  className="relative bg-[#FCEEE5] lg:bg-[url('/image_30c67b71.png')] bg-no-repeat bg-center bg-cover"
>
  <div className="max-w-7xl mx-auto relative lg:h-[420px] px-6 py-12 lg:px-0 lg:py-0">
    {/* STEP 1 */}
    <div className="lg:absolute lg:top-[120px] lg:left-[80px] max-w-full lg:max-w-[260px] mb-8 lg:mb-0">
      <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>
        {data.hiringProcess[1].title}
      </h3>

      <p className="text-gray-700 leading-7 lg:leading-8 text-base lg:text-lg">
        {data.hiringProcess[1].desc}
      </p>
    </div>

    {/* STEP 2 */}
    <div className="lg:absolute lg:bottom-10 lg:left-[390px] max-w-full lg:max-w-[300px] mb-8 lg:mb-0">
      <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>
        {data.hiringProcess[2].title}
      </h3>

      <p className="text-gray-700 leading-7 lg:leading-8 text-base lg:text-lg">
        {data.hiringProcess[2].desc}
      </p>
    </div>

    {/* STEP 3 */}
    <div className="lg:absolute lg:bottom-10 lg:right-[90px] max-w-full lg:max-w-[300px]">
      <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>
        {data.hiringProcess[0].title}
      </h3>

      <p className="text-gray-700 leading-7 lg:leading-8 text-base lg:text-lg">
        {data.hiringProcess[0].desc}
      </p>
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
                    <h3 className="text-[16px] font-bold text-black">
                      {p.title}
                    </h3>
                    <span
                      className="text-[11px] font-semibold px-3 py-1 rounded-full border shrink-0"
                      style={{ color: orange, borderColor: orange }}
                    >
                      {p.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Experience: {p.exp}
                  </p>
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
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col gap-4"
              >
                <div className="flex gap-1" style={{ color: orange }}>
                  {Array.from({ length: t.rating || 5 }).map((_, s) => (
                    <Star key={s} size={16} fill={orange} strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
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
