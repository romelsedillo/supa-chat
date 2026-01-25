import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // ✅ allow auth callback
  if (pathname.startsWith("/auth/callback")) {
    return res;
  }

  // ❌ Not logged in → redirect to /login
  if (
    !user &&
    pathname !== "/login" &&
    pathname !== "/sign-up" &&
    pathname !== "/password-recovery" &&
    pathname !== "/update-password"
  ) {
    const redirectUrl = new URL("/login", req.url);
    return NextResponse.redirect(redirectUrl, {
      headers: res.headers, // 🔥 PRESERVE COOKIES
    });
  }

  // ❌ Logged in but trying to visit login/sign-up
  if (user && (pathname === "/login" || pathname === "/sign-up")) {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl, {
      headers: res.headers, // 🔥 PRESERVE COOKIES
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
