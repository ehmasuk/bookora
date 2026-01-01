import { z } from "zod";
declare const entitySchemas: {
    user: {
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    };
    book: {
        title: z.ZodString;
        cover: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["public", "private"]>>;
    };
    chapter: {
        title: z.ZodString;
        summary: z.ZodString;
        position: z.ZodNumber;
    };
    section: {
        title: z.ZodString;
        content: z.ZodAny;
        position: z.ZodNumber;
    };
};
export default entitySchemas;
//# sourceMappingURL=entitySchemas.d.ts.map