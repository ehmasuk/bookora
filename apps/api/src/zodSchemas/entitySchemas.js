import { z } from "zod";
const entitySchemas = {
    user: {
        name: z.string().min(3),
        email: z.string(),
        password: z.string().min(1),
    },
    book: {
        title: z.string().min(3).max(200),
        cover: z.string().optional(),
        summary: z.string().optional(),
        status: z.enum(["public", "private"]).optional(),
    },
    chapter: {
        title: z.string().min(3).max(200),
        summary: z.string().min(1),
        position: z.number(),
    },
    section: {
        title: z.string().min(3).max(200),
        content: z.any(),
        position: z.number(),
    }
};
export default entitySchemas;
//# sourceMappingURL=entitySchemas.js.map