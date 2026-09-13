import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TwoPanelLayout from "../../../shared/layout/TwoPanelLayout";
import AddCareerForm from "../components/AddCareerForm";
import CareerCard from "../components/CareerCard";

import { getCareers } from "../api/careersApi";
import type { Career } from "../types";
import EmptyState from "../../../shared/ui/EmptyState";

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
          <EmptyState
            title="No careers yet."
            description="Add your first career to begin your journey."
          />
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