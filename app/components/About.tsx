"use client";

import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: "Expert Coaching",
    body: "Master the nuances of IELTS, PTE, SELT, GRE, GMAT, SAT and TOEFL with experienced faculty, personalized attention, and proven strategies.",
  },
  {
    title: "Comprehensive Material",
    body: "Dive deep with up-to-date study materials, practice tests, and mock exams, mirroring the real test experience.",
  },
  {
    title: "Personalized Guidance",
    body: "Chart your course to success with individual attention, performance analysis, and goal-oriented mentorship.",
  },
  {
    title: "Confidence Boost",
    body: "Hone your test-taking skills, overcome weaknesses, and build the confidence to ace your exams.",
  },
  {
    title: "Aid in Scholarship",
    body: "High scores in exams of your choice help in obtaining good scholarships.",
  },
];

const STATS = [
  { value: "11+", label: "National Office" },
  { value: "11+", label: "International Office" },
  { value: "10000+", label: "Students" },
  { value: "15+", label: "Experience" },
];

const TEACHERS = [
  { name: "Arjun Malhotra", role: "CEO & Founder", img: "men/32" },
  { name: "Neha Khanna", role: "Chief Product Officer", img: "women/44" },
  { name: "Raghav Bansal", role: "Design Manager", img: "men/65" },
  { name: "Ishita Sengupta", role: "Marketing Specialist", img: "women/68" },
  { name: "Karan Verma", role: "Android Developer", img: "men/12" },
  { name: "Pooja Iyer", role: "Head of Engineering", img: "women/21" },
  { name: "Aditya Nair", role: "Senior Product Designer", img: "men/76" },
  { name: "Simran Kaur", role: "VP Product Strategy", img: "women/79" },
];

const PEOPLE = [
  { name: "Ms. Sakshi T", img: "https://randomuser.me/api/portraits/women/50.jpg" },
  { name: "Mrs. Renu Arora", img: "https://randomuser.me/api/portraits/women/55.jpg" },
];

