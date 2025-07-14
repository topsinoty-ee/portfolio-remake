import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { env } from "./env"; // make sure this exists

const adminProtectedPatterns = [/^\/projects\/[^\/]+\/edit$/, /^\/projects\/add$/, /^\/api\/projects$/];

const protectedPatterns = [...adminProtectedPatterns];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPatterns.some((pat) => pat.test(pathname));
  const isAdminProtected = adminProtectedPatterns.some((pat) => pat.test(pathname));

  if (isProtected) {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (isAdminProtected) {
      const email = session.user?.email;
      const isAdmin = email && email === env.ADMIN_EMAIL;

      if (!isAdmin) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
  }

  return NextResponse.next();
}
