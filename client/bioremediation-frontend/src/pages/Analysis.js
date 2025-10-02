import React, { useState } from "react";
import { fetchAPI } from "../utils/api.js";
import Loader from "../components/Loader.js";
import microbeGif from "./microbe-running.gif";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Analysis.css";

export default function Analysis() {
  const allowedMicrobes = [
    "Pseudomonas putida",
    "Bacillus subtilis",
    "Pseudomonas sp.",
    "Soil consortium",
    "Mixed soil bacteria",
    "Marine sediment consortium",
    "Aspergillus",
    "Escherichia coli",
  ];

  const allowedPollutants = [
    "Phenol",
    "Naphthalene",
    "Benzo[a]pyrene",
    "Crude oil (hydrocarbons)",
    "LDPE",
    "Copper",
    "Zinc",
    "Lead",
  ];

  const [form, setForm] = useState({
    pollutant: "",
    microbe: "",
    T: 25,
    initialConcentration: 100,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear previous error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!allowedPollutants.includes(form.pollutant)) {
      setError("Pollutant does not exist in allowed list.");
      return;
    }
    if (!allowedMicrobes.includes(form.microbe)) {
      setError("Microbe does not exist in allowed list.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetchAPI("/analysis/analyze", "POST", form, token);
      if (res.results) {
        const roundedResults = res.results.map((r) => ({
          ...r,
          biomass_mg_per_L: Number(r.biomass_mg_per_L.toFixed(2)),
          concentration_mg_per_L: Number(r.concentration_mg_per_L.toFixed(2)),
        }));
        setResults(roundedResults);
      } else alert(res.error || "Analysis failed");
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  // Summary calculations
  const totalDays = results.length > 0 ? results[results.length - 1].day : 0;
  const concentrationRemoved =
    results.length > 0
      ? (
          form.initialConcentration -
          results[results.length - 1].concentration_mg_per_L
        ).toFixed(2)
      : 0;
  const biomassProduced =
    results.length > 0
      ? results[results.length - 1].biomass_mg_per_L.toFixed(2)
      : 0;
  const efficiency =
    form.initialConcentration > 0
      ? ((concentrationRemoved / form.initialConcentration) * 100).toFixed(2)
      : 0;

  const observation =
    results.length > 0
      ? `In ${totalDays} days, the pollutant concentration decreased by ${concentrationRemoved} mg/L, microbial biomass reached ${biomassProduced} mg/L, achieving an efficiency of ${efficiency}%.`
      : "";

  return (
    <div className="analysis-container ">
      {/* Animated Microbe Card */}
      <div className="animation-card">
        <img src={microbeGif} alt="Running Microbe" className="microbe-gif" />
        <h3 className="animation-text">Digital Laboratory Analysis</h3>
      </div>

      <h2 className="analysis-title">Bioremediation Analysis</h2>
      <p className="analysis-subtitle">
        Simulate pollutant degradation and microbial growth over time under
        specified conditions.
      </p>

      <form onSubmit={handleSubmit} className="analysis-form">
        {["pollutant", "microbe"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="form-input"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}
        <input
          type="number"
          name="T"
          placeholder="Temperature (°C)"
          className="form-input"
          value={form.T}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="initialConcentration"
          placeholder="Initial Concentration (mg/L)"
          className="form-input"
          value={form.initialConcentration}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </form>

      {loading && <Loader />}

      {results.length > 0 && (
        <>
          {/* Analysis Summary Card */}
          <div className="card summary-card mb-4">
            <h4>Analysis Summary</h4>
            <div className="summary-details">
              <p>
                <strong>Total Days Required:</strong> {totalDays}
              </p>
              <p>
                <strong>Concentration Removed:</strong> {concentrationRemoved}{" "}
                mg/L
              </p>
              <p>
                <strong>Biomass Produced:</strong> {biomassProduced} mg/L
              </p>
              <p>
                <strong>Efficiency:</strong> {efficiency}%
              </p>
            </div>
            <p className="observation">{observation}</p>
          </div>

          {/* Last Data Card */}
          <div className="card last-data-card mb-4">
            <h5>Last Day Snapshot</h5>
            <div className="summary-details">
              <p>
                <strong>Day:</strong> {totalDays}
              </p>
              <p>
                <strong>Concentration:</strong>{" "}
                {results[results.length - 1].concentration_mg_per_L} mg/L
              </p>
              <p>
                <strong>Biomass:</strong>{" "}
                {results[results.length - 1].biomass_mg_per_L} mg/L
              </p>
            </div>
          </div>

          {/* Graphs */}
          <div className="charts-row">
            <div className="chart-card">
              <h5>Pollutant Concentration over Time</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="concentration_mg_per_L"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h5>Biomass Growth over Time</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="biomass_mg_per_L"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
