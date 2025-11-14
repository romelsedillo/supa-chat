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
  loading: boolean;
  setLoading: (state: boolean) => void;
  newMessage: string;
  setNewMessage: (value: string) => void;
  selectedChatmate: UserProfile | null;
  conversationId: string | null;
  messages: Message[];
  setSelectedChatmate: (mate: UserProfile | null) => void;
  setConversationId: (id: string | null) => void;
  // setMessages: (msgs: Message[]) => void;
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
  newMessage: "",
  setNewMessage: (value) => set({ newMessage: value }),
  selectedChatmate: null,
  conversationId: null,
  messages: [],
  setSelectedChatmate: (mate) => set({ selectedChatmate: mate }),
  setConversationId: (id) => set({ conversationId: id }),
  // setMessages: (msgs) => set({ messages: msgs }),
  setMessages: (messages) =>
    set((state) => ({
      messages:
        typeof messages === "function" ? messages(state.messages) : messages,
    })),
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
}));