const BIO =
  "as a prominent figure. She holds certification as a UK Counsellor from the British Council. Additionally, she is accredited as an IELTS trainer by both the British Council and IDP, along with expertise in training for PTE, TOEFL, SELT, GRE, GMAT and SAT exams. Ms. Sakshi's passion for travel has led her to explore over 20 countries, enriching her understanding of diverse cultures and educational systems. Every day, she commits herself to counseling numerous students, empowering them to pursue their academic and career goals with confidence and clarity.";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800" id="main-content">
      {/* ---------------- HERO ---------------- */}
      <section className="relative  overflow-hidden" aria-label="Hero banner">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/about/hero.jpg')",
          }}
          role="img"
          aria-label="Students collaborating on projects"
        />
        <div className="absolute inset-0 " aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl"
          >
            The Story of Ooshas Prep
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[#f26e46] px-6 md:px-7 py-2.5 md:py-3 text-sm font-semibold text-white hover:bg-[#e55d35] transition-colors w-full sm:w-auto justify-center">
              Get Started Today
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-black px-6 md:px-7 py-2.5 md:py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center">
              Learn More
            </a>
          </motion.div>

          <p className="mt-4 md:mt-6 text-white/80 text-xs md:text-sm">Join us and unlock your limitless potential!</p>
        </div>
      </section>

      {/* ---------------- WHO ARE WE ---------------- */}
      <section className="bg-white py-12 md:py-16 lg:py-20" aria-labelledby="who-are-we">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <h2 id="who-are-we" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Who Are <span className="text-[#f26e46]">We?</span>
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-600 leading-relaxed">
              At Gateway Abroad Education, we are a trusted overseas education consultants dedicated to helping
              students achieve their dreams of pursuing overseas study. Our expert team supports you at every step,
              from selecting the ideal course to excelling in test preparation for crucial exams, such as the
              English Proficiency test like IELTS, TOEFL, GRE, PTE, GMAT and SAT more. We&apos;re more than just
              educators; we&apos;re your mentors and advisors, guiding you toward success in abroad education.
              Whether it&apos;s securing a study abroad scholarship, navigating the study visa process, or applying
              for a study loan, we are here to make your journey smoother and brighter.
            </p>
          </div>

          <div className="relative h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px]" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[78%] h-[62%] rounded-xl md:rounded-2xl overflow-hidden shadow-xl ring-4 md:ring-8 ring-white">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Students using laptops together"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[62%] h-[52%] rounded-xl md:rounded-2xl overflow-hidden shadow-xl ring-4 md:ring-8 ring-white">
              <img
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80"
                alt="Student studying on a laptop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT WILL WE DO ---------------- */}
      <section className="relative bg-[#FDF4EF] py-12 md:py-16 lg:py-20 overflow-hidden" aria-labelledby="what-will-we-do" style={{
        backgroundImage: "url('/about/76.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover"
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 md:gap-14 items-start">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full max-w-md lg:max-w-none">
              <img
                src="/about/girl.png"
                alt="Smiling student holding a laptop"
                className="w-full h-full object-contain "
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h2 id="what-will-we-do" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              What Will We <span className="text-[#f26e46]">Do for You?</span>
            </h2>

            <ul className="mt-4 md:mt-6 space-y-3" role="list">
              {FEATURES.map((f) => (
                <li key={f.title} className="text-sm md:text-base text-gray-600 leading-relaxed">
                  <strong className="font-semibold text-gray-900">{f.title}:</strong> {f.body}
                </li>
              ))}
            </ul>

            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              <article className="bg-white shadow-sm px-4 md:px-6 py-4 md:py-5 border-l-4 md:border-l-[14px] border-[#f26e46]">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Our mission</h3>
                <p className="mt-1 text-xs md:text-sm text-gray-600">
                  To set the standard in higher education consultancy, unlocking the door to success for all in our community.
                </p>
              </article>
              <article className="bg-white shadow-sm px-4 md:px-6 py-4 md:py-5 border-l-4 md:border-l-[14px] border-[#f26e46]">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Our vision</h3>
                <p className="mt-1 text-xs md:text-sm text-gray-600">
                  To ensure every student, and every university can meet their full potential on the world&apos;s stage.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="bg-white py-12 md:py-16 lg:py-20" aria-labelledby="people-behind">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="people-behind" className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
            People behind <span className="text-[#f26e46]">Ooshas prep</span>
          </h2>

          <div className="mt-8 md:mt-14 grid sm:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
            {PEOPLE.map((p, idx) => (
              <article key={p.name} className={`relative pt-6 md:pt-8 rounded-lg ${idx === 0 ? 'bg-[#FDF4EF]' : 'bg-[#F8F8F8]'} flex items-center justify-center flex-col px-4`}>
                <figure className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden z-10 border-4 border-white shadow-lg">
                  <img src={p.img} alt={`Portrait of ${p.name}`} className="w-full h-full object-cover" loading="lazy" />
                </figure>
                <h3 className="font-bold text-[#f26e46] pt-2 pb-1 border-b-2 border-[#f26e46] text-sm md:text-base">{p.name}</h3>
                <div className="px-2 md:px-6 pt-4 md:pt-6 pb-4 md:pb-6">
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{BIO}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATS BAR ---------------- */}
      <section className="bg-white" aria-label="Key statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 py-8 md:py-10 border-y-2 border-black text-center">
          {STATS.map((s) => (
            <dl key={s.label}>
              <dt className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#f26e46]">{s.value}</dt>
              <dd className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">{s.label}</dd>
            </dl>
          ))}
        </div>
      </section>

      <LearningSection />

      {/* ---------------- TEACHERS ---------------- */}
      <section className="bg-neutral-100 py-12 md:py-16 lg:py-20" aria-labelledby="meet-teachers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="meet-teachers" className="text-2xl sm:text-3xl md:text-4xl  font-extrabold text-gray-900 text-center md:text-left">
            Meet our professional and
            <br />
            <span className="text-[#f26e46]">experience teachers in here</span>
          </h2>

          <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto" role="list">
            {TEACHERS.map((t) => (
              <article key={t.name} className="text-center" role="listitem">
                <figure className="aspect-square w-full rounded-lg md:rounded-xl overflow-hidden bg-[#f26e46]/90 shadow-md">
                  <img
                    src={`https://randomuser.me/api/portraits/${t.img}.jpg`}
                    alt={`Portrait of ${t.name}, ${t.role}`}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                    loading="lazy"
                  />
                </figure>
                <h4 className="mt-3 md:mt-4 font-bold text-gray-900 text-sm md:text-base">{t.name}</h4>
                <p className="text-xs text-gray-400">{t.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />

      {/* ---------------- SECONDARY CTA ---------------- */}
      <section className="bg-[#f26e46] py-12 md:py-16 lg:py-20" aria-labelledby="dream-university">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="dream-university" className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
            Your Dream University is
            <br />
            One Score Away.
          </h2>
          <p className="mt-3 md:mt-4 text-white/85 text-sm md:text-base max-w-xl mx-auto">
            Join 50,000+ students who chose Ooshas Prep to transform their preparation into admission letters from
            the world&apos;s best universities.
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href="#" className="inline-flex items-center rounded-full bg-white px-6 md:px-7 py-2.5 md:py-3 text-sm font-semibold text-[#f26e46] hover:bg-neutral-100 transition-colors w-full sm:w-auto justify-center">
              Start Free – Claim Demo + Diagnostic
            </a>
            <a href="#" className="inline-flex items-center rounded-full bg-black px-6 md:px-7 py-2.5 md:py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center">
              Explore the Portal First
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}



 function CallToActionSection() {
  return (
    <section className="relative overflow-hidden flex items-center py-6 mt-8 max-w-6xl mx-auto">
      {/* Main Orange Banner Container */}
      <div className=" w-full mx-auto bg-primary md:rounded-[24px] overflow-hidden 
      flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 min-h-[160px]">
        
        {/* Left Side: Animated Character Image */}
        <motion.div
        
          // initial={{ x: '-150%', opacity: 0 }}
          // whileInView={{ x: 0, opacity: 1 }} // Triggers when element is visible
          // viewport={{ once: true, amount: 0.2 }} // Fires only once when 20% visible
          // transition={{ 
          //   type: 'spring', 
          //   stiffness: 60, 
          //   damping: 15,
          //   duration: 1 
          // }}
          initial={{ x: '-150%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            type: 'spring', 
            stiffness: 60, 
            damping: 15,
            duration: 1 
          }}
          className="flex-shrink-0 z-10 w-[180px] md:w-[220px] md:absolute md:left-8 md:bottom-0"
        >
          <img 
            src="/footer.png" 
            alt="Student reading on beanbag" 
            className="w-full h-auto object-contain block"
          />
        </motion.div>

        {/* Right Side: Text content & Button */}
        {/* The orchestrator delay ensures text appears AFTER the boy slides in */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between w-full md:pl-[240px] gap-6 text-center md:text-left"
        >
          {/* Text Content */}
          <div className="text-white max-w-xl">
            <h6 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
              Ready to Achieve Your Dreams?
            </h6>
            <p className="text-sm md:text-base opacity-90 font-medium">
              Join thousands of successful students and start your journey today.
            </p>
          </div>

          {/* Call to Action Button */}
          <button className="flex-shrink-0 flex items-center gap-2 bg-white text-[#FF6A13] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap">
            Enroll Now
            <svg 
              xmlns="http://w3.org" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
}



const cards = [
  {
    title: "Curriculum Based on Industry Needs",
    body: "Save time and money! The curriculum is made easier to understand and aligned with industry needs.",
    orange: true,
  },
  {
    title: 'Blended-Learning Method',
    body: 'The learning process uses the "blended-learning" method, namely online and offline.',
    orange: false,
  },
  {
    title: "Certification",
    body: "You will get a certificate that can be used as a certification during job hunting.",
    orange: true,
  },
  {
    title: 'Rating Auto-grading',
    body: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    orange: false,
  },
  {
    title: "Ready to Work",
    body: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    orange: true,
  },
];

function LearningSection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" aria-labelledby="world-class-learning">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= Desktop ================= */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-0" aria-label="Learning features grid">
          {/* Main Content */}
          <div className="col-span-2 row-span-1 flex flex-col justify-center pr-8">
            <h2 id="world-class-learning" className="text-3xl xl:text-4xl font-extrabold text-[#3E3E3E]">
              World-Class Learning for
              <br />
              <span className="text-[#f26e46]">Anyone, Anywhere</span>
            </h2>
            <p className="mt-4 xl:mt-6 max-w-lg text-base xl:text-lg leading-7 xl:leading-8 text-[#6B7280]">
              Belajar partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </p>
          </div>

          {/* Box 1 */}
          <Card {...cards[0]} />
          {/* Box 2 */}
          <Card {...cards[1]} />
          {/* Empty */}
          <div aria-hidden="true" />
          {/* Box 3 */}
          <Card {...cards[2]} />
          {/* Box 4 */}
          <Card {...cards[3]} />
          {/* Box 5 */}
          <Card {...cards[4]} />
        </div>

        {/* ================= Tablet ================= */}
        <div className="hidden md:block lg:hidden" aria-label="Learning features grid">
          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#3E3E3E]">
              World-Class Learning for
              <br />
              <span className="text-[#f26e46]">Anyone, Anywhere</span>
            </h2>
            <p className="mt-4 md:mt-5 text-gray-500 text-base md:text-lg">
              Belajar partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2">
            {cards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>

        {/* ================= Mobile ================= */}
        <div className="md:hidden" aria-label="Learning features list">
          <div className="mb-6 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-[#3E3E3E]">
              World-Class Learning for
              <br />
              <span className="text-[#f26e46]">Anyone, Anywhere</span>
            </h2>
            <p className="mt-3 md:mt-4 text-sm text-gray-500">
              Belajar partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </p>
          </div>

          <div className="space-y-0">
            {cards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  body,
  orange,
}: {
  title: string;
  body: string;
  orange: boolean;
}) {
  return (
    <article
      className={`
        p-5 sm:p-6 md:p-8 xl:p-10
        flex flex-col justify-center
        ${orange ? "bg-[#f26e46] text-white" : "bg-[#F5F5F5] text-[#3E3E3E]"}
      `}
    >
      <h3 className="text-lg sm:text-xl md:text-2xl xl:text-[30px] font-bold leading-tight">
        {title}
      </h3>
      <p
        className={`mt-2 sm:mt-3 md:mt-4 xl:mt-5 text-xs sm:text-sm md:text-[15px] leading-5 sm:leading-6 md:leading-7 ${
          orange ? "text-white/90" : "text-[#6B7280]"
        }`}
      >
        {body}
      </p>
    </article>
  );
}