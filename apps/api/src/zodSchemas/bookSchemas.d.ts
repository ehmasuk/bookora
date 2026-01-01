import { z } from "zod";
declare const createBookSchema: z.ZodObject<{
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
}, {
    title: string;
}>;
declare const queryParamsSchema: z.ZodObject<{
    include: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    page?: number | undefined;
    include?: string | undefined;
}, {
    limit?: number | undefined;
    page?: number | undefined;
    include?: string | undefined;
}>;
declare const updateBookSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    cover: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    cover?: string | undefined;
    summary?: string | undefined;
    status?: "public" | "private" | undefined;
}, {
    title?: string | undefined;
    cover?: string | undefined;
    summary?: string | undefined;
    status?: "public" | "private" | undefined;
}>;
export { createBookSchema, queryParamsSchema, updateBookSchema };
//# sourceMappingURL=bookSchemas.d.ts.map