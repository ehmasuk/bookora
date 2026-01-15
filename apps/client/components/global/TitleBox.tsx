/**
 * ! This is a complex core component
 * ? What id does?
 * - It handles list sorting with the help of the DNDContext
 * - It handles deleting the list items
 * ? Important componnets it is using
 * - TitleAsInput
 * - DeleteConfirmationModal
 * - CreateSectionModal
 * - TitleBox
 * ? Is is also calling its own means there is a recursion
 * ? How it works?
 *  - This compnents takes some props where there is a prop called isSection
 *    If isSection is true then it means it will work
 *    for section list where there will be sorting, deleting and editing title will work
 * - If isSection is false then it will work for chapter list where there will be sorting, deleting and editing title will work
 * - Is shows an empty ui if the list is empty
 */

"use client";

import useDelete from "@/hooks/useDelete";
import useUpdate from "@/hooks/useUpdate";
import handleDragEnd from "@/lib/handleDragEnd";
import { SectionType } from "@/types/book";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical, Plus, Trash } from "lucide-react";
import { useQueryState } from "next-usequerystate";
import { notFound, useParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import CreateSectionModal from "../modals/CreateSectionModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import Empty from "./Empty";
import TitleAsInput from "./TitleAsInput";

type Props = {
  id: string;
  title: string;
  index: number;
  isSection: boolean;
  parentChaperId?: string | null;
};

function TitleBox({ id, title, index, isSection, parentChaperId = null }: Props) {
  // dnd kit config
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // dnd kit config end

  const [sectionQuery, setSectionQuery] = useQueryState("section");
  const [chapterQuery, setChapterQuery] = useQueryState("chapter");

  // get book id from url
  const { bookId } = useParams();

  // custom hooks
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  // if chapter is in query params then open the chapter else keep it close
  const [isOpen, setIsOpen] = useState<boolean>(chapterQuery === id);

  // set sections to a state to update sorted order
  const [allSections, setAllSections] = useState<SectionType[]>([]);

  // handle drag end event for sections
  const handleSectionDragEnd = (event: DragEndEvent) => {
    const res = handleDragEnd<SectionType>(event, allSections);

    if (!res) return;

    const { newOrders, changedItems } = res;

    if (newOrders) setAllSections(newOrders);
    changedItems?.map((item) => {
      updateData({
        endpoint: `/section/${item.id}`,
        data: { position: item.newIndex },
      });
    });
  };

  // ARCHITECTURE DECISION: fetch sections only when the user clicks on the chapter
  // fetch all sections of the chapter
  const { data: res, isLoading, error, mutate: fetchSections } = useSWR(id ? `/chapter/${id}/section` : null);

  useEffect(() => {
    setAllSections(res?.data || []);
  }, [res]);

  // when click on a chapter
  const handleChapterClick = () => {
    // fetch sections
    fetchSections();

    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setChapterQuery(id);
    }
  };

  // when click on a section
  const handleSectionClick = () => {
    // set section query on url
    setSectionQuery(id);

    // set chapter query on url
    setChapterQuery(parentChaperId);
  };

  const onDeleteSuccess = () => {
    switch (isSection) {
      case true:
        if (!parentChaperId) {
          toast.error("Invalid chapter reference");
          return;
        }
        // after delete a section , remove its id from query param
        mutate(`/chapter/${parentChaperId}/section`, undefined, {
          revalidate: true,
        });
        // after delete a section , remove its id from query param
        if (id === sectionQuery) setSectionQuery(null);
        break;
      case false:
        // refectch chapters
        mutate(`/book/${bookId}/chapter`, undefined, { revalidate: true });
        // after delete a chapter , remove its id from query param
        if (id === chapterQuery) setChapterQuery(null);
        break;
    }
  };

  // handle delete chapter or section when user confirms from DeleteConfirmationModal modal
  const handleDelete = () => {
    const url = isSection ? `/section/${id}` : `/chapter/${id}`;

    deleteData({
      url,
      onSuccess: onDeleteSuccess,
    });
  };

  const onSuccessCreateSection = () => {
    setIsOpen(true);
  };

  const handleUpdateTitle = useCallback(
    (newTitle: string) => {
      const data = { title: newTitle };
      updateData({
        data,
        endpoint: isSection ? `/section/${id}` : `/chapter/${id}`,
        doMutation: true,
      });
    },
    [id, isSection, updateData]
  );

  if (error) {
    toast.error("Chapter not found");
    notFound();
  }

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className={`text-sm group ${
          isSection && sectionQuery === id ? "bg-gray-100 dark:bg-gray-800" : ""
        } h-10 mb-1 font-medium py-1 px-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer gap-1 flex items-center justify-between`}
      >
        <div className="flex items-center gap-1 flex-1" onClick={isSection ? handleSectionClick : handleChapterClick}>
          <div className="text-gray-500 dark:text-gray-400 group h-6 min-w-[40px] text-sm grid place-items-center rounded">
            <span className="group-hover:hidden pt-[2px] hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">{index + 1}</span>
            <div className="flex">
              <div className="hidden rounded group-hover:block hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">
                <GripVertical onClick={(e) => e.stopPropagation()} {...attributes} {...listeners} className="w-4 cursor-grab outline-none" />
              </div>
              {!isSection && (
                <div className="hidden rounded group-hover:block hover:bg-slate-200 dark:hover:bg-blue-400 dark:hover:text-white">
                  <ChevronRight className={`w-4 outline-none transition ${isOpen ? "rotate-90" : ""}`} />
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <TitleAsInput title={title} maxCharachter={20} handleSubmit={handleUpdateTitle} />
        </div>
        <div className="flex gap-2 items-center">
          <div className="hidden transition group-hover:block overflow-hidden">
            <DeleteConfirmationModal onConfirm={handleDelete} text={`Are you sure you want to delete this ${isSection ? "section" : "chapter"}?`}>
              <Trash className="p-1 text-gray-500 dark:text-gray-400 size-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500" />
            </DeleteConfirmationModal>
          </div>

          {!isSection && (
            <CreateSectionModal onSuccess={onSuccessCreateSection} chapterId={id}>
              <Plus className="p-1 hidden transition group-hover:block text-gray-500 dark:text-gray-400 size-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700" />
            </CreateSectionModal>
          )}
        </div>
      </div>

      {isOpen && allSections && allSections?.length > 0 && (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleSectionDragEnd}>
          <SortableContext items={allSections?.map((item: SectionType) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="ml-[23px] border-l border-gray-300 dark:border-slate-700">
              {allSections?.map((section: SectionType, index: number) => (
                <TitleBox key={section.title} id={section.id} title={section.title} index={index} isSection={true} parentChaperId={section.chapter} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isOpen && !isLoading && allSections?.length == 0 && (
        <div className="pl-12">
          <Empty text="No sections" />
        </div>
      )}
    </div>
  );
}

export default memo(TitleBox);
