"use client"

export function Baners({heading, img}: {heading ?: any, img : any}) {
  return (
    <section className="bg-white" id="about">
      <div className="max-w-7xl mx-auto">
        
        
        <h2 className="text-4xl text-[#626363] font-semibold text-center mb-10">
         Everything you need to {" "}
          <span className="text-brand-orange">prep any time</span>{" "}
        </h2> 
        

        <img         
          src={img || "/image/about.jpeg"}
          alt="About Us" 
          className="w-full h-auto "
        />


      </div>
    </section>
  )
}