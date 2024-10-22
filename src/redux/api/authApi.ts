import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `/forgot-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `/reset-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
