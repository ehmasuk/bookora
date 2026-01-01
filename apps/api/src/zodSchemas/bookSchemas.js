import { z } from "zod";
import entitySchemas from "./entitySchemas.js";
const createBookSchema = z.object({
    title: entitySchemas.book.title,
});
const queryParamsSchema = z.object({
    include: z.coerce.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
});
// update book
const updateBookSchema = z.object({
    title: entitySchemas.book.title.optional(),
    cover: entitySchemas.book.cover,
    summary: entitySchemas.book.summary,
    status: entitySchemas.book.status,
});
export { createBookSchema, queryParamsSchema, updateBookSchema };
//# sourceMappingURL=bookSchemas.js.map