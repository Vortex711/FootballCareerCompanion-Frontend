export type BoardExpectation =
  | "Title"
  | "Top4"
  | "MidTable"
  | "Survival";

export interface Season {
  id: string;
  name: string;
  startDate: string | null;
  endDate: string | null;
  boardExpectation: BoardExpectation;
  leaguePosition: number | null;
}