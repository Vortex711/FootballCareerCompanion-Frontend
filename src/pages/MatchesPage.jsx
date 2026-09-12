import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/api";

import TwoPanelLayout from "../components/TwoPanelLayout";
import AddMatchForm from "../components/AddMatchForm";
import MatchCard from "../components/MatchCard";

function MatchesPage() {
  const { seasonId } = useParams();

  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    try {
      const response = await api.get(
        `/v1/seasons/${seasonId}/matches`
      );

      setMatches(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch matches");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [seasonId]);

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