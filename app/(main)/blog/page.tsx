import Blog from "@/app/components/Blog";
import { getPageInfo } from "@/app/services/api";

export default async function BlogPage() {
    const data = await getPageInfo("blog");
    return(
        <Blog pageInfo={data} />
    )
}