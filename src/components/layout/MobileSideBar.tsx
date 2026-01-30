import React from "react";

import ProfileOptions from "../modals/ProfileOptions";
import UserProfile from "./UserProfile";
import SearchUser from "../modals/SearchUser";
import ChatMateList from "./ChatMateList";
import { useChatStore } from "@/store/chatStore";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SideBar = () => {
  const { selectedChatmate } = useChatStore();

  return (
    <div
      className={`${selectedChatmate ? "hidden" : "flex"} flex-col items-start sm:hidden max-w-sm col-span-full border-2 border-gray-800`}
    >
      <div className="p-2 flex items-center w-full">
        <UserProfile />
        <div className="ml-auto cursor-pointer flex items-center">
          <ProfileOptions />
        </div>
      </div>
      <div className="w-full px-2 flex items-center justify-center">
        <SearchUser />
      </div>
      <div className="w-full">
        <ChatMateList />
      </div>
    </div>
  );
};

export default SideBar;
