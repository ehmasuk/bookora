import { Router } from "express";
import multer from "multer";
import bookControllers from "../controllers/book.js";
import chapterControllers from "../controllers/chapter.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isOwned from "../middlewares/isOwned.js";
import { Book } from "../models/index.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 300 * 1024 }, // 300KB limit
});

const router: Router = Router();

// get all books
router.get("/", bookControllers.getAllBook);

// create a new book
router.post("/", isAuthenticated, bookControllers.createBook);

// get a single book with book id
router.get("/:bookId", bookControllers.getSingleBook);

// delete a book
router.delete(
  "/:bookId",
  isAuthenticated,
  isOwned({ model: Book, paramName: "bookId", ownerField: "author" }),
  bookControllers.deleteBook,
);

// update a book informations
router.patch("/:bookId", isAuthenticated, bookControllers.updateBook);

// upload book cover
router.post(
  "/:bookId/cover",
  isAuthenticated,
  isOwned({ model: Book, paramName: "bookId", ownerField: "author" }),
  upload.single("cover"),
  bookControllers.updateBookCover,
);

// get all chapters of a book
router.get("/:bookId/chapter", chapterControllers.getChaptersOfaBook);

//export book
router.get("/:bookId/export", bookControllers.exportBook);

export default router;
