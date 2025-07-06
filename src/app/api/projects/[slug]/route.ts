import { type NextRequest, NextResponse } from "next/server";
import { projects } from "../mockProjects";

export function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();
  return NextResponse.json({
    project: projects.find((project) => project.id === slug),
    message: "Projects fetched successfully",
    status: "success",
  });
}
