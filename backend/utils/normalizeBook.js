export const normalizeBook = (
  book,
  source = "library"
) => ({
  id: book.id || book._id,

  title: book.title || "Unknown Title",

  author:
    book.author ||
    book.authors ||
    "Unknown Author",

  description:
    book.description || "",

  publishedYear:
    book.publishedYear || "",

  coverImage:
    book.coverImage || "",

  category:
    book.category || "General",

  available:
    book.available ?? true,

  availableCopies:
    book.availableCopies ?? 0,

  totalCopies:
    book.totalCopies ?? 0,

  source,

  externalUrl:
    book.externalUrl || null,
});