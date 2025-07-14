"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { BetterForm } from "~/components/ui/betterForm";
import type { ProjectPrivateDetails } from "~/types/project";

export const Form = ({ project }: { project: ProjectPrivateDetails }) => {
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    link: z.string().optional(),
    repo: z.string().optional(),
    for: z.string().optional(),
    collaborators: z.array(z.string()).optional(),
    isArchived: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  });

  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof schema>): Promise<void> {
    const { id: slug, ...rest } = project;

    const payload = {
      ...rest,
      slug,
      ...values,
    };

    try {
      toast.promise(
        fetch(`/api/projects/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch((r) => r);
            throw err instanceof Error ? err : new Error(String(err));
          }
          return res.json();
        }),
        {
          loading: "Submitting project...",
          success: () => {
            router.back();
            return "Project updated successfully!";
          },
          error: (error) => `Update failed: ${error.message}`,
        },
      );
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <BetterForm
      formSchema={schema}
      defaultValues={{
        title: project.title,
        description: project.description,
        content: project.content,
        link: project.link ?? "",
        repo: project.repo ?? "",
        for: project.for ?? "",
        collaborators: project.collaborators ?? [],
        isArchived: project.isArchived ?? false,
        isFeatured: project.isFeatured ?? false,
      }}
      fields={[
        {
          name: "title",
          label: "Project Title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Project Description",
          type: "textarea",
          required: true,
        },
        {
          name: "content",
          label: "Project Content",
          type: "textarea",
          required: true,
        },
        {
          name: "link",
          label: "Live Link",
          type: "text",
        },
        {
          name: "repo",
          label: "Repository URL",
          type: "text",
        },
        {
          name: "for",
          label: "For (Client / Purpose)",
          type: "text",
        },
        // {
        //   name: "collaborators",
        //   label: "Collaborators",
        //   type: "tags",
        //   description: "Type names or emails, press enter to add.",
        // },
        // {
        //   name: "isArchived",
        //   label: "Archived?",
        //   type: "checkbox",
        // },
        // {
        //   name: "isFeatured",
        //   label: "Featured?",
        //   type: "checkbox",
        // },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
