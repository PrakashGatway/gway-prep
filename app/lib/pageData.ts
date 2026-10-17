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
            name: "button1",
            label: "Button1",
            type: "text",
            required: false,
            placeholder: "",
          },
           {
            name: "button2",
            label: "Button2",
            type: "text",
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
              { name: "link", label : "Link", placeholder:"Use '*' for a popup window or enter a destination URL to redirect users.", type : "text"},
              { name: "heading", label: "heading", type: "text" },
              { name: "slug", label: "Slug", type: "text" },
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
          name: "title",
          label: "Hero Heading",
          type: "text",
          value: "Every big result starts with one brave step.",
        },
        {
          name: "subtitle",
          label: "Hero Description",
          type: "textarea",
          value:
            "Meet the students behind the milestones. Explore their goals, the preparation that moved them forward, and the moments that made them proud.",
        },
        {
          name: "heroImage",
          label: "Hero Image",
          type: "file",
          accept: "image/*",
        },
        {
          name: "button1Text",
          label: "Primary Button Text",
          type: "text",
          value: "Explore student stories",
        },
        {
          name: "button1Url",
          label: "Primary Button Link",
          type: "text",
          value: "#student-stories",
        },
        {
          name: "button2Text",
          label: "Secondary Button Text",
          type: "text",
          value: "Talk to a counsellor",
        },
        {
          name: "button2Url",
          label: "Secondary Button Link",
          type: "text",
          value: "/contact",
        },
          {
            name: "name",
            label: "student Name",
            type: "text",
            required: true,
            placeholder: "Enter name hare",
          },
          {
            name: "slug",
            label: "Case Study URL Slug (optional)",
            type: "text",
            required: false,
            placeholder: "e.g. riya-sharma-sat-success",
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
              {
                name: "url",
                label: "Url",
                type: "text",
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
                type: "editor",
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
    is_dynamic: true,
    slug_field: "slug",
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
    name: "Calculator",
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
            name: "pageType",
            label: "Page Type",
            type: "select",
            option: ["GRE", "GMAT", "SAT", "TOEFL", "IELTS", "PTE"],
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

      {
        name: "calculator",
        label: "Calculator",
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
        ],
      },

      {
        name: "chart",
        label: "Chart",
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
        ],
      },

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
            placeholder:
              "A simple calculator designed to give you useful insights beyond just a single number.",
          },
          {
            name: "Data",
            label: "Data",
            type: "editor",
            placeholder: "A simple calculator Data.",
          },
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
            placeholder: "Go Beyond the Number — Understand Your Score",
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
          // {
          //   name: "eyebrow",
          //   label: "Eyebrow",
          //   type: "text",
          //   required: false,
          // },
          {
            name: "title",
            label: "FAQ Title",
            type: "text",
            required: true,
            placeholder: "GRE Score Calculator — Frequently Asked Questions",
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
                placeholder: "How accurate is the GRE score calculator?",
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
            placeholder: "Your Dream Grad School Is One Score Away",
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

  "spoken-english-course": {
    name: "Spoken English",
    require: true,
    description:
      "Spoken English landing pages and related course pages using the Spoken English design.",
    is_dynamic: true,
    slug_field: "slug",
    initialValues: {
      hero: {
        title: "English Speaking Course",
        subtitle: "Ooshas Prep Spoken Curriculum",
        deliveryModes: "Classroom | Online | Personalised",
        examTypes: "English | IELTS | PTE | PD | Competitive",
        buttonText: "Start Spoken English Test",
        buttonUrl: "#start-learning",
        image: "/spoken-english/hero.webp",
        imageAlt: "A student reading and enjoying a book",
      },
      reviews: {
        title: "Student Reviews",
        suffix: "Google Rating",
        items: [
          { text: "Ooshas Prep helped me improve my spoken English and boost my confidence. Great learning experience!", rating: "5" },
          { text: "Ooshas Prep has made learning Spoken English easy and enjoyable. I feel more confident while speaking English now!", rating: "5" },
          { text: "Excellent Spoken English classes at Ooshas Prep! The teaching is easy to understand, and my communication skills have improved a lot.", rating: "5" },
        ],
      },
      classes: {
        titleLead: "English Speaking ",
        titleAccent: "Classes for Career Growth",
        buttonText: "Start Spoken English Test",
        buttonUrl: "#start-learning",
        items: [
          { title: "Best English Speaking Course in Delhi", description: "Oxford School of English offers one of the best English speaking courses in Delhi for beginners, students, working professionals, and job seekers. Our English course improves grammar, vocabulary, pronunciation, fluency, and communication skills through practical classroom training and personalised learning. We provide both online and offline English speaking classes to suit every learner’s schedule." },
          { title: "English Speaking Classes with Practical Learning", description: "Looking for an English speaking course near me? Our interactive classes focus on real-life communication through conversations, role-plays, presentations, group discussions, and speaking activities. With continuous trainer guidance and personalised feedback, students develop the confidence to communicate effectively in interviews, workplaces, business meetings, and everyday situations." },
          { title: "More Than an English Course", description: "Along with our English speaking course, we also offer IELTS, PTE, TOEIC, and Personality Development classes under one roof. Since 1997, Oxford School of English has trained more than One Lakh students using Cambridge University Press content, experienced trainers, smart classrooms, and personalised coaching through both online and offline learning." },
        ],
      },
      "why-choose-us": {
        title: "WHY\nCHOOSE\nUS?",
        image: "/spoken-english/why-choose-us.webp",
        imageAlt: "A bright idea light bulb",
        items: [
          { text: "Experienced & Certified Trainers – Learn from skilled instructors with practical teaching expertise." },
          { text: "Personalised Learning Plans – Courses designed to match your goals, level, and learning pace." },
          { text: "Practical Classroom Training – Improve fluency through conversations, activities, and real-life speaking practice." },
          { text: "One Lakh+ Students Trained Since 1997 – Trusted by learners for quality English education." },
          { text: "Online & Offline Learning Options – Flexible classes that fit your schedule and learning style." },
          { text: "Cambridge University Press Content – Learn with internationally trusted English learning material." },
        ],
      },
      comparison: {
        titleLead: "Speaking Fever",
        titleConnector: "vs",
        titleTail: "Traditional English Classes",
        featureHeading: "Features",
        individualHeading: "Speaking Fever 1:1",
        traditionalHeading: "Traditional Classes",
        items: [
          { feature: "Class Type", individual: "Live 1:1 Classes", traditional: "Group Classes" },
          { feature: "Speaking Time", individual: "60–70% Speaking Time", traditional: "9–90% Speaking Time" },
          { feature: "Feedback", individual: "Instant Feedback", traditional: "Delayed Feedback" },
          { feature: "Flexibility", individual: "Flexible Scheduling", traditional: "Fixed Timings" },
          { feature: "Practice", individual: "Real Conversations", traditional: "Theory-Based Learning" },
          { feature: "Class Mode", individual: "100% Online", traditional: "Travel Required" },
          { feature: "Learning Module", individual: "Personalized Learning", traditional: "Same for Everyone" },
        ],
      },
      "course-process": {
        titleLead: "How Our Online ",
        titleAccent: "English Speaking Course",
        titleTail: "Works?",
        items: [
          { title: "Contact Us", detail: "Call or fill out the form on our website to get started." },
          { title: "Schedule a Demo", detail: "Attend a free demo class to experience our teaching methods." },
          { title: "Choose your course", detail: "Select the course that matches your goals." },
          { title: "Begin Learning", detail: "Start your journey toward fluency with expert guidance." },
        ],
      },
      learning: {
        titleLead: "What",
        titleTail: "You’ll Learn",
        image: "/spoken-english/what-you-learn.webp",
        imageAlt: "Illustration of communication and learning skills",
        items: [
          { title: "Daily Conversation Skills", detail: "Learn to speak naturally in everyday situations, from greetings and travel to social and work talks." },
          { title: "English Grammar", detail: "Master grammar through interactive speaking activities, not rote learning, so you speak correctly without overthinking." },
          { title: "Vocabulary for Everyday Use", detail: "Build a strong vocabulary with useful words and phrases for daily, academic, and professional communication." },
          { title: "Pronunciation & Accent Improvement", detail: "Enhance clarity and confidence with guided pronunciation practice and voice modulation exercises." },
          { title: "Fluency & Confidence Building", detail: "Enhance clarity and confidence with guided pronunciation practice and voice modulation exercises." },
          { title: "Real-Life Practice Session", detail: "Use English in lifelike situations like interviews, discussions, and everyday conversations that prepare you for the real world." },
        ],
      },
      "final-cta": {
        eyebrow: "New Spoken English Test",
        title: "Start Your Spoken English Test",
        subtitle: "Prep Your Journey with Ooshas Prep",
        buttonText: "Start Spoken English Test",
        buttonUrl: "/contact",
        image: "/spoken-english/students.webp",
        imageAlt: "Students learning English together",
      },
    },
    sections: [
      {
        name: "hero",
        label: "Hero Section",
        require: true,
        fields: [
          { name: "title", label: "Main Title", type: "text", required: true },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "deliveryModes", label: "Class Formats", type: "text" },
          { name: "examTypes", label: "Course Types", type: "text" },
          { name: "buttonText", label: "Button Text", type: "text" },
          { name: "buttonUrl", label: "Button Link", type: "text" },
          { name: "image", label: "Hero Image", type: "file", accept: "image/*" },
          { name: "imageAlt", label: "Hero Image Description", type: "text" },
        ],
      },
      {
        name: "reviews",
        label: "Student Reviews",
        fields: [
          { name: "title", label: "Section Title", type: "text" },
          { name: "suffix", label: "Title Suffix", type: "text" },
          { name: "items", label: "Reviews", type: "repeater", fields: [
            { name: "text", label: "Review", type: "textarea" },
            { name: "rating", label: "Star Rating", type: "number" },
          ] },
        ],
      },
      {
        name: "classes",
        label: "English Speaking Classes",
        fields: [
          { name: "titleLead", label: "Title Before Highlight", type: "text" },
          { name: "titleAccent", label: "Highlighted Title", type: "text" },
          { name: "items", label: "Text Blocks", type: "repeater", fields: [
            { name: "title", label: "Block Heading", type: "text" },
            { name: "description", label: "Block Content", type: "textarea" },
          ] },
          { name: "buttonText", label: "Button Text", type: "text" },
          { name: "buttonUrl", label: "Button Link", type: "text" },
        ],
      },
      {
        name: "why-choose-us",
        label: "Why Choose Us",
        fields: [
          { name: "title", label: "Heading (use new lines)", type: "textarea" },
          { name: "image", label: "Bulb Image", type: "file", accept: "image/*" },
          { name: "imageAlt", label: "Image Description", type: "text" },
          { name: "items", label: "Benefits", type: "repeater", fields: [
            { name: "text", label: "Benefit", type: "textarea" },
          ] },
        ],
      },
      {
        name: "comparison",
        label: "Class Comparison",
        fields: [
          { name: "titleLead", label: "Title Before Highlight", type: "text" },
          { name: "titleConnector", label: "Title Connector", type: "text" },
          { name: "titleTail", label: "Title After Highlight", type: "text" },
          { name: "featureHeading", label: "Features Column Heading", type: "text" },
          { name: "individualHeading", label: "Speaking Fever Column Heading", type: "text" },
          { name: "traditionalHeading", label: "Traditional Column Heading", type: "text" },
          { name: "items", label: "Comparison Rows", type: "repeater", fields: [
            { name: "feature", label: "Feature", type: "text" },
            { name: "individual", label: "Speaking Fever 1:1", type: "text" },
            { name: "traditional", label: "Traditional Class", type: "text" },
          ] },
        ],
      },
      {
        name: "course-process",
        label: "How the Course Works",
        fields: [
          { name: "titleLead", label: "Title Before Highlight", type: "text" },
          { name: "titleAccent", label: "Highlighted Title", type: "text" },
          { name: "titleTail", label: "Title Ending", type: "text" },
          { name: "items", label: "Steps", type: "repeater", max: 4, fields: [
            { name: "title", label: "Step Title", type: "text" },
            { name: "detail", label: "Step Description", type: "textarea" },
          ] },
        ],
      },
      {
        name: "learning",
        label: "What You’ll Learn",
        fields: [
          { name: "titleLead", label: "Title Before Highlight", type: "text" },
          { name: "titleTail", label: "Title After Highlight", type: "text" },
          { name: "image", label: "Center Illustration", type: "file", accept: "image/*" },
          { name: "imageAlt", label: "Image Description", type: "text" },
          { name: "items", label: "Learning Points", type: "repeater", fields: [
            { name: "title", label: "Point Title", type: "text" },
            { name: "detail", label: "Point Description", type: "textarea" },
          ] },
        ],
      },
      {
        name: "final-cta",
        label: "Final Call to Action",
        fields: [
          { name: "eyebrow", label: "Badge Text", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "buttonText", label: "Button Text", type: "text" },
          { name: "buttonUrl", label: "Button Link", type: "text" },
          { name: "image", label: "Students Image", type: "file", accept: "image/*" },
          { name: "imageAlt", label: "Image Description", type: "text" },
        ],
      },
    ],
  },

    events: {
    name: "Events",
    description: "Events page content management",
    require: true,
    sections: [
      {
        name: "events-hero-section",
        label: "Hero Section",
        fields: [
          {
            name: "title",
            label: "Hero Title",
            type: "text",
            required: true,
            placeholder: "Enter hero heading",
          },
          {
            name: "subtitle",
            label: "Hero Subtitle",
            type: "textarea",
            required: false,
            placeholder: "Enter hero description",
          },
          {
            name: "heroImage",
            label: "Hero Image",
            type: "file",
            accept: "image/*",
            required: false,
          },
          {
            name: "imageAlt",
            label: "Hero Image Alt Text",
            type: "text",
            required: false,
            placeholder: "Describe the hero image",
          },
          {
            name: "buttonText",
            label: "Hero Button Text",
            type: "text",
            required: false,
            placeholder: "Explore Events",
          },
          {
            name: "buttonUrl",
            label: "Hero Button Link",
            type: "text",
            required: false,
            placeholder: "Enter destination URL",
          },
        ],
      },

      {
        name: "events-blogs-section",
        label: "Blogs Section",
        fields: [
          {
            name: "heading",
            label: "Blogs Heading",
            type: "text",
            required: true,
            placeholder: "Enter blogs section heading",
          },
          {
            name: "subtitle",
            label: "Blogs Subtitle",
            type: "textarea",
            required: false,
            placeholder: "Enter blogs section description",
          },
        ],
      },

      {
        name: "events-learning-calendar-section",
        label: "Learning Calendar Section",
        fields: [
          {
            name: "heading",
            label: "Learning Calendar Heading",
            type: "text",
            required: true,
            placeholder: "Enter learning calendar heading",
          },
          {
            name: "subtitle",
            label: "Learning Calendar Subtitle",
            type: "textarea",
            required: false,
            placeholder: "Enter learning calendar description",
          },
          {
            name: "calendarImage",
            label: "Learning Calendar Image",
            type: "file",
            accept: "image/*",
            required: false,
          },
          {
            name: "imageAlt",
            label: "Calendar Image Alt Text",
            type: "text",
            required: false,
            placeholder: "Describe the calendar image",
          },
        ],
      },

      {
        name: "events-faq-section",
        label: "FAQ Section",
        fields: [
          {
            name: "title",
            label: "FAQ Heading",
            type: "text",
            required: false,
            value: "Frequently Asked Questions",
          },
          {
            name: "description",
            label: "FAQ Description",
            type: "textarea",
            required: false,
            value: "Find answers about Ooshas Prep study events and sessions.",
          },
          {
            name: "items",
            label: "Questions and Answers",
            type: "repeater",
            fields: [
              {
                name: "question",
                label: "Question",
                type: "text",
                required: true,
              },
              {
                name: "answer",
                label: "Answer",
                type: "textarea",
                required: true,
              },
            ],
          },
        ],
      },

      {
        name: "events-cta-section",
        label: "CTA Section",
        fields: [
          {
            name: "leftHeading",
            label: "Left Side Heading",
            type: "text",
            required: true,
            placeholder: "Enter left side heading",
          },
          {
            name: "leftSubtitle",
            label: "Left Side Subtitle",
            type: "textarea",
            required: false,
            placeholder: "Enter left side description",
          },
          {
            name: "leftImage",
            label: "Left Side Image",
            type: "file",
            accept: "image/*",
            required: false,
          },
          {
            name: "leftImageAlt",
            label: "Left Image Alt Text",
            type: "text",
            required: false,
            placeholder: "Describe the left side image",
          },
          {
            name: "buttonText",
            label: "CTA Button Text",
            type: "text",
            required: false,
            placeholder: "Enter button text",
          },
          {
            name: "buttonUrl",
            label: "CTA Button Link",
            type: "text",
            required: false,
            placeholder: "Enter destination URL",
          },
        ],
      },
    ],
  },

  caseStudy: {
  name: "Case Study",
  description: "Manage Student Case Study page content",
  require: true,

  sections: [
    {
      name: "case-study-hero-section",
      label: "Hero Section",
      fields: [
        {
          name: "eyebrow",
          label: "Badge / Eyebrow Text",
          type: "text",
          value: "REAL JOURNEYS. REAL PROGRESS.",
        },
        {
          name: "title",
          label: "Hero Heading",
          type: "textarea",
          value: "Every big result starts with one brave step.",
        },
        {
          name: "subtitle",
          label: "Hero Description",
          type: "textarea",
          value:
            "Meet the students behind the milestones. Explore their goals, the preparation that moved them forward, and the moments that made them proud.",
        },
        {
          name: "heroImage",
          label: "Hero Image",
          type: "file",
          accept: "image/*",
        },
        {
          name: "heroImageAlt",
          label: "Hero Image Description",
          type: "text",
        },
        {
          name: "button1Text",
          label: "Primary Button Text",
          type: "text",
          value: "Explore student stories",
        },
        {
          name: "button1Url",
          label: "Primary Button Link",
          type: "text",
          value: "#student-stories",
        },
        {
          name: "button2Text",
          label: "Secondary Button Text",
          type: "text",
          value: "Talk to a counsellor",
        },
        {
          name: "button2Url",
          label: "Secondary Button Link",
          type: "text",
          value: "/contact",
        },
        {
          name: "feature1",
          label: "First Feature Text",
          type: "text",
          value: "Personal preparation journeys",
        },
        {
          name: "feature2",
          label: "Second Feature Text",
          type: "text",
          value: "Student milestones",
        },
      ],
    },

    {
      name: "case-study-stories-section",
      label: "Student Stories Section",
      fields: [
        {
          name: "eyebrow",
          label: "Section Eyebrow",
          type: "text",
          value: "STUDENT STORIES",
        },
        {
          name: "title",
          label: "Section Heading",
          type: "textarea",
          value: "Meet the people behind the progress.",
        },
        {
          name: "subtitle",
          label: "Section Description",
          type: "textarea",
          value:
            "Every learner brings a different starting point. These stories celebrate the goals, effort, and achievements along the way.",
        },
    
      ],
    },

    {
      name: "case-study-faq-section",
      label: "FAQ Section",
      fields: [
        {
          name: "eyebrow",
          label: "FAQ Eyebrow",
          type: "text",
          value: "QUESTIONS, ANSWERED",
        },
        {
          name: "title",
          label: "FAQ Heading",
          type: "textarea",
          value: "A little more about student success.",
        },
        {
          name: "subtitle",
          label: "FAQ Left-Side Description",
          type: "textarea",
          value:
            "Wondering how these journeys are built or where to begin with your own? Start here.",
        },
        {
          name: "items",
          label: "FAQ Questions and Answers",
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
      name: "case-study-blogs-section",
      label: "Latest Blogs Section",
      fields: [
        {
          name: "eyebrow",
          label: "Blog Eyebrow",
          type: "text",
          value: "FRESH FROM THE BLOG",
        },
        {
          name: "title",
          label: "Blog Section Heading",
          type: "text",
          value: "Keep your preparation moving",
        },
        {
          name: "subtitle",
          label: "Blog Section Description",
          type: "textarea",
        },
        {
          name: "buttonText",
          label: "All Articles Button Text",
          type: "text",
          value: "All articles",
        },
        {
          name: "buttonUrl",
          label: "All Articles Button Link",
          type: "text",
          value: "/blog",
        },
      ],
    },

    {
      name: "case-study-final-cta-section",
      label: "Final CTA Section",
      fields: [
        {
          name: "eyebrow",
          label: "Left-Side Badge Text",
          type: "text",
          value: "YOUR STORY STARTS HERE",
        },
        {
          name: "title",
          label: "Left-Side Heading",
          type: "textarea",
          value: "Ready to write your success story?",
        },
        {
          name: "subtitle",
          label: "Left-Side Description",
          type: "textarea",
          value:
            "Tell us what you’re working toward. Our team will help you find a preparation plan that fits your goal, timeline, and next chapter.",
        },
        {
          name: "helperText",
          label: "Left-Side Helper Text",
          type: "text",
          value: "A counsellor will get back to you shortly",
        },
        {
          name: "formTitle",
          label: "Form Heading",
          type: "text",
          value: "Start your success story",
        },
        {
          name: "buttonText",
          label: "Form Submit Button Text",
          type: "text",
          value: "Start my success story",
        },
      ],
    },
  ],
},



};
