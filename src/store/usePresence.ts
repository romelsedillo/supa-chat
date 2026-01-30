"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

type PresenceEntry = { online: boolean };

interface PresenceState {
  onlineUsers: Record<string, PresenceEntry[]>;
  channel: ReturnType<typeof supabase.channel> | null;
  initPresence: (userId: string) => void;
  isOnline: (userId: string) => boolean;
}

export const usePresenceStore = create<PresenceState>((set, get) => ({
  onlineUsers: {},
  channel: null,

  initPresence: (userId: string) => {
    // Prevent duplicate channels
    if (get().channel) return;

    const channel = supabase.channel("online-users", {
      config: { presence: { key: userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as Record<
          string,
          PresenceEntry[]
        >;
        set({ onlineUsers: state });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online: true });
        }
      });

    set({ channel });
  },

  isOnline: (userId: string) => {
    return !!get().onlineUsers[userId]?.length;
  },
}));
