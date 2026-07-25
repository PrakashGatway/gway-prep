"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesGrid({ data, heading }: any) {
  // Extract title and split by "||"
  const title = heading?.fields?.title || "Four Ways to Learn. || One Standard of Excellence.";
  const titleParts = title?.split("||") || ["Four Ways to Learn.", "One Standard of Excellence."];
  const subtitle = heading?.fields?.subtitle || "Whether you prefer the energy of live classrooms, the intimacy of 1-on-1 sessions, or the freedom of self-paced AI coaching—we deliver world-class preparation in the format that fits your life.";
  
  // The items array from your data
  const items = heading?.items || data || [];

  return (
    <section className="py-2 bg-[#fff] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-center text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold">
            <span className="text-primary">{titleParts[0]?.trim() || "Four Ways to Learn."}</span>{" "}
            <span className="">{titleParts[1]?.trim() || "One Standard of Excellence."}</span>
          </h2>
          <p className="my-6 md:text-lg leading-relaxed">
            {subtitle}
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
            {items?.length > 0 && (
              <>
                <div className="absolute top-20 left-[260px] w-[280px]">
                  <Card item={items[0]} />
                </div>

                <div className="absolute top-[260px] right-20 w-[280px]">
                  <Card item={items[1]} />
                </div>

                <div className="absolute bottom-30 left-[260px] w-[280px]">
                  <Card item={items[2]} />
                </div>

                <div className="absolute top-[330px] left-0 w-[280px]">
                  <Card item={items[3]} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {items?.map((item: any, index: number) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  item: {
    heading?: string;
    content?: string;
    buttonText?: string;
    image?: string;
    link?: string;
  };
};

function Card({ item }: CardProps) {
  const router = useRouter();

  if (!item) return null;
  
  // Parse content and button text from the content field
  const contentParts = item.content?.split("||") || ["", ""];
  const description = contentParts[0]?.trim() || "";
  const buttonText = contentParts[1]?.trim() || "Learn More";
  
  return (
    <div className="bg-white md:rounded-3xl p-2 shadow-md border border-orange-100 hover:-translate-y-2 transition-all duration-300">
      {item.heading && (
        <h3 className="text-center text-base font-semibold text-gray-800">
          {item.heading}
        </h3>
      )}
      <p className="text-gray-600 lg:text-center mt-2 leading-relaxed text-sm text-justify sm:text-base">
        {description}
      </p>
      <div className="mt-2 flex justify-center">
        <button 
          className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm hover:bg-orange-600 transition cursor-pointer" 
          onClick={() => router.push(item.link || "#")}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}



// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function ServicesGrid({ data }: any) {
//   return (
//     <section className="py-2 bg-[#fff] overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto text-center ">
//           <div className="text-lg sm:text-xl md:text-3xl lg:text-5xl">
//             <span className="text-[#f26e46]">Four Ways to Learn.</span>{" "}
//             <span className="text-gray-800"> One Standard of Excellence. </span>
//           </div>
//           <p className="mt-6 text-lg text-gray-600 leading-relaxed">
//             Whether you prefer the energy of live classrooms, the intimacy of
//             1-on-1 sessions, or the freedom of self-paced AI coaching—we deliver
//             world-class preparation in the format that fits your life.
//           </p>
//         </div>

//         <div className="hidden lg:block min-h-[800px] flex items-center justify-center">
//           <div
//             className="relative w-[900px] h-[800px] mx-auto"
//             style={{
//               backgroundImage: 'url("/home/3.png")',
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "contain",
//             }}
//           >
//             <div className="absolute top-20 left-[260px] w-[280px]">
//               <Card item={data?.[0]} />
//             </div>

//             <div className="absolute top-[260px] right-20 w-[280px]">
//               <Card item={data?.[1]} />
//             </div>

//             <div className="absolute bottom-30 left-[260px] w-[280px]">
//               <Card item={data?.[2]} />
//             </div>

//             <div className="absolute top-[350px] left-0 w-[280px]">
//               <Card item={data?.[3]} />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
//           {data?.map((item: any, index: number) => (
//             <Card key={index} item={item} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// type CardProps = {
//   item: {
//     title: string;
//     description: string;
//     buttonText: string;
//     image: string;
//   };
// };

// function Card({ item }: CardProps) {
//   const router = useRouter();

//   if (!item) return null;
  
//   return (
//     <div className="bg-white rounded-3xl p-2 shadow-md border border-orange-100 hover:-translate-y-2 transition-all duration-300">
     
//       <p className="text-gray-600 text-center mt-2 leading-relaxed text-sm">
//         {item.description}
//       </p>
//       <div className="mt-2 flex justify-center">
//         <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm hover:bg-orange-600 transition cursor-pointer" onClick={() => router.push(item.link)}>
//           {item.buttonText}
//         </button>
//       </div>
//     </div>
//   );
// }
