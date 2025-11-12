// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  firebaseConfig,
  signInWithGooglePopup,
  signOutUser,
  onAuthChange,
  saveHistory,
  loadHistory
} from "./firebase";

// Backend endpoint (your render backend)
const BACKEND_URL = "https://ai-tutor-e5m3.onrender.com";

const THEMES = {
  blue: "theme-blue",
  galaxy: "theme-galaxy",
  light: "theme-light"
};

function speak(text) {
  if (!text) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn("TTS not available", e);
  }
}

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("ft_theme") || THEMES.blue);
  const [subject, setSubject] = useState("Biology");
  const [q, setQ] = useState("");
  const [aiResp, setAiResp] = useState("Ask anything — AI will read the answer aloud!");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("ft_theme", theme);
  }, [theme]);

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      if (u) {
        setUser({ uid: u.uid, name: u.displayName, email: u.email, photo: u.photoURL });
        // load user history
        try {
          const h = await loadHistory(u.uid);
          setHistory(h);
        } catch (e) {
          console.error("load history", e);
        }
      } else {
        setUser(null);
        setHistory([]);
      }
    });
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGooglePopup();
    } catch (e) {
      console.error("signin", e);
      alert("Sign-in failed");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setHistory([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAsk = async () => {
    if (!q.trim()) return;
    // special creator response
    const lower = q.toLowerCase();
    if (lower.includes("who created") || lower.includes("your creator") || lower.includes("who made you")) {
      const answer = "I was created by Akin S. Sokpah from Liberia.";
      setAiResp(answer);
      speak(answer);
      if (user) await trySave(user.uid, subject, q, answer);
      return;
    }

    setLoading(true);
    setAiResp("Thinking...");
    try {
      const res = await fetch(BACKEND_URL + "/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question: q })
      });
      const data = await res.json();
      const answer = data?.answer || data?.choices?.[0]?.message?.content || "No response from AI.";
      setAiResp(answer);
      speak(answer);

      if (user) await trySave(user.uid, subject, q, answer);
    } catch (e) {
      console.error("ask", e);
      setAiResp("⚠️ Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  async function trySave(uid, subject, question, answer) {
    try {
      await saveHistory(uid, subject, question, answer);
      const h = await loadHistory(uid);
      setHistory(h);
    } catch (e) {
      console.error("save history", e);
    }
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">
          <div className="logo">📘</div>
          <div>
            <div className="title">FullTask AI Tutor</div>
            <div className="subtitle">Biology • Chemistry • Nursing • Physics • Math • English</div>
          </div>
        </div>

        <div className="right-controls">
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="theme-select">
            <option value={THEMES.blue}>Soft Blue–Purple</option>
            <option value={THEMES.galaxy}>Dark Galaxy</option>
            <option value={THEMES.light}>Light White–Gold</option>
          </select>

          {user ? (
            <div className="user-block">
              <img src={user.photo} alt="avatar" className="avatar" />
              <span className="user-name">{user.name}</span>
              <button className="btn small" onClick={handleSignOut}>Sign out</button>
            </div>
          ) : (
            <button className="btn" onClick={handleSignIn}>Sign in with Google</button>
          )}
        </div>
      </header>

      <main className="main-area">
        <section className="left">
          <div className="card ask-card">
            <h2>🧠 Ask anything about <span className="accent">{subject}</span></h2>

            <div className="controls">
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="subject-select">
                {["Biology","Chemistry","Physics","Mathematics","Nursing","English"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <textarea
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Ask a ${subject} question...`}
                className="question-input"
              />
              <div className="actions">
                <button className="btn primary" onClick={handleAsk} disabled={loading}>
                  {loading ? "Thinking..." : "Ask AI"}
                </button>
                <button className="btn outline" onClick={() => { speak(aiResp); }}>
                  🔊 Read aloud
                </button>
              </div>
            </div>

            <div className="ai-response">
              <div className="label">AI Response</div>
              <div className="response-text">{aiResp}</div>
            </div>
          </div>
        </section>

        <aside className="right">
          <div className="card history-card">
            <div className="history-header">
              <h3>Saved History</h3>
              <small>{user ? "Your recent Q&A" : "Sign in to save history"}</small>
            </div>

            {user ? (
              history.length ? (
                <div className="hist-list">
                  {history.map((h) => (
                    <div key={h.id} className="hist-item">
                      <div className="hist-meta"><strong>{h.subject}</strong> • {h.createdAt?.toDate ? h.createdAt.toDate().toLocaleString() : ""}</div>
                      <div className="hist-q">Q: {h.question}</div>
                      <div className="hist-a">A: {h.answer}</div>
                    </div>
                  ))}
                </div>
              ) : <div className="empty">No history yet — ask and it will be saved.</div>
            ) : (
              <div className="empty">Sign in with Google to save and view your history</div>
            )}
          </div>

          <div className="card about-card">
            <h4>About</h4>
            <p>FullTask AI Tutor — created by <strong>Akin S. Sokpah</strong> (Liberia).</p>
            <a className="link" href={BACKEND_URL} target="_blank" rel="noreferrer">Backend: ai-tutor-e5m3.onrender.com</a>
          </div>
        </aside>
      </main>

      <footer className="footer">
        © 2025 FullTask AI Tutor — Akin S. Sokpah
      </footer>
    </div>
  );
}
