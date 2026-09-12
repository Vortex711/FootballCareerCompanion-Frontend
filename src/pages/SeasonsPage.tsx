import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";

import AddSeasonForm from "../components/AddSeasonForm";
import SeasonCard from "../components/SeasonCard";

import type { Season } from "../types/models";

function SeasonsPage() {
  const { careerId } = useParams<{ careerId: string }>();

  const [seasons, setSeasons] = useState<Season[]>([]);
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  const fetchSeasons = async (): Promise<void> => {
    if (!careerId) return;

    try {
      const response = await api.get<Season[]>(
        `/v1/careers/${careerId}/seasons`
      );

      setSeasons(response.data);

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
      await api.post(
        `/v1/seasons/${seasonId}/narrative`
      );

      navigate(`/seasons/${seasonId}/summary`);

    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");

    } finally {
      setGenerating(false);
    }
  };

  const endSeason = async (
    seasonId: string
  ): Promise<void> => {
    try {
      await api.post(
        `/v1/seasons/${seasonId}/end`
      );

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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">

        {/* LEFT — ADD SEASON */}
        <aside className="w-full lg:w-[380px]">
          <AddSeasonForm
            careerId={careerId}
            onSeasonAdded={fetchSeasons}
          />
        </aside>

        {/* RIGHT — SEASONS */}
        <main className="flex-1">

          <div className="mb-8">
            <p className="mb-2 text-sm font-bold tracking-[0.25em] text-emerald-400">
              YOUR CAREER
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Seasons
            </h1>

            <p className="mt-2 text-slate-400">
              Every season tells a different story.
            </p>
          </div>

          {seasons.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">

              <p className="text-lg text-slate-400">
                No seasons yet.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Start a new chapter in your career.
              </p>

            </div>

          ) : (

            <div className="grid gap-5">

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
                    endSeason(season.id)
                  }
                />
              ))}

            </div>

          )}

        </main>

      </div>
    </div>
  );
}

export default SeasonsPage;