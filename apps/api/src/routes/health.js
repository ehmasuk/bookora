import express from "express";
import checkHealth from "../controllers/health.js";
const router = express.Router();
// routes
router.get("/", checkHealth);
export default router;
//# sourceMappingURL=health.js.map