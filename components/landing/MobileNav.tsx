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
        className="md:hidden p-2 text-gray-900"
        onClick={() => setOpen(true)}
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sliding Drawer */}
         <motion.div
            className="
            fixed top-0 right-0 h-full w-72 
            bg-[#F6F7F9]/95 
            backdrop-blur-xl 
            shadow-xl z-50 
            flex flex-col p-6 border-l border-white/30
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
             exit={{ x: "100%" }}
             transition={{ type: "tween", duration: 0.25 }}
          >
              {/* Close Button */}
              <button
                className="mb-6 self-end text-gray-700 hover:text-gray-900"
                onClick={() => setOpen(false)}
              >
                <X size={26} />
              </button>

              {/* Menu Links */}
              <nav className="space-y-5 mt-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="
                        block text-lg font-medium 
                        text-gray-800 hover:text-blue-600 
                        transition-all tracking-wide
                      "
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <div className="mt-8 h-px bg-gray-300/60"></div>

              {/* Auth Buttons */}
              <div className="mt-6 space-y-4">
                {isSignedIn ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="
                        block bg-blue-600 text-white 
                        py-2.5 px-4 rounded-xl 
                        font-semibold text-center 
                        shadow-sm hover:shadow-md 
                        transition-all
                      "
                    >
                      Go to Dashboard
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Link
                        href="/sign-in"
                        onClick={() => setOpen(false)}
                        className="
                          block bg-blue-600 text-white 
                          py-2.5 px-4 rounded-xl 
                          font-semibold text-center 
                          shadow-sm hover:shadow-md 
                          transition-all
                        "
                      >
                        Sign In
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        href="/sign-up"
                        onClick={() => setOpen(false)}
                        className="
                          block border border-blue-600 text-blue-600 
                          py-2.5 px-4 rounded-xl 
                          font-semibold text-center 
                          hover:bg-blue-50 transition-all
                        "
                      >
                        Create Account
                      </Link>
                    </motion.div>
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
