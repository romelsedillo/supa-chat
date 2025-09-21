import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatBox = () => {
  const messages = [
    { id: 1, sender: "Alice", text: "Hey! Are you free later?", self: false },
    { id: 2, sender: "You", text: "Yeah, I should be! What's up?", self: true },
    {
      id: 3,
      sender: "Alice",
      text: "Let’s test this Supa-Chat app 🚀",
      self: false,
    },
    {
      id: 4,
      sender: "You",
      text: "Haha nice! It’s working smoothly 🔥",
      self: true,
    },
    {
      id: 5,
      sender: "Alice",
      text: "Perfect, I’ll invite others too 😎",
      self: false,
    },
  ];
  return (
    <div className="col-span-9 bg-white">
      <div>
        <div className="w-full p-2 flex border border-slate-300">
          <Avatar className="w-12 h-12 border-2 border-green-500">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center ml-3">
            <h2 className="text-sm text-slate-800te">Romel Sedillo</h2>
            <h3 className="text-xs text-slate-600">@romelsedillo</h3>
          </div>
        </div>
        <div className="flex flex-col w-full mx-auto h-[500px] border rounded-lg bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.self ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar only for other users */}
                {!msg.self && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/1.jpg" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                )}

                {/* Message bubble */}
                <div
                  className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                    msg.self
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2 p-3 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
