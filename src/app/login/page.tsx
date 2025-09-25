import IllustrationComp from "@/components/layout/IllustrationComp";
import LoginForm from "@/components/layout/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-[#0A0A0A] border border-violet-400 rounded-lg h-[560px] w-full overflow-hidden max-w-5xl flex">
      {/* Left Section with Title + Illustration */}
      <IllustrationComp />
      {/* Right Login Section */}
      <div className="w-full flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
