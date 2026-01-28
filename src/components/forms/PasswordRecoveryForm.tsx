"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Optional: for feedback notifications
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";


const PasswordRecoveryForm = () => {

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePasswordRecovery = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`, // Redirect URL after resetting the password
      });

      if (error) {
        toast.error("Failed to send password reset email: " + error.message);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
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
      <h2 className="text-white text-3xl mb-4 text-center">Recover Password</h2>
      <p className="text-center text-sm text-white mb-6">
        Enter your email below to receive a password reset link.
      </p>
      <form
        autoComplete="off"
        onSubmit={handlePasswordRecovery}
        className="text-foreground max-w-xs mx-auto flex flex-col gap-2"
      >
        <Input
          required
          autoFocus
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-gray-500 focus:border-none caret-violet-500"
        />
        <Button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      <div className="mx-auto max-w-xs mt-8">
        <p className="text-xs text-white">
          Remembered your password?
          <Link href={"/login"} className="font-medium underline text-white">
            Log in here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordRecoveryForm;
