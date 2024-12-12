export type CreateMajor = {
  name: string;
  description: string;
  code: string;
  degreeId: string;
};

export type UpdateMajor = Partial<CreateMajor>;
