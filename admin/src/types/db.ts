import { User as PrismaUser } from "@prisma/client";
import { Major as PrismaMajor } from "@prisma/client";

export type User = Omit<PrismaUser, "password">;

export type Degree = {
  id: string;
  name: "BACHELOR" | "MASTERS";
  createdAt: Date;
  updatedAt: Date;
};

export type Year = {
  id: string;
  yearNumber: number;
  majorId: string;
  major: Major;
  createdAt: Date;
  updatedAt: Date;
};

export type Semester = {
  id: string;
  semesterNumber: number;
  createdAt: Date;
  updatedAt: Date;
  yearId: string;
  year: Year;
};

export type Module = {
  id: string;
  name: string;
  code: string;
  description: string;
  semesterId: string;
  semester: Semester;
  createdAt: Date;
  updatedAt: Date;
};

export type Major = PrismaMajor & {
  degree: Degree;
};

export type Resource = {
  id: string;
  resourceType: "BOOK" | "DRIVE" | "YOUTUBE" | "WEBSITE";
  url: string;
  description: string;
  module: Module;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
};
