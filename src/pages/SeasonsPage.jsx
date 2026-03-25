import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function SeasonsPage() {
  const { careerId } = useParams();
  const [seasons, setSeasons] = useState([]);

  const [generating, setGenerating] = useState();

  const navigate = useNavigate();

  const generateSummary = async (seasonId) => {
    if (generating) return;

    setGenerating(true);

    try {
        await api.post(`/v1/seasons/${seasonId}/narrative`);
        navigate(`/seasons/${seasonId}/summary`);
    } catch {
        alert("Failed to generate summary");
    } finally {
        setGenerating(false);
    }
  }

  const endSeason = async (seasonId) => {
    try {
        await api.post(`/v1/seasons/${seasonId}/end`);
    } catch (err) {
        alert(err);
    } finally {
        fetchSeasons();
    }
  }

  const fetchSeasons = async () => {
    await api.get(`/v1/careers/${careerId}/seasons`)
      .then(res => setSeasons(res.data))
      .catch(() => alert("Failed to fetch seasons"));
  }

  useEffect(() => {
    fetchSeasons();
  }, [careerId]);

  return (
    <div className="page">
      <h2>Seasons</h2>

      <div className="list">
        {seasons.map(s => (
          <div key={s.id} className="card season-card">

            <div className="season-header">
                <h3>{s.name}</h3>
                {s.leaguePosition !== null && s.leaguePosition !== undefined && (
                <span className="badge">#{s.leaguePosition}</span>
                )}
            </div>

            <p className="subtle">
                Board Expectation: <strong>{s.boardExpectation}</strong>
            </p>

            <p className="subtle">
                {s.startDate && new Date(s.startDate).toLocaleDateString()} 
                {" - "}
                {s.endDate ? new Date(s.endDate).toLocaleDateString() : "Ongoing"}
            </p>

            <div className="button-row">
                <button onClick={() => navigate(`/seasons/${s.id}/matches`)}>
                    View Matches
                </button>

                <button onClick={() => generateSummary(s.id)} disabled={generating}>
                    {generating ? "Generating..." : "Generate Summary"}
                </button>
                
                {!s.endDate && (
                    <button onClick={() => endSeason(s.id)}>End season</button>
                )}
                
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default SeasonsPage;