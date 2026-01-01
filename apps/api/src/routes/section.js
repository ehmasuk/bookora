import express from "express";
import sectionControllers from "../controllers/section.js";
const router = express.Router();
// create section
router.post("/", sectionControllers.createSection);
// get a single section
router.get("/:sectionId", sectionControllers.getSingleSection);
// delete a section
router.delete("/:sectionId", sectionControllers.deleteSection);
// update a section
router.patch("/:sectionId", sectionControllers.updateSection);
export default router;
//# sourceMappingURL=section.js.map