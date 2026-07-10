export const removeDuplicates = (books) => {
  return books.filter(
    (book, index, self) =>
      index ===
      self.findIndex(
        (b) =>
          b.title?.toLowerCase() ===
            book.title?.toLowerCase() &&
          b.author?.toLowerCase() ===
            book.author?.toLowerCase()
      )
  );
};