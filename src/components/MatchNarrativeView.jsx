import { useEffect, useState } from "react";
import api from "../api/api";

function MatchNarrativeView({ seasonId, matchId }) {
  const [narrative, setNarrative] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    api.get(`/v1/seasons/${seasonId}/matches/${matchId}/narrative`)
      .then((res) => setNarrative(res.data))
      .catch(() => setNarrative(null));
  }, [matchId]);

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide Narrative" : "Show Narrative"}
      </button>

      {show && (
        <div className="card" style={{ marginTop: "10px", background: "#2a2a40" }}>
          {narrative && narrative.narrative ? (
            <p className="narrative-text">
              {narrative.narrative}
            </p>
          ) : (
            <p className="subtle">Narrative unavailable</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MatchNarrativeView;