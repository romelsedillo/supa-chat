"use client";
import SideBar from "@/components/layout/SideBar";
import OnlineStatusUpdater from "@/components/modals/OnlineStatusUpdater";
import ChatBoxTwo from "@/components/layout/ChatBoxTwo";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import MobileSideBar from "@/components/layout/MobileSideBar";
import MobileChatBox from "@/components/layout/MobileChatBox";

export default function Home() {
  // const loading = useAuthGuard();

  // if (loading) return <LoadingSpinner />;

  return (
    <>
      <OnlineStatusUpdater />
      <div className="bg-[#0a0a0a] rounded-lg h-[660px] w-full max-w-6xl mx-auto grid grid-cols-12">
        <SideBar />
        <MobileSideBar />
        <ChatBoxTwo />
        <MobileChatBox />
      </div>
    </>
  );
}
