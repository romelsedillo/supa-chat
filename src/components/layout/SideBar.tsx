import React from "react";

import ProfileOptions from "../modals/ProfileOptions";
import UserProfile from "./UserProfile";
import SearchUser from "../modals/SearchUser";
import ChatMateList from "./ChatMateList";

const SideBar = () => {
  return (
    <div className="hidden sm:flex flex-col sm:col-span-5 md:col-span-4 lg:col-span-3 border-2 border-gray-800 rounded-s-lg">
      <div className="p-2 flex">
        <UserProfile />
        <div className="ml-auto cursor-pointer flex items-center">
          <ProfileOptions />
        </div>
      </div>
      <div className="w-full px-2 flex items-center justify-center">
        <SearchUser />
      </div>
      <ChatMateList />
    </div>
  );
};

export default SideBar;
