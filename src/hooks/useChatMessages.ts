"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useChatStore } from "@/store/chatStore";

// type Chatmate = {
//   id: string;
//   name: string;
// };

export function useChatMessages(conversationID?: string, currentUser?: string) {
  const { setLoading, selectedChatmate, messages, setMessages } =
    useChatStore();
  const [newConversation, setNewConversation] = useState(false);
  const [newMessage, setNewMessage] = useState("");

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
    alert("sendMessage called");
  };

  // Sending message function for new conversation
  const sendMessageNewConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!newMessage.trim() || !selectedChatmate || !currentUser) return;

    try {
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
    setLoading(false);
    alert("sendMessageNewConversation called");
  };

  return {
    selectedChatmate,
    messages,
    newConversation,
    conversationID,
    currentUser,
    setMessages,
    setNewConversation,
    sendMessage,
    sendMessageNewConversation,
  };
}
