"use client";

import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import { MobileNav } from "./MobileNav";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/find-leads": "Find Leads",
  "/manage-clients": "Manage Clients",
};

export function Topbar() {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Home";

  return (
    <div className="flex h-16 items-center justify-between lg:justify-end px-6 bg-[#0F1117]/50">
      <div className="flex lg:hidden">
        <MobileNav />
      </div>
      <div className="flex items-center gap-4">
        {/* <ModeToggle /> */}
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </div>
  );
}
