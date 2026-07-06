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
          {
            name: "title",
            label: "Hero Title",
            type: "editor",
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
          {
            name: "experience",
            label: "Experience",
            type: "text",
            placeholder: "Enter the lable name || value",
          },
          {
            name: "Happystudent",
            label: "Happy student",
            type: "text",
            placeholder: "Enter the lable name || value",
          },
          {
            name: "Rating",
            label: "Rating",
            type: "text",
            placeholder: "Enter the lable name || value",
          },
          {
            name: "Lectured",
            label: "Lectured",
            type: "text",
            placeholder: "Enter the lable name || value",
          },
        ],
      },
      {
        name: "Registations",
        label: "Registation",
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
        name: "Home-Banner",
        label: "Banner section",
        fields: [
          {
            name: "title",
            label: "Banner title",
            type: "text",
            required: false,
            placeholder: "Enter the title",
          },
          {
            name: "subtitle",
            label: "Banner Subtitle",
            type: "text",
            required: false,
            placeholder: "",
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [{ name: "image", label: "Image", type: "file" }],
          },
        ],
      },
      {
        name: "Home-Standard",
        label: "Standard section",
        fields: [
          {
            name: "title",
            label: "Standard title",
            type: "text",
            required: false,
            placeholder:
              "along with the content for the split using (||). For example : Four Ways to Learn || One Standard of Excellence.",
          },
          {
            name: "subtitle",
            label: "Standard Subtitle",
            type: "text",
            required: false,
            placeholder: "",
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "content", label: "content", type: "text" },
              { name: "heading", label: "heading", type: "text" },
            ],
          },
        ],
      },
      {
        name: "Home-Courses",
        label: "Courses",
        fields: [
          {
            name: "title",
            label: "Courses title",
            type: "text",
            required: true,
          },
          {
            name: "title",
            label: "Courses title",
            type: "text",
            required: true,
            placeholder:
              "along with the content for the split using (||). For example : Four Ways to Learn || One Standard of Excellence.",
          },
          {
            name: "subtitle",
            label: "Courses subtitle",
            type: "text",
            required: true,
          },
        ],
      },
      {
        name: "Home-Working-Process",
        label: "Working Process",
        fields: [
          {
            name: "title",
            label: "Working Process title",
            type: "editor",
            required: true,
          },
          {
            name: "subtitle",
            label: "Working Process Subtitle",
            type: "text",
            required: false,
            placeholder: "Your journey to success starts here",
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "subtitle", label: "SubTitle", type: "text" },
              { name: "icon", label: "Icon", type: "file" },
            ],
          },
        ],
      },
      {
        name: "Home-Tech-platform",
        label: "Tech Platform",
        fields: [
          {
            name: "title",
            label: "Tech Platform Title",
            type: "editor",
            required: true,
          },
          {
            name: "image",
            label: "Tech Platform Image",
            type: "file",
            required: false,
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "subtitle", label: "SubTitle", type: "text" },
              { name: "icon", label: "Icon", type: "file" },
            ],
          },
        ],
      },
      {
        name: "Home-page-mission",
        label: "Home Page Mission",
        fields: [
          {
            name: "mission title",
            label: "Mission Title",
            type: "editor",
            required: true,
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            max: 5,
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "image", label: "Images", type: "file" },
            ],
          },
        ],
      },
      {
        name: "Home-f&q",
        label: "Home page F&Q",
        fields: [
          {
            name: "title",
            label: "Home Page F&Q Title",
            type: "editor",
            required: true,
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              { name: "question", label: "Question", type: "text" },
              { name: "answer", label: "Answer", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },

  blogdetails: {
    name: "Blog",
    description: "Create and manage blog posts",
    require: false,
    sections: [
      {
        name: "basic-info",
        label: "Basic Information",
        require: true,
        fields: [
          {
            name: "title",
            label: "Blog Title",
            type: "text",
            required: true,
            placeholder: "Enter blog title",
          },
          {
            name: "slug",
            label: "Slug",
            type: "text",
            required: false,
            placeholder: "auto-generated from title",
          },
          {
            name: "category",
            label: "Category",
            type: "text",
            required: true,
            placeholder: "e.g. React, Tech",
          },
          {
            name: "tags",
            label: "Tags",
            type: "text",
            required: false,
            placeholder: "comma separated (react, frontend)",
          },
          {
            name: "author",
            label: "Author Name",
            type: "text",
            required: false,
            placeholder: "Admin",
          },
          {
            name: "image",
            label: "Featured Image",
            type: "file",
            accept: "image/*",
          },
        ],
      },
      {
        name: "content-section",
        label: "Content",
        require: true,
        fields: [
          {
            name: "excerpt",
            label: "Short Description",
            type: "textarea",
            required: false,
            placeholder: "Short summary of blog",
          },
          {
            name: "content",
            label: "Blog Content",
            type: "editor",
            required: true,
            placeholder: "Write full blog content...",
          },
        ],
      },
      {
        name: "seo-section",
        label: "SEO Settings",
        require: false,
        fields: [
          {
            name: "metaTitle",
            label: "Meta Title",
            type: "text",
            required: false,
            placeholder: "SEO title",
          },
          {
            name: "metaDescription",
            label: "Meta Description",
            type: "textarea",
            required: false,
            placeholder: "SEO description",
          },
        ],
      },
      {
        name: "publish-section",
        label: "Publish Settings",
        require: false,
        fields: [
          {
            name: "isPublished",
            label: "Publish Status",
            type: "select",
            required: true,
            option: ["true", "false"],
          },
          {
            name: "publishedDate",
            label: "Publish Date",
            type: "date",
            required: false,
          },
        ],
      },
    ],
  },

  blog: {
    name: "Blog",
    require: true,
    description: "blogs & articals page",
    sections: [
      {
        name: "hero-section",
        label: "Hero section",
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
            name: "heroImage",
            label: "Hero Image",
            type: "file",
            accept: "image/*",
          },
        ],
      },
      {
        name: "Resent-section",
        label: "Resent-section",
        fields: [{ name: "title", label: "Title", type: "editor" }],
      },
      {
        name: "AppInfo",
        label: "AppInfo",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          {
            name: "details",
            label: "Details",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "subtitle", label: "Subtitle", type: "text" },
            ],
          },
        ],
      },
    ],
  },

  preparation: {
    name: "Preparation",
    require: true,
    description: "All preparation category pages (IELTS, GMAT, PTE, GRE, etc.)",
    is_dynamic: true,
    slug_field: "slug",
    sections: [
      {
        name: "hero-section",
        label: "Hero",
        fields: [
          {
            name: "slug",
            label: "Page Slug",
            type: "text",
            required: true,
            placeholder: "gre",
            value: "gre",
          },
          {
            name: "category_name",
            label: "Category Name",
            type: "text",
            required: true,
            placeholder: "GRE Preparation",
            value: "GRE Preparation",
          },
          {
            name: "title",
            label: "Hero Title",
            type: "editor",
            required: false,
            placeholder: "Welcome to Our Platform",
            value: "The smartest way to master the GRE®",
          },
          {
            name: "paragraph",
            label: "Hero Paragraph",
            type: "textarea",
            required: false,
            placeholder: "",
            value:
              'The original self-paced GRE course. Get Official GRE questions, an AI tutor, video lessons, and top-rated mobile apps at a third of the price of other "premium" options.',
          },
          {
            name: "buttontext",
            label: "Hero button text",
            type: "text",
            required: false,
            placeholder: "",
            value: "Full Courses starts at $99",
          },
          {
            name: "heroImage",
            label: "Hero Image",
            type: "file",
            accept: "image/*",
          },
          {
            name: "ctaButtonText",
            label: "CTA Button Text",
            type: "text",
            placeholder: "Full courses starts at $99",
            value: "Full Courses starts at $99",
          },
        ],
      },

      {
        name: "cta-banner-section",
        label: "CTA Banner",
        fields: [
          {
            name: "title",
            label: "Banner Title",
            type: "text",
            value: "Achieve your target GRE score with expert guidance",
          },
          {
            name: "buttonText",
            label: "Button Text",
            type: "text",
            value: "Get Started Today",
          },
        ],
      },
      {
        name: "what-is-gre-section",
        label: "What is GRE",
        fields: [
          {
            name: "sectionTitle",
            label: "Section Title",
            type: "editor",
            value: "What is GRE?",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            value:
              "The GRE, your gateway to prestigious universities and diverse programs, assesses your verbal, quantitative, and analytical writing skills – crucial for graduate study worldwide.",
          }
        ],
      },
      {
        name: "exam-Format-section",
        label: "GRE Exam Format",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "editor",
            value: "GRE Exam Format 2026 - New Format at a Glance",
          },
          
          {
            name: "patternTable",
            label: "Pattern Table Data",
            type: "repeater",
            fields: [
              { name: "title", label: "title", type: "text" },
              { name: "description", label: "description", type: "text" },
            ]
            
          },
        ],
      },
      {
        name: "exam-pattern-section",
        label: "GRE Exam Pattern",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "editor",
            value: "GRE Exam Pattern 2026 - New Format at a Glance",
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "textarea",
            value:
              "The GRE General Test was overhauled in September 2023 and this format continues through 2026. It is now the shortest, most focused version in the test's history — under 2 hours, fully section-adaptive, with every answer counting.",
          },
          {
            name: "patternTable",
            label: "Pattern Table Data",
            type: "repeater",
            fields: [
              { name: "section", label: "Section", type: "text" },
              { name: "questions", label: "Questions", type: "text" },
              { name: "time", label: "Time", type: "text" },
              { name: "scoreRange", label: "Score Range", type: "text" },
              { name: "format", label: "Format", type: "text" },
            ],
            value: [
              {
                section: "Analytical Writing (AWA)",
                questions: "1 essay task",
                time: "30 min",
                scoreRange: "0 - 6",
                format: "Fixed · Always first",
              },
              {
                section: "Verbal Reasoning",
                questions: "27 total",
                time: "41 min",
                scoreRange: "130 - 170",
                format: "Section-adaptive",
              },
              {
                section: "Quantitative Reasoning",
                questions: "27 total",
                time: "47 min",
                scoreRange: "130 - 170",
                format: "Section-adaptive",
              },
              {
                section: "Total",
                questions: "54 questions + 1 AWA task",
                time: "1 hr 58 min",
                scoreRange: "260–340 + AWA",
                format: "No breaks · No negative marking",
              },
            ],
          },
        ],
      },
      {
        name: "official-questions-section",
        label: "Official GRE Questions",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "editor",
            value: "Official GRE Questions — only with Ooshas",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            value:
              "We're the only GRE prep course licensed to use official ETS practice questions, so you know you're studying exactly what you'll see on test day.",
          },
          {
            name: "buttonText",
            label: "Button Text",
            type: "text",
            value: "Preview Dashboard",
          },
        ],
      },
      {
        name: "ai-study-section",
        label: "AI Study Section",
        fields: [
          {
            name: "sectionTitle",
            label: "Section Title",
            type: "editor",
            required: false,
            value: "Study smarter with AI",
          },
          {
            name: "sectionSubtitle",
            label: "Section Subtitle",
            type: "textarea",
            required: false,
            value:
              "Artificial Intelligence (AI) is transforming GRE coaching and study abroad test prep. By using AI‑powered tools, adaptive learning platforms, and smart analytics, students can prepare more efficiently and achieve better scores.",
          },
          {
            name: "aiFeatures",
            label: "AI Feature Cards",
            type: "repeater",
            fields: [
              {
                name: "heading",
                label: "Heading",
                type: "text",
                placeholder: "AI Feature Title",
              },
              {
                name: "content",
                label: "Content",
                type: "textarea",
              },
              {
                name: "image",
                label: "Feature Image",
                type: "file",
                accept: "image/*",
              },
            ],
            value: [
              {
                heading: "AI‑Based GRE Performance Analysis",
                content:
                  "Smart dashboards track progress, highlight weak areas, and recommend personalized study plans.",
              },
              {
                heading: "AI‑Generated GRE Practice Questions",
                content:
                  "Adaptive algorithms create exam‑level questions for verbal, quant, and analytical writing.",
              },
              {
                heading: "AI Tutor for GRE Preparation",
                content:
                  "Virtual tutor provides instant explanations, doubt‑clearing, and 24/7 guidance.",
              },
              {
                heading: "AI‑Powered GRE Tools",
                content:
                  "Vocabulary builders, essay evaluators, and quant problem solvers enhance learning.",
              },
              {
                heading: "AI Mock Test Evaluation",
                content:
                  "Automated scoring aligned with ETS standards for accurate feedback.",
              },
            ],
          },
          
        ],
      },
      {
        name: "boost-profile-section",
        label: "Boost Profile CTA",
        fields: [
          {
            name: "tagline",
            label: "Tagline",
            type: "text",
            value: "Test Prep & Profile Building",
          },
          {
            name: "title",
            label: "Title",
            type: "editor",
            value: "Boost Your Study Abroad Profile!",
          },
          {
            name: "buttonText",
            label: "Button Text",
            type: "text",
            value: "Enroll Now",
          },
        ],
      },
      {
        name: "score-guarantee-section",
        label: "Score Guarantee",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "editor",
            required: false,
            value: "Improve Your GRE® Score, Guaranteed!",
          },
          {
            name: "subtitle",
            label: "Section Subtitle",
            type: "text",
            required: false,
            value:
              "How We Prepare You: Our Stress-Free Method for Cracking the Shorter GRE",
          },
          {
            name: "features",
            label: "Feature Cards",
            type: "repeater",
            max: 6,
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
                placeholder: "Feature Title",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ],
            value: [
              {
                title: "Try a Free Test",
                description:
                  "Take a short practice exam to see your current score.",
              },
              {
                title: "Find the Gaps",
                description:
                  "Check your results to see which topics need the most work.",
              },
              {
                title: "Learn the Basics",
                description:
                  "Learn the core math formulas and important vocabulary words.",
              },
              {
                title: "Use Time Shortcuts",
                description:
                  "Master quick tricks to solve hard questions much faster.",
              },
              {
                title: "Practice Full Mocks",
                description:
                  "Take full-length computer tests to build your exam stamina.",
              },
              {
                title: "Clear Your Doubts",
                description:
                  "Fix your last remaining mistakes with your mentor and ace the exam.",
              },
            ],
          }
        ],
      },
      {
        name: "pricing-section",
        label: "Pricing Plans",
        fields: [
          {
            name: "testimonial",
            label: "Testimonial Quote",
            type: "editor",
            required: false,
          },
          {
            name: "pricing_plans",
            label: "Pricing Plans",
            type: "repeater",
            max: 3,
            fields: [
              {
                name: "plan_name",
                label: "Plan Name",
                type: "text",
                placeholder: "Plan Name",
              },
              {
                name: "subtitle",
                label: "Plan Subtitle",
                type: "text",
              },
              {
                name: "badge",
                label: "Badge",
                type: "text",
              },
              {
                name: "is_highlighted",
                label: "Highlighted (featured)",
                type: "select",
                option: ["true", "false"],
              },
              {
                name: "bundle_offer",
                label: "Bundle Offer Badge",
                type: "text",
                placeholder: "Bundle and save $854 ($1073 value)",
              },
              {
                name: "content_features",
                label: "Content Features",
                type: "repeater",
                fields: [
                  {
                    name: "feature",
                    label: "Feature",
                    type: "text",
                  },
                ],
              },
              {
                name: "access_features",
                label: "Access Features",
                type: "repeater",
                fields: [
                  {
                    name: "feature",
                    label: "Feature",
                    type: "text",
                  },
                ],
              },
              {
                name: "price",
                label: "Price",
                type: "text",
                placeholder: "$99 USD",
              }
            ]
          },
        ],
      },
     
      {
        name: "student-dashboard",
        label: "Student Dashbaord Info",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
            value: "Purchased by 500,000+ GRE students",
          },
          {
            name: "Subtitle",
            label: "Subtitle",
            type: "text",
            value: "Purchased by 500,000+ GRE students",
          },
          {
            
            name: "Points",
            label: "Dashboard Points",
            type: "repeater",
            max: 5,
            fields: [
              {
                name: "Points",
                label: "Points ",
                type: "text",
                placeholder: "",
              },
            ]
          }
        ],
      },
      
      {
        name: "student-video",
        label: "Student video Info",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
            value: "for split the taxt use this (||) for ex. : text1 || text2",
          },
          {
            name: "Subtitle",
            label: "Subtitle",
            type: "text",
            value: "Purchased by 500,000+ GRE students",
          },
          {
            name: "button-text",
            label: "Button Text",
            type: "text",
            value: "watch solution",
          },
          
          {
            name: "video-url",
            label: "Video Url",
            type: "text",
            value: "Enter the you",
          },
        ],
      },
      {
        name: "testimonials-section",
        label: "Testimonials",
        fields: [
          {
            name: "sectionTitle",
            label: "Section Title",
            type: "editor",
            required: false,
          },
          {
            name: "sectionSubtitle",
            label: "Section Subtitle",
            type: "text",
            required: false,
          },
          {
            name: "testimonials",
            label: "Testimonial Cards",
            type: "repeater",
            fields: [
              {
                name: "studentName",
                label: "Student Name",
                type: "text",
              },
              {
                name: "mathScore",
                label: "Math Score",
                type: "text",
              },
              {
                name: "verbalScore",
                label: "Verbal Score",
                type: "text",
              },
              {
                name: "quote",
                label: "Quote",
                type: "textarea",
              },
              {
                name: "ratingImage",
                label: "Rating Image",
                type: "file",
                accept: "image/*",
              },
            ],
            value: [
              {
                studentName: "Khushal",
                mathScore: "80",
                verbalScore: "169",
                quote:
                  "My journey with Gateway Abroad Jaipur went beyond my expectations. The mock tests provided by my trainers gave an accurate simulation of the real exam...",
              },
              {
                studentName: "Mayank",
                mathScore: "80",
                verbalScore: "169",
                quote:
                  "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers...",
              },
              {
                studentName: "Sandeep",
                mathScore: "85",
                verbalScore: "169",
                quote:
                  "The personalized attention and the quality of study material are unmatched. Highly recommend for anyone looking to clear PTE on the first go.",
              },
            ],
          },
        ],
      },
      {
        name: "free-resources-section",
        label: "Free Resources",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "editor",
            value: "Free GRE Prep Resources",
          },
          {
            name: "resources",
            label: "Resource Cards",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "buttonText", label: "Button Text", type: "text" },
            ],
            value: [
              {
                title: "Practice Material",
                description:
                  "Take the GRE practice material and begin your GRE preparation now.",
                buttonText: "Take GRE Practice Material",
              },
              {
                title: "Other Resources",
                description:
                  "Begin your GRE coaching with resources prepared by our experts to help you with your GRE prep.",
                buttonText: "Download GRE Other Resources",
              },
              {
                title: "Syllabus Download",
                description:
                  "Download the GRE syllabus now and get a head start on your GRE preparation.",
                buttonText: "Download GRE Syllabus",
              },
            ],
          },
        ],
      },
      {
        name: "f&q",
        label: "FAQ",
        fields: [
          {
            name: "title",
            label: "FAQ Title",
            type: "editor",
            required: true,
            value: "Frequently Asked Questions",
          },
          {
            name: "items",
            label: "Items",
            type: "repeater",
            fields: [
              {
                name: "question",
                label: "Question",
                type: "text",
              },
              {
                name: "answer",
                label: "Answer",
                type: "textarea",
              },
            ],
            value: [
              {
                question:
                  "Which is the best GRE coaching in India for offline classroom preparation?",
                answer: "",
              },
              {
                question:
                  "How can I access a realistic free GRE practice test?",
                answer: "",
              },
              {
                question:
                  "Does your GRE mock test series use a section-adaptive algorithm?",
                answer: "",
              },
              {
                question:
                  "Where can I find the updated GRE syllabus 2026 and exam structure?",
                answer: "",
              },
              {
                question:
                  "How do your online GRE classes help non-native English speakers with vocabulary?",
                answer: "",
              },
              {
                question:
                  "What is the current GRE exam fee in India for registration?",
                answer: "",
              },
              {
                question:
                  "Why should I choose your test series over general GRE preparation online tools?",
                answer: "",
              },
            ],
          },
        ],
      },
      {
        name: "final-cta-section",
        label: "Final CTA",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "editor",
            value: "Ready to Achieve Your Dreams?",
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "text",
            value:
              "Join thousands of successful students and start your journey today.",
          },
          {
            name: "buttonText",
            label: "Button Text",
            type: "text",
            value: "Enroll Now",
          },
        ],
      },
    ],
  },

  // preparation: {
  //   name: "Preparation",
  //   require: true,
  //   description: "All preparation category pages (IELTS, GMAT, PTE, GRE, etc.)",
  //   is_dynamic: true,           // <-- slug-based dynamic pages
  //   slug_field: "slug",         // <-- used to generate /preparation/[slug]
  //   sections: [
  //     {
  //       name: "hero-section",
  //       label: "Hero",
  //       fields: [
  //         { name: "slug", label: "Page Slug", type: "text", required: true, placeholder: "ielts-preparation" },
  //         { name: "category_name", label: "Category Name", type: "text", required: true, placeholder: "IELTS Preparation" },
  //         { name: "title", label: "Hero Title", type: "editor", required: false, placeholder: "Welcome to Our Platform" },
  //         { name: "paragraph", label: "Hero Paragraph", type: "textarea", required: false, placeholder: "" },
  //         { name: "buttontext", label: "Hero button text", type: "text", required: false, placeholder: "" },
  //         { name: "heroImage", label: "Hero Image", type: "file", accept: "image/*" },
  //         { name: "ctaButtonText", label: "CTA Button Text", type: "text", placeholder: "Full courses starts at $99" }
  //       ]
  //     },
  //     {
  //       name: "Registrations",
  //       label: "Registration",
  //       fields: [
  //         { name: "Formsection", label: "Form Image", type: "file", accept: "image/*" }
  //       ]
  //     },
  //     {
  //       name: "comparison-section",
  //       label: "Comparison",
  //       fields: [
  //         { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
  //         { name: "sectionSubtitle", label: "Section Subtitle", type: "text", required: false },
  //         {
  //           name: "ourFeatures",
  //           label: "Our Features (checkmark list)",
  //           type: "repeater",
  //           fields: [
  //             { name: "feature", label: "Feature", type: "text", placeholder: "The only course with official questions" }
  //           ]
  //         },
  //         { name: "competitorLabel", label: "Competitor Column Label", type: "text", placeholder: "other \"Premium\" Courses" },
  //         {
  //           name: "competitorDrawbacks",
  //           label: "Competitor Drawbacks (X list)",
  //           type: "repeater",
  //           fields: [
  //             { name: "drawback", label: "Drawback", type: "text", placeholder: "No access to real questions" }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "ai-study-section",
  //       label: "AI Study Section",
  //       fields: [
  //         { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
  //         { name: "sectionSubtitle", label: "Section Subtitle", type: "textarea", required: false },
  //         {
  //           name: "aiFeatures",
  //           label: "AI Feature Cards",
  //           type: "repeater",
  //           fields: [
  //             { name: "heading", label: "Heading", type: "text", placeholder: "5,000+ Similar Practice Questions" },
  //             { name: "content", label: "Content", type: "textarea" },
  //             { name: "image", label: "Feature Image", type: "file", accept: "image/*" }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "test-dates-section",
  //       label: "Test Dates",
  //       fields: [
  //         { name: "toggleButtonText", label: "Toggle Button Text", type: "text", placeholder: "Choose the best schedule for your test date!" },
  //         {
  //           name: "testDates",
  //           label: "Test Dates",
  //           type: "repeater",
  //           fields: [
  //             { name: "start_date", label: "Start Date", type: "text", placeholder: "Saturday, March 14, 2026" },
  //             { name: "end_date", label: "End Date", type: "text", placeholder: "Friday, March 27, 2026 or TBD" }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "score-guarantee-section",
  //       label: "Score Guarantee",
  //       fields: [
  //         { name: "title", label: "Section Title", type: "editor", required: false },
  //         { name: "subtitle", label: "Section Subtitle", type: "text", required: false },
  //         // { name: "bgImage", label: "Background Image", type: "file", accept: "image/*" },
  //         {
  //           name: "features",
  //           label: "Feature Cards",
  //           type: "repeater",
  //           max: 6,
  //           fields: [
  //             { name: "title", label: "Title", type: "text", placeholder: "Practice Tests" },
  //             { name: "description", label: "Description", type: "textarea" }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "pricing-section",
  //       label: "Pricing Plans",
  //       fields: [
  //         { name: "testimonial", label: "Testimonial Quote", type: "editor", required: false },
  //         {
  //           name: "pricing_plans",
  //           label: "Pricing Plans",
  //           type: "repeater",
  //           max: 3,
  //           fields: [
  //             { name: "plan_name", label: "Plan Name", type: "text", placeholder: "Premium · 1 month" },
  //             { name: "subtitle", label: "Plan Subtitle", type: "text" },
  //             { name: "is_highlighted", label: "Highlighted (featured)", type: "select", option: ['true', 'false']},
  //             { name: "bundle_offer", label: "Bundle Offer Badge", type: "text", placeholder: "Bundle and save $854 ($1073 value)" },
  //             {
  //               name: "content_features",
  //               label: "Content Features",
  //               type: "repeater",
  //               fields: [
  //                 { name: "feature", label: "Feature", type: "text" }
  //               ]
  //             },
  //             {
  //               name: "access_features",
  //               label: "Access Features",
  //               type: "repeater",
  //               fields: [
  //                 { name: "feature", label: "Feature", type: "text" }
  //               ]
  //             },
  //             { name: "price", label: "Price", type: "text", placeholder: "$99 USD" }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "mobile-apps-section",
  //       label: "Mobile Apps",
  //       fields: [
  //         { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
  //         { name: "sectionSubtitle", label: "Section Subtitle", type: "textarea", required: false },
  //         {
  //           name: "apps",
  //           label: "App Cards",
  //           type: "repeater",
  //           max: 2,
  //           fields: [
  //             { name: "title", label: "App Name", type: "text" },
  //             { name: "description", label: "App Description", type: "text" },
  //             { name: "screenshot", label: "App Screenshot", type: "file", accept: "image/*" }
  //           ]
  //         },
  //         { name: "videoSectionLabel", label: "Video Label (small tag)", type: "text" },
  //         { name: "videoBoxTitle", label: "Video Box Title", type: "editor", required: false },
  //         { name: "videoBoxDescription", label: "Video Box Description", type: "textarea", required: false }
  //       ]
  //     },
  //     {
  //       name: "testimonials-section",
  //       label: "Testimonials",
  //       fields: [
  //         { name: "sectionTitle", label: "Section Title", type: "editor", required: false },
  //         { name: "sectionSubtitle", label: "Section Subtitle", type: "text", required: false },
  //         {
  //           name: "featuredTestimonial",
  //           label: "Featured Testimonial",
  //           type: "group",
  //           fields: [
  //             { name: "quote", label: "Quote", type: "textarea" },
  //             { name: "name", label: "Student Name", type: "text" },
  //             { name: "meta", label: "Meta (year/cohort)", type: "text", placeholder: "Student - 2021" },
  //             { name: "thumbnail", label: "Video Thumbnail", type: "text", },
  //             { name: "ratingImage", label: "Rating Image", type: "file", accept: "image/*" }
  //           ]
  //         },
  //         {
  //           name: "testimonials",
  //           label: "Testimonial Cards",
  //           type: "repeater",
  //           fields: [
  //             { name: "quote", label: "Quote", type: "textarea" },
  //             { name: "name", label: "Student Name", type: "text" },
  //             { name: "meta", label: "Meta (year/cohort)", type: "text" },
  //             { name: "ratingImage", label: "Rating Image", type: "file", accept: "image/*" }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "f&q",
  //       label: "FAQ",
  //       fields: [
  //         { name: "title", label: "FAQ Title", type: "editor", required: true },
  //         {
  //           name: "items",
  //           label: "Items",
  //           type: "repeater",
  //           fields: [
  //             { name: "question", label: "Question", type: "text" },
  //             { name: "answer", label: "Answer", type: "textarea" }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },

  student: {
    name: "Student",
    description: "Add student by this page ",
    require: false,
    sections: [
      {
        name: "Student-section",
        label: "Student-section",
        require: false,
        fields: [
          {
            name: "name",
            label: "student Name",
            type: "text",
            required: true,
            placeholder: "Enter name hare",
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
            type: "number",
            required: false,
            placeholder: "",
          },
          {
            name: "image",
            label: "student Image",
            type: "file",
            accept: "image/*",
          },
          {
            name: "university",
            label: "University name",
            type: "text",
            required: false,
            placeholder: "Your journey starts here",
          },
          {
            name: "universityLogo",
            label: "University logo",
            type: "file",
            accept: "image/*",
          },
          {
            name: "about",
            label: "student about",
            type: "editor",
            required: false,
            placeholder: "",
          },
          {
            name: "outcome",
            label: "student Outcome",
            type: "editor",
            required: false,
            placeholder: "",
          },
          {
            name: "type",
            label: "Testimonial Type",
            type: "select",
            required: true,
            option: ["image", "video"],
          },
          {
            name: "message",
            label: "student Message",
            type: "text",
            required: false,
            placeholder: "",
          },
          {
            name: "messageDate",
            label: "Message Date",
            type: "text",
            required: false,
            placeholder: "",
          },
          {
            name: "rating",
            label: "rating by student",
            type: "text",
            required: false,
            placeholder: "",
          },
          {
            name: "video",
            label: "Video Url",
            type: "text",
            required: false,
            placeholder: "Add the youtube url",
          },
        ],
      },
    ],
  },

  contectus: {
    name: "ContectUs",
    require: true,
    description: "Contectus page",
    sections: [
      {
        name: "hero-section",
        label: "Hero",
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
        ],
      },
      {
        name: "Contectus-Details",
        label: "Contectus Details",
        fields: [
          { name: "title", label: "Title", type: "editor" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          {
            name: "contect-details",
            label: "Contect Details",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              {
                name: "icon",
                label: "Icon",
                type: "text",
                placeholder: "Add the lucide icon name like Mail",
              },
              { name: "value", label: "Value", type: "text" },
            ],
          },
        ],
      },
    ],
  },

  setting: {
    name: "Setting",
    require: true,
    description: "Setting page",
    sections: [
      {
        name: "hero-section",
        label: "Hero",
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
        ],
      },
      {
        name: "Setting-Details",
        label: "Setting Details",
        fields: [{ name: "allContent", label: "allContent", type: "editor" }],
      },
    ],
  },
};
