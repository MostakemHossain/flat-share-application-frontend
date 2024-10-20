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
    getASingleEmployee: build.query({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "GET",
      }),
    }),
    updateEmployee: build.mutation({
      query: ({ id, data }) => ({
        url: `/teams/update-a-team-member/${id}`,
        method: "PUT",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useGetASingleEmployeeQuery,
  useUpdateEmployeeMutation,
} = employeeApi;
