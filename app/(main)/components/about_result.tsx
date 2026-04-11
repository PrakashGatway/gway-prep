"use client";

import { motion } from "framer-motion";

const data = [
  {
    url: "/students/01.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/02.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/03.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/04.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/05.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/06.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/07.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/08.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/09.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
  {
    url: "/students/10.jpg",
    name: "Mohak Gupta",
    course: "Gmat score",
    score: "999",
  },
];

export function Aboutresult() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#EAEAEA]" id="about">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {data.map((ele, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }} // ones: true for the one time
            transition={{
              duration: 0.6,
              delay: idx * 0.1, // 0.1s gap between each item
            }}
          >
            <div key={idx} className="shadow-lg py-4 px-2 bg-white">
              <img src={ele?.url} className="h-48 w-44  mx-auto" />
              <span className=" text-center flex items-center  capitalize">
                <h2 className="font-bold">{ele?.name}</h2>
                <ul>
                  <li className="font-semibold">{ele.course}</li>
                  <li className="bg-[#F36C45] font-bold text-white mx-2">
                    {ele.score}
                  </li>
                </ul>
              </span>
            </div>
          </motion.div>
        ))}

        {/* <img         
          src={img || "/image/about.jpeg"}
          alt="About Us" 
          className="w-full h-auto "
        /> */}
      </div>
    </section>
  );
}
