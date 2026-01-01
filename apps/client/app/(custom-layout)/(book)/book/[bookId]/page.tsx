/**
 * ! This is the editor component
 *
 */

"use client";

import EditorFloatingToolbar from "@/components/book/EditorFloatingToolbar";
import EditorToolbar from "@/components/book/EditorToolbar";
import SelectSection from "@/components/book/SelectSection";
import { Skeleton } from "@workspace/ui/components/skeleton";
import useUpdate from "@/hooks/useUpdate";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useTranslations } from "next-intl";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useSWR from "swr";

function BookTiptapEditor() {
  const searchParams = useSearchParams();
  const querySectionId = searchParams.get("section");
  const querySectionIdRef = useRef(querySectionId);
  const t = useTranslations("bookpage");

  // Update the ref whenever querySectionId changes
  useEffect(() => {
    querySectionIdRef.current = querySectionId;
  }, [querySectionId]);

  const { data: res, isLoading, error } = useSWR(querySectionId ? `/section/${querySectionId}` : null);


  const { updateData } = useUpdate();

  const debounceRef = useRef<((content: Record<string, unknown>) => void) | null>(null);

  // Define the debounce function inside the component, but memoize it with useRef
  if (!debounceRef.current) {
    let timeout: NodeJS.Timeout;
    debounceRef.current = (content: Record<string, unknown>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (querySectionIdRef.current) {
          updateData({ data: { content }, endpoint: `/section/${querySectionIdRef.current}` });
        }
      }, 1000);
    };
  }

  // init the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Placeholder.configure({
        placeholder: t("placeholder"),
      }),
      TextAlign.configure({
        defaultAlignment: "left",
        types: ["heading", "paragraph"],
      }),
    ],

    onUpdate: ({ editor }) => {
      debounceRef.current?.(editor.getJSON());
    },

    content: null,

    editorProps: {
      attributes: {
        class: "main-book-editor",
      },
    },
  });

  // when the content is updated, update the editor content
  useEffect(() => {
    if (res?.data?.content) {
      editor?.commands.setContent(res?.data?.content);
    } else {
      editor?.commands.setContent(null);
    }
  }, [res, editor]);

  if (!editor) {
    return <>{t("loading")}</>;
  }
  if (!querySectionId) return <SelectSection />;

  if (isLoading)
    return (
      <div>
        <Skeleton className="w-full my-5 h-[30px]" />
        <Skeleton className="h-[400px] mt-5 w-full" />
      </div>
    );

  if (error) {
    notFound();
  }

  const section = res?.data;

  return (
    <>
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm md:py-5 py-2 md:mt-5">
        <EditorToolbar editor={editor} />

        <div className="text-xs md:relative fixed bottom-0 right-0">
          <span className="font-semibold text-slate-800 dark:text-white">{editor?.storage.characterCount.characters()}</span> {t("characters")},{" "}
          <span className="font-semibold text-slate-800 dark:text-white">{editor?.storage.characterCount.words()}</span> {t("words")}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-5">{section?.title}</p>

      <div>
        {editor && (
          <BubbleMenu key="bubble" editor={editor} tippyOptions={{ duration: 100 }}>
            <EditorFloatingToolbar editor={editor} />
          </BubbleMenu>
        )}
      </div>

      <EditorContent editor={editor} />
    </>
  );
}

export default BookTiptapEditor;
