import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
function buildBookHTML(book) {
    return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${book.title}</title>
    </head>
    <body>
      <h1>${book.title}</h1>

      ${book.chapters
        .sort((a, b) => a.position - b.position)
        .map((chapter) => `
          <h2>${chapter.title}</h2>

          ${chapter.sections
        .sort((a, b) => a.position - b.position)
        .map((section) => `
              <h3>${section.title}</h3>
              ${(() => {
        const content = section.content &&
            typeof section.content === "object" &&
            "type" in section.content
            ? section.content
            : { type: "doc", content: [] };
        try {
            return generateHTML(content, [StarterKit]);
        }
        catch (e) {
            return "";
        }
    })()}
            `)
        .join("")}
        `)
        .join("")}
    </body>
  </html>
  `;
}
export default buildBookHTML;
//# sourceMappingURL=build-book-html.js.map