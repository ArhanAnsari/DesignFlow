"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LandingMobileNav from "@/components/landing/MobileNav";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  return (
    <header
      className="
        w-full sticky top-0 z-50 
        bg-[#F6F7F9]/70 
        backdrop-blur-xl 
        border-b border-white/30
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/icon.svg" 
            alt="logo" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <h1 className="font-space text-xl md:text-2xl font-bold text-gray-900">
            DesignFlow
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-space text-gray-800">
          <Link
            href="/landing"
            className={cn(
              "px-4 py-2 rounded-xl transition-all duration-200 hover:bg-gray-200/60",
              pathname === "/landing" &&
                "bg-gray-900 text-white hover:bg-gray-900"
            )}
          >
            Home
          </Link>

          <a
            href="#partners"
            className="px-4 py-2 rounded-xl hover:bg-gray-200/60 transition-all duration-200"
          >
            Partners
          </a>

          <a
            href="#why-us"
            className="px-4 py-2 rounded-xl hover:bg-gray-200/60 transition-all duration-200"
          >
            Why Us?
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <Link
              href="/"
              className="
                px-6 py-2.5 
                bg-blue-600 text-white 
                font-space font-semibold 
                rounded-xl shadow-sm 
                hover:shadow-md hover:bg-blue-700 
                transition-all duration-200
              "
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="
                  px-4 py-2 text-gray-700 
                  hover:text-gray-900 
                  font-space transition
                "
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="
                  px-6 py-2.5 
                  bg-blue-600 text-white 
                  font-space font-semibold 
                  rounded-xl shadow-sm 
                  hover:bg-blue-700 hover:shadow-md 
                  transition-all duration-200
                "
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <LandingMobileNav />
        </div>
      </div>
    </header>
  );
}