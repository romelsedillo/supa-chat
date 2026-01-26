"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const LoginForm: React.FC = () => {
  // const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // email and password login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Login failed: " + error.message);
      } else {
        toast.success("Login successful!");
        router.push("/"); // ✅ client-side redirect
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

  // Github login
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) throw new Error(error.message);

      toast.success("Redirecting to GitHub login...");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("GitHub login error:", err.message);
      toast.error("GitHub login failed. Please try again.");
    }
  };
  // Google login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw new Error(error.message);

      toast.success("Redirecting to Google login...");
    } catch (error: unknown) {
      const err = error as Error;
      console.log("Google login error:", err.message);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto p-6 rounded-md shadow-2xl border border-gray-800">
      <h2 className="text-white text-3xl mb-4 text-center">Sign In</h2>
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="text-foreground max-w-xs mx-auto flex flex-col gap-2"
      >
        <Input
          required
          autoFocus
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-gray-500 focus:border-none caret-violet-500"
        />
        <Input
          required
          placeholder="Password"
          name="password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-gray-500 focus:border-none caret-violet-500"
        />
        <div className="flex items-center">
          <Checkbox
            id="showPassword"
            checked={showPassword}
            onCheckedChange={() => setShowPassword(!showPassword)}
            className="mr-2 border border-violet-500 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500 data-[state=checked]:text-white hover:data-[state=checked]:bg-violet-800 cursor-pointer"
          />
          <label htmlFor="showPassword" className="text-xs text-white">
            Show Password
          </label>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="max-w-xs flex items-center justify-end py-2 mx-auto text-xs">
        <div>
          <Link
            href={"/password-recovery"}
            className="underline font-medium text-white"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="max-w-xs flex items-center gap-2 py-2 mx-auto">
        <hr className="border border-gray-500 flex-grow" />
        <p className="text-xs text-white dark:text-slate-50">
          Or continue with
        </p>
        <hr className="border border-gray-500 flex-grow" />
      </div>
      <div className="max-w-xs flex flex-col items-center mx-auto py-2 gap-2">
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          Google
          <FcGoogle className="ml-2" />
        </Button>
        <Button
          type="button"
          onClick={handleGithubLogin}
          className="w-full rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          GitHub
          <FaGithub className="ml-2" />
        </Button>
      </div>
      <div className="mx-auto max-w-xs mt-8">
        <p className="text-xs text-white">
          Don&apos;t have an account?{" "}
          <Link href={"/sign-up"} className="font-medium underline text-white">
            Sign up here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
