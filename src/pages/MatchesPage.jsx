import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import AddMatchForm from "../components/AddMatchForm";
import MatchNarrativeView from "../components/MatchNarrativeView";
import BackButton from "../components/BackButton";

function MatchesPage() {
  const { seasonId } = useParams();
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    api.get(`/v1/seasons/${seasonId}/matches`)
      .then((res) => setMatches(res.data))
      .catch(() => alert("Failed to fetch matches"));
  };

  useEffect(() => {
    fetchMatches();
  }, [seasonId]);

  return (
    <div className="matches-layout">

  {/* LEFT - FORM */}
  <div className="left-panel">
    <BackButton />
    <h2>Add Match</h2>
    <AddMatchForm seasonId={seasonId} onMatchAdded={fetchMatches} />
  </div>

  {/* RIGHT - MATCHES */}
  <div className="right-panel">
    <h1>Matches</h1>

    <div className="matches-list">
      {matches.map((m) => (
        <div key={m.id} className="card">

          <div className="row" style={{ justifyContent: "space-between" }}>
            <span>{m.isHome ? "🏠 Home" : "✈️ Away"}</span>
            <strong>{m.teamGoals} - {m.opponentGoals}</strong>
          </div>

          <div>
            <strong>
              {m.isHome
                ? `${m.clubName} vs ${m.opponentName}`
                : `${m.opponentName} vs ${m.clubName}`}
            </strong>

            <p className="subtle">
              {new Date(m.playedAt).toLocaleString()}
            </p>
          </div>

          <MatchNarrativeView matchId={m.id} seasonId={seasonId}/>
        </div>
      ))}
    </div>
  </div>

</div>
  );
}

export default MatchesPage;