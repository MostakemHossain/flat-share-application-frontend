import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (data) => ({
        url: "/contact/create-a-contact",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.contacts],
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
  useCreateContactMutation,
  useGetContactQuery,
  useDeleteContactMutation,
} = contactApi;
