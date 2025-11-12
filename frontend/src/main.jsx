import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7cAN-mrE2PvmlQ11zLKAdHBhN7nUFjHw",
  authDomain: "fir-u-c-students-web.firebaseapp.com",
  databaseURL: "https://fir-u-c-students-web-default-rtdb.firebaseio.com",
  projectId: "fir-u-c-students-web",
  storageBucket: "fir-u-c-students-web.firebasestorage.app",
  messagingSenderId: "113569186739",
  appId: "1:113569186739:web:d8daf21059f43a79e841c6"
};

initializeApp(firebaseConfig);

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    synth.speak(utter);
  };

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("https://ai-tutor-e5m3.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      let answer = data.answer || "⚠️ Unable to connect to AI Tutor.";

      // Custom ownership response
      if (question.toLowerCase().includes("who created you")) {
        answer = "I was created by Akin S. Sokpah from Liberia, in 2025.";
      }

      setResponse(answer);
      speak(answer);
    } catch (err) {
      setResponse("⚠️ Network error, please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-black text-white flex flex-col items-center justify-center font-sans p-4">
      <h1 className="text-4xl font-bold mb-4">🧠 FullTask AI Tutor</h1>
      <p className="mb-6 text-lg text-gray-300 text-center">
        Ask anything — AI will read the answer aloud!
      </p>

      <div className="bg-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me about Biology, Chemistry, Physics..."
          className="w-full p-3 rounded-lg text-black focus:ring-2 focus:ring-indigo-400 outline-none mb-3"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl w-full font-bold"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <div className="mt-5 bg-white/10 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">AI Response:</h2>
          <p className="text-gray-200 whitespace-pre-line">{response}</p>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-400 text-center">
        © 2025 FullTask AI Tutor | Powered by <b>Akin S. Sokpah</b> |
        Backend: <a href="https://ai-tutor-e5m3.onrender.com" className="text-indigo-400 hover:underline">ai-tutor-e5m3.onrender.com</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
