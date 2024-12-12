"use server";
import { loginReq } from "@/services/auth";
import { z } from "zod";
import { saveTokenCookies } from "./cookie";
import { redirect } from "next/navigation";

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

  try {
    const token = await loginReq(result.data);
    saveTokenCookies(token);
  } catch (error) {
    console.log((error as Error).message);
    return {
      success: false,
      serverErrors: "An error occured while login, Please try again later",
    };
  }

  redirect("/dashboard");

  return {
    success: true,
  };
}
