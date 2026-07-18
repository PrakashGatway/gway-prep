

"use client";

import { IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";


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

  const router = useRouter();

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
                      onClick={() => router.push("/auth")}
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
