import { fetchProjectBySlug } from "~/app/api/projects/fetch";
import { Form } from "./form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  try {
    const project = await fetchProjectBySlug(slug);
    return (
      <div className="bg-card border-border container mx-auto flex h-full w-full flex-col justify-center gap-10 rounded-md border p-4 shadow">
        <h1 className="text-3xl font-bold">Edit Project: {slug}</h1>
        <Form project={project} />
      </div>
    );
  } catch {
    notFound();
  }
}
