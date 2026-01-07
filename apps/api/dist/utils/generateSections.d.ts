export type ChapterInput = {
    title: string;
    summary: string;
    position: number;
};
export type GeneratedSection = {
    title: string;
    position: number;
};
declare const generateSections: (chapters: ChapterInput[], count: number) => Promise<GeneratedSection[][]>;
export default generateSections;
//# sourceMappingURL=generateSections.d.ts.map