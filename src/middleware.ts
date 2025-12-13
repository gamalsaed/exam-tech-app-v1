import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  const loginPath = new URL("/auth/login", request.url);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const email = new URL(request.url).searchParams.get("email");
  if (pathname.includes("verification") && !email) {
    return NextResponse.redirect(new URL("/auth/forget-password", request.url));
  }

  if (!pathname.startsWith("/auth") && !token) {
    return NextResponse.redirect(loginPath);
  }

  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname) return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
