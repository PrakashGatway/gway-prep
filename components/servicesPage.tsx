
"use client";
// app/page.tsx
import Image from "next/image";
import {
  Clock,
  FileText,
  ArrowRight,
  Star,
  Layers,
  Target,
  TrendingUp,
  Sliders,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    'FileText': <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
    'Clock': <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
    'Layers': <Layers className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
    'Target': <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
    'Sliders': <Sliders className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
    'TrendingUp': <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
  };
  return icons[iconName] || <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />;
};

// Section Components
function HeroSection({ data }: { data: any }) {
  if (!data) return null;
  
  return (
    <section className="relative overflow-hidden bg-[#FDF4EF] min-h-auto py-6 md:py-16 lg:py-20 flex items-center">
      <img
        src="/services/h.webp"
        alt="services"
        className="hidden lg:block absolute -right-20 bottom-20 h-[80%] w-full md:w-[56%] object-cover
         md:object-contain pointer-events-none select-none opacity-30 md:opacity-100"
      />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="py-8 md:py-10"
        >
          {/* <h1 className="leading-none">
            <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-[#f26e46]">
              Score Higher.
            </span>
            <span className="block mt-2 md:mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B3B3B]">
              Dream Further.
              <span className="text-[#f26e46] font-bold"> Study Abroad.</span>
            </span>
          </h1> */}
          {(() => {
          const titleParts = data?.fields?.title?.split("||") || [];
          
          return (
            <h1 className=" max-w-3xl md:leading-12">
              {titleParts[0] && (
                <span className="text-left text-2xl md:text-3xl lg:text-5xl font-bold text-primary">
                  {titleParts[0]}
                </span>
              )}
              {(titleParts[1] || titleParts[2]) && (
                <span className="text-left text-2xl md:text-3xl lg:text-5xl font-bold">
                  {titleParts[1]}
                  {titleParts[2] && (
                    <span className="mt-4 text-primary ">{titleParts[2]}</span>
                  )}
                </span>
              )}
            </h1>
          );
        })()}

          <p className="mt-4 max-w-xl text-base md:text-lg leading-7 md:leading-8 ">
            {data?.fields?.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ExamPillsSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  
  const items = data.fields.items;
  
  return (
    <section className="px-4 md:px-8 py-4 md:py-6 mx-auto bg-[#FFDDD3]">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {items.map((exam: any) => (
          <span
            key={exam.title}
            className="bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md transition-transform duration-300 ease-in-out hover:scale-105
            text-gray-700 text-sm font-medium px-3 md:px-5 py-1.5 md:py-2 rounded transition cursor-pointer"
          >
            <img
              src={exam.image}
              alt={exam.title}
              className="h-10 md:h-14"
            />
          </span>
        ))}
      </div>
    </section>
  );
}

function PracticeSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  const Router = useRouter();
  
  const items = data.fields.items;
  const title = data.fields.title || "";
  const subtitle = data.fields.subtitle || "";
  const buttonText = data.fields.button || "";

  return (
    <section className="px-4 md:px-8 py-8 md:py-10 lg:py-12  max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
          <span className="text-primary">{title?.split('||')[0]}</span>
          {/* <br className="hidden sm:block" />  */}
          {title?.split('||')[1]}
        </h2>
        <p className="mt-3  mx-auto text-sm md:text-lg">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((card: any, idx: number) => (
          <div
            key={card.title}
            className={`${idx % 2 === 0 ? "bg-[#FEF6F3]" : "bg-[#FEFBEA]"} border-2 border-[#ED7553] rounded-2xl md:rounded-3xl p-5 md:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            {/* <div className="bg-orange-50 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4">
              {getIconComponent(card.icon)}
            </div> */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900">{card.title}</h3>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Mock Test CTA */}
      <div className="flex justify-center mt-6 md:mt-8">
        <button
         onClick={() => Router.push('/auth')}
         className="flex items-center gap-2 rounded-full bg-primary px-6 md:px-8 py-2.5 md:py-3 text-white font-semibold text-base md:text-lg shadow-md hover:bg-[#e85f35] transition">
          {buttonText}
          <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </section>
  );
}

function PortalSection({ data }: { data: any }) {
  if (!data) return null;
  
  const title = data?.fields?.title || "";
  const subtitle = data?.fields?.subtitle || "";
  const buttonText = data?.fields?.button || "";
  const image = data?.fields?.image || "";

  if (!title && !subtitle) return null;

  return (
    <section className="bg-white px-4 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-[30px] md:rounded-[40px] border border-[#E8DDD7] bg-[#FDF4EF] px-6 md:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 items-center gap-8 md:gap-12">
          <div className="text-center lg:text-left">
            <h2 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold">
              {title?.split('||')[0] || ""}
              <span className="text-primary">{title.split('||')[1] || ""}</span>
            </h2>
            
            {/* <p className="mt-2 md:mt-4 text-[#4B4B4B] text-base md:text-xl leading-7 md:leading-8 text-left whitespace-pre-line">
              {subtitle}
            </p> */}
             <div
                  dangerouslySetInnerHTML={{
                    __html: subtitle || "",
                  }}
                  className="mt-2 md:mt-4 text-[#4B4B4B] text-base md:text-lg leading-7 md:leading-8 text-left whitespace-pre-line"
                />
            {buttonText && (
              <button className="mt-6 md:mt-8 bg-[#F36C45] px-6 md:px-8 py-2.5 md:py-3 text-white font-semibold rounded-full hover:bg-[#e85f35] transition">
                {buttonText}
              </button>
            )}
          </div>
          {image && (
            <div className="flex justify-center lg:justify-end">
              <Image
                src={image}
                alt="Exam Portal"
                width={420}
                height={220}
                className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[460px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DashboardSection({ data }: { data: any }) {
  if (!data?.fields?.leftImage && !data?.fields?.rightImage) return null;
  
  const leftImage = data.fields.leftImage || "";
  const rightImage = data.fields.rightImage || "";

  return (
    <div className="relative max-w-7xl mx-auto mt-8 md:mt-12 mb-8 md:mb-12 h-auto sm:h-[280px] md:h-[400px] lg:h-[620px] px-4">
      {leftImage && (
        <div className="md:absolute left-4 md:left-8 lg:left-30 top-0 md:w-[52%] z-10">
          <img
            src={leftImage}
            alt="Dashboard Results"
            className="w-full rounded-[16px] md:rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
            transition-transform duration-300 ease-in-out hover:scale-105 mb-2"
          />
        </div>
      )}
      {rightImage && (
        <div className="md:absolute right-4 md:right-8 lg:right-50 top-[8%] md:top-[12%] md:w-[42%] z-20">
          <img
            src={rightImage}
            alt="Mock Test"
            className="w-full rounded-[16px] md:rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      )}
    </div>
  );
}

function AIStackSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  
  const items = data.fields.items;
  const title = data.fields.title || "";
  const subtitle = data.fields.subtitle || "";
  const buttonText = data.fields.button || "";

  return (
    <section className="bg-[#FDF4EF] py-8 md:py-10 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="max-w-3xl text-center md:text-left">
            <h2 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold">
              {title?.split("||")[0] || ""}{" "}
              <span className="text-primary">{title?.split("||")[1] || ""}</span>
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 max-w-2xl">
              {subtitle}
            </p>
          </div>
          <div className="flex justify-center mt-6 md:mt-0">
            <Image
              src="/services/ai 2.webp"
              alt="AI Network"
              width={420}
              height={280}
              className="object-contain w-64 sm:w-80 md:w-[420px]"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="relative mt-10 hidden lg:block h-[640px]">
          <div className="absolute left-1/2 top-10 -translate-x-1/2 z-20">
            <Image
              src="/services/ai.webp"
              width={320}
              height={360}
              alt="Robot"
            />
          </div>

          {items.map((card: any, index: number) => {
            const positions = [
              "absolute left-0 top-0",
              "absolute right-0 top-0",
              "absolute left-0 top-[220px]",
              "absolute right-0 top-[220px]",
              "absolute left-24 bottom-0",
              "absolute right-24 bottom-0",
            ];
            return (
              <FeatureCard
                key={card.title}
                feature={card}
                className={positions[index] || "absolute left-0 top-0"}
              />
            );
          })}
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="grid gap-4 sm:gap-6 lg:hidden mt-8 md:mt-10">
          <div className="flex justify-center mb-4">
            <Image
              src="/services/ai.webp"
              alt="Robot"
              width={180}
              height={180}
              className="w-32 sm:w-44 md:w-56"
            />
          </div>
          {items.map((card: any) => (
            <FeatureCard key={card.title} feature={card} />
          ))}
        </div>

        {buttonText && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button className="rounded-full bg-[#F2643D] hover:bg-[#E95D35] transition-all px-6 md:px-8 py-3 md:py-4 font-semibold text-white shadow-lg text-sm md:text-base">
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: any;
  className?: string;
}


function FeatureCard({ feature, className = "" }: FeatureCardProps) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 120;
  
  const shouldTruncate = feature.description.length > maxLength && !expanded;
  const displayText = shouldTruncate 
    ? feature.description.slice(0, maxLength) + '...' 
    : feature.description;

  return (
    <div
      className={`${className} w-full lg:w-[380px] h-[200px] md:h-[200px] rounded-[20px] md:rounded-[28px]
       border border-[#F2A285] p-4 md:p-6`}
      style={{
        background: feature.background || "#FFFFFF",
      }}
    >
      <div className="flex gap-3 md:gap-4 relative h-full">
        <div className="h-8 w-8 md:h-10 md:w-10 absolute -top-6 -left-6 md:-top-10 md:-left-10 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 z-10">
          <Image src={feature.icon} alt={"img"} width={18} height={18} className="md:w-[22px] md:h-[22px]" />
        </div>
        <div className="ml-6 md:ml-0 flex-1 min-w-0 flex flex-col h-full overflow-hidden pt-2">
          <h3 className="font-bold text-base md:text-lg text-[#303030] break-words line-clamp-2 flex-shrink-0">
            {feature.title}
          </h3>
          <div className="flex-1 overflow-y-auto mt-1 md:mt-2 pr-1 custom-scrollbar">
            <p className="text-sm md:text-[15px] leading-6 text-[#5D5D5D] break-words">
              {feature.description}
            </p>
          </div>
          {/* {feature.description.length > maxLength && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-[#f26e46] text-sm font-semibold hover:underline flex-shrink-0"
            >
              {expanded ? 'Show Less' : 'Read More'}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}

// function FeatureCard({ feature, className = "" }: FeatureCardProps) {
//   return (
//     <div
//       className={`${className} w-full lg:w-[380px] min-h-[12rem] rounded-[20px] md:rounded-[28px] border border-[#F2A285] p-4 md:p-6`}
//       style={{
//         background: feature.background || "#FFFFFF",
//       }}
//     >
//       <div className="flex gap-3 md:gap-4 relative">
//         <div className="h-8 w-8 md:h-10 md:w-10 absolute -top-6 -left-6 md:-top-10 md:-left-10 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
//           <Image src={feature.icon} alt={"img"} width={18} height={18} className="md:w-[22px] md:h-[22px]" />
//         </div>
//         <div className="ml-6 md:ml-0">
//           <h3 className="font-bold text-base md:text-lg text-[#303030]">{feature.title}</h3>
//           <p className="mt-2 md:mt-3 text-sm md:text-[15px] leading-6 text-[#5D5D5D] col">
//             {feature.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

function EnvironmentSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  const Router = useRouter();
  
  const items = data.fields.items;
  const title = data.fields.title || "";
  const subtitle = data.fields.subtitle || "";
  const buttonText = data.fields.button || "";

  return (
    <section className="bg-[#FFDDD3] py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-7xl mb-4 md:mb-8">
          <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold">
            {title.split(' ').slice(0, -1).join(' ')} {" "}
            <span className="text-primary">{title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="mt-3 text-base md:text-lg leading-7 md:leading-8 ">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {items.length > 0 && (
            <EnvironmentCard
              title={items[0].title}
              image={items[0].image}
              className="sm:col-span-2 lg:col-span-1 lg:row-span-2 h-64 sm:h-80 lg:h-[480px] "
            />
          )}
          <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
            {items.slice(1).map((item: any) => (
              <EnvironmentCard
                key={item.title}
                title={item.title}
                image={item.image}
                className="h-48 sm:h-56 lg:h-[230px]"
              />
            ))}
          </div>
        </div>

        {buttonText && (
          <div className="flex justify-center md:justify-end mt-2 md:mt-4">
            <button
             onClick={() => Router.push("/auth")}
             className="rounded-full bg-[#F2643D] hover:bg-[#e45b33] transition-all text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base">
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


// interface EnvironmentCardProps {
//   title: string;
//   image: string;
//   className?: string;
// }

// export function EnvironmentCard({ title, image, className }: EnvironmentCardProps) {
//   return (
//     <div 
//       className={`relative overflow-hidden rounded-[20px] md:rounded-[28px] group cursor-pointer ${className}`}
//       tabIndex={0} // Makes the card focusable via keyboard
//     >
//       <Image
//         src={image}
//         alt={title}
//         fill
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust based on your layout
//         className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
//       />
      
//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      
//       <div className="absolute bottom-4 md:bottom-5 left-0 right-0 text-center px-4">
//         <h3 className="text-white text-lg md:text-xl font-semibold line-clamp-1 group-hover:line-clamp-5 group-focus-within:line-clamp-5 transition-all duration-500">
//           {title}
//         </h3>
//       </div>
//     </div>
//   );
// }




interface EnvironmentCardProps {
  title: string;
  image: string;
  className?: string;
}

export function EnvironmentCard({ title, image, className }: EnvironmentCardProps) {
  return (
    <div className={`group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-transform duration-1000 ease-in-out hover:scale-105 ${className}`}>
  {/* Image with dimming effect via opacity */} 
  <Image 
    src={image} 
    alt={title} 
    width={400} 
    height={400} 
    className="w-full opacity-100 transition-opacity duration-1000 ease-in-out group-hover:opacity-40" 
  /> 

  {/* Gradient Overlay */} 
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent pointer-events-none opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100" /> 

  {/* Content Container: Positioned at the bottom with smooth layout transition */} 
  <div className="absolute bottom-0 left-0 right-0 max-h-[40%] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/20 transition-all duration-1000 ease-in-out group-hover:bottom-[40%] group-hover:text-white"> 
    <h3 className="text-center text-base md:text-sm font-semibold whitespace-normal break-words line-clamp-1 transition-all duration-1000 ease-in-out group-hover:line-clamp-5"> 
      {title} 
    </h3> 
  </div> 
</div>

//    <div className={`group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
//             transition-transform duration-300 ease-in-out hover:scale-105 ${className}`}>
//   {/* Image with dimming effect via opacity */}
//   <Image 
//     src={image} 
//     alt={title} 
//     width={400} 
//     height={400} 
//     className="w-full opacity-100 transition-opacity duration-300 "
//   />
  
//   {/* Gradient Overlay */}
//   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent pointer-events-none hidden group-hover:block" />
  
//   {/* Content Container: Positioned at the bottom, allows full text scrolling if it overflows */}
//   <div className="absolute bottom-0 left-0 group-hover:bottom-[40%] group-hover:text-white  right-0 max-h-[40%] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/20">
//     <h3 className="text-center text-base md:text-sm font-semibold  whitespace-normal break-words line-clamp-1 group-hover:line-clamp-5">
//       {title}
//     </h3>
//   </div>
// </div>

  );
}




function ResourcesSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  const Router = useRouter();
  const items = data.fields.items;
  const title = data.fields.title || "";
  const subtitle = data.fields.subtitle || "";
  const buttonText = data.fields.button || "";

  return (
    <section className="py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center md:text-center mb-8 md:mb-12">
          {/* <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B3B3B] leading-tight">
            {title}
          </h3> */}
          <h3 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
            {title.split('||')[0]} {" "}
            <span className="text-primary">{title.split('||')[1]}</span>
          </h3>
          <p className=" text-base md:text-lg mt-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {items.map((card: any) => (
            <div
              key={card.title}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border flex flex-col items-center justify-center gap-2 text-center hover:shadow-md transition-shadow"
            >
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-[#FFF6ED] hover:bg-[#FA8227] p-2 transition-colors">
                <img src={card.icon} alt={card.title} className="w-full h-full" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm md:text-lg">{card.title}</h4>
              <p className="text-gray-500 text-xs md:text-sm hidden sm:block">{card.description}</p>
              <p className="text-primary font-bold text-sm">{card.metric}</p>
            </div>
          ))}
        </div>

        {buttonText && (
          <div className="text-center mt-8">
            <button 
            onClick={() => Router.push('/auth')}
            className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base shadow-sm transition">
              {buttonText} →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function SupportSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  
  const items = data.fields.items;
  const title = data.fields.title || "";
  const subtitle = data.fields.subtitle || "";

  return (
    <section className="px-4 md:px-8 py-8 md:py-10 lg:py-12 mx-auto bg-[#FFDDD3]">
      <div className="text-center mb-8 md:mb-10 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
          <span className="">{title.split(' ').slice(0, -1).join(' ')} </span>
          <span className="text-primary">{title.split(' ').slice(-1)[0]}</span>
        </h2>
        <p className="text-sm md:text-lg mt-2 md:mt-4 px-4">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {items.map((card: any) => (
          <div
            key={card.title}
            className="bg-white rounded-xl md:rounded-2xl px-2 md:px-5 py-2 md:py-4 text-center border border-[#F3F3F3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative flex justify-center mb-4 md:mb-6">
              <div className="absolute w-10 md:w-14 h-10 md:h-14 rounded-full bg-orange-100 blur-2xl opacity-40"></div>
              <div className="relative w-10 md:w-14 h-10 md:h-14 rounded-full bg-[#FFF8F3] flex items-center justify-center shadow-sm">
                <img src={card.icon} alt="icon" />
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-[#1F2937] leading-tight">
              {card.title}
            </h3>

            <div className="w-10 md:w-12 h-[3px] rounded-full bg-[#FE6610] mx-auto my-4 md:my-5"></div>

            <p className="text-[#667085] text-sm md:text-[15px] leading-6 md:leading-7 flex-grow">
              {card.description}
            </p>

            {card.contact && (
              <p className="mt-1 md:mt-2 text-[#FE6610] font-semibold text-lg md:text-[24px]">
                {card.contact}
              </p>
            )}

            {card.button && (
              <button
                className={`mt-2 md:mt-4 h-12 md:h-14 rounded-2xl text-sm md:text-[17px] font-semibold transition-all duration-300 flex items-center justify-center gap-2
                  ${card.primary
                    ? "bg-[#FE6610] text-white hover:bg-[#e95a08]"
                    : "border-2 border-[#FE6610] text-[#FE6610] hover:bg-[#FE6610] hover:text-white"
                  }`}
              >
                {card.button}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ data }: { data: any }) {
  // Check if testimonials data exists
  if (!data?.fields?.items?.length) return null;
  
  const items = data.fields.items;
  const title = data.fields.title;

  return (
    <section className="bg-[#FAFAFA] py-8 md:py-10 lg:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-8 md:mb-10 px-0 md:px-12">
          <h2 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold">
            {title}
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#f26e46] leading-tight mt-1">
            Real Scores. Real Dreams.
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-[#555] leading-6 max-w-5xl">
            Over 50,000 students have trusted PrepElite to get them to their target scores and into the world's best universities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {items.map((item: any) => (
            <div
              key={item.name}
              className="bg-white rounded-[20px] md:rounded-[30px] border border-[#ECECEC] p-5 md:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover bg-gray-800"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#222]">
                    {item.name}
                  </h3>
                  <p className="text-[#777] text-xs md:text-sm">{item.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 my-3 md:mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 md:w-4 md:h-4 fill-[#FE6610] text-[#FE6610]"
                  />
                ))}
                <span className="ml-2 text-[#666] font-medium text-sm">{item.rating}.0</span>
              </div>

              <p className="text-xs md:text-sm leading-5 md:leading-6 text-[#555] flex-grow">
                {item.review}
              </p>

              <div className="mt-6 md:mt-8">
                <div className="inline-flex px-2 py-1 rounded-full bg-[#FFF3EB] text-[#FE6610] font-semibold text-sm md:text-lg">
                  {item.score}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[#777] text-xs md:text-sm">{item.university}</p>
                  <p className="font-bold text-[#22C55E] text-sm">{item.improvement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 -mb-10 md:mt-12 relative z-10">
          <div className="bg-[#FFF5F1] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 shadow-sm border border-[#FCE8DE]">
            <p className="text-[#222] text-sm md:text-lg font-medium text-center sm:text-left">
              Not Sure where to start?
            </p>
            <button className="bg-[#FE6610] hover:bg-[#F25A00] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 w-full sm:w-auto">
              Find My Destination
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountriesSection({ data }: { data: any }) {
  if (!data?.fields?.items?.length) return null;
  
  const items = data.fields.items;
  const title = data.fields.title || "";
  const subtitle = data.fields.subtitle || "";

  return (
    <section className="py-6 md:py-8 px-4 md:px-8 bg-white">
      <div className="text-center max-w-5xl mx-auto mb-8 md:mb-14">
        <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
          <span className="text-primary">{title.split('.')[0]}.</span>{" "}
          <span className="">{title.split('.').slice(1).join('.')}</span>
        </h2>
        <p className="mt-4 md:mt-6 text-sm md:text-lg lg:text-xl leading-7 md:leading-9 max-w-4xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5 max-w-6xl mx-auto">
        {items.map((country: any) => (
          <div
            key={country.name}
            className={`rounded-[18px] md:rounded-[26px] p-4 md:p-8 flex flex-col items-center justify-center
              border border-[#EFEFEF] hover:-translate-y-2 hover:shadow-lg
              transition-all duration-300 ${country.background || 'bg-[#F3F6FF]'}`}
          >
            <img src={country.image} className="h-10 w-10 md:h-14 md:w-14 rounded-lg" alt={country.name} />
            <h3 className="text-lg md:text-2xl font-semibold text-[#1F2937] mt-2">
              {country.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ data }: { data: any }) {
  if (!data) return null;
  
  const title = data?.fields?.title || "";
  const subtitle = data?.fields?.subtitle || "";
  const primaryButton = data?.fields?.primaryButton || "";
  const secondaryButton = data?.fields?.secondaryButton || "";

  if (!title && !subtitle && !primaryButton && !secondaryButton) return null;

  return (
    <section className="bg-white mb-16">
      <div className="bg-primary text-white py-10 lg:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
            {title}
          </h2>
          <p className="mt-4 md:mt-6 text-white/90 text-sm md:text-lg max-w-3xl mx-auto leading-6 md:leading-7">
            {subtitle}
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 md:gap-5">
            {primaryButton && (
              <button className="bg-white text-[#222] px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-lg hover:scale-105 transition-all duration-300">
                {primaryButton}
              </button>
            )}
            {secondaryButton && (
              <button className="bg-[#3D1E16] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-lg hover:bg-[#2B140F] transition-all duration-300">
                {secondaryButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ServicesPage({ sections }: any) {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Static */}
      {sections?.["Services-Hero"] && (
        <HeroSection data={sections["Services-Hero"]} />
      )}
      
      {/* Exam Pills */}
      {sections?.["Services-Exam-Pills"] && (
        <ExamPillsSection data={sections["Services-Exam-Pills"]} />
      )}
      
      {/* Practice Section */}
      {sections?.["Services-Practice"] && (
        <PracticeSection data={sections["Services-Practice"]} />
      )}
      
      {/* Portal Section */}
      {sections?.["Services-Portal"] && (
        <PortalSection data={sections["Services-Portal"]} />
      )}
      
      {/* Dashboard Section */}
      {sections?.["Services-Dashboard"] && (
        <DashboardSection data={sections["Services-Dashboard"]} />
      )}
      
      {/* AI Stack Section */}
      {sections?.["Services-AI"] && (
        <AIStackSection data={sections["Services-AI"]} />
      )}
      
      {/* Environment Section */}
      {sections?.["Services-Environment"] && (
        <EnvironmentSection data={sections["Services-Environment"]} />
      )}
      
      {/* Resources Section */}
      {sections?.["Services-Resources"] && (
        <ResourcesSection data={sections["Services-Resources"]} />
      )}
      
      {/* Support Section */}
      {sections?.["Services-Support"] && (
        <SupportSection data={sections["Services-Support"]} />
      )}
      
      {/* Testimonials Section */}
      {sections?.["Services-Testimonials"] && (
        <TestimonialsSection data={sections["Services-Testimonials"]} />
      )}
      
      {/* Countries Section */}
      {sections?.["Services-Countries"] && (
        <CountriesSection data={sections["Services-Countries"]} />
      )}
      
      {/* CTA Section */}
      {sections?.["Services-CTA"] && (
        <CTASection data={sections["Services-CTA"]} />
      )}
    </div>
  );
}










