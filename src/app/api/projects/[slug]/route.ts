import { Project, type ProjectType } from "~/db/models/project";
import { type NextRequest, NextResponse } from "next/server";
import { clientPromise } from "~/db";
import { mapSlugToId } from "~/db/utils";
import type { ObjectId } from "mongoose";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();
  if (!slug) {
    return NextResponse.json({
      message: "Project slug is required",
      status: "error",
    });
  }

  console.log("Fetching project with slug:", slug);

  await clientPromise;
  await Project.init();

  const projectId = await Project.findOne<{ _id: ObjectId }>(
    { slug },
    {
      collation: { locale: "en", strength: 2 },
    },
  );

  if (!projectId) {
    return NextResponse.json({
      message: "Project does not exist",
      status: "error",
    });
  }

  const project = await Project.findById(projectId._id).lean<ProjectType>();

  if (!project) {
    return NextResponse.json({
      message: "Project not found",
      status: "error",
    });
  }

  return NextResponse.json({
    project: mapSlugToId(project),
    message: "Projects fetched successfully",
    status: "success",
  });
}
