"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LandingMobileNav from "@/components/landing/MobileNav";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50 bg-[#2d2d2d]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.svg" alt="logo" width={30} height={30} />
          <h1 className="font-space text-xl md:text-2xl font-bold text-white">
            DesignFlow
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-white font-space">
          <Link
            href="/landing"
            className={cn(
              "px-4 py-2 rounded-3xl hover:bg-white/20 transition",
              pathname === "/landing" && "bg-white text-black"
            )}
          >
            Home
          </Link>

          <Link
            href="#partners"
            className="px-4 py-2 rounded-3xl hover:bg-white/20 transition"
          >
            Partners
          </Link>

          <Link
            href="#why-us"
            className="px-4 py-2 rounded-3xl hover:bg-white/20 transition"
          >
            Why us?
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3 text-white">
          <SignedIn>
            <Link
              href="/"
              className="px-5 py-2 bg-[#3285ff] text-white font-space rounded-3xl"
            >
              Dashboard
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in" className="px-4 py-2 rounded-3xl">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-5 py-2 bg-[#3285ff] text-white rounded-3xl"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <LandingMobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
