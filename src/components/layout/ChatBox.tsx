"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ChatBox() {
  const supabase = createClientComponentClient();
  const { selectedChatmate, messages, setMessages } = useChatStore();
  const [currentUser, setCurrentUser] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data?.user?.id || "");
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatmate) return;

      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("sender_id", selectedChatmate.id)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };

    fetchMessages();
  }, [selectedChatmate, supabase, setMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChatmate) return;

    await supabase.from("messages").insert({
      conversation_id: selectedChatmate.id,
      sender_id: currentUser,
      content: newMessage,
    });

    setNewMessage("");
    // Reload messages
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", selectedChatmate.id)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
  };

  if (!selectedChatmate)
    return (
      <div className="col-span-9 flex items-center justify-center text-gray-500 border border-gray-800 rounded-e-lg">
        Select a chatmate
      </div>
    );

  return (
    <div className="col-span-9 flex flex-col p-4 border border-gray-800 rounded-e-lg">
      <h2 className="font-semibold text-white mb-2">{selectedChatmate.name}</h2>

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

      <form onSubmit={sendMessage} className="flex gap-2 mt-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-800 text-white p-2 rounded-lg outline-none"
          placeholder="Type a message..."
        />
        <button className="bg-blue-600 px-4 rounded-lg text-white">Send</button>
      </form>
    </div>
  );
}
