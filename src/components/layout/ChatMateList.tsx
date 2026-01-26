"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { supabase } from "@/lib/supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatMateOptions from "../modals/ChatMateOptions";
import { usePresenceStore } from "@/store/usePresence";

type UserProfile = {
  id: string;
  name: string;
  avatar_url?: string | null;
  is_online: boolean;
};

export default function ChatMateList() {
  const initPresence = usePresenceStore((state) => state.initPresence);
  const { isOnline } = usePresenceStore();
  const { selectedChatmate, setSelectedChatmate } = useChatStore();
  const [chatmates, setChatmates] = useState<UserProfile[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const userId = data?.user?.id;

      if (!userId) return;

      initPresence(userId);
    };

    loadUser();

    return () => {
      supabase.removeChannel(supabase.channel("online-users"));
    };
  }, [initPresence, supabase]);

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

      // 2️⃣ Collect unique chatMate IDs
      const chatmateIds = new Set();
      messages.forEach((msg) => {
        if (msg.sender_id === userId) chatmateIds.add(msg.receiver_id);
        else chatmateIds.add(msg.sender_id);
      });

      if (chatmateIds.size === 0) return;

      // 3️⃣ Fetch their user profiles
      const { data: users } = await supabase
        .from("user_profiles")
        .select("id, name, avatar_url, is_online")
        .in("id", Array.from(chatmateIds));

      if (users) setChatmates(users);
    };

    fetchChatmates();
    const channel = supabase
      .channel("chatmates-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async () => {
          // 🔁 Re-fetch chatMates when new message is inserted
          fetchChatmates();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, initPresence]);

  return (
    <div className="col-span-3 p-3 text-white rounded-s-lg">
      <h2 className="font-semibold mb-2">Chats</h2>

      {chatmates.map((mate) => (
        <div
          key={mate.id}
          onClick={() => setSelectedChatmate(mate)}
          className={`p-2 rounded cursor-pointer flex items-center gap-2 ${
            selectedChatmate?.id === mate.id
              ? "bg-[#222]"
              : "hover:bg-[#1a1a1a]"
          }`}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={mate.avatar_url || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div
              className={`absolute top-6 left-6 w-2 h-2 rounded-full ${
                isOnline(mate.id) ? "bg-green-500" : "bg-gray-500"
              }`}
            ></div>
          </div>
          <h3 className="font-medium capitalize">{mate.name}</h3>
          <div className="ml-auto">
            <ChatMateOptions />
          </div>
        </div>
      ))}

      {chatmates.length === 0 && (
        <p className="text-gray-500 text-sm">No chatmates yet.</p>
      )}
    </div>
  );
}
