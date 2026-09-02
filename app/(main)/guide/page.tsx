import axiosInstance from "@/app/lib/axios";
import GuidePage from "@/components/guide";




export default async function Page({ searchParams }) {

    const  params  = await searchParams

    const page = Number(params?.page || 1)
    const search = params?.search || "";
    const category = params?.category || "";

    const [allGuides,allCategory] = await Promise.all([
        axiosInstance.get("/articles", {
            params: {
                page, search, category
            }
        }),
        axiosInstance.get("/article-category")
    ]);

 



    return (
        <>
            <GuidePage allGuides={allGuides.data} allCategory= {allCategory.data} />
        </>
    )
}