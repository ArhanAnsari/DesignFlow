"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, FileText, Users, LogOut, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Cloud,
  },
  {
    name: "Find Leads",
    href: "/leads",
    icon: FileText,
  },
  {
    name: "Manage Clients",
    href: "/manage-clients",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[266px] flex-col bg-[#0F1117/50] px-6 py-10 justify-between">
      <div className="flex flex-col gap-[70px]">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <Send className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-semibold text-white font-space">
            DesignFlow
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col font-inter gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gradient-to-b from-[#0061FF] to-[#60EFFF] text-white"
                    : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-[#2a2a2a]">
        <SignedIn>
          <SignOutButton>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors">
              <LogOut className="h-5 w-5" />
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
