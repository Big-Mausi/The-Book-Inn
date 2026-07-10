import Book from "../models/bookModel.js";
import { searchGoogleBooks } from "../services/googleBooksService.js";
import { searchOpenLibrary } from "../services/openLibraryService.js";
import { searchRanobe } from "../services/ranobeService.js";
import { normalizeBook } from "../utils/normalizeBook.js";
import { removeDuplicates } from "../utils/removeDuplicates.js";

export const searchProvider = async (keyword) => {
  // Search local library
  const localBooks = await Book.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
  });

  // Format local books
  const formattedLocalBooks = localBooks.map((book) =>
    normalizeBook(
      {
        id: book._id,
        title: book.title,
        author: book.author,
        description: book.description,
        publishedYear: book.publishedYear,
        coverImage: book.coverImage,
        category: book.category,
        available: book.available,
        availableCopies: book.availableCopies,
        totalCopies: book.totalCopies,
      },
      "library"
    )
  );

  // Search external APIs simultaneously
  const [googleBooks, openLibraryBooks, ranobeBooks] =
    await Promise.all([
      searchGoogleBooks(keyword),
      searchOpenLibrary(keyword),
      searchRanobe(keyword),
    ]);
console.log("========== SEARCH RESULTS ==========");
console.log("Google Books:", googleBooks.length);
console.log("Open Library:", openLibraryBooks.length);
console.log("RanobeDB:", ranobeBooks.length);

if (googleBooks.length > 0) {
  console.log("Google sample:", googleBooks[0].title);
}

if (openLibraryBooks.length > 0) {
  console.log("OpenLibrary sample:", openLibraryBooks[0].title);
}

if (ranobeBooks.length > 0) {
  console.log("Ranobe sample:", ranobeBooks[0].title);
}

  // Merge and remove duplicates
  return removeDuplicates([
    ...formattedLocalBooks,
    ...googleBooks,
    ...openLibraryBooks,
    ...ranobeBooks,
  ]);
};