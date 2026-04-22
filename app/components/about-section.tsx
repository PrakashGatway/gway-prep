"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ThreeDButton from "./3dbutton"

export function AboutSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto">
        
       
        <img         
          src="/image/about.jpeg"
          alt="About Us" 
          className="w-full h-auto "
        />


      </div>
    </section>
  )
}