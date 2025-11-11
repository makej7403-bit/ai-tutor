import React, { useState } from "react";
import Flashcards from "./components/Flashcards";

export default function App() {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    try {
      const res = await fetch("https://ai-tutor-e5m3.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "⚠️ No response received from AI.");
    } catch (err) {
      setAnswer("⚠️ Unable to connect to AI Tutor. Try again later.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-center mb-4">📘 FullTask AI Tutor</h1>
      <p className="text-center text-gray-500 mb-6">Select a subject and ask your AI tutor anything!</p>

      <div className="flex justify-center mb-4 gap-2 flex-wrap">
        {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map((subj) => (
          <button
            key={subj}
            onClick={() => setSubject(subj)}
            className={`px-4 py-2 rounded-lg ${
              subject === subj ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-3 text-center">🧠 Ask anything about {subject}</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          rows="3"
          placeholder={`Ask your ${subject} question here...`}
        />
        <button onClick={askAI} className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Ask AI
        </button>

        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold">AI Response:</h3>
          <p>{answer || "No response yet."}</p>
        </div>
      </div>

      <div className="mt-8">
        <Flashcards subject={subject} />
      </div>

      <footer className="text-center mt-10 text-gray-500 text-sm">
        © 2025 FullTask AI Tutor | Powered by Akin S. Sokpah | Backend:{" "}
        <a href="https://ai-tutor-e5m3.onrender.com" className="text-blue-500">
          ai-tutor-e5m3.onrender.com
        </a>
      </footer>
    </div>
  );
}
