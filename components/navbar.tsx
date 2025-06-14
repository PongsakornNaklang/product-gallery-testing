"use client"

import { Search, Bell, User, Settings2Icon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-10">
        <div className="flex items-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0L23.4682 7.05659L30 2.67949L29.4752 10.5248L37.3205 10L32.9434 16.5318L40 20L32.9434 23.4682L37.3205 30L29.4752 29.4752L30 37.3205L23.4682 32.9434L20 40L16.5318 32.9434L10 37.3205L10.5248 29.4752L2.67949 30L7.05659 23.4682L0 20L7.05659 16.5318L2.67949 10L10.5248 10.5248L10 2.67949L16.5318 7.05659L20 0Z" fill="#363636" />
          </svg>
        </div>

        <div className="flex-1 w-full ml-80 mr-8 hidden lg:block">
          <div className="relative max-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for anything"
              className="bg-neutral-100 pl-10 pr-4 py-2 w-full rounded-full border-none ring-0 focus:ring-0 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="space-x-2 hidden lg:block">
            <Button variant="ghost" size="icon" className="rounded-full relative p-2">
              <Bell className="size-8 text-neutral-600" fill="#363636" />
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span>
            </Button>
          </div>
          <div className="space-x-2 lg:hidden block">
            <Button variant="ghost" size="icon" className="rounded-full relative p-2">
              <Search className="size-8 text-neutral-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative p-2">
              <Settings2Icon className="size-8 text-neutral-600" />
            </Button>
          </div>
          <Avatar className="size-8">
            <AvatarImage src="/avatar.png?height=32&width=32" alt="User" />
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
