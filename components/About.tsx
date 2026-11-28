"use client";

import { motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import PopupModal from "./popupModel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/hooks/AppStateContext";

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
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <main
      className="min-h-screen bg-white text-[#3E3E3E] [&_.prose]:font-medium [&_.prose]:leading-7 [&_.prose_p]:my-4 [&_.prose_p]:text-[#3E3E3E] [&_.prose_li]:my-2 [&_.prose_li]:text-[#3E3E3E] [&_.prose_strong]:font-bold [&_.prose_strong]:text-[#C84F31] [&_.prose_b]:font-bold [&_.prose_b]:text-[#C84F31] [&_.prose_h1]:font-bold [&_.prose_h1]:tracking-tight [&_.prose_h1]:text-[#17243A] [&_.prose_h2]:font-bold [&_.prose_h2]:tracking-tight [&_.prose_h2]:text-[#17243A] [&_.prose_h3]:font-semibold [&_.prose_h3]:tracking-tight [&_.prose_h3]:text-[#17243A]"
      id="main-content"
    >
      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />

      {/* ---------------- Hero ---------------- */}
      <section className="bg-cover bg-center bg-no-repeat bg-[#FDF4ED] pt-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-14">
            {/* Left Content */}
            <div className="order-1 text-center sm:pb-12 lg:order-1 lg:text-left">
              <h1 className="text-left text-3xl font-bold leading-tight tracking-tight text-[#17243A] md:text-3xl lg:text-4xl">
                <span className="text-primary">
                  {hero?.title?.split("||")[0]}
                </span>
                {hero?.title?.split("||")[1]}
              </h1>

              <p className="mx-auto my-4 max-w-2xl text-left text-base text-[#3E3E3E] lg:mx-0 lg:text-lg">
                {hero?.subtitle}
              </p>

              <div className="mt-3 flex flex-wrap lg:justify-start gap-3">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="min-h-12 cursor-pointer rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:opacity-90"
                >
                  {hero?.buttons?.primary || "Get Started"}
                </button>
                {/* 
                <button className="rounded-xl border-2 border-black bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-100">
                  {hero?.buttons?.secondary || "Learn More"}
                </button> */}
              </div>
            </div>

            {/* Right Image */}
            <div className="h-100 w-full order-2 lg:order-2 flex justify-center">
              <img
                src={hero?.image || "about/girl.png"}
                alt="About"
                className="max-w-xl w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* {whoWeAre.title && whoWeAre.description && (
        <section
          className="bg-white py-12 md:py-16 lg:py-20"
          aria-labelledby="who-are-we"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-1 grid lg:grid-cols-2 gap-8 md:gap-14 items-center">
            <div>
              <h2
                id="who-are-we"
                className="text-left text-2xl md:text-3xl lg:text-4xl font-bold"
              >
                {whoWeAre.title.split("||")[0]}
                <span className="text-primary">
                  {whoWeAre.title.split("||")[1]}
                </span>
              </h2>
             
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
      )} */}

      {/* {(features.title || features.description) && (
        <section
          className="relative bg-[#FDF4EF] py-12 md:py-16 lg:py-20 overflow-hidden"
          aria-labelledby="what-will-we-do"
          style={{
            backgroundImage: "url('/about/76.webp')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-1 grid lg:grid-cols-2 gap-8 md:gap-14 items-start">
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
                  <span className="">{features.title.split("||")[0]}</span>
                  <span className="text-[#fa6b2a]">
                    {features.title.split("||")[1]}
                  </span>
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
                    <p className="mt-1 text-xs md:text-sm text-[#3E3E3E]">
                      {ele.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )} */}

      {leaders.title && leaderItems.length > 0 && (
        <section
          className="relative w-full overflow-hidden bg-white px-4 py-12 sm:px-6 md:py-16 lg:py-20"
          aria-labelledby="people-behind"
        >
          <div className="relative mx-auto w-full max-w-7xl xl:px-1">
            <div className="mb-10 sm:mb-12">
              <h2
                id="people-behind"
                className="text-left text-2xl font-bold leading-tight tracking-tight text-[#17243A] sm:text-3xl lg:text-4xl"
              >
                {leaders.title.split("||")[0]}
                <span className="text-primary">
                  {leaders.title.split("||")[1]}
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-10">
              {leaderItems
                .slice()
                .reverse()
                .map((person: any, idx: number) => (
                  <article
                    key={person.name || idx}
                    className="relative mx-auto w-full max-w-7xl rounded-[28px] border border-[#17243A]/25 bg-gradient-to-r from-[#FFF9F5] via-white to-[#F7F9FC] px-5 pb-12 pt-16 sm:px-10 sm:pb-14 sm:pt-20"
                  >
                    <svg aria-hidden="true" viewBox="0 0 72 60" className="pointer-events-none absolute left-3 top-3 h-12 w-12 rotate-180 fill-[#F36C45] sm:left-5 sm:top-8">
                     
                       <path d="M18 3C9.2 3 3 9.2 3 18c0 7.3 5.6 12.5 13 13-1.6 7-5.6 13.4-11.8 18.7l5 5.6C23 47 31 34.7 31 19.6 31 9.7 25.8 3 18 3Zm37 0c-8.8 0-15 6.2-15 15 0 7.3 5.6 12.5 13 13-1.6 7-5.6 13.4-11.8 18.7l5 5.6C60 47 68 34.7 68 19.6 68 9.7 62.8 3 55 3Z" />
                    </svg>
                    <svg aria-hidden="true" viewBox="0 0 72 60" className="pointer-events-none absolute bottom-3 right-3 h-12 w-12  fill-[#F36C45] sm:bottom-4 sm:right-5">
                      <path d="M18 3C9.2 3 3 9.2 3 18c0 7.3 5.6 12.5 13 13-1.6 7-5.6 13.4-11.8 18.7l5 5.6C23 47 31 34.7 31 19.6 31 9.7 25.8 3 18 3Zm37 0c-8.8 0-15 6.2-15 15 0 7.3 5.6 12.5 13 13-1.6 7-5.6 13.4-11.8 18.7l5 5.6C60 47 68 34.7 68 19.6 68 9.7 62.8 3 55 3Z" />
                    </svg>

                    <div className="absolute left-16 top-0 flex max-w-[calc(100%-2rem)] -translate-y-1/2 items-center gap-2.5 rounded-full bg-white px-3 py-2 text-gray-800 border border-[#17243A] sm:gap-3 sm:px-4 sm:py-2.5">
                      {person.image ? (
                        <img
                          src={person.image}
                          alt=""
                          loading="lazy"
                          className="h-8 w-8 shrink-0 rounded-full border border-[#17243A] object-cover sm:h-9 sm:w-9"
                        />
                      ) : (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17243A] text-sm font-semibold text-white sm:h-9 sm:w-9">
                          {person.name?.charAt(0)}
                        </span>
                      )}
                      <h3 className="truncate text-base font-semibold sm:text-xl">
                        {person.name}
                      </h3>
                    </div>

                    {person.designation && (
                      <div className="mx-auto max-w-6xl text-center text-base font-medium italic leading-7 text-[#17243A] sm:text-xl sm:leading-8 [&_p]:my-0 [&_p]:italic [&_strong]:font-bold [&_strong]:text-[#F36C45] [&_b]:font-bold [&_b]:text-[#F36C45]">
                        {parseHtml(person.designation)}
                      </div>
                    )}
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}

      {statsItems.length > 0 && (
        <section className="bg-white" aria-label="Key statistics">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 py-8 md:py-10 border-y-2 border-gray-200 text-center">
            {statsItems.map((stat: any) => (
              <dl key={stat.label}>
                <dt className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f26e46]">
                  {stat.value}
                </dt>
                <dd className="mt-1 md:mt-2 text-sm md:text-lg text-gray-700">
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

      {(cta.title ||
        cta.subtitle ||
        cta.primaryButton ||
        cta.primaryButtonUrl) && (
        <CallToActionSection
          title={cta.title}
          subtitle={cta.subtitle}
          primaryButton={cta.primaryButton || "Take a Free Mock Test"}
          primaryButtonUrl={cta.primaryButtonUrl}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-1">
        {/* ================= Desktop ================= */}
        <div
          className="hidden lg:grid grid-cols-4 grid-rows-2 gap-0"
          aria-label="Learning features grid"
        >
          {/* Main Content */}
          <div className="col-span-2 row-span-1 flex flex-col justify-center pr-8">
            <h2
              id="world-class-learning"
              className="text-left text-2xl md:text-3xl lg:text-4xl font-bold"
            >
              {title.split("||")[0] || "World-Class Learning for"}
              <br />
              <span className="text-[#f26e46]">
                {title.split("||")[1] || "Anyone, Anywhere"}
              </span>
            </h2>
            <p className="mt-4 xl:mt-4 max-w-lg text-base xl:text-lg leading-7 xl:leading-8 text-[#3E3E3E]">
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
            <p className="mt-4 md:mt-5 text-[#3E3E3E] text-base md:text-lg">
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
            <p className="mt-3 md:mt-4 text-sm text-[#3E3E3E]">{description}</p>
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
      <h3 className="text-xl md:text-2xl font-bold leading-tight">{title}</h3>
      <p
        className={`mt-2 sm:mt-3 text-sm sm:text-base leading-5 sm:leading-6 md:leading-7 ${
          orange ? "text-white" : "text-[#3E3E3E]"
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
  primaryButtonUrl,
  secondaryButton,
}: {
  title?: string;
  subtitle?: string;
  primaryButton?: string;
  primaryButtonUrl?: string;
  secondaryButton?: string;
}) {
  const router = useRouter();
  const { user } = useGlobal();
  const [popup, setpopup] = useState(false);

  //   const user = await userInfo();
  //   if (!user) {
  //     router.push("/auth");
  //     return;

  //   }

  //   const dashboardBaseUrl = "https://dashboard.ooshasprep.com";
  //   const configuredRoute = primaryButtonUrl?.trim() || "";
  //   const destination = /^https?:\/\//i.test(configuredRoute)
  //     ? configuredRoute
  //     : dashboardBaseUrl + "/" + configuredRoute.replace(/^\/+/, "");

  //   window.location.assign(destination);
  // };

  const getDashboardDestination = (url: string) => {
    const dashboardBase = "https://dashboard.ooshasprep.com/";
    const resourceUrl = new URL(url, dashboardBase);
    return new URL(
      `${resourceUrl.pathname}${resourceUrl.search}${resourceUrl.hash}`,
      dashboardBase,
    ).href;
  };
  const navigateToMockTest = () => {
    if (!primaryButtonUrl) {
      router.push("https://dashboard.ooshasprep.com/tests");
    }

    const destination = getDashboardDestination(primaryButtonUrl);
    if (user) {
      window.location.href = destination;
      return;
    }

    router.push(`/auth?redirect=${encodeURIComponent(destination)}`);
  };
  return (
    <section className="relative mx-auto mt-8 flex max-w-7xl items-center overflow-hidden px-4 py-6 sm:px-6 xl:px-1">
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
              <button
                onClick={navigateToMockTest}
                className="sflex-shrink-0 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#f26e46] transition-all hover:bg-opacity-95 whitespace-nowrap"
              >
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
              <button
                onClick={() => setpopup(true)}
                className="flex-shrink-0 flex cursor-pointer items-center gap-2 rounded-lg bg-[#525252] px-6 py-3 font-semibold text-white transition-all hover:bg-[#414141] whitespace-nowrap"
              >
                {secondaryButton}
              </button>
            )}
          </div>
          <PopupModal isPopupOpen={popup} setIsPopupOpen={setpopup} />
        </motion.div>
      </div>
    </section>
  );
}
