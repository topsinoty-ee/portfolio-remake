import { type NextRequest, NextResponse } from "next/server";
import { type ProjectType } from "~/db/models/project";
import { createProject, fetchProjects } from "./fetch";

export async function GET() {
  const projects = await fetchProjects();
  return NextResponse.json({
    projects,
    message: "Projects fetched successfully",
    status: "success",
  });
}

export async function POST(req: NextRequest) {
  const project = (await req.json()) as unknown as ProjectType;

  const result = await createProject(project);

  return NextResponse.json({
    project: JSON.stringify(result),
    message: "Project created successfully",
    status: "success",
  });
}
