import {Router} from "express";
import checkHealth from "../controllers/health.js";
const router:Router = Router();
// routes
router.get("/", checkHealth);

export default router;
