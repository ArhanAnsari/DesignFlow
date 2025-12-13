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
    <div className="sidebar">
      <div className="flex flex-col gap-[70px] pl-6">
        {/* Logo */}
        <div className="sidebar-logo-container">
          <div className="image">
            <Image
              src="/icon.png"
              alt="DesignFlow Logo"
              width={27}
              height={16}
            />
          </div>
          <span className="text">DesignFlow</span>
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
                  "sidebar-link",
                  isActive ? "accent-gradient" : "sidebar-link-inactive"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="button" onClick={() => signOutAccount()}>
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
