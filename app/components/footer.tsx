"use client"

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export function Footer({Data} : any) {
  const route = useRouter();

  const couresData = React.useMemo(
    () =>
      Data?.filter(
        (item: any) => item?.seoMeta?.template?.toLowerCase() === "preparation",
      ) || [],
    [Data],
  );

  return (
    <>
      {/* Footer */}
      <footer 
        className="pt-12 md:pt-16 lg:pt-24 xl:pt-32 pb-8 md:pb-12 lg:pb-20 overflow-hidden relative" 
        style={{
          background: `url(/footer.jpeg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="rounded-[30px] md:rounded-[40px] lg:rounded-[50px] px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 pb-8 md:pb-10 lg:pb-12 relative text-white bg-black/20 backdrop-blur-sm">
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* BRAND */}
              <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-6 lg:mb-0 flex flex-col items-start justify-center">
                <Image
                  src="/home/logo.png"
                  alt="Ooshas Prep"
                  width={120}
                  height={60}
                  className="mb-3 md:mb-4 w-auto h-8 md:h-10 lg:h-14 cursor-pointer"
                  onClick={() => route.push('/')}
                />
                {/* <p className="text-lg md:text-xl font-bold mb-2 md:mb-3">Ooshas Prep</p> */}
                <p className="text-xs md:text-sm leading-relaxed mb-4 md:mb-6 opacity-90">
                  Ooshas Prep is a leading online test prep platform for IELTS, GRE, GMAT, SAT, TOEFL & PTE, offering flexible learning formats and world‑class coaching.
                </p>
                <button className="bg-white text-gray-900 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors">
                  Get in Touch
                </button>
              </div>

              {/* CONTENT AREA WITH DIVIDERS */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-0">
                
                {/* QUICK LINKS */}
                <div className="relative lg:px-6 h-auto lg:h-[12rem]">
                  {/* Left divider - only on lg screens */}
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
                  <div className="flex flex-col">
                    <p className="font-bold text-base md:text-lg mb-3 md:mb-4">Quick Links</p>
                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/')}>Home</li>
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/about')}>About Us</li>
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/services')}>Services</li>
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/career')}>Career</li>
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/contact')}>Contact Us</li>
                    </ul>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="relative lg:px-6 h-auto lg:h-[12rem]">
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
                  <div className="flex flex-col">
                    <p className="font-bold text-base md:text-lg mb-3 md:mb-4">Our Services</p>
                    
                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm"> 
                      {couresData.map((ele, idx) => ( 
                        <li 
                          key={idx} 
                          className="cursor-pointer hover:text-gray-200 transition-colors" 
                          onClick={() => route.push(`/${ele.seoMeta.canonicalUrl}`)}
                        > 
                          {ele.seoMeta.navTitle} 
                        </li> 
                      ))} 
                    </ul>

                  </div>
                </div>

                {/* RESOURCES */}
                <div className="relative lg:px-6 h-auto lg:h-[12rem]">
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
                  <div className="flex flex-col">
                    <p className="font-bold text-base md:text-lg mb-3 md:mb-4">Resources</p>
                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/blog')}>Blogs</li>
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/blog')}>Case Studies</li>
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/blog')}>Student Testimonials</li>
                      {/* <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/blog')}>FAQs</li> */}
                      <li className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => route.push('/blog')}>Events & Webinars</li>
                    </ul>
                  </div>
                </div>

                {/* CONNECT */}
                <div className="relative lg:px-6 h-auto lg:h-[12rem]">
                  {/* Left divider - only on lg screens */}
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white/30 rounded-full"></div>
                  <div className="flex flex-col">
                    <p className="font-bold text-base md:text-lg mb-3 md:mb-4">Connect</p>
                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      <li className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition-colors"
                       onClick={() => window.open('https://www.instagram.com/ooshasprep', '_blank')}>
                        <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4" /> Instagram
                      </li>
                      <li className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition-colors"
                       onClick={() => window.open('https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr', '_blank')}>
                        <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4" /> Facebook
                      </li>
                      <li className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition-colors"
                       onClick={() => window.open('#', '_blank')}>
                        <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" /> LinkedIn
                      </li>
                      <li className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition-colors" 
                      onClick={() => window.open('https://youtube.com/@ooshasprep', '_blank')}>
                        <Youtube className="w-3.5 h-3.5 md:w-4 md:h-4" /> YouTube
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="mt-6 md:mt-8 lg:mt-10 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600 gap-3 md:gap-4 px-4">
            <p className="text-center md:text-left">© 2026 Ooshas Prep. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

