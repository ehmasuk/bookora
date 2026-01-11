"use client"

import {
  LifeBuoy,
  LogOut,
  Moon,
  Settings,
  Share,
  Sun,
  User
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useNextStep } from "nextstepjs"
import ExportBook from "./export-book"


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
  const { setTheme,theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:mr-5">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          {
            theme === "dark" ? (
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
            )
          }

          {bookId && (
            <ExportBook bookId={bookId} format="docx">
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                <span>Export</span>
              </DropdownMenuItem>
            </ExportBook>
          )}


        </DropdownMenuGroup>


        <DropdownMenuItem onClick={handleHelp}>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}





export default ManageBookDropdown