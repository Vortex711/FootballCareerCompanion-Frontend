import { useState, type FormEvent } from "react";

import { createSeason } from "../api/seasonsApi";
import type { BoardExpectation } from "../types";

import Field from "../../../shared/ui/Field";
import Input from "../../../shared/ui/Input";
import Select from "../../../shared/ui/Select";
import Button from "../../../shared/ui/Button";

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
      <Field label="Season Name" required>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g. 2025/26"
        />
      </Field>

      <Field label="Start Date">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Field>

      <Field label="Board Expectation" required>
        <Select
          value={expectation}
          onChange={(e) =>
            setExpectation(e.target.value as BoardExpectation)
          }
        >
          <option value="Title">Title Challenge</option>
          <option value="Top4">Top 4</option>
          <option value="MidTable">Mid Table</option>
          <option value="Survival">Survival</option>
        </Select>
      </Field>

      <Button
        type="submit"
        fullWidth
        disabled={loading}
        className="py-3 font-semibold"
      >
        {loading ? "Adding Season..." : "Add Season"}
      </Button>
    </form>
  );
}

export default AddSeasonForm; 