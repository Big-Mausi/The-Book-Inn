import { apiSlice } from "./apiSlice";

const BOOKS_URL = "/api/books";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all books from our library
    getBooks: builder.query({
      query: ({ keyword = "", category = "All", pageNumber = 1 } = {}) => ({
        url: BOOKS_URL,
        params: {
          keyword,
          category,
          pageNumber,
        },
      }),
      providesTags: ["Books"],
    }),

    // Get single book
    getBookDetails: builder.query({
      query: (id) => `${BOOKS_URL}/${id}`,
      providesTags: ["Book"],
    }),

    // Search all available sources
    searchAllBooks: builder.query({
      query: (keyword) => ({
        url: `${BOOKS_URL}/search`,
        params: { keyword },
      }),
    }),

    // Book recommendations
    getBookRecommendations: builder.query({
      query: (id) => `${BOOKS_URL}/recommendations/${id}`,
    }),

    // Create Book
    createBook: builder.mutation({
      query: (data) => ({
        url: BOOKS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update Book
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BOOKS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books", "Book"],
    }),

    // Delete Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `${BOOKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookDetailsQuery,
  useSearchAllBooksQuery,
  useGetBookRecommendationsQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApiSlice;