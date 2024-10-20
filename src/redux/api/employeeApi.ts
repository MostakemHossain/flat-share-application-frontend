import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (data) => ({
        url: "/teams/create-a-team-member",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),
    getAllEmployees: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/teams",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.team],
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.team],
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
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
} = employeeApi;
