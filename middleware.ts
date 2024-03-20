import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicRoutes = ["/signup", "/signIn"];
  const path = request.nextUrl.pathname;

  if (publicRoutes.includes(path)) {
    return NextResponse.rewrite(new URL(path, request.url));
  } else {
    if (request.cookies.has("authToken")) {
      return NextResponse.rewrite(new URL(path, request.url));
    } else {
      return Response.json(
        { success: false, message: "authentication failed" },
        { status: 401 }
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signup", "/signIn", "/profile"],
};
