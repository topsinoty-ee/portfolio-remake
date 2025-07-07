import { Project, type ProjectType } from "~/db/models/project";
import { type NextRequest, NextResponse } from "next/server";
import { clientPromise } from "~/db";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();
  if (!slug) {
    return NextResponse.json({
      message: "Project slug is required",
      status: "error",
    });
  }

  await clientPromise;
  await Project.init();

  const project = await Project.findOne<{ project: ProjectType }>(
    { title: "test project" },
    {
      collation: { locale: "en", strength: 2 },
    },
  );

  if (!project) {
    return NextResponse.json({
      message: "Project not found",
      status: "error",
    });
  }

  return NextResponse.json({
    project,
    message: "Projects fetched successfully",
    status: "success",
  });
}
