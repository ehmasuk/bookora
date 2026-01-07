import { Router } from "express";
import generateControllers from "../controllers/generate.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = Router();
router.post("/chapter", isAuthenticated, generateControllers.generateChapter);
router.post("/section", isAuthenticated, generateControllers.generateSection);
export default router;
//# sourceMappingURL=generate.js.map