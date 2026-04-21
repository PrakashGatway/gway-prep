

export const pageData: any = {
  home: {
    name: "Home",
    require: true,
    description: "main page",
    sections: [
      {
        name: "Home-hero-section",
        label: "Hero",
        fields: [
          { name: "title", label: "Hero Title", type: "text", required: false, placeholder: "Welcome to Our Platform" },
          { name: "subtitle", label: "Hero Subtitle", type: "text", required: false, placeholder: "Your journey to success starts here" },
          { name: "paragraph", label: "Hero paragraph", type: "textarea", required: false, placeholder: "" }
        ]
      },
      {
        name: "Registations",
        label: "Registation",
        fields: [
          { name: "Formsection", label: "form Image", type: "file", accept: "image/*" }
        ]
      },
      {
        name: "Home-Student",
        label: "Student",
        fields: [
          {
            name: "students",
            label: "students",
            type: "repeater",
            fields: [
              { name: "student", label: "student", type: "select", option: [] }
            ]
          },
        ]
      },
      {
        name: "Home-Services",
        label: "Services",
        fields: [
          { name: "title", label: "Service title", type: "editor", required: false, placeholder: "" },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "icon", label: "Icon", type: "file" }
            ]
          }
        ]
      },
      {
        name: "Home-Courses",
        label: "Courses",
        fields: [
          { name: "title", label: "Courses title", type: "text", required: true },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "subtitle", label: "Sub Title", type: "text" }
            ]
          }
        ]
      },
      {
        name: "Home-Working-Process",
        label: "Working Process",
        fields: [
          { name: "title", label: "Working Process title", type: "editor", required: true },
          { name: "subtitle", label: "Working Process Subtitle", type: "text", required: false, placeholder: "Your journey to success starts here" },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "subtitle", label: "SubTitle", type: "text" },
              { name: "icon", label: "Icon", type: "file" }
            ]
          }
        ]
      },
      {
        name: "Home-Tech-platform",
        label: "Tech Platform",
        fields: [
          { name: "title", label: "Tech Platform Title", type: "editor", required: true },
          { name: "image", label: "Tech Platform Image", type: "file", required: false },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "subtitle", label: "SubTitle", type: "text" },
              { name: "icon", label: "Icon", type: "file" }
            ]
          }
        ]
      },
      {
        name: "Home-page-mission",
        label: "Home Page Mission",
        fields: [
          { name: "mission title", label: "Mission Title", type: "editor", required: true },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            max: 5,
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "image", label: "Images", type: "file" }
            ]
          }
        ]
      },
      {
        name: "Home-Video-Testimonial",
        label: "Video Testimonial",
        fields: [
          { name: "video-testimonial-title", label: "Video Testimoinal Title", type: "editor", required: true },
          // {
          //   name: "items",
          //   label: "Items",
          //   type: "repeater",
          //   fields: [
          //     { name: "title", label: "Title", type: "text" },
          //     { name: "youtubeurl", label: "Youtube Url", type: "text" }
          //   ]
          // }
        ]
      },
      {
        name: "Home-Text-Testimonial",
        label: "Text Testimonial",
        fields: [
          { name: "title", label: "Text Testimonial Title", type: "editor", required: true },
          // {
          //   name: "items",
          //   label: "Items",
          //   type: "repeater",
          //   fields: [
          //     { name: "Name", label: "Name", type: "text" },
          //     { name: "Points", label: "Points", type: "text" },
          //     { name: "Stars", label: "Stars", type: "number" },
          //     { name: "content", label: "Content", type: "textarea" }
          //   ]
          // }
        ]
      },
      {
        name: "Home-f&q",
        label: "Home page F&Q",
        fields: [
          { name: "homef&q-title", label: "Home Page F&Q Title", type: "editor", required: true },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "question", label: "Question", type: "text" },
              { name: "answer", label: "Answer", type: "textarea" }
            ]
          }
        ]
      }
    ]
  },
  blog: {
    name: "Blog",
    require: true,
    description: "blogs & articals page",
    sections: [
      {
        name: "Home-hero-section",
        label: "Hero",
        fields: [
          { name: "title", label: "Hero Title", type: "text", required: false, placeholder: "Welcome to Our Platform" },
          { name: "subtitle", label: "Hero Subtitle", type: "text", required: false, placeholder: "Your journey to success starts here" },
          { name: "paragraph", label: "Hero paragraph", type: "textarea", required: false, placeholder: "" }
        ]
      },
      {
        name: "Registations",
        label: "Registation",
        fields: [
          { name: "Formsection", label: "form Image", type: "file", accept: "image/*" }
        ]
      }
    ]
  },
  student: {
    name :"Student",
    description: "Add student by this page ",
    require: false,
    sections : [
      {
        name: "Student-section",
        label: "Student-section",
        require: false,
        fields: [
          { name: "name", label: "student Name", type: "text", required: true, placeholder: "Enter name hare" },
          { name: "course", label: "student course", type: "text", required: false, placeholder: "" },
          { name: "score", label: "student score", type: "number", required: false, placeholder: "" },
          { name: "image", label: "student Image", type: "file", accept: "image/*" },
          { name: "university", label: "University name", type: "text", required: false, placeholder: "Your journey starts here" },
          { name: "universityLogo", label: "University logo", type: "file", accept: "image/*" },
          { name: "about", label: "student about", type: "editor", required: false, placeholder: "" },
          { name: "outcome", label: "student Outcome", type: "editor", required: false, placeholder: "" },
          { name: "type", label : "Testimonial Type" , type: "select" , required:true, option: ['image', 'video']},
          { name: "message", label: "student Message", type: "text", required: false, placeholder: "" },
          { name: "messageDate", label: "Message Date", type: "text", required: false, placeholder: "" },
          { name: "rating", label: "rating by student", type: "text", required: false, placeholder: "" },
          { name: "video", label: "Video Url", type: "text", required: false, placeholder: "Add the youtube url" }
        ]
      }
    ]
  }
};
