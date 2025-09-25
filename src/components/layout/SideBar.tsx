import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatOptions from "../modals/ChatOptions";
import ProfileOptions from "../modals/ProfileOptions";
import UserProfile from "./UserProfile";
import ChatMateAvatar from "./ChatMateAvatar";

const SideBar = () => {
  const chats = [
    {
      id: 1,
      name: "Alice Johnson",
      message: "Hey! Are we still on for tonight?",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      active: true,
    },
    {
      id: 2,
      name: "Michael Lee",
      message: "Just finished the Supa-Chat setup 🚀",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      active: false,
    },
    {
      id: 3,
      name: "Sophia Gomez",
      message: "That’s awesome! Can’t wait to try it out.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      active: true,
    },
    {
      id: 4,
      name: "David Kim",
      message: "I’ll send you the files later today.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      active: false,
    },
    {
      id: 5,
      name: "Emma Watson",
      message: "Lol that was so funny 😂",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      active: true,
    },
    {
      id: 6,
      name: "James Carter",
      message: "Can we hop on a quick call?",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      active: false,
    },
    {
      id: 7,
      name: "Olivia Brown",
      message: "Sure, I’ll check it out later.",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      active: true,
    },
  ];

  return (
    <div className="col-span-3 border-2 border-gray-800 rounded-s-lg">
      <div className="p-2 flex">
        <UserProfile />
        <div className="ml-auto cursor-pointer flex items-center">
          <ProfileOptions />
        </div>
      </div>
      <div className="w-full px-2 flex items-center justify-center">
        <Input
          type="text"
          placeholder="Search..."
          className="flex-1 m-2 placeholder:text-white border border-gray-700 rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus:border-none"
        />
      </div>
      <div className="flex flex-col mt-2">
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 rounded p-2"
              >
                <ChatMateAvatar chat={chat} size="md" />
                <div className="flex flex-col">
                  <h2 className="text-xs text-gray-300 font-medium">
                    {chat.name}
                  </h2>
                  <p className="text-[10px] text-gray-400 truncate w-32">
                    {chat.message}
                  </p>
                </div>
                <div className="ml-auto cursor-pointer flex items-center">
                  <ChatOptions />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideBar;
