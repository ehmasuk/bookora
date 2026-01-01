import {Router} from "express";
import userControllers from "../controllers/user.js";
import bookControllers from "../controllers/book.js";

const router:Router = Router();

// get all users
router.get("/", userControllers.getAllUsers);

// get a single user
router.get("/:userId", userControllers.getSingleUser);

// get all books of a user
router.get("/:userId/book", bookControllers.getBooksOfaUser);

export default router;
