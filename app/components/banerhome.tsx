"use client";

export function Banerhome({ data, img }: any) {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          
          <img
            src={data.fields.image || "/image/about.jpeg"}
            alt="About Us"
            className="w-full h-auto md:sticky top-32 rounded-lg sm:rounded-xl lg:rounded-2xl order-1 lg:order-none"
          />

          <div className="pl-0 lg:pl-6 xl:pl-10 bg-white font-sans order-2 lg:order-none">
            
            <div className="text-center lg:text-left" dangerouslySetInnerHTML={{ __html: data.fields?.title }} />

            <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6 lg:mt-8">
              {data.fields?.items.map((item: any, i: number) => (
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4" key={i}>
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                    <img 
                      src={item.icon || "/home/06.png"} 
                      alt="icon" 
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-700">
                      {item.title ?? "Reliable Study Materials"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mt-1 leading-relaxed">
                      {item.subtitle}
                      {/* Get access to the best preparation resources to ace the test in your first attempt. */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}











// "use client";

// export function Banerhome({ data, img }: any) {
//   return (
//     <section className="py-12 md:py-16 lg:py-20 bg-white" id="about">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4  justify-between ">
//         <img
//           src={img || "/image/about.jpeg"}
//           alt="About Us"
//           className="w-full h-auto sticky top-32"
//         />

//         <div className="pl-10  bg-white font-sans">
          

//           <div dangerouslySetInnerHTML={{ __html: data.fields?.title }} />

//           <div className="space-y-8 mt-2">
//             {data.fields?.items.map((item: any, i: number) => (
//               <div className="flex items-start gap-4" key={i}>
//                 <div className="flex-shrink-0 w-14 h-14  rounded-full flex items-center justify-center">
//                   <img src={item.icon || "/home/06.png"} alt="icon" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-700">
//                     {item.title ?? "Reliable Study Materials"}
//                   </h3>
//                   <p className="text-gray-500 mt-1 leading-relaxed">
//                     {item.subtitle}
//                     {/* Get access to the best preparation resources to ace the test in your first attempt. */}
//                   </p>
//                 </div>
//               </div>
//             ))}

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
