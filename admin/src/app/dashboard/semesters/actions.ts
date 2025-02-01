"use server";
import {
  addSemester,
  removeSemester,
  editSemester,
} from "@/services/semesters";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateSemesterState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    semesterNumber?: string[];
    yearId?: string[];
  };
}
const createSemesterSchema = z.object({
  semesterNumber: z.number().min(1),
  yearId: z.string().uuid(),
});

export async function createSemester(
  initialState: CreateSemesterState,
  data: FormData
) {
  const transformedData = {
    semesterNumber: Number(data.get("semesterNumber")),
    yearId: data.get("yearId") as string,
  };

  const result = createSemesterSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await addSemester(transformedData);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while creating semester, please try again later",
    };
  }

  revalidatePath("/dashboard/semesters");
  return {
    success: true,
  };
}

interface DeleteSemesterState {
  success: boolean;
}
export async function deleteSemester(
  initialState: DeleteSemesterState,
  data: FormData
) {
  const semesterId = data.get("semesterId")?.toString() as string;
  try {
    await removeSemester(semesterId);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Failed to delete semester, please try again later",
    };
  }
  revalidatePath("/dashboard/semesters");
  return {
    success: true,
  };
}

const updateSemesterSchema = z.object({
  semesterNumber: z.number().min(1).optional(),
  yearId: z.string().uuid().optional(),
});
interface updateSemesterState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    semesterNumber?: string[];
    yearId?: string[];
  };
}
export async function updateSemester(
  initialState: updateSemesterState,
  data: FormData
) {
  const transformedData = {
    semesterNumber: Number(data.get("semesterNumber") as string),
    yearId: data.get("yearId") as string,
  };
  const semesterId = data.get("semesterId")?.toString() as string;

  const result = updateSemesterSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await editSemester(semesterId, transformedData);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Failed to update semester, please try again later",
    };
  }

  revalidatePath("/dashboard/semesters");

  return {
    success: true,
  };
}
