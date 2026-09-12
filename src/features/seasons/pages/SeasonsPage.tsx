import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  endSeason,
  getSeasons,
} from "../api/seasonsApi";
import { generateSeasonNarrative } from "../../narratives/api/narrativesApi";

import TwoPanelLayout from "../../../shared/layout/TwoPanelLayout";
import AddSeasonForm from "../components/AddSeasonForm";
import SeasonCard from "../components/SeasonCard";

import type { Season } from "../types";

function SeasonsPage() {
  const { careerId } = useParams<{ careerId: string }>();

  const [seasons, setSeasons] = useState<Season[]>([]);
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  const fetchSeasons = async (): Promise<void> => {
    if (!careerId) return;

    try {
      const seasons = await getSeasons(careerId);

      setSeasons(seasons);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch seasons");
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, [careerId]);

  const generateSummary = async (
    seasonId: string
  ): Promise<void> => {
    if (generating) return;

    setGenerating(true);

    try {
      await generateSeasonNarrative(seasonId);

      navigate(`/seasons/${seasonId}/summary`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setGenerating(false);
    }
  };

  const handleEndSeason = async (
  seasonId: string
): Promise<void> => {
  try {
    await endSeason(seasonId);

    await fetchSeasons();
  } catch (error) {
    console.error(error);
    alert("Failed to end season");
  }
};

  if (!careerId) {
    return (
      <div className="p-8 text-text-secondary">
        Invalid career.
      </div>
    );
  }

  return (
    <TwoPanelLayout
      leftTitle="Add Season"
      leftSubtitle="Start a new chapter and continue your football journey."
      leftContent={
        <AddSeasonForm
          careerId={careerId}
          onSeasonAdded={fetchSeasons}
        />
      }
      rightTitle="Seasons"
      rightSubtitle="Every season tells a different story."
      rightContent={
        seasons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-text-secondary">
              No seasons yet.
            </p>

            <p className="mt-2 text-sm text-text-secondary">
              Start a new chapter in your career.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {seasons.map((season) => (
              <SeasonCard
                key={season.id}
                season={season}
                generating={generating}
                onViewMatches={() =>
                  navigate(`/seasons/${season.id}/matches`)
                }
                onGenerateSummary={() =>
                  generateSummary(season.id)
                }
                onEndSeason={() =>
                  handleEndSeason(season.id)
                }
              />
            ))}
          </div>
        )
      }
    />
  );
}

export default SeasonsPage;