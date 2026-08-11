






import axiosInstance from "../lib/axios";

export const createStudent = async (data: any) => {
    const res = await axiosInstance.post("/admin/student", data);
    return res.data;
};

export const getStudent = async (query = "", page = 1, limit = 10) => {
    const res = await axiosInstance.get(
        `/admin/student?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    return res.data;
};

export const deleteStudent = async (id: string) => {
    const res = await axiosInstance.delete(`/admin/student?id=${encodeURIComponent(id)}`);
    return res.data;
};

export const createBlogCategory = async (data: any) => {
    const res = await axiosInstance.post("/admin/bloginfo", data);
    return res.data;
};

export const getBlogCategory = async () => {
    const res = await axiosInstance.get("/admin/bloginfo");
    return res.data;
};

export const deleteBlogCategory = async (id: string) => {
    const res = await axiosInstance.delete(`/admin/bloginfo?id=${encodeURIComponent(id)}`);
    return res.data;
};



export const getPageInfo = async (id: string) => {
    
  if (!id || id === 'undefined') {
    console.error("❌ getPageInfo aborted: 'id' parameter is missing or undefined.");
    return [];
  }

  
  try {
    const targetUrl = `/admin/pageInfo/${encodeURIComponent(id)}`;
    console.log(`📡 Fetching API: ${targetUrl}`); // Debug the exact endpoint
    
    const res = await axiosInstance.get(targetUrl);
    // console.log(res, 'res data');
    return res?.data?.data || [];
  } catch (err) {
    console.error("API Fetch Error:", err);
    return [];
  }
};




export const getPages = async ( limit : any ) => {

    // console.log(limit,'joijoijioji')
    const res = await axiosInstance.get(`/admin/pageInfo?limit=${limit}`);
    return res.data.data;
};

export const uploadImage = async (data: FormData) => {
    const response = await fetch("/api/admin/uploadimg", {
        method: "POST",
        body: data,
        credentials: "include",
    });
    return response.json();
};

export const logoutAdmin = async () => {
    const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
    });
    return response.json();
};

export const loginAdmin = async (form: any) => {
    const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    return response.json();
};

export const getBlogs = async (page = 1, limit = 10, search = "") => {
    const res = await axiosInstance.get(`/admin/blogs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    return res.data;
};

export const deleteBlog = async (slug: string) => {
    const res = await axiosInstance.delete(`/admin/blogs/${encodeURIComponent(slug)}`);
    return res.data;
};

export const getBlogBySlug = async (slug: string) => {
    const res = await axiosInstance.get(`/admin/blogs/${encodeURIComponent(slug)}`);
    return res.data.data;
};

