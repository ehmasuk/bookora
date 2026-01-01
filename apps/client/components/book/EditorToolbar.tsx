import { Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading, Italic, ListIcon, ListOrdered, QuoteIcon } from "lucide-react";
interface Props {
  editor: Editor;
}
function EditorToolbar({ editor }: Props) {
  return (
    <div className="flex flex-wrap md:gap-3 gap-2 align-center">
      <div
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center  ${
          editor.isActive("bold") ? "active" : ""
        }`}
      >
        <Bold className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center  ${
          editor.isActive("heading", { level: 3 }) ? "active" : ""
        }`}
      >
        <Heading className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center  ${
          editor.isActive("italic") ? "active" : ""
        }`}
      >
        <Italic className="w-4 h-4" />
      </div>

      <div
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center  ${
          editor.isActive("bulletList") ? "active" : ""
        }`}
      >
        <ListIcon className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center  ${
          editor.isActive("orderedList") ? "active" : ""
        }`}
      >
        <ListOrdered className="w-4 h-4" />
      </div>

      {/* alignments */}

      <div
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`cursor-pointer hidden bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 md:grid place-items-center  ${
          editor.isActive("left") ? "active" : ""
        }`}
      >
        <AlignLeft className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 md:grid hidden place-items-center  ${
          editor.isActive("center") ? "active" : ""
        }`}
      >
        <AlignCenter className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 md:grid hidden place-items-center  ${
          editor.isActive("right") ? "active" : ""
        }`}
      >
        <AlignRight className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 md:grid hidden place-items-center  ${
          editor.isActive("justify") ? "active" : ""
        }`}
      >
        <AlignJustify className="w-4 h-4" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center  ${
          editor.isActive("blockquote") ? "active" : ""
        }`}
      >
        <QuoteIcon className="w-4 h-4" />
      </div>

      <div
        className="cursor-pointer bg-blue-100 border dark:border-zinc-800 border-zinc-100 rounded text-sm [&.active]:bg-blue-200 [&.active]:text-slate-800 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-200 size-6 md:size-7 grid place-items-center"
        onClick={() => editor.chain().focus().insertContent("—").run()}
      >
        —
      </div>
    </div>
  );
}

export default EditorToolbar;
