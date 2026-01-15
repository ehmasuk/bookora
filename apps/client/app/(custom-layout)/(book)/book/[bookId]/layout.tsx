import BookNav from "@/components/book/editor-nav";
import BookSidebar from "@/components/book/editor-sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function BookLayout({ children }: Props) {
  return (
    <main className="h-screen overflow-hidden flex">
      <BookSidebar />
      <div className="flex-1">
        <BookNav />
        <div className="h-[calc(100vh-100px)] overflow-y-auto px-5 relative">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default BookLayout;
