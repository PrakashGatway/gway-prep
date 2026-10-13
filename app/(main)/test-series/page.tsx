import SATCourses from "@/components/sat-courses/courses";
import TestSeries from "@/components/test-series/testSeries";
import { serverInstance } from "@/services/axiosInstance";

export default async function TestseriesPage({ searchParams }) {
  let Courses = [];
  let Category = [];
  let AllCourses = [];
  let isSat = null;

  // Next.js 15/16: searchParams can be a Promise
  const params = await searchParams;

  const search = params?.search || "";
  const sort = params?.sort || "";

  try {
    // 1. Get categories
    const categoryRes = await serverInstance.get("/categories");
    Category = categoryRes.data?.data || [];

    // 2. Get all courses
    const allCourseRes = await serverInstance.get("/mcu/series", {
      params: {
        limit: 20,
      },
    });

    AllCourses = allCourseRes.data?.data || [];

    // 3. Find SAT category
    isSat = Category.find(
      (cat) => cat.name?.toLowerCase() === "sat"
    );



    // 4. Get SAT courses
    if (isSat?._id) {
      const courseRes = await serverInstance.get("/mcu/series", {
        params: {
          category: isSat._id,
          search,
          sort,
          limit: 20,
        },
      });

      Courses = courseRes.data?.data || [];
    }
  } catch (err) {
    console.error("CoursesPage err:", err);
  }


  console.log("All Test Series:", Courses);

  return (
    <TestSeries
      courses={Courses}
      categories={isSat}
      allCourses={AllCourses}
    />
  );
}