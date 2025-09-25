import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { SendHorizontal, FileImage, Smile, Phone, Video } from "lucide-react";
import { Button } from "../ui/button";
import ChatHeaderOptions from "../modals/ChatHeaderOptions";
import ChatMateAvatar from "./ChatMateAvatar";
const ChatBox = () => {
  const messages = [
    {
      id: 1,
      sender: "Alice",
      text: "Hey! Are you free later? I was thinking we could catch up and maybe test out this new chat app together. 😊",
      self: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Yeah, I should be! What's up? I’ve been working on Supa-Chat for a while now, and it’s finally starting to feel smooth.",
      self: true,
    },
    {
      id: 3,
      sender: "Alice",
      text: "Let’s test this Supa-Chat app 🚀. I want to see how it handles longer messages, emojis, and whether the design looks good with text wrapping properly.",
      self: false,
    },
    {
      id: 4,
      sender: "You",
      text: "Haha nice! It’s working smoothly 🔥. The real-time updates are instant, and I think the overall UI is looking much cleaner than before. It’s starting to feel like a real chat app now!",
      self: true,
    },
    {
      id: 5,
      sender: "Alice",
      text: "Perfect, I’ll invite others too 😎. If it works with multiple people at the same time, then you’re onto something big here. Can’t wait to see how it scales!",
      self: false,
    },
    {
      id: 6,
      sender: "You",
      text: "Yeah, I really want to stress test it with a group chat. Supabase handles the real-time part really well, but I still need to polish the UI with Zustand and shadcn. 👨‍💻",
      self: true,
    },
    {
      id: 7,
      sender: "Alice",
      text: "Honestly, it already feels way better than a lot of simple chat apps I’ve used. The bubbles, the avatars, and the overall layout just work together so nicely.",
      self: false,
    },
    {
      id: 8,
      sender: "You",
      text: "Thanks! I’m also planning to add profile pictures, online/offline status, and maybe even a typing indicator. That would make the experience much more interactive.",
      self: true,
    },
    {
      id: 9,
      sender: "Alice",
      text: "Typing indicators would be so cool 👀. Imagine seeing multiple people typing at once in a busy group chat, it would feel so alive!",
      self: false,
    },
    {
      id: 10,
      sender: "You",
      text: "Exactly! And I’m also thinking about push notifications for new messages. That way people can actually use it daily instead of just during tests.",
      self: true,
    },
    {
      id: 11,
      sender: "Alice",
      text: "That would be 🔥🔥. Honestly, if you release this as a side project, I think a lot of devs would want to try it out. People love minimal but functional apps.",
      self: false,
    },
    {
      id: 12,
      sender: "You",
      text: "Haha let’s see 😅. For now, I’ll just keep building and refining it. Thanks for being my tester!",
      self: true,
    },
  ];
  const chat = {
    name: "Alice Johnson",
    email: "@alice.j",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    active: true,
  };
  return (
    <div className="col-span-9 rounded-e-lg flex flex-col">
      {/* Header */}
      <div className="w-full p-2 flex border-y-2 border-r-2 border-gray-800 rounded-tr-lg">
        <div className="flex items-center gap-3">
          <ChatMateAvatar chat={chat} size="lg" />
          <div className="flex flex-col">
            <h2 className="text-sm text-white font-medium">{chat.name}</h2>
            <h2 className="text-xs text-white font-medium">{chat.email}</h2>
          </div>
        </div>
        <div className="ml-auto cursor-pointer flex gap-3 items-center">
          <div className="flex items-center gap-4">
            <Phone
              size={18}
              className="cursor-pointer text-white hover:text-gray-400"
            />
            <Video
              size={18}
              className="cursor-pointer text-white hover:text-gray-400"
            />
          </div>
          <ChatHeaderOptions />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 border-r-2 border-gray-800">
        <ScrollArea className="h-[425px] flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 mt-6 ${
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
                    ? "bg-gradient-to-r from-violet-500 to-violet-700 text-white rounded-br-none"
                    : "bg-gradient-to-r from-purple-200 to-violet-300 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Input Box */}
      <div className="flex gap-2 p-3 border-y-2 border-r-2 border-gray-800 rounded-br-lg">
        <div className="flex items-center gap-2 ">
          <FileImage
            size={18}
            className="text-sm cursor-pointer text-white hover:text-gray-400"
          />
          <Smile
            size={18}
            className="cursor-pointer text-white hover:text-gray-400"
          />
        </div>
        <Input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border caret-violet-500 placeholder:text-white border-gray-700 rounded px-3 py-4 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus:border-none"
        />
        <Button className="bg-gradient-to-r from-violet-500 to-violet-700 flex items-center text-white px-4 py-2 rounded hover:from-violet-600 hover:to-violet-800 cursor-pointer">
          <SendHorizontal size={18} className="mr-1" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
