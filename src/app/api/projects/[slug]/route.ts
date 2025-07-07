import { type NextRequest, NextResponse } from "next/server";
import { fetchProjectBySlug } from "../fetch";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();
  if (!slug) {
    return NextResponse.json({
      message: "Project slug is required",
      status: "error",
    });
  }
  try {
    const project = await fetchProjectBySlug(slug);
    return NextResponse.json({
      project,
      message: "Projects fetched successfully",
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: "error",
    });
  }
}
