import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // Use your deployed site URL as origin
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? `${url.protocol}//${url.host}`;
  const nextPath = url.searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successfully stored session in cookies
      return NextResponse.redirect(new URL(nextPath, origin));
    }
  }

  // fallback on error
  return NextResponse.redirect(new URL("/?authError=1", origin));
}
