import { useState, type FormEvent } from "react";
import { createCareer } from "../api/careersApi";

import Field from "../../../shared/ui/Field";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

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

      <Field label="Career Name" required>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="E.g. RM Career"
        />
      </Field>

      <Field label="Club Name" required>
        <Input
          type="text"
          value={clubName}
          onChange={(event) => setClubName(event.target.value)}
          placeholder="E.g. Real Madrid CF"
        />
      </Field>

      <Field label="Manager Name" required>
        <Input
          type="text"
          value={managerName}
          onChange={(event) => setManagerName(event.target.value)}
          placeholder="E.g. Xabi Alonso"
        />
      </Field>

      <Button
        type="submit"
        fullWidth
        disabled={loading}
        className="py-3 font-semibold"
      >
        {loading ? "Creating Career..." : "Create Career"}
      </Button>

    </form>
  );
}

export default AddCareerForm;