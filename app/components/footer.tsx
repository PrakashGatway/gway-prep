"use client"

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ThreeDButton from "./3dbutton"
import { useRouter } from "next/navigation"

export function Footer() {

  const route = useRouter();

  return (
    <>
      {/* Footer */}
      <footer className="bg-black/80 pt-20 lg:pt-32 pb-20 overflow-visible">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">


          <div className="rounded-[50px] px-6 md:px-12 pt-8 pb-12 relative text-white">

            {/* ================= TOP IMAGE STRIP with Orange Border - Positioned Upward ================= */}
            {/* <div className="w-full mb-12 -mt-16 md:-mt-20">
              <div className="relative h-[120px] md:h-[180px] rounded-[50px] border-[10px] border-l-30 border-r-30 border-[#f46c44] overflow-hidden bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=300&fit=crop"
                  alt="European Landmarks"
                  className="w-full h-full object-cover grayscale"
                  style={{ objectPosition: "center center" }}
                />
              </div>
            </div> */}

            <div className="flex flex-col lg:flex-row">

              {/* BRAND */}
              <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-10 lg:mb-0 flex items-start justify-center flex-col ">
                <Image
                  src="/home/logo.png"
                  alt="GAway Global"
                  width={150}
                  height={50}
                  className="mb-4"
                  onClick={() => route.push('/')}
                />
                <h3 className="text-xl font-bold  mb-3">GA Way Global</h3>
                <p className=" text-sm leading-relaxed mb-6">
                  Your trusted partner for global education, university admissions, and international study planning.
                </p>

                <button>
                  Get in Touch
                </button>
              </div>

              {/* CONTENT AREA WITH DIVIDERS */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:flex lg:flex-row items-center">
                
                {/* STUDY DESTINATIONS */}
                <div className="flex-1 px-0 sm:px-4 lg:px-6 relative mb-8 sm:mb-0 h-[12rem]">
                  
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white rounded-full"></div>

                  <div className="h-full flex flex-col">
                    <h4 className=" font-bold text-lg mb-4">
                      Quick Links
                    </h4>
                    <ul className="space-y-2  text-sm flex-1">
                      <li className=" cursor-pointer" onClick={() => route.push('/')}>Home</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/about')}>About Us</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/services')}>Services</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/career')}>Career</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/contact')}>Contect Us</li>
                    </ul>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="flex-1 px-0 sm:px-4 lg:px-6 relative mb-8 sm:mb-0 h-[12rem]">
                  
                  {/* Right divider - only on lg screens */}
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white rounded-full"></div>
                  <div className="h-full flex flex-col">
                    <h4 className=" font-bold text-lg mb-4">
                      Our Services
                    </h4>
                    <ul className="space-y-2  text-sm flex-1">
                      <li className=" cursor-pointer" onClick={() => route.push('/ielts')}>IELTS Preparation</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/gmat')}>GMAT Preparation</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/pte')}>PTE Preparation</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/gre')}>GRE Preparation</li>
                    </ul>
                  </div>
                  
                </div>

                {/* RESOURCES */}
                <div className="flex-1 px-0 sm:px-4 lg:px-6 relative mb-8 sm:mb-0 h-[12rem]">
                  
                  {/* Right divider - only on lg screens */}
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white rounded-full"></div>

                  <div className="h-full flex flex-col">
                    <h4 className=" font-bold text-lg mb-4">
                      Resources
                    </h4>
                    <ul className="space-y-2  text-sm flex-1">
                      <li className=" cursor-pointer" onClick={() => route.push('/blog')}>Blogs</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/blog')}>Case Studies</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/blog')}>Student Testimonials</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/blog')}>FAQs</li>
                      <li className=" cursor-pointer" onClick={() => route.push('/blog')}>Events & Webinars</li>
                    </ul>
                  </div>
                  
                </div>

                {/* CONNECT */}
                <div className="relative flex-1 px-0 sm:px-4 lg:px-6 h-[12rem]">
                  
                  {/* Right divider - only on lg screens */}
                  <div className="hidden lg:block absolute left-0 top-0 w-[3px] h-full bg-white rounded-full"></div>

                  <div className="h-full flex flex-col">
                    <h4 className=" font-bold text-lg mb-4">
                      Connect
                    </h4>
                    <ul className="space-y-2  text-sm flex-1">
                      <li className="flex gap-2 cursor-pointer" onClick={() => route.push('https://www.instagram.com/ooshasprep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==')}><Instagram />Instagram</li>
                      <li className="flex gap-2 cursor-pointer" onClick={() => route.push('https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr')}><Facebook />Facebook</li>
                      <li className="flex gap-2 cursor-pointer" onClick={() => route.push('#')}><Linkedin />LinkedIn</li>
                      <li className="flex gap-2 cursor-pointer" onClick={() => route.push('https://youtube.com/@ooshasprep?si=VB6cGU0WyuEGKlPi')}><Youtube />YouTube</li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>

            

          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p>© 2026 GAway Global. All rights reserved.</p>

            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <a href="#" className="hover:">Privacy Policy</a>
              <a href="#" className="hover:">Terms of Service</a>
              <a href="#" className="hover:">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}