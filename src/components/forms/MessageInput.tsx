import React, { useState } from "react";
import { SendHorizontal, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onSubmit,
  onChange,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange({
      target: { value: value + emojiData.emoji },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="relative p-2 border-t border-gray-800">
      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-14 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <form onSubmit={onSubmit} className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className="bg-gray-700 px-3 flex items-center justify-center rounded text-white cursor-pointer hover:bg-gray-600"
        >
          <Smile className="w-5 h-5" />
        </button>
        <input
          value={value}
          onChange={onChange}
          className="flex-1 bg-gray-800 text-white text-sm px-4 py-2 rounded outline-none min-w-0"
          placeholder="Type a message..."
        />
        <button
          disabled={!value.trim()}
          className="bg-blue-600 px-4 flex items-center gap-2 rounded text-white disabled:opacity-50 cursor-pointer"
        >
          <SendHorizontal className="w-4 h-4" />
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
