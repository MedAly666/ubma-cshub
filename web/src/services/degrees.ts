import axiosClient from ".";

export const getAllDegrees = async () => {
  const response = await axiosClient.get("academics/api/degrees");
  return response.data;
};
