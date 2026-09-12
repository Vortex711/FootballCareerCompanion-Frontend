import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TwoPanelLayout from "../../../shared/layout/TwoPanelLayout";
import AddCareerForm from "../components/AddCareerForm";
import CareerCard from "../components/CareerCard";

import { getCareers } from "../api/careersApi";
import type { Career } from "../types";

function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);

  const navigate = useNavigate();

  const fetchCareers = async (): Promise<void> => {
  try {
    const careers = await getCareers();

    setCareers(careers);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch careers");
  }
};

  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <TwoPanelLayout
      leftTitle="Add Career"
      leftSubtitle="Start a new football journey and build your own story."
      leftContent={
        <AddCareerForm
          onCareerCreated={fetchCareers}
        />
      }
      rightTitle="My Careers"
      rightSubtitle="Your football careers and the stories behind them."
      rightContent={
        careers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-text-secondary">
              No careers yet.
            </p>

            <p className="mt-2 text-sm text-text-secondary">
              Add your first career to begin your journey.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {careers.map((career) => (
              <CareerCard
                key={career.id}
                career={career}
                onClick={() =>
                  navigate(
                    `/careers/${career.id}/seasons`
                  )
                }
              />
            ))}
          </div>
        )
      }
    />
  );
}

export default CareersPage;