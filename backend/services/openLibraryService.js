import axios from "axios";
import { normalizeBook } from "../utils/normalizeBook.js";

export const searchOpenLibrary =
  async (keyword) => {
    try {
      const { data } = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          keyword
        )}`
      );

      return (
        data.docs
          ?.slice(0, 100)
          .map((book) =>
            normalizeBook(
              {
                id: book.key,

                title: book.title,

                author:
                  book.author_name?.join(
                    ", "
                  ),

                publishedYear:
                  book.first_publish_year,

                coverImage: book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "",

                category:
                  book.subject?.[0],
              },
              "openlibrary"
            )
          ) || []
      );
    } catch (err) {
      console.log(err.message);

      return [];
    }
  };