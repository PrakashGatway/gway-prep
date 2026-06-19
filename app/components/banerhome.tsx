"use client";

export function Banerhome({ data, img }: any) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4  justify-between ">
        <img
          src={img || "/image/about.jpeg"}
          alt="About Us"
          className="w-full h-auto sticky top-32"
        />

        <div className="pl-10  bg-white font-sans">
          

          <div dangerouslySetInnerHTML={{ __html: data.fields?.title }} />

          <div className="space-y-8 mt-2">
            {data.fields?.items.map((item: any, i: number) => (
              <div className="flex items-start gap-4" key={i}>
                <div className="flex-shrink-0 w-14 h-14  rounded-full flex items-center justify-center">
                  <img src={item.icon ?? "/home/06.png"} alt="icon" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-700">
                    {item.title ?? "Reliable Study Materials"}
                  </h3>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    {item.subtitle}
                    {/* Get access to the best preparation resources to ace the test in your first attempt. */}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
