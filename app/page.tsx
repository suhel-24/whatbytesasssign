"use client";
import {
  Award,
  BarChart,
  CreditCard,
  File,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import Skilltest from "@/components/home/Skilltest";
import Dashboard from "@/components/home/Dashboard";
import Internship from "@/components/home/Intership";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [activeTab, setActiveTab] = useState("skill-test");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart },
    { id: "skill-test", label: "Skill Test", icon: Award },
    { id: "internship", label: "Internship", icon: File },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-2xl flex items-center">
            <Link href="/" className="mr-2">
              <Image
                src="https://photos.wellfound.com/startups/i/10130633-833576a963b41d8946174d102bdc1200-medium_jpg.jpg?buster=1717832532"
                alt="WhatBytes Logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            WhatBytes
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11">
              <div className="flex items-center gap-2 ">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="my-4">rahil siddique</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-gray-700">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r h-full">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                  activeTab === item.id
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "skill-test" && <Skilltest />}
          {activeTab === "internship" && <Internship />}
        </main>
      </div>
    </div>
  );
}
