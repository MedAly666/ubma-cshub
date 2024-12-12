"use server";

import {
  createDegreeReq,
  deleteDegreeReq,
  updateDegreeReq,
} from "@/services/degrees";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

interface DeleteDegreeState {
  success: boolean;
  serverErrors?: string;
}
export async function deleteDegree(
  intialState: DeleteDegreeState,
  data: FormData
) {
  const degreeId = data.get("degreeId")?.toString() as string;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await deleteDegreeReq(token, degreeId);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while deleting degree, please try again later",
    };
  }

  revalidatePath("/dashboard/degrees");

  return { success: true };
}

interface UpdateDegreeState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    name?: string[];
  };
}
const updateDegreeSchema = z.object({
  name: z.enum(["MASTERS", "BACHELOR"]),
});
export async function updateDegree(
  intialState: UpdateDegreeState,
  data: FormData
) {
  const transformedData = {
    name: data.get("name")?.toString() as string,
  };

  const degreeId = data.get("degreeId")?.toString() as string;

  const result = updateDegreeSchema.safeParse(transformedData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  try {
    await updateDegreeReq(token, degreeId, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "failed to update degree, please try again later",
    };
  }
  revalidatePath("/dashboard/degrees");
  return {
    success: true,
  };
}

interface CreateDegreeState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    name?: string[];
  };
}
const createDegreeSchema = z.object({
  name: z.enum(["BACHELOR", "MASTERS"]),
});

export async function createDegree(
  initialState: CreateDegreeState,
  data: FormData
) {
  const transformedData = {
    name: data.get("name")?.toString() as string,
  };

  const result = createDegreeSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await createDegreeReq(token, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "failed to create degree, please try again later",
    };
  }
  revalidatePath("/dashboard/degrees");
  return {
    success: true,
  };
}
