import z from "zod";
export declare const updateChapterSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    summary?: string | undefined;
    position?: number | undefined;
}, {
    title?: string | undefined;
    summary?: string | undefined;
    position?: number | undefined;
}>;
//# sourceMappingURL=chapterSchemas.d.ts.map