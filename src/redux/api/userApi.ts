import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/users/profile/me",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: `/users/profile/update-my-profile`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateMyProfileMutation } = userApi;
