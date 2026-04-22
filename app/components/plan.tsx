import React from "react";

const PricingCard = ({ plan } : {plan : any}) => (
  <div
    className={`max-w-7xl relative bg-${plan.bg} flex flex-col p-8 rounded-[40px] border-2
     transition-all duration-300  min-h-[600px] ${
      plan.is_highlighted
        ? "mb-40 shadow-xl z-10 border-orange-400"
        : "opacity-90  border-2 border-gray-400"
    }`}
  >
    
    <div className={`mb-1 p-4 border-2 rounded-xl bg-white ${
        plan.is_highlighted
        ? "border-orange-400"
        : "border-gray-400"
    }`}>
      <h4 className="text-2xl font-bold text-gray-800">{plan.plan_name}</h4>
      <p className="text-gray-500 text-sm mt-1">{plan.subtitle}</p>
    </div>


    <div className="flex-grow space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Content
        </span>
        <ul className="mt-2 space-y-3">
          {plan.content_features.map((feature:any, i:number) => (
            <li key={i} className="flex text-sm text-gray-600 leading-tight">
              <span className="mr-2 text-gray-400">•</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Features
        </span>
        <ul className="mt-3 space-y-3">
          {plan.access_features.map((feature: any, i:number) => (
            <li key={i} className="flex text-sm text-gray-600 leading-tight">
              <span className="mr-2 text-gray-400">•</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>


    <div className=" border-gray-100 text-center ">
      {plan.bundle_offer && (
        <p className="text-red-500 text-xs font-bold  absolute -top-6 right-18">
          {plan.bundle_offer}
        </p>
      )}

      {plan.price ? (
        <>
          <div className="text-4xl font-black text-gray-900 mb-2">
            {plan.price}
          </div>
          <button className="absolute -bottom-3 right-0 flex justify-center w-full">
            <p className="text-center w-1/2 bg-[#F36C45] hover:bg-orange-600 text-white font-black py-1 rounded-2xl transition-transform active:scale-95">
                 Sign Up Now
            </p>
           
          </button>
        </>
      ) : (
        <button className="w-full border-2 border-gray-200 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed">
          Coming Soon
        </button>
      )}
    </div>
  </div>
);

const PricingSection = ({ plans }:{plans: any}) => {
  return (
    <section className=" px-6 py-12 relative overflow-visible mt-10 ">
        
        <div className="text-xl font-bold mb-2 text-center leading-relaxed">
          <span className="text-[#F36C45]">"Ooshas prep </span>
          <span>
            gets rave reviews from students, many of whom <br /> have improved
            their GRE score with this flexible and{" "}
          </span>
          <span className="text-[#F36C45]">affordable plan."</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center max-w-7xl mx-auto mt-20">
          {plans.map((item: any, index: number) => (
            <PricingCard key={index} plan={item} />
          ))}
        </div>

        <div className="text-center text-sm space-y-3">
            <p className="font-semibold">Try Ooshas prp GRE for 7</p>
            <p>Start a Free trial with 20+ questions and lessons</p>
            <p className="">Start a Free trial</p>
        </div>
        
    </section>
  );
};

export default PricingSection;
