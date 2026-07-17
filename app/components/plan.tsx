// "use client";

// import { IndianRupee } from "lucide-react";
// import React from "react";

// const PricingSection = ({ plans }: { plans: any }) => {
//   const {
//     testimonial = "",
//     pricing_plans = [],
//     content_features = [],
//     access_features = [],
//   } = plans || {};

//   const features = [...content_features, ...access_features]
//     .map((item: any) =>
//       typeof item === "string" ? item : item.feature || ""
//     )
//     .filter(Boolean);

//   return (
//     <section className="py-12 px-4">
//   <div className="max-w-7xl mx-auto">
//     {/* Heading */}
//     <div className="max-w-4xl mx-auto text-center mb-16">
//       <h2 className="text-lg md:text-xl font-bold leading-relaxed text-[#3d3d3d]">
//         {testimonial}
//       </h2>
//     </div>

//     {/* Cards */}
//     <div className="grid lg:grid-cols-3 gap-6 items-start">
//       {pricing_plans.map((plan: any, index: number) => {
//         const isHighlighted =
//           plan.is_highlighted === true ||
//           plan.is_highlighted === "true";

//         return (
//           <div
//             key={index}
//             className={`
//               relative rounded-[24px] bg-white p-6
//               transition-all duration-300
//               ${
//                 isHighlighted
//                   ? "border-2 border-[#F36C45] scale-105 shadow-xl z-10"
//                   : index === 2
//                   ? "border-2 border-[#cde6ff]"
//                   : "border-2 border-[#d8d8d8]"
//               }
//             `}
//           >
//             {/* Bundle text */}
//             {plan.bundle_offer && (
//               <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-[#F36C45] whitespace-nowrap">
//                 {plan.bundle_offer}
//               </div>
//             )}

//             {/* Header Box */}
//             <div className="border border-[#dedede] rounded-xl p-4 mb-6">
//               <h3 className="text-2xl font-bold text-[#444]">
//                 {plan.plan_name}
//               </h3>
//               <p className="text-sm text-[#777] mt-1">
//                 {plan.subtitle}
//               </p>
//             </div>

//             {/* Features */}
//             <ul className="space-y-2 min-h-[240px]">
//               {features.map((feature: string, i: number) => (
//                 <li
//                   key={i}
//                   className="text-[#666] text-sm flex items-start"
//                 >
//                   <span className="mr-2 flex-shrink-0">•</span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>

//             {/* Price */}
//             <div className="text-center mt-8">
//               <h3 className="text-4xl font-extrabold text-[#444] flex items-center justify-center">
//                 <IndianRupee /> {plan.price}
//               </h3>
//             </div>

//             {/* Button */}
//             <div className="mt-6">
//               <button
//                 className={`
//                   w-full rounded-xl py-3 font-semibold shadow-md transition
//                   ${
//                     isHighlighted
//                       ? "bg-[#F36C45] text-white hover:bg-[#e45b32]"
//                       : "bg-white border border-[#d8d8d8] text-[#555] hover:bg-gray-50"
//                   }
//                 `}
//               >
//                 Sign Up Now
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>

//     {/* Footer CTA */}
//     <div className="mt-16 text-center">
//       <h3 className="text-xl font-bold text-[#444]">
//         Try Ooshash prep GRE for 7 days
//       </h3>
//       <p className="text-[#777] mt-2">
//         Start a free trial with 20+ questions and lessons
//       </p>
//       <button className="mt-4 text-[#F36C45] underline hover:text-[#e45b32]">
//         Start a free trial
//       </button>
//     </div>
//   </div>
// </section>
//   );
// };

// export default PricingSection;

"use client";

import { IndianRupee } from "lucide-react";

const plans = [
  {
    title: "Premium · 1 month",
    subtitle: "Great option for limited study time",
    price: "$99 USD",
    border: "#D9E8DF",
    featured: false,
  },
  {
    title: "Premium · 1 month",
    subtitle: "Great option for limited study time",
    price: "$150 USD",
    border: "#FF6B3D",
    featured: true,
  },
  {
    title: "Premium · 1 month",
    subtitle: "Great option for limited study time",
    price: "$170 USD",
    border: "#CFE2FF",
    featured: false,
  },
];

const features = [
  "Content",
  "8 full sections of official GRE® questions",
  "290+ video lessons",
  "Over 1600 practice questions",
  "Up to 6 practice tests",
  "Study schedules",
  "Features",
  "1 month of access",
  "+5 total score guarantee",
  "Ask an expert",
  "Pause your plan",
];

export default function PricingSection({ plans }: { plans: any }) {
  const {
    testimonial = "",
    pricing_plans = [],
    content_features = [],
    access_features = [],
  } = plans || {};

  const features = [...content_features, ...access_features]
    .map((item: any) => (typeof item === "string" ? item : item.feature || ""))
    .filter(Boolean);

  return (
    <>
      <section className="py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-18">
            <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-[#333]">
              {testimonial ? (
                // testimonial
                <div
                  dangerouslySetInnerHTML={{
                    __html: testimonial || "",
                  }}
                  className="text-center  font-bold"
                />
              ) : (
                <>
                  <span className="text-[#FF6B45]">"Ooshash Prep</span> gets
                  rave reviews from students, many of whom have improved their
                  GRE score with this flexible and{" "}
                  <span className="text-[#FF6B45]">affordable plan."</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {pricing_plans.map((plan: any, index: number) => {
              const isHighlighted =
                plan.is_highlighted === true || plan.is_highlighted === "true";

              return (
                <div
                  key={index}
                  className={`relative rounded-[24px] bg-white transition-all duration-300
                ${
                  isHighlighted
                    ? "border-2 border-[#FF6B45] shadow-2xl lg:-translate-y-8"
                    : index === 2
                      ? "border-2 border-[#CFE2FF]"
                      : "border-2 border-[#DCE7DF]"
                }`}
                >
                  {/* Bundle Offer */}
                  {plan.bundle_offer && (
                    <p className="absolute -top-7 right-2 text-[12px] font-semibold text-[#FF6B45]">
                      {plan.bundle_offer}
                    </p>
                  )}

                  <div className="p-4">
                    <div
                      className={`rounded-2xl border p-5 ${
                        isHighlighted
                          ? "border-[#FFD6CA] bg-[#FFF8F5]"
                          : "border-gray-200 bg-[#FAFAFA]"
                      }`}
                    >
                      <h3 className="text-[22px] font-bold text-[#444]">
                        {plan.plan_name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {plan.subtitle}
                      </p>
                    </div>

                    {/* Features */}

                       <div
            dangerouslySetInnerHTML={{
              __html: plan.content_data || "",
            }}
            className="text-center text-2xl md:text-3xl lg:text-4xl font-bold"
          /> 

                    {/* <ul className="mt-6 space-y-2">
                      {features.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-[#666]"
                        >
                          <span
                            className={`mt-[7px] h-[5px] min-w-[5px] rounded-full ${
                              isHighlighted ? "bg-[#FF6B45]" : "bg-gray-400"
                            }`}
                          />

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul> */}

                    {/* Price */}
                    <div className="mt-4 text-center">
                      <div className="flex justify-center items-center text-[42px] text-center font-bold text-[#333]">
                        <IndianRupee className=" h-7 w-8" />
                        {plan.price}
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      className={`mt-4 w-full rounded-xl py-3 font-semibold transition
              ${
                isHighlighted
                  ? "bg-[#FF6B45] text-white hover:bg-[#F15B2F]"
                  : "bg-[#F4F4F4] text-[#333] hover:bg-gray-200"
              }`}
                    >
                      Sign Up Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
