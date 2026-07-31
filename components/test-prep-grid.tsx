"use client";

// import { getPages } from "@/app/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export function TestPrepGrid({
  data,
  NavData,
}: {
  data: any;
  NavData: any;
}) {
  const router = useRouter();
  const FALLBACK_ITEMS = [
    { title: "GRE", image: "/home/subject icon/gre.png", slug:"gre" },
    { title: "GMAT", image: "/home/subject icon/gmat.png", slug:"gmat" },
    { title: "ACT", image: "/home/subject icon/act.png", slug:"act" },
    { title: "IELTS", image: "/home/subject icon/ielts.png", slug:"ielts" },
    { title: "TOEFL", image: "/home/subject icon/toefl.png", slug:"toefl" },
    { title: "PTE", image: "/home/subject icon/pte.webp", slug:"pte" },
  ];
  const DATA = React.useMemo(
    () =>
      NavData?.filter(
        (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
      ) || [],
    [NavData],
  );

  const items =
    DATA.length > 0
      ? DATA.map((item: any) => ({
          title: item.seoMeta.navTitle,
          image: item?.seoMeta?.navIcon,
          slug: item?.seoMeta?.canonicalUrl,
        }))
      : FALLBACK_ITEMS;

  return (
    <section className="overflow-hidden">
      <div
        className="container max-w-7xl mx-auto px-4 sm:px-6 py-1 relative"
        style={{
          backgroundImage: 'url("/home/bgimg.png")',
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Desktop - Unchanged */}
        <div className="relative hidden lg:block h-[600px]">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-orange-100 bg-orange-100 mt-2 px-5 py-2 text-sm font-semibold text-[#f26e46]">
              ✦ {data.fields?.heading || "Trusted by 50,000+ Students Globally"}{" "}
              ✦
            </span>

            <h3 className="mt-2 text-center text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold leading:7 lg:leading-14">
              {data.fields?.title?.split("||")[0] || "Master Your Test Prep"}
              <span className="block text-primary">
                {data.fields?.title?.split("||")[1] || "With Ooshas Prep"}
              </span>
            </h3>

            <p className="mt-2 text-lg leading-relaxed">
              {data.fields.subtitle ||
                `From language proficiency to aptitude exams, get structured
              guidance and resources to crack the tests that matter for your
              study abroad journey.`}
            </p>
          </div>

          <div className="absolute left-1/2 top-[12rem] -translate-x-1/2 z-10">
            <Image
              src="/home/00023.png"
              alt="Student"
              width={420}
              height={420}
              className="object-contain"
            />
          </div>

          {/* Top Left */}
          <div
            className="absolute left-[8%] top-[6%] rotate-10 cursor-pointer"
            onClick={() => {
              router.push(`${items[0]?.slug || "/gre"}`);
            }}
          >
            <LogoCard item={items[0]} />
          </div>

          {/* Middle Left */}
          <div
            className="absolute left-[2%] top-[35%] cursor-pointer"
            onClick={() => {
              router.push(`${items[1]?.slug || "/gre"}`);
            }}
          >
            <LogoCard item={items[1]} />
          </div>

          {/* Bottom Left */}
          <div
            className="absolute left-[10%] bottom-[28%] -rotate-10 cursor-pointer"
            onClick={() => {
              router.push(`${items[2]?.slug || "/gre"}`);
            }}
          >
            <LogoCard item={items[2]} />
          </div>

          {/* Top Right */}
          <div
            className="absolute right-[8%] top-[6%] -rotate-10 cursor-pointer"
            onClick={() => {
              router.push(`${items[3]?.slug || "/gre"}`);
            }}
          >
            <LogoCard item={items[3]} />
          </div>

          {/* Middle Right */}
          <div
            className="absolute right-[2%] top-[35%] cursor-pointer"
            onClick={() => {
              router.push(`${items[4]?.slug || "/gre"}`);
            }}
          >
            <LogoCard item={items[4]} />
          </div>

          {/* Bottom Right */}
          <div
            className="absolute right-[10%] bottom-[28%] rotate-10 cursor-pointer"
            onClick={() => {
              router.push(`${items[5]?.slug || "/gre"}`);
            }}
          >
            <LogoCard item={items[5]} />
          </div>
        </div>

        {/* Mobile & Tablet Responsive View */}
        <div className="lg:hidden">
          {/* Header for Mobile */}
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-orange-100 bg-orange-100 mt-2 px-5 py-2 text-sm font-semibold text-[#f26e46]">
              ✦ {data.fields?.heading || "Trusted by 50,000+ Students Globally"}{" "}
              ✦
            </span>

            <h3 className="mt-2 text-center text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold leading:7 lg:leading-14">
              {data.fields?.title?.split("||")[0] || "Master Your Test Prep"}
              <span className="block text-primary">
                {data.fields?.title?.split("||")[1] || "With Ooshas Prep"}
              </span>
            </h3>

            <p className="mt-2 text-lg leading-relaxed">
              {data.fields.subtitle ||
                `From language proficiency to aptitude exams, get structured
              guidance and resources to crack the tests that matter for your
              study abroad journey.`}
            </p>
          </div>

          {/* Center Image */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <Image
              src="/home/00023.png"
              alt="Student"
              width={280}
              height={280}
              className="object-contain w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72"
            />
          </div>

          {/* Grid of Test Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-lg sm:max-w-xl mx-auto pb-8">
            {FALLBACK_ITEMS.map((item: any, index: number) => (
              <div key={index} className="flex justify-center">
                <LogoCard
                  item={item}
                  onClick={() => {
                    const routes = [
                      "gre",
                      "gmat",
                      "act",
                      "ielts",
                      "toefl",
                      "pte",
                    ];
                    router.push(`/${item.slug}`);
                  }}
                  isMobile={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCard({
  item,
  onClick,
  isMobile,
}: {
  item: any;
  onClick?: () => void;
  isMobile?: boolean;
}) {
  if (!item) return null;

  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-center rounded-3xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer
        ${
          isMobile
            ? "h-[80px] w-[140px] sm:h-[90px] sm:w-[160px] md:h-[100px] md:w-[180px] px-4 sm:px-6"
            : "h-[90px] w-[180px] px-6"
        }`}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title || "Logo"}
          width={120}
          height={50}
          className={`object-contain transition-transform duration-300 group-hover:scale-110
            ${isMobile ? "max-h-[40px] sm:max-h-[45px] md:max-h-[50px]" : "max-h-[50px]"}`}
        />
      ) : (
        <span
          className={`font-bold text-gray-800
          ${isMobile ? "text-lg sm:text-xl md:text-2xl" : "text-2xl"}`}
        >
          {item.title}
        </span>
      )}
    </div>
  );
}
