const BASE_URL = "/api/books/search";

export const searchBooks = async (query = "") => {
  try {const response = await fetch(
      `${BASE_URL}?keyword=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};