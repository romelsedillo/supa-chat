" use client";

import React from "react";
import { useChatStore } from "@/store/chatStore";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const { loading } = useChatStore();
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#111] p-3 rounded text-white"></div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto bg-[#111] p-3 rounded text-white space-y-2">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`${
            m.sender_id === currentUser ? "text-right" : "text-left"
          }`}
        >
          <p
            className={`inline-block px-3 py-1 rounded-lg ${
              m.sender_id === currentUser ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {m.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
