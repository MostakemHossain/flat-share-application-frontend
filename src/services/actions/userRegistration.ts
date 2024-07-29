"use server";

export const userRegistration = async (formData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/create-user`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};
