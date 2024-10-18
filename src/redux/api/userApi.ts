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
  }),
});

export const { useGetSingleUserQuery } = userApi;
