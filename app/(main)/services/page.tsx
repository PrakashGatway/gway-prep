"use client";
// app/page.tsx
import Image from "next/image";
import {
  BookOpen,
  Clock,
  BarChart,
  Mic,
  Calendar,
  FileText,
  Users,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Layers,
  Target,
  TrendingUp,
  MessageSquare,
  Headphones,
  PenTool,
  Video,
  Coffee,
  Home,
  Edit,
  Repeat,
  Sliders,
  Upload,
  Download,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const examPills = [
  { title: "GRE", image: "/home/subject icon/grre.png" },
  { title: "GMAT", image: "/home/subject icon/gmat.png" },
  { title: "ACT", image: "/home/subject icon/act.png" },
  { title: "IELTS", image: "/home/subject icon/ielts.png" },
  { title: "TOEFL", image: "/home/subject icon/toefl.png" },
  { title: "DUOLINGO", image: "/home/subject icon/dulingo.png" },
];

const practiceCards = [
  {
    icon: <FileText className="w-6 h-6 text-orange-500" />,
    title: "Full-Length Mock",
    description:
      "Exact replicas of the real exam scenario, including question types, difficulty, and time limit.",
    tags: ["Score Report", "Section Analysis"],
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    title: "Short Quizzes (10-20)",
    description:
      "Quick burst practice sessions for daily exam preparation. Advanced practice for quick topic tests.",
    tags: ["Daily", "Topic Tests"],
  },
  {
    icon: <Layers className="w-6 h-6 text-orange-500" />,
    title: "Sectional Tests",
    description:
      "Focused practice on individual exam sections. Practice daily, weekly, monthly, and annual tests.",
    tags: ["Section-wise", "Flexible"],
  },
  {
    icon: <Target className="w-6 h-6 text-orange-500" />,
    title: "Topic-Wise Tests",
    description:
      "Drill any specific topic. Sentence completion, critical reasoning, and reading comprehension.",
    tags: ["Grammar", "RC", "CR"],
  },
  {
    icon: <Sliders className="w-6 h-6 text-orange-500" />,
    title: "Customized Mock",
    description:
      "Build your own mock exams. Practice daily, weekly, monthly, and annual tests.",
    tags: ["Custom", "Flexible"],
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    title: "Diagnostic Mock Tests",
    description:
      "Pre-program baseline tests that map your current level. Practice daily, weekly, monthly, and annual tests.",
    tags: ["Baseline", "Progress"],
  },
];

const highlightData = {
  title: "Built for One Thing:",
  subtitle: "Your highest score.",
  description:
    "Every feature, every practice session, every AI insight is engineered to maximize your exam performance. No fluff. Just results.",
  stats: [
    { value: "5,000+", label: "Students Trust Us" },
    { value: "98%", label: "Score Improvement" },
    { value: "4.9/5", label: "Average Rating" },
  ],
};

const analyticsData = {
  title: "Your Performance, Visualized",
  subtitle: "Deep intelligence reports on every test",
  metrics: [
    { label: "Time per Question", value: "1.2 min" },
    { label: "Accuracy", value: "87%" },
    { label: "Predictive Score", value: "320" },
    { label: "Improvement", value: "+15%" },
  ],
  chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  chartData: [65, 72, 68, 80, 75, 82, 88],
};

const aiStackData = {
  title: "The AI Stack That Changes",
  highlight: "Everything.",

  description:
    "From speaking practice to predictive analytics—our AI suite doesn't replace great teachers, it amplifies them and gives you a personal edge that no classroom alone can offer.",

  button: "Try All Services Free",

  cards: [
    {
      id: 1,
      title: "AI Performance Analytics",
      icon: "/services/icons/01.webp",
      background: "#FFFFFF",
      description:
        "Deep intelligence reports on every test attempt. Analyze time-per-question, error patterns, cognitive heatmaps, fatigue analysis, and weekly score trajectories—all visualized to help you improve faster.",
    },
    {
      id: 2,
      title: "AI Essay & Writing Grader",
      icon: "/services/icons/02.webp",
      background: "#FFFFFF",
      description:
        "Submit AWA essays or IELTS writing tasks and receive detailed evaluation with score predictions, structured feedback, vocabulary suggestions, grammar corrections, and model answers for comparison.",
    },
    {
      id: 3,
      title: "AI Speaking Coach (IELTS/TOEFL)",
      icon: "/services/icons/03.webp",
      background: "#FFF8E8",
      description:
        "Practice speaking responses 24/7 with AI evaluation. Get instant pronunciation analysis, fluency ratings, grammar corrections, and personalized suggestions just like a real examiner.",
    },
    {
      id: 4,
      title: "Practice with AI (Conversational)",
      icon: "/services/icons/04.webp",
      background: "#FFF8E8",
      description:
        "Experience real exam-style conversations with our AI tutor. It adapts to your responses, evaluates performance in real time, and builds confidence naturally.",
    },
    {
      id: 5,
      title: "AI Study Plan Generator",
      icon: "/services/icons/05.webp",
      background: "#FFFFFF",
      description:
        "Input your target score, exam date, and daily availability. AI generates a personalized day-by-day study schedule that continuously adapts based on your progress.",
    },
    {
      id: 6,
      title: "AI Weakness Detector",
      icon: "/services/icons/06.webp",
      background: "#FFFFFF",
      description:
        "After just a few practice sessions, AI identifies your weakest concepts, pinpoints sub-topics, and automatically recommends focused practice until mastery is achieved.",
    },
  ],
};

const resourcesData = {
  title: "Resources to Power Your Prep",
  heading:
    "From personalized result PDFs to expert strategy guides build your complete study library with our professionally designed downloadable resources",
  cards: [
    {
      title: "Mock Tests",
      description: "Full-length adaptive tests across all exams",
      metric: "500+",
    },
    {
      title: "PDF Notes",
      description: "Expert-curated comprehensive study materials",
      metric: "1,200+",
    },
    {
      title: "Previous Papers",
      description: "Real exam papers with detailed video solutions",
      metric: "300+",
    },
    {
      title: "Vocabulary Builder",
      description: "High-frequency words with audio and context",
      metric: "3,500+",
    },
    {
      title: "Practice Sets",
      description: "Topic-wise practice with instant AI feedback",
      metric: "50K+",
    },
  ],
  button_text: "Access All Free Download",
};

const supportData = {
  heading: "You're Never Alone in This Journey.",
  subheading:
    "From personalized result PDFs to expert strategy guides build your complete study library with our professionally designed downloadable resources",
  cards: [
    {
      title: "24/7 Helpline",
      description:
        "Academic questions, technical issues, or just need guidance — our support team is live 24 hours a day, 7 days a week.",
      contact_info: "1800-000-0000",
      button_text: "Call Now",
    },
    {
      title: "1-on-1 Counseling",
      description:
        "Personalized career & exam counseling sessions to align your exam strategy with your target universities and career goals.",
      button_text: "Book Session",
    },
    {
      title: "WhatsApp Support",
      description:
        "Get instant answers from our academic team directly on WhatsApp — doubt resolution within 15 minutes, guaranteed during study hours.",
      button_text: "Chat on WhatsApp",
    },
    {
      title: "Motivational Check-ins",
      description:
        "Weekly mentor-led motivational calls to keep you on track, accountable, and energized — especially during the tough stretches of preparation.",
      button_text: "Learn More",
    },
  ],
};

const testimonialsData = {
  cards: [
    {
      image: "/images/student1.jpg",
      name: "Rahul Mehta",
      country: "India → USA",
      rating: 5,
      review:
        "Ooshas Prep transformed my GRE preparation. The AI mock tests identified my weak areas instantly. I went from 298 to 327 in just 3 months!",
      score: "GRE: 327/340",
      university: "Stanford University",
      improvement: "+29 pts",
    },
    {
      image: "/images/student2.jpg",
      name: "Sarah Chen",
      country: "China → UK",
      rating: 5,
      review:
        "The personalized study plan and AI feedback on my speaking was incredible. I achieved 8.5 in IELTS which I never thought possible.",
      score: "IELTS: 8.5/9.0",
      university: "University of Oxford",
      improvement: "+1.5 bands",
    },
    {
      image: "/images/student3.jpg",
      name: "Ahmed Al-Rashid",
      country: "UAE → USA",
      rating: 5,
      review:
        "The adaptive learning system focused on exactly what I needed. My GMAT jumped from 650 to 740. The live classes made all the difference.",
      score: "GMAT: 740/800",
      university: "Wharton School",
      improvement: "+90 pts",
    },
    {
      image: "/images/student4.jpg",
      name: "Priya Nair",
      country: "India → Canada",
      rating: 5,
      review:
        "Outstanding platform! The real exam simulations prepared me perfectly. AI evaluation of speaking responses was incredibly accurate and helpful.",
      score: "TOEFL: 114/120",
      university: "University of Toronto",
      improvement: "+18 pts",
    },
  ],
};

const universitiesData = {
  cards: [
    {
      name: "USA",
      logo: "/services/icons/destination 01.webp",
      bg: "bg-[#F3F6FF]",
    },
    {
      name: "Canada",
      logo: "/services/icons/destination 02.webp",
      bg: "bg-[#FFF4F4]",
    },
    {
      name: "Australia",
      logo: "/services/icons/destination 03.webp",
      bg: "bg-[#F3F6FF]",
    },
    {
      name: "UK",
      logo: "/services/icons/destination 04.webp",
      bg: "bg-[#FFF7F2]",
    },
    {
      name: "France",
      logo: "/services/icons/destination 05.webp",
      bg: "bg-[#F4FBF2]",
    },
    {
      name: "Italy",
      logo: "/services/icons/destination 06.webp",
      bg: "bg-[#FAF5FF]",
    },
  ],
};

const ctaBannerData = {
  title: "Your Score is the Passport. The World is the Destination.",
  subtitle:
    "Every exam we take is a chance to prove that you're ready for the world. Start your journey today.",
  cta: "Start Free Trial",
};

const footerData = {
  columns: [
    {
      title: "Product",
      links: ["Practice Tests", "AI Tools", "Study Plans", "Resources"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
    {
      title: "Support",
      links: ["Help Center", "FAQs", "Community", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ],
  social: [
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
  ],
  copyright: "© 2026 PrepEra. All rights reserved.",
};

function AIStackSection() {
  return (
    <section className="bg-[#FDF4EF] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
        <div className="flex items-center justify-evenly flex-col md:flex-row ">
          {/* Heading */}
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#343434]">
              {aiStackData.title}{" "}
              <span className="text-[#f26e46]">{aiStackData.highlight}</span>
            </h2>

            <p className="mt-2 text-lg leading-8 text-[#5A5A5A] max-w-2xl">
              {aiStackData.description}
            </p>
          </div>

          {/* AI Network */}
          <div className="flex justify-center mt-10">
            <Image
              src="/services/ai 2.webp"
              alt="AI Network"
              width={420}
              height={280}
              className="object-contain"
            />
          </div>
        </div>

        {/* Cards + Robot */}
        <div className="relative mt-10 hidden lg:block h-[640px]">
          {/* Robot */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2  z-20">
            <Image
              src="/services/ai.webp"
              width={320}
              height={360}
              alt="Robot"
            />
          </div>

          {/* Left Top */}
          <FeatureCard
            feature={aiStackData.cards[0]}
            className="absolute left-0 top-0"
          />

          {/* Right Top */}
          <FeatureCard
            feature={aiStackData.cards[1]}
            className="absolute right-0 top-0"
          />

          {/* Left Middle */}
          <FeatureCard
            feature={aiStackData.cards[2]}
            className="absolute left-0 top-[220px]"
          />

          {/* Right Middle */}
          <FeatureCard
            feature={aiStackData.cards[3]}
            className="absolute right-0 top-[220px]"
          />

          {/* Left Bottom */}
          <FeatureCard
            feature={aiStackData.cards[4]}
            className="absolute left-24 bottom-0"
          />

          {/* Right Bottom */}
          <FeatureCard
            feature={aiStackData.cards[5]}
            className="absolute right-24 bottom-0"
          />
        </div>

        {/* Mobile Layout */}
        <div className="grid gap-6 lg:hidden mt-10">
          <div className="flex justify-center mb-4">
            <Image
              src="/services/robot.webp"
              alt="Robot"
              width={180}
              height={180}
            />
          </div>

          {aiStackData.cards.map((card) => (
            <FeatureCard key={card.id} feature={card} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <button className="rounded-full bg-[#F2643D] hover:bg-[#E95D35] transition-all px-8 py-4 font-semibold text-white shadow-lg">
            {aiStackData.button}
          </button>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  feature: {
    title: string;
    description: string;
    icon: string;
    background: string;
  };
  className?: string;
}

function FeatureCard({ feature, className = "" }: CardProps) {
  return (
    <div
      className={`${className} w-[380px] h-[12rem] rounded-[28px] border border-[#F2A285] p-6 `}
      style={{
        background: feature.background,
      }}
    >
      <div className="flex gap-4">
        <div className="h-10 w-10 absolute -top-4 -left-4 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
          <Image src={feature.icon} alt={"img"} width={22} height={22} />
        </div>

        <div>
          <h3 className="font-bold text-lg text-[#303030]">{feature.title}</h3>

          <p className="mt-3 text-[15px] leading-6 text-[#5D5D5D]">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const environments = [
  {
    title: "Premium Classroom Centers",
    image: "/services/img/1.webp",
    large: true,
  },
  {
    title: "Digital Live Classrooms",
    image: "/services/img/2.webp",
  },
  {
    title: "1-on-1 Mentor Sessions",
    image: "/services/img/3.webp",
  },
  {
    title: "Private Study Rooms",
    image: "/services/img/4.webp",
  },
  {
    title: "AI Learning Hub",
    image: "/services/img/5.webp",
  },
];

function EnvironmentSection() {
  return (
    <section className="bg-[#FFDDD3] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#333333]">
            An Environment That Breeds
            <br />
            <span className="text-[#f26e46]">Champions.</span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#5B5B5B]">
            From our premium study centers to our online classrooms— every
            environment is built to keep you focused, motivated, and surrounded
            by students as driven as you are.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left Large Card */}
          <Card
            title={environments[0].title}
            image={environments[0].image}
            className="lg:row-span-2 h-[520px]"
          />

          {/* Right Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {environments.slice(1).map((item) => (
              <Card
                key={item.title}
                title={item.title}
                image={item.image}
                className="h-[250px]"
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-8">
          <button className="rounded-full bg-[#F2643D] hover:bg-[#e45b33] transition-all text-white font-semibold px-8 py-3">
            Visit All Centers
          </button>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  image: string;
  className?: string;
}

function Card({ title, image, className }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] group ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-5 left-0 right-0 text-center">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
}

export default function page() {
  return (
    <div className="min-h-screen ">
      <section className="relative overflow-hidden bg-[#FDF4EF] min-h-auto py-10 flex items-center">
        {/* Background Curve */}
        <img
          // src="/services/hero-line.svg"
          src="/services/h.webp"
          alt=""
          className="absolute -right-16 -bottom-3 h-full w-[56%] object-contain pointer-events-none select-none"
        />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div className=" items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-20 py-10"
            >
              {/* Heading */}

              <h1 className="leading-none ">
                <span className="block text-3xl md:text-5xl font-bold text-[#f26e46]">
                  Score Higher.
                </span>

                <span className="block mt-3 text-3xl md:text-5xl font-semibold text-[#3B3B3B]">
                  Dream Further.
                  <span className="text-[#f26e46] font-bold">
                    Study Abroad.
                  </span>
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-8 text-[#4D4D4D]">
                Our comprehensive service ecosystem bridges the gap between
                effort and outcomes-combining flexible formats, AI-powered
                analytics, and certified mentors to ensure your peak performance
                on exam day.
              </p>

              {/* <div className="flex gap-5 mt-10">

          <button className="rounded-full bg-[#F2643D] hover:bg-[#e45b33] transition px-8 py-4 text-white font-semibold">
            Get Started
          </button>

          <button className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold hover:border-[#F2643D]">
            Learn More
          </button>

        </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exam Pills */}
      <section className="px-4 md:px-8 py-6 mx-auto bg-[#FFDDD3]">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {examPills.map((exam) => (
            <span
              key={exam.title}
              className="bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md text-gray-700 text-sm font-medium px-5 py-2 rounded transition cursor-pointer"
            >
              <img
                // src="/services/hero-line.svg"
                src={exam.image}
                alt="img"
                className="h-14"
              />
            </span>
          ))}
        </div>
      </section>

      {/* Practice Cards Section */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            <span className="text-[#f26e46] mx-2">
              Every Type of Practice Your
            </span>
            Exam Demands
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            From full-length simulations to 5-minute topic drills—our mock test
            suite is the most comprehensive in India.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceCards.map((card, idx) => (
            <div
              key={card.title}
              className={`${idx % 2 === 0 ? "bg-[#FEF6F3]" : "bg-[#FEFBEA]"} border-2 border-[#ED7553] rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white  px-4 lg:px-8">
        {/* Top Button */}
        <div className="flex justify-center mb-4">
          <button className="flex items-center gap-2 rounded-full bg-[#F36C45] px-8 py-3 text-white font-semibold text-lg shadow-md hover:bg-[#e85f35] transition">
            Take a Free Full-Length Mock Test
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Card */}
        <div className="max-w-7xl mx-auto rounded-[40px] border border-[#E8DDD7] bg-[#FDF4EF] px-8  py-2">
          <div className="grid lg:grid-cols-2 items-center ">
            {/* Left */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#303030]">
                Built for One Thing:
              </h2>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#f26e46] ">
                Your highest score.
              </h2>

              <p className="mt-8 text-[#4B4B4B] text-xl leading-8 ">
                Our purpose-built exam portal is trusted by 50,000+ students.
                <br />
                Clean interface, real exam feel, instant results.
                <br />
                Everything engineered for performance.
              </p>
            </div>

            {/* Right */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/services/ai333.webp"
                alt="Exam Portal"
                width={420}
                height={220}
                className="w-full max-w-[460px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="relative max-w-7xl mx-auto m-12 h-[260px] sm:h-[380px] md:h-[500px] lg:h-[620px]">
        {/* Left Dashboard */}
        <div className="absolute left-30 top-0 w-[48%] z-10">
          <img
            src="/services/dashboard 01.webp"
            alt="Dashboard Results"
            className="w-full rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        {/* Right Dashboard */}
        <div className="absolute right-50 top-[12%] w-[38%] z-20">
          <img
            src="/services/dashboard 02.webp"
            alt="Mock Test"
            className="w-full rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      <AIStackSection />
      <EnvironmentSection />

      {/* Resources Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-left max-w-3xl">
            <h3 className="leading-none ">
              <span className="block mt-3 text-3xl md:text-5xl font-semibold text-[#3B3B3B] flex flex-col">
                Every Resouece You Need,
                <span className="text-[#f26e46] font-bold">
                  One Click Away.
                </span>
              </span>
            </h3>
            <p className="text-gray-600 text-lg mt-4">
              {resourcesData.heading}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {resourcesData.cards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col items-center jsutify-center gap-2 text-center"
              >
                <div className="h-12 w-12 rounded bg-[#FFF6ED] hover:bg-[#FA8227] p-2 rounded-xl">
                  <img src={card.icon} alt="icon" className="" />
                </div>

                <h4 className="font-bold text-gray-900 text-lg">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-sm">{card.description}</p>
                <p className="text-orange-500 font-bold text-sm">
                  {card.metric}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-sm transition">
              Access All Free Download →
            </button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-4 md:px-8 py-16  mx-auto bg-[#FFDDD3]">
        <div className="text-center mb-10 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#f26e46] font-bold">
            <span className="mx-2 text-gray-900">You're Never Alone in</span>
            This Journey.
          </h2>
          <p className="text-gray-600 text-lg mt-2">{supportData.subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {supportData.cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-[32px] px-7 py-8 text-center border border-[#F3F3F3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="relative flex justify-center mb-6">
                <div className="absolute w-20 h-20 rounded-full bg-orange-100 blur-2xl opacity-40"></div>

                <div className="relative w-20 h-20 rounded-full bg-[#FFF8F3] flex items-center justify-center shadow-sm">
                  <div className="text-[#FE6610] text-4xl">{card.icon}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[28px] font-semibold text-[#1F2937] leading-tight">
                {card.title}
              </h3>

              {/* Divider */}
              <div className="w-12 h-[3px] rounded-full bg-[#FE6610] mx-auto my-5"></div>

              {/* Description */}
              <p className="text-[#667085] text-[15px] leading-7 flex-grow">
                {card.description}
              </p>

              {/* Contact Info */}
              {card.contact_info && (
                <p className="mt-6 text-[#FE6610] font-semibold text-[24px]">
                  {card.contact_info}
                </p>
              )}

              {/* Button */}
              <button
                className={`mt-8 h-14 rounded-2xl text-[17px] font-semibold transition-all duration-300 flex items-center justify-center gap-2
          ${
            card.primary
              ? "bg-[#FE6610] text-white hover:bg-[#e95a08]"
              : "border-2 border-[#FE6610] text-[#FE6610] hover:bg-[#FE6610] hover:text-white"
          }`}
              >
                {card.button_text}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#FAFAFA] py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="max-w-4xl mb-10 px-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#222] leading-tight">
              Real Students.
            </h2>

            <h2 className="text-3xl md:text-5xl font-bold text-[#f26e46] leading-tight ">
              Real Scores.Real Dreams.
            </h2>

            <p className="mt-4 text-lg text-[#555] leading-6 max-w-5xl">
              Over 50,000 students have trusted PrepElite to get them to their
              target scores and into the world's best universities.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {testimonialsData.cards.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[30px] border border-[#ECECEC] p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Student */}
                <div className="flex items-center gap-4 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover bg-gray-800"
                  />

                  <div>
                    <h3 className="text-xl font-semibold text-[#222]">
                      {item.name}
                    </h3>

                    <p className="text-[#777] text-sm">{item.country}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FE6610] text-[#FE6610]"
                    />
                  ))}

                  <span className="ml-2 text-[#666] font-medium">
                    {item.rating}.0
                  </span>
                </div>

                {/* Review */}
                <p className="text-sm leading-6 text-[#555] flex-grow">
                  {item.review}
                </p>

                {/* Bottom */}
                <div className="mt-8">
                  <div className="inline-flex px-2 py-1 rounded-full bg-[#FFF3EB] text-[#FE6610] font-semibold text-lg">
                    {item.score}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[#777] text-sm">{item.university}</p>

                    <p className="font-bold text-[#22C55E]">
                      {item.improvement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries / Universities Section */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="">
          {/* Heading */}
          <div className="text-center max-w-5xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="text-[#f26e46]">
                Your Score is the Passport.
              </span>{" "}
              <span className="text-[#222]">The World is the Destination.</span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-[#555] leading-9 max-w-4xl mx-auto">
              Every exam we teach is a direct gateway to the world's greatest
              universities. We don't just prepare you for a test - we prepare
              you for the life that follows it.
            </p>
          </div>

          {/* Countries */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 max-w-6xl mx-auto">
            {universitiesData.cards.map((country) => (
              <div
                key={country.name}
                className={`rounded-[26px] p-8 flex flex-col items-center justify-center
          border border-[#EFEFEF] hover:-translate-y-2 hover:shadow-lg
          transition-all duration-300 ${country.bg}`}
              >
                <img src={country.logo} className="h-14 w-14 rounded-lg" />

                <h3 className="text-2xl font-semibold text-[#1F2937]">
                  {country.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        {/* Top Search Bar */}
        <div className="max-w-5xl mx-auto px-4 -mb-12 relative z-10">
          <div className="bg-[#FFF5F1] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-[#FCE8DE]">
            <p className="text-[#222] text-base md:text-lg font-medium">
              Not Sure where to start
            </p>

            <button className="bg-[#FE6610] hover:bg-[#F25A00] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Find My Destination
            </button>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-[#FE6A3A] pt-20 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Your Dream University is
              <br />
              One Score Away.
            </h2>

            <p className="mt-6 text-white/90 text-lg  max-w-3xl mx-auto leading-6">
              Join 50,000+ students who chose Ooshas Prep to transform their
              preparation into admission letters from the world's best
              universities.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
              <button className="bg-white text-[#222] px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300">
                Start Free - Claim Demo + Diagnostic
              </button>

              <button className="bg-[#3D1E16] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2B140F] transition-all duration-300">
                Explore the Portal First
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
