"use client";

import React from "react";

const PricingSection = ({ plans }: { plans: any }) => {
  const {
    testimonial = "",
    pricing_plans = [],
    content_features = [],
    access_features = [],
  } = plans || {};

  const features = [...content_features, ...access_features]
    .map((item: any) =>
      typeof item === "string" ? item : item.feature || ""
    )
    .filter(Boolean);

  return (
    <section className="bg-[#f7f7f7] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold leading-relaxed text-[#3d3d3d]">
            {testimonial}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {pricing_plans.map((plan: any, index: number) => {
            const isHighlighted =
              plan.is_highlighted === true ||
              plan.is_highlighted === "true";

            return (
              <div
                key={index}
                className={`
                  relative rounded-[28px] bg-white p-8
                  transition-all duration-300
                  ${
                    isHighlighted
                      ? "border-2 border-[#F36C45] scale-105 shadow-xl z-10"
                      : index === 2
                      ? "border-2 border-[#cde6ff]"
                      : "border-2 border-[#d8d8d8]"
                  }
                `}
              >
                {/* Bundle text */}
                {plan.bundle_offer && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm font-semibold text-[#F36C45] whitespace-nowrap">
                    {plan.bundle_offer}
                  </div>
                )}

                {/* Header Box */}
                <div className="border border-[#dedede] rounded-2xl p-5 mb-8">
                  <h3 className="text-3xl font-bold text-[#444]">
                    {plan.plan_name}
                  </h3>

                  <p className="text-sm text-[#777] mt-2">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 min-h-[320px]">
                  {features.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="text-[#666] text-sm flex items-start"
                    >
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="text-center mt-10">
                  <h3 className="text-5xl font-extrabold text-[#444]">
                    {plan.price}
                  </h3>
                </div>

                {/* Button */}
                <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[75%]">
                  <button
                    className={`
                      w-full rounded-xl py-3 font-semibold shadow-md transition
                      ${
                        isHighlighted
                          ? "bg-[#F36C45] text-white hover:bg-[#e45b32]"
                          : "bg-white border border-[#d8d8d8] text-[#555]"
                      }
                    `}
                  >
                    Sign Up Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-xl font-bold text-[#444]">
            Try Ooshash prep GRE for 7
          </h3>

          <p className="text-[#777] mt-2">
            Start a free trial with 20+ questions and lessons
          </p>

          <button className="mt-6 text-[#444] underline">
            Start a free trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;