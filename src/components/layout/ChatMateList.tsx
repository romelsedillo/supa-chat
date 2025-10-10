"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// types/chat.ts
export type Message = {
  sender_id: string;
  receiver_id: string;
};

export type UserProfile = {
  id: string;
  name: string;
  avatar_url?: string | null;
};

export default function ChatMateList() {
  const supabase = createClientComponentClient();
  const { selectedChatmate, setSelectedChatmate } = useChatStore();
  const [chatmates, setChatmates] = useState([]);

  useEffect(() => {
    const fetchChatmates = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;

      // 1️⃣ Get all messages where user is sender or receiver
      const { data: messages } = await supabase
        .from("messages")
        .select("sender_id, receiver_id")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

      if (!messages) return;

      // 2️⃣ Collect unique chatmate IDs
      const chatmateIds = new Set();
      messages.forEach((msg) => {
        if (msg.sender_id === userId) chatmateIds.add(msg.receiver_id);
        else chatmateIds.add(msg.sender_id);
      });

      if (chatmateIds.size === 0) return;

      // 3️⃣ Fetch their user profiles
      const { data: users } = await supabase
        .from("user_profiles")
        .select("id, name, avatar_url")
        .in("id", Array.from(chatmateIds));

      if (users) setChatmates(users);
    };

    fetchChatmates();
  }, []);

  return (
    <div className="col-span-3 bg-[#111] p-3 text-white rounded-s-lg">
      <h2 className="font-semibold mb-2">Chats</h2>

      {chatmates.map((mate) => (
        <div
          key={mate.id}
          onClick={() => setSelectedChatmate(mate)}
          className={`p-2 rounded cursor-pointer ${
            selectedChatmate?.id === mate.id
              ? "bg-[#222]"
              : "hover:bg-[#1a1a1a]"
          }`}
        >
          {mate.name}
        </div>
      ))}

      {chatmates.length === 0 && (
        <p className="text-gray-500 text-sm">No chatmates yet</p>
      )}
    </div>
  );
}
