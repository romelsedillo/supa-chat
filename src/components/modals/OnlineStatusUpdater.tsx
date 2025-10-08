"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function OnlineStatusUpdater() {
  const supabase = createClientComponentClient();
  useEffect(() => {
    const updateOnlineStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        console.log("useEffect runs");
        await supabase
          .from("user_profiles")
          .update({ is_online: true })
          .eq("id", user.id);
      }
    };

    updateOnlineStatus();

    // set offline when tab closes
    const handleUnload = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("user_profiles")
          .update({ is_online: false })
          .eq("id", user.id);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return null;
}
