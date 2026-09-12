import api from "../../../shared/api/client";
import type { Career } from "../types";

export interface CreateCareerRequest {
  name: string;
  clubName: string;
  managerName: string;
}

export async function getCareers(): Promise<Career[]> {
  const response = await api.get<Career[]>("/v1/careers");

  return response.data;
}

export async function createCareer(
  request: CreateCareerRequest
): Promise<void> {
  await api.post("/v1/careers", request);
}