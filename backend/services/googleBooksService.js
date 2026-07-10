import axios from "axios";
import { normalizeBook } from "../utils/normalizeBook.js";

export const searchGoogleBooks = async (
  keyword
) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        keyword
      )}&maxResults=100`
    );

    return (
      data.items?.map((item) =>
        normalizeBook(
          {
            id: item.id,
            title: item.volumeInfo.title,
            author:item.volumeInfo.authors?.join(", "),
            description:item.volumeInfo.description,
            publishedYear:item.volumeInfo.publishedDate,
            coverImage:item.volumeInfo.imageLinks?.thumbnail,
            category: item.volumeInfo.categories?.[0],
            externalUrl:item.volumeInfo.previewLink || item.volumeInfo.infoLink,
          },
          "google"
        )
      ) || []
    );
  } catch (err) {
    console.log(err.message);

    return [];
  }
};