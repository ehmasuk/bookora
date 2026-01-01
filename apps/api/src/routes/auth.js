import express from "express";
import authControllers from "../controllers/auth.js";
const router = express.Router();
// register
router.post("/register", authControllers.registerUser);
// login
router.post("/login", authControllers.loginUser);
export default router;
//# sourceMappingURL=auth.js.map