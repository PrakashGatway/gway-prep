"use client";

import Image from "next/image";

const FALLBACK_ITEMS = [
  { title: "GRE", image: "/home/subject icon/grre.png" },
  { title: "GMAT", image: "/home/subject icon/gmat.png" },
  { title: "ACT", image: "/home/subject icon/act.png" },
  { title: "IELTS", image: "/home/subject icon/ielts.png" },
  { title: "TOEFL", image: "/home/subject icon/toefl.png" },
  { title: "DUOLINGO", image: "/home/subject icon/dulingo.png" },
];

export function TestPrepGrid({ data }: { data: any }) {
  const items =
    // data?.fields?.items?.length > 0
    //   ? data.fields.items :
       FALLBACK_ITEMS;

  return (
    <section className=" overflow-hidden">
      <div
        className="container max-w-7xl mx-auto px-6 py-1  relative"
        style={{
          backgroundImage: 'url("/home/bgimg.png")',
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >

        {/* Desktop */}
        <div className="relative hidden lg:block h-[600px]">
          
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center  ">
          <span className="inline-flex items-center rounded-full border border-orange-100 bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-500">
            ✦ Trusted by 50,000+ Students Globally ✦
          </span>

          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">
            Master Your Test Prep
            <span className="block text-orange-500 ">
              With Ooshas Prep
            </span>
          </h2>

          <p className="mt-2 text-lg text-gray-600 leading-relaxed">
            From language proficiency to aptitude exams, get structured
            guidance and resources to crack the tests that matter for your
            study abroad journey.
          </p>
        </div>

          <div className="absolute left-1/2 top-[12rem] -translate-x-1/2  z-10">
            <Image
              src="/home/00023.png"
              alt="Student"
              width={420}
              height={420}
              className="object-contain"
            />
          </div>

          {/* Top Left */}
          <div className="absolute left-[8%] top-[6%] rotate-10">
            <LogoCard item={items[0]} />
          </div>

          {/* Middle Left */}
          <div className="absolute left-[2%] top-[35%] ">
            <LogoCard item={items[1]} />
          </div>

          {/* Bottom Left */}
          <div className="absolute left-[10%] bottom-[28%] -rotate-10">
            <LogoCard item={items[2]} />
          </div>

          {/* Top Right */}
          <div className="absolute right-[8%] top-[6%] -rotate-10">
            <LogoCard item={items[3]} />
          </div>

          {/* Middle Right */}
          <div className="absolute right-[2%] top-[35%]">
            <LogoCard item={items[4]} />
          </div>

          {/* Bottom Right */}
          <div className="absolute right-[10%] bottom-[28%] rotate-10">
            <LogoCard item={items[5]} />
          </div>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-2 gap-5 lg:hidden">
          {items.map((item: any, index: number) => (
            <LogoCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoCard({ item }: { item: any }) {
  if (!item) return null;

  return (
    <div className="group flex h-[90px] w-[180px] items-center justify-center rounded-3xl border border-white/60 bg-white/80 px-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title || "Logo"}
          width={120}
          height={50}
          className="max-h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <span className="text-2xl font-bold text-gray-800">
          {item.title}
        </span>
      )}
    </div>
  );
}