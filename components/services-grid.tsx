"use client"

import {
  Users,
  UserCheck,
  BarChart,
  BookOpen,
  Clock,
  ThumbsUp,
  Activity,
  IndianRupee,
} from "lucide-react"

const services = [
  { Icon: Users, title: "Experienced and qualified coaches" },
  { Icon: UserCheck, title: "Personalized attention" },
  { Icon: BarChart, title: "Proven track record of success" },
  { Icon: BookOpen, title: "Comprehensive study materials" },
  { Icon: Clock, title: "Flexible scheduling" },
  { Icon: ThumbsUp, title: "Positive student testimonials" },
  { Icon: Activity, title: "Regular progress tracking" },
  { Icon: IndianRupee, title: "Affordable fees" },
]

export function ServicesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-2">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-20">
          <span className="text-brand-orange">Best in the Industry</span>{" "}
          <span className="text-gray-700">Coaching Services</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-brand-orange/40">
          {services.map((service, index) => {
            const Icon = service.Icon

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center px-6 py-12
                           border-r border-b border-brand-orange/40"
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon
                    size={44}
                    strokeWidth={1.5}
                    className="text-brand-orange"
                  />
                </div>

                {/* Text */}
                <p className="text-gray-600 font-medium leading-snug max-w-[180px]">
                  {service.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
