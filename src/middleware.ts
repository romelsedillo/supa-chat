// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 🚨 EXIT EARLY — DO NOT TOUCH SUPABASE HERE
  if (pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → redirect
  if (
    !user &&
    pathname !== "/login" &&
    pathname !== "/sign-up" &&
    pathname !== "/password-recovery" &&
    pathname !== "/update-password"
  ) {
    return NextResponse.redirect(new URL("/login", req.url), {
      headers: res.headers, // ✅ preserve cookies
    });
  }

  // Logged in but visiting auth pages
  if (user && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url), {
      headers: res.headers,
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
