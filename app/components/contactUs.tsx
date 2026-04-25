"use client";

import { PartnerSection } from "./partner-section";
import { Phone, Mail, MapPin } from 'lucide-react'; 

export default function ContactUs({Data}:any) {

  
  const infoCards = [
    {
      title: "Call Us",
      icon: Phone,
      details: ["+91 12345 67890", "+91 09876 54321"]
    },
    {
      title: "Email Us",
      icon: Mail,
      details: ["info@gatewayabroad.com", "support@gatewayabroad.com"]
    }
  ];


  return (
    <>
    
      <section className="relative py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Contact <span className="text-[#F36C45]">Us</span>
          </h1> */}
          <div dangerouslySetInnerHTML={{__html : Data['hero-section'].fields.title}} className="text-4xl md:text-6xl font-bold text-gray-900"/>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            { Data['hero-section'].fields.subtitle}
          </p>
        </div>
      </section>

      


      <PartnerSection />
      
    
    <section className="py-20 px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content & Visual */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                We're Here, <span style={{ color: "#e87a4d" }}>Let's Talk</span>
              </h2> */}
              <div dangerouslySetInnerHTML={{__html: Data['Contectus-detils'].fields.title}} />
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                {Data['Contectus-detils'].fields.subtitle}  
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="https://img.freepik.com/premium-vector/vector-characters-teenage-couple-talking-simple-minimalist-flat-design-style_995281-2526.jpg"
                alt="Contact illustration"
                className="relative w-full max-w-md rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Right Column: Map & Info Cards */}
          <div className="space-y-6">
            {/* Map Container */}
            <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white p-2">
              <iframe
                title="Gateway Abroad location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8454158773748!2d75.77696207522415!3d26.908400676649794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40cd42722ff%3A0xcfc3ab392fa9adf7!2sGateway%20Abroad%20Education%20%7C%20Study%20Abroad%20Consultants%20%7C%20IELTS%20GRE%20GMAT%20SAT%20TOEFL%20PTE%20Coaching%20%7C%20Spoken%20English%20Class!5e0!3m2!1sen!2sin!4v1777016093406!5m2!1sen!2sin"
                className="w-full h-64 rounded-xl"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>

            {/* Info Cards Grid */}
            <div className="grid gap-4">
              {Data['Contectus-detils'].fields['contect-details'].map((card, index) => (
                <div
                  key={index}
                  className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300"
                >
                  <div 
                    style={{ backgroundColor: "#fdf1ec" }} 
                    className="p-4 rounded-xl mr-6"
                  >
                    <card.icon size={24} style={{ color: "#e87a4d" }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      {card.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4">
                      {card.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>

    </>
  );
}
