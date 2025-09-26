import IllustrationComp from "@/components/layout/IllustrationComp";
import PasswordRecoveryForm from "@/components/forms/PasswordRecoveryForm";

const PasswordRecoveryPage = () => {
  return (
    <div className="bg-[#0A0A0A] border-2 border-gray-800 rounded-lg h-[560px] w-full overflow-hidden max-w-5xl flex">
      {/* Left Section with Title + Illustration */}
      <IllustrationComp />
      {/* Right Login Section */}
      <div className="w-full flex items-center justify-center p-6">
        <PasswordRecoveryForm />
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
