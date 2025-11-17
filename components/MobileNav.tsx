"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navigation } from "./Sidebar";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-semibold">DesignFlow</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 font-inter">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SheetClose asChild key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-linear-to-b from-[#0061FF] to-[#60EFFF] text-white"
                      : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
