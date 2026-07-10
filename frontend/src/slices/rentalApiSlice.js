import { apiSlice } from "./apiSlice";

const RENTALS_URL = "/api/rentals";

export const rentalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Request a rental
    requestRental: builder.mutation({
      query: (bookId) => ({
        url: `${RENTALS_URL}/request/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Rentals", "Books"],
    }),

    // Get current user's rentals
    getMyRentals: builder.query({
      query: () => ({
        url: `${RENTALS_URL}/my-rentals`,
      }),
      providesTags: ["Rentals"],
    }),

    // Return a book
    returnBook: builder.mutation({
      query: (rentalId) => ({
        url: `${RENTALS_URL}/${rentalId}/return`,
        method: "PUT",
      }),
      invalidatesTags: ["Rentals", "Books"],
    }),

    // Admin - Get all rental requests
    getAllRentals: builder.query({
      query: () => ({
        url: RENTALS_URL,
      }),
      providesTags: ["Rentals"],
    }),

    // Admin - Approve rental
    approveRental: builder.mutation({
      query: (rentalId) => ({
        url: `${RENTALS_URL}/${rentalId}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Rentals", "Books"],
    }),

    // Admin - Reject rental
    rejectRental: builder.mutation({
      query: ({ rentalId, message }) => ({
        url: `${RENTALS_URL}/${rentalId}/reject`,
        method: "PUT",
        body: { message },
      }),
      invalidatesTags: ["Rentals", "Books"],
    }),
  }),
});

export const {
  useRequestRentalMutation,
  useGetMyRentalsQuery,
  useReturnBookMutation,
  useGetAllRentalsQuery,
  useApproveRentalMutation,
  useRejectRentalMutation,
} = rentalApiSlice;
