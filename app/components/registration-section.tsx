"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const images = [
  "https://t3.ftcdn.net/jpg/06/23/84/22/360_F_623842281_ECGgEpMEkQdH83gbmexIn5l3ACl7V3M0.jpg",
  "https://img.freepik.com/premium-photo/young-handsome-man-pointing-camera-choosing-you-university-student-concept_1194-262936.jpg",
  "https://as2.ftcdn.net/jpg/05/29/12/57/1000_F_529125762_omW1yTehDLLFJKwLJjRET0G3sXiQnK5g.jpg",
]

const formdata = [
  {
    type: 'text',
    placeholder: 'First Name' 
  },
  {
    type: 'text',
    placeholder: 'Last Name' 
  },
  {
    type: 'email',
    placeholder: 'Email Id'
  },
  {
    type: 'tel',
    placeholder: 'Mobile Number'
  },
  {
    type: 'option',
    placeholder:'Preferred Destination',
    options: ['USA', 'UK', 'Canada', 'Australia', 'Germany']
  },

  {
    type: 'text',
    placeholder: 'Course' 
  },
  {
    type: 'month',
    placeholder:'When do you plan to study'
  },

  {
    type: 'year',
    placeholder:'Your Preferred Year'
  }
]

export function RegistrationSection({data}:{data : any}) {

  const [index, setIndex] = useState(0)

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
    
    <div>
        <img src={data.fields.img ?? "/home/1.png"} alt="img"  />
    </div>

    <div className=" w-full">
      <div className=" rounded-2xl sm:rounded-3xl text-black lg:rounded-[32px] p-6 sm:p-7 lg:p-8  
      ">
        <h3 className=" font-bold  text-xl sm:text-2xl mb-10 uppercase">
          Let Our Team Reach Out To You
        </h3>

        <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         
          {formdata.map((ele, index) => (
             <div key={index} className="col-span-1">
              <label htmlFor={ele.placeholder} className="text-gray-600 my-2 px-1">{ele.placeholder}</label>
              {ele.type === 'option' ? (
                <select className="w-full border-gray-300 border-2 rounded-lg px-3 py-2 ">
                  <option value="" disabled hidden>{ele.placeholder}</option>
                  {ele?.options?.map((option, idx) => (<option key={idx} value={option}>{option}</option>))}
                </select>
              ):
              (
                <input type={ele.type} placeholder={ele.placeholder} className="w-full border-gray-300 rounded-lg px-3 py-2 border-2" /> 
              )
              }
              </div>
          ))}
        
          <button
            type="submit"
            className="w-full bg-[#F36C45] text-white mt-4 font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl tracking-widest 
            hover:opacity-90 transition text-sm sm:text-base"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
