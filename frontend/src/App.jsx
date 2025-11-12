import React, { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC7cAN-mrE2PvmlQ11zLKAdHBhN7nUFjHw",
  authDomain: "fir-u-c-students-web.firebaseapp.com",
  databaseURL: "https://fir-u-c-students-web-default-rtdb.firebaseio.com",
  projectId: "fir-u-c-students-web",
  storageBucket: "fir-u-c-students-web.firebasestorage.app",
  messagingSenderId: "113569186739",
  appId: "1:113569186739:web:d8daf21059f43a79e841c6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const App = () => {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const askTutor = async () => {
    if (question.trim() === "") return;
    if (question.toLowerCase().includes("who created you")) {
      setResponse("I was created by Akin S. Sokpah from Liberia.");
      speak("I was created by Akin S. Sokpah from Liberia.");
      return;
    }

    setResponse("Thinking...");
    try {
      const res = await fetch(`https://ai-tutor-e5m3.onrender.com/api/ask?subject=${subject}&q=${encodeURIComponent(question)}`);
      const data = await res.json();
      setResponse(data.answer || "⚠️ Unable to connect to AI Tutor.");
      speak(data.answer || "Unable to connect to AI Tutor.");
    } catch (err) {
      setResponse("⚠️ Network error. Try again later.");
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📘 FullTask AI Tutor</h1>
        <p>Learn interactively with reading aloud and realistic background!</p>
      </header>

      <nav className="menu">
        <button onClick={() => setSubject("Biology")}>Biology</button>
        <button onClick={() => setSubject("Chemistry")}>Chemistry</button>
        <button onClick={() => setSubject("Physics")}>Physics</button>
        <button onClick={() => setSubject("Mathematics")}>Mathematics</button>
        <button onClick={() => setSubject("English")}>English</button>
        <button onClick={() => setSubject("Nursing")}>Nursing</button>
      </nav>

      <section className="ai-section">
        <h2>🧠 Ask anything about {subject}</h2>
        <textarea
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askTutor}>Ask AI</button>

        <div className="response-box">
          <h3>AI Response:</h3>
          <p>{response}</p>
        </div>
        {speaking && <p className="speaking">🔊 Reading aloud...</p>}
      </section>

      <footer>
        © 2025 FullTask AI Tutor | Created by <strong>Akin S. Sokpah</strong> | Backend:{" "}
        <a href="https://ai-tutor-e5m3.onrender.com/">AI Tutor API</a>
      </footer>
    </div>
  );
};

export default App;
