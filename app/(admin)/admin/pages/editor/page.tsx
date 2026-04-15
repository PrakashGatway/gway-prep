import { Edit } from 'lucide-react'
import React from 'react'

// const sections = [
//   {
//     name : "hero",
    
//         "label": "Hero Section",
//         "fields": [
//           {
//             "name": "title",
//             "label": "Hero Title",
//             "type": "text",
//             "required": false,
//             "placeholder": "Welcome to Our Platform"
//           },
//           {
//             "name": "subtitle",
//             "label": "Hero Subtitle",
//             "type": "textarea",
//             "required": false,
//             "placeholder": "Your journey to success starts here"
//           },
//           {
//             "name": "paragraph",
//             "label": "Hero paragraph",
//             "type": "textarea",
//             "required": false,
//             "placeholder": ""
//           },
          
//           // {
//           //   "name": "heroImage",
//           //   "label": "Hero Image",
//           //   "type": "file",
//           //   "accept": "image/*"
//           // },
//         ]
      
//   },
//   {
//     name : "Registations",
//         "label": "Registation Section",
//         "fields": [
//           {
//             "name": "Formsection",
//             "label": "form Image",
//             "type": "file",
//             "accept": "image/*"
//           }
//         ]
//   },
//   {
//     name : "Student",
//         "label": "student Section",
//         "fields": [
//           {
//             "name": "title",
//             "label": "student Title",
//             "type": "text",
//             "required": true,
//             "placeholder": "Welcome to Our Platform"
//           },
//           {
//             "name": "subtitle",
//             "label": "student Subtitle",
//             "type": "textarea",
//             "required": true,
//             "placeholder": "Your journey to success starts here"
//           },
//           {
//             "name": "course",
//             "label": "student course",
//             "type": "text",
//             "required": false,
//             "placeholder": ""
//           },
//           {
//             "name": "score",
//             "label": "student score",
//             "type": "text",
//             "required": false,
//             "placeholder": ""
//           },
//           {
//             "name": "Image",
//             "label": "student Image",
//             "type": "file",
//             "accept": "image/*"
//           },
//           {
//             "name": "University",
//             "label": "University name",
//             "type": "text",
//             "required": false,
//             "placeholder": "Your journey starts here"
//           },
//           {
//             "name": "University logo",
//             "label": "University logo",
//             "type": "file",
//             "accept": "image/*"
//           },
//           {
//             "name": "About",
//             "label": "student about",
//             "type": "editor",
//             "required": false,
//             "placeholder": ""
//           },
//           {
//             "name": "Outcome",
//             "label": "student Outcome",
//             "type": "editor",
//             "required": false,
//             "placeholder": ""
//           },
//         ]
//   },
//   {
//     name : "Services",
//     "label" : "Services Section",
//     "fields": [
        
//           {
//             "name": "title",
//             "label": "Service title",
//             "type": "text",
//             "required": false,
//             "placeholder": ""
//           },
//           {
//             "type":"repiter",
//             "pointer":[
              
//             ]
//           }

//     ]
//   },
//   {
//     name : "Courses",
//   },
//   {
//     name : "Working Process",
//   },
//   {
//     name : "Home baner",
//   },
//   {
//     name : "Mission",
//   },
//   {
//     name : "Video Testimonial",
//   },
//   {
//     name : "Text Testimonial",
//   },
//   {
//     name : "f&q",
//   },
// ]

const page = () => {
  return (
    <div className='p-4 flex flex-col gap-4 overflow-y-auto h-[90vh]'>
      {/* {sections.map((ele,idx) =>(
        <div key={idx} className='rounded-lg px-4 py-6 flex items-center justify-between bg-gray-200 '>
          {ele.name}
          <Edit />
        </div>
      ))} */}
    </div>
  )
}

export default page