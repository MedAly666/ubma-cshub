import { User } from "@/types/db";
import { fetchWithAuth } from "../utils/fetch";

export async function getProfile(): Promise<{ profile: User }> {
  return fetchWithAuth("/api/v1/profiles", "GET");
}
