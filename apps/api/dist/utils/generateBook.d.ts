export declare const DEFAULT_SECTIONS_PER_CHAPTER = 3;
export type DraftPayloadTypes = {
    prompt: string;
    category: string;
    genre: string;
    tone: string;
    targetAudience: string;
};
export type GeneratedSection = {
    title: string;
    position: number;
};
export type GeneratedChapterWithSections = {
    title: string;
    summary: string;
    position: number;
    sections: GeneratedSection[];
};
declare const generateBookWithGemini: (payload: DraftPayloadTypes, chaptersCount?: number, sectionsPerChapter?: number) => Promise<GeneratedChapterWithSections[]>;
export default generateBookWithGemini;
//# sourceMappingURL=generateBook.d.ts.map