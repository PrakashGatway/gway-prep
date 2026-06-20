"use client";

const imgs = [
  { id: 1, src: "/apple-icon.png", alt: "Team meeting" },
  { id: 2, src: "/apple-icon.png", alt: "Woman giving presentation" },
  { id: 3, src: "/apple-icon.png", alt: "Office desk with monitor" },
  { id: 4, src: "/apple-icon.png", alt: "Two people working at desk" },
  { id: 5, src: "/apple-icon.png", alt: "Consultation with family" },
];

export function Mission({data}:any) {
  console.log(data,"mission",data.fields.items)
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center sm:text-left" dangerouslySetInnerHTML={{ __html: data.fields['mission title'] }} />

        {/* Collage Grid */}
        <div className="relative w-full max-w-7xl mx-auto h-[400px] sm:h-[500px] md:h-[620px] lg:h-[720px] xl:h-[780px] overflow-hidden py-4 sm:py-6 md:py-8">
          
          {/* Top Center - Large Horizontal */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] sm:w-[50%] md:w-[46%] lg:w-[42%] z-20">
            <div className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden shadow-md">
              <img
                src={data.fields.items[0]?.image || imgs[0].src}
                alt={data.fields.items[0]?.title || imgs[0].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Top Right - Small Vertical */}
          <div className="absolute top-4 sm:top-6 md:top-8 right-3 sm:right-4 md:right-6 lg:right-10 xl:right-14 w-[28%] sm:w-[25%] md:w-[24%] lg:w-[23%] z-10">
            <div className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden shadow-md">
              <img
                src={data.fields.items[1]?.image || imgs[0].src}
                alt={data.fields.items[1]?.title || imgs[0].alt}
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
          </div>

          {/* Middle Left - Square */}
          <div className="absolute top-[30%] sm:top-[32%] md:top-[35%] lg:top-[38%] left-2 sm:left-3 md:left-4 lg:left-6 xl:left-8 w-[30%] sm:w-[27%] md:w-[25%] lg:w-[23%] z-30">
            <div className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden shadow-md">
              <img
                src={data.fields.items[2]?.image || imgs[0].src}
                alt={data.fields.items[2]?.title || imgs[0].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Bottom Leftish - Large Vertical */}
          <div className="absolute bottom-0 left-[15%] sm:left-[18%] md:left-[20%] lg:left-[22%] xl:left-[24%] w-[32%] sm:w-[30%] md:w-[29%] z-10">
            <div className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden shadow-md">
              <img
                src={data.fields.items[3]?.image || imgs[0].src}
                alt={data.fields.items[3]?.title || imgs[0].alt}
                className="w-full h-auto object-cover aspect-[5/6]"
              />
            </div>
          </div>

          {/* Bottom Right - Large Horizontal */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-2 sm:right-3 md:right-4 lg:right-8 xl:right-12 w-[48%] sm:w-[46%] md:w-[44%] lg:w-[42%] z-20">
            <div className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden shadow-md">
              <img
                src={data.fields.items[4]?.image || imgs[0].src}
                alt={data.fields.items[4]?.title || imgs[0].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}