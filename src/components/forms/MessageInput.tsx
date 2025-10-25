import React from "react";

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
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mt-3">
      <input
        value={value}
        onChange={onChange}
        className="flex-1 bg-gray-800 text-white px-4 py-2 rounded outline-none"
        placeholder="Type a message..."
      />
      <button
        disabled={!value.trim()}
        className="bg-blue-600 px-4 rounded text-white disabled:opacity-50 cursor-pointer"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
