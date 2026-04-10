  "use client";
import { ChevronDown, CircleCheckBig, CircleX } from "lucide-react";
import Image from "next/image";
import ThreeDButton from "../3dbutton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect, useRef } from "react";

const data = [
  {
    start_date: "Saturday, March 14, 2026",
    end_date: "Friday, March 27, 2026",
  },
  {
    start_date: "Saturday, May 2, 2026",
    end_date: "Friday, May 15, 2026",
  },
  {
    start_date: "Saturday, June 6, 2026",
    end_date: "Friday, June 19, 2026",
  },
  {
    start_date: "Saturday, August 22, 2026",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, September 12, 2026",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, October 3, 2026",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, November 7, 2026",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, December 5, 2026",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, March 6, 2027",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, May 1, 2027",
    end_date: "TBD",
  },
  {
    start_date: "Saturday, June 5, 2027",
    end_date: "TBD",
  },
];

const gerdata = [
  {
    title: "Practice Tests",
    description: "Timed, full-length practice tests from our pool of questions",
  },
  {
    title: "Official Content",
    description:
      "8 full sections worth of licensed official GRE® questions from ETS",
  },
  {
    title: "1600+ Practice Questions",
    description:
      "Learn from your mistakes with a video explanation to every question",
  },
  {
    title: "Expert Video Lessons",
    description: "Prepare for every section, on any device and 100% online",
  },
  {
    title: "Custom Study Schedules",
    description: "Study checklists to stay motivated, 1 week to 6 months long",
  },
  {
    title: "Accurate Score Predictor",
    description: "Be confident when you're ready with our score predictor tool",
  },
];

const priceplan = {
  testimonial:
    "Ooshash prep gets rave reviews from students, many of whom have improved their GRE score with this flexible and affordable plan.",
  pricing_plans: [
    {
      plan_name: "Premium · 1 month",
      subtitle: "Great option for limited study time",
      content_features: [
        "8 full sections of official GRE® questions",
        "290+ video lessons",
        "Over 1600 practice questions",
        "Up to 6 practice tests",
        "Study schedules",
      ],
      access_features: [
        "1 month of access",
        "+5 total score guarantee",
        "Ask an expert",
        "Pause your plan",
      ],
      price: "$99 USD",
    },
    {
      plan_name: "Premium · 1 month",
      is_highlighted: true,
      subtitle: "Great option for limited study time",
      content_features: [
        "8 full sections of official GRE® questions",
        "290+ video lessons",
        "Over 1600 practice questions",
        "Up to 6 practice tests",
        "Study schedules",
      ],
      access_features: [
        "1 month of access",
        "+5 total score guarantee",
        "Ask an expert",
        "Pause your plan",
      ],
      price: "$150 USD",
    },
    {
      plan_name: "Premium · 1 month",
      subtitle: "Great option for limited study time",
      bundle_offer: "Bundle and save $854 ($1073 value)",
      content_features: [
        "8 full sections of official GRE® questions",
        "290+ video lessons",
        "Over 1600 practice questions",
        "Up to 6 practice tests",
        "Study schedules",
      ],
      access_features: [
        "1 month of access",
        "+5 total score guarantee",
        "Ask an expert",
        "Pause your plan",
      ],
      price: "$170 USD",
    },
  ],
};
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      score: 10,
      rating: 5,
      testimonial:
        "Absolutely transformed our workflow! The intuitive design and seamless integration saved us countless hours. Best decision we made this year.",
    },
    {
      id: 2,
      name: "James Chen",
      score: 9,
      rating: 5,
      testimonial:
        "Outstanding service and support. The team went above and beyond to ensure everything was perfect. Highly recommend to anyone looking for quality.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      score: 10,
      rating: 5,
      testimonial:
        "Game-changer for our business. The results exceeded our expectations and the ROI was visible within the first month. Couldn't be happier!",
    },
    {
      id: 4,
      name: "Michael Thompson",
      score: 9,
      rating: 4,
      testimonial:
        "Professional, reliable, and incredibly efficient. They delivered exactly what was promised and more. A pleasure to work with from start to finish.",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      score: 10,
      rating: 5,
      testimonial:
        "From the first consultation to final delivery, the experience was flawless. Their attention to detail and commitment to excellence is unmatched.",
    },
  ];


