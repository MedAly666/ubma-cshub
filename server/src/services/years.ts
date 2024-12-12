import { CreateYear, UpdateYear } from "../dtos/years";
import prisma from "../utils/db";

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

export const findYears = async () => {
  const years = await prisma.year.findMany({
    include: { major: { include: { degree: true } } },
    orderBy: { createdAt: "desc" },
  });
  return years;
};

export const removeYear = async (id: string) => {
  const deletedYear = await prisma.year.delete({ where: { id } });
  return deletedYear;
};

export const editYear = async (id: string, data: UpdateYear) => {
  const year = await prisma.year.update({ where: { id }, data });
  return year;
};
