"use client";

import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

// Type for presence entries from Supabase
type PresenceEntry = { online: boolean };

// Zustand state interface
interface PresenceState {
  onlineUsers: Record<string, PresenceEntry[]>;
  initPresence: (userId: string) => void;
  isOnline: (userId: string) => boolean;
}

export const usePresenceStore = create<PresenceState>((set, get) => ({
  onlineUsers: {},

  initPresence: (userId: string) => {
    const presenceChannel = supabase.channel("online-users", {
      config: {
        presence: { key: userId },
      },
    });

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState() as Record<
          string,
          PresenceEntry[]
        >;

        set({ onlineUsers: state });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await presenceChannel.track({ online: true });
        }
      });
  },

  isOnline: (userId: string) => {
    const users = get().onlineUsers;
    return !!users[userId]?.length;
  },
}));
