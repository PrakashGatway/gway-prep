"use client"

import DOMPurify from "isomorphic-dompurify";


export function Baners({heading, img}: {heading ?: any, img : any}) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto">
        
{/*         
        <h2 className="text-4xl text-[#626363] font-semibold text-center mb-20">
         Everything you need to {" "}
          <span className="text-brand-orange">prep any time</span>{" "}
        </h2>  */}
{/* 
        <h2 className="text-4xl text-[#626363] font-semibold text-center mb-20"
                dangerouslySetInnerHTML={{
                  __html: heading,
                }}
              /> */}

        <img         
          src={img || "/image/about.jpeg"}
          alt="About Us" 
          className="w-full h-auto "
        />


      </div>
    </section>
  )
}