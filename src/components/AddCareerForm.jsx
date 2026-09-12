import { useState } from "react";
import api from "../api/api";

function AddCareerForm({ onCareerAdded }) {
  const [name, setName] = useState("");
  const [clubName, setClubName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !clubName || !managerName) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/v1/careers", {
        name,
        clubName,
        managerName
      });

      setName("");
      setClubName("");
      setManagerName("");

      onCareerAdded();

    } catch {
      alert("Failed to create career");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h3>Create Career</h3>

      <input
        placeholder="Career Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
      />

      <input
        placeholder="Manager Name"
        value={managerName}
        onChange={(e) => setManagerName(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Career"}
      </button>
    </div>
  );
}

export default AddCareerForm;