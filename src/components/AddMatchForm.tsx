import { useState, type FormEvent } from "react";
import api from "../api/api";

interface GoalEvent {
  playerName: string;
  minute: string;
}

interface AddMatchFormProps {
  seasonId: string;
  onMatchAdded: () => void | Promise<void>;
}

function AddMatchForm({
  seasonId,
  onMatchAdded,
}: AddMatchFormProps) {
  const [competitionName, setCompetitionName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [isHome, setIsHome] = useState(true);

  const [teamGoals, setTeamGoals] = useState("");
  const [opponentGoals, setOpponentGoals] = useState("");

  const [leaguePositionAfter, setLeaguePositionAfter] = useState("");
  const [playedAt, setPlayedAt] = useState("");

  const [goalEvents, setGoalEvents] = useState<GoalEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const addGoalEvent = () => {
    setGoalEvents([
      ...goalEvents,
      {
        playerName: "",
        minute: "",
      },
    ]);
  };

  const updateGoalEvent = (
    index: number,
    field: keyof GoalEvent,
    value: string
  ) => {
    const updatedGoals = [...goalEvents];

    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value,
    };

    setGoalEvents(updatedGoals);
  };

  const removeGoalEvent = (index: number) => {
    setGoalEvents(
      goalEvents.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!competitionName || !opponentName) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const request = {
        seasonId,
        competitionName,
        opponentName,
        isHome,
        teamGoals: Number(teamGoals),
        opponentGoals: Number(opponentGoals),

        leaguePositionAfter:
          leaguePositionAfter === ""
            ? null
            : Number(leaguePositionAfter),

        playedAt: playedAt
          ? new Date(playedAt).toISOString()
          : new Date().toISOString(),

        goalEvents: goalEvents.map((goal) => ({
          playerName: goal.playerName,
          minute:
            goal.minute === ""
              ? null
              : Number(goal.minute),
        })),
      };

      await api.post(
        `/v1/seasons/${seasonId}/matches`,
        request
      );

      // Reset form
      setCompetitionName("");
      setOpponentName("");
      setIsHome(true);
      setTeamGoals("");
      setOpponentGoals("");
      setLeaguePositionAfter("");
      setPlayedAt("");
      setGoalEvents([]);

      await onMatchAdded();

    } catch (error) {
      console.error(error);
      alert("Failed to submit match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Competition */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Competition
          <span className="ml-1 text-red-400">*</span>
        </label>

        <input
          type="text"
          value={competitionName}
          onChange={(e) => setCompetitionName(e.target.value)}
          placeholder="Premier League"
          className="
            w-full rounded-xl
            border border-slate-700
            bg-slate-900
            px-4 py-3
            text-slate-100
            outline-none
            transition
            placeholder:text-slate-500
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/20
          "
        />
      </div>

      {/* Opponent */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Opponent
          <span className="ml-1 text-red-400">*</span>
        </label>

        <input
          type="text"
          value={opponentName}
          onChange={(e) => setOpponentName(e.target.value)}
          placeholder="Arsenal"
          className="
            w-full rounded-xl
            border border-slate-700
            bg-slate-900
            px-4 py-3
            text-slate-100
            outline-none
            transition
            placeholder:text-slate-500
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/20
          "
        />
      </div>

      {/* Location */}
      <div>
        <p className="mb-3 text-sm font-medium text-slate-300">
          Match Location
        </p>

        <button
          type="button"
          onClick={() => setIsHome(!isHome)}
          className={`
            flex w-full items-center justify-between
            rounded-xl border px-4 py-3
            transition
            ${
              isHome
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 bg-slate-900 text-slate-400"
            }
          `}
        >
          <span className="font-medium">
            {isHome ? "🏠 Home Match" : "✈️ Away Match"}
          </span>

          <span className="text-xs">
            Click to change
          </span>
        </button>
      </div>

      {/* Score */}
      <div>
        <p className="mb-3 text-sm font-medium text-slate-300">
          Score
          <span className="ml-1 text-red-400">*</span>
        </p>

        <div className="grid grid-cols-2 gap-3">

          <div>
            <label className="mb-2 block text-xs text-slate-500">
              Your Team
            </label>

            <input
              type="number"
              min="0"
              value={teamGoals}
              onChange={(e) => setTeamGoals(e.target.value)}
              placeholder="0"
              className="
                w-full rounded-xl
                border border-slate-700
                bg-slate-900
                px-4 py-3
                text-center text-lg font-bold text-slate-100
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-slate-500">
              Opponent
            </label>

            <input
              type="number"
              min="0"
              value={opponentGoals}
              onChange={(e) => setOpponentGoals(e.target.value)}
              placeholder="0"
              className="
                w-full rounded-xl
                border border-slate-700
                bg-slate-900
                px-4 py-3
                text-center text-lg font-bold text-slate-100
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />
          </div>

        </div>
      </div>

      {/* Additional details */}
      <div className="border-t border-slate-800 pt-5">

        <p className="mb-4 text-sm font-semibold text-slate-300">
          Additional Details
        </p>

        <div className="space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              League Position After
            </label>

            <input
              type="number"
              min="1"
              value={leaguePositionAfter}
              onChange={(e) =>
                setLeaguePositionAfter(e.target.value)
              }
              placeholder="Optional"
              className="
                w-full rounded-xl
                border border-slate-700
                bg-slate-900
                px-4 py-3
                text-slate-100
                outline-none
                placeholder:text-slate-500
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Match Date & Time
            </label>

            <input
              type="datetime-local"
              value={playedAt}
              onChange={(e) => setPlayedAt(e.target.value)}
              className="
                w-full rounded-xl
                border border-slate-700
                bg-slate-900
                px-4 py-3
                text-slate-100
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />
          </div>

        </div>
      </div>

      {/* Goals */}
      <div className="border-t border-slate-800 pt-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-slate-300">
              Goal Events
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Add your team's goalscorers.
            </p>
          </div>

          <button
            type="button"
            onClick={addGoalEvent}
            className="
              rounded-lg
              border border-emerald-500/40
              px-3 py-2
              text-sm font-medium text-emerald-400
              transition
              hover:bg-emerald-500/10
            "
          >
            + Add Goal
          </button>

        </div>

        {goalEvents.length > 0 && (
          <div className="mt-4 space-y-3">

            {goalEvents.map((goal, index) => (

              <div
                key={index}
                className="flex items-center gap-2"
              >

                <input
                  type="text"
                  value={goal.playerName}
                  onChange={(e) =>
                    updateGoalEvent(
                      index,
                      "playerName",
                      e.target.value
                    )
                  }
                  placeholder="Player"
                  className="
                    min-w-0 flex-1
                    rounded-lg
                    border border-slate-700
                    bg-slate-900
                    px-3 py-2
                    text-sm text-slate-100
                    outline-none
                    placeholder:text-slate-500
                    focus:border-emerald-500
                  "
                />

                <input
                  type="number"
                  min="1"
                  max="120"
                  value={goal.minute}
                  onChange={(e) =>
                    updateGoalEvent(
                      index,
                      "minute",
                      e.target.value
                    )
                  }
                  placeholder="Min"
                  className="
                    w-20
                    rounded-lg
                    border border-slate-700
                    bg-slate-900
                    px-3 py-2
                    text-center text-sm text-slate-100
                    outline-none
                    placeholder:text-slate-500
                    focus:border-emerald-500
                  "
                />

                <button
                  type="button"
                  onClick={() => removeGoalEvent(index)}
                  className="
                    rounded-lg
                    px-2 py-2
                    text-slate-500
                    transition
                    hover:bg-red-500/10
                    hover:text-red-400
                  "
                  title="Remove goal"
                >
                  ✕
                </button>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full rounded-xl
          bg-emerald-500
          px-4 py-3
          font-semibold text-slate-950
          transition
          hover:bg-emerald-400
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Submitting Match..." : "Submit Match"}
      </button>

    </form>
  );
}

export default AddMatchForm;