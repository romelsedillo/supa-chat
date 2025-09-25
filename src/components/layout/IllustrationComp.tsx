import Illustration from "@/images/Illustration.png";
import Image from "next/image";

const IllustrationComp = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-white mb-6">Supa-Chat</h1>
      <Image src={Illustration} width={500} height={300} alt="Illustration" />
    </div>
  );
};

export default IllustrationComp;
