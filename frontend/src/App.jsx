import React, { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_BASE || "https://ai-tutor-e5m3.onrender.com";

export default function App() {
  const [subject, setSubject] = useState("biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question }),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      setAnswer(data.answer || "No answer received");
    } catch (err) {
      setAnswer("⚠️ Error connecting to AI tutor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🧠 FullTask AI Tutor</h1>
        <nav>
          <button onClick={() => setSubject("biology")}>Biology</button>
          <button onClick={() => setSubject("chemistry")}>Chemistry</button>
          <button onClick={() => setSubject("nursing")}>Nursing</button>
        </nav>
      </header>

      <main>
        <h2>{subject.toUpperCase()} Tutor</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={`Ask any ${subject} question...`}
        />
        <button onClick={askAI} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        {answer && <div className="answer-box">{answer}</div>}
      </main>

      <footer>Powered by FullTask AI | © 2025</footer>
    </div>
  );
}
