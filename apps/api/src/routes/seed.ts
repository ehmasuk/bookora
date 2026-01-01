import {Router} from "express";
import seedControllers from "../controllers/seed.js";
const router:Router = Router();
// routes

router.get("/user/:number", seedControllers.seedUsers);
router.get("/book/:number", seedControllers.seedBooks);

export default router;
