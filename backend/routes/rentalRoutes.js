import express from "express";
import {
  requestRental,
  getMyRentals,
  getAllRentals,
  approveRental,
  rejectRental,
  returnBook,
} from "../controllers/rentalController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/request/:bookId", protect, requestRental);
router.get("/my-rentals", protect, getMyRentals);
router.get("/", protect, admin, getAllRentals);
router.put("/:id/approve", protect, admin, approveRental);
router.put("/:id/reject", protect, admin, rejectRental);
router.put("/:id/return", protect, returnBook);

export default router;