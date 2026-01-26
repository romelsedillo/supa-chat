"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import IllustrationComp from "@/components/layout/IllustrationComp";
import LoginForm from "@/components/forms/LoginForm";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { supabase } from "@/lib/supabaseClient";

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data.user && !error) {
        // ✅ already logged in → go home
        router.replace("/");
        return;
      }

      // ❌ not logged in → show login
      setLoading(false);
    };

    checkUser();
  }, [router]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-[#0A0A0A] border-2 border-gray-800 rounded-lg h-[560px] w-full overflow-hidden max-w-5xl flex">
          {/* Left Section with Title + Illustration */}
          <IllustrationComp />
          {/* Right Login Section */}
          <div className="w-full flex items-center justify-center p-6">
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
