"use client";

const data = [
  {
    "name": "Akash Vikram",
    "education": {
      "university": "Carnegie Mellon University",
      "test_score": {
        "exam": "GMAT",
        "score": 760
      },
      logo : "/university.jpg"
    },
    "partnership_details": {
      "service_provider": "Ooshash",
      "support_offered": [
        "Offered him early morning classes to accommodate his work schedule",
        "Provided personalised sessions post-classes to increase his accuracy and speed",
        "Aided his prep through concept videos, sectional & full-length tests, solutions, and analytics of his performance via smart online learning portal",
        "Shortlisted MBA programs that suited his requirements",
        "Conducted brainstorming sessions with editors to write strong essays"
      ]
    },
    "outcome": {
      "admission": "Carnegie Mellon University",
      "business_school": "Tepper School of Business",
      "financial_aid": "$20,000 Scholarship"
    },
    "affiliations": [
      "University of Applied Sciences Europe"
    ]
  }
];

export function HomeStudent() {
  const student = data[0];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto lg:bg-[#F3F4F6] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row gap-8 
      relative overflow-hidden">
        
        
        <div className="md:w-1/3 flex flex-col items-center ">
          <div className="relative mb-6">
            
            <div className="absolute -top-4 -right-18 w-6 h-6 bg-[#FF6B35] rounded-md" />
            <div className="absolute top-1/2 -left-16 w-12 h-12 bg-[#FF6B35] rounded-md" />
            <div className="absolute -bottom-2 -right-14 w-12 h-12 border-2 border-gray-300 rounded-xl" />
            
            
            <div className="w-38 h-38 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-sm">
              <img
                src="/students/01.jpg" 
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-[#FF6B35] text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600 text-lg">{student.education.university}</p>
            <p className="text-gray-600 text-lg font-semibold uppercase tracking-wider">
              {student.education.test_score.exam} {student.education.test_score.score}
            </p>
          </div>

          {/* Affiliation Logo */}
          
            <img src={student.education.logo} alt="logo" className="h-20 w-full mt-8 mx-auto" />
            
        </div>

        {/* Right Section: Content Cards */}
        <div className="md:w-2/3 flex flex-col gap-6">
          
          {/* Support Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-[#FF6B35] font-bold mb-4">
              How did {student.partnership_details.service_provider} help {student.name.split(' ')[0]}?
            </h3>
            <ul className="space-y-3">
              {student.partnership_details.support_offered.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="text-[#FF6B35]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-[#FF6B35] font-bold mb-4">Outcome</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm text-gray-700 font-medium">
                <span className="text-[#FF6B35]">•</span> {student.outcome.admission}
              </li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium">
                <span className="text-[#FF6B35]">•</span> {student.outcome.business_school}
              </li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium">
                <span className="text-[#FF6B35]">•</span> {student.outcome.financial_aid}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
