import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMatches } from "../api/matchesApi";

import TwoPanelLayout from "../../../shared/layout/TwoPanelLayout";
import AddMatchForm from "../components/AddMatchForm";
import MatchCard from "../components/MatchCard";

import type { Match } from "../types";

function MatchesPage() {
  const { seasonId } = useParams<{ seasonId: string }>();

  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = async (): Promise<void> => {
    if (!seasonId) return;

    try {
      const matches = await getMatches(seasonId);

      setMatches(matches);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch matches");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [seasonId]);

  if (!seasonId) {
    return (
      <div className="p-8 text-text-secondary">
        Invalid season.
      </div>
    );
  }

  return (
    <TwoPanelLayout
      leftTitle="Add Match"
      leftSubtitle="Record the result and let your career story continue."
      leftContent={
        <AddMatchForm
          seasonId={seasonId}
          onMatchAdded={fetchMatches}
        />
      }
      rightTitle="Match History"
      rightSubtitle="Every result becomes part of your story."
      rightContent={
        matches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-text-secondary">
              No matches recorded yet.
            </p>

            <p className="mt-2 text-sm text-text-secondary">
              Add your first match to begin the season.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                seasonId={seasonId}
              />
            ))}
          </div>
        )
      }
    />
  );
}

export default MatchesPage;