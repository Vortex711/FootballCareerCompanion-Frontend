import { useState, type FormEvent } from "react";

import { createMatch } from "../api/matchesApi";

import Field from "../../../shared/ui/Field";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

interface GoalEventForm {
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

  const [goalEvents, setGoalEvents] = useState<GoalEventForm[]>([]);
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
    field: keyof GoalEventForm,
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

      await createMatch(seasonId, request);

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
      <Field label="Competition" required>
        <Input
          type="text"
          value={competitionName}
          onChange={(e) =>
            setCompetitionName(e.target.value)
          }
          placeholder="E.g. La Liga"
        />
      </Field>

      {/* Opponent */}
      <Field label="Opponent" required>
        <Input
          type="text"
          value={opponentName}
          onChange={(e) =>
            setOpponentName(e.target.value)
          }
          placeholder="E.g. Real Madrid CF"
        />
      </Field>

      {/* Match Location */}
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
            {isHome
              ? "🏠 Home Match"
              : "✈️ Away Match"}
          </span>

          <span className="text-xs">
            Click to change
          </span>
        </button>
      </div>

      {/* Score */}
      <Field label="Score" required>
        <div className="grid grid-cols-2 gap-3">

          <div>
            <label className="mb-2 block text-xs text-slate-500">
              Your Team
            </label>

            <Input
              type="number"
              min="0"
              value={teamGoals}
              onChange={(e) =>
                setTeamGoals(e.target.value)
              }
              placeholder="0"
              className="
                text-center text-lg font-bold
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-slate-500">
              Opponent
            </label>

            <Input
              type="number"
              min="0"
              value={opponentGoals}
              onChange={(e) =>
                setOpponentGoals(e.target.value)
              }
              placeholder="0"
              className="
                text-center text-lg font-bold
              "
            />
          </div>

        </div>
      </Field>

      {/* Additional Details */}
      <div className="border-t border-slate-800 pt-5">

        <p className="mb-4 text-sm font-semibold text-slate-300">
          Additional Details
        </p>

        <div className="space-y-4">

          <Field label="League Position After">
            <Input
              type="number"
              min="1"
              value={leaguePositionAfter}
              onChange={(e) =>
                setLeaguePositionAfter(e.target.value)
              }
              placeholder="E.g. 1"
            />
          </Field>

          <Field label="Match Date & Time">
            <Input
              type="datetime-local"
              value={playedAt}
              onChange={(e) =>
                setPlayedAt(e.target.value)
              }
            />
          </Field>

        </div>
      </div>

      {/* Goal Events */}
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

          <Button
            type="button"
            variant="secondary"
            onClick={addGoalEvent}
          >
            + Add Goal
          </Button>

        </div>

        {goalEvents.length > 0 && (
          <div className="mt-4 space-y-3">

            {goalEvents.map((goal, index) => (

              <div
                key={index}
                className="flex items-center gap-2"
              >

                <Input
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
                  fullWidth={false}
                  className="min-w-0 flex-1 px-3 py-2 text-sm"
                />

                <Input
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
                  fullWidth={false}
                  className="w-20 shrink-0 px-3 py-2 text-center text-sm"
                />

                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeGoalEvent(index)}
                  className="px-2 py-2"
                  title="Remove goal"
                >
                  ✕
                </Button>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        disabled={loading}
        className="rounded-xl py-3 font-semibold"
      >
        {loading
          ? "Submitting Match..."
          : "Submit Match"}
      </Button>

    </form>
  );
}

export default AddMatchForm;