import type { RequestHandler } from "express";
export type ChapterControllersType = {
    createChapter: RequestHandler;
    deleteChapter: RequestHandler;
    getChaptersOfaBook: RequestHandler;
    getSingleChapter: RequestHandler;
    updateChapter: RequestHandler;
};
declare const chapterControllers: ChapterControllersType;
export default chapterControllers;
//# sourceMappingURL=chapter.d.ts.map