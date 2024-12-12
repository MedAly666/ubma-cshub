import { CreateModule, UpdateModule } from "@/dtos/modules";
import { API_BASE } from "@/constants";
import {
  GetModulesRes,
  CreateModuleRes,
  UpdateModuleRes,
  DeleteModuleRes,
  ErrorRes,
} from "@/types/services";

export async function createModuleReq(token: string, data: CreateModule) {
  const res = await fetch(`${API_BASE}/api/v1/modules`, {
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
  const resData: CreateModuleRes = await res.json();
  return resData.module;
}

export async function updateModuleReq(
  moduleId: string,
  token: string,
  data: UpdateModule
) {
  const res = await fetch(`${API_BASE}/api/v1/modules/${moduleId}`, {
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
  const resData: UpdateModuleRes = await res.json();
  return resData.module;
}

export async function deleteModuleReq(moduleId: string, token: string) {
  const res = await fetch(`${API_BASE}/api/v1/modules/${moduleId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: DeleteModuleRes = await res.json();
  return resData.deletedModule;
}

export async function getModules() {
  const res = await fetch(`${API_BASE}/api/v1/modules`);
  if (!res.ok) {
    const errData: ErrorRes = await res.json();
    throw new Error(errData.message);
  }
  const resData: GetModulesRes = await res.json();
  return resData.modules;
}
