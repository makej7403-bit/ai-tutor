import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaDna, FaFlask, FaHeartbeat } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* 🌟 Hero Section */}
      <div className="hero">
        <h1 className="title">
          Welcome to <span className="highlight">FullTask AI</span>
        </h1>
        <p className="subtitle">
          Your all-in-one <b>AI Tutor</b> for Biology, Chemistry, and Nursing.
          Learn, explore, and excel with smart explanations, read-aloud lessons,
          and interactive guidance — all powered by AI.
        </p>

        <div className="hero-icons">
          <FaDna className="hero-icon" title="Biology" />
          <FaFlask className="hero-icon" title="Chemistry" />
          <FaHeartbeat className="hero-icon" title="Nursing" />
          <FaBrain className="hero-icon" title="AI Tutor" />
        </div>

        <button className="btn-get-started" onClick={() => navigate("/dashboard")}>
          🚀 Get Started
        </button>
      </div>

      {/* 💡 Info Section */}
      <div className="info-section">
        <h2>Why Choose FullTask AI?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>🎓 Smart Tutoring</h3>
            <p>Get instant, clear answers to your science questions anytime.</p>
          </div>
          <div className="info-card">
            <h3>🔊 Read Aloud</h3>
            <p>Let the AI read complex lessons out loud in a human-like voice.</p>
          </div>
          <div className="info-card">
            <h3>🧠 Advanced AI</h3>
            <p>Powered by GPT technology and Firebase login for personalization.</p>
          </div>
          <div className="info-card">
            <h3>☁️ Accessible Anywhere</h3>
            <p>Study from any device, anytime — cloud-hosted and always online.</p>
          </div>
        </div>
      </div>

      {/* 👣 Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} FullTask AI | Created by <b>Akin S. Sokpah</b>
        </p>
      </footer>
    </div>
  );
}
