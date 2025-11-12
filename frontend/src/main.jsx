import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Firebase setup
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC7cAN-mrE2PvmlQ11zLKAdHBhN7nUFjHw",
  authDomain: "fir-u-c-students-web.firebaseapp.com",
  databaseURL: "https://fir-u-c-students-web-default-rtdb.firebaseio.com",
  projectId: "fir-u-c-students-web",
  storageBucket: "fir-u-c-students-web.firebasestorage.app",
  messagingSenderId: "113569186739",
  appId: "1:113569186739:web:d8daf21059f43a79e841c6",
};
initializeApp(firebaseConfig);

const App = () => {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

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
        setError("⚠️ No valid response from AI.");
      }
    } catch (err) {
      setError("⚠️ Error connecting to AI Tutor. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-5 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">🧠 FullTask AI Tutor</h1>
        <p className="mt-2 text-purple-300">
          Biology • Chemistry • Nursing • Physics • Math • English
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-300">
            <strong>Profile:</strong> Akin Saye Sokpah
          </p>
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto bg-gray-800/60 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">
          🧠 Ask anything about <span className="text-purple-400">{subject}</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map((sub) => (
            <button
              key={sub}
              className={`px-3 py-1 rounded-full text-sm ${
                subject === sub
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
              onClick={() => setSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Ask your ${subject} question...`}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
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
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-400">AI Response:</h3>
          <div className="mt-2 bg-gray-900 p-4 rounded-lg min-h-[80px]">
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <p className="text-gray-200 whitespace-pre-wrap">
                {answer || "Ask something to get started!"}
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center mt-6 text-sm text-gray-400">
        FullTask AI Tutor — created by <strong>Akin S. Sokpah (Liberia)</strong>.
      </footer>

      {/* 📘 Sidebar History */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full shadow-lg"
      >
        📘 History
      </button>

      {showHistory && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-900/95 shadow-lg p-5 overflow-y-auto z-50 border-l border-purple-600">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">📘 Saved History</h3>
          {history.length === 0 ? (
            <p className="text-gray-400">No history yet — ask and it will be saved.</p>
          ) : (
            history.map((h, i) => (
              <div key={i} className="mb-3 border-b border-gray-700 pb-2">
                <p className="text-purple-300">Q: {h.q}</p>
                <p className="text-gray-300 mt-1">A: {h.a}</p>
                <p className="text-xs text-gray-500 mt-1">🕒 {h.time}</p>
              </div>
            ))
          )}
          <button
            onClick={() => setShowHistory(false)}
            className="mt-5 bg-purple-700 hover:bg-purple-800 text-white w-full py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
