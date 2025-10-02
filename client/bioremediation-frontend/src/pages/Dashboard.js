import React, { useState, useEffect } from "react";
import { fetchAPI } from "../utils/api";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // we'll define styles here

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetchAPI("/analysis/history", "GET", null, token);
        setHistory(res);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  if (loading) return <Loader />;

  return (
    <div
      className="dashboard-container"
      style={{ minHeight: "77vh", padding: "2rem" }}
    >
      <h2 className="dashboard-title">Analysis History</h2>
      {history.length === 0 ? (
        <p className="no-history">No analysis done yet.</p>
      ) : (
        <div className="history-grid">
          {history.map((h) => (
            <div
              key={h._id}
              className="history-card"
              onClick={() => navigate(`/analysis`)}
            >
              <h4>{h.pollutant}</h4>
              <p>
                <strong>Microbe:</strong> {h.microbe}
              </p>
              <p>
                <strong>Temperature:</strong> {h.T} °C
              </p>
              <p>
                <strong>Initial Conc:</strong> {h.initialConcentration} mg/L
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
