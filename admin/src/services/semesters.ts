import { CreateSemester, UpdateSemester } from "@/dtos/semesters";
import { API_BASE } from "@/constants";
import type {
  GetSemestersRes,
  DeleteSemesterRes,
  UpdateSemesterRes,
  CreateSemesterRes,
} from "@/types/services";

export async function getSemesters() {
  const res = await fetch(`${API_BASE}/api/v1/semesters`);
  const resData: GetSemestersRes = await res.json();
  return resData.semesters;
}

export async function createSemesterReq(token: string, data: CreateSemester) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/semesters`, {
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
    const resData: CreateSemesterRes = await res.json();
    return resData.semester;
  } catch (error) {
    throw error;
  }
}

export async function deleteSemesterReq(token: string, semesterId: string) {
  const res = await fetch(`${API_BASE}/api/v1/semesters/${semesterId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resData: DeleteSemesterRes = await res.json();
  return resData.deletedSemester;
}

export async function updateSemesterReq(
  token: string,
  semesterId: string,
  data: UpdateSemester
) {
  const res = await fetch(`${API_BASE}/api/v1/semesters/${semesterId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const resData: UpdateSemesterRes = await res.json();
  return resData.semester;
}
