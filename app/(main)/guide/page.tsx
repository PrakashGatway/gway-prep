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
    



    const [allGuides,allCategory] = await Promise.all([
        axiosInstance.get(`/articles`,{
            params : query
        }),
        axiosInstance.get("/article-category")
    ]);

    console.log(allGuides,"all")



    console.log(params.category,"jkl")
 



    return (
        <>
            <GuidePage allGuides={allGuides.data} allCategory= {allCategory.data} />
        </>
    )
}