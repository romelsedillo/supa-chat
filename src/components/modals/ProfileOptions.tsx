"use client";

import { EllipsisVertical, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { supabase } from "@/lib/supabaseClient";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const ProfileOptions = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    try {
      //  get the current user first
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user before logout:", userError.message);
      }

      //  update user status to false
      if (user) {
        await supabase
          .from("user_profiles")
          .update({ is_online: false })
          .eq("id", user.id);
      }

      // ✅ Then sign out
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error("Failed to log out. Please try again.");
        console.error("Logout error:", error.message);
      } else {
        toast.success("Logged out successfully.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Unexpected logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer hover:bg-gray-800"
        >
          <EllipsisVertical strokeWidth={2} className="text-gray-300" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={() => alert("Profile Settings")}
          className="text-xs cursor-pointer"
        >
          <Settings className="h-4 w-4 text-gray-600 mr-2" />
          Profile Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-xs text-red-500 cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2 text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileOptions;
