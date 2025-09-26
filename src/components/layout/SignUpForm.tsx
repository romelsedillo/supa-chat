"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking session: ", error);
          return;
        }

        if (data?.session) {
          // If a session exists, redirect to the homepage
          router.push("/");
        }
      } catch (error) {
        console.error("Unexpected error during session check: ", error);
      }
    };

    checkAuth();
  }, [router]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // Save the user's name as part of the profile
        },
      });

      if (error) {
        toast.error("Registration failed: " + error.message);
      } else {
        toast.success(
          "Registration successful! Please check your email to confirm your account."
        );
        router.push("/"); // Redirect to login after registration
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error("An unexpected error occurred: " + err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // OAuth login
  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Redirecting to ${provider}...`);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto p-6 rounded-md shadow-2xl border border-violet-400">
      <h2 className="text-white text-3xl mb-4 text-center">Sign up</h2>
      <form
        onSubmit={handleRegister}
        className="text-foreground max-w-xs mx-auto flex flex-col gap-2"
      >
        <Input
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          type="text"
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-white focus:border-none caret-violet-500"
        />

        <Input
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 placeholder:text-white focus:border-none caret-violet-500"
        />

        <Input
          required
          placeholder="Password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className="text-white border border-violet-400 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-400 placeholder:text-white focus:border-none caret-violet-500"
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
          className="px-4 py-2 rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>

      <div className="max-w-xs flex items-center gap-2 py-4 mx-auto">
        <hr className="border flex-grow" />
        <p className="text-xs text-white">Or continue with</p>
        <hr className="border flex-grow" />
      </div>
      <div className="flex flex-col items-center mx-auto gap-2">
        <Button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          className="w-full rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          Google
          <FcGoogle className="ml-2" />
        </Button>
        <Button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          className="w-full rounded bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer"
        >
          GitHub
          <FaGithub className="ml-2" />
        </Button>
      </div>

      <div className="mx-auto max-w-xs mt-4">
        <p className="text-xs text-white">
          Already have an account?{" "}
          <Link href="/" className="font-medium underline">
            Sign in here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
