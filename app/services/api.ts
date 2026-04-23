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
    const res = await axiosInstance.get(`/admin/pageInfo/${encodeURIComponent(id)}`);
    return res.data.data;
};


export const getPages = async () => {
    const res = await axiosInstance.get(`/admin/pageInfo`);
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
