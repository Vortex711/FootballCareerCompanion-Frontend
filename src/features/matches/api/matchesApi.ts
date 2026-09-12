import api from "../../../shared/api/client";

import type {
  CreateMatchRequest,
  Match,
} from "../types";

export async function getMatches(
  seasonId: string
): Promise<Match[]> {
  const response = await api.get<Match[]>(
    `/v1/seasons/${seasonId}/matches`
  );

  return response.data;
}

export async function createMatch(
  seasonId: string,
  request: CreateMatchRequest
): Promise<void> {
  await api.post(
    `/v1/seasons/${seasonId}/matches`,
    request
  );
}