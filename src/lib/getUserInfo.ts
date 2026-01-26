import { supabase } from "@/lib/supabaseClient";

type UserProfileType = {
  id: string;
  email: string | null;
  name: string;
  avatar: string;
};
export async function getUserInfo(): Promise<UserProfileType | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Error fetching user:", error?.message);
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
    name: user.user_metadata.full_name || user.user_metadata.name || "No name",
    avatar: user.user_metadata.avatar_url || "/default-avatar.png",
  };
}
