'use client'

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import startDownload from "@/actions/download-book";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateHTML } from "@tiptap/html";
import { saveAs } from "file-saver";

const extensions = [Document, Paragraph, Text, Bold];




type Props = {
  children:React.ReactNode;
  bookId:string;
}

export default function ExportBook({children,bookId}:Props){

  const [fetchBook,setfetchBook] = useState<boolean>(false);

  // fetch book
  const { data: res, error, isLoading } = useSWR(fetchBook ? `/book/${bookId}/export` : null);

  const downloadBook = async (html: string) => {
    const buffer = await startDownload(html);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, "book.docx");
  };


  useEffect(() => {
    if (res && res.data && fetchBook) {
      const html = buildBookHTML(res.data);
      downloadBook(html);
      toast.success("Book exported successfully");
      setfetchBook(false);
    }
  }, [res, fetchBook]);

  const handleExport = () => {
    if (!bookId) {
      toast.error("Something went wrong, please try again later");
      return;
    }
    setfetchBook(true);
  };
    
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      setfetchBook(false);
    }
  }, [error]);



  return (
    <div onClick={handleExport}>
    {children}
    </div>
  )
}



function buildBookHTML(book: any) {
  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${book.title}</title>
    </head>
    <body>
      <h1>${book.title}</h1>

      ${book.chapters
        .sort((a: any, b: any) => a.position - b.position)
        .map(
          (chapter: any) => `
          <h2>${chapter.title}</h2>

          ${chapter.sections
            .sort((a: any, b: any) => a.position - b.position)
            .map(
              (section: any) => `
              <h3>${section.title}</h3>
              ${generateHTML(section.content, extensions)}
            `
            )
            .join("")}
        `
        )
        .join("")}
    </body>
  </html>
  `;
}
