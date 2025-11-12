import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { firebaseConfig } from "./firebase";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("Ask anything about Biology — AI will answer instantly!");

  // Fake AI handler (connect to your backend later)
  const askAI = async () => {
    if (!question.trim()) return;

    setResponse("Thinking...");

    try {
      // Optional: Save to Firebase
      await push(ref(db, "questions"), {
        subject,
        question,
        createdAt: Date.now(),
      });

      // Mock AI reply
      const reply = `This is an educational explanation about "${question}" in ${subject}.`;
      setResponse(reply);
      speak(reply);
    } catch (err) {
      setResponse("⚠️ Unable to connect to AI Tutor. Try again later.");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleCreatorQuestion = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("who created") || lower.includes("your creator")) {
      setResponse("👨‍💻 This AI Tutor was created by Akin S. Sokpah from Liberia.");
      speak("This AI Tutor was created by Akin S. Sokpah from Liberia.");
      return true;
    }
    return false;
  };

  const handleAsk = () => {
    if (handleCreatorQuestion(question)) return;
    askAI();
  };

  return (
    <div className="flex flex-col items-center text-center p-8 space-y-8">
      <h1 className="text-4xl font-bold">🧠 FullTask AI Tutor</h1>
      <p className="text-gray-300">Select a subject and ask your AI tutor anything!</p>

      <div className="flex flex-wrap justify-center gap-3">
        {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map((sub) => (
          <button
            key={sub}
            onClick={() => setSubject(sub)}
            className={`px-4 py-2 rounded-full ${
              subject === sub ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-xl mb-2">Ask anything about {subject}</h2>
        <input
          type="text"
          placeholder="Type your question here..."
          className="w-full p-3 rounded-lg text-black"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleAsk}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
        >
          Ask AI
        </button>
      </div>

      <div className="max-w-lg w-full p-4 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
        <p className="text-gray-200">{response}</p>
      </div>

      <footer className="text-gray-500 mt-10 text-sm">
        © 2025 FullTask AI Tutor | Powered by Akin S. Sokpah | Backend:{" "}
        <a href="https://ai-tutor-e5m3.onrender.com" className="text-blue-400 hover:underline">
          ai-tutor-e5m3.onrender.com
        </a>
      </footer>
    </div>
  );
}
