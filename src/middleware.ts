import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { supabase } from "@/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const supabase = createClientComponentClient();
  const res = NextResponse.next();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = req.nextUrl.pathname;
  // ✅ allow callback route
  if (pathname.startsWith("/auth/callback")) {
    return res;
  }
  // Not logged in → redirect to /login
  console.log("Middleware check - user:", user);
  if (
    !user &&
    pathname !== "/login" &&
    pathname !== "/sign-up" &&
    pathname !== "/password-recovery" &&
    pathname !== "/update-password"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Logged in but trying to visit login/sign-up → go to chatroom
  if (user && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return res;
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
