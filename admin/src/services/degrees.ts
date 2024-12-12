import { CreateDegree, UpdateDegree } from "@/dtos/degrees";
import { API_BASE } from "@/constants";
import type {
  GetDegreesRes,
  CreateDegreeRes,
  UpdateDegreeRes,
  DeleteDegreeRes,
  ErrorRes,
} from "@/types/services";

export async function getDegrees() {
  const res = await fetch(`${API_BASE}/api/v1/degrees`);
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: GetDegreesRes = await res.json();
  return resData.degrees;
}

export async function createDegreeReq(token: string, data: CreateDegree) {
  const res = await fetch(`${API_BASE}/api/v1/degrees`, {
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
  const resData: CreateDegreeRes = await res.json();
  return resData.degree;
}

export async function deleteDegreeReq(token: string, degreeId: string) {
  const res = await fetch(`${API_BASE}/api/v1/degrees/${degreeId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: DeleteDegreeRes = await res.json();
  return resData.deletedDegree;
}

export async function updateDegreeReq(
  token: string,
  degreeId: string,
  data: UpdateDegree
) {
  const res = await fetch(`${API_BASE}/api/v1/degrees/${degreeId}`, {
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
  const resData: UpdateDegreeRes = await res.json();
  return resData.degree;
}
