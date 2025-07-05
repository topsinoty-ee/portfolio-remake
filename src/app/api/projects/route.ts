import { NextResponse } from "next/server";
import { projects } from "./mockProjects";

export function GET() {
  return NextResponse.json({
    projects,
    message: "Projects fetched successfully",
    status: "success",
  });
}
