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
      query: (arg: Record<string, any>) => ({
        url: "/flats",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.flats],
    }),
    deleteFlat: build.mutation({
      query: (id) => ({
        url: `/flats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.flats],
    }),
    getASingleFlat: build.query({
      query: (id) => ({
        url: `/flats/${id}`,
        method: "GET",
      }),
    }),
    updateFlat: build.mutation({
      query: ({ id, data }) => ({
        url: `/flats/update/${id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [tagTypes.flats],
    }),
  }),
});

export const {
  useCreateFlatMutation,
  useGetAllFlatQuery,
  useDeleteFlatMutation,
  useGetASingleFlatQuery,
  useUpdateFlatMutation,
} = flatApi;
