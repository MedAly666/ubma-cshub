export interface Degree {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Major {
  id: string;
  name: string;
  description: string;
  code: string;
  created_at: string;
  updated_at: string;
  degree: Degree;
}

export interface Year {
  id: string;
  year_number: number;
  created_at: string;
  updated_at: string;
  major: Major;
}

export interface Semester {
  id: string;
  semester_number: number;
  created_at: string;
  updated_at: string;
  year: Year;
}

export interface Module {
  id: string;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
  semester: Semester;
}

export type ResourceType = "BOOK" | "DRIVE" | "YOUTUBE" | "WEBSITE";

export interface Resource {
  id: string;
  resource_type: ResourceType;
  url: string;
  description: string;
  created_at: string;
  updated_at: string;
  module: Module;
}
