import LoginForm from "@/components/layout/LoginForm";
import Illustration from "@/images/Illustration.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-white flex items-center">
      <div className="w-full flex items-center justify-center">
        <Image src={Illustration} width={500} height={300} alt="Illustration" />
      </div>
      <div className="w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
