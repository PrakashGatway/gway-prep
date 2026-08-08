

// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import Auther from "@/components/auther";
// import axiosInstance from "@/app/lib/axios";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// const SITE_URL = "https://ooshasprep.com";

// async function getBlogData(slug: string) {
//   try {
//     const response = await axiosInstance.get(`/admin/auther/`,{});
//     return response.data;
//   } catch (error) {
//     console.error("Blog fetch error:", error);
//     return null;
//   }
// }

// async function getRelatedBlogs() {
//   try {
//     const response = await axiosInstance.get(
//       `/admin/blogs?page=1&limit=4`
//     );

//     return response.data?.data || [];
//   } catch (error) {
//     console.error("Related blogs fetch error:", error);
//     return [];
//   }
// }



// export default async function BlogDetailsPage({
//   params,
// }: PageProps) {
//   const { slug } = await params;

//   // Fetch related blogs
//   const res = await getRelatedBlogs();

 

//   return (
//     <>
    

//       <Auther
//         blog={blog}
//         loading={false}
//         res={res}
//         slug={slug}
//       />
//     </>
//   );
// }
  


import React from 'react'

function page() {
  return (
    <div>Auther</div>
  )
}

export default page
