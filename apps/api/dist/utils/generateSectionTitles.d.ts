export type ChapterInput = {
    id: string;
    title: string;
    summary: string;
    position: number;
};
export type GeneratedSectionTitleTypes = {
    chapter: string;
    title: string;
    position: number;
};
declare const generateSectionTitlesWithGemini: (chapters: ChapterInput[], count?: number) => Promise<GeneratedSectionTitleTypes[]>;
export default generateSectionTitlesWithGemini;
//# sourceMappingURL=generateSectionTitles.d.ts.map