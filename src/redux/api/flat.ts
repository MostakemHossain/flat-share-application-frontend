import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const flatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFlat: build.mutation({
      query: (data) => ({
        url: "/flats/post-a-flat",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.flats],
    }),
    getAllFlat: build.query({
      query: () => ({
        url: "/flats",
        method: "GET",
      }),
      providesTags: [tagTypes.flats],
    }),
  }),
});

export const { useCreateFlatMutation, useGetAllFlatQuery } = flatApi;
