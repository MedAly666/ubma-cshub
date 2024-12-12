import { LoginSchema } from "@/dtos/auth";
import { API_BASE } from "../constants";

interface LoginRes {
  token: string;
}
export async function loginReq(data: LoginSchema) {
  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const resData: LoginRes = await res.json();
  return resData.token;
}

interface VerifyTokenResponse {
  valid: boolean;
}
export async function verifyToken(token: string) {
  const res = await fetch(`${API_BASE}/api/v1/auth/verify-token`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  });

  const resData: VerifyTokenResponse = await res.json();

  return resData.valid;
}
