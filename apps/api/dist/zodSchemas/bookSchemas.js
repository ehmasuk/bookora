import { z } from "zod";
import entitySchemas from "./entitySchemas.js";
const createBookSchema = z.object({
    title: entitySchemas.book.title,
    summary: entitySchemas.book.summary.optional(),
});
const queryParamsSchema = z.object({
    include: z.coerce.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
    status: z.enum(["public", "private"]).optional(),
});
// update book
const updateBookSchema = z.object({
    title: entitySchemas.book.title.optional(),
    cover: entitySchemas.book.cover,
    summary: entitySchemas.book.summary,
    status: entitySchemas.book.status,
});
const generateBookChaptersSchema = z.object({
    prompt: z.string().min(10),
    category: z.string(),
    genre: z.string(),
    tone: z.string(),
    targetAudience: z.string(),
});
export { createBookSchema, generateBookChaptersSchema, queryParamsSchema, updateBookSchema, };
//# sourceMappingURL=bookSchemas.js.map