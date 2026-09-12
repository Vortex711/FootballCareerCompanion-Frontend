import { useState, type FormEvent } from "react";
import { createCareer } from "../api/careersApi";

interface AddCareerFormProps {
  onCareerCreated?: () => void | Promise<void>;
}

function AddCareerForm({
  onCareerCreated,
}: AddCareerFormProps) {
  const [name, setName] = useState("");
  const [clubName, setClubName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name || !clubName || !managerName) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await createCareer({
        name,
        clubName,
        managerName,
      });

      setName("");
      setClubName("");
      setManagerName("");

      await onCareerCreated?.();
    } catch (error) {
      console.error(error);
      alert("Failed to create career.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Career Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Brighton Rebuild"
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
          Club
        </label>

        <input
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          placeholder="e.g. Brighton & Hove Albion"
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
          Manager
        </label>

        <input
          type="text"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          placeholder="e.g. Chinmay Hari"
          className="
            w-full rounded-lg border border-border
            bg-surface px-4 py-3
            text-text-primary placeholder:text-text-secondary
            outline-none transition
            focus:border-accent focus:ring-1 focus:ring-accent
          "
        />
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
        {loading ? "Creating Career..." : "Create Career"}
      </button>

    </form>
  );
}

export default AddCareerForm;