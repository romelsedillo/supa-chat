import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Chat = {
  name: string;
  avatar: string;
  active: boolean;
};

interface ChatMateAvatarProps {
  chat: Chat;
  size?: "sm" | "md" | "lg"; // 👈 optional size prop
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-9 h-9", // default
  lg: "w-12 h-12",
};

const ChatMateAvatar: React.FC<ChatMateAvatarProps> = ({
  chat,
  size = "md",
}) => {
  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 border-violet-500`}>
        <AvatarImage src={chat.avatar} alt={chat.name} />
        <AvatarFallback>{chat.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span
        className={`absolute ${
          chat.active ? "bg-green-500" : "bg-gray-400"
        }  rounded-full
          ${size === "sm" ? "h-2 w-2 -bottom-0 -right-0" : ""}
          ${size === "md" ? "h-2 w-2 -bottom-0 -right-0" : ""}
          ${size === "lg" ? "h-3 w-3 -bottom-0 -right-0" : ""}`}
      ></span>
    </div>
  );
};

export default ChatMateAvatar;
