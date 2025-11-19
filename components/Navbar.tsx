"use client";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = pathname === "";
  return (
    <div className=" flex sticky bg-[#2d2d2d] rounded-[50px]">
      <div className="flex flex-row justify-between items-center py-4 px-7 gap-24">
        {/* Logo */}
        <div className="flex flex-row gap-0.5">
          <Image
            src="/icon.svg"
            alt="DesignFlow logo"
            width={27.21}
            height={16.45}
          />
          <h1 className="font-space text-2xl font-bold text-white">
            DesignFlow
          </h1>
        </div>
        {/* Nav */}
        <nav className="flex flex-row gap-3">
          <div
            className={cn(
              "flex justify-center items-center rounded-4xl text-white",
              pathname == "/landing" && "bg-white text-black"
            )}
          >
            <Link href="/landing" className="font-space py-2 px-6">
              Home
            </Link>
          </div>
          <div
            className={cn(
              "flex justify-center items-center rounded-4xl text-white",
              pathname == "/landing#pricing" && "bg-white text-black"
            )}
          >
            <Link href="#partners" className="font-space py-2 px-6">
              Partners
            </Link>
          </div>
          <div
            className={cn(
              "flex justify-center items-center rounded-4xl text-white",
              pathname == "/landing#why-us" && "bg-white text-black"
            )}
          >
            <Link href="#why-us" className="font-space py-2 px-6">
              Why us?
            </Link>
          </div>
        </nav>
        {/* Button */}
        <div className="flex flex-row gap-0.5">
          <SignedIn>
            <div className="flex bg-[#3285ff] justify-center items-center rounded-4xl text-white">
              <Link href="/" className="font-space py-2 px-6">
                Dashboard
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-row gap-2.5 text-white">
              <Link href="/sign-in" className="font-space py-2 px-6">
                Sign In
              </Link>
              <Link href="/sign-up" className="font-space py-2 px-6">
                Sign Up
              </Link>
            </div>
          </SignedOut>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
