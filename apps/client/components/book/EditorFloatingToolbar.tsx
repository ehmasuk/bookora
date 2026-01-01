import { Editor } from "@tiptap/react";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, Heading1Icon, ItalicIcon, ListIcon, ListOrderedIcon, QuoteIcon } from "lucide-react";

interface Props {
  editor: Editor;
}

function EditorFloatingToolbar({ editor }: Props) {
  return (
    <div className="bubble-menu bg-white dark:bg-gray-800 p-1 rounded border border-gray-100 dark:border-gray-700 shadow flex gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "active" : ""
        } h-8 grid place-items-center w-8 hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <BoldIcon className="w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 }) ? "active" : ""
        } h-8 grid place-items-center w-8 hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <Heading1Icon className="w-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <ItalicIcon className="w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${
          editor.isActive("left") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <AlignLeftIcon className="w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`${
          editor.isActive("center") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <AlignCenterIcon className="w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`${
          editor.isActive("right") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <AlignRightIcon className="w-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <ListIcon className="w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <ListOrderedIcon className="w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote") ? "active" : ""
        } h-8 grid place-items-center w-8  hover:bg-gray-200 dark:hover:bg-gray-700 [&.active]:bg-blue-100 dark:[&.active]:bg-blue-500 bg-gray-50 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer`}
      >
        <QuoteIcon className="w-4" />
      </button>
    </div>
  );
}

export default EditorFloatingToolbar;
