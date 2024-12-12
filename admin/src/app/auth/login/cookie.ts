"use server";
import { cookies } from "next/headers";

export async function saveTokenCookies(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 24 * 60 * 60 * 7,
  });
}
