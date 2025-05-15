import axiosClient from ".";
import { CreateMajor, UpdateMajor } from "../dtos/majors";
import { prisma } from "@/utils/db";

export const addMajor = (data: CreateMajor) => {
  const major = prisma.major.create({ data });
  return major;
};

export const findMajorByID = (id: string) => {
  const major = prisma.major.findUnique({ where: { id } });
  return major;
};

export const getAllMajors = async () => {
  const response = await axiosClient.get("/academics/api/majors");
  return response.data;
};

export const removeMajor = (id: string) => {
  const deletedMajor = prisma.major.delete({ where: { id } });
  return deletedMajor;
};

export const editMajor = (id: string, data: UpdateMajor) => {
  const major = prisma.major.update({ where: { id }, data });
  return major;
};
