import express from "express";
import seedControllers from "../controllers/seed.js";
const router = express.Router();
// routes
router.get("/user/:number", seedControllers.seedUsers);
router.get("/book/:number", seedControllers.seedBooks);
export default router;
//# sourceMappingURL=seed.js.map