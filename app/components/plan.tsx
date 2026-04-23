import React from "react";

const PricingCard = ({ 
  plan, 
  contentFeatures, 
  accessFeatures,
  index 
}: { 
  plan: any; 
  contentFeatures: string[];
  accessFeatures: string[];
  index: number;
}) => {
  // Define background colors based on index or plan properties
  const getBgColor = () => {
    if (plan.is_highlighted) return "bg-orange-100";
    if (index === 0) return "bg-gray-100";
    if (index === 2) return "bg-[#00b7ff0f]";
    return "bg-white";
  };

  return (
    <div
      className={`relative ${getBgColor()} flex flex-col p-8 rounded-[40px] border-2
       transition-all duration-300 min-h-[600px] ${
        plan.is_highlighted
          ? "shadow-xl z-10 border-orange-400"
          : "opacity-90 border-gray-400"
      }`}
    >
      {/* Header */}
      <div
        className={`mb-1 p-4 border-2 rounded-xl bg-white ${
          plan.is_highlighted ? "border-orange-400" : "border-gray-400"
        }`}
      >
        <h4 className="text-2xl font-bold text-gray-800">{plan.plan_name}</h4>
        {plan.subtitle && (
          <p className="text-gray-500 text-sm mt-1">{plan.subtitle}</p>
        )}
      </div>

      {/* Bundle Offer Badge */}
      {plan.bundle_offer && (
        <p className="text-red-500 text-xs font-bold absolute -top-6 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
          {plan.bundle_offer}
        </p>
      )}

      {/* Content Features */}
      <div className="flex-grow space-y-4">
        {contentFeatures.length > 0 && (
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Content
            </span>
            <ul className="mt-2 space-y-3">
              {contentFeatures.map((feature: string, i: number) => (
                <li key={i} className="flex text-sm text-gray-600 leading-tight">
                  <span className="mr-2 text-gray-400">•</span>
                  {feature.replace(/^[•\-\s]+/, '')}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Access Features */}
        {accessFeatures.length > 0 && (
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Features
            </span>
            <ul className="mt-3 space-y-3">
              {accessFeatures.map((feature: string, i: number) => (
                <li key={i} className="flex text-sm text-gray-600 leading-tight">
                  <span className="mr-2 text-gray-400">•</span>
                  {feature.replace(/^[•\-\s]+/, '')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Price and CTA */}
      <div className="border-gray-100 text-center mt-6">
        {plan.price ? (
          <>
            <div className="text-4xl font-black text-gray-900 mb-2">
              {plan.price}
            </div>
            <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
              <button className="text-center w-1/2 bg-[#F36C45] hover:bg-orange-600 text-white font-black py-2 rounded-2xl transition-transform active:scale-95">
                Sign Up Now
              </button>
            </div>
          </>
        ) : (
          <button className="w-full border-2 border-gray-200 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed">
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

const PricingSection = ({ plans }: { plans: any }) => {
  console.log(plans);

  // Extract data from the object
  const {
    testimonial = "",
    pricing_plans = [],
    content_features = [],
    access_features = []
  } = plans;

  // Transform features to string arrays
  const contentFeaturesList = content_features.map((item: any) => 
    typeof item === "string" ? item : item.feature || ""
  ).filter(Boolean);

  const accessFeaturesList = access_features.map((item: any) => 
    typeof item === "string" ? item : item.feature || ""
  ).filter(Boolean);

  return (
    <section className="px-6 py-12 relative overflow-visible mt-10">
      {/* Testimonial */}
      {testimonial && (
        <div className="text-xl font-bold mb-2 text-center leading-relaxed max-w-4xl mx-auto">
          <span className="text-[#F36C45]">"</span>
          <span className="mx-1">{testimonial.replace(/^["']|["']$/g, '')}</span>
          <span className="text-[#F36C45]">"</span>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start max-w-7xl mx-auto mt-20">
        {pricing_plans.map((plan: any, index: number) => (
          <PricingCard 
            key={index} 
            plan={plan} 
            contentFeatures={contentFeaturesList}
            accessFeatures={accessFeaturesList}
            index={index}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm space-y-3 mt-12">
        <p className="font-semibold">Try Ooshas prep GRE for 7 days free</p>
        <p>Start a Free trial with 20+ questions and lessons</p>
        <p className="text-[#F36C45] font-semibold cursor-pointer hover:underline">
          Start a Free trial
        </p>
      </div>
    </section>
  );
};

export default PricingSection;







// import React from "react";

// const PricingCard = ({ plan } : {plan : any}) => (
//   <div
//     className={`max-w-7xl relative bg-${plan.bg} flex flex-col p-8 rounded-[40px] border-2
//      transition-all duration-300  min-h-[600px] ${
//       plan.is_highlighted
//         ? "mb-40 shadow-xl z-10 border-orange-400"
//         : "opacity-90  border-2 border-gray-400"
//     }`}
//   >
    
//     <div className={`mb-1 p-4 border-2 rounded-xl bg-white ${
//         plan.is_highlighted
//         ? "border-orange-400"
//         : "border-gray-400"
//     }`}>
//       <h4 className="text-2xl font-bold text-gray-800">{plan.plan_name}</h4>
//       <p className="text-gray-500 text-sm mt-1">{plan.subtitle}</p>
//     </div>


//     <div className="flex-grow space-y-4">
//       <div>
//         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
//           Content
//         </span>
//         <ul className="mt-2 space-y-3">
//           {plan.content_features.map((feature:any, i:number) => (
//             <li key={i} className="flex text-sm text-gray-600 leading-tight">
//               <span className="mr-2 text-gray-400">•</span> {feature}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
//           Features
//         </span>
//         <ul className="mt-3 space-y-3">
//           {plan.access_features.map((feature: any, i:number) => (
//             <li key={i} className="flex text-sm text-gray-600 leading-tight">
//               <span className="mr-2 text-gray-400">•</span> {feature}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>


//     <div className=" border-gray-100 text-center ">
//       {plan.bundle_offer && (
//         <p className="text-red-500 text-xs font-bold  absolute -top-6 right-18">
//           {plan.bundle_offer}
//         </p>
//       )}

//       {plan.price ? (
//         <>
//           <div className="text-4xl font-black text-gray-900 mb-2">
//             {plan.price}
//           </div>
//           <button className="absolute -bottom-3 right-0 flex justify-center w-full">
//             <p className="text-center w-1/2 bg-[#F36C45] hover:bg-orange-600 text-white font-black py-1 rounded-2xl transition-transform active:scale-95">
//                  Sign Up Now
//             </p>
           
//           </button>
//         </>
//       ) : (
//         <button className="w-full border-2 border-gray-200 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed">
//           Coming Soon
//         </button>
//       )}
//     </div>
//   </div>
// );

// const PricingSection = ({ plans }:{plans: any}) => {
//   console.log(plans)
  
//   return (
//     <section className=" px-6 py-12 relative overflow-visible mt-10 ">
        
//         <div className="text-xl font-bold mb-2 text-center leading-relaxed">
//           <span className="text-[#F36C45]">"Ooshas prep </span>
//           <span>
//             gets rave reviews from students, many of whom <br /> have improved
//             their GRE score with this flexible and{" "}
//           </span>
//           <span className="text-[#F36C45]">affordable plan."</span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center max-w-7xl mx-auto mt-20">
//           {plans.map((item: any, index: number) => (
//             <PricingCard key={index} plan={item} />
//           ))}
//         </div>

//         <div className="text-center text-sm space-y-3">
//             <p className="font-semibold">Try Ooshas prp GRE for 7</p>
//             <p>Start a Free trial with 20+ questions and lessons</p>
//             <p className="">Start a Free trial</p>
//         </div>
        
//     </section>
//   );
// };

// export default PricingSection;
