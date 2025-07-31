import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { db } from "~/db";

export async function POST(req: NextRequest) {
  const ProjectSchema = z.object({
    slug: z.string().min(1, "Slug cannot be empty"),
    title: z.string().min(1, "Title cannot be empty"),
    description: z.string(),
    content: z.string(),
    skillsUsed: z.array(z.string().min(1)).optional(),
    contributorIds: z.array(z.string()).optional(),
    lastUpdated: z.date().or(z.string().pipe(z.coerce.date())).optional(),
    isFeatured: z.boolean().optional(),
    for: z.string().optional(),
    status: z.enum(["under_maintenance", "active", "dead", "might_circle_back", "planning", "in_progress"]).optional(),
    repo: z.union([z.string().url("Invalid repository URL"), z.literal("")]).optional(),
    link: z.union([z.string().url("Invalid project URL"), z.literal("")]).optional(),
  });

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const result = ProjectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
    }
    const createData = result.data;

    const createdProject = await db.project.create({
      data: { status: "might_circle_back", ...createData },
    });

    revalidatePath(`/projects/${createdProject.slug}`);
    revalidatePath("/projects");

    return NextResponse.json(
      {
        project: createdProject,
        message: "Project created successfully",
        status: "success",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.issues }, { status: 400 });
    }

    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected error occurred while creating the project",
        status: "error",
      },
      { status: 500 },
    );
  }
}