export default function Gre() {


  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      origin: "center",
      perView: 1.5,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          origin: "center",
          perView: 2.2,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          origin: "center",
          perView: 3,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      timerRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    };

    startAutoPlay();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [instanceRef]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [show, setshow] = useState();

  return (
    <>
      <section
        className="lg:min-h-150 relative overflow-hidden bg-[url('/Gre/bg.jpg')]  bg-cover bg-center
       bg-no-repeat h-60 "
      >
        <div className="max-w-[90%] ml-auto">
          <div className="flex p-10 lg:flex pt-30 items-center rounded-[0_0_0_10rem] h-[60vh] bg-gray-200">
            <div className="w-1/2 relative">
              <span className="text-5xl font-bold ">
                The smartest way to{" "}
                <p className=" my-2 text-orange-600 flex items-center">
                  master the GRE
                  <p className="mx-1 border-2 border-orange-600 rounded-full text-xl flex items-center justify-center h-8 w-8">
                    R
                  </p>
                </p>
              </span>

              <p className=" my-6">
                The original self-paced GRE course. Get Official GRE quetions,
                an Al tutor , video lessons, and top-rated mobile apps at a
                third of the price of other "premium" options.
              </p>

              <button className="bg-black rounded-2xl lg:absolute -bottom-[6rem] left-25 text-lg px-4 py-1 text-white">
                Full courses starts at $99
              </button>
            </div>

            <div className="w-1/2 pt-10">
                <img src="/Gre/main.png" alt="img" />
            </div>
          </div>
        </div>
      </section>

      <Aboutresult />

      <TextTestimonials />

      <section className="max-w-5xl mx-auto flex flex-col my-20  gap-8">
        <div className="flex items-center flex-col gap-4">
          <h4 className="text-lg">We offer more</h4>
          <h2 className="flex gap-2 text-2xl md:text-4xl lg:text-5xl font-bold">
            Better scores. Better{" "}
            <p className="text-[#F36C45]">Price. Guaranteed.</p>
          </h2>
          <p className="text-lg">
            Improve your score by 5 points or your money back.
          </p>
        </div>
        <div className="flex mt-8 gap-8 border-2 justify-evenly rounded-[2rem] px-10 py-8">
          <ul>
            <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
              <CircleCheckBig className="text-orange-600" />
              The only course with official GRE questions
            </li>
            <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
              <CircleCheckBig className="text-orange-600" />
              Get a Magoosh-trained Al tutor that works with ou until you get it
            </li>
            <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
              <CircleCheckBig className="text-orange-600" />
              Video and text-based lessons to support multiple learning styles
            </li>
            <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
              <CircleCheckBig className="text-orange-600" />
              Download our mobile apps to practice on the go{" "}
            </li>
            <li className="flex gap-2 p-2 mb-4 bg-gray-200 rounded">
              <CircleCheckBig className="text-orange-600" />
              Starts at affordable $99
            </li>
          </ul>
          <ul>
            <li className="font-bold text-[#F36C45] mb-6 text-xl">
              other "Premium" Courses
            </li>
            <li className="flex gap-2 mt-4">
              <CircleX className="text-gray-600" />
              No access to real GRE questions
            </li>
            <li className="flex gap-2 mt-4">
              <CircleX className="text-gray-600" />
              No Al support to guide you studying
            </li>
            <li className="flex gap-2 mt-4">
              <CircleX className="text-gray-600" />
              No access to real GRE questions
            </li>
            <li className="flex gap-2 mt-4">
              <CircleX className="text-gray-600" />
              Not optimized for mobile{" "}
            </li>
            <li className="flex gap-2 mt-4">
              <CircleX className="text-gray-600" />
              Costs upwards of $500
            </li>
          </ul>
        </div>
      </section>

      <section
        className="lg:min-h-150 relative overflow-hidden  h-60 "
      >
        <div className="flex p-10 pl-20 lg:flex flex-row-reverse items-center mx-auto h-[60vh] bg-[url('/Gre/bg2.jpg')] pt-20 bg-cover bg-center
       bg-no-repeat">
          <div className="w-1/2 relative text-white px-auto">
            <span className="text-5xl font-bold ">
              Official GRE Questions
              <br /> - only with Ooshash
            </span>

            <p className=" my-6">
              We're the only GRE prep course licensed to use official ETS
              practice questions, so you know you're studying exactly what
              you'll see on test day.
            </p>
          </div>

          <div className="w-1/2  z-10  rounded-full">
            <img src="/Gre/laptop.png" alt="img" />
          </div>
        </div>
      </section>

      <section className=" py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center flex-col">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            <span className="text-gray-700">Study smarter with </span>{" "}
            <span className="text-[#F36C45]">Al</span>{" "}
          </h2>

          <p className="text-gray-600 mb-12 text-lg">
            Get instant, GRE-style essay scoring and targete eedback , chate
            with and expert Al tutor, and practice with Ooshash.
          </p>

          <div className=" flex flex-col gap-6">

          {
            [
              {
              "heading" : "5,000+ Similar Practice Questions",
              "content" : "Missed a question? Get similar, high-quality Al-genrated problems to practice again",
              "img":"/Gre/que.png"
            },
              {
              "heading" : "",
              "content" : "Chat with an Al expert trained on lessons and content and ready to explain whatever you don't grasp.",
              "img":"/Gre/que.png"

            }
          ].map((ele,idx) => (
            <div className={`border-2 rounded-xl w-full flex items-center gap-4  ${idx === 1 && 'flex-row-reverse'}`}>
                <img src={ele.img} alt="img" className="h-1/4" />
                <span className="p-4">
                  <h2>
                    {ele.heading}
                  </h2>
                  <p>{ele.content}</p>
                </span>
            </div>
          ))
          }

          </div>
        </div>
      </section>

      <section className="max-w-5xl  mx-auto my-20">
        <div className="rounded-lg border-2">
          <button
            type="button"
            onClick={() => setshow(!show)}
            className="flex items-center gap-2 text-white font-bold text-xl  rounded-lg bg-gray-600 w-full justify-between "
          >
            <p className="pl-20">
              {" "}
              Choose the best schedule for your test date!{" "}
            </p>
            <p className="rounded-lg px-6 py-4 bg-[#F36C45]">
              {show && "Hide"} GRE Test Dates
            </p>
          </button>

          {show && (
            <table className="w-[90%] mx-auto my-6">
              {data.map((ele, idx) => (
                <tr key={idx}>
                  <td className="">{ele.start_date}</td>
                  <td className="text-center">{ele.end_date}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </section>

      <section
        className=" relative overflow-hidden bg-[url('/Gre/orangebg.jpg')]  bg-cover bg-start
       bg-no-repeat h-[100vh] "
      >
        <div className="flex justify-center items-center flex-col w-full mt-20">
          <span className="text-5xl font-bold ">
            <p className=" my-2 flex items-center">
              Improve Your GRE
              <p
                className="mx-1 border-2 border-orange-600 rounded-full text-xl 
                     flex items-center justify-center h-8 w-8"
              >
                R
              </p>
              Score,
            </p>
            <p className="text-[#F36C45] text-center">Guaranted!</p>
          </span>

          <p className=" my-6">
            Prep smart at an affordable price. fully optimized for the shorter
            GRE.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-6 mx-auto mt-10">
          {gerdata.map((ele, idx) => (
            <div
              key={idx}
              className="  text-black/80 flex flex-col relative isolate shadow-sm"
            >
              <span className="absolute top-0 -left-2 h-18 w-12 bg-orange-600 rounded-2xl z-[-1]" />
              <div className="p-8 bg-white border rounded-xl">
                <h3 className="font-bold text-xl mb-2">{ele.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {ele.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PricingSection plans={priceplan.pricing_plans} />

      <section className="max-w-6xl mx-auto px-6 py-20 font-sans text-center">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Turn any free minute into{" "}
            <span className="text-[#ff5733]">study time</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Review key vocab with our Flashcard App or dive into lessons and
            practice using the Prep-on-the-Go App.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <div className="w-6 h-6 opacity-60">
              <img src="/image/app-store.png" alt="Apple" />
            </div>
            <div className="w-6 h-6 opacity-60">
              <img src="/image/play-store.png" alt="Android" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="group">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Flashcard App
            </h3>
            <p className="text-gray-500 mb-8">
              Study the words you'll face on test day — no fluff or
            </p>
            <div className="relative h-64 bg-gray-50 rounded-[32px] overflow-hidden flex items-center justify-center"></div>
          </div>

          <div className="group">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Prep-on-the-Go App
            </h3>
            <p className="text-gray-500 mb-8">
              Access our video lessons & practice questions
            </p>
            <div className="relative h-64 bg-gray-50 rounded-[32px] overflow-hidden flex items-center justify-center"></div>
          </div>
        </div>

        <p className="text-[#ff5733] font-semibold text-sm uppercase tracking-wide mb-8">
          Video based learning
        </p>

        <div className="bg-gray-50 rounded-[48px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-left max-w-4xl relative">
          <div className="flex-1 text-center max-w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Video explanations for
              <p className="text-[#F36C45]">every question</p>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Want to go further? We also include 290+ curated lessons shaped by
              student feedback to deliver material in the way you learn best.
            </p>
          </div>

          <div className="flex-1 w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 absolute -right-34 top-20 h-44 border border-gray-50"></div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 font-sans">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            More students choose <br />
            <span className="text-[#ff5733]">Ooshash prep</span> than anyone{" "}
            <br />
            else.
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Check out what others say about us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="md:col-span-2 flex flex-col md:flex-row items-center bg-white p-8 relative ">
            <div className="z-10 relative w-full md:w-1/3 md:ml-40 aspect-square bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-gray-300">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <div
                  className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gray-800 
              border-b-[8px] border-b-transparent ml-1"
                />
              </div>

              {/* <div className="absolute inset-0 bg-gradient-to-t from-red/20 to-transparent" /> */}
            </div>

            <div
              className="border-2 border-gray-500 rounded-3xl md:w-1/2  mt-6 md:mt-0 text-left md:absolute
            top-[7rem] pl-[10rem] pr-10 pt-10 right-[10rem] h-[75%] "
            >
              <div className="hidden md:block w-1/2 absolute -top-3 left-0 rounded-[0_1rem] h-3 bg-[#F36C45]" />

              <p className="text-gray-700 text-xl leading-relaxed mb-4 ">
                "The best thing for me about Ooshash prep was the flexibility...
                Ooshash being within my price range was the difference between
                me potentially getting into grad school and not getting in
                anywhere."
              </p>
              <div className="flex justify-between items-center ">
                <span>
                  <p className="font-bold text-gray-900">Eleanore P.</p>
                  <p className="text-sm text-gray-500">
                    Ooshash Student - 2021
                  </p>
                </span>
                <img src="/Gre/002.png" alt="img" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-left">
            <p className="text-gray-600 mb-6 text-xl">
              "Vast question bank provided for various levels of questions with
              helpful explanations. Also, the AI tutor helped clear any further
              doubts."
            </p>
            
              <div className="flex justify-between items-center ">
                <span>
                  <p className="font-bold text-gray-900">Eleanore P.</p>
                  <p className="text-sm text-gray-500">
                    Ooshash Student - 2021
                  </p>
                </span>
                <img src="/Gre/002.png" alt="img" />
              </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-left">
            <p className="text-gray-600 mb-6 text-xl">
              "There were plenty of practice questions and tests available, and
              everything was super easy to use! A bonus is that Magoosh has
              official ETS practice sections..."
            </p>
            
              <div className="flex justify-between items-center ">
                <span>
                  <p className="font-bold text-gray-900">Eleanore P.</p>
                  <p className="text-sm text-gray-500">
                    Ooshash Student - 2021
                  </p>
                </span>
                <img src="/Gre/002.png" alt="img" />
              </div>
          </div>
        </div>
      </section>

      <DestinationsAndConsultants />
    </>
  );
}

import { Star } from "lucide-react";
import { Aboutresult } from "../about_result";
import { TextTestimonials } from "../testimonial_gre";
import PricingSection from "../plan";
import { DestinationsAndConsultants } from "../destinations-consultants";

function TestimonialCard({ name, score, rating, testimonial, isActive }) {
  return (
    <div
      className={`
        relative max-w-[520px] rounded-3xl bg-white px-6 py-20
        transition-all duration-500 ease-out
        ${
          isActive
            ? "border-2 border-[#F36C45] shadow-2xl scale-100 opacity-100 z-20"
            : "border border-orange-300 scale-90 opacity-40 blur-[1.5px] z-10 -mx-8 "
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-xl text-[#F36C45]">
          {name}: {score}
        </span>

        <div className="flex gap-1 ml-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "fill-[#F36C45] text-[#F36C45]" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <p className="text-gray-600 text-lg font-semibold leading-relaxed">
        {testimonial}
      </p>
    </div>
  );
}
