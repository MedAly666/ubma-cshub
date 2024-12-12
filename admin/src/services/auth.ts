import { LoginSchema } from "@/dtos/auth";
import { API_BASE } from "../constants";
import { ErrorRes, LoginRes, VerifyTokenRes } from "@/types/services";

export async function loginReq(data: LoginSchema) {
  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: LoginRes = await res.json();
  return resData.token;
}

export async function verifyToken(token: string) {
  const res = await fetch(`${API_BASE}/api/v1/auth/verify-token`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: VerifyTokenRes = await res.json();
  return resData.valid;
}
