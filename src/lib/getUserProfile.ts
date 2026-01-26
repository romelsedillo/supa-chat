// import { supabase } from "@/lib/supabaseClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getUserProfile() {
  const supabase = createClientComponentClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user:", userError?.message);
    return null;
  }

  // fetch profile from your user_profiles table
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("display_name, username, avatar_url")
    .eq("id", user.id) // user.id = auth.users.id
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    return null;
  }

  return { ...user, ...profile };
}
