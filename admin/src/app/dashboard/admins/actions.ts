"use server";
import {
  createAdminReq,
  deleteAdminReq,
  updateAdminReq,
} from "@/services/admins";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

interface CreateAdminState {
  success: boolean;
  fieldErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  serverErrors?: string;
}
const createAdminSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be at least 2 characters." })
    .max(50),
  email: z
    .string()
    .email()
    .min(1, { message: "Email must not be empty." })
    .max(50),
  password: z.string().min(8),
});
export async function createAdmin(
  initialState: CreateAdminState,
  data: FormData
) {
  const transformedData = {
    username: data.get("username")?.toString() as string,
    email: data.get("email")?.toString() as string,
    password: data.get("password")?.toString() as string,
  };

  const result = createAdminSchema.safeParse(transformedData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await createAdminReq(token, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while creating admin, Please try again later",
    };
  }
  revalidatePath("dashboard/admins");
  return {
    success: true,
  };
}

interface DeleteAdminState {
  success: boolean;
  serverErrors?: string;
}
export async function deleteAdmin(
  initialState: DeleteAdminState,
  data: FormData
) {
  const adminId = data.get("adminId")?.toString() as string;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await deleteAdminReq(adminId, token);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while deleting admin, Please try again later",
    };
  }

  revalidatePath("/dashboard/admins");
  return {
    success: true,
  };
}

interface UpdateAdminState {
  success: boolean;
  fieldErrors?: {
    username?: string[];
    email?: string[];
  };
  serverErrors?: string;
}
const updateAdminSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be at least 2 characters." })
    .max(50)
    .optional(),
  email: z
    .string()
    .email()
    .min(1, { message: "Email must not be empty." })
    .max(50)
    .optional(),
});
export async function updateAdmin(
  initialState: UpdateAdminState,
  data: FormData
) {
  const transformedData = {
    username: data.get("username")?.toString() as string,
    email: data.get("email")?.toString() as string,
  };
  const adminId = data.get("adminId")?.toString() as string;
  const result = updateAdminSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  try {
    await updateAdminReq(adminId, token, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors: "Error while updating admin, Please try again later",
    };
  }

  revalidatePath("/dashboard/admins");
  return {
    success: true,
  };
}
