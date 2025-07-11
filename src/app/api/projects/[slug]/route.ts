import { type NextRequest, NextResponse } from "next/server";
import { fetchProjectBySlug, updateProjectBySlug } from "../fetch";
import { isValidProject } from "~/db/models/project";

export async function PUT(req: NextRequest) {
  try {
    const slug = req.nextUrl.pathname.split("/").pop();
    if (!slug) {
      return NextResponse.json(
        {
          message: "Project slug is required in URL",
          status: "error",
        },
        { status: 400 },
      );
    }

    const body = await req.json();

    if (!isValidProject(body)) {
      return NextResponse.json(
        {
          message: "Invalid project data",
          details: `Project must have a slug, title, description, content, and skillsRequired as an array of strings.`,
          example: {
            slug: "example-project",
            title: "Example Project",
            description: "This is an example project description.",
            content: "Detailed content of the project goes here.",
            skillsRequired: ["JavaScript", "React", "Node.js"],
          },
          status: "error",
          received: body,
        },
        { status: 400 },
      );
    }

    const updated = await updateProjectBySlug(slug, body);

    return NextResponse.json({
      project: updated,
      message: "Project updated successfully",
      status: "success",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
        status: "error",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();
  if (!slug) {
    return NextResponse.json({
      message: "Project slug is required",
      status: "error",
    });
  }
  try {
    const project = await fetchProjectBySlug(slug);
    return NextResponse.json({
      project,
      message: "Projects fetched successfully",
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: "error",
    });
  }
}
