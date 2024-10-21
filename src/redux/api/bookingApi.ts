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
    getMyBookings: build.query({
      query: () => ({
        url: `/bookings/my-booking-request`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
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
  useGetMyBookingsQuery,
  useDeleteContactMutation,
} = bookingApi;
