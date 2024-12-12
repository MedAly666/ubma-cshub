import { CreateSemester, UpdateSemester } from "@/dtos/semesters";
import { API_BASE } from "@/constants";
import type {
  GetSemestersRes,
  DeleteSemesterRes,
  UpdateSemesterRes,
  CreateSemesterRes,
  ErrorRes,
} from "@/types/services";

export async function getSemesters() {
  const res = await fetch(`${API_BASE}/api/v1/semesters`);
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: GetSemestersRes = await res.json();
  return resData.semesters;
}

export async function createSemesterReq(token: string, data: CreateSemester) {
  const res = await fetch(`${API_BASE}/api/v1/semesters`, {
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
  const resData: CreateSemesterRes = await res.json();
  return resData.semester;
}

export async function deleteSemesterReq(token: string, semesterId: string) {
  const res = await fetch(`${API_BASE}/api/v1/semesters/${semesterId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
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
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: UpdateSemesterRes = await res.json();
  return resData.semester;
}
