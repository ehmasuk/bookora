import z from "zod";
export declare const updateSectionSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodAny>;
    position: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    position?: number | undefined;
    content?: any;
}, {
    title?: string | undefined;
    position?: number | undefined;
    content?: any;
}>;
//# sourceMappingURL=sectionSchemas.d.ts.map