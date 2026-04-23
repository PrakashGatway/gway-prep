

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
          { name: "paragraph", label: "Hero paragraph", type: "textarea", required: false, placeholder: "" },
          {
            name: "students",
            label: "students",
            type: "repeater",
            fields: [
              { name: "student", label: "Student", type: "text", placeholder : "Enter the name" },
              { name: "course", label: "Course", type: "text", placeholder : "Enter the Course name" },
              { name: "score", label: "Score", type: "text", placeholder : "Enter the name" },
              { name: "studentImg", label: "Student Image", type: "file", placeholder : "Enter the name" },
              { name: "experience", label: "Experience", type: "text", placeholder : "Enter the lable name || value" },
              { name: "Happystudent", label: "Happy student", type: "text", placeholder : "Enter the lable name || value" },
              { name: "Rating", label: "Rating", type: "text", placeholder : "Enter the lable name || value" },
              { name: "Lectured", label: "Lectured", type: "text", placeholder : "Enter the lable name || value" }

            ]
          }
          
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
          { name: "title", label: "Courses title", type: "editor", required: true },
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
        name: "Home-f&q",
        label: "Home page F&Q",
        fields: [
          { name: "title", label: "Home Page F&Q Title", type: "editor", required: true },
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
      },
       {
        name: "Home-f&q",
        label: "Home page F&Q",
        fields: [
          { name: "title", label: "Home Page F&Q Title", type: "editor", required: true },
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
  },
    
  preparation: {
    name: "Preparation",
    require: true,
    description: "All preparation category pages (IELTS, GMAT, PTE, GRE, etc.)",
    is_dynamic: true,           // <-- slug-based dynamic pages
    slug_field: "slug",         // <-- used to generate /preparation/[slug]
    sections: [
      {
        name: "hero-section",
        label: "Hero",
        fields: [
          { name: "slug", label: "Page Slug", type: "text", required: true, placeholder: "ielts-preparation" },
          { name: "category_name", label: "Category Name", type: "text", required: true, placeholder: "IELTS Preparation" },
          { name: "nav_subtitle", label: "Nav Dropdown Subtitle", type: "text", required: true, placeholder: "Comprehensive IELTS coaching" },
          { name: "title", label: "Hero Title", type: "editor", required: false, placeholder: "Welcome to Our Platform" },
          { name: "paragraph", label: "Hero Paragraph", type: "textarea", required: false, placeholder: "" },
          { name: "heroImage", label: "Hero Image", type: "file", accept: "image/*" },
          { name: "ctaButtonText", label: "CTA Button Text", type: "text", placeholder: "Full courses starts at $99" }
        ]
      },
      {
        name: "Registrations",
        label: "Registration",
        fields: [
          { name: "Formsection", label: "Form Image", type: "file", accept: "image/*" }
        ]
      },
      {
        name: "comparison-section",
        label: "Comparison",
        fields: [
          { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
          { name: "sectionSubtitle", label: "Section Subtitle", type: "text", required: false },
          {
            name: "ourFeatures",
            label: "Our Features (checkmark list)",
            type: "repeater",
            fields: [
              { name: "feature", label: "Feature", type: "text", placeholder: "The only course with official questions" }
            ]
          },
          { name: "competitorLabel", label: "Competitor Column Label", type: "text", placeholder: "other \"Premium\" Courses" },
          {
            name: "competitorDrawbacks",
            label: "Competitor Drawbacks (X list)",
            type: "repeater",
            fields: [
              { name: "drawback", label: "Drawback", type: "text", placeholder: "No access to real questions" }
            ]
          }
        ]
      },
      {
        name: "ai-study-section",
        label: "AI Study Section",
        fields: [
          { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
          { name: "sectionSubtitle", label: "Section Subtitle", type: "textarea", required: false },
          {
            name: "aiFeatures",
            label: "AI Feature Cards",
            type: "repeater",
            fields: [
              { name: "heading", label: "Heading", type: "text", placeholder: "5,000+ Similar Practice Questions" },
              { name: "content", label: "Content", type: "textarea" },
              { name: "image", label: "Feature Image", type: "file", accept: "image/*" }
            ]
          }
        ]
      },
      {
        name: "test-dates-section",
        label: "Test Dates",
        fields: [
          { name: "toggleButtonText", label: "Toggle Button Text", type: "text", placeholder: "Choose the best schedule for your test date!" },
          {
            name: "testDates",
            label: "Test Dates",
            type: "repeater",
            fields: [
              { name: "start_date", label: "Start Date", type: "text", placeholder: "Saturday, March 14, 2026" },
              { name: "end_date", label: "End Date", type: "text", placeholder: "Friday, March 27, 2026 or TBD" }
            ]
          }
        ]
      },
      {
        name: "score-guarantee-section",
        label: "Score Guarantee",
        fields: [
          { name: "title", label: "Section Title", type: "editor", required: false },
          { name: "subtitle", label: "Section Subtitle", type: "text", required: false },
          { name: "bgImage", label: "Background Image", type: "file", accept: "image/*" },
          {
            name: "features",
            label: "Feature Cards",
            type: "repeater",
            max: 6,
            fields: [
              { name: "title", label: "Title", type: "text", placeholder: "Practice Tests" },
              { name: "description", label: "Description", type: "textarea" }
            ]
          }
        ]
      },
      {
        name: "pricing-section",
        label: "Pricing Plans",
        fields: [
          { name: "testimonial", label: "Testimonial Quote", type: "textarea", required: false },
          {
            name: "pricing_plans",
            label: "Pricing Plans",
            type: "repeater",
            max: 3,
            fields: [
              { name: "plan_name", label: "Plan Name", type: "text", placeholder: "Premium · 1 month" },
              { name: "subtitle", label: "Plan Subtitle", type: "text" },
              { name: "is_highlighted", label: "Highlighted (featured)", type: "toggle" },
              { name: "bundle_offer", label: "Bundle Offer Badge", type: "text", placeholder: "Bundle and save $854 ($1073 value)" },
              {
                name: "content_features",
                label: "Content Features",
                type: "repeater",
                fields: [
                  { name: "feature", label: "Feature", type: "text" }
                ]
              },
              {
                name: "access_features",
                label: "Access Features",
                type: "repeater",
                fields: [
                  { name: "feature", label: "Feature", type: "text" }
                ]
              },
              { name: "price", label: "Price", type: "text", placeholder: "$99 USD" }
            ]
          }
        ]
      },
      {
        name: "mobile-apps-section",
        label: "Mobile Apps",
        fields: [
          { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
          { name: "sectionSubtitle", label: "Section Subtitle", type: "textarea", required: false },
          { name: "appStoreIcon", label: "App Store Icon", type: "file", accept: "image/*" },
          { name: "playStoreIcon", label: "Play Store Icon", type: "file", accept: "image/*" },
          {
            name: "apps",
            label: "App Cards",
            type: "repeater",
            max: 2,
            fields: [
              { name: "title", label: "App Name", type: "text" },
              { name: "description", label: "App Description", type: "text" },
              { name: "screenshot", label: "App Screenshot", type: "file", accept: "image/*" }
            ]
          },
          { name: "videoSectionLabel", label: "Video Label (small tag)", type: "text" },
          { name: "videoBoxTitle", label: "Video Box Title", type: "editor", required: false },
          { name: "videoBoxDescription", label: "Video Box Description", type: "textarea", required: false }
        ]
      },
      {
        name: "testimonials-section",
        label: "Testimonials",
        fields: [
          { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
          { name: "sectionSubtitle", label: "Section Subtitle", type: "text", required: false },
          {
            name: "featuredTestimonial",
            label: "Featured Testimonial",
            type: "group",
            fields: [
              { name: "quote", label: "Quote", type: "textarea" },
              { name: "name", label: "Student Name", type: "text" },
              { name: "meta", label: "Meta (year/cohort)", type: "text", placeholder: "Student - 2021" },
              { name: "thumbnail", label: "Video Thumbnail", type: "file", accept: "image/*" },
              { name: "ratingImage", label: "Rating Image", type: "file", accept: "image/*" }
            ]
          },
          {
            name: "testimonials",
            label: "Testimonial Cards",
            type: "repeater",
            fields: [
              { name: "quote", label: "Quote", type: "textarea" },
              { name: "name", label: "Student Name", type: "text" },
              { name: "meta", label: "Meta (year/cohort)", type: "text" },
              { name: "ratingImage", label: "Rating Image", type: "file", accept: "image/*" }
            ]
          }
        ]
      },
      {
        name: "f&q",
        label: "FAQ",
        fields: [
          { name: "title", label: "FAQ Title", type: "editor", required: true },
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

};
