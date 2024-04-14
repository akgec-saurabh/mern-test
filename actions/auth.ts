"use server";

import { cookies } from "next/headers";

export async function loginAction(token: string) {
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  cookies().set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: true,
    expires: Date.now() + oneHour,
  });
}
