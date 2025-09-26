"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const UpdatePasswordForm = () => {
  const supabase = createClientComponentClient();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error("Failed to update password: " + error.message);
      } else {
        toast.success("Password updated successfully!");
        router.push("/login"); // Redirect to login page after successful password update
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An unexpected error occurred: " + error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-sm w-full mx-auto p-6 rounded-md shadow-2xl border border-gray-800">
      <h2 className="text-white text-3xl mb-4 text-center">Update Password</h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Enter your new password below.
      </p>
      <form
        onSubmit={handleUpdatePassword}
        className="text-foreground max-w-xs mx-auto flex flex-col gap-2"
      >
        <Input
          required
          autoFocus
          autoComplete="false"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-gray-500 focus:border-none caret-violet-500"
        />
        <Input
          required
          autoComplete="false"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-gray-500 focus:border-none caret-violet-500"
        />
        <Button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
      <div className="mx-auto max-w-xs mt-8">
        <p className="text-xs text-white">
          Already updated your password?{" "}
          <Link href={"/login"} className="font-medium underline text-white">
            Log in here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
