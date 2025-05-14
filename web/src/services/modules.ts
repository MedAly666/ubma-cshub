import { CreateModule, UpdateModule } from "../dtos/modules";
import { prisma } from "@/utils/db";

export const addModule = async (moduleInfo: CreateModule) => {
  const module_ = await prisma.module.create({
    data: moduleInfo,
    include: { semester: true },
  });
  return module_;
};

export const findModuleById = async (id: string) => {
  const module_ = await prisma.module.findUnique({
    where: { id },
    include: { semester: { include: { year: true } } },
  });
  return module_;
};
export const findModules = async () => {
  const modules = await prisma.module.findMany({
    include: {
      semester: {
        include: {
          year: { include: { major: { include: { degree: true } } } },
        },
      },
    },
  });
  return modules;
};
export const removeModule = async (id: string) => {
  const deletedModule = await prisma.module.delete({ where: { id } });
  return deletedModule;
};

export const editModule = async (id: string, moduleInfo: UpdateModule) => {
  const module_ = await prisma.module.update({
    where: { id },
    data: moduleInfo,
    include: {
      semester: true,
    },
  });
  return module_;
};
