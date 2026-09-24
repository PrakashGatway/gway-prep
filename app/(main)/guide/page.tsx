import axiosInstance from "@/app/lib/axios";
import GuidePage from "@/components/guide";




export default async function Page({ searchParams }) {

    const  params  = await searchParams

    const page = Number(params?.page || 1)
    const search = params?.search || "";
    const category = params?.category || "";


    const query = {
        page : page,
        search : search,
        category : category
    }
    



    const [allGuides, allCategory, totalGuides] = await Promise.all([
        // Current filtered/paginated guides
        axiosInstance.get(`/articles`, {
            params: query,
        }),

        // Categories
        axiosInstance.get("/article-category"),

        // Always get the complete total
        axiosInstance.get("/articles", {
            params: {
                page: 1,
                limit: 1,
            },
        }),
    ]);

    console.log(allGuides,"all")



 



    return (
        <>
            <GuidePage allGuides={allGuides.data} allCategory= {allCategory.data} totalGuides={totalGuides.data?.pagination?.total || 0} />
        </>
    )
}