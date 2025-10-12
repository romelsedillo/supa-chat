"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [newConversation, setNewConversation] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data?.user?.id || "");
    };
    getUser();
  }, [supabase]);

  // Fetch messages when selectedChatmate changes
  const fetchMessages = useCallback(async () => {
    if (!selectedChatmate) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${currentUser},receiver_id.eq.${selectedChatmate.id}),and(sender_id.eq.${selectedChatmate.id},receiver_id.eq.${currentUser})`
      )
      .order("created_at", { ascending: true });
    // id data = empty

    if (!data || data.length === 0) {
      // ✅ No existing conversation — this will trigger "new conversation" flow
      setNewConversation(true);
      console.log("No existing conversation found. Starting a new one.");
      return;
    } else {
      // ✅ Conversation already exists
      setNewConversation(false);
      console.log("Existing conversation found.");
    }

    if (data && data.length > 0) {
      setMessages(data);
      setConversationId(data[0].conversation_id);
    }
  }, [currentUser, selectedChatmate, setMessages, supabase]);
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, newConversation]);

  useEffect(() => {
    if (!selectedChatmate || !currentUser) return;

    // ✅ Real-time listener for new messages
    const messagesChannel = supabase
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

          const isRelevant =
            (newMessage.sender_id === currentUser &&
              newMessage.receiver_id === selectedChatmate.id) ||
            (newMessage.sender_id === selectedChatmate.id &&
              newMessage.receiver_id === currentUser);

          if (isRelevant) {
            console.log("📩 New message received:");
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    // ✅ Real-time listener for conversation updates (new conversations or updates)
    const conversationsChannel = supabase
      .channel("conversations")
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT, UPDATE, DELETE — all
          schema: "public",
          table: "conversations",
        },
        (payload) => {
          console.log("🟢 Conversation table changed:", payload);
          setNewConversation(false);
          fetchMessages();
          // Optional: refresh chatmates or conversation metadata
          // e.g. refetch chat list, or update conversation info in Zustand
        }
      )
      .subscribe();

    // 🧹 Clean up on unmount or when user/chatmate changes
    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(conversationsChannel);
    };
  }, [supabase, selectedChatmate, currentUser, setMessages, fetchMessages]);

  // Sending message function for new conversation
  const sendMessageNewConversation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedChatmate || !currentUser) return;

    try {
      console.log("🆕 Creating new conversation...");

      // 1️⃣ Create the conversation
      const { data: newConversation, error: convoError } = await supabase
        .from("conversations")
        .insert({})
        .select("id")
        .single();

      if (convoError || !newConversation) {
        console.error("❌ Error creating conversation:", convoError);
        return;
      }

      const conversationId = newConversation.id;
      console.log("✅ Conversation created:", conversationId);

      // 2️⃣ Add both users to conversation_participants
      const { error: participantsError } = await supabase
        .from("conversation_participants")
        .insert([
          {
            conversation_id: conversationId,
            user_id: currentUser,
          },
          {
            conversation_id: conversationId,
            user_id: selectedChatmate.id,
          },
        ]);

      if (participantsError) {
        console.error("❌ Error adding participants:", participantsError);
        return;
      }

      console.log("👥 Participants added");

      // 3️⃣ Insert the first message
      const { data: messageData, error: messageError } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser,
          receiver_id: selectedChatmate.id,
          content: newMessage.trim(),
        })
        .select("*")
        .single();

      if (messageError || !messageData) {
        console.error("❌ Error sending first message:", messageError);
        return;
      }

      console.log("💬 First message sent:", messageData);

      // 4️⃣ Update conversation timestamps
      const { data: updatedMessages } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (updatedMessages) setMessages(updatedMessages);
      setNewMessage("");
    } catch (error) {
      console.error("⚠️ Unexpected error creating conversation:", error);
    }
  };
  // Sending message function for existing conversation
  const sendMessage = async (e: React.FormEvent) => {
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
  console.log(newConversation);
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

      <form
        onSubmit={newConversation ? sendMessageNewConversation : sendMessage}
        className="flex gap-2 mt-3"
      >
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
