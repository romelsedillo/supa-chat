" use client";

import React from "react";
import { useChatStore } from "@/store/chatStore";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="flex-1 overflow-y-auto bg-transparent p-3 rounded text-white space-y-2"></div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto bg-transparent rounded text-white space-y-2">
      {loading ? (
        <div className="flex-1 overflow-y-auto bg-transparent p-3 rounded text-white space-y-2"></div>
      ) : (
        <ScrollArea className="px-3 rounded text-white space-y-2 h-full">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`my-2 ${
                m.sender_id === currentUser ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block text-sm px-3 py-1 rounded ${
                  m.sender_id === currentUser ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {m.content}
              </p>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default MessageList;
