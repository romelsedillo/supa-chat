"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

export default function ChatBox() {
  const supabase = createClientComponentClient();
  const { selectedChatmate, messages, setMessages } = useChatStore();
  const [currentUser, setCurrentUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [conversationID, setConversationId] = useState("");

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
        .or(
          `and(sender_id.eq.${currentUser},receiver_id.eq.${selectedChatmate.id}),and(sender_id.eq.${selectedChatmate.id},receiver_id.eq.${currentUser})`
        )
        // .or(
        //   `and(sender_id.eq.${currentUser},receiver_id.eq.${selectedChatmate.id}),
        //    and(sender_id.eq.${selectedChatmate.id},receiver_id.eq.${currentUser})`
        // )
        // .or(
        //   `and(sender_id.eq.${selectedChatmate.id},sender_id.eq.${currentUser}),
        //    and(sender_id.eq.${currentUser},receiver_id.eq.${selectedChatmate.id})`
        // )

        // .or(`receiver_id.eq.${currentUser},sender_id.eq.${selectedChatmate.id}`)
        // .or(`receiver_id.eq.${selectedChatmate.id},sender_id.eq.${currentUser}`)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
      if (data) setConversationId(data?.[0].conversation_id);
    };
    fetchMessages();
  }, [selectedChatmate, setMessages, supabase, currentUser]);

  useEffect(() => {
    if (!selectedChatmate || !currentUser) return;

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;

          // ✅ Only handle messages related to the current chat
          const isRelevant =
            (newMessage.sender_id === currentUser &&
              newMessage.receiver_id === selectedChatmate.id) ||
            (newMessage.sender_id === selectedChatmate.id &&
              newMessage.receiver_id === currentUser);

          if (isRelevant) {
            console.log("New message received:", newMessage);
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, selectedChatmate, currentUser, setMessages]);

  // Sending message function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChatmate) return;

    await supabase.from("messages").insert({
      conversation_id: conversationID,
      sender_id: currentUser,
      receiver_id: selectedChatmate.id,
      content: newMessage,
    });

    setNewMessage("");
    // Reload messages
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationID)
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
      <h2 className="font-semibold text-white mb-2">
        {selectedChatmate?.name}
      </h2>

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
