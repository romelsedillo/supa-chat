"use client";

import { CiMenuKebab } from "react-icons/ci";
import { EllipsisVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DeleteConversation from "./DeleteConversation";
import BlockConversation from "./BlockConversation";

export default function ChatHeaderOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer hover:bg-gray-800 p-1"
        >
          <EllipsisVertical strokeWidth={2} className="text-gray-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DeleteConversation />
        <DropdownMenuSeparator />
        <BlockConversation />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
