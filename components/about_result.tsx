"use client"

const data = [
  {
    "url":"/placeholder-user.jpg",
    name : "Mohak Gupta",
    course : "Gmat score",
    score : "999" 
  },
    {
    "url":"/placeholder-user.jpg",
    name : "Mohak Gupta",
    course : "Gmat score",
    score : "999" 
  },  {
    "url":"/placeholder-user.jpg",
    name : "Mohak Gupta",
    course : "Gmat score",
    score : "999" 
  },  {
    "url":"/placeholder-user.jpg",
    name : "Mohak Gupta",
    course : "Gmat score",
    score : "999" 
  },  {
    "url":"/placeholder-user.jpg",
    name : "Mohak Gupta",
    course : "Gmat score",
    score : "999" 
  },  {
    "url":"/placeholder-user.jpg",
    name : "Mohak Gupta",
    course : "Gmat score",
    score : "999" 
  }
]

export function Aboutresult() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-100" id="about">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        
       {data.map((ele,idx) => (
        <div key={idx} className="shadow-lg p-4 bg-white">
            <img src={ele?.url} className="h-38 w-38  mx-auto" />
            <span className=" text-center flex items-center  capitalize">
              <h2 className="font-bold">{ele?.name}</h2>
              <ul>
                <li className="font-semibold">{ele.course}</li>
                <li className="bg-orange-500 font-bold text-white mx-2">{ele.score}</li>
              </ul>
            </span>
        </div>
       ))}

        {/* <img         
          src={img || "/image/about.jpeg"}
          alt="About Us" 
          className="w-full h-auto "
        /> */}


      </div>
    </section>
  )
}