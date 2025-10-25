"use client";

import React, { useState } from "react";
import { useChatMessages } from "@/hooks/useChatMessages";
import MessageInput from "../forms/MessageInput";
import MessageList from "../layout/MessageList";

const ChatBox2 = () => {
  const [newMessage, setNewMessage] = useState("");

  const {
    messages,
    newConversation,
    currentUser,
    sendMessage,
    sendMessageNewConversation,
  } = useChatMessages();

  return (
    <div>
      <MessageList messages={messages} currentUser={currentUser} />
      <MessageInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={newConversation ? sendMessageNewConversation : sendMessage}
      />
    </div>
  );
};

export default ChatBox2;
