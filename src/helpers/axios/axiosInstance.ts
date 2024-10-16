import { authKey } from "@/constants/authKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFormLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFormLocalStorage(authKey);
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  function (error) {
  
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObj: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObj;
  },
  function (error) {
  
    const responseObj: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Internal Server Error",
      errorMessages: error?.response?.data?.message,
    };
    return responseObj;
  }
);

export { instance };
