"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { authKey } from "../../constants/authKey";

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  router.push("/");
  router.refresh();
};
