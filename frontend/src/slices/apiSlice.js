import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User',
    'Books',
    'Book',
    'Rentals',
    'Timeline',
    'Recommendations',
  ],
  endpoints: (builder) => ({}),
});
