import axios from "axios";
import { normalizeBook } from "../utils/normalizeBook.js";

export const searchRanobe = async (keyword) => {
  try {
    const { data } = await axios.get(
      `https://ranobedb.org/api/v0/books?q=${encodeURIComponent(keyword)}`
    );

    return (
      data.books?.map((book) =>
        normalizeBook(
          {
            id: `ranobe-${book.id}`,
            title: book.title,
            author: book.author || "Unknown Author",
            description: book.description || "",
            publishedYear: book.c_release_date || "",
            coverImage: book.image
              ? `https://files.ranobedb.org/images/${book.image.filename}`
              : "",
            category: "Light Novel",
          },
          "ranobedb"
        )
      ) || []
    );
  } catch (error) {
    console.error("RanobeDB Error:", error.message);
    return [];
  }
};