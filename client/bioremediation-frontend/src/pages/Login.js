import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetchAPI("/auth/login", "POST", form);
    setLoading(false);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/dashboard");
    } else {
      setError(res.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      {/* Animated background elements */}
      <div className="animation-background">
        {/* DNA Strands */}
        <div className="dna-strand"></div>
        <div className="dna-strand"></div>
        <div className="dna-strand"></div>
        <div className="dna-strand"></div>
        <div className="dna-strand"></div>

        {/* Microbes */}
        <div className="microbe"></div>
        <div className="microbe"></div>
        <div className="microbe"></div>
        <div className="microbe"></div>
        <div className="microbe"></div>
        <div className="microbe"></div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #3bbfbb, #2a9df4)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(59, 191, 187, 0.5)",
                marginRight: "12px",
              }}
            >
              <span style={{ fontSize: "24px" }}>🧬</span>
            </div>
            <h2 className="mb-0" style={{ color: "#fff", fontWeight: "700" }}>
              BioTrack
            </h2>
          </div>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>
            Access your bioremediation dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="alert alert-danger d-flex align-items-center"
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.2)",
              border: "1px solid rgba(220, 38, 38, 0.4)",
              borderRadius: "8px",
              color: "#fca5a5",
              fontSize: "0.9rem",
            }}
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="form-control"
              onChange={handleChange}
              value={form.email}
              required
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(59, 191, 187, 0.3)",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.borderColor = "#3bbfbb";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 191, 187, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(59, 191, 187, 0.3)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="form-control"
              onChange={handleChange}
              value={form.password}
              required
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(59, 191, 187, 0.3)",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.borderColor = "#3bbfbb";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 191, 187, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(59, 191, 187, 0.3)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              background: loading
                ? "rgba(59, 191, 187, 0.5)"
                : "linear-gradient(135deg, #3bbfbb, #2a9df4)",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading
                ? "none"
                : "0 4px 15px rgba(59, 191, 187, 0.4)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(59, 191, 187, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(59, 191, 187, 0.4)";
              }
            }}
          >
            {loading ? (
              <span className="d-flex align-items-center justify-content-center">
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-4">
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          ></div>
          <span
            style={{
              padding: "0 12px",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.85rem",
            }}
          >
            OR
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          ></div>
        </div>

        {/* Sign Up Link */}
        <p
          className="text-center mb-0"
          style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#3bbfbb",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#6bc4e5";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#3bbfbb";
              e.target.style.textDecoration = "none";
            }}
          >
            Sign up here
          </a>
        </p>

        {/* Footer */}
        <div
          className="text-center mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.8rem",
              margin: 0,
            }}
          >
            Secure login powered by BioTrack
          </p>
        </div>
      </div>
    </div>
  );
}
