import { Degree, User, Major, Year, Semester, Module } from "./db";

// ERRORS
export type ErrorRes = {
  message: string;
};

// ADMINS
export type CreateAdminRes = {
  admin: User;
};
export type UpdateAdminRes = CreateAdminRes;
export type DeleteAdminRes = {
  deletedAdmin: User;
};
export type GetAdminsRes = {
  admins: User[];
};

// DEGREES
export type CreateDegreeRes = {
  degree: Degree;
};
export type UpdateDegreeRes = CreateDegreeRes;
export type DeleteDegreeRes = {
  deletedDegree: Degree;
};
export type GetDegreesRes = {
  degrees: Degree[];
};

// MAJORS
export type CreateMajorRes = {
  major: Major;
};
export type UpdateMajorRes = CreateMajorRes;
export type DeleteMajorRes = {
  deletedMajor: Major;
};
export type GetMajorsRes = {
  majors: Major[];
};

// YEARS
export type CreateYearRes = {
  year: Year;
};
export type UpdateYearRes = CreateYearRes;
export type DeleteYearRes = {
  deletedYear: Year;
};
export type GetYearsRes = {
  years: Year[];
};

// SEMESTERS
export type CreateSemesterRes = {
  semester: Semester;
};
export type UpdateSemesterRes = CreateSemesterRes;
export type DeleteSemesterRes = {
  deletedSemester: Semester;
};
export type GetSemestersRes = {
  semesters: Semester[];
};

// MODULES
export type CreateModuleRes = {
  module: Module;
};
export type UpdateModuleRes = CreateModuleRes;
export type DeleteModuleRes = {
  deletedModule: Module;
};
export type GetModulesRes = {
  modules: Module[];
};
