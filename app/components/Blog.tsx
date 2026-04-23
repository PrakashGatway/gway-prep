"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogSlider } from "./blog-slider";
import { Consultants } from "./destinations-consultants";

// Default categories and blogs as fallback
const defaultCategories = [
  "ALL",
  "UK",
  "USA",
  "IRELAND",
  "DUBAI",
  "CANADA",
  "VISA",
  "NEW ZEALAND",
  "PTE",
  "SAT",
];

const defaultBlogs = [
  {
    id: 1,
    title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
    slug: "day-1-cpt-programs-usa",
    details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 2,
    title: "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    slug: "day-1-cpt-programs-usa",
    details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 3,
    title: "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
    slug: "day-1-cpt-programs-usa",
    details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 4,
    title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
    details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 5,
    title: "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 6,
    title: "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
    details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
];

const formFields = [
  { type: "text", label: "Name" },
  { type: "text", label: "Location" },
  { type: "tel", label: "Phone Number" },
  { type: "email", label: "Email" },
  { type: "text", label: "Course looking for" },
  { type: "text", label: "Country looking for" },
  { type: "text", label: "Enquiry Regarding" },
  { type: "textarea", label: "Your Message" },
];

const appInfoData = [
  {
    heading: "27M+ App Downloads",
    content: "Join millions of learners worldwide",
  },
  {
    heading: "4.8+ App Rating",
    content: "Rated highly by our users.",
  },
];

export default function Blog({ pageInfo }: { pageInfo: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filteredBlogs, setFilteredBlogs] = useState(defaultBlogs);

  // Extract sections from pageInfo
  const heroSection = pageInfo?.sections?.["Home-hero-section"]?.fields || {};
  const recentSection = pageInfo?.sections?.["Resent-section"]?.fields || {};
  const appInfoSection = pageInfo?.sections?.["AppInfo"]?.fields || {};
  const seoMeta = pageInfo?.seoMeta || {};

  // Get dynamic content with fallbacks
  const heroTitle = heroSection.title || "BLOGS";
  const heroSubtitle = heroSection.subtitle || "Ooshas prep";
  const heroParagraph = heroSection.paragraph || "";
  const heroImage = heroSection.heroImage || "/image/01.png";
  const bgImage = heroSection.bgImage || "/image/03.jpeg";

  // Get blogs from section data or use defaults
  const blogs = recentSection.blogs || recentSection.items || defaultBlogs;
  const categories = recentSection.categories || defaultCategories;

  // Get app info data
  const appInfo = appInfoSection.items || appInfoData;
  const appInfoTitle = appInfoSection.title || "All the Resources you need for the Complete Exam Prep";
  const appInfoDescription = appInfoSection.description || "Achieve excellence with a platform designed for comprehensive preparation.";
  const appImage = appInfoSection.image || "/image/02.png";
  const aboutImage = appInfoSection.aboutImage || "/image/about.jpeg";

  // Filter blogs based on search and category
  useEffect(() => {
    let filtered = Array.isArray(blogs) ? [...blogs] : [];

    if (searchQuery) {
      filtered = filtered.filter(
        (blog: any) =>
          blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.details?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(
        (blog: any) =>
          blog.category?.toUpperCase() === selectedCategory.toUpperCase()
      );
    }

    setFilteredBlogs(filtered);
  }, [searchQuery, selectedCategory, blogs]);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <section>
      {/* Hero Section */}
      <div className="lg:relative h-[80vh] bg-gray-200">
        <div
          className="h-[40vh] bg-cover bg-center bg-no-repeat md:rounded-[0_0_8rem_8rem]"
          style={{ backgroundImage: `url('${bgImage}')` }}
        >
          <div className="flex lg:pl-40 justify-center lg:justify-start items-center h-full w-full bg-black/60 text-white md:rounded-[0_0_8rem_8rem]">
            <span>
              {heroSubtitle && (
                <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center">
                  {heroSubtitle}
                </h2>
              )}
              <h1 className="font-extrabold text-5xl md:text-6xl lg:text-8xl">
                {heroTitle}
              </h1>
              {heroParagraph && (
                <p className="mt-4 text-lg max-w-2xl">{heroParagraph}</p>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap lg:pl-40">
          {/* Search Bar */}
          <div className="lg:max-w-[40rem] my-4 flex items-center justify-center border-2 border-black gap-2 bg-white lg:rounded-full w-full h-10 lg:h-20 px-10 text-gray-800 lg:text-xl">
            <Search />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className="font-semibold text-black"
              onClick={() => setSearchQuery(searchQuery)}
            >
              Search
            </button>
          </div>

          {heroImage && (
            <img
              src={heroImage}
              alt="Hero"
              className="lg:h-[30rem] lg:absolute top-10 right-14"
            />
          )}
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8 px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blog Posts and Enquiry Form */}
      <div className="flex items-start flex-wrap md:flex-nowrap mt-14 gap-4 md:max-w-7xl mx-auto">
        {/* Blog Posts List */}
        <div className="flex flex-col flex-nowrap gap-4 p-2 flex-1">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((ele: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4 p-4 rounded-xl bg-gray-100 hover:shadow-lg transition-all"
              >
                <img
                  src={ele.image || "/image/blog-img.jpg"}
                  alt={ele.title}
                  className="rounded-xl h-48 w-94 object-cover"
                />
                <ul className="space-y-2">
                  <li className="text-sm text-gray-500">
                    {ele.date || ele.publishedDate}
                  </li>
                  <li className="font-bold text-lg text-gray-800">
                    <Link href={`/blog/${ele.slug || ele.id}`}>
                      {ele.title}
                    </Link>
                  </li>
                  <li className="text-gray-600 line-clamp-2">
                    {ele.details || ele.excerpt}
                  </li>
                  <li>
                    <Link
                      href={`/blog/${ele.slug || ele.id}`}
                      className="inline-block bg-orange-500 rounded-full px-4 py-2 text-white font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Read More
                    </Link>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No blogs found</p>
            </div>
          )}
        </div>

        {/* Enquiry Form */}
        <form
          onSubmit={handleFormSubmit}
          className="md:w-1/3 bg-gray-100 rounded-xl m-2 p-4 space-y-4 sticky top-4"
        >
          <h1 className="font-bold my-4 text-lg">SEND AN ENQUIRY</h1>
          {formFields.map((ele, idx) =>
            ele.type === "textarea" ? (
              <textarea
                key={idx}
                placeholder={ele.label}
                className="w-full border-2 bg-white border-gray-200 px-4 py-2 rounded-lg"
                rows={4}
              />
            ) : (
              <input
                key={idx}
                type={ele.type}
                placeholder={ele.label}
                className="w-full border-2 bg-white border-gray-200 px-4 py-2 rounded-lg"
              />
            )
          )}

          <label htmlFor="check" className="text-sm text-gray-600 flex gap-2">
            <input type="checkbox" name="check" id="check" className="mt-1" />
            <span>
              I agree and authorize the team to contact me over phone, email,
              SMS & WhatsApp.
            </span>
          </label>
          <button
            type="submit"
            className="w-full bg-orange-500 py-2 my-2 text-white rounded-xl text-center hover:bg-orange-600 transition-colors"
          >
            SEND
          </button>
        </form>
      </div>

      {/* Blog Slider */}
      <div className="max-w-7xl mx-auto mt-10">
        <BlogSlider blogs={blogs} />
      </div>

      {/* App Info Section */}
      <div className="bg-black/80 text-white lg:relative mt-10">
        <div className="flex justify-between items-center flex-wrap gap-4 md:max-w-7xl mx-auto px-4">
          <div className="space-y-4 my-18 text-center md:text-left">
            <h2 className="font-semibold text-xl md:text-2xl">
              {appInfoTitle}
            </h2>
            <p className="text-sm text-gray-300">{appInfoDescription}</p>

            <ul className="space-y-4">
              {appInfo.map((ele: any, idx: number) => (
                <li
                  key={idx}
                  className="flex justify-center md:justify-start items-start gap-3"
                >
                  <span className="text-orange-500 text-2xl">•</span>
                  <div>
                    <h3 className="font-semibold">{ele.heading}</h3>
                    <p className="text-xs text-gray-300">{ele.content}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-x-4 space-y-4">
              <input
                type="text"
                placeholder="Your Mobile Number"
                className="bg-white text-black rounded-lg px-4 py-2"
              />
              <button
                type="button"
                className="bg-orange-500 text-white font-medium rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors"
              >
                Get App Link
              </button>
            </div>
          </div>

          {appImage && (
            <img
              src={appImage}
              alt="App"
              className="lg:absolute -top-30 right-30 md:h-[30rem]"
            />
          )}
        </div>
      </div>

      {/* About Image Section */}
      {aboutImage && (
        <div className="my-20 max-w-7xl mx-auto px-4">
          <img
            src={aboutImage}
            alt="About"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Consultants Section */}
      <Consultants />
    </section>
  );
}