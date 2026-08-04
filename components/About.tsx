"use client";

import { motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import PopupModal from "./popupModel";
import { useState } from "react";



export default function About({ sections }: any) {
  // // console.log(sections, 'About data ');

  const hero = sections?.["About-Hero"]?.fields || {};
  const whoWeAre = sections?.["About-Who-We-Are"]?.fields || {};
  const features = sections?.["About-Features"]?.fields || {};
  const leaders = sections?.["About-Leaders"]?.fields || {};
  const statistics = sections?.["About-Statistics"]?.fields || {};
  const learning = sections?.["About-Learning"]?.fields || {};
  const teachers = sections?.["About-Teachers"]?.fields || {};
  const cta = sections?.["About-Final-CTA"]?.fields || {};

  // Parse description if it contains HTML
  const parseHtml = (html: string) => {
    if (!html) return null;
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // Check if features description has list items
  const hasFeatureItems =
    features.description && features.description.includes("<li");

  // Parse learning items
  const learningItems = learning.items || [];

  // Parse leader items
  const leaderItems = leaders.items || [];

  // Parse statistics items
  const statsItems = statistics.items || [];
  const [isPopupOpen,setIsPopupOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-white text-gray-800" id="main-content">
      {/* ---------------- Hero ---------------- */}
      <section
        className="bg-cover bg-center bg-no-repeat py-16 lg:py-12 bg-[#FDF4ED]"
        style={{
          backgroundImage: "url('/aboutbg.webp')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }} // Update with your image path
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold">
                <span className="text-primary">
                  {hero?.title?.split("||")[0]}
                </span>
                {hero?.title?.split("||")[1]}
              </h1>

              <p className="mt-3 max-w-xl mx-auto lg:mx-0 text-lg leading-8 ">
                {hero?.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                <button onClick={() => setIsPopupOpen(true)} className="rounded-xl bg-primary px-8 py-4 text-white font-semibold transition hover:opacity-90">
                  {hero?.buttons?.primary || "Get Started"}
                </button>
{/* 
                <button className="rounded-xl border-2 border-black bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-100">
                  {hero?.buttons?.secondary || "Learn More"}
                </button> */}
              </div>
              
            <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <img
                src={hero?.image || "/about.webp"}
                alt="About"
                className="w-full max-w-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {whoWeAre.title && whoWeAre.description && (
        <section
          className="bg-white py-12 md:py-16 lg:py-20"
          aria-labelledby="who-are-we"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 md:gap-14 items-center">
            <div>
              <h2
                id="who-are-we"
                className="text-left text-2xl md:text-3xl lg:text-4xl font-bold"
              >
                {whoWeAre.title.split("||")[0]}
                <span className="text-primary">{whoWeAre.title.split("||")[1]}</span>
              </h2>
              {/* <div className="mt-4 md:mt-6 text-sm md:text-base text-gray-600 leading-relaxed prose prose-sm max-w-none">
                {parseHtml(whoWeAre.description)}
              </div> */}
              <div
                className="prose max-w-none text-slate-700 
             prose-headings:text-slate-900
             [&_ul]:list-disc 
             [&_ol]:list-decimal 
             [&_ul]:pl-5 
             [&_ol]:pl-5 
             [&_li]:my-2
             [&_p]:my-4
             "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(whoWeAre.description),
                }}
              />
            </div>

            <div
              className="relative h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px]"
              aria-hidden="true"
            >
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
      )}

      {(features.title || features.description) && (
        <section
          className="relative bg-[#FDF4EF] py-12 md:py-16 lg:py-20 overflow-hidden"
          aria-labelledby="what-will-we-do"
          style={{
            backgroundImage: "url('/about/76.webp')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 md:gap-14 items-start">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full max-w-md lg:max-w-none">
                <img
                  src="/about/girl.png"
                  alt="Smiling student holding a laptop"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              {features.title && (
                <h2
                  id="what-will-we-do"
                  className="text-center text-2xl md:text-3xl lg:text-5xl font-bold mb-4"
                >
                  {features.title}
                </h2>
              )}

              {features.description && (
                <div
                  className="prose max-w-none text-slate-700 
                    prose-headings:text-slate-900
                    [&_ul]:list-disc 
                    [&_ol]:list-decimal 
                    [&_ul]:pl-5 
                    [&_ol]:pl-5 
                    [&_li]:my-4
                    [&_p]:my-4
                    "
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(features.description),
                  }}
                />
              )}

              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                {features.items.map((ele) => (
                  <article className="bg-white shadow-sm px-4 md:px-6 py-4 md:py-5 border-l-4 md:border-l-[14px] border-[#f26e46]">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">
                      {ele.title}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-gray-600">
                      {ele.description}
                    </p>
                  </article>
                ))}
                
              </div>
            </div>
          </div>
        </section>
      )}

      {leaders.title && leaderItems.length > 0 && (
        <section
          className="bg-white py-12 md:py-16 lg:py-20"
          aria-labelledby="people-behind"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="people-behind"
              className="text-center text-2xl md:text-3xl lg:text-5xl font-bold"
            >
              {leaders.title.split("||")[0]}
              <span className="text-primary">
                {leaders.title.split("||")[1]}
              </span>
            </h2>

            <div className="mt-8 md:mt-16 grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
              {leaderItems.map((person: any, idx: number) => (
                <article
                  key={person.name || idx}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(242,110,70,0.35)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Decorative gradient blob */}
                  <div
                    className={`absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 ${
                      idx === 0
                        ? "bg-gradient-to-br from-[#FDD9C4] to-[#f26e46]"
                        : "bg-gradient-to-br from-[#FDE8DC] to-[#f8b89e]"
                    }`}
                  />

                  {/* Top accent bar */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#f26e46] via-[#f8a07a] to-[#f26e46]" />

                  {/* Corner number badge */}
                  {/* <span className="absolute top-4 right-5 text-5xl font-black text-[#f26e46]/10 group-hover:text-[#f26e46]/20 transition-colors leading-none select-none">
                  0{idx + 1}
                </span> */}

                  <div className="relative flex flex-col items-center px-6 md:px-8 pt-10 pb-8">
                    {/* Avatar with ring animation */}
                    {person.image && (
                      <figure className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f26e46] to-[#f8a07a] blur-md opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500" />
                        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-[#f26e46] to-[#f8a07a]">
                          <img
                            src={
                              person.image ||
                              `https://randomuser.me/api/portraits/${idx === 0 ? "women/50" : "women/55"}.jpg`
                            }
                            alt={`Portrait of ${person.name}`}
                            className="w-full h-full object-cover rounded-full border-4 border-white group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    )}

                    {/* Name */}
                    <h3 className="mt-5 text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                      {person.name}
                    </h3>

                    {/* Divider */}
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#f26e46] to-[#f8a07a] group-hover:w-20 transition-all duration-500" />

                    {/* Designation */}
                    {person.designation && (
                      <div className="mt-4 text-center text-sm md:text-[15px] text-gray-600 leading-relaxed">
                        {parseHtml(person.designation)}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            
          </div>
        </section>
      )}

      {statsItems.length > 0 && (
        <section className="bg-white" aria-label="Key statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 py-8 md:py-10 border-y-2 border-black text-center">
            {statsItems.map((stat: any) => (
              <dl key={stat.label}>
                <dt className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#f26e46]">
                  {stat.value}
                </dt>
                <dd className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
                  {stat.label}
                </dd>
              </dl>
            ))}
          </div>
        </section>
      )}

      {learning.title && learningItems.length > 0 && (
        <LearningSection
          title={learning.title}
          description={learning.subtitle}
          items={learningItems}
        />
      )}

      {(cta.title || cta.subtitle) && (
        <CallToActionSection
          title={cta.title}
          subtitle={cta.subtitle}
          primaryButton={cta.primaryButton}
          secondaryButton={cta.secondaryButton}
        />
      )}
    </main>
  );
}

function LearningSection({ title, description, items }: any) {
  // console.log(description, "oiuuijoijijoijoijoj");

  // Map your items to the card format
  const cards = items.map((item: any, index: number) => ({
    title: item.title,
    body: item.description, // Map description to body
    orange: index === 0 || index === 2 || index === 4, // Set orange for specific indices
  }));

  return (
    <section
      className="bg-white py-12 md:py-16 lg:py-20"
      aria-labelledby="world-class-learning"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= Desktop ================= */}
        <div
          className="hidden lg:grid grid-cols-4 grid-rows-2 gap-0"
          aria-label="Learning features grid"
        >
          {/* Main Content */}
          <div className="col-span-2 row-span-1 flex flex-col justify-center pr-8">
            <h2
              id="world-class-learning"
              className="text-left text-2xl md:text-3xl lg:text-5xl font-bold"
            >
              {title.split("||")[0] || "World-Class Learning for"}
              <br />
              <span className="text-[#f26e46]">
                {title.split("||")[1] || "Anyone, Anywhere"}
              </span>
            </h2>
            <p className="mt-4 xl:mt-4 max-w-lg text-base xl:text-lg leading-7 xl:leading-8 text-[#6B7280]">
              {description}
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
        <div
          className="hidden md:block lg:hidden"
          aria-label="Learning features grid"
        >
          <div className="mb-8 md:mb-10">
            <h2
              id="world-class-learning"
              className="text-2xl md:text-4xl font-bold text-[#3E3E3E]"
            >
              {title.split("||")[0] || "World-Class Learning for"}
              <br />
              <span className="text-[#f26e46]">
                {title.split("||")[1] || "Anyone, Anywhere"}
              </span>
            </h2>
            <p className="mt-4 md:mt-5 text-gray-500 text-base md:text-lg">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2">
            {cards.map((card: any) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>

        {/* ================= Mobile ================= */}
        <div className="md:hidden" aria-label="Learning features list">
          <div className="mb-6 md:mb-10">
            <h2
              id="world-class-learning"
              className="text-2xl md:text-4xl font-bold text-[#3E3E3E]"
            >
              {title.split("||")[0] || "World-Class Learning for"}
              <br />
              <span className="text-[#f26e46]">
                {title.split("||")[1] || "Anyone, Anywhere"}
              </span>
            </h2>
            <p className="mt-3 md:mt-4 text-sm text-gray-500">{description}</p>
          </div>

          <div className="space-y-0">
            {cards.map((card: any) => (
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
  orange = false, // Default to false
}: {
  title: string;
  body: string;
  orange?: boolean;
}) {
  return (
    <article
      className={`
        p-5 sm:p-6 md:p-8 xl:p-10
        flex flex-col justify-center
        ${orange ? "bg-[#f26e46] text-white" : "bg-[#F5F5F5] text-[#3E3E3E]"}
      `}
    >
      <h3 className="text-xl md:text-2xl xl:text-[30px] font-bold leading-tight">
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

function CallToActionSection({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
}: {
  title?: string;
  subtitle?: string;
  primaryButton?: string;
  secondaryButton?: string;
}) {
  return (
    <section className="relative overflow-hidden flex items-center py-6 mt-8 max-w-6xl mx-auto">
      <div
        className="w-full mx-auto bg-[#f26e46] md:rounded-[24px] overflow-hidden 
        flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 min-h-[160px]"
      >
        <motion.div
          initial={{ x: "-150%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
            duration: 1,
          }}
          className="flex-shrink-0 z-10 w-[180px] md:w-[220px] md:absolute md:left-8 md:bottom-0"
        >
          <img
            src="/footer.png"
            alt="Student reading on beanbag"
            className="w-full h-auto object-contain block"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between w-full md:pl-[240px] gap-6 text-center md:text-left"
        >
          <div className="text-white max-w-xl">
            {title && (
              <h6 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
                {title}
              </h6>
            )}
            {subtitle && (
              <p className="text-sm md:text-base opacity-90 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {primaryButton && (
              <button className="flex-shrink-0 flex items-center gap-2 bg-white text-[#f26e46] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap">
                {primaryButton}
                <svg
                  xmlns="http://w3.org"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9"
                  />
                </svg>
              </button>
            )}
            {secondaryButton && (
              <button className="flex-shrink-0 flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-800 transition-all whitespace-nowrap">
                {secondaryButton}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


