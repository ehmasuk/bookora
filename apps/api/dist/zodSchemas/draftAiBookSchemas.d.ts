import { z } from "zod";
declare const draftAiBookPayloadSchema: z.ZodObject<
  {
    prompt: z.ZodString;
    category: z.ZodString;
    genre: z.ZodString;
    tone: z.ZodString;
    targetAudience: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    prompt: string;
    category: string;
    genre: string;
    tone: string;
    targetAudience: string;
  },
  {
    prompt: string;
    category: string;
    genre: string;
    tone: string;
    targetAudience: string;
  }
>;
export { draftAiBookPayloadSchema };
//# sourceMappingURL=draftAiBookSchemas.d.ts.map
