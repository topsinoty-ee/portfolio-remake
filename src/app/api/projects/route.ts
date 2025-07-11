import { type NextRequest, NextResponse } from "next/server";
import { isValidProject } from "~/db/models/project";
import { createProject } from "./fetch";

export async function POST(req: NextRequest) {
  try {
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
        },
        { status: 400 },
      );
    }

    const result = await createProject(body);

    return NextResponse.json(
      {
        project: result,
        message: "Project created successfully",
        status: "success",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /projects error:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected error occurred while creating the project",
        status: "error",
      },
      { status: 500 },
    );
  }
}
