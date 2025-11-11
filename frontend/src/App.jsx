import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat";
import Quiz from "./components/Quiz";
import Flashcards from "./components/Flashcards";
import ProgressWidget from "./components/ProgressWidget";
import AdminPanel from "./components/AdminPanel";
import AuthWidget from "./components/AuthWidget";

export default function App() {
  return (
    <div className="app-grid">
      <aside className="sidebar">
        <h2>📘 Subjects</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/flashcards">Flashcards</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <AuthWidget />
        <ProgressWidget />
      </aside>

      <main className="main">
        <header>
          <h1>🧠 FullTask AI Tutor</h1>
        </header>

        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <footer className="footer">
          © 2025 FullTask AI Tutor | <a href="https://ai-tutor-e5m3.onrender.com" target="_blank">Backend</a>
        </footer>
      </main>
    </div>
  );
}
