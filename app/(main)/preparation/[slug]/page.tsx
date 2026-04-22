import Gmat from "@/app/components/test-preparation/Gmat";
import Gre from "@/app/components/test-preparation/Gre";
import Ielts from "@/app/components/test-preparation/Ielts";
import Pte from "@/app/components/test-preparation/Pte";


export default async function PreparationPage({ params }) {
  const { slug } = await params;

  switch (slug) {
    case "gre":
      return <Gre />;
    case "ielts":
      return <Ielts />;
    case "pte":
      return <Pte />;
    case "gmat":
      return <Gmat />;
    default:
      return <h1 className="text-center text-xl">Course Not Found</h1>;
  }
}
