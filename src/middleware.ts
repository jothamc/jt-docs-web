import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { DecodedToken } from "./features/auth/types";

// 1. Specify protected and public routes
const protectedRoutes = ["/home"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get user info from the token in cookie
  const token = req.cookies.get("token")?.value;
  let user: { id: string } | null = null;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        user = { id: decoded.sub };
      }
    } catch {
      // Invalid token
    }
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    user?.id &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
