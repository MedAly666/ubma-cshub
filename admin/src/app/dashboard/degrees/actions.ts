"use server";

import { addDegree, removeDegree, editDegree } from "@/services/degrees";
import { revalidatePath } from "next/cache";
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

  try {
    await removeDegree(degreeId);
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

  try {
    await editDegree(degreeId, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while updating degree, please try again later",
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

  try {
    await addDegree(result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while creating degree, please try again later",
    };
  }
  revalidatePath("/dashboard/degrees");
  return {
    success: true,
  };
}
