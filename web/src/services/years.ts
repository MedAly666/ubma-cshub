import axiosClient from ".";
import { CreateYear, UpdateYear } from "../dtos/years";
import { prisma } from "@/utils/db";

export const addYear = async (data: CreateYear) => {
  const year = await prisma.year.create({ data: data });
  return year;
};

export const findYearByID = async (id: string) => {
  const year = await prisma.year.findUnique({
    where: { id },
    include: { major: true },
  });
  return year;
};

export const getAllYears = async () => {
  const response = await axiosClient.get("/academics/api/years");
  return response.data;
};

export const removeYear = async (id: string) => {
  const deletedYear = await prisma.year.delete({ where: { id } });
  return deletedYear;
};

export const editYear = async (id: string, data: UpdateYear) => {
  const year = await prisma.year.update({ where: { id }, data });
  return year;
};
