import { generateHTML } from "@tiptap/html";
import StarterKit from '@tiptap/starter-kit';
import type { ExportBookResponse_BookType, ExportBookResponse_ChapterType, ExportBookResponse_SectionType  } from "../types/index.js";


function buildBookHTML(book: ExportBookResponse_BookType) {
  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${book.title}</title>
    </head>
    <body>
      <h1>${book.title}</h1>

      ${book.chapters
        .sort((a: ExportBookResponse_ChapterType, b: ExportBookResponse_ChapterType) => a.position - b.position)
        .map(
          (chapter: ExportBookResponse_ChapterType) => `
          <h2>${chapter.title}</h2>

          ${chapter.sections
            .sort((a: ExportBookResponse_SectionType, b: ExportBookResponse_SectionType) => a.position - b.position)
            .map(
              (section: ExportBookResponse_SectionType) => `
              <h3>${section.title}</h3>
              ${generateHTML(section.content, [StarterKit])}
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


export default buildBookHTML