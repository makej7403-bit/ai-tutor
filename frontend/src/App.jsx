import React, { useState } from "react";
import "./App.css";

const API_URL = "https://ai-tutor-e5m3.onrender.com";

export default function App() {
  const [subject, setSubject] = useState("Biology");
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
        body: JSON.stringify({ subject: subject.toLowerCase(), question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer received.");
    } catch (err) {
      setAnswer("⚠️ Unable to connect to AI Tutor. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>📘 Subjects</h2>
        {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map((sub) => (
          <button
            key={sub}
            className={subject === sub ? "active" : ""}
            onClick={() => setSubject(sub)}
          >
            {sub}
          </button>
        ))}
      </aside>

      <main className="main-area">
        <header>
          <h1>🧠 FullTask AI Tutor</h1>
          <p>Ask anything about <b>{subject}</b> — AI will answer instantly!</p>
        </header>

        <div className="chat-box">
          <textarea
            placeholder={`Type your ${subject} question here...`}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </div>

        <div className="response">
          {answer ? (
            <div className="ai-response">
              <h3>AI Response:</h3>
              <p>{answer}</p>
            </div>
          ) : (
            <p className="placeholder">Your answer will appear here...</p>
          )}
        </div>

        <footer>
          <p>
            © 2025 FullTask AI Tutor | Powered by Akin S. Sokpah | Backend:{" "}
            <a href={API_URL} target="_blank">{API_URL}</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
