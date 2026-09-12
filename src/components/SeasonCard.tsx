import { formatBoardExpectation } from "../utils/formatters";
import type { Season } from "../types/models";

interface SeasonCardProps {
  season: Season;
  onViewMatches: () => void;
  onGenerateSummary: () => void;
  onEndSeason: () => void;
  generating: boolean;
}

function SeasonCard({
  season,
  onViewMatches,
  onGenerateSummary,
  onEndSeason,
  generating,
}: SeasonCardProps) {
  const formatDate = (date: string | null): string | null => {
    if (!date) return null;

    return new Date(date).toLocaleDateString();
  };

  const isOngoing = !season.endDate;

  return (
    <div
      className="
        rounded-2xl border border-slate-700/70
        bg-slate-800/60
        p-5
        transition-all duration-200
        hover:-translate-y-1
        hover:border-emerald-500/50
        hover:shadow-lg hover:shadow-emerald-950/20
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-emerald-400">
            SEASON
          </p>

          <h3 className="text-2xl font-bold text-slate-100">
            {season.name}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
            isOngoing
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-slate-700 text-slate-400"
          }`}
        >
          {isOngoing ? "ONGOING" : "COMPLETED"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-700/70 pt-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-400">
            BOARD EXPECTATION
          </p>

          <p className="mt-1 font-medium text-slate-200">
            {formatBoardExpectation(season.boardExpectation)}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-400">
            LEAGUE POSITION
          </p>

          <p className="mt-1 font-medium text-slate-200">
            {season.leaguePosition
              ? `#${season.leaguePosition}`
              : "—"}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-400">
            PERIOD
          </p>

          <p className="mt-1 font-medium text-slate-200">
            {formatDate(season.startDate) || "Not specified"}

            <span className="mx-1 text-slate-500">—</span>

            {season.endDate
              ? formatDate(season.endDate)
              : "Present"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onViewMatches}
          className="
            rounded-lg border border-slate-600
            bg-slate-700/50
            px-4 py-2
            font-medium text-slate-200
            transition
            hover:bg-slate-700
          "
        >
          View Matches →
        </button>

        <button
          onClick={onGenerateSummary}
          disabled={generating}
          className="
            rounded-lg
            bg-emerald-500
            px-4 py-2
            font-semibold text-slate-950
            transition
            hover:bg-emerald-400
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {generating ? "Generating..." : "Generate Summary"}
        </button>

        {isOngoing && (
          <button
            onClick={onEndSeason}
            className="
              rounded-lg
              border border-red-500/40
              px-4 py-2
              font-medium text-red-400
              transition
              hover:bg-red-500/10
            "
          >
            End Season
          </button>
        )}
      </div>
    </div>
  );
}

export default SeasonCard;