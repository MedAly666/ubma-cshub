export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: "ADMIN" | "SUPERUSER";
};

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

export type Major = {
  id: string;
  name: string;
  description: string;
  code: string;
  degreeId: string;
  degree: Degree;
  createdAt: Date;
  updatedAt: Date;
};
