"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type UserProfileType = {
  id: string;
  email: string | null;
  name: string;
  avatar: string;
};

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user session info
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const user = session.user;
        setProfile({
          id: user.id,
          email: user.email || null,
          name:
            user.user_metadata.full_name ||
            user.user_metadata.name ||
            "No name",
          avatar: user.user_metadata.avatar_url || "/default-avatar.png",
        });
      }

      setLoading(false);
    };

    fetchUser();

    // Subscribe to session changes (important for OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = session.user;
        setProfile({
          id: user.id,
          email: user.email || null,
          name:
            user.user_metadata.full_name ||
            user.user_metadata.name ||
            "No name",
          avatar: user.user_metadata.avatar_url || "/default-avatar.png",
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col justify-center ml-3 space-y-1">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="flex items-center">
      <Avatar className="w-12 h-12 border-2 border-violet-500">
        <AvatarImage src={profile.avatar} />
        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center ml-3">
        <h2 className="text-xs font-medium text-white">{profile.name}</h2>
        <h3 className="text-xs text-white">{profile.email}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
