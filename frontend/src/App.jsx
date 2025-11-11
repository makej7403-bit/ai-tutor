// src/App.jsx
import React, { useEffect, useState, useContext } from "react";
import { UserProvider, UserContext } from "./contexts/UserContext";
import AuthWidget from "./components/AuthWidget";
import History from "./components/History";
import Flashcards from "./components/Flashcards";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import Notes from "./components/Notes";
import Calculator from "./components/Calculator";
import Planner from "./components/Planner";
import { speak } from "./components/SpeechTools";

const BACKEND_URL = (import.meta.env.VITE_API_BASE || "https://ai-tutor-e5m3.onrender.com") + "/api/ask";

function TutorSection({ subject, onAnswer }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("⏳ Thinking...");
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question }),
      });
      const data = await res.json();
      const ans = data?.answer || "⚠️ No answer received.";
      setAnswer(ans);
      speak(ans);
      if (onAnswer) onAnswer(subject, question, ans);
    } catch (e) {
      console.error(e);
      setAnswer("⚠️ Unable to connect to AI Tutor. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">🧠 Ask anything about {subject}</h2>
      <input value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder={`Ask about ${subject}...`} className="input" />
      <div style={{ marginTop: 10 }}>
        <button onClick={askAI} className="btn">{loading ? "Thinking..." : "Ask AI"}</button>
      </div>
      <div style={{ marginTop: 12, background: "#eef6ff", padding: 12, borderRadius: 8 }}>
        <strong>AI Response:</strong>
        <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{answer}</div>
      </div>
    </div>
  );
}

function MainApp() {
  const [subject, setSubject] = useState("Biology");
  const [view, setView] = useState("Tutor");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user } = useContext(UserContext);
  const [latestQA, setLatestQA] = useState({ subject: "", question: "", answer: "" });

  useEffect(()=> {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleNewAnswer = (s, q, a) => {
    setLatestQA({ subject: s, question: q, answer: a });
  };

  return (
    <div>
      <header style={{ background: "#0b5cff", color: "white", padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>📘 FullTask AI Tutor</div>
      </header>

      <div style={{ display:"flex", gap: 18, padding: 16 }}>
        <aside style={{ width: 260 }}>
          <nav className="card">
            <div style={{ marginBottom: 8, fontWeight: 700 }}>📘 Subjects</div>
            {["Biology","Chemistry","Physics","Mathematics","Nursing","English"].map(s => (
              <button key={s} onClick={()=>setSubject(s)} className={`sub-btn ${subject===s ? "active":""}`}>{s}</button>
            ))}
            <div style={{ marginTop: 12 }}>
              <AuthWidget />
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <strong>Theme</strong>
                <button onClick={()=>setTheme(theme==="light"?"dark":"light")} className="btn-small">{theme==="light"?"Dark":"Light"}</button>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <button onClick={() => setView("Tutor")} className="btn-small">Tutor</button>
              <button onClick={() => setView("Flashcards")} className="btn-small">Flashcards</button>
              <button onClick={() => setView("Quiz")} className="btn-small">Quiz</button>
              <button onClick={() => setView("Notes")} className="btn-small">Notes</button>
              <button onClick={() => setView("Calculator")} className="btn-small">Calculator</button>
              <button onClick={() => setView("Planner")} className="btn-small">Planner</button>
            </div>

          </nav>

          <div style={{ marginTop: 12 }}>
            <History subject={latestQA.subject} question={latestQA.question} answer={latestQA.answer} />
          </div>
        </aside>

        <main style={{ flex: 1 }}>
          {view === "Tutor" && <TutorSection subject={subject} onAnswer={handleNewAnswer} />}
          {view === "Flashcards" && <Flashcards subject={subject} />}
          {view === "Quiz" && <Quiz subject={subject} />}
          {view === "Notes" && <Notes />}
          {view === "Calculator" && <Calculator />}
          {view === "Planner" && <Planner />}
        </main>
      </div>

      <footer style={{ textAlign: "center", padding: 20, color:"#666" }}>
        © 2025 FullTask AI Tutor | Powered by Akin S. Sokpah | Backend: <a href="https://ai-tutor-e5m3.onrender.com">ai-tutor-e5m3.onrender.com</a>
      </footer>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
