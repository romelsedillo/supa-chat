"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/getUserInfo";
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
    getUserInfo()
      .then(setProfile)
      .finally(() => setLoading(false));
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
  console.log(profile);
  return (
    <div className="flex items-center">
      <Avatar className="w-12 h-12 border-2 border-violet-500">
        <AvatarImage src={profile?.avatar} />
        <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center ml-3">
        <h2 className="text-xs font-medium text-white">{profile?.name}</h2>
        <h3 className="text-xs text-white">{profile?.email}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
