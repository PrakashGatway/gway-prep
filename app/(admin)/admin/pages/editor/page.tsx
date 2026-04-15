import { label } from "framer-motion/client";
import { Edit } from "lucide-react";
import React from "react";

const sections = [
  {
    name: "hero",

    label: "Hero Section",
    fields: [
      {
        name: "title",
        label: "Hero Title",
        type: "text",
        required: false,
        placeholder: "Welcome to Our Platform",
      },
      {
        name: "subtitle",
        label: "Hero Subtitle",
        type: "text",
        required: false,
        placeholder: "Your journey to success starts here",
      },
      {
        name: "paragraph",
        label: "Hero paragraph",
        type: "textarea",
        required: false,
        placeholder: "",
      },
    ],
  },
  {
    name: "Registations",
    label: "Registation Section",
    fields: [
      {
        name: "Formsection",
        label: "form Image",
        type: "file",
        accept: "image/*",
      },
    ],
  },
  {
    name: "Student",
    label: "student Section",
    fields: [
      {
        name: "title",
        label: "student Title",
        type: "text",
        required: true,
        placeholder: "Welcome to Our Platform",
      },
      {
        name: "subtitle",
        label: "student Subtitle",
        type: "textarea",
        required: true,
        placeholder: "Your journey to success starts here",
      },
      {
        name: "course",
        label: "student course",
        type: "text",
        required: false,
        placeholder: "",
      },
      {
        name: "score",
        label: "student score",
        type: "text",
        required: false,
        placeholder: "",
      },
      {
        name: "Image",
        label: "student Image",
        type: "file",
        accept: "image/*",
      },
      {
        name: "University",
        label: "University name",
        type: "text",
        required: false,
        placeholder: "Your journey starts here",
      },
      {
        name: "University logo",
        label: "University logo",
        type: "file",
        accept: "image/*",
      },
      {
        name: "About",
        label: "student about",
        type: "editor",
        required: false,
        placeholder: "",
      },
      {
        name: "Outcome",
        label: "student Outcome",
        type: "editor",
        required: false,
        placeholder: "",
      },
    ],
  },
  {
    name: "Services",
    label: "Services Section",
    fields: [
      {
        name: "title",
        label: "Service title",
        type: "text",
        required: false,
        placeholder: "",
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "title", "label": "Title", "type": "text" },
              { "name": "icon", "label": "Icon", "type": "file" }
            ]
      },
    ],
  },
  {
    name: "Courses",
    label : "Courses Section",
    fields: [
      {
        name: "title",
        label: "Courses title",
        type: "text",
        required : true
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "title", "label": "Title", "type": "text" },
              { "name": "subtitle", "label": "Sub Title", "type": "text" }
            ]
      }
    ]
  },
  {
    name: "Working-Process",
    label: "Working Process",
    fields: [
      {
        name : "title",
        label : "Working Process title",
        type : "text",
        required: true
      },
      {
        name: "subtitle",
        label: "Working Process Subtitle",
        type: "text",
        required: false,
        placeholder: "Your journey to success starts here",
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "title", "label": "Title", "type": "text" },
              { "name": "subtitle", "label": "SubTitle", "type": "text" },
              { "name": "icon", "label": "Icon", "type": "file" }
            ]
      }
    ]
  },
  {
    name: "Tech-platform",
    label: "Tech Platform",
    fields: [
      {
        name : "title",
        label : "Tech Platform Title",
        type : "text",
        required: true
      },
      {
        name: "image",
        label: "Tech Platform Image",
        type: "file",
        required: false
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "title", "label": "Title", "type": "text" },
              { "name": "subtitle", "label": "SubTitle", "type": "text" },
              { "name": "icon", "label": "Icon", "type": "file" }
            ]
      }
    ]
  },
  {
    name: "home page mission",
    label : "Home Page Mission",
    fields : [
      {
        name: "mission title",
        label: "Mission Title",
        type: "text",
        required: true
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "max":5,
            "fields": [
              { "name": "title", "label": "Title", "type": "text" },
              { "name": "image", "label": "Images", "type": "file" }
            ]
      }
    ]
  },
  {
    name: "Video-Testimonial",
    label: "Video Testimonial",
    fields: [
      {
        name : "video-testimonial-title",
        label : "Video Testimoinal Title",
        type : "text",
        required: true
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "title", "label": "Title", "type": "text" },
              { "name": "youtubeurl", "label": "Youtube Url", "type": "text" }
            ]
      }
    ]
  
  },
  {
    name: "Text-Testimonial",
    label: "Text Testimonial",
    fields: [
      {
        name : "title",
        label : "Text Testimonial Title",
        type : "text",
        required: true
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "Name", "label": "Name", "type": "text" },
              { "name": "Points", "label": "Points", "type": "text" },
              { "name": "Stars", "label": "Stars", "type": "number" },
              { "name": "content", "label": "Content", "type": "textarea" }
            ]
      }
    ]
  
  },
  {
    name: "f&q",
    label : "Home page F&Q",
    fields: [
      {
        name : "homef&q-title",
        label : "Home Page F&Q Title",
        type : "text",
        required: true
      },
      {
        name:"items",
        lable:"Items",
            "type": "repeater",
            "fields": [
              { "name": "question", "label": "Question", "type": "text" },
              { "name": "answer", "label": "Answer", "type": "textarea" },
            ]
      }
    ]
  },
];

const Pages = [
  "Home Page",
  "Test Prap GER Page",
  "Blog Page",
]

const page = () => {
  return (
    <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[90vh]">
      {Pages.map((ele, idx) => (
        <div
          key={idx}
          className="rounded-lg px-4 py-6 flex items-center justify-between bg-gray-200 "
        >
          {ele}
          <Edit />
        </div>
      ))}
    </div>
  );
};

export default page;
