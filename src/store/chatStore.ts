// store/chatStore.ts
import { create } from "zustand";

type UserProfile = {
  id: string;
  name: string;
  avatar_url?: string | null;
  is_online?: boolean;
};

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

interface ChatStore {
  selectedChatmate: UserProfile | null;
  conversationId: string | null;
  messages: Message[];
  setSelectedChatmate: (mate: UserProfile | null) => void;
  setConversationId: (id: string | null) => void;
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatmate: null,
  conversationId: null,
  messages: [],
  setSelectedChatmate: (mate) => set({ selectedChatmate: mate }),
  setConversationId: (id) => set({ conversationId: id }),
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
}));
