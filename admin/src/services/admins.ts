import { CreateAdmin, UpdateAdmin } from "@/dtos/admins";
import { User } from "@/types/db";
import { cookies } from "next/headers";
import { API_BASE } from "@/constants";
import type {
  CreateAdminRes,
  UpdateAdminRes,
  DeleteAdminRes,
  ErrorRes,
} from "@/types/services";

export async function getAdmins() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  const res = await fetch(`${API_BASE}/api/v1/admins`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const data: { admins: User[] } = await res.json();
  return data.admins;
}

export async function createAdminReq(token: string, data: CreateAdmin) {
  const res = await fetch(`${API_BASE}/api/v1/admins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: CreateAdminRes = await res.json();
  return resData.admin;
}

export async function deleteAdminReq(id: string, token: string) {
  const res = await fetch(`${API_BASE}/api/v1/admins/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resData: DeleteAdminRes = await res.json();
  return resData.deletedAdmin;
}

export async function updateAdminReq(
  id: string,
  token: string,
  data: UpdateAdmin
) {
  const res = await fetch(`${API_BASE}/api/v1/admins/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: UpdateAdminRes = await res.json();
  return resData.admin;
}
