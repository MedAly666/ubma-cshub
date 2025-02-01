export type CreateResource = {
  resourceType: "YOUTUBE" | "DRIVE" | "BOOK" | "WEBSITE";
  url: string;
  description: string;
  moduleId: string;
};
export type UpdateResource = Partial<CreateResource>;
