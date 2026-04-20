import axiosInstance from "../lib/axios";

export const  createStudent = async (data: any) => {
    const res = await axiosInstance.post('/admin/student',data);
    return res.data;
}

export const getStudent = async (query="", page=1,limit=10) => {
    const res = await axiosInstance.get(
        `/admin/student?query=${query}&page=${page}&limit=${limit}`
    );
    return res.data;
}

export const deleteStudent = async (id: String) => {
    const res = await axiosInstance.delete(`/admin/student?id=${id}`);
    return res.data;
}

// --------------------------blogs--------------------------

export const createBlogCategory = async (data : any ) => {
    const res = await axiosInstance.post('/admin/bloginfo',data);
    return res.data;
}

export const getBlogCategory = async () => {
    const res = await axiosInstance.get('/admin/bloginfo');
    return res.data;
}

export const deleteBlogcategory = async(id: string) => {
    const res  = await axiosInstance.delete(`/admin/bloginfo?id=${id}`);
    return res.data;
}


