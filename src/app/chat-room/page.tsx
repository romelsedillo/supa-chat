import React from "react";
import SideBar from "@/components/layout/SideBar";
import ChatBox from "@/components/layout/ChatBox";

const ChatRoom = () => {
  return (
    <div className="h-screen w-full grid grid-cols-12">
      <SideBar />
      <ChatBox />
    </div>
  );
};

export default ChatRoom;
