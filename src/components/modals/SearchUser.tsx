"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { Plus } from "lucide-react";
type UserProfile = {
  id: string;
  name: string;
  avatar_url?: string;
  user_status: string;
};

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) return setResults([]);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("id, name, avatar_url, user_status")
      .ilike("name", `%${value}%`)
      .limit(10);

    if (error) console.error("Search error:", error);
    else setResults(data || []);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center gap-2 w-full my-2">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-2 flex-1 text-white text-sm placeholder:text-white border border-gray-700 rounded outline-none "
          />
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer font-bold rounded bg-transparent text-white"
          >
            <Plus />
          </Button>
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        <Input
          autoFocus
          placeholder="Type a name or email..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-4 rounded focus-visible:border-violet-500 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {results.length === 0 && searchTerm && (
            <p className="text-sm text-muted-foreground">No users found.</p>
          )}

          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
            >
              <div className="relative">
                <Avatar className=" border-2 border-violet-500">
                  <AvatarImage src={user.avatar_url} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute ${
                    user.user_status === "online"
                      ? "bg-green-400"
                      : "bg-gray-400"
                  }  rounded-full h-2 w-2 -bottom-0 -right-0`}
                ></span>
              </div>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUser;
