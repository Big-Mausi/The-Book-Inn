import express from "express";
import {
  getBooks,
  getBookById,
  searchAllBooks,
  getBookRecommendations,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Search all sources
router.get("/search", searchAllBooks);

// Book recommendations
router.get("/recommendations/:id", getBookRecommendations);

// Library books
router
  .route("/")
  .get(getBooks)
  .post(protect, admin, createBook);

router
  .route("/:id")
  .get(getBookById)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);

export default router;