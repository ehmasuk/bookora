import { Router } from "express";
import chapterControllers from "../controllers/chapter.js";
import sectionControllers from "../controllers/section.js";
const router: Router = Router();

// create chapter
router.post("/", chapterControllers.createChapter);

// get a single chapter
router.get("/:chapterId", chapterControllers.getSingleChapter);

// delete a chapter
router.delete("/:chapterId", chapterControllers.deleteChapter);

// update a chapter
router.patch("/:chapterId", chapterControllers.updateChapter);

// get all sections of a chapter
router.get("/:chapterId/section", sectionControllers.getSectionsOfaChapter);

export default router;
