"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { BetterForm } from "~/components/ui/betterForm";

export const Form = () => {
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    slug: z.string(),
    skillRequired: z.array(z.string()),
    link: z.string().optional(),
    repo: z.string().optional(),
    for: z.string().optional(),
    collaborators: z.array(z.string()).optional(),
    isArchived: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  });

  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof schema>): Promise<void> {
    console.log(values);
    try {
      toast.promise(
        fetch(`/api/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch((r: unknown) => r);
            throw err instanceof Error ? err : new Error(String(err));
          }
          return res.json() as unknown;
        }),
        {
          loading: "Submitting project...",
          success: () => {
            router.back();
            return "Project added successfully!";
          },
          error: (error) => `Creation failed: ${JSON.stringify(error.message)}`,
        },
      );
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <BetterForm
      defaultValues={{
        title: "",
        description: "",
        content: "",
        slug: "",
        link: "",
        repo: "",
        for: "",
        skillRequired: ["test"],
        collaborators: [],
        isArchived: false,
        isFeatured: false,
      }}
      formSchema={schema}
      fields={[
        {
          name: "title",
          label: "Project Title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          label: "Slug",
          description: 'use "-" for spaces',
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
