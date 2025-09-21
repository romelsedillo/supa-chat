import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatOptions from "./ChatOptions";
import ProfileOptions from "./ProfileOptions";

const SideBar = () => {
  const chats = [
    {
      id: 1,
      name: "Alice Johnson",
      message: "Hey! Are we still on for tonight?",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Michael Lee",
      message: "Just finished the Supa-Chat setup 🚀",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Sophia Gomez",
      message: "That’s awesome! Can’t wait to try it out.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "David Kim",
      message: "I’ll send you the files later today.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Emma Watson",
      message: "Lol that was so funny 😂",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 6,
      name: "James Carter",
      message: "Can we hop on a quick call?",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: 7,
      name: "Olivia Brown",
      message: "Sure, I’ll check it out later.",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
  ];

  return (
    <div
      className="col-span-3 border bg-white rounded-s-lg
    "
    >
      <div className="p-2 flex">
        <Avatar className="w-12 h-12 border-2 border-green-500">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center ml-3">
          <h2 className="text-sm text-slate-800te">Romel Sedillo</h2>
          <h3 className="text-xs text-slate-600">@romelsedillo</h3>
        </div>
        <div className="ml-auto cursor-pointer flex items-center">
          <ProfileOptions />
        </div>
      </div>
      <div className="w-full px-2 flex items-center justify-center">
        <Input placeholder="Search..." className="m-2" />
      </div>
      <div className="flex flex-col gap-2 mt-2 border">
        <ScrollArea className="h-[400px] ">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded p-2 border"
            >
              <div className="relative">
                <Avatar className="w-12 h-12 border-2">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>
                    {chat.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute h-3 w-3 bg-green-500 border border-white rounded-full bottom-0 right-1"></span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xs font-medium">{chat.name}</h2>
                <p className="text-[10px] text-slate-600 truncate w-40">
                  {chat.message}
                </p>
              </div>
              <div className="ml-auto cursor-pointer flex items-center">
                <ChatOptions />
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideBar;
