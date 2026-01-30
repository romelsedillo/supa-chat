"use client";

import IllustrationComp from "@/components/layout/IllustrationComp";
import SignUpForm from "@/components/forms/SignUpForm";
import { useGuestGuard } from "@/hooks/useGuestGuard";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const SignUpPage = () => {
  const loading = useGuestGuard();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row">
      {/* Left Section with Title + Illustration */}
      <div className="hidden md:flex md:w-1/2 border-b md:border-b-0">
        <IllustrationComp />
      </div>
      <div className="flex items-center justify-center w-full md:hidden md:w-1/2">
        <h1 className="text-5xl font-bold text-center text-white mb-6">
          Supa-Chat
        </h1>
      </div>

      {/* Right Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
