import { clientPromise } from "~/db";
import { NextResponse } from "next/server";
import { Project, type ProjectType } from "~/db/models/project";
import { mapSlugToId } from "~/db/utils";

export async function GET() {
  await clientPromise;
  await Project.init();

  const projects: ProjectType[] = await Project.find({}).lean();
  const mappedProjects = projects.map((project) => mapSlugToId(project));
  return NextResponse.json({
    projects: mappedProjects,
    message: "Projects fetched successfully",
    status: "success",
  });
}

export async function POST(req: NextResponse) {
  const project = (await req.json()) as unknown as ProjectType;
  await clientPromise;
  await Project.init();

  const result = await Project.insertOne(project);
  return NextResponse.json({
    project: JSON.stringify(result),
    message: "Project created successfully",
    status: "success",
  });
}
