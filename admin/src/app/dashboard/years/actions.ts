"use server";
import { z } from "zod";
import { addYear, removeYear, editYear } from "@/services/years";
import { revalidatePath } from "next/cache";

const createYearSchema = z.object({
  yearNumber: z.number().min(1),
  majorId: z.string().uuid(),
});
interface CreateYearState {
  success: boolean;
  fieldErrors?: {
    yearNumber?: string[];
    majorId?: string[];
  };
  serverErrors?: string;
}
export async function createYear(
  previousState: CreateYearState,
  data: FormData
) {
  // validation
  const transformedData = {
    yearNumber: Number(data.get("yearNumber") as string),
    majorId: data.get("majorId") as string,
  };

  const result = createYearSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await addYear(result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Failed to create year, Please try again later",
    };
  }

  revalidatePath("/dashboard/years");
  return { success: true };
}

export async function deleteYear(yearId: string) {
  try {
    await removeYear(yearId);
    revalidatePath("/dashboard/years");
    return { success: true, error: null };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to delete year, please try again later",
    };
  }
}

// Update Year Action
const updateYearSchema = z.object({
  yearNumber: z.number().min(1).optional(),
  degreeId: z.string().uuid().optional(),
});
interface UpdateYearState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    yearNumber?: string[];
    majorId?: string[];
  };
}
export async function updateYear(
  initialState: UpdateYearState,
  data: FormData
) {
  const transformedData = {
    yearNumber: Number(data.get("yearNumber")),
    majorId: data.get("majorId") as string,
  };
  const yearId = data.get("yearId")?.toString() as string;

  const result = updateYearSchema.safeParse(transformedData);
  if (!result.success) {
    const transformedError = result.error.flatten().fieldErrors;

    return {
      success: false,
      fieldErrors: transformedError,
    };
  }
  try {
    await editYear(yearId, transformedData);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Failed to update year, please try again later",
    };
  }

  revalidatePath("/dashboard/years");
  return { success: true };
}
