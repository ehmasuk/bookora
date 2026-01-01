import z from "zod";
import entitySchemas from "./entitySchemas.js";
export const updateChapterSchema = z.object({
    title: entitySchemas.chapter.title.optional(),
    summary: entitySchemas.chapter.summary.optional(),
    position: entitySchemas.chapter.position.optional(),
});
//# sourceMappingURL=chapterSchemas.js.map