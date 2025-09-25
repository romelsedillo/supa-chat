import React from "react";
import SideBar from "@/components/layout/SideBar";
import ChatBox from "@/components/layout/ChatBox";

const ChatRoomPage = () => {
  return (
    <div className="bg-white rounded-lg h-[560px] w-full overflow-hidden max-w-5xl mx-auto grid grid-cols-12">
      <SideBar />
      <ChatBox />
    </div>
  );
};

export default ChatRoomPage;
