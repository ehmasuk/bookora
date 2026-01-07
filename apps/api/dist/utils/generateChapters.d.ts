export type DraftPayloadTypes = {
    prompt: string;
    category: string;
    genre: string;
    tone: string;
    targetAudience: string;
};
export type GeneratedChapter = {
    title: string;
    summary: string;
    position: number;
};
declare const generateChapters: (payload: DraftPayloadTypes, count: number) => Promise<GeneratedChapter[]>;
export default generateChapters;
//# sourceMappingURL=generateChapters.d.ts.map