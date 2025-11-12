import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Typing animation
  useEffect(() => {
    if (!answer) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(answer.slice(0, i));
      i++;
      if (i > answer.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [answer]);

  const handleAskAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");
    setDisplayed("");

    try {
      const res = await fetch("https://ai-tutor-e5m3.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, subject }),
      });

      const data = await res.json();
      const aiText =
        data.answer ||
        data.response ||
        data.message ||
        data.output ||
        "⚠️ No response from AI.";

      setAnswer(aiText);
      setHistory((prev) => [
        ...prev,
        { q: question, a: aiText, time: new Date().toLocaleTimeString() },
      ]);
    } catch {
      setError("⚠️ Error connecting to AI Tutor. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-5 border-b border-purple-800">
        <div>
          <h1 className="text-2xl font-bold">🧠 FullTask AI Tutor</h1>
          <p className="text-purple-300 text-sm">
            Biology • Chemistry • Nursing • Physics • Math • English
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(true)}
            className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-lg shadow"
            title="View Saved History"
          >
            📘
          </button>
          <span className="text-sm text-gray-300">
            Profile: <b>Akin Saye Sokpah</b>
          </span>
          <button className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-lg">
            Sign out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-3">
          🧠 Ask anything about{" "}
          <span className="text-purple-400">{subject}</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map(
            (sub) => (
              <button
                key={sub}
                onClick={() => setSubject(sub)}
                className={`px-3 py-1 rounded-full ${
                  subject === sub ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {sub}
              </button>
            )
          )}
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={`Ask your ${subject} question...`}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-600"
          rows={3}
        />

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          <button
            onClick={() => {
              if (answer) {
                const speak = new SpeechSynthesisUtterance(answer);
                speak.lang = "en-US";
                window.speechSynthesis.speak(speak);
              }
            }}
            className="text-purple-400 hover:text-purple-300"
          >
            🔊 Read aloud
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">
            AI Response:
          </h3>
          <div className="bg-gray-900/70 p-4 rounded-lg min-h-[100px] text-gray-200">
            {error ? error : displayed || "Ask a question to begin..."}
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400 mt-10 pb-6">
        FullTask AI Tutor — created by{" "}
        <strong>Akin S. Sokpah (Liberia)</strong>.
      </footer>

      {/* 📘 HISTORY SIDEBAR */}
      {showHistory && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-950 border-l border-purple-700 p-5 z-50">
          <h3 className="text-lg font-semibold text-purple-400 mb-3">
            📘 Saved History
          </h3>
          {history.length === 0 ? (
            <p className="text-gray-400">No history yet.</p>
          ) : (
            history.map((h, i) => (
              <div
                key={i}
                className="mb-3 bg-gray-900/70 p-2 rounded-lg border border-gray-800"
              >
                <p className="text-purple-300 text-sm">Q: {h.q}</p>
                <p className="text-gray-200 text-sm mt-1">A: {h.a}</p>
              </div>
            ))
          )}
          <button
            onClick={() => setShowHistory(false)}
            className="mt-4 bg-purple-700 hover:bg-purple-800 w-full py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
