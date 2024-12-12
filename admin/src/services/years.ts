import { CreateYear, UpdateYear } from "@/dtos/years";
import { API_BASE } from "@/constants";
import type {
  GetYearsRes,
  UpdateYearRes,
  DeleteYearRes,
  CreateYearRes,
} from "@/types/services";

export async function createYearReq(token: string, data: CreateYear) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/years`, {
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
    const resData: CreateYearRes = await res.json();
    return resData.year;
  } catch (error) {
    throw error;
  }
}

export async function getYears() {
  const res = await fetch(`${API_BASE}/api/v1/years`);
  const resData: GetYearsRes = await res.json();
  return resData.years;
}

export async function deleteYearReq(token: string, id: string) {
  const res = await fetch(`${API_BASE}/api/v1/years/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resData: DeleteYearRes = await res.json();
  return resData.deletedYear;
}

export async function updateYearReq(
  token: string,
  id: string,
  data: UpdateYear
) {
  const res = await fetch(`${API_BASE}/api/v1/years/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const resData: UpdateYearRes = await res.json();
  return resData.year;
}
