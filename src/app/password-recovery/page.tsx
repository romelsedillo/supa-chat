"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client
import { toast } from "react-hot-toast"; // Optional: for feedback notifications

const PasswordRecoveryPage = () => {
  return (
    <div className="w-full pt-8">
      <div className="max-w-md mx-auto p-6 rounded-md shadow-xl border">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Recover Password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email below to receive a password reset link.
        </p>
        <form
          onSubmit={handlePasswordRecovery}
          className="flex flex-col items-center gap-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-500 w-full"
            required
          />
          <Button type="submit" className="w-full py-2" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
