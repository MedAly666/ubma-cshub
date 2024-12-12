"use server";

import {
  createModuleReq,
  deleteModuleReq,
  updateModuleReq,
} from "@/services/modules";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

interface CreateModuleState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    name?: string[];
    code?: string[];
    description?: string[];
    semesterId?: string[];
  };
}
const createModuleSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().min(1),
  semesterId: z.string().min(1).uuid(),
});
export async function createModule(
  intialState: CreateModuleState,
  data: FormData
) {
  const transformedData = {
    name: data.get("name")?.toString() as string,
    code: data.get("code")?.toString() as string,
    description: data.get("description")?.toString() as string,
    semesterId: data.get("semesterId")?.toString() as string,
  };
  const result = createModuleSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await createModuleReq(token, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverError:
        "An error occured while creating module, Please try again later",
    };
  }

  revalidatePath("/dashboard/modules");

  return {
    success: true,
  };
}

interface DeleteModuleState {
  success: boolean;
  serverErrors?: string;
}
export async function deleteModule(
  initialState: DeleteModuleState,
  data: FormData
) {
  const moduleId = data.get("moduleId")?.toString() as string;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  try {
    await deleteModuleReq(moduleId, token);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while deleting module, please try again later",
    };
  }
  revalidatePath("/dashboard/modules");
  return { success: true };
}

interface UpdateModuleState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    name?: string[];
    code?: string[];
    description?: string[];
    semesterId?: string[];
  };
}
const updateModuleSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  semesterId: z.string().min(1).uuid().optional(),
});
export async function updateModule(
  initialState: UpdateModuleState,
  data: FormData
) {
  const moduleId = data.get("moduleId")?.toString() as string;
  const transformedData = {
    name: data.get("name")?.toString() as string,
    code: data.get("code")?.toString() as string,
    description: data.get("description")?.toString() as string,
    semesterId: data.get("semesterId")?.toString() as string,
  };

  const result = updateModuleSchema.safeParse(transformedData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await updateModuleReq(moduleId, token, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while updating module, please try again later",
    };
  }

  revalidatePath("/dashboard/modules");

  return {
    success: true,
  };
}
