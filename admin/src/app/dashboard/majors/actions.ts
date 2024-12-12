"use server";
import {
  createMajorReq,
  deleteMajorReq,
  updateMajorReq,
} from "@/services/majors";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

interface CreateMajorState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    name?: string[];
    description?: string[];
    code?: string[];
    degreeId?: string[];
  };
}
const createMajorSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  code: z.string().min(1),
  degreeId: z.string().uuid(),
});

export async function createMajor(
  initialState: CreateMajorState,
  data: FormData
) {
  const transformedData = {
    name: data.get("name") as string,
    description: data.get("description") as string,
    code: data.get("code") as string,
    degreeId: data.get("degreeId") as string,
  };

  const result = createMajorSchema.safeParse(transformedData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await createMajorReq(token, transformedData);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while creating major, please try again later",
    };
  }

  revalidatePath("/dashboard/majors");
  return {
    success: true,
  };
}

interface DeleteMajorState {
  success: boolean;
}
export async function deleteMajor(
  initialState: DeleteMajorState,
  data: FormData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  const majorId = data.get("majorId")?.toString() as string;
  try {
    await deleteMajorReq(token, majorId);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Failed to delete major, please try again later",
    };
  }
  revalidatePath("/dashboard/majors");
  return {
    success: true,
  };
}

const updateMajorSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  degreeId: z.string().uuid().optional(),
});
interface updateMajorState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    name?: string[];
    description?: string[];
    code?: string[];
    degreeId?: string[];
  };
}
export async function updateMajor(
  initialState: updateMajorState,
  data: FormData
) {
  const transformedData = {
    name: data.get("name") as string,
    description: data.get("description") as string,
    code: data.get("code") as string,
    degreeId: data.get("degreeId") as string,
  };
  const majorId = data.get("majorId")?.toString() as string;

  const result = updateMajorSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await updateMajorReq(token, majorId, transformedData);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Failed to update major, please try again later",
    };
  }

  revalidatePath("/dashboard/majors");

  return {
    success: true,
  };
}
