"use client";

import useUpdate from "@/hooks/useUpdate";
import { StoreType } from "@/store/store";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useStoreState } from "easy-peasy";
import { CloudCheck, HomeIcon, LoaderIcon, Menu, PanelRightClose, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useNextStep } from "nextstepjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import AvatarDropdown from "../global/AvatarDropdown";
import LanguageChanger from "../global/LanguageChanger";
import TitleAsInput from "../global/TitleAsInput";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";
import ManageBookDropdown from "./manage-book-dropdown";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookNav({ isOpen, setIsOpen }: Props) {
  const bookIsUpdating = useStoreState<StoreType>((state) => state.book.bookIsUpdating);

  const { updateData } = useUpdate();



  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);

  // get book id from url
  const { bookId } = useParams();



  // fetch book data and set in bookinfo and chapters in store from the book data
  const { data: res, error, isLoading } = useSWR(bookId ? `/book/${bookId}` : null);

  if (error) {
    toast.error(error.message);
  }

  const book = res?.data;

  const updateBookTitle = (title: string) => {
    updateData({ data: { title }, endpoint: `/book/${bookId}` });
  };

  return (
    <nav className="flex border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 w-full sticky top-0 flex-wrap gap-2 items-center justify-between md:px-8 px-2 py-2 dark:bg-gray-900">
      <div className="flex gap-5 items-center">
        {!isOpen && <PanelRightClose onClick={() => setIsOpen(!isOpen)} size={20} className="hover:text-blue-500 duration-300 cursor-pointer" />}

        {isLoading && <Skeleton className="w-50 h-5 mt-2" />}

        {/* Book title */}
        {!isLoading && (
          <div id="book-name">
            <TitleAsInput maxCharachter={isMobile ? 30 : null} title={book?.title} handleSubmit={updateBookTitle} />
          </div>
        )}

        {/* Loading state */}

        {bookIsUpdating ? <LoaderIcon size={18} className="animate-spin" /> : <CloudCheck size={18} />}
      </div>

      {/* desktop */}
      <div className="hidden md:flex gap-3 items-center">
        {/* <AvatarDropdown />
        <AnimatedThemeToggler />
        <Button variant="outline" onClick={handleHelp}>Help</Button> */}
        <ManageBookDropdown />
      </div>



      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <button onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          {mobileNavIsOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileNavIsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-t w-full"
          >
            <div className="flex p-2 gap-2 w-full justify-center items-center">
              <Link href="/">
                <HomeIcon size={18} className="w-6 h-6" />
              </Link>
              <AvatarDropdown />
              <LanguageChanger />
              <AnimatedThemeToggler />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default BookNav;
