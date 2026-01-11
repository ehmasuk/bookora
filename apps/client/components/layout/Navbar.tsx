"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import AvatarDropdown from "../global/AvatarDropdown";
import LanguageChanger from "../global/LanguageChanger";
import Logo from "../global/Logo";
import { Button } from "@workspace/ui/components/button";
import LoginModal from "../auth/login-modal";
import RegisterModal from "../auth/register-modal";

function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {status === "unauthenticated" && (
            <>
              <RegisterModal />
              <LoginModal />
            </>
          )}

          {status === "authenticated" && session?.user && <AvatarDropdown />}

          <LanguageChanger />
          <AnimatedThemeToggler />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-t"
          >
            <div className="flex p-2 gap-1 justify-center">
              <LanguageChanger />
              <AnimatedThemeToggler />
              {status === "unauthenticated" && (
                <>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-black dark:bg-white dark:text-black text-white">Get Started</Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                </>
              )}

              {status === "authenticated" && session?.user && (
                <div onClick={() => setIsOpen(false)}>
                  <AvatarDropdown />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
