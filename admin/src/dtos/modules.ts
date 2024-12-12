export type CreateModule = {
  name: string;
  code: string;
  description: string;
  semesterId: string;
};

export type UpdateModule = Partial<CreateModule>;
