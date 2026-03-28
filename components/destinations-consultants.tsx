"use client"

export function DestinationsAndConsultants() {
  const destinations = [
    "UK",
    "USA",
    "Australia",
    "New Zealand",
    "Canada",
    "Dubai",
    "Ireland",
    "Germany",
    "France",
    "Swedan",
    "Spain",
    "Singapore",
    "Italy",
    "Brazil",
  ]
  const cities = [
    "Udaipur",
    "Jodhpur",
    "Bikaner",
    "Delhi",
    "Ajmer",
    "Sikar",
    "Alwar",
    "Kota",
    "Jaipur",
    "Mumbai",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Indore",
    "Bhopal",
    "Gwalior",
    "Noida",
    "Gurugram",
    "Faridabad",
    "Chandigarh",
    "Amritsar",
    "Ludhiana",
    "Patiala",
    "Bathinda"
  ]

  return (
    <section className="py-10 px-6 px-8 lg:px-0 bg-gray-100">
      <div className="sm:px-6 lg:px-8 mx-auto">
        <h3 className="text-3xl font-extrabold text-brand-orange mb-5">
          Choose Your Destination
        </h3>
        <div className="flex flex-wrap gap-4 mb-20">
          {destinations.map((d) => (
            <div
              key={d}
              className="px-6 py-2 rounded-full border-2 border-brand-orange text-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        <h3 className="text-3xl font-extrabold text-brand-orange mb-5">
          Study Abroad Consultants in
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {cities.map((c) => (
            <div
              key={c}
              className="px-2 py-2 rounded-full border-2 border-brand-orange text-gray-600 text-center text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
