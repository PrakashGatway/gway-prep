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
      icon: Instagram,
      label: "Instagram",
      url: "https://www.instagram.com/ooshasprep",
      hoverColor: "hover:text-pink-500",
    },
    {
      icon: Facebook,
      label: "Facebook",
      url: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
      hoverColor: "hover:text-blue-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "#",
      hoverColor: "hover:text-blue-700",
    },
    {
      icon: Youtube,
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
    <footer className="w-full overflow-hidden">
      {/* ================= TOP ================= */}
      <div className="bg-[#FDF4EF]">
        <div className="max-w-7xl mx-auto pl-6 pt-6">
          <div className="md:flex gap-10 items-start">
            {/* Logo */}
            <div className="w-1/4">
              <Image
                src="/image/logo.png"
                alt="logo"
                width={170}
                height={70}
                className=""
              />

              <p className="text-sm leading-5 text-[#303030]">
                Ooshas Prep is a leading online test prep platform for IELTS,
                GRE, GMAT, SAT, TOEFL & PTE, offering flexible learning formats
                and world-class coaching.
              </p>
            </div>

            {/* Study Destinations */}
            <div className="pl-6">
              <h3 className="text-xl font-bold my-5">Quick Links</h3>

              <ul className="space-y-2 text-sm text-[#444]">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => router.push(link.path)}
                    >
                      {link.label} Page
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

            {/* Illustration */}
            <div className="flex justify-center lg:justify-end pl-10">
              <Image
                src="/image/footer2.webp"
                alt="student"
                width={360}
                height={360}
                className=" lg:w-[18rem] h-[18rem] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= ORANGE BAR ================= */}

      <div
        className="relative bg-cover bg-center  bg-primary"
        // style={{ backgroundImage: "url('/image/footer.webp')" }}
      >
        <div className="max-w-7xl mx-auto  py-4 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Left */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center w-full gap-6 text-center md:text-left"
            >
              {/* Text Content */}
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

              {/* Call to Action Button */}
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

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* <span className="text-white text-xl"> Connect - </span>  */}
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
                        <Icon className=" md:w-4 md:h-4" />
                        {social.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BLACK BAR ================= */}
      <div className="bg-[#121212]">
        <div className="max-w-7xl mx-auto  py-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Ooshas Prep. All rights reserved.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0">
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
        </div>
      </div>
    </footer>
  );
}

// "use client"

// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import React from "react"

// interface FooterProps {
//   Data?: any[]
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
//       hoverColor: "hover:text-pink-500"
//     },
//     {
//       icon: Facebook,
//       label: "Facebook",
//       url: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
//       hoverColor: "hover:text-blue-600"
//     },
//     {
//       icon: Linkedin,
//       label: "LinkedIn",
//       url: "#",
//       hoverColor: "hover:text-blue-700"
//     },
//     {
//       icon: Youtube,
//       label: "YouTube",
//       url: "https://youtube.com/@ooshasprep",
//       hoverColor: "hover:text-red-600"
//     }
//   ];

//   const quickLinks = [
//     { label: "Home", path: "/" },
//     { label: "About Us", path: "/about" },
//     { label: "Services", path: "/services" },
//     { label: "Career", path: "/career" },
//     { label: "Contact Us", path: "/contact" }
//   ];

//   const resources = [
//     { label: "Blogs", path: "/blog" },
//     { label: "Case Studies", path: "/#" },
//     { label: "Student Testimonials", path: "/#" },
//     { label: "Events & Webinars", path: "/#" }
//   ];

//   return (
//     <footer
//       className="pt-12 md:pt-16 lg:pt-24 xl:pt-32 pb-8 md:pb-12 lg:pb-20 overflow-hidden relative"
//       style={{
//         background: `url(/footer.jpeg)`,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
//         <div className="rounded-[30px] md:rounded-[40px] lg:rounded-[50px] px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 pb-8 md:pb-10 lg:pb-12 relative text-white bg-black/20 backdrop-blur-sm">

//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//             {/* BRAND */}
//             <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-6 lg:mb-0 flex flex-col items-start justify-center">
//               <Image
//                 src="/home/logo.png"
//                 alt="Ooshas Prep"
//                 width={120}
//                 height={60}
//                 className="mb-3 md:mb-4 w-auto h-8 md:h-10 lg:h-14 cursor-pointer"
//                 onClick={() => router.push('/')}
//                 priority
//               />
//               <p className="text-xs md:text-sm leading-relaxed mb-4 md:mb-6 opacity-90">
//                 Ooshas Prep is a leading online test prep platform for IELTS, GRE, GMAT, SAT, TOEFL & PTE, offering flexible learning formats and world‑class coaching.
//               </p>
//               <button
//                 className="bg-white text-gray-900 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors"
//                 onClick={() => router.push('/contactus')}
//               >
//                 Get in Touch
//               </button>
//             </div>

//             {/* CONTENT AREA WITH DIVIDERS */}
//             <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-0">

//               {/* QUICK LINKS */}
//               <div className="relative lg:px-6 h-auto lg:h-[12rem]">
//                 <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
//                 <div className="flex flex-col">
//                   <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
//                   <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
//                     {quickLinks.map((link) => (
//                       <li key={link.label}>
//                         <button
//                           className="cursor-pointer hover:text-primary transition-colors"
//                           onClick={() => router.push(link.path)}
//                         >
//                           {link.label}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* SERVICES */}
//               <div className="relative lg:px-6 h-auto lg:h-[12rem]">
//                 <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
//                 <div className="flex flex-col">
//                   <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Our Services</h3>
//                   <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
//                     {courseData.map((ele: any, idx: number) => (
//                       <li key={idx}>
//                         <button
//                           className="cursor-pointer hover:text-primary transition-colors"
//                           onClick={() => router.push(`/${ele.seoMeta.canonicalUrl}`)}
//                         >
//                           {ele.seoMeta.navTitle}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* RESOURCES */}
//               <div className="relative lg:px-6 h-auto lg:h-[12rem]">
//                 <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
//                 <div className="flex flex-col">
//                   <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Resources</h3>
//                   <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
//                     {resources.map((resource) => (
//                       <li key={resource.label}>
//                         <button
//                           className="cursor-pointer hover:text-primary transition-colors"
//                           onClick={() => router.push(resource.path)}
//                         >
//                           {resource.label}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* CONNECT */}
//               <div className="relative lg:px-6 h-auto lg:h-[12rem]">
//                 <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
//                 <div className="flex flex-col">
//                   <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Connect</h3>
//                   <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
//                     {socialLinks.map((social) => {
//                       const Icon = social.icon;
//                       return (
//                         <li key={social.label}>
//                           <button
//                             className={`flex items-center gap-2 cursor-pointer transition-colors ${social.hoverColor}`}
//                             onClick={() => window.open(social.url, '_blank')}
//                             aria-label={`Follow us on ${social.label}`}
//                           >
//                             <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                             {social.label}
//                           </button>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* BOTTOM BAR */}
//         <div className="mt-6 md:mt-8 lg:mt-10 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-white/80 gap-3 md:gap-4 px-4">
//           <p className="text-center md:text-left">© {new Date().getFullYear()} Ooshas Prep. All rights reserved.</p>
//           <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
//             <Link href="/privacy-policy" className="hover:text-white transition-colors">
//               Privacy Policy
//             </Link>
//             <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
