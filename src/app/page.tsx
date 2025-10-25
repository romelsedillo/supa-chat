import React from "react";
import SideBar from "@/components/layout/SideBar";
import ChatBox from "@/components/layout/ChatBox";
import OnlineStatusUpdater from "@/components/modals/OnlineStatusUpdater";
import ChatBoxTwo from "@/components/layout/ChatBoxTwo";
export default function Home() {
  return (
    <>
      <OnlineStatusUpdater />
      <div className="bg-[#0a0a0a] rounded-lg h-[560px] w-full overflow-hidden max-w-6xl mx-auto grid grid-cols-12">
        <SideBar />
        <ChatBoxTwo />
      </div>
    </>
  );
}
