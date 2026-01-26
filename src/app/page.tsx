"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/layout/SideBar";
import OnlineStatusUpdater from "@/components/modals/OnlineStatusUpdater";
import ChatBoxTwo from "@/components/layout/ChatBoxTwo";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-500"></div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <OnlineStatusUpdater />
          <div className="bg-[#0a0a0a] rounded-lg h-[660px] w-full overflow-hidden max-w-6xl mx-auto grid grid-cols-12">
            <SideBar />
            <ChatBoxTwo />
          </div>
        </>
      )}
    </>
  );
}
