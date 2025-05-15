import { Module } from "@/types/db";
import axiosClient from ".";

export const getModulesBySemester = async (id: string) => {
  const response = await axiosClient.get<Module[]>(
    `/academics/api/modules/by-semester/${id}`
  );
  return response.data;
};
