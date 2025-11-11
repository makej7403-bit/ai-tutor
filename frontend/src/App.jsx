import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Notes from "./components/Notes";
import Calculator from "./components/Calculator";
import Planner from "./components/Planner";
import { speak, recordSpeech } from "./components/SpeechTools";

const BACKEND_URL = "https://ai-tutor-e5m3.onrender.com/api/ask";

export default function App() {
  const subjects = ["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"];
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [view, setView] = useState("Tutor");

  const askAI = async () => {
    setAnswer("⏳ Thinking...");
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, subject }),
      });
      const data = await res.json();
      setAnswer(data.answer || "⚠️ Unable to connect to AI Tutor.");
      speak(data.answer);
    } catch {
      setAnswer("⚠️ Unable to connect to AI Tutor.");
    }
  };

  return (
    <div>
      <Navbar current={view} setCurrent={setView} />
      <div className="p-5 text-center">
        {view === "Tutor" && (
          <>
            <h1 className="text-2xl font-bold mb-3 text-blue-700">📘 FullTask AI Tutor</h1>
            <p>Ask anything — AI will answer instantly!</p>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-2 rounded mt-3"
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <div className="mt-3">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask about ${subject}...`}
                className="border p-2 rounded w-3/4"
              />
              <button onClick={askAI} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">
                Ask AI
              </button>
            </div>
            <p className="mt-4 p-3 bg-gray-100 rounded">{answer}</p>
          </>
        )}

        {view === "Flashcards" && <Flashcards subject={subject} />}
        {view === "Quiz" && <Quiz subject={subject} />}
        {view === "Notes" && <Notes />}
        {view === "Calculator" && <Calculator />}
        {view === "Planner" && <Planner />}
      </div>

      <footer className="mt-6 text-sm text-gray-600 text-center">
        © 2025 FullTask AI Tutor | Powered by Akin S. Sokpah | Backend:{" "}
        <a href="https://ai-tutor-e5m3.onrender.com" className="text-blue-600 underline">
          ai-tutor-e5m3.onrender.com
        </a>
      </footer>
    </div>
  );
}
