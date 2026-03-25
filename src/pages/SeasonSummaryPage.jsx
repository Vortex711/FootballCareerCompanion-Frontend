import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import BackButton from "../components/BackButton";

function SeasonSummaryPage() {
  const { seasonId } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get(`/v1/seasons/${seasonId}/narrative`)
      .then(res => setSummary(res.data))
      .catch(() => setSummary(null));
  }, [seasonId]);

  return (
    <div className="page">
      <BackButton />
      <h2>Season Summary</h2>

      <div className="card" style={{ marginTop: "20px" }}>
        {summary && summary.narrative ? (
          <p className="narrative-text">
            {summary.narrative}
          </p>
        ) : (
          <p className="subtle">Summary unavailable</p>
        )}
      </div>
    </div>
  );
}

export default SeasonSummaryPage;