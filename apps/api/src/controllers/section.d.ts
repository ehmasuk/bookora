import type { RequestHandler } from "express";
export type SectionControllersType = {
    createSection: RequestHandler;
    deleteSection: RequestHandler;
    getSectionsOfaChapter: RequestHandler;
    getSingleSection: RequestHandler;
    updateSection: RequestHandler;
};
declare const sectionControllers: SectionControllersType;
export default sectionControllers;
//# sourceMappingURL=section.d.ts.map