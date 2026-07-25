
interface PageProps {
  params: {
    slug: string;
  };
 }

import EditorForm from "../../../components/editorForm";    

export default async function BlogDetailsPage({ params }: PageProps) {
    const { slug } = await params;
  return (<EditorForm rawText={slug} />);
}
