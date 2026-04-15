// import Image from "next/image";
import { details, li } from "framer-motion/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { BlogSlider } from "./blog-slider";
import { DestinationsAndConsultants } from "./destinations-consultants";

const categories = [
  "ALL",
  "UK",
  "USA",
  "IRELAND",
  "DUBAI",
  "CANADA",
  "VISA",
  "NEW ZEALAND",
  "PTE",
  "SAT",
];

const blogs = [
  {
    id: 1,
    title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
    slug: "day-1-cpt-programs-usa",
    details : "japan dubles its citizenship residency requirement to 10 yours in 2026. Discover what is means for immigrants, students and skilled professionals.",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 2,
    title:
      "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    slug: "day-1-cpt-programs-usa",
    details : "japan dubles its citizenship residency requirement to 10 yours in 2026. Discover what is means for immigrants, students and skilled professionals.",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 3,
    title:
      "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
    slug: "day-1-cpt-programs-usa",
    details : "japan dubles its citizenship residency requirement to 10 yours in 2026. Discover what is means for immigrants, students and skilled professionals.",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 4,
    title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
    details : "japan dubles its citizenship residency requirement to 10 yours in 2026. Discover what is means for immigrants, students and skilled professionals.",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 5,
    title:
      "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    details : "japan dubles its citizenship residency requirement to 10 yours in 2026. Discover what is means for immigrants, students and skilled professionals.",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 6,
    title:
      "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
   details : "japan dubles its citizenship residency requirement to 10 yours in 2026. Discover what is means for immigrants, students and skilled professionals.",
     slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
];

export default function Blog() {
  
  
  return (
    <section>
      <div className="lg:relative h-[80vh] bg-gray-200">
        <div className="h-[40vh] bg-[url('/image/03.jpeg')] bg-cover bg-center bg-no-repeat md:rounded-[0_0_8rem_8rem]">
          <div className="flex lg:pl-40 justify-center lg:justify-start items-center h-full w-full  bg-black/60 text-white md:rounded-[0_0_8rem_8rem] ">
            <span >
               <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center">Ooshas prep</h2>
              <h1 className="font-extrabold text-5xl md:text-6xl lg:text-8xl">BLOGS</h1>
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap lg:pl-40">
          
        <div className="lg:max-w-[40rem] my-4 flex items-center jutify-center border-1 
        border-black gap-2 bg-white lg:rounded-full w-full h-10 lg:h-20 px-10 text-gray-800 lg:text-xl">
          <Search />
          <input type="text" placeholder="What are you looking for ?" className="w-full"/>
          <button type="button" className="font-samibold text-black">Search</button>
        </div>

        <img src="/image/01.png" alt="logo" className="lg:h-[30rem] lg:absolute top-10 right-14"/>
        </div>

      </div>

      <div className="flex items-start flex-wrap md:flex-nowrap mt-14 gap-4 md:max-w-7xl mx-auto">
        <div className="flex flex-col flex-nowrap gap-4 p-2 ">
           {blogs.map((ele,idx) => (
            <div key={idx} className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4 p-4 rounded-xl bg-gray-100  ">
              <img src={ele.image} alt="logo" className="rounded-xl h-48 w-94" />
              <ul className="space-y-2">
                <li>{ele.date}</li>
                <li>{ele.title}</li>
                <li>{ele?.details}</li>
                <li className="bg-orange-500 rounded-full px-4 py-2 text-white font-semibold md:w-1/4">read more</li>
              </ul>
            </div>
           ))}
        </div>
        
        <form action="" className="md:w-1/3 bg-gray-100 rounded-xl m-2 p-4 space-y-4">
          <h1 className="font-bold my-4 text-lg">SEND AN ENQUIRY</h1>
           {[
            {"type":"text","label": "Name" },
            {"type":"text","label": "Location" },
            {"type":"tel","label": "Phone Number" },
            {"type":"email","label": "Email" },
            {"type":"text","label": "Course looking for" },
            {"type":"text","label": "Country looking for" },
            {"type":"text","label": "Enquiry Regarding" },
            {"type":"textarea","label":"Your Message"}
           ].map((ele,idx) => (
              <input key={idx} type={ele.type} placeholder={ele.label}  className="w-full border-2 bg-white border-gray-200 px-4 py-2"/>
           ))}
            
            <label htmlFor="check" className="text-md text-gray-600">
              <input type="checkbox" name="check" id="check" />{" "}
              I agree and authorise the team to contact me over phone, email, SMS & WhatsApp.
            </label>
            <button type="submit" className="w-full bg-orange-500 py-2 my-2 text-white rounded-xl text-center ">SEND</button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto">
         <BlogSlider />
      </div>

      <div className="bg-black/80 text-white lg:relative ">
         <div className="flex justify-between items-center flex-wrap gap-4 md:max-w-7xl mx-auto ">
           
           <div className="space-y-4 my-18 text-center md:text-left">
             <h2 className="font-semibold">All the Resources you need for the Complete Exam Prep</h2>
             <p className="text-xs">Achieve excellence with a platform designed for comprehensive preparation.</p>

             <ul className="space-y-4">
              {[
              {"heading":"27M+ App Downloads","content":"Join millions of learners worldwide"},
              {"heading":"4.8+ App Rating","content":"Rated highly by our users."}
              ].map((ele,idx) => (
              <li key={idx} className="flex justify-center md: jsutify-center md:items-start gap-3">
               <span className="text-orange-500 text-2xl">•</span>
               <div>
                 <h3 className="font-semibold">{ele.heading}</h3>
                 <p className="text-xs text-gray-300">{ele.content}</p>
               </div>
              </li>
              ))}
             </ul>

             <div className="space-x-4 space-y-4">
              <input type="text" placeholder="Your Mobile Number" className="bg-white text-black rounded-lg px-4 py-2" />
              <button type="button"  className="bg-orange-500 text-white font-medium rounded-lg px-4 py-2">Get App Link</button>
             </div>
           </div>

           <img src="/image/02.png" alt="img" className="lg:absolute -top-30 right-30 md:h-[30rem]" />
         </div>
      </div>
      
            <div className="my-20 max-w-7xl mx-auto ">
              <img src={"/image/about.jpeg"} alt="img" />
            </div>
      
      <DestinationsAndConsultants />
    </section>
  );
}
