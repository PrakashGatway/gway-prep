"use client"

import { useState } from "react"


export default function ContactUs(){

     const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", phone: "", city: "", message: "" })
  }

  const infoCards = [
  {
    // icon: Phone,
    title: "Call Us",
    details: ["+91-8302092630", "9001571113", "9166144321"],
    bgColor: "from-orange-50 to-white",
  },
  {
    // icon: Mail,
    title: "Email Us",
    details: ["jaipur@gatewayabroad.in"],
    bgColor: "from-orange-50 to-white",
  },
  {
    // icon: MapPin,
    title: "Office Address",
    details: ["105, first floor, Geetanjali Tower, Ajmer Road, Civil Lines, Jaipur, Rajasthan 302006"],
    bgColor: "from-orange-50 to-white",
  },
]


const branches = [
  {
    city: "Ahmedabad",
    address: "4th Floor, Silver Square Complex, Gangotri Circle Road, Nikol, Above Lg Showroom, Ahmedabad - 380024",
  },
  {
    city: "Bengaluru",
    address:
      "Future Abroad, No.54/25, 1st Floor, opp. Jain Temple, 8th E main road, 4th block, Jayanagar, Bengaluru, Karnataka 560011",
  },
  {
    city: "Coimbatore",
    address: "No. 135, 5th Street, (Opp. to Kalyan Silks) 100 Ft Road, Gandhipuram, Coimbatore - 641 012, India",
  },
  {
    city: "Delhi",
    address: "1st Floor, 6/15, East Patel Nagar, New Delhi - 110 008",
  },
  {
    city: "Gurugram",
    address: "718, 2nd Floor, Sector 42, Golf Course Road, Gurugram - 122002",
  },
  {
    city: "Kolkata",
    address: "Ground Floor, Constantia Bldg, 11, Dr. U.N.Brahmachari Road (Rowdon Street), Near Minto Park, Kolkata",
  },
  {
    city: "Mumbai",
    address:
      "The Place, 1st Floor, Marathon Maxima, Lal Bahadur Shastri Road, Moti Nagar, Mulund West, Mumbai - 400 080",
  },
  {
    city: "Pune",
    address:
      "Siddhi Arcade, C-2, Mumbai Pune Bypass Road, Narhe Gaon, Ambegaon BK, Pune, Maharashtra - 411 046 Near Royal Yi Thai Spa, Narhe Gaon",
  },
  {
    city: "Navi Mumbai",
    address:
      "Shop No. 21, Sal Sthaan CHS Ltd, Plot No. 4, 5 & 6, Opp. Cidco Office, Sector - 29, Nerul (East), Navi Mumbai - 400 706",
  },
  {
    city: "Rajkot",
    address:
      "407, 4th floor, Plus Point Complex, above Dress Wala showrooms, opposite Blue Club Men's Showroom, Dr Yagnik Road, Rajkot - 360001",
  },
  {
    city: "Vadodara",
    address: "401, Darpan Apartment, RC Dutt Rd, Above Sukhadia Sweets, Near Express Hotel, Alkapuri, Gujarat - 390007",
  },
]



    return(
        <>
        <section className="relative w-full py-16 md:py-24 bg-[url('/image/bg-test-pre.jpg')]
    bg-cover
    bg-center
    bg-no-repeat">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Contact <span style={{ color: "#e87a4d" }}>Us</span>
          </h1>
          <p style={{ color: "#666666" }} className="text-lg md:text-xl max-w-2xl mx-auto">
            Ready to start your study abroad journey? Get in touch with our expert counselors today.
          </p>
        </div>
      </div>
    </section>

     <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              We're Here, <span style={{ color: "#e87a4d" }}>Let's Talk</span>
            </h2>
            <p style={{ color: "#666666" }} className="text-lg leading-relaxed">
              No matter what's bothering you, Our experienced counsellors of the top study abroad destinations are here
              to solve your every doubt regarding studying abroad. Call us at any time or stop by one of our branches to
              see us.
            </p>
            <div className="pt-6">
              <img src="https://img.freepik.com/premium-vector/vector-characters-teenage-couple-talking-simple-minimalist-flat-design-style_995281-2526.jpg?semt=ais_hybrid&w=740&q=80" alt="Contact illustration" className="w-full max-w-md" />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-900 placeholder-gray-500"
                  style={{ borderColor: "#ddd" }}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-900 placeholder-gray-500"
                  style={{ borderColor: "#ddd" }}
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile No."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-900 placeholder-gray-500"
                  style={{ borderColor: "#ddd" }}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-900 placeholder-gray-500"
                  style={{ borderColor: "#ddd" }}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-900 placeholder-gray-500 resize-none"
                  style={{ borderColor: "#ddd" }}
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: "#e87a4d" }}
                className="w-full py-3 rounded-lg text-white font-bold text-base hover:opacity-90 transition-opacity duration-200"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>


    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in touch</h2>
          <p style={{ color: "#666666" }} className="text-base md:text-lg max-w-3xl mx-auto">
            We believe in being the best ally to our students. When we say, "quality education is a right and not a
            luxury," we mean it in every sense. No matter what's bothering you, Our experienced counsellors of the top
            study abroad destinations are here to solve your every doubt regarding studying abroad. Call us at any time
            or stop by one of our branches to see us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {infoCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                className={`p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div style={{ backgroundColor: "#e87a4d" }} className="p-4 rounded-full">
                    {/* <Icon className="w-6 h-6 text-white" /> */}
                  </div>
                  <h3 style={{ color: "#e87a4d" }} className="text-xl font-bold">
                    {card.title}
                  </h3>
                  <div className="space-y-2">
                    {card.details.map((detail, i) => (
                      <p key={i} style={{ color: "#666666" }} className="text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>


      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Branches</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div style={{ backgroundColor: "#e87a4d" }} className="p-3 rounded-full flex-shrink-0">
                  {/* <MapPin className="w-5 h-5 text-white" /> */}
                </div>
                <div>
                  <h3 style={{ color: "#e87a4d" }} className="font-bold text-lg mb-2">
                    {branch.city}
                  </h3>
                  <p style={{ color: "#666666" }} className="text-sm leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
        </>
    )
}