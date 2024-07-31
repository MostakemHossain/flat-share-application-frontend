"use server";

import { IUserLogin } from "@/components/Shared/Navbar/SignInModal";
import { FieldValues } from "react-hook-form";

export const userLogin = async (formData: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login-user`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
