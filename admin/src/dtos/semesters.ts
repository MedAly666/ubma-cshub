export type CreateSemester = {
  semesterNumber: number;
  yearId: string;
};

export type UpdateSemester = Partial<CreateSemester>;
