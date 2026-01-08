'use client'

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

type Props = {
  children:React.ReactNode;
  bookId:string;
}

export default function ExportBook({children,bookId}:Props){

  const [fetchBook,setfetchBook] = useState<boolean>(false);

  // fetch book
  const { data: res, error, isLoading } = useSWR(fetchBook ? `/book/${bookId}/export` : null);



  const handleExport = () => {
    if (!bookId) {
      toast.error("Something went wrong, please try again later");
      return;
    }
  };
    

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
