import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/api/projects", "/projects/**/edit", "/projects/add"];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  const isProjected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProjected && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  return NextResponse.next();
}
