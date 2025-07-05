import { NextResponse } from "next/server";
import { projects } from "../mockProjects";

export function GET() {
  return NextResponse.json({
    projects: projects.filter((project) => project.isFeatured),
    message: "Featured projects fetched successfully",
    status: "success",
  });
}
