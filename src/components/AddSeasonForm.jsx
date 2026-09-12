import { useState } from "react";
import api from "../api/api";

function AddSeasonForm({ careerId, onSeasonAdded }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expectation, setExpectation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !expectation) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/v1/careers/${careerId}/seasons`, {
        name,
        startDate: startDate || null,
        expectation
      });

      setName("");
      setStartDate("");
      setExpectation("");

      onSeasonAdded();

    } catch {
      alert("Failed to create season");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h3>Create Season</h3>

      <input
        placeholder="Season Name (e.g. 2025/26)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <select
        value={expectation}
        onChange={(e) => setExpectation(e.target.value)}
        >
        <option value="">Select Board Expectation</option>
        <option value="Title">Title Challenge</option>
        <option value="Top4">Top 4</option>
        <option value="MidTable">Mid Table</option>
        <option value="Survival">Survival</option>
      </select>

      <button
        className="primary-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Season"}
      </button>
    </div>
  );
}

export default AddSeasonForm;