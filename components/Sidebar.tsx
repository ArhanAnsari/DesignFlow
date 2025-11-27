"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, FileText, Users, LogOut, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BriefcaseIcon, HomeIcon } from "@primer/octicons-react";
import { signOutAccount } from "@/lib/actions/appwrite.action";

export const navigation = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Find Leads",
    href: "/leads",
    icon: BriefcaseIcon,
  },
  {
    name: "Manage Clients",
    href: "/clients",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[266px] flex-col bg-[#0F1117]/50 pr-6 py-10 justify-between border-r border-[#101012]">
      <div className="flex flex-col gap-[70px] pl-6">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br">
            <Image
              src="/icon.png"
              alt="DesignFlow Logo"
              width={27}
              height={16}
            />
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
                    ? "bg-linear-to-b from-[#0061FF] to-[#60EFFF] text-white"
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
      <div className="px-6 py-4 border-t border-[#2a2a2a]">
        <button
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors cursor-pointer"
          onClick={() => signOutAccount()}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
