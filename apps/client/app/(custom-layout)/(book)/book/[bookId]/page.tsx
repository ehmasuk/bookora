/**
 * ! This is the editor component
 */

"use client";

import { ChapterSummarySheet } from "@/components/book/chapter-summary-sheet";
import EditorFloatingToolbar from "@/components/book/EditorFloatingToolbar";
import EditorToolbar from "@/components/book/EditorToolbar";
import SelectSection from "@/components/book/SelectSection";
import BookEditorSkeleton from "@/components/skeletons/book-editor";
import useDebounce from "@/hooks/useDebounce";
import useUpdate from "@/hooks/useUpdate";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { BubbleMenu, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useTranslations } from "next-intl";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

function BookTiptapEditor() {
  const searchParams = useSearchParams();
  const querySectionId = searchParams.get("section");
  const t = useTranslations("bookpage");

  const { data: res, isLoading, error } = useSWR(querySectionId ? `/section/${querySectionId}` : null);

  const { updateData } = useUpdate();

  const [content, setContent] = useState<JSONContent | null>(null);

  const debounce = useDebounce({ value: content, delay: 1000 });

  const [isUpdateable, setIsUpdateable] = useState(false);

  useEffect(() => {
    if (!content || !querySectionId || !isUpdateable) return;
    updateData({
      data: { content },
      endpoint: `/section/${querySectionId}`,
    });
    setIsUpdateable(false);
  }, [debounce]);

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
      setContent(editor.getJSON());
      setIsUpdateable(true);
    },

    content: null,

    editorProps: {
      attributes: {
        class: "main-book-editor",
      },
    },
    immediatelyRender: false,
  });

  // when the content is updated, update the editor content
  useEffect(() => {
    if (res?.data?.content) {
      setContent(res?.data?.content);
      editor?.commands.setContent(res?.data?.content);
    } else {
      editor?.commands.setContent(null);
    }
  }, [res, editor]);

  if (!editor || isLoading) {
    return <BookEditorSkeleton />;
  }

  if (!querySectionId) return <SelectSection />;

  if (error) {
    notFound();
  }

  const section = res?.data;

  return (
    <div>
      {/* top toolbar and character count */}
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm md:py-5 py-2 md:mt-5">
        <EditorToolbar editor={editor} />
        <div className="text-xs flex gap-5 items-center md:relative fixed bottom-0 right-0">
          <div>
            <span className="font-semibold text-slate-800 dark:text-white">{editor?.storage.characterCount.characters()}</span> {t("characters")},{" "}
            <span className="font-semibold text-slate-800 dark:text-white">{editor?.storage.characterCount.words()}</span> {t("words")}
          </div>
        </div>

        <ChapterSummarySheet chapterId={section?.chapter} />
      </div>

      {/* section title */}
      <p className="text-sm text-gray-500 mb-5">{section?.title}</p>

      {/* editor */}
      <div>
        {editor && (
          <BubbleMenu key="bubble" editor={editor} tippyOptions={{ duration: 100 }}>
            <EditorFloatingToolbar editor={editor} />
          </BubbleMenu>
        )}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default BookTiptapEditor;
