import api from "../../../shared/api/client";
import type {
  BoardExpectation,
  Season,
} from "../types";

export interface CreateSeasonRequest {
  name: string;
  startDate: string | null;
  expectation: BoardExpectation;
}

export async function getSeasons(
  careerId: string
): Promise<Season[]> {
  const response = await api.get<Season[]>(
    `/v1/careers/${careerId}/seasons`
  );

  return response.data;
}

export async function createSeason(
  careerId: string,
  request: CreateSeasonRequest
): Promise<void> {
  await api.post(
    `/v1/careers/${careerId}/seasons`,
    request
  );
}

export async function endSeason(
  seasonId: string
): Promise<void> {
  await api.post(`/v1/seasons/${seasonId}/end`);
}