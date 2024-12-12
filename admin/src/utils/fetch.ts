"use server";
import { cookies } from "next/headers";

interface ErrorRes {
  message: string;
}
export async function fetchWithAuth<T>(endpoint: string, model: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const url = `${process.env.API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [model] },
    });
    if (!res.ok) {
      const errorData: ErrorRes = await res.json();
      throw new Error(errorData.message);
    }
    const resData: T = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
