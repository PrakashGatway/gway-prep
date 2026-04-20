"use client"

import { getBlogCategory } from '@/app/services/api';
import { useRouter } from 'next/navigation'
import React,{useState,useEffect} from 'react'

const Blog = () => {
  const route = useRouter();
  const [categories, setCategories] = useState<any[]>([]);

  // ✅ FETCH
  const fetchCategories = async () => {
    try {
      const res = await getBlogCategory();
      setCategories(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  return (
       <div className="p-6 min-h-screen bg-gray-100">
         {/* HEADER */}
         <div className="flex justify-between mb-6">
           <h1 className="text-2xl font-bold">Blogs </h1>
           <div className='space-x-2'>
            
           <button
             onClick={() => route.push('/admin/pages/Blogs/category')}
             className="bg-green-600 text-white px-4 py-2 rounded"
           >
             Create Category
           </button>
           <button
             onClick={() => route.push('/admin/pages/Blogs/category')}
             className="bg-green-600 text-white px-4 py-2 rounded"
           >
             Create Blog
           </button>
           </div>
         </div>
   
         {/* DROPDOWN */}
         <select className="p-2 border rounded mb-6 w-64">
           <option value="">Select Category</option>
           {categories.map((cat) => (
             <option key={cat._id} value={cat._id}>
               {cat.name}
             </option>
           ))}
         </select>
   
         {/* LIST */}
         {/* <div className="bg-white p-4 rounded shadow">
           {categories.length === 0 ? (
             <p>No categories found</p>
           ) : (
             categories.map((cat) => (
               <div
                 key={cat._id}
                 className="flex justify-between border-b py-2"
               >
                 <span>{cat.name}</span>
   
                 <button
                   onClick={() => handleDelete(cat._id)}
                   className="text-red-500"
                 >
                   <Trash />
                 </button>
               </div>
             ))
           )}
         </div> */}
   
         
       </div>
  )
}

export default Blog