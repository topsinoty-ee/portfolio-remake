import { NextResponse } from "next/server";
import { projects } from "../mockProjects";

export function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return NextResponse.json({
    project: projects.find((project) => project.id === slug),
    message: "Projects fetched successfully",
    status: "success",
  });
}
