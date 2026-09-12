export interface Career {
  id: string;
  name: string;
  clubName: string;
  managerName: string;
  createdAt: string;
}

export interface Season {
  id: string;
  name: string;
  startDate: string | null;
  endDate: string | null;
  boardExpectation: BoardExpectation;
  leaguePosition: number | null;
}

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

export interface Narrative {
  narrative: string;
}

export type BoardExpectation =
  | "Title"
  | "Top4"
  | "MidTable"
  | "Survival";