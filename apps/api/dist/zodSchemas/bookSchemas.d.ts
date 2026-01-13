import { z } from "zod";
declare const createBookSchema: z.ZodObject<{
    title: z.ZodString;
    summary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    summary?: string | undefined;
}, {
    title: string;
    summary?: string | undefined;
}>;
declare const queryParamsSchema: z.ZodObject<{
    include: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "public" | "private" | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    include?: string | undefined;
}, {
    status?: "public" | "private" | undefined;
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
declare const generateBookChaptersSchema: z.ZodObject<{
    prompt: z.ZodString;
    category: z.ZodString;
    genre: z.ZodString;
    tone: z.ZodString;
    targetAudience: z.ZodString;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    category: string;
    genre: string;
    tone: string;
    targetAudience: string;
}, {
    prompt: string;
    category: string;
    genre: string;
    tone: string;
    targetAudience: string;
}>;
export { createBookSchema, generateBookChaptersSchema, queryParamsSchema, updateBookSchema, };
//# sourceMappingURL=bookSchemas.d.ts.map