import { z } from "zod";
const draftAiBookPayloadSchema = z.object({
    prompt: z.string().min(10),
    category: z.string(),
    genre: z.string(),
    tone: z.string(),
    targetAudience: z.string(),
});
export { draftAiBookPayloadSchema };
//# sourceMappingURL=draftAiBookSchemas.js.map