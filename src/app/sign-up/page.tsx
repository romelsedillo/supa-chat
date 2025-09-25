import IllustrationComp from "@/components/layout/IllustrationComp";
import SignUpForm from "@/components/layout/SignUpForm";
const SignUpPage = () => {
  return (
    <div className="bg-[#0A0A0A] border border-violet-400 rounded-lg h-[560px] w-full overflow-hidden max-w-5xl flex">
      {/* Left Section with Title + Illustration */}
      <IllustrationComp />

      {/* Right Login Section */}
      <div className="w-full flex items-center justify-center p-6">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
