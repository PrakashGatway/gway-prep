  // Mission.tsx
  "use client";

  const imgs = [
    { id: 1, src: "/apple-icon.png", alt: "Team meeting" },
    { id: 2, src: "/apple-icon.png", alt: "Woman giving presentation" },
    { id: 3, src: "/apple-icon.png", alt: "Office desk with monitor" },
    { id: 4, src: "/apple-icon.png", alt: "Two people working at desk" },
    { id: 5, src: "/apple-icon.png", alt: "Consultation with family" },
  ];

  export function Mission({ data }: any) {
    return (
      <section
        className="py-8 md:py-12 bg-white font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center sm:text-left mb-10"
            dangerouslySetInnerHTML={{
              __html: data.fields["mission title"],
            }}
          />

          {/* Collage Container */}
          <div className="relative mx-auto w-full max-w-5xl h-[500px] md:h-[600px]">

            {/* Top Center */}
            <div className="absolute -top-8 left-[48%] -translate-x-1/2 w-[42%] z-20">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={data.fields.items[0]?.image || imgs[0].src}
                  alt={data.fields.items[0]?.title || imgs[0].alt}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Top Right */}
            <div className="absolute top-10 right-22 w-[20%] z-10">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={data.fields.items[1]?.image || imgs[1].src}
                  alt={data.fields.items[1]?.title || imgs[1].alt}
                  className="w-full object-cover aspect-[3/4]"
                />
              </div>
            </div>

            {/* Middle Left */}
            <div className="absolute top-[40%] left-8 w-[22%] z-30">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={data.fields.items[2]?.image || imgs[2].src}
                  alt={data.fields.items[2]?.title || imgs[2].alt}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Left */}
            <div className="absolute -bottom-6 left-[28%] w-[26%] z-10">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={data.fields.items[3]?.image || imgs[3].src}
                  alt={data.fields.items[3]?.title || imgs[3].alt}
                  className="w-full object-cover aspect-[3/4]"
                />
              </div>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-8 right-22 w-[35%] z-20">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={data.fields.items[4]?.image || imgs[4].src}
                  alt={data.fields.items[4]?.title || imgs[4].alt}
                  className="w-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }