import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayed, setDisplayed] = useState(""); // for typing effect
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");

  // Typing animation
  useEffect(() => {
    if (!answer) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(answer.slice(0, i));
      i++;
      if (i > answer.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
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

      if (data.answer) {
        setAnswer(data.answer);
        setHistory((prev) => [
          ...prev,
          { q: question, a: data.answer, time: new Date().toLocaleTimeString() },
        ]);
      } else {
        setError("⚠️ No response from AI.");
      }
    } catch (err) {
      setError("⚠️ Error connecting to AI Tutor. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-800 text-white font-sans p-5">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">🧠 FullTask AI Tutor</h1>
        <p className="text-purple-300 mt-2">
          Biology • Chemistry • Nursing • Physics • Math • English
        </p>
        <div className="flex justify-between items-center mt-4 max-w-3xl mx-auto">
          <p className="text-sm text-gray-300">
            <strong>Profile:</strong> Akin Saye Sokpah
          </p>
          <button className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto bg-gray-900/70 p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold mb-3">
          🧠 Ask anything about <span className="text-purple-400">{subject}</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map((sub) => (
            <button
              key={sub}
              onClick={() => setSubject(sub)}
              className={`px-3 py-1 rounded-full ${
                subject === sub ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {sub}
            </button>
          ))}
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
                const utterance = new SpeechSynthesisUtterance(answer);
                utterance.lang = "en-US";
                window.speechSynthesis.speak(utterance);
              }
            }}
            className="text-purple-400 hover:text-purple-300"
          >
            🔊 Read aloud
          </button>
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-semibold text-purple-400">AI Response:</h3>
          <div className="mt-2 bg-gray-800 p-4 rounded-lg min-h-[80px]">
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <p className="text-gray-200 whitespace-pre-wrap">
                {displayed || "Ask a question to begin..."}
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center mt-6 text-sm text-gray-400">
        FullTask AI Tutor — created by <strong>Akin S. Sokpah (Liberia)</strong>.
      </footer>

      {/* 📘 Floating History Button */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full shadow-lg"
      >
        📘 History
      </button>

      {showHistory && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-950/95 border-l border-purple-700 p-5 z-50">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">📘 Saved History</h3>
          {history.length === 0 ? (
            <p className="text-gray-400">No history yet.</p>
          ) : (
            history.map((h, i) => (
              <div key={i} className="mb-3 border-b border-gray-800 pb-2">
                <p className="text-purple-300">Q: {h.q}</p>
                <p className="text-gray-300 mt-1">A: {h.a}</p>
              </div>
            ))
          )}
          <button
            onClick={() => setShowHistory(false)}
            className="mt-4 bg-purple-700 w-full py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
