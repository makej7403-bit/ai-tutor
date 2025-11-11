import React, { useState } from "react";
import { UserProvider, useUser } from "./contexts/UserContext";
import { signInWithGoogle, signOutUser } from "./firebase";
import "./App.css";

function TutorApp() {
  const { user, setUser } = useUser();
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  async function askTutor() {
    if (!question.trim()) return;
    try {
      const res = await fetch("https://ai-tutor-e5m3.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question }),
      });
      const data = await res.json();
      setResponse(data.answer || "No response received.");
    } catch (err) {
      setResponse("⚠️ Unable to connect to AI Tutor. Try again later.");
    }
  }

  async function handleSignIn() {
    try {
      const u = await signInWithGoogle();
      setUser(u);
    } catch (e) {
      alert("Sign-in failed. Please try again.");
    }
  }

  return (
    <div className="app">
      <h1>📘 FullTask AI Tutor</h1>

      <div className="subject-menu">
        {["Biology", "Chemistry", "Physics", "Mathematics", "Nursing", "English"].map((s) => (
          <button key={s} onClick={() => setSubject(s)} className={subject === s ? "active" : ""}>
            {s}
          </button>
        ))}
      </div>

      <h2>🧠 Ask anything about <b>{subject}</b></h2>
      <textarea
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askTutor}>Ask AI</button>

      <h3>AI Response:</h3>
      <div className="response">{response}</div>

      {!user ? (
        <button className="signin" onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <div className="user-info">
          <p>👋 Hello, {user.displayName}</p>
          <button onClick={() => signOutUser().then(() => setUser(null))}>Logout</button>
        </div>
      )}

      <footer>© 2025 FullTask AI Tutor | Powered by Akin S. Sokpah | Backend: <a href="https://ai-tutor-e5m3.onrender.com">ai-tutor-e5m3.onrender.com</a></footer>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <TutorApp />
    </UserProvider>
  );
}
