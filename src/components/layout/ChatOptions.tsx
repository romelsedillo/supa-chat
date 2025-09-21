"use client";

import { CiMenuKebab } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ChatOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full  cursor-pointer hover:bg-gray-200"
        >
          <CiMenuKebab className="text-sm text-slate-900" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => alert("Mute Chat")}>
          Mute Chat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert("Delete Conversation")}>
          Delete Conversation
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => alert("Block User")}
        >
          Block User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
