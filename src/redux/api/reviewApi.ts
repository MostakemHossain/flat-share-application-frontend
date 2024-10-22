import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAReview: build.mutation({
      query: (data) => ({
        url: "/reviews/post-a-review",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.reviews],
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
  useCreateAReviewMutation
 
} = reviewApi;
