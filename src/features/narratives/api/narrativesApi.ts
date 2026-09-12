import api from "../../../shared/api/client";

import type { Narrative } from "../types";

export async function getMatchNarrative(
  seasonId: string,
  matchId: string
): Promise<Narrative> {
  const response = await api.get<Narrative>(
    `/v1/seasons/${seasonId}/matches/${matchId}/narrative`
  );

  return response.data;
}

export async function getSeasonNarrative(
  seasonId: string
): Promise<Narrative> {
  const response = await api.get<Narrative>(
    `/v1/seasons/${seasonId}/narrative`
  );

  return response.data;
}

export async function generateSeasonNarrative(
  seasonId: string
): Promise<void> {
  await api.post(`/v1/seasons/${seasonId}/narrative`);
}