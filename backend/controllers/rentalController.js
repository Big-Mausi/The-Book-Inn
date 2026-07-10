import asyncHandler from "express-async-handler";
import Rental from "../models/rentalModel.js";
import Book from "../models/bookModel.js";
import updateExpiredRentals from "../utils/updateExpiredRentals.js";

// @desc    Request a rental
// @route   POST /api/rentals/request/:bookId
// @access  Private
const requestRental = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.bookId);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.availableCopies <= 0) {
    res.status(400);
    throw new Error("No copies available");
  }

  const existingRequest = await Rental.findOne({
    user: req.user._id,
    book: book._id,
    status: { $in: ["pending", "approved"] },
  });

  if (existingRequest) {
    res.status(400);
    throw new Error("You already have an active request for this book");
  }

  const rental = await Rental.create({
    user: req.user._id,
    book: book._id,
  });

  res.status(201).json(rental);
});

// @desc    Get logged-in user's rentals
// @route   GET /api/rentals/my-rentals
// @access  Private
const getMyRentals = asyncHandler(async (req, res) => {
  await updateExpiredRentals();

  const rentals = await Rental.find({ user: req.user._id })
    .populate("book");

  res.json(rentals);
});

// @desc    Get all rentals
// @route   GET /api/rentals
// @access  Admin
const getAllRentals = asyncHandler(async (req, res) => {
  await updateExpiredRentals();
  
  const rentals = await Rental.find({})
    .populate("user", "name email")
    .populate("book");

  res.json(rentals);
});

// @desc    Approve rental request
// @route   PUT /api/rentals/:id/approve
// @access  Admin
const approveRental = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id).populate("book");

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  if (rental.status !== "pending") {
    res.status(400);
    throw new Error("Rental has already been processed");
  }

  if (rental.book.availableCopies <= 0) {
    res.status(400);
    throw new Error("No copies available");
  }

  rental.status = "approved";
  rental.adminMessage = "Rental approved";
  rental.approvalDate = new Date();

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  rental.dueDate = dueDate;

  rental.book.availableCopies -= 1;

  if (rental.book.availableCopies === 0) {
    rental.book.available = false;
  }

  await rental.book.save();
  await rental.save();

  res.json(rental);
});

// @desc    Reject rental request
// @route   PUT /api/rentals/:id/reject
// @access  Admin
const rejectRental = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  if (rental.status !== "pending") {
    res.status(400);
    throw new Error("Rental has already been processed");
  }

  rental.status = "rejected";
  rental.adminMessage =
    req.body.message || "Rental request rejected";

  await rental.save();

  res.json(rental);
});

// @desc    Return a rented book
// @route   PUT /api/rentals/:id/return
// @access  Private
const returnBook = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id).populate("book");

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  // Only the renter or an admin can return the book
  if (
    rental.user.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    res.status(401);
    throw new Error("Not authorized to return this book");
  }

  if (rental.status === "returned") {
    res.status(400);
    throw new Error("Book has already been returned");
  }

  if (rental.status !== "approved") {
    res.status(400);
    throw new Error("Only approved rentals can be returned");
  }

  rental.status = "returned";
  rental.returnDate = new Date();
  rental.adminMessage = "Book returned successfully";

  rental.book.availableCopies += 1;

  if (rental.book.availableCopies > 0) {
    rental.book.available = true;
  }

  await rental.book.save();
  await rental.save();

  res.json(rental);
});

export {
  requestRental,
  getMyRentals,
  getAllRentals,
  approveRental,
  rejectRental,
  returnBook,
};