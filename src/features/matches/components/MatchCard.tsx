import MatchNarrativeView from "../../narratives/components/MatchNarrativeView";
import type { Match } from "../types";

interface MatchCardProps {
  match: Match;
  seasonId: string;
}

function MatchCard({ match, seasonId }: MatchCardProps) {
  const homeTeam = match.isHome
    ? match.clubName
    : match.opponentName;

  const awayTeam = match.isHome
    ? match.opponentName
    : match.clubName;

  const homeScore = match.isHome
    ? match.teamGoals
    : match.opponentGoals;

  const awayScore = match.isHome
    ? match.opponentGoals
    : match.teamGoals;

  return (
    <div
      className="
        rounded-2xl border border-border
        bg-surface p-5
        transition-all duration-200
        hover:border-accent
        hover:bg-surface-hover
      "
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold tracking-[0.15em] text-accent">
          {match.competitionName}
        </span>

        <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary">
          {match.isHome ? "HOME" : "AWAY"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="text-right">
          <p className="text-base font-semibold text-text-primary">
            {homeTeam}
          </p>
        </div>

        <div className="
          flex items-center gap-3
          rounded-xl border border-border
          bg-app-bg px-4 py-3
        ">
          <span className="text-2xl font-bold text-text-primary">
            {homeScore}
          </span>

          <span className="text-text-secondary">
            —
          </span>

          <span className="text-2xl font-bold text-text-primary">
            {awayScore}
          </span>
        </div>

        <div>
          <p className="text-base font-semibold text-text-primary">
            {awayTeam}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-text-secondary">
            {new Date(match.playedAt).toLocaleString()}
          </span>

          {match.leaguePositionAfter !== null &&
            match.leaguePositionAfter !== undefined && (
              <span className="text-sm font-medium text-text-primary">
                League Position:{" "}
                <span className="text-accent">
                  #{match.leaguePositionAfter}
                </span>
              </span>
            )}
        </div>
      </div>

      <div className="mt-5">
        <MatchNarrativeView
          matchId={match.id}
          seasonId={seasonId}
        />
      </div>
    </div>
  );
}

export default MatchCard;