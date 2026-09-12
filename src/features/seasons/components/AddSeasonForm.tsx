import { useState, type FormEvent } from "react";
import { createSeason } from "../api/seasonsApi";
import type { BoardExpectation } from "../types";

interface AddSeasonFormProps {
  careerId: string;
  onSeasonAdded?: () => void | Promise<void>;
}

function AddSeasonForm({
  careerId,
  onSeasonAdded,
}: AddSeasonFormProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expectation, setExpectation] =
    useState<BoardExpectation>("Top4");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a season name.");
      return;
    }

    setLoading(true);

    try {
      await createSeason(careerId, {
        name,
        startDate: startDate || null,
        expectation,
      });

      setName("");
      setStartDate("");
      setExpectation("Top4");

      await onSeasonAdded?.();
    } catch (error) {
      console.error(error);
      alert("Failed to add season.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Season Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. 2025/26"
          className="
            w-full rounded-lg border border-border
            bg-surface px-4 py-3
            text-text-primary placeholder:text-text-secondary
            outline-none transition
            focus:border-accent focus:ring-1 focus:ring-accent
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Start Date
          <span className="ml-2 text-xs text-text-secondary">
            Optional
          </span>
        </label>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="
            w-full rounded-lg border border-border
            bg-surface px-4 py-3
            text-text-primary
            outline-none transition
            focus:border-accent focus:ring-1 focus:ring-accent
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Board Expectation
        </label>

        <select
          value={expectation}
          onChange={(e) =>
            setExpectation(e.target.value as BoardExpectation)
          }
          className="
            w-full rounded-lg border border-border
            bg-surface px-4 py-3
            text-text-primary
            outline-none transition
            focus:border-accent focus:ring-1 focus:ring-accent
          "
        >
          <option value="Title">Title Challenge</option>
          <option value="Top4">Top 4</option>
          <option value="MidTable">Mid Table</option>
          <option value="Survival">Survival</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full rounded-lg bg-accent px-4 py-3
          font-semibold text-slate-950
          transition duration-200
          hover:bg-accent-hover
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        {loading ? "Adding Season..." : "Add Season"}
      </button>

    </form>
  );
}

export default AddSeasonForm;