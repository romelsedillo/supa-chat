"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useChatMessages } from "@/hooks/useChatMessages";
import MessageInput from "../forms/MessageInput";
import MessageList from "../layout/MessageList";
import { supabase } from "@/lib/supabaseClient";
import { useChatStore } from "@/store/chatStore";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

const ChatBoxTwo = () => {
  const { loading, setLoading, selectedChatmate, messages, setMessages } =
    useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const [conversationID, setConversationId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [newConversation, setNewConversation] = useState(false);

  const { sendMessage, sendMessageNewConversation } = useChatMessages(
    conversationID,
    currentUser
  );

  // Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data?.user?.id || "");
    };
    getUser();
  }, []);
  // Fetch messages when selectedChatmate changes
  const fetchMessages = useCallback(async () => {
    if (!selectedChatmate || !currentUser) return;

    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${currentUser},receiver_id.eq.${selectedChatmate.id}),
         and(sender_id.eq.${selectedChatmate.id},receiver_id.eq.${currentUser})`
      )
      .order("created_at", { ascending: true });

    if (!data || data.length === 0) {
      setNewConversation(true);
      return;
    } else {
      setNewConversation(false);
    }
    if (data && data.length > 0) {
      setMessages(data);
      setConversationId(data[0].conversation_id);
    }
  }, [currentUser, selectedChatmate, setMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, newConversation]);

  // Real-time updates
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
  }, [selectedChatmate, currentUser, setMessages, fetchMessages]);

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
      <MessageList
        messages={messages}
        currentUser={currentUser}
      />
      <MessageInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={newConversation ? sendMessageNewConversation : sendMessage}
      />
    </div>
  );
};

export default ChatBoxTwo;
