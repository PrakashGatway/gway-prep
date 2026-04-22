"use client";

const imgs = [
  { id: 1, src: "/apple-icon.png", alt: "Team meeting" },
  { id: 2, src: "/apple-icon.png", alt: "Woman giving presentation" },
  { id: 3, src: "/apple-icon.png", alt: "Office desk with monitor" },
  { id: 4, src: "/apple-icon.png", alt: "Two people working at desk" },
  { id: 5, src: "/apple-icon.png", alt: "Consultation with family" },
];

export function Mission({data}:any) {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        {/* <h2 className="text-3xl md:text-5xl text-[#626363] font-semibold text-center mb-16 max-w-4xl mx-auto leading-tight">
          <span className="text-[#FF6B35]">We're a small team </span>
          on a mission to improve test prep
        </h2> */}

        <div dangerouslySetInnerHTML={{ __html: data.fields['mission title'] }} />

        {/* Collage Grid */}

        <div className="relative w-full max-w-7xl mx-auto h-[20rem] md:h-[720px] lg:h-[780px] overflow-hidden py-8">
          {/* Top Center - Large Horizontal */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] md:w-[48%] lg:w-[42%] z-20">
            <div className="rounded-[40px] overflow-hidden border-[8px] border-white shadow-2xl">
              <img
                src={imgs[0].src}
                alt={imgs[0].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Top Right - Small Vertical */}
          <div className="absolute top-8 right-4 md:right-8 lg:right-12 w-[28%] md:w-[24%] lg:w-[21%] z-10">
            <div className="rounded-[32px] overflow-hidden border-[5px] border-white shadow-xl">
              <img
                src={imgs[2].src}
                alt={imgs[2].alt}
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
          </div>

          {/* Middle Left - Square */}
          <div className="absolute top-[38%] left-4 md:left-8 lg:left-12 w-[26%] md:w-[23%] z-30">
            <div className="rounded-[32px] overflow-hidden border-[5px] border-white shadow-xl">
              <img
                src={imgs[1].src}
                alt={imgs[1].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Bottom Leftish - Large Vertical */}
          <div className="absolute bottom-6 left-[18%] md:left-[22%] lg:left-[26%] w-[32%] md:w-[29%] z-10">
            <div className="rounded-[40px] overflow-hidden border-[7px] border-white shadow-2xl">
              <img
                src={imgs[3].src}
                alt={imgs[3].alt}
                className="w-full h-auto object-cover aspect-[5/6]"
              />
            </div>
          </div>

          {/* Bottom Right - Large Horizontal */}
          <div className="absolute bottom-0 right-4 md:right-8 lg:right-12 w-[52%] md:w-[45%] lg:w-[42%] z-20">
            <div className="rounded-[40px] overflow-hidden border-[8px] border-white shadow-2xl">
              <img
                src={imgs[4].src}
                alt={imgs[4].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
