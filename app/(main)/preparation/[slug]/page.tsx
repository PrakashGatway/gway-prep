
import Gre from "@/app/components/test-preparation/Gre";
import { getPageInfo } from "@/app/services/api";


export default async function PreparationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const pageData = await getPageInfo(slug);


  if (slug) {
      return <Gre pageInfo={pageData} />;

  }
      return <h1 className="text-center text-xl">Course Not Found</h1>;
}
