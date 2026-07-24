"use client";

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

interface FooterProps {
  Data?: any[];
}

export function Footer({ Data = [] }: FooterProps) {
  const router = useRouter();

  const courseData = React.useMemo(
    () =>
      Data?.filter(
        (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
      ) || [],
    [Data],
  );

  const socialLinks = [
    {
      icon: "/icon/insta.webp",
      label: "Instagram",
      url: "https://www.instagram.com/ooshasprep",
      hoverColor: "hover:text-pink-500",
    },
    {
      icon: "/icon/facebook.webp",
      label: "Facebook",
      url: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
      hoverColor: "hover:text-blue-600",
    },
    {
      icon: "/icon/twitter.webp",
      label: "Twitter",
      url: "#",
      hoverColor: "hover:text-blue-700",
    },
    {
      icon: "/icon/youtube.webp",
      label: "YouTube",
      url: "https://youtube.com/@ooshasprep",
      hoverColor: "hover:text-red-600",
    },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Career", path: "/career" },
    { label: "Contact Us", path: "/contact" },
  ];

  const resources = [
    { label: "Blogs", path: "/blog" },
    { label: "Case Studies", path: "/#" },
    { label: "Student Testimonials", path: "/#" },
    { label: "Events & Webinars", path: "/#" },
  ];

  return (
    <footer className="bg-[#FDF4EF] mt-2 mx-16 overflow-hidden border-2 border-primary rounded-t-[3.5rem]  ">
      {/* ================= TOP ================= */}
      <div className="">
        <div className="max-w-7xl mx-auto pl-6 py-8 md:py-12">
          <div className="md:flex gap-16 items-start">
            {/* Logo */}
            <div className="w-1/4 space-y-3">
              <Image
                src="/image/logo.png"
                alt="logo"
                width={170}
                height={70}
                className=""
              />
              <p className="text-sm leading-5 text-[#303030]  ">
                Ooshas Prep is a leading online test prep platform for IELTS,
                GRE, GMAT, SAT, TOEFL & PTE, offering flexible learning formats
                and world-class coaching.
              </p>
              <p className="text-sm leading-5 text-[#303030]">
                Toll Free : +91 9166146538
              </p>
              <p className="text-sm leading-5 text-[#303030]">
                Email : info@ooshasprep.com
              </p>
              <ul className="flex items-center gap-2 mt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <button
                        className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-black `}
                        onClick={() => window.open(social.url, "_blank")}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <img src={Icon} className=" w-6 h-6" />
                        {/* {social.label} */}
                      </button>
                    </li>
                  );
                })}
              </ul>
              
            </div>

            {/* Study Destinations */}
            <div className="">
              <h3 className="text-xl font-bold my-5">Quick Links</h3>

              <ul className="space-y-2 text-sm text-[#444]">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => router.push(link.path)}
                    >
                      {link.label} 
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold my-5">Our Services</h3>

              <ul className="space-y-2 text-sm text-[#444]">
                {courseData.map((item: any) => (
                  <li
                    key={item._id}
                    onClick={() => router.push(`/${item.seoMeta.canonicalUrl}`)}
                    className="cursor-pointer hover:text-[#FF6D4D]"
                  >
                    {item.seoMeta.navTitle}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold my-5">Resources</h3>

              <ul className="space-y-2 text-sm text-[#444]">
                {resources.map((resource) => (
                  <li key={resource.label}>
                    <button
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => router.push(resource.path)}
                    >
                      {resource.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold my-5">Contact us</h3>

              <ul className="space-y-2 text-sm text-[#444]">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <button
                        className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-black `}
                        onClick={() => window.open(social.url, "_blank")}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        {/* <img src={Icon} className=" w-6 h-6" /> */}
                        {social.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* <div className="flex justify-center lg:justify-end pl-10">
              <Image
                src="/image/footer2.webp"
                alt="student"
                width={360}
                height={360}
                className=" lg:w-[18rem] h-[18rem] object-contain"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* ================= ORANGE BAR ================= */}

      {/* <div
        className="relative bg-cover bg-center  bg-primary"
        // style={{ backgroundImage: "url('/image/footer.webp')" }}
      >
        <div className="max-w-7xl mx-auto  py-4 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center w-full gap-6 text-center md:text-left"
            >
              
              <div className="text-white max-w-xl">
                <h6 className="text-lg md:text-xl font-bold tracking-tight mb-1">
                  {"Ready to Achieve Your Dreams?"}
                </h6>
                <p className="text-sm md:text-xm opacity-90 font-medium">
                  {
                    "Join thousands of successful students and start your journey today."
                  }
                </p>
              </div>

              <button
                onClick={() => router.push("/auth")}
                className="flex-shrink-1 flex items-center gap-2 bg-white text-[#FF6A13] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap"
              >
                {"Enroll Now"}
                <svg
                  xmlns="http://w3.org"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9"
                  />
                </svg>
              </button>
            </motion.div>

            <div className="flex items-center gap-2">
              <ul className="flex items-center gap-2 mt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <button
                        className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-black `}
                        onClick={() => window.open(social.url, "_blank")}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <img src={Icon} className=" w-6 h-6" />
                        {social.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="relative "
        // style={{ backgroundImage: "url('/image/footer.webp')" }}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 text-black">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center w-full gap-2 text-center md:text-left"
            >
              <h6 className="text-lg md:text-xl font-bold tracking-tight mb-1 text-gray-900">
                Get Exam Updates
              </h6>
              <p className="text-sm opacity-90 font-medium">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-xl border-2 border-primary flex items-center gap-2 bg-white text-black font-semibold
         px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap"
                />
              </p>

              <button
                onClick={() => router.push("/auth")}
                className="flex-shrink-0 border-2 border-primary flex items-center gap-2 bg-white text-[#FF6A13] font-semibold
         px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap"
              >
                Subscribe Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="border-b-1 border-gray-300 mb-24 max-w-8xl mx-10 my-1"></div>
      {/* ================= BLACK BAR ================= */}
      <div className="bg-primary relative">
        <div className="max-w-7xl mx-auto  py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-8 mt-4 md:mt-0">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} Ooshas Prep. All rights reserved.
            </p>
            <Link
              href="/privacy-policy"
              className="text-white hover:text-[#FF6D4D]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="text-white hover:text-[#FF6D4D]"
            >
              Terms of Service
            </Link>
          </div>

          <img
            src="/icon/footer.webp"
            alt="img"
            className="h-34 absolute right-8 bottom-1"
          />
        </div>
      </div>
    </footer>
  );
}

// "use client";

// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { motion } from "framer-motion";

// interface FooterProps {
//   Data?: any[];
// }

// export function Footer({ Data = [] }: FooterProps) {
//   const router = useRouter();

//   const courseData = React.useMemo(
//     () =>
//       Data?.filter(
//         (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
//       ) || [],
//     [Data],
//   );

//   const socialLinks = [
//     {
//       icon: Instagram,
//       label: "Instagram",
//       url: "https://www.instagram.com/ooshasprep",
//       hoverColor: "hover:text-pink-500",
//     },
//     {
//       icon: Facebook,
//       label: "Facebook",
//       url: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
//       hoverColor: "hover:text-blue-600",
//     },
//     {
//       icon: Linkedin,
//       label: "LinkedIn",
//       url: "#",
//       hoverColor: "hover:text-blue-700",
//     },
//     {
//       icon: Youtube,
//       label: "YouTube",
//       url: "https://youtube.com/@ooshasprep",
//       hoverColor: "hover:text-red-600",
//     },
//   ];

//   const quickLinks = [
//     { label: "Home", path: "/" },
//     { label: "About Us", path: "/about" },
//     { label: "Services", path: "/services" },
//     { label: "Career", path: "/career" },
//     { label: "Contact Us", path: "/contact" },
//   ];

//   const resources = [
//     { label: "Blogs", path: "/blog" },
//     { label: "Case Studies", path: "/#" },
//     { label: "Student Testimonials", path: "/#" },
//     { label: "Events & Webinars", path: "/#" },
//   ];

//   return (
//     <footer className="w-full overflow-hidden">
//       {/* ================= TOP ================= */}
//       <div className="bg-[#FDF4EF]">
//         <div className="max-w-7xl mx-auto pl-6 pt-6">
//           <div className="md:flex gap-10 items-start">
//             {/* Logo */}
//             <div className="w-1/4">
//               <Image
//                 src="/image/logo.png"
//                 alt="logo"
//                 width={170}
//                 height={70}
//                 className=""
//               />

//               <p className="text-sm leading-5 text-[#303030]">
//                 Ooshas Prep is a leading online test prep platform for IELTS,
//                 GRE, GMAT, SAT, TOEFL & PTE, offering flexible learning formats
//                 and world-class coaching.
//               </p>
//             </div>

//             {/* Study Destinations */}
//             <div className="pl-6">
//               <h3 className="text-xl font-bold my-5">Quick Links</h3>

//               <ul className="space-y-2 text-sm text-[#444]">
//                 {quickLinks.map((link) => (
//                   <li key={link.label}>
//                     <button
//                       className="cursor-pointer hover:text-primary transition-colors"
//                       onClick={() => router.push(link.path)}
//                     >
//                       {link.label} Page
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Services */}
//             <div>
//               <h3 className="text-xl font-bold my-5">Our Services</h3>

//               <ul className="space-y-2 text-sm text-[#444]">
//                 {courseData.map((item: any) => (
//                   <li
//                     key={item._id}
//                     onClick={() => router.push(`/${item.seoMeta.canonicalUrl}`)}
//                     className="cursor-pointer hover:text-[#FF6D4D]"
//                   >
//                     {item.seoMeta.navTitle}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Resources */}
//             <div>
//               <h3 className="text-xl font-bold my-5">Resources</h3>

//               <ul className="space-y-2 text-sm text-[#444]">
//                 {resources.map((resource) => (
//                   <li key={resource.label}>
//                     <button
//                       className="cursor-pointer hover:text-primary transition-colors"
//                       onClick={() => router.push(resource.path)}
//                     >
//                       {resource.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Illustration */}
//             <div className="flex justify-center lg:justify-end pl-10">
//               <Image
//                 src="/image/footer2.webp"
//                 alt="student"
//                 width={360}
//                 height={360}
//                 className=" lg:w-[18rem] h-[18rem] object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= ORANGE BAR ================= */}

//       <div
//         className="relative bg-cover bg-center  bg-primary"
//         // style={{ backgroundImage: "url('/image/footer.webp')" }}
//       >
//         <div className="max-w-7xl mx-auto  py-4 text-white">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
//             {/* Left */}

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//               className="flex flex-col md:flex-row items-center w-full gap-6 text-center md:text-left"
//             >
//               {/* Text Content */}
//               <div className="text-white max-w-xl">
//                 <h6 className="text-lg md:text-xl font-bold tracking-tight mb-1">
//                   {"Ready to Achieve Your Dreams?"}
//                 </h6>
//                 <p className="text-sm md:text-xm opacity-90 font-medium">
//                   {
//                     "Join thousands of successful students and start your journey today."
//                   }
//                 </p>
//               </div>

//               {/* Call to Action Button */}
//               <button
//                 onClick={() => router.push("/auth")}
//                 className="flex-shrink-1 flex items-center gap-2 bg-white text-[#FF6A13] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap"
//               >
//                 {"Enroll Now"}
//                 <svg
//                   xmlns="http://w3.org"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2.5}
//                   stroke="currentColor"
//                   className="w-4 h-4"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9"
//                   />
//                 </svg>
//               </button>
//             </motion.div>

//             {/* Right */}
//             <div className="flex items-center gap-2">
//               {/* <span className="text-white text-xl"> Connect - </span>  */}
//               <ul className="flex items-center gap-2 mt-2">
//                 {socialLinks.map((social) => {
//                   const Icon = social.icon;
//                   return (
//                     <li key={social.label}>
//                       <button
//                         className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-black `}
//                         onClick={() => window.open(social.url, "_blank")}
//                         aria-label={`Follow us on ${social.label}`}
//                       >
//                         <Icon className=" w-6 h-6" />
//                         {social.label}
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= BLACK BAR ================= */}
//       <div className="bg-[#121212]">
//         <div className="max-w-7xl mx-auto  py-2 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-white text-sm">
//             © {new Date().getFullYear()} Ooshas Prep. All rights reserved.
//           </p>

//           <div className="flex gap-8 mt-4 md:mt-0">
//             <Link
//               href="/privacy-policy"
//               className="text-white hover:text-[#FF6D4D]"
//             >
//               Privacy Policy
//             </Link>

//             <Link
//               href="/terms-and-conditions"
//               className="text-white hover:text-[#FF6D4D]"
//             >
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
