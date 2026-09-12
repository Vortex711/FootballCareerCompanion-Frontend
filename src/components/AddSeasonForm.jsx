import { useState } from "react";
import api from "../api/api";

function AddSeasonForm({ careerId, onSeasonAdded }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expectation, setExpectation] = useState("Top4");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a season name.");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/v1/careers/${careerId}/seasons`, {
        name,
        startDate: startDate || null,
        expectation,
      });

      // Reset form
      setName("");
      setStartDate("");
      setExpectation("Top4");

      // Refresh seasons
      if (onSeasonAdded) {
        onSeasonAdded();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add season.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Season Name */}
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

      {/* Start Date */}
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

      {/* Board Expectation */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Board Expectation
        </label>

        <select
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
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

      {/* Submit */}
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