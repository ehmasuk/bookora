"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import useAuth from "@/hooks/useAuth";
import { IconBook, IconBrandGithub, IconCompass } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "../auth/login-modal";
import RegisterModal from "../auth/register-modal";
import LanguageChanger from "../global/LanguageChanger";
import Logo from "../global/Logo";

function Navbar() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const { handleLogout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Logo />

        <div className="flex items-center gap-2">
          <Link href="/public-books">
            <Button variant="ghost">
              <IconCompass />
              Explore books
            </Button>
          </Link>

          {status === "authenticated" && (
            <>
              <Link href="/profile">
                <Button variant="ghost">
                  <IconBook />
                  My books
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut />
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {status === "unauthenticated" && (
            <>
              <RegisterModal>
                <Button variant="black" size="sm">
                  Get Started
                </Button>
              </RegisterModal>
              <LoginModal>
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </LoginModal>
            </>
          )}

          <LanguageChanger />
          <AnimatedThemeToggler />

          <Link href="https://github.com/ehmasuk/bookora" target="_blank">
            <Button variant="secondary" size="icon">
              <IconBrandGithub />
            </Button>
          </Link>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
