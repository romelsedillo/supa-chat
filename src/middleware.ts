import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ✅ Always allow callback
  if (pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  // 🔥 MUST await this
  const { supabase, res } = await updateSession(req);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && pathname !== "/login" && pathname !== "/sign-up") {
    return NextResponse.redirect(new URL("/login", req.url), {
      headers: res.headers,
    });
  }

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
