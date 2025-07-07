import { NextResponse } from "next/server";
import { clientPromise } from "~/db";
import { Project } from "~/db/models/project";
import { mapSlugToId } from "~/db/utils";

export async function GET() {
  await clientPromise;
  await Project.init();

  const projects = await Project.find({ isFeatured: true }).lean();
  const mappedProjects = projects.map((project) => mapSlugToId(project));

  return NextResponse.json({
    projects: mappedProjects,
    message: "Featured projects fetched successfully",
    status: "success",
  });
}
