export interface Match {
  id: string;
  clubName: string;
  competitionName: string;
  opponentName: string;
  isHome: boolean;
  teamGoals: number;
  opponentGoals: number;
  leaguePositionBefore: number | null;
  leaguePositionAfter: number | null;
  playedAt: string;
}

export interface GoalEvent {
  playerName: string;
  minute: number | null;
}

export interface CreateMatchRequest {
  seasonId: string;
  competitionName: string;
  opponentName: string;
  isHome: boolean;
  teamGoals: number;
  opponentGoals: number;
  leaguePositionAfter: number | null;
  playedAt: string;
  goalEvents: GoalEvent[];
}