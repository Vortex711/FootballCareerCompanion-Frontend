import { useState } from "react";
import api from "../api/api";

function AddMatchForm({ seasonId, onMatchAdded }) {
    const [competitionName, setCompetitionName] = useState("");
    const [opponentName, setOpponentName] = useState("");
    const [isHome, setIsHome] = useState(true);
    const [teamGoals, setTeamGoals] = useState(0);
    const [opponentGoals, setOpponentGoals] = useState(0);
    const [leaguePositionAfter, setLeaguePositionAfter] = useState(null);
    const [playedAt, setPlayedAt] = useState("");
    const [goalEvents, setGoalEvents] = useState([]);
    
    const [loading, setLoading] = useState(false);

    const addGoalEvent = () => {
        setGoalEvents([...goalEvents, {playerName: "", minute: ""}])
    }

    const updateGoalEvent = (index, field, value) => {
        const updated = [...goalEvents];
        updated[index][field] = value;
        setGoalEvents(updated);
    }

    const handleSubmit = async () => {
        if (loading)
            return; 

        setLoading(true);

        try {
            const response = await api.post(`/v1/seasons/${seasonId}/matches`, {
                seasonId,
                competitionName,
                opponentName,
                isHome,
                teamGoals: Number(teamGoals),
                opponentGoals: Number(opponentGoals),
                leaguePositionAfter,
                playedAt: new Date(playedAt).toISOString(),
                goalEvents: goalEvents.length > 0
                    ? goalEvents.map(g => ({
                        playerName: g.playerName,
                        minute: g.minute ? Number(g.minute) : null,
                        }))
                    : null,
            });
            onMatchAdded();
        } catch (err) {
            console.log(err);
            alert("Failed to add match");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">

            <div className="form-card">

                {/* Row 1 */}
                <div className="form-row">
                <input placeholder="Competition" onChange={(e) => setCompetitionName(e.target.value)} />
                <input placeholder="Opponent" onChange={(e) => setOpponentName(e.target.value)} />
                </div>

                {/* Checkbox */}
                <div className="checkbox-row">
                <label>
                    <input
                    type="checkbox"
                    checked={isHome}
                    onChange={(e) => setIsHome(e.target.checked)}
                    />
                    Home
                </label>
                </div>

                {/* Goals Row */}
                <div className="form-row">
                <input type="number" placeholder="Your Goals" onChange={(e) => setTeamGoals(e.target.value)} />
                <input type="number" placeholder="Opponent Goals" onChange={(e) => setOpponentGoals(e.target.value)} />
                </div>

                {/* Position + Date */}
                <div className="form-row">
                <input type="number" placeholder="League Position After" onChange={(e) => setLeaguePositionAfter(e.target.value)} />
                <input type="datetime-local" onChange={(e) => setPlayedAt(e.target.value)} />
                </div>

                {/* Goals Section */}
                <div className="goals-section">
                <h4>Goals</h4>

                <button onClick={addGoalEvent}>Add Goal</button>

                {goalEvents.map((g, index) => (
                    <div key={index} className="form-row">
                    <input
                        placeholder="Player Name"
                        onChange={(e) => updateGoalEvent(index, "playerName", e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Minute"
                        onChange={(e) => updateGoalEvent(index, "minute", e.target.value)}
                    />
                    </div>
                ))}
                </div>

                {/* Submit */}
                <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Match"}
                </button>

            </div>
        </div>
    );
}

export default AddMatchForm;
