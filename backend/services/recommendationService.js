import Book from "../models/bookModel.js";

export const getRecommendations = async (bookId) => {
  const currentBook = await Book.findById(bookId);

  if (!currentBook) {
    throw new Error("Book not found");
  }

  const recommendations = await Book.find({
    _id: { $ne: currentBook._id },
    $or: [
      { category: currentBook.category },
      { author: currentBook.author },
    ],
  }).limit(6);

  return recommendations;
};