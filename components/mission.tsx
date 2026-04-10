"use client";

const data = [
  { id: 1, src: "/apple-icon.png", alt: "Team meeting" },
  { id: 2, src: "/apple-icon.png", alt: "Woman giving presentation" },
  { id: 3, src: "/apple-icon.png", alt: "Office desk with monitor" },
  { id: 4, src: "/apple-icon.png", alt: "Two people working at desk" },
  { id: 5, src: "/apple-icon.png", alt: "Consultation with family" },
];

export function Mission() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <h2 className="text-3xl md:text-5xl text-[#626363] font-semibold text-center mb-16 max-w-4xl mx-auto leading-tight">
          <span className="text-[#FF6B35]">We're a small team </span> 
          on a mission to improve test prep
        </h2>

        {/* Collage Grid */}
        <div className="relative h-[600px] md:h-[700px] w-full max-w-6xl mx-auto">
          
          {/* Top Center Image - Large Horizontal */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] z-10">
             <div className="rounded-[40px] overflow-hidden border-[6px] border-white shadow-xl">
                <img src={data[0].src} alt={data[0].alt} className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Top Right Image - Small Vertical */}
          <div className="absolute top-4 right-0 w-[22%] h-[30%] overflow-hidden">
             <div className="rounded-[30px] overflow-hidden border-[4px] border-white shadow-lg">
                <img src={data[2].src} alt={data[2].alt} className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Middle Left Image - Square */}
          <div className="absolute top-[25%] left-0 w-[22%]">
             <div className="rounded-[30px] overflow-hidden border-[4px] border-white shadow-lg">
                <img src={data[1].src} alt={data[1].alt} className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Bottom Middle-Left - Large Vertical */}
          <div className="absolute bottom-0 left-[25%] w-[28%]">
             <div className="rounded-[40px] overflow-hidden border-[6px] border-white shadow-xl">
                <img src={data[3].src} alt={data[3].alt} className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Bottom Right - Large Horizontal */}
          <div className="absolute bottom-[5%] right-0 w-[45%]">
             {/* Decorative Accents */}
             <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-gray-200 rounded-xl -z-10" />
             <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-[#FF6B35] rounded-lg -z-10" />
             
             <div className="rounded-[40px] overflow-hidden border-[6px] border-white shadow-xl">
                <img src={data[4].src} alt={data[4].alt} className="w-full h-full object-cover" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
