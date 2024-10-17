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
  }),
});

export const { useCreateContactMutation } = contactApi;
