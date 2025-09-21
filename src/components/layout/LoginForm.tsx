"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="max-w-sm w-full mx-auto p-6 rounded-md shadow-2xl border">
      <h2 className="dark:text-slate-50 text-3xl mb-4 text-center">Sign In</h2>
      <form
        className="text-foreground max-w-xs mx-auto flex flex-col gap-2"
        autoComplete="on"
      >
        <Input
          name="email"
          className="dark:text-slate-50 border border-slate-500 rounded outline-none focus-visible:ring-0"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className="dark:text-slate-50 border border-slate-500 rounded outline-none focus-visible:ring-0"
          required
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            className="mr-2"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
          <label htmlFor="showPassword" className="text-xs">
            Show Password
          </label>
        </div>
        <Button className="px-4 py-2 rounded" type="submit">
          Sign in
        </Button>
      </form>
      <div className="max-w-xs flex items-center justify-end py-2 mx-auto text-xs">
        <div>
          <Link
            href={"/password-recovery"}
            className="hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="max-w-xs flex items-center gap-2 py-2 mx-auto">
        <hr className="border flex-grow" />
        <p className="text-xs dark:text-slate-50">Or continue with</p>
        <hr className="border flex-grow" />
      </div>
      <div className="max-w-xs flex flex-col items-center mx-auto py-2 gap-2">
        <Button className="w-full">
          Google
          <FcGoogle className="ml-2" />
        </Button>
        <Button className="w-full">
          GitHub
          <FaGithub className="ml-2" />
        </Button>
      </div>
      <div className="mx-auto max-w-xs mt-8">
        <p className="text-xs">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="font-medium hover:underline">
            Sign up here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
