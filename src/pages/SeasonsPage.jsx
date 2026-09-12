import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

import AddSeasonForm from "../components/AddSeasonForm";
import SeasonCard from "../components/SeasonCard";

function SeasonsPage() {
  const { careerId } = useParams();

  const [seasons, setSeasons] = useState([]);
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  const fetchSeasons = async () => {
    try {
      const response = await api.get(
        `/v1/careers/${careerId}/seasons`
      );

      setSeasons(response.data);
    } catch {
      alert("Failed to fetch seasons");
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, [careerId]);

  const generateSummary = async (seasonId) => {
    if (generating) return;

    setGenerating(true);

    try {
      await api.post(
        `/v1/seasons/${seasonId}/narrative`
      );

      navigate(`/seasons/${seasonId}/summary`);
    } catch {
      alert("Failed to generate summary");
    } finally {
      setGenerating(false);
    }
  };

  const endSeason = async (seasonId) => {
    try {
      await api.post(
        `/v1/seasons/${seasonId}/end`
      );

      await fetchSeasons();
    } catch {
      alert("Failed to end season");
    }
  };

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