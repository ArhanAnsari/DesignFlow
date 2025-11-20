"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const navLinks = [
  { href: "/landing", label: "Home" },
  { href: "#partners", label: "Partners" },
  { href: "#why-us", label: "Why Us?" },
];

export default function LandingMobileNav() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-800"
        onClick={() => setOpen(true)}
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Right Slide Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              {/* Close Button */}
              <button className="mb-6 self-end" onClick={() => setOpen(false)}>
                <X size={26} />
              </button>

              {/* Menu Links */}
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-10 space-y-4">
                {isSignedIn ? (
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="block bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="block bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className="block border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-center font-semibold"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
