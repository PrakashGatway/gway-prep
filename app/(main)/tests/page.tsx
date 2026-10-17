import SATCourses from "@/components/sat-courses/courses";
import TestSeries from "@/components/test-series/testSeries";
import Test from "@/components/tests/testCompoent";
import { getServerInstance } from "@/services/axiosInstance";

export default async function TestPage({ searchParams }) {
  let Courses = [];
  let Category = [];
  let AllCourses = [];
  let isSat = null;
  const api = await getServerInstance();


  // Next.js 15/16: searchParams can be a Promise
  const params = await searchParams;

  const search = params?.search || "";
  const sort = params?.sort || "";

  try {
    // 1. Get categories
    const categoryRes = await api.get("/categories");
    Category = categoryRes.data?.data || [];

    // 2. Get all courses
    const allCourseRes = await api.get("/mcu/test");

    console.log(allCourseRes, "res");
    AllCourses = allCourseRes.data?.data || [];

    // 3. Find SAT category
    isSat = Category.find((cat) => cat.name?.toLowerCase() === "sat");

    // 4. Get SAT courses
    if (isSat?._id) {
      const courseRes = await api.get("/mcu/test", {
        params: {
          category: isSat._id,
          search,
          sort,
          limit: 20,
        },
      });

      Courses = courseRes.data?.data || [];
    }
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Error:", error.response?.data);
    console.log("Message:", error.message);
  }

  // console.log("All Test Series:", Category);

  return (
    <Test
      courses={Courses}
      categories={isSat}
      allCourses={AllCourses}
      isSat={isSat}
    />
  );
}
