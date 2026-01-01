import z from "zod";
import entitySchemas from "./entitySchemas.js";
export const updateSectionSchema = z.object({
    title: entitySchemas.section.title.optional(),
    content: entitySchemas.section.content.optional(),
    position: entitySchemas.section.position.optional(),
});
//# sourceMappingURL=sectionSchemas.js.map