"use client"

import Image from "next/image"



export function WorkingProcess({data}:{data: any}) {  
  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* <h2 className="text-4xl font-extrabold text-center mb-4">
          <span className="text-brand-orange">Our Working</span> <span className="text-[#626363]">Process</span> 
        </h2> */}
        <div dangerouslySetInnerHTML={{__html: data.fields.title}} />

        <p className="text-center font-semibold text-gray-600 mb-20 max-w-2xl mx-auto">
          {/* A Platform that takes care of everything beforehand. Gateway Abroad sources, vets, matches and manages all the lalents. */}
          {data.fields.subtitle}
        </p>

        <div className="relative flex flex-col lg:flex-row items-center gap-2">
          <div className="w-2/3 space-y-6 ">
            {data.fields.items.map((step:any, i:number) => {
              const IconComponent = step.icon
              return (
                <div key={i} className="flex gap-6 group w-full hover:scale:1.5">
                  <div className="flex-shrink-0 w-16 h-16  flex items-center justify-center text-brand-orange  transition-all">
                    {/* <IconComponent size={28} /> */}
                    <img src={IconComponent} alt={step.title}/>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-orange mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base ">{step.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="lg:block hidden absolute -right-20">
            <Image
              src="/image/steps.png"
              alt="Working Process"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
