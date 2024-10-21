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
    getALLBookingRequest: build.query({
      query: () => ({
        url: `/bookings/all-booking-request`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    approvedBookingRequest: build.mutation({
      query: ({ data, id }) => {
        console.log("Data being sent:", data);
        console.log("Booking ID:", id);
        return {
          url: `/bookings/approved-booking/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
         data,
        };
      },
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetALLBookingRequestQuery,
  useApprovedBookingRequestMutation,
} = bookingApi;
