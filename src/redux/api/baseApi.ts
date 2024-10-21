import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8500/api/v1" }),
  // baseQuery: axiosBaseQuery({
  //   // baseUrl: "https://flat-match-backend.vercel.app/api/v1",
  // }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
