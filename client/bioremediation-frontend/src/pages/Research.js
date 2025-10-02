import React, { useState } from "react";
import { fetchAPI } from "../utils/api";

export default function Research() {
  const [form, setForm] = useState({
    pollutant: "",
    microbe: "",
    tref_C: 25,
    half_life_days: 1,
    q10: 2,
    ki_mg_per_L: 100,
    lag_time_days: 0,
    biomass_X_mg_per_L: 50,
    q_max_day: 1,
    k_s_mg_per_L: 50,
    source: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const pollutants = [
    "Phenol",
    "Naphthalene",
    "Benzo[a]pyrene",
    "Crude oil (hydrocarbons)",
    "LDPE",
    "Copper",
    "Zinc",
    "Lead",
  ];

  const microbes = [
    "Pseudomonas putida",
    "Bacillus subtilis",
    "Pseudomonas sp.",
    "Soil consortium",
    "Mixed soil bacteria",
    "Marine sediment consortium",
    "Aspergillus",
    "Escherichia coli",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const res = await fetchAPI("/research/submit", "POST", form, token);

    setLoading(false);
    if (res._id) {
      setMessage("✅ Research submitted successfully!");
    } else {
      setMessage(`❌ ${res.error || "Submission failed"}`);
    }
  };

  return (
    <div className="container col-md-6 mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-3 text-center">📑 Submit Research</h3>
        <form onSubmit={handleSubmit}>
          {/* Pollutant Dropdown */}
          <label className="form-label">Pollutant</label>
          <select
            name="pollutant"
            className="form-select mb-3 "
            style={{ color: "black" }}
            value={form.pollutant}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Pollutant --</option>
            {pollutants.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Microbe Dropdown */}
          <label className="form-label">Microbe</label>
          <select
            name="microbe"
            className="form-select mb-3"
            style={{ color: "black" }}
            value={form.microbe}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Microbe --</option>
            {microbes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Numeric Inputs */}
          <label className="form-label">Reference Temperature (°C)</label>
          <input
            type="number"
            name="tref_C"
            className="form-control mb-3"
            value={form.tref_C}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Half Life (days)</label>
          <input
            type="number"
            name="half_life_days"
            className="form-control mb-3"
            value={form.half_life_days}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Q10 Value</label>
          <input
            type="number"
            name="q10"
            className="form-control mb-3"
            value={form.q10}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Ki (mg/L)</label>
          <input
            type="number"
            name="ki_mg_per_L"
            className="form-control mb-3"
            value={form.ki_mg_per_L}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Lag Time (days)</label>
          <input
            type="number"
            name="lag_time_days"
            className="form-control mb-3"
            value={form.lag_time_days}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Biomass X (mg/L)</label>
          <input
            type="number"
            name="biomass_X_mg_per_L"
            className="form-control mb-3"
            value={form.biomass_X_mg_per_L}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">q_max (day⁻¹)</label>
          <input
            type="number"
            name="q_max_day"
            className="form-control mb-3"
            value={form.q_max_day}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Ks (mg/L)</label>
          <input
            type="number"
            name="k_s_mg_per_L"
            className="form-control mb-3"
            value={form.k_s_mg_per_L}
            step="0.01"
            onChange={handleChange}
            required
          />

          <label className="form-label">Source</label>
          <input
            type="text"
            name="source"
            className="form-control mb-3"
            value={form.source}
            onChange={handleChange}
            placeholder="Research source / citation"
          />

          {/* Submit Button */}
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`alert mt-3 ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
