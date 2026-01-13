"use client";

import { Globe, ImagePlus, Languages, LifeBuoy, LogOut, Moon, Settings, Share, Sun } from "lucide-react";

import { IconBook } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useNextStep } from "nextstepjs";
import { mutate } from "swr";
import BookCoverUploadModal from "../modals/BookCoverUploadModal";
import BookStatusModal from "../modals/BookStatusModal";
import LanguageModal from "../modals/LanguageModal";
import ExportBook from "./export-book";

function ManageBookDropdown() {
  // get book id from url
  const params = useParams();
  const rawBookId = params.bookId;
  const bookId = Array.isArray(rawBookId) ? rawBookId[0] : rawBookId;

  // HELP
  const { startNextStep } = useNextStep();
  const handleHelp = () => {
    startNextStep("mainTour");
  };

  // THEME
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:mr-5">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-foreground/50">Links</DropdownMenuLabel>
          {/* links */}
          <Link href="/profile">
            <DropdownMenuItem>
              <IconBook className="mr-2 size-4" />
              <span>My books</span>
            </DropdownMenuItem>
          </Link>

          {/* book options */}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-foreground/50">Book options</DropdownMenuLabel>
          {bookId && (
            <>
              <BookStatusModal bookId={bookId}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Globe className="mr-2 size-4" />
                  <span>Publish</span>
                </DropdownMenuItem>
              </BookStatusModal>
              <BookCoverUploadModal bookId={bookId} onSuccess={() => mutate(`/book/${bookId}`)}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ImagePlus className="mr-2 size-4" />
                  <span>Upload Cover</span>
                </DropdownMenuItem>
              </BookCoverUploadModal>
              <ExportBook bookId={bookId} format="docx">
                <DropdownMenuItem>
                  <Share className="mr-2 size-4" />
                  <span>Download</span>
                </DropdownMenuItem>
              </ExportBook>
            </>
          )}

          {/* settings */}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-foreground/50">Settings</DropdownMenuLabel>
          {theme === "dark" ? (
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 size-4" />
              <span>Light</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 size-4" />
              <span>Dark</span>
            </DropdownMenuItem>
          )}

          <LanguageModal>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Languages className="mr-2 size-4" />
              <span>Language</span>
            </DropdownMenuItem>
          </LanguageModal>
        </DropdownMenuGroup>

        <DropdownMenuItem onClick={handleHelp}>
          <LifeBuoy className="mr-2 size-4" />
          <span>Help</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ManageBookDropdown;
