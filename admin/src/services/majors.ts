import { CreateMajor, UpdateMajor } from "@/dtos/majors";
import { API_BASE } from "@/constants";
import type {
  GetMajorsRes,
  UpdateMajorRes,
  CreateMajorRes,
  DeleteMajorRes,
  ErrorRes,
} from "@/types/services";

export async function getMajors() {
  const res = await fetch(`${API_BASE}/api/v1/majors`);
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: GetMajorsRes = await res.json();
  return resData.majors;
}

export async function createMajorReq(token: string, data: CreateMajor) {
  const res = await fetch(`${API_BASE}/api/v1/majors`, {
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
  const resData: CreateMajorRes = await res.json();
  return resData.major;
}

export async function deleteMajorReq(token: string, degreeId: string) {
  const res = await fetch(`${API_BASE}/api/v1/majors/${degreeId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: DeleteMajorRes = await res.json();
  return resData.deletedMajor;
}

export async function updateMajorReq(
  token: string,
  id: string,
  data: UpdateMajor
) {
  const res = await fetch(`${API_BASE}/api/v1/majors/${id}`, {
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
  const resData: UpdateMajorRes = await res.json();
  return resData.major;
}
