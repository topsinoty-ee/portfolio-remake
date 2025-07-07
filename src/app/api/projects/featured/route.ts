import { NextResponse } from "next/server";
import { fetchFeaturedProjects } from "../fetch";

export async function GET() {
  const projects = await fetchFeaturedProjects();

  return NextResponse.json({
    projects,
    message: "Featured projects fetched successfully",
    status: "success",
  });
}
