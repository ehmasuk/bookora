"use client";

import useUpdate from "@/hooks/useUpdate";
import handleDragEnd from "@/lib/handleDragEnd";
import { ChapterType } from "@/types/book";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronRight, PanelLeftClose, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import Empty from "../global/Empty";
import Logo from "../global/Logo";
import TitleBox from "../global/TitleBox";
import CreateChapterModal from "../modals/CreateChapterModal";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { CommingSoon } from "../global/CommingSoon";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookSidebar({ isOpen, setIsOpen }: Props) {
  // get book id from url
  const { bookId } = useParams();
  const { updateData } = useUpdate();

  const t = useTranslations("bookpage");

  // fetch chapters
  const {
    data: res,
    error,
    isLoading,
  } = useSWR(bookId ? `/book/${bookId}/chapter` : null);

  if (error) {
    toast.error(error.message);
  }

  const [chapterIsOpen, setChapterIsOpen] = useState<boolean>(true);

  const [allChapters, setAllChapters] = useState<ChapterType[]>([]);

  // handle drag end event for chapters
  const handleChapterDragEnd = (event: DragEndEvent) => {
    const res = handleDragEnd<ChapterType>(event, allChapters);
    if (!res) return;
    const { newOrders, changedItems } = res;
    if (newOrders) setAllChapters(newOrders);

    changedItems?.map((item) => {
      updateData({
        endpoint: `/chapter/${item.id}`,
        data: { position: item.newIndex },
      });
    });
  };

  // if chapter is updated in store then update chapters in sidebar
  useEffect(() => {
    setAllChapters(res?.data || []);
  }, [res]);

  return (
    <div
      className={`absolute top-0 ${
        isOpen ? "left-0" : "left-[-350px]"
      } min-w-[350px] h-screen transition-all duration-300 shadow border border-slate-200 dark:border-gray-700 flex flex-col p-1 bg-slate-50 dark:bg-gray-900 z-50`}
    >
      {/* header => toggler */}
      <div className="flex w-full p-1.5 justify-between items-center">
        <Logo />
        <div id="book-sidebar-toggler">
          <PanelLeftClose
            onClick={() => setIsOpen(!isOpen)}
            size={20}
            className="hover:text-blue-500 duration-300 cursor-pointer"
          />
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col max-h-screen overflow-y-auto">
        {/* options => searchbar */}
        <div className="options mt-4">
          <div className="text-sm group h-[40px] font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer gap-2 flex items-center justify-between">
            <CommingSoon>
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-md border border-slate-300 dark:border-gray-600 p-2 text-sm bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </CommingSoon>
          </div>
        </div>

        <div className="chapters mt-3 flex-1 hover:overflow-y-auto md:overflow-hidden">
          <div className="text-sm group h-[40px] font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer gap-2 flex items-center justify-between">
            <div className="text-slate-600 dark:text-slate-300 flex items-center gap-1 flex-1">
              <div
                onClick={() => setChapterIsOpen(!chapterIsOpen)}
                className="w-4 rounded hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white"
              >
                {allChapters.length > 0 && (
                  <ChevronRight
                    className={`w-4 outline-none transition ${chapterIsOpen ? "rotate-90" : ""}`}
                  />
                )}
              </div>
              <p>{t("chapters")}</p>
            </div>
            <div className="flex gap-2 items-center">
              <CreateChapterModal bookId={bookId as string}>
                <Plus
                  id="create-new-chapter-icon"
                  className="p-1 transition text-gray-500 dark:text-gray-400 size-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                />
              </CreateChapterModal>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-2 px-5">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="w-full h-[40px]" />
              ))}
            </div>
          )}

          {chapterIsOpen && allChapters.length > 0 && (
            <div>
              <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleChapterDragEnd}
              >
                <SortableContext
                  items={allChapters.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {allChapters?.map((chapter: ChapterType, index: number) => (
                    <TitleBox
                      key={chapter.id}
                      id={chapter.id}
                      title={chapter.title}
                      index={index}
                      isSection={false}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}

          {!isLoading && allChapters?.length == 0 && (
            <div className="px-6 mt-4">
              <Empty text="No chapters, create a chapter" />
            </div>
          )}
        </div>
      </div>

      {/* footer => settings */}
      <div className="p-2 flex justify-between">
        <p className="text-slate-400 text-xs dark:text-slate-500">
          A product by{" "}
          <a
            href="https://ehmasuk.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Eh Masuk
          </a>
        </p>
        <p className="text-slate-400 text-xs dark:text-slate-500">
          Bookora v 2.1.1
        </p>
      </div>
    </div>
  );
}

export default BookSidebar;
