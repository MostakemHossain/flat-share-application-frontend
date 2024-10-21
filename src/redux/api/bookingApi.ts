import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: "/bookings/post-a-booking",
        method: "POST",
       data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    getContact: build.query({
      query: () => ({
        url: `/contact`,
        method: "GET",
      }),
      providesTags: [tagTypes.contacts],
    }),
    deleteContact: build.mutation({
      query: (contactId) => ({
        url: `/contact/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contacts],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetContactQuery,
  useDeleteContactMutation,
} = bookingApi;
