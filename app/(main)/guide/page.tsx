import axiosInstance from "@/app/lib/axios";
import GuidePage from "@/components/guide";




export default async function Page({ searchParams }) {

    const { params } = await searchParams

    const page = Number(params.page)
    const search = params.search || "";
    const category = params.category || "";

    const [allGuides] = await Promise.all([
        axiosInstance.get("/articles", {
            params: {
                page, search, category
            }
        })
    ]);



    return (
        <>
            <GuidePage allGuides={allGuides.data} />
        </>
    )
}