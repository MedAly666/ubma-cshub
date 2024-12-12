import { CreateDegree, UpdateDegree } from "@/dtos/degrees";
import { API_BASE } from "@/constants";
import type {
  GetDegreesRes,
  CreateDegreeRes,
  UpdateDegreeRes,
  DeleteDegreeRes,
} from "@/types/services";

export async function getDegrees() {
  const res = await fetch(`${API_BASE}/api/v1/degrees`);
  const resData: GetDegreesRes = await res.json();
  return resData.degrees;
}

export async function createDegreeReq(token: string, data: CreateDegree) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/degrees`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const resData: CreateDegreeRes = await res.json();
    return resData.degree;
  } catch (error) {
    throw error;
  }
}

export async function deleteDegreeReq(token: string, degreeId: string) {
  const res = await fetch(`${API_BASE}/api/v1/degrees/${degreeId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
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
  const resData: UpdateDegreeRes = await res.json();
  return resData.degree;
}
