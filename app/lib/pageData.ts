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
            name: "heading",
            label: "Courses heading",
            type: "text",
            required: true,
            placeholder: "Trusted by 50,000+ Students Globally",
          },
          {
            name: "title",
            label: "Courses title",
            type: "text",
            required: true,
            // placeholder:
            //   "along with the content for the split using (||). For example : Four Ways to Learn || One Standard of Excellence.",
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
            type: "textarea",
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
            type: "textarea",
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
            type: "textarea",
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
            type: "text",
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
            label: "Main Image",
            type: "file",
            accept: "image/*",
          },
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
      {
        name: "blog_details",
        label: "Blog Details",
        type: "repeater",
        max: 3,
        fields: [
          {
            name: "content_heading",
            label: "Content Heading",
            type: "text",
          },
          {
            name: "content_data",
            label: "Content Data",
            type: "editor",
          },
          {
            name: "faq",
            label: "FAQ",
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
          },

          {
            name: "Image",
            label: "Banner Image",
            type: "file",
            accept: "image/*",
          },

          {
            name: "Banner",
            label: "Banner",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "subtitle",
                label: "Subtitle",
                type: "editor",
              },
              {
                name: "url",
                label: "Url",
                type: "text",
              },
              {
                name: "buttontext",
                label: "Button Text",
                type: "text",
              },
            ],
          },

          {
            name: "question",
            label: "Question Title",
            type: "text",
            required: true,
            placeholder: "Enter Question",
          },
          {
            name: "options",
            label: "Options",
            type: "repeater",
            fields: [
              {
                name: "value",
                label: "Value",
                type: "text",
              },
              {
                name: "label",
                label: "Label",
                type: "text",
              },
              {
                name: "type",
                label: "Input Type",
                type: "select",
                required: true,
                option: ["text", "radio"],
              },
            ],
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
        fields: [{ name: "title", label: "Title", type: "textarea" }],
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
            name: "colorCode",
            label: "Color code",
            type: "text",
            required: false,
            placeholder: "Enter the color code. ex : #fer673",
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
            type: "editor",
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

  contactus: {
    name: "ContactUs",
    require: true,
    description: "ContactUs page",
    sections: [
      {
        name: "hero-section",
        label: "Hero Section",
        fields: [
          {
            name: "title",
            label: "Hero Title",
            type: "text",
            required: false,
            placeholder: "We're Here to Help.",
            defaultValue: "We're Here to Help.",
          },
          {
            name: "subtitle",
            label: "Hero Subtitle",
            type: "text",
            required: false,
            placeholder: "Let's Connect!",
            defaultValue: "Let's Connect!",
          },
          {
            name: "description",
            label: "Hero Description",
            type: "textarea",
            required: false,
            placeholder: "Have questions about studying abroad...",
            defaultValue:
              "Have questions about studying abroad, exams, applications or anything else? Our team is ready to assist you at every step of your journey.",
          },
          {
            name: "heroImage",
            label: "Hero Image",
            type: "file",
            required: false,
            defaultValue: "/contactshero.webp",
          },
          {
            name: "contactCards",
            label: "Contact Information Cards",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              {
                name: "icon",
                label: "Icon Name",
                type: "text",
                placeholder: "Phone, Mail, Clock, MessageCircle",
              },
              { name: "value", label: "Value", type: "text" },
              { name: "subtext", label: "Subtext", type: "text" },
            ],
            defaultValue: [
              {
                title: "Call Us",
                icon: "Phone",
                value: "+91 9166146538",
                subtext: "Call Us",
              },
              {
                title: "Email Us",
                icon: "Mail",
                value: "info@ooshasprep.com",
                subtext: "Email Us",
              },
              {
                title: "Working Hours",
                icon: "Clock",
                value: "Mon - Sat 9:00 AM - 6:00 PM",
                subtext: "Working Hours",
              },
              {
                title: "Chat on WhatsApp",
                icon: "MessageCircle",
                value: "+91 9166146538",
                subtext: "Chat on Whatsapp",
              },
            ],
          },
        ],
      },
      {
        name: "connect-section",
        label: "Connect With Us",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
            required: false,
            defaultValue: "Connect With Us",
          },
          {
            name: "highlightText",
            label: "Highlight Text",
            type: "text",
            required: false,
            defaultValue: "With Us",
          },
          {
            name: "socialItems",
            label: "Social Connection Items",
            type: "repeater",
            fields: [
              { name: "name", label: "Name", type: "text" },
              {
                name: "icon",
                label: "Icon Name",
                type: "text",
                placeholder: "MessageCircle, Instagram, Facebook, Youtube",
              },
              { name: "description", label: "Description", type: "text" },
              { name: "buttonText", label: "Button Text", type: "text" },
              { name: "link", label: "Link URL", type: "text" },
              {
                name: "contact",
                label: "Contact Number",
                type: "text",
                placeholder: "+91 9166146538",
              },
              {
                name: "color",
                label: "Brand Color",
                type: "text",
                placeholder: "#25D366",
              },
            ],
            defaultValue: [
              {
                name: "WhatsApp",
                icon: "MessageCircle",
                description: "Chat with our experts",
                buttonText: "Chat Now",
                link: "https://wa.me/919166146538",
                contact: "+91 9166146538",
                color: "#25D366",
              },
              {
                name: "Instagram",
                icon: "Instagram",
                description: "Follow us for updates",
                buttonText: "Follow Us",
                link: "https://www.instagram.com/ooshasprep",
                contact: "",
                color: "#E4405F",
              },
              {
                name: "Facebook",
                icon: "Facebook",
                description: "Like our page",
                buttonText: "Like Page",
                link: "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
                contact: "",
                color: "#1877F2",
              },
              {
                name: "YouTube",
                icon: "Youtube",
                description: "Watch tips & guidance",
                buttonText: "Subscribe",
                link: "https://youtube.com/@ooshasprep",
                contact: "",
                color: "#FF0000",
              },
            ],
          },
        ],
      },
      // {
      //   name: "message-section",
      //   label: "Send Us a Message",
      //   fields: [
      //     {
      //       name: "title",
      //       label: "Form Title",
      //       type: "text",
      //       required: false,
      //       defaultValue: "Send Us a Message"
      //     },
      //     {
      //       name: "formConfig",
      //       label: "Form Configuration",
      //       type: "object",
      //       fields: [
      //         {
      //           name: "steps",
      //           label: "Form Steps",
      //           type: "repeater",
      //           fields: [
      //             { name: "step", label: "Step Number", type: "number" },
      //             { name: "title", label: "Step Title", type: "text" },
      //             { name: "icon", label: "Icon Name", type: "text" },
      //             { name: "fields", label: "Field Names", type: "text" },
      //             { name: "button", label: "Button Type", type: "text" }
      //           ]
      //         },
      //         {
      //           name: "fields",
      //           label: "Form Fields",
      //           type: "repeater",
      //           fields: [
      //             { name: "name", label: "Field Name", type: "text" },
      //             { name: "label", label: "Label", type: "text" },
      //             { name: "type", label: "Field Type", type: "text", placeholder: "text, email, tel, select, textarea" },
      //             { name: "required", label: "Required", type: "boolean" },
      //             { name: "placeholder", label: "Placeholder", type: "text" },
      //             { name: "step", label: "Step Number", type: "number" },
      //             { name: "grid", label: "Grid Size", type: "text", placeholder: "half, full" },
      //             { name: "icon", label: "Icon Name", type: "text" },
      //             { name: "options", label: "Options (for select)", type: "repeater", fields: [
      //               { name: "value", label: "Value", type: "text" },
      //               { name: "label", label: "Label", type: "text" }
      //             ] },
      //             { name: "rows", label: "Rows (for textarea)", type: "number" }
      //           ]
      //         },
      //         {
      //           name: "submit",
      //           label: "Submit Configuration",
      //           type: "object",
      //           fields: [
      //             { name: "label", label: "Button Label", type: "text" },
      //             { name: "icon", label: "Icon Name", type: "text" },
      //             { name: "variant", label: "Variant", type: "text" },
      //             { name: "size", label: "Size", type: "text" },
      //             { name: "position", label: "Position", type: "text" },
      //             {
      //               name: "onSuccess",
      //               label: "Success Configuration",
      //               type: "object",
      //               fields: [
      //                 { name: "message", label: "Success Message", type: "text" },
      //                 { name: "redirect", label: "Redirect URL", type: "text" }
      //               ]
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // },
      {
        name: "offices-section",
        label: "Our Offices",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
            required: false,
            defaultValue: "Our Offices",
          },
          {
            name: "officeItems",
            label: "Office Locations",
            type: "repeater",
            fields: [
              { name: "city", label: "City", type: "text" },
              { name: "address", label: "Address", type: "textarea" },
              { name: "pin", label: "PIN Code", type: "text" },
              { name: "phone", label: "Phone Number", type: "text" },
              { name: "image", label: "Office Image URL", type: "file" },
              {
                name: "isHeadOffice",
                label: "Is Head Office",
                type: "boolean",
              },
            ],
            defaultValue: [
              {
                city: "Jaipur (Head Office)",
                address: "SCO 103-104, 2nd Floor, Sector 34A, Chandigarh",
                pin: "160022",
                phone: "+91 9166146538",
                image:
                  "https://placehold.co/400x200/e2e8f0/475569?text=Jaipur+Office",
                isHeadOffice: true,
              },
              {
                city: "Delhi",
                address: "SCO 8-9, 2nd Floor, Sector 17-G, Chandigarh",
                pin: "160017",
                phone: "+91 9166146538",
                image:
                  "https://placehold.co/400x200/e2e8f0/475569?text=Delhi+Office",
                isHeadOffice: false,
              },
              {
                city: "Kolkata",
                address: "BMC Chowk, Near Bus Stand, Jalandhar, Punjab",
                pin: "144001",
                phone: "+91 9166146538",
                image:
                  "https://placehold.co/400x200/e2e8f0/475569?text=Kolkata+Office",
                isHeadOffice: false,
              },
              {
                city: "Bangalore",
                address:
                  "SCO 12, 1st Floor, Ranjit Avenue, near Golden Temple, Amritsar",
                pin: "143001",
                phone: "+91 9166146538",
                image:
                  "https://placehold.co/400x200/e2e8f0/475569?text=Bangalore+Office",
                isHeadOffice: false,
              },
            ],
          },
        ],
      },
      {
        name: "map-section",
        label: "Map & Location",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
            required: false,
            defaultValue: "Find Us Across",
          },
          {
            name: "highlightText",
            label: "Highlight Text",
            type: "text",
            required: false,
            defaultValue: "India",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
            defaultValue:
              "Visit our nearest office for personalized counseling and expert guidance on your study abroad journey.",
          },
          {
            name: "buttonText",
            label: "Button Text",
            type: "text",
            required: false,
            defaultValue: "Get Directions",
          },
          {
            name: "mapEmbedUrl",
            label: "Google Maps Embed URL",
            type: "text",
            required: false,
            defaultValue:
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13027.046312498469!2d75.76255926571812!3d26.907153148223077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40d51d0b52b%3A0x839fb9b5210e18c1!2sCivil%20Lines%2C%20Jaipur%2C%20Rajasthan!5e1!3m2!1sen!2sin!4v1784363697294!5m2!1sen!2sin",
          },
        ],
      },
      {
        name: "cta-section",
        label: "Call to Action",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
            required: false,
            defaultValue: "Your Dream University",
          },
          {
            name: "highlightText",
            label: "Highlight Text",
            type: "text",
            required: false,
            defaultValue: "is Just a Conversation Away.",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
            defaultValue:
              "Reach out to our experts today and take the first step towards your global education journey.",
          },
          {
            name: "primaryButton",
            label: "Primary Button Text",
            type: "text",
            required: false,
            defaultValue: "Talk to an Expert",
          },
          {
            name: "secondaryButton",
            label: "Secondary Button Text",
            type: "text",
            required: false,
            defaultValue: "Book Free Counselling",
          },
          {
            name: "image",
            label: "CTA Image",
            type: "file",
            required: false,
            defaultValue: "/contact.webp",
          },
          {
            name: "bgColor",
            label: "Background Color",
            type: "text",
            required: false,
            defaultValue: "#FEF9F4",
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
        fields: [{ name: "allContent", label: "allContent", type: "textarea" }],
      },
    ],
  },

  services: {
    name: "Services",
    require: true,
    description: "Services Page",
    sections: [
      {
        name: "Services-Hero",
        label: "Hero Section",
        fields: [
          {
            name: "title",
            label: "Hero Title",
            type: "text",
            required: true,
          },
          {
            name: "subtitle",
            label: "Hero Subtitle",
            type: "textarea",
          },
        ],
      },

      {
        name: "Services-Exam-Pills",
        label: "Exam Pills",
        fields: [
          {
            name: "items",
            label: "Exam List",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Exam Name",
                type: "text",
              },
              {
                name: "image",
                label: "Exam Icon",
                type: "file",
              },
            ],
          },
        ],
      },

      {
        name: "Services-Practice",
        label: "Practice Cards",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Section Subtitle",
            type: "textarea",
          },
          {
            name: "button",
            label: "Button Text",
            type: "text",
          },
          {
            name: "items",
            label: "Cards",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "icon",
                label: "Icon",
                type: "file",
              },
            ],
          },
        ],
      },

      {
        name: "Services-Portal",
        label: "Exam Portal",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "editor",
          },
          {
            name: "image",
            label: "Portal Image",
            type: "file",
          },
          {
            name: "button",
            label: "Button Text",
            type: "text",
          },
        ],
      },

      {
        name: "Services-Dashboard",
        label: "Dashboard Images",
        fields: [
          {
            name: "leftImage",
            label: "Left Dashboard",
            type: "file",
          },
          {
            name: "rightImage",
            label: "Right Dashboard",
            type: "file",
          },
        ],
      },

      {
        name: "Services-AI",
        label: "AI Stack",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
          },

          {
            name: "button",
            label: "Button",
            type: "text",
          },
          {
            name: "items",
            label: "AI Features",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "icon",
                label: "Icon",
                type: "file",
              },
              {
                name: "background",
                label: "Background Color",
                type: "color",
              },
            ],
          },
        ],
      },

      {
        name: "Services-Environment",
        label: "Learning Environment",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "textarea",
          },
          {
            name: "button",
            label: "Button Text",
            type: "text",
          },
          {
            name: "items",
            label: "Environment Cards",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "image",
                label: "Image",
                type: "file",
              },
            ],
          },
        ],
      },

      {
        name: "Services-Resources",
        label: "Resources",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
          },
          {
            name: "button",
            label: "Button",
            type: "text",
          },
          {
            name: "items",
            label: "Resources",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "metric",
                label: "Metric",
                type: "text",
              },
              {
                name: "icon",
                label: "Icon",
                type: "file",
              },
            ],
          },
        ],
      },

      {
        name: "Services-Support",
        label: "Support Section",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
          },
          {
            name: "items",
            label: "Support Cards",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "url",
                label: "url",
                type: "text",
              },
              {
                name: "button",
                label: "Button",
                type: "text",
              },
              {
                name: "icon",
                label: "Icon",
                type: "file",
              },
              {
                name: "primary",
                label: "Primary Button",
                type: "checkbox",
              },
            ],
          },
        ],
      },

      // {
      //   name: "Services-Testimonials",
      //   label: "Testimonials",
      //   fields: [
      //     {
      //       name: "title",
      //       label: "Heading",
      //       type: "text",
      //     },
      //     {
      //       name: "subtitle",
      //       label: "Description",
      //       type: "textarea",
      //     },
      //     {
      //       name: "items",
      //       label: "Testimonials",
      //       type: "repeater",
      //       fields: [
      //         {
      //           name: "image",
      //           label: "Student Image",
      //           type: "file",
      //         },
      //         {
      //           name: "name",
      //           label: "Student Name",
      //           type: "text",
      //         },
      //         {
      //           name: "country",
      //           label: "Country",
      //           type: "text",
      //         },
      //         {
      //           name: "rating",
      //           label: "Rating",
      //           type: "number",
      //         },
      //         {
      //           name: "review",
      //           label: "Review",
      //           type: "textarea",
      //         },
      //         {
      //           name: "score",
      //           label: "Score",
      //           type: "text",
      //         },
      //         {
      //           name: "university",
      //           label: "University",
      //           type: "text",
      //         },
      //         {
      //           name: "improvement",
      //           label: "Improvement",
      //           type: "text",
      //         },
      //       ],
      //     },
      //   ],
      // },

      {
        name: "Services-Countries",
        label: "Study Destinations",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
          },
          {
            name: "items",
            label: "Countries",
            type: "repeater",
            fields: [
              {
                name: "name",
                label: "Country Name",
                type: "text",
              },
              {
                name: "image",
                label: "Country Icon",
                type: "file",
              },
              {
                name: "background",
                label: "Background Color",
                type: "color",
              },
            ],
          },
        ],
      },

      {
        name: "Services-CTA",
        label: "Call To Action",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
          },
          {
            name: "topText",
            label: "Top Banner Text",
            type: "text",
          },
          {
            name: "topButton",
            label: "Top Button",
            type: "text",
          },
          {
            name: "primaryButton",
            label: "Primary Button",
            type: "text",
          },
          {
            name: "secondaryButton",
            label: "Secondary Button",
            type: "text",
          },
        ],
      },
    ],
  },

  about: {
    name: "About",
    require: true,
    description: "About Page",
    sections: [
      {
        name: "About-Hero",
        label: "Hero Section",
        fields: [
          {
            name: "title",
            label: "Hero Title",
            type: "text",
            required: true,
          },
          {
            name: "subtitle",
            label: "Hero Subtitle",
            type: "text",
          },
          {
            name: "primaryButton",
            label: "Primary Button",
            type: "text",
          },
          {
            name: "secondaryButton",
            label: "Secondary Button",
            type: "text",
          },
        ],
      },

      {
        name: "About-Who-We-Are",
        label: "Who We Are",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "text",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "imageOne",
            label: "Top Image",
            type: "file",
          },
          {
            name: "imageTwo",
            label: "Bottom Image",
            type: "file",
          },
        ],
      },

      {
        name: "About-Features",
        label: "What We Do",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },

          {
            name: "description",
            label: "Section description",
            type: "textarea",
          },

          {
            name: "items",
            label: "Features",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ],
          },
        ],
      },

      {
        name: "About-Leaders",
        label: "People Behind",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "items",
            label: "People",
            type: "repeater",
            fields: [
              {
                name: "name",
                label: "Name",
                type: "text",
              },
              {
                name: "designation",
                label: "Designation",
                type: "textarea",
              },
              {
                name: "image",
                label: "Profile Image",
                type: "file",
              },
            ],
          },
        ],
      },

      {
        name: "About-Statistics",
        label: "Statistics",
        fields: [
          {
            name: "items",
            label: "Statistics",
            type: "repeater",
            max: 6,
            fields: [
              {
                name: "value",
                label: "Value",
                type: "text",
              },
              {
                name: "label",
                label: "Label",
                type: "text",
              },
            ],
          },
        ],
      },

      {
        name: "About-Learning",
        label: "Learning Section",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Section Description",
            type: "textarea",
          },
          {
            name: "items",
            label: "Cards",
            type: "repeater",
            max: 5,
            fields: [
              {
                name: "title",
                label: "Card Title",
                type: "text",
              },
              {
                name: "description",
                label: "Card Description",
                type: "textarea",
              },
              {
                name: "background",
                label: "Card Background",
                type: "color",
              },
            ],
          },
        ],
      },

      {
        name: "About-Teachers",
        label: "Teachers",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "items",
            label: "Teachers",
            type: "repeater",
            fields: [
              {
                name: "name",
                label: "Teacher Name",
                type: "text",
              },
              {
                name: "designation",
                label: "Designation",
                type: "text",
              },
              {
                name: "image",
                label: "Teacher Image",
                type: "file",
              },
            ],
          },
        ],
      },

      {
        name: "About-Final-CTA",
        label: "Bottom CTA",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
          },
          {
            name: "primaryButton",
            label: "Primary Button",
            type: "text",
          },
          {
            name: "secondaryButton",
            label: "Secondary Button",
            type: "text",
          },
        ],
      },
    ],
  },

  career: {
    name: "Career",
    require: true,
    description: "Career Page",
    sections: [
      {
        name: "Career-Hero",
        label: "Hero Section",
        fields: [
          {
            name: "title",
            label: "Hero Title",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "image",
            label: "Hero Image",
            type: "file",
          },
          {
            name: "primaryButton",
            label: "Primary Button",
            type: "text",
          },
          {
            name: "secondaryButton",
            label: "Secondary Button",
            type: "text",
          },
        ],
      },

      {
        name: "Career-Why-Join",
        label: "Why Join Us",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "description",
            label: "Section Description",
            type: "textarea",
          },
          {
            name: "items",
            label: "Benefits",
            type: "repeater",
            fields: [
              {
                name: "icon",
                label: "Lucide Icon",
                type: "text",
              },
              {
                name: "background",
                label: "Background Color",
                type: "color",
              },
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ],
          },
        ],
      },

      // {
      //   name: "built-for",
      //   label: "built for your career",
      //   fields: [
      //     {
      //       name: "title",
      //       label: "Section Title",
      //       type: "text",
      //     },
      //     {
      //       name: "description",
      //       label: "Section Description",
      //       type: "textarea",
      //     },
      //     {
      //       name: "primaryButton",
      //       label: "Primary Button",
      //       type: "text",
      //     },
      //   ],
      // },

      {
        name: "Career-Stats",
        label: "Company Statistics",
        fields: [
          {
            name: "items",
            label: "Statistics",
            type: "repeater",
            max: 8,
            fields: [
              {
                name: "icon",
                label: "Emoji/Icon",
                type: "text",
              },
              {
                name: "value",
                label: "Value",
                type: "text",
              },
              {
                name: "label",
                label: "Label",
                type: "text",
              },
            ],
          },
        ],
      },

      // {
      //   name: "Career-Departments",
      //   label: "Departments",
      //   fields: [
      //     {
      //       name: "title",
      //       label: "Section Title",
      //       type: "text",
      //     },
      //     {
      //       name: "items",
      //       label: "Departments",
      //       type: "repeater",
      //       fields: [
      //         {
      //           name: "icon",
      //           label: "Lucide Icon",
      //           type: "text",
      //         },
      //         {
      //           name: "title",
      //           label: "Title",
      //           type: "text",
      //         },
      //         {
      //           name: "points",
      //           label: "Points",
      //           type: "textarea",
      //         },
      //       ],
      //     },
      //   ],
      // },

      // {
      //   name: "Career-Life",
      //   label: "Life at Ooshas",
      //   fields: [
      //     {
      //       name: "title",
      //       label: "Section Title",
      //       type: "text",
      //     },
      //     {
      //       name: "description",
      //       label: "Description",
      //       type: "textarea",
      //     },
      //     {
      //       name: "items",
      //       label: "Gallery",
      //       type: "repeater",
      //       fields: [
      //         {
      //           name: "label",
      //           label: "Image Label",
      //           type: "text",
      //         },
      //         {
      //           name: "image",
      //           label: "Image",
      //           type: "file",
      //         },
      //       ],
      //     },
      //   ],
      // },

      // {
      //   name: "Career-Benefits",
      //   label: "Employee Benefits",
      //   fields: [
      //     {
      //       name: "title",
      //       label: "Section Title",
      //       type: "text",
      //     },
      //     {
      //       name: "items",
      //       label: "Benefits",
      //       type: "repeater",
      //       fields: [
      //         {
      //           name: "icon",
      //           label: "Lucide Icon",
      //           type: "text",
      //         },
      //         {
      //           name: "title",
      //           label: "Benefit Title",
      //           type: "text",
      //         },
      //         {
      //           name: "description",
      //           label: "Description",
      //           type: "textarea",
      //         },
      //       ],
      //     },
      //   ],
      // },

      {
        name: "Career-Hiring-Process",
        label: "Hiring Process",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "items",
            label: "Hiring Steps",
            type: "repeater",
            fields: [
              {
                name: "icon",
                label: "Lucide Icon",
                type: "text",
              },
              {
                name: "title",
                label: "Title",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ],
          },
        ],
      },

      {
        name: "Career-Open-Positions",
        label: "Open Positions",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "items",
            label: "Jobs",
            type: "repeater",
            fields: [
              {
                name: "icon",
                label: "Lucide Icon",
                type: "text",
              },
              {
                name: "title",
                label: "Job Title",
                type: "text",
              },
              {
                name: "experience",
                label: "Experience",
                type: "text",
              },
              {
                name: "location",
                label: "Location",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "editor",
              },
              {
                name: "type",
                label: "Employment Type",
                type: "text",
              },
            ],
          },
        ],
      },

      {
        name: "Career-Testimonials",
        label: "Employee Testimonials",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "items",
            label: "Testimonials",
            type: "repeater",
            fields: [
              {
                name: "name",
                label: "Employee Name",
                type: "text",
              },
              {
                name: "role",
                label: "Designation",
                type: "text",
              },
              {
                name: "quote",
                label: "Quote",
                type: "textarea",
              },
              {
                name: "image",
                label: "Profile Image",
                type: "file",
              },
              {
                name: "rating",
                label: "Rating",
                type: "number",
              },
            ],
          },
        ],
      },

      {
        name: "Career-FAQ",
        label: "FAQs",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
          },
          {
            name: "items",
            label: "Questions",
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
                type: "text",
              },
            ],
          },
        ],
      },

      {
        name: "Career-CTA",
        label: "Bottom CTA",
        fields: [
          {
            name: "title",
            label: "Heading",
            type: "text",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "image",
            label: "CTA Image",
            type: "file",
          },
          {
            name: "primaryButton",
            label: "Primary Button",
            type: "text",
          },
          {
            name: "secondaryButton",
            label: "Secondary Button",
            type: "text",
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
            type: "textarea",
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
        name: "from-section",
        label: "From section",
        fields: [
          {
            name: "score",
            label: "Score ",
            type: "text",
            value: "68+",
          },
          {
            name: "title",
            label: "title",
            type: "text",
            value: "Avg. Score Gain",
          },
          {
            name: "score2",
            label: "Score 2",
            type: "text",
            value: "68+",
          },
          {
            name: "title2",
            label: "title 2",
            type: "text",
            value: "Avg. Score Gain",
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
            type: "text",
            value: "What is GRE?",
          },
          {
            name: "description",
            label: "Description",
            type: "editor",
            value:
              "The GRE, your gateway to prestigious universities and diverse programs, assesses your verbal, quantitative, and analytical writing skills – crucial for graduate study worldwide.",
          },
        ],
      },
      {
        name: "exam-Format-section",
        label: "GRE Exam Format",
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "text",
            value: "GRE Exam Format 2026 - New Format at a Glance",
          },
          {
            name: "patternTable",
            label: "Pattern Table Data",
            type: "repeater",
            fields: [
              { name: "title", label: "title", type: "text" },
              { name: "description", label: "description", type: "editor" },
            ],
          },
        ],
      },

      {
        name: "exam-pattern-section",
        label: "GRE Exam Pattern",
        fields: [
          {
            name: "exam-patternTable",
            label: "exam Pattern Data",
            type: "repeater",
            fields: [
              {
                name: "title",
                label: "Section Title",
                type: "text",
                value: "GRE Exam Pattern 2026 - New Format at a Glance",
              },
              {
                name: "subtitle",
                label: "Subtitle",
                type: "editor",
                value:
                  "The GRE General Test uses the shorter format administered by the [ETS official portal](https://ets.org). The test takes exactly 1 hour and 58 minutes. It features 5 sections, is fully section-level adaptive, and drops the unscored experimental section entirely.",
              },
              {
                name: "patternTable",
                label: "Pattern Table Data",
                type: "repeater",
                fields: [
                  {
                    name: "section",
                    label: "Section",
                    type: "editor",
                  },
                  {
                    name: "questions",
                    label: "Questions",
                    type: "text",
                  },
                  {
                    name: "time",
                    label: "Time",
                    type: "text",
                  },
                  {
                    name: "scoreRange",
                    label: "Score Range",
                    type: "text",
                  },
                  {
                    name: "format",
                    label: "Format",
                    type: "text",
                  },
                ],
              },
              {
                name: "other_data",
                label: "Other Data",
                type: "textarea",
                value:
                  "### Important Test Regulations\n* No negative marking applies to incorrect answers.\n* Questions within an active section can be skipped or marked for review.\n* Official scoring reports become ready in 8 to 10 days.\n* Test takers can find upcoming windows on the [ETS GRE Test Dates Page](https://ets.org).",
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
            type: "text",
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
            type: "text",
            required: false,
            placeholder: "Study smarter with || AI",
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
            type: "text",
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
            type: "text",
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
                type: "text",
              },
            ],
          },
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
                name: "content_data",
                label: "Content Data",
                type: "editor",
              },
              // {
              //   name: "content_features",
              //   label: "Content Features",
              //   type: "repeater",
              //   fields: [
              //     {
              //       name: "feature",
              //       label: "Feature",
              //       type: "text",
              //     },
              //   ],
              // },
              // {
              //   name: "access_features",
              //   label: "Access Features",
              //   type: "repeater",
              //   fields: [
              //     {
              //       name: "feature",
              //       label: "Feature",
              //       type: "text",
              //     },
              //   ],
              // },
              {
                name: "price",
                label: "Price",
                type: "text",
                placeholder: "$99 USD",
              },
            ],
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
            type: "editor",
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
            ],
          },
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
            type: "text",
            value: "Free GRE Prep Resources",
          },
          {
            name: "resources",
            label: "Resource Cards",
            type: "repeater",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "text" },
              { name: "buttonText", label: "Button Text", type: "text" },
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
            type: "text",
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
            type: "text",
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

  ExamDetails: {
    name: "ExamDetails",
    description: "Create and manage Exam Infomation.",
    require: true,
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
            name: "subtitle",
            label: "Blog Subtitle",
            type: "editor",
            required: true,
            placeholder: "Enter blog Subtitle",
          },
          {
            name: "author",
            label: "Author Name",
            type: "text",
            required: false,
            placeholder: "Admin",
          },
          {
            name: "url",
            label: "Button Url",
            type: "text",
            placeholder: "http://ooshasprep.com/auth",
          },
          {
            name: "buttonText",
            label: "Button Text",
            type: "text",
            placeholder: "Enroll Now",
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
        name: "exam-data",
        label: "Exam Data",
        fields: [
          {
            name: "exam_details",
            label: "Exam Details",
            type: "repeater",
            max: 3,
            fields: [
              {
                name: "content_heading",
                label: "Content Heading",
                type: "text",
              },
              {
                name: "content_data",
                label: "Content Data",
                type: "editor",
              },
              {
                name: "faq",
                label: "FAQ",
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
              },

              {
                name: "Image",
                label: "Banner Image",
                type: "file",
                accept: "image/*",
              },

              {
                name: "Banner",
                label: "Banner",
                type: "repeater",
                fields: [
                  {
                    name: "title",
                    label: "Title",
                    type: "text",
                  },
                  {
                    name: "subtitle",
                    label: "Subtitle",
                    type: "editor",
                  },
                  {
                    name: "url",
                    label: "Url",
                    type: "text",
                  },
                  {
                    name: "buttontext",
                    label: "Button Text",
                    type: "text",
                  },
                ],
              },

              {
                name: "question",
                label: "Question Title",
                type: "text",
                required: true,
                placeholder: "Enter Question",
              },
              {
                name: "options",
                label: "Options",
                type: "repeater",
                fields: [
                  {
                    name: "value",
                    label: "Value",
                    type: "text",
                  },
                  {
                    name: "label",
                    label: "Label",
                    type: "text",
                  },
                  {
                    name: "type",
                    label: "Input Type",
                    type: "select",
                    required: true,
                    option: ["text", "radio"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  greCalculator: {
  name: "GRE Score Calculator",
  description: "Create and manage score calculator page content",
  require: true,

  sections: [
    
    {
      name: "hero",
      label: "Hero Section",
      require: true,
      fields: [
       
        {
          name: "title",
          label: "Hero Title",
          type: "text",
          required: true,
          placeholder: "Free GRE Score Calculator",
        },
        
        {
          name: "description",
          label: "Hero Description",
          type: "textarea",
          required: false,
          placeholder:
            "Estimate your GRE score, understand your percentile, and discover graduate programs that match your current performance.",
        },
        {
          name: "primaryButtonText",
          label: "Primary Button Text",
          type: "text",
          required: false,
          placeholder: "Calculate My GRE Score",
        },
        {
          name: "primaryButtonUrl",
          label: "Primary Button URL",
          type: "text",
          required: false,
          placeholder: "#calculator",
        },
      ],
    },

    // {
    //   name: "practiceForm",
    //   label: "Diagnostic Form",
    //   require: true,
    //   fields: [
    //     {
    //       name: "title",
    //       label: "Form Title",
    //       type: "text",
    //       required: true,
    //       placeholder: "Get Your Free GRE Diagnostic & Study Plan",
    //     },
    //     {
    //       name: "description",
    //       label: "Form Description",
    //       type: "textarea",
    //       required: false,
    //       placeholder:
    //         "Enter your latest practice results to get an instant estimate.",
    //     },
    //     {
    //       name: "continueButtonText",
    //       label: "Continue Button Text",
    //       type: "text",
    //       required: false,
    //       placeholder: "Continue",
    //     },
    //     {
    //       name: "inputs",
    //       label: "Score Inputs",
    //       type: "repeater",
    //       max: 10,
    //       fields: [
    //         {
    //           name: "key",
    //           label: "Input Key",
    //           type: "text",
    //           required: true,
    //           placeholder: "verbal",
    //         },
    //         {
    //           name: "label",
    //           label: "Input Label",
    //           type: "text",
    //           required: true,
    //           placeholder: "Verbal Reasoning",
    //         },
    //         {
    //           name: "correctLabel",
    //           label: "Correct Answers Label",
    //           type: "text",
    //           required: false,
    //           placeholder: "Correct Answers",
    //         },
    //         {
    //           name: "totalLabel",
    //           label: "Total Questions Label",
    //           type: "text",
    //           required: false,
    //           placeholder: "Total Questions",
    //         },
    //         {
    //           name: "defaultCorrect",
    //           label: "Default Correct Answers",
    //           type: "number",
    //           required: false,
    //         },
    //         {
    //           name: "defaultTotal",
    //           label: "Default Total Questions",
    //           type: "number",
    //           required: false,
    //         },
    //         {
    //           name: "minCorrect",
    //           label: "Minimum Correct",
    //           type: "number",
    //           required: false,
    //         },
    //         {
    //           name: "minTotal",
    //           label: "Minimum Total",
    //           type: "number",
    //           required: false,
    //         },
    //       ],
    //     },
    //   ],
    // },
    
    // {
    //   name: "calculator",
    //   label: "Score Calculator",
    //   require: true,
    //   fields: [
    //     {
    //       name: "eyebrow",
    //       label: "Eyebrow",
    //       type: "text",
    //       required: false,
    //       placeholder: "GRE SCORE CALCULATOR",
    //     },
    //     {
    //       name: "title",
    //       label: "Calculator Title",
    //       type: "text",
    //       required: true,
    //       placeholder: "Convert Your Raw Score Into Your Real GRE Score",
    //     },
    //     {
    //       name: "description",
    //       label: "Calculator Description",
    //       type: "textarea",
    //       required: false,
    //       placeholder:
    //         "Enter your practice performance and understand how your current results translate into an estimated GRE score.",
    //     },
    //     {
    //       name: "inputTitle",
    //       label: "Input Panel Title",
    //       type: "text",
    //       required: false,
    //       placeholder: "Enter Your Practice Test Results",
    //     },
    //     {
    //       name: "inputDescription",
    //       label: "Input Panel Description",
    //       type: "textarea",
    //       required: false,
    //       placeholder:
    //         "Use your latest mock test for the best estimate.",
    //     },
    //     {
    //       name: "liveLabel",
    //       label: "Live Label",
    //       type: "text",
    //       required: false,
    //       placeholder: "LIVE",
    //     },
    //     {
    //       name: "difficultyLabel",
    //       label: "Difficulty Label",
    //       type: "text",
    //       required: false,
    //       placeholder: "Question Difficulty",
    //     },
    //     {
    //       name: "difficultyDescription",
    //       label: "Difficulty Description",
    //       type: "text",
    //       required: false,
    //       placeholder:
    //         "How challenging was your practice test?",
    //     },
    //     {
    //       name: "difficultyDefault",
    //       label: "Default Difficulty",
    //       type: "number",
    //       required: false,
    //     },
    //     {
    //       name: "difficultyMin",
    //       label: "Difficulty Minimum",
    //       type: "number",
    //       required: false,
    //     },
    //     {
    //       name: "difficultyMax",
    //       label: "Difficulty Maximum",
    //       type: "number",
    //       required: false,
    //     },
    //     {
    //       name: "calculateButtonText",
    //       label: "Calculate Button Text",
    //       type: "text",
    //       required: false,
    //       placeholder: "Calculate My GRE Score",
    //     },
    //     {
    //       name: "resultTitle",
    //       label: "Result Title",
    //       type: "text",
    //       required: false,
    //       placeholder: "Your Estimated GRE Score",
    //     },
    //     {
    //       name: "scoreSuffix",
    //       label: "Score Suffix",
    //       type: "text",
    //       required: false,
    //       placeholder: "/340",
    //     },
    //     {
    //       name: "percentileSuffix",
    //       label: "Percentile Text",
    //       type: "text",
    //       required: false,
    //       placeholder: "Percentile",
    //     },
    //     {
    //       name: "disclaimer",
    //       label: "Score Disclaimer",
    //       type: "textarea",
    //       required: false,
    //       placeholder:
    //         "Your estimated score is a planning benchmark and should not be considered an official GRE result.",
    //     },

    //     {
    //       name: "meters",
    //       label: "Score Meters",
    //       type: "repeater",
    //       max: 10,
    //       fields: [
    //         {
    //           name: "key",
    //           label: "Meter Key",
    //           type: "text",
    //           required: true,
    //           placeholder: "verbal",
    //         },
    //         {
    //           name: "label",
    //           label: "Meter Label",
    //           type: "text",
    //           required: true,
    //           placeholder: "Verbal Reasoning",
    //         },
    //         {
    //           name: "source",
    //           label: "Meter Source",
    //           type: "select",
    //           required: true,
    //           option: [
    //             "verbalPercentage",
    //             "quantPercentage",
    //             "overallScore",
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      name: "whySection",
      label: "Why Section",
      require: false,
      fields: [
       
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          placeholder: "Your Score Doesn't Stop Here — Practice For Real",
        },
        {
          name: "description",
          label: "Description",
          type: "editor",
          placeholder:
            "Your GRE score is only one part of your graduate school journey.",
        },
        {
          name: "buttonText",
          label: "Button Text",
          type: "text",
          placeholder: "Start Your Preparation",
        },
        {
          name: "buttonUrl",
          label: "Button URL",
          type: "text",
          placeholder: "/gre",
        },


        {
          name: "statistics",
          label: "Statistics",
          type: "repeater",
          max: 10,
          fields: [
            {
              name: "number",
              label: "Number",
              type: "text",
              required: true,
              placeholder: "2,000+",
            },
            {
              name: "label",
              label: "Label",
              type: "text",
              required: true,
              placeholder: "Students Tested",
            },
          ],
        },
      ],
    },

    {
      name: "differenceSection",
      label: "Difference Section",
      require: false,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          placeholder: "How Ooshas Prep's GRE Calculator Is Different",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "A simple calculator designed to give you useful insights beyond just a single number.",
        },
        {
          name : "Data",
          label : "Data",
          type : 'editor',
          placeholder: "A simple calculator Data."
        }
      ],
    },

    {
      name: "beyondNumber",
      label: "Beyond The Number",
      require: false,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          placeholder:
            "Go Beyond the Number — Understand Your Score",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder:
            "Your GRE result can tell you much more when combined with the right context.",
        },

        {
          name: "features",
          label: "Features",
          type: "repeater",
          max: 20,
          fields: [
            {
              name: "icon",
              label: "Icon",
              type: "select",
              option: [
                "TrendingUp",
                "Target",
                "GraduationCap",
                "Trophy",
                "MapPin",
                "Sparkles",
              ],
            },
            {
              name: "title",
              label: "Feature Title",
              type: "text",
              required: true,
              placeholder: "Track Your Progress",
            },
            {
              name: "text",
              label: "Feature Description",
              type: "textarea",
              required: true,
              placeholder:
                "Monitor score changes over multiple practice tests.",
            },
          ],
        },
      ],
    },
    
    {
      name: "faq",
      label: "FAQ Section",
      require: false,
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text",
          required: false,
        },
        {
          name: "title",
          label: "FAQ Title",
          type: "text",
          required: true,
          placeholder:
            "GRE Score Calculator — Frequently Asked Questions",
        },
        {
          name: "description",
          label: "FAQ Description",
          type: "textarea",
          placeholder:
            "Everything you need to know about our GRE score calculator.",
        },

        {
          name: "items",
          label: "FAQ Items",
          type: "repeater",
          max: 50,
          fields: [
            {
              name: "question",
              label: "Question",
              type: "text",
              required: true,
              placeholder:
                "How accurate is the GRE score calculator?",
            },
            {
              name: "answer",
              label: "Answer",
              type: "textarea",
              required: true,
              placeholder:
                "The calculator provides an estimated GRE score based on the practice section results you enter.",
            },
          ],
        },
      ],
    },

    {
      name: "bottomCTA",
      label: "Bottom CTA",
      require: false,
      fields: [
        {
          name: "title",
          label: "CTA Title",
          type: "text",
          required: true,
          placeholder:
            "Your Dream Grad School Is One Score Away",
        },
        {
          name: "description",
          label: "CTA Description",
          type: "textarea",
          placeholder:
            "Understand your current GRE performance and take the next step toward your graduate school goals.",
        },
        {
          name: "primaryButtonText",
          label: "Primary Button Text",
          type: "text",
          placeholder: "Calculate My Score",
        },
        {
          name: "primaryButtonUrl",
          label: "Primary Button URL",
          type: "text",
          placeholder: "#calculator",
        },
        {
          name: "secondaryButtonText",
          label: "Secondary Button Text",
          type: "text",
          placeholder: "Talk To An Expert",
        },
        {
          name: "secondaryButtonUrl",
          label: "Secondary Button URL",
          type: "text",
          placeholder: "/contact",
        },
      ],
    },
  ],
},

};
