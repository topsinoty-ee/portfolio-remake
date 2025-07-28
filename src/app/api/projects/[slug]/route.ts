import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "~/db";
import z, { ZodError } from "zod";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = await params.then((p) => p.slug);

  const ProjectSchema = z
    .object({
      slug: z.string().min(1, "Slug cannot be empty").optional(),
      title: z.string().min(1, "Title cannot be empty").optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      skillsUsed: z.array(z.string().min(1)).optional(),
      contributorIds: z.array(z.string()).optional(),
      lastUpdated: z.date().or(z.string().pipe(z.coerce.date())).optional(),
      isFeatured: z.boolean().optional(),
      for: z.string().optional(),
      status: z
        .enum(["under_maintenance", "active", "dead", "might_circle_back", "planning", "in_progress"])
        .optional(),
      repo: z.union([z.string().url("Invalid repository URL"), z.literal("")]).optional(),
      link: z.union([z.string().url("Invalid project URL"), z.literal("")]).optional(),
    })
    .refine((data) => Object.values(data).some((val) => val !== undefined), {
      message: "At least one field must be provided for update",
      path: ["root"],
    });

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const result = ProjectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
    }
    const updateData = result.data;

    const updatedProject = await db.project.update({
      where: { slug },
      data: updateData,
    });

    revalidatePath(`/projects/${slug}`);
    revalidatePath("/projects");

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.issues }, { status: 400 });
    }

    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
