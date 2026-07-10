import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import { searchProvider } from "../providers/searchProvider.js";
import { getRecommendations } from "../services/recommendationService.js";

const getBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category =
    req.query.category && req.query.category !== "All"
      ? { category: req.query.category }
      : {};

  const page = Number(req.query.pageNumber) || 1;
  const limit = 10;

  const books = await Book.find({
    ...keyword,
    ...category,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  res.json(book);
});


const searchAllBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword?.trim() || "books";

  // if (!keyword) {
  //   res.status(400);
  //   throw new Error("Keyword is required");
  // }

  const books = await searchProvider(keyword);

  res.json(books);
});

const getBookRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await getRecommendations(req.params.id);

  res.json(recommendations);
});


const createBook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    description,
    category,
    coverImage,
    publishedYear,
    pdfUrl,
    totalCopies,
    availableCopies,
  } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error("Title and author are required");
  }

  const total = totalCopies ?? 1;
  const available = availableCopies ?? 1;

  if (available > total) {
    res.status(400);
    throw new Error("Available copies cannot exceed total copies");
  }

  const book = await Book.create({
    title,
    author,
    description,
    category,
    coverImage,
    publishedYear,
    pdfUrl,
    totalCopies: total,
    availableCopies: available,
  });

  res.status(201).json(book);
});


const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  book.title = req.body.title ?? book.title;
  book.author = req.body.author ?? book.author;
  book.description = req.body.description ?? book.description;
  book.category = req.body.category ?? book.category;
  book.coverImage = req.body.coverImage ?? book.coverImage;
  book.publishedYear = req.body.publishedYear ?? book.publishedYear;
  book.pdfUrl = req.body.pdfUrl ?? book.pdfUrl;
  book.totalCopies = req.body.totalCopies ?? book.totalCopies;
  book.availableCopies =
    req.body.availableCopies ?? book.availableCopies;
  book.available = req.body.available ?? book.available;

  if (book.availableCopies > book.totalCopies) {
    res.status(400);
    throw new Error("Available copies cannot exceed total copies");
  }

  const updatedBook = await book.save();

  res.json(updatedBook);
});


const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.deleteOne();

  res.json({
    message: "Book removed successfully",
  });
});

export {
  getBooks,
  getBookById,
  searchAllBooks,
  getBookRecommendations,
  createBook,
  updateBook,
  deleteBook,
};