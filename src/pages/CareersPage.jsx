import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AddCareerForm from "../components/AddCareerForm";

function CareersPage() {
  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();

  const fetchCareers = async () => {
    try {
      const res = await api.get("/v1/careers");
      setCareers(res.data);
    } catch {
      alert("Failed to fetch careers");
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div className="page">
      <h2>Careers</h2>

      {/* Create Career Form */}
      <AddCareerForm onCareerAdded={fetchCareers} />

      <div className="list">
        {careers.map((c) => (
          <div key={c.id} className="card career-row">

            <div className="career-left">
              <h3>{c.name}</h3>

              <p className="subtle">
                Club: <strong>{c.clubName}</strong>
              </p>

              <p className="subtle">
                Manager: <strong>{c.managerName}</strong>
              </p>

              <p className="subtle">
                Created:{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="career-right">
              <button
                onClick={() =>
                  navigate(`/careers/${c.id}/seasons`)
                }
              >
                View Seasons →
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CareersPage;