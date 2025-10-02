import React from "react";
import "./Home.css";
import microbeImg from "./microbe-running.gif";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BioTrack</h1>
          <p className="hero-subtitle" style={{ color: "black" }}>
            Monitor and simulate pollutant bioremediation using microbial
            kinetics
          </p>
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/analysis")}
          >
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src={microbeImg} alt="Running Microbe" />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2 style={{ color: "white", fontWeight: "bold" }}>About BioTrack</h2>
        <p>
          BioTrack is a digital laboratory platform that enables researchers,
          students, and environmental enthusiasts to track pollutant degradation
          and microbial growth in various environmental scenarios. Using real
          microbial kinetics data, our system simulates bioremediation
          efficiency over time.
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 style={{ color: "white", fontWeight: "bold" }}>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Digital Simulations</h3>
            <p style={{ color: "black" }}>
              Run analysis for pollutants and microbes and visualize degradation
              and growth over time.
            </p>
          </div>
          <div className="feature-card">
            <h3>Interactive Graphs</h3>
            <p style={{ color: "black" }}>
              See real-time changes in pollutant concentration and microbial
              biomass using charts.
            </p>
          </div>
          <div className="feature-card">
            <h3>User Profiles Description</h3>
            <p style={{ color: "black" }}>
              Personalize your experiments, save results, and track your
              progress.
            </p>
          </div>
          <div className="feature-card">
            <h3>Quick Analysis Result</h3>
            <p style={{ color: "black" }}>
              Start a new bioremediation analysis instantly with preloaded
              microbes and pollutants.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages-section">
        <h2 style={{ color: "white", fontWeight: "bold" }}>
          Why Choose BioTrack?
        </h2>
        <br />
        <ol className="advantages-list" style={{ color: "white" }}>
          <li>Realistic microbial kinetics modeling</li>
          <li>Easy-to-use interactive interface</li>
          <li>Visual and quantitative analysis</li>
          <li>Ideal for students, researchers, and environmental monitoring</li>
        </ol>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2 style={{ color: "white" }}>Ready to Start Your Analysis?</h2>
        <button
          className="btn-primary"
          onClick={() => (window.location.href = "/analysis")}
        >
          Run Analysis Now
        </button>
      </section>
    </div>
  );
}
