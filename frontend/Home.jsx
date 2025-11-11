import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicroscope, FaFlask, FaHeartbeat } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="nav">
        <h2>🧬 FullTask AI Nursing Tutor</h2>
        <button onClick={() => navigate("/auth")}>Login / Start</button>
      </nav>

      <header className="hero">
        <h1>Empowering Future Nurses with AI</h1>
        <p>
          Learn Biology, Chemistry, and Nursing Concepts 24/7 with your personal AI tutor.
          Get instant answers, explanations, and voice-read support.
        </p>
        <button className="start-btn" onClick={() => navigate("/auth")}>
          🚀 Start Learning Now
        </button>
      </header>

      <section className="subjects">
        <div className="subject-card">
          <FaMicroscope size={40} />
          <h3>Biology</h3>
          <p>Master human anatomy and life science with detailed AI explanations.</p>
        </div>
        <div className="subject-card">
          <FaFlask size={40} />
          <h3>Chemistry</h3>
          <p>Understand chemical reactions and nursing-related biochemistry.</p>
        </div>
        <div className="subject-card">
          <FaHeartbeat size={40} />
          <h3>Nursing Practice</h3>
          <p>Learn patient care, pharmacology, and clinical decision-making.</p>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} FullTask AI by Akin S. Sokpah — All Rights Reserved.</p>
      </footer>
    </div>
  );
}
