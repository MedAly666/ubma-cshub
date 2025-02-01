"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { findUserByUsername } from "@/services/users";
import { comparePassword } from "@/utils/password";
import { generateJWT } from "@/utils/jwt";

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

interface LoginState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    username?: string[];
    password?: string[];
  };
}

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be at least 2 characters." })
    .max(50),
  password: z.string().min(8),
});
export async function login(initialState: LoginState, data: FormData) {
  const transformedData = {
    username: data.get("username")?.toString() as string,
    password: data.get("password")?.toString() as string,
  };

  const result = loginSchema.safeParse(transformedData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const user = await findUserByUsername(result.data.username);
  if (!user) {
    return {
      success: false,
      serverErrors: "An error occured while login, Please try again later",
    };
  }

  const match = await comparePassword(result.data.password, user.password);
  if (!match) {
    return {
      success: false,
      serverErrors:
        "An error occured while login, Incorrect username or password",
    };
  }

  const token = await generateJWT({ userID: user.id });
  await saveTokenCookies(token);
  redirect("/dashboard");
  return {
    success: true,
  };
}
