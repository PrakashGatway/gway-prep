"use client";
import Image from "next/image";

export default function ServicesGrid({ data }: any) {
  return (
    <section className="py-2 bg-[#fff] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center ">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#f26e46]">Four Ways to Learn.</span>{" "}
            <span className="text-gray-800"> One Standard of Excellence. </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Whether you prefer the energy of live classrooms, the intimacy of
            1-on-1 sessions, or the freedom of self-paced AI coaching—we deliver
            world-class preparation in the format that fits your life.
          </p>
        </div>

        <div className="hidden lg:block min-h-[800px] flex items-center justify-center">
          <div
            className="relative w-[900px] h-[800px] mx-auto"
            style={{
              backgroundImage: 'url("/home/3.png")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            <div className="absolute top-20 left-[260px] w-[280px]">
              <Card item={data?.[0]} />
            </div>

            <div className="absolute top-[260px] right-20 w-[280px]">
              <Card item={data?.[1]} />
            </div>

            <div className="absolute bottom-30 left-[260px] w-[280px]">
              <Card item={data?.[2]} />
            </div>

            <div className="absolute top-[350px] left-0 w-[280px]">
              <Card item={data?.[3]} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {data?.map((item: any, index: number) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  item: {
    title: string;
    description: string;
    buttonText: string;
    image: string;
  };
};

function Card({ item }: CardProps) {
  if (!item) return null;
  return (
    <div className="bg-white rounded-3xl p-2 shadow-md border border-orange-100 hover:-translate-y-2 transition-all duration-300">
     
      <p className="text-gray-600 text-center mt-2 leading-relaxed text-sm">
        {item.description}
      </p>
      <div className="mt-2 flex justify-center">
        <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm hover:bg-orange-600 transition">
          {item.buttonText}
        </button>
      </div>
    </div>
  );
}
