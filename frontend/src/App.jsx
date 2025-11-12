// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  signInWithGooglePopup,
  signOutUser,
  onAuthChange,
  saveHistory,
  loadHistory
} from "./firebase"; // your firebase helper (unchanged)

const BACKEND_URL = "https://ai-tutor-e5m3.onrender.com"; // keep your backend

function speak(text) {
  if (!text) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn("TTS error", e);
  }
}

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("ft_theme") || "blue");
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("Ask anything — AI will answer instantly!");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const messagesRef = useRef(null);

  // load auth state & history
  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      if (u) {
        setUser({ uid: u.uid, name: u.displayName, photo: u.photoURL });
        try {
          const h = await loadHistory(u.uid);
          setHistory(h);
        } catch (e) {
          console.error("loadHistory", e);
        }
      } else {
        setUser(null);
        setHistory([]);
      }
    });
    return () => unsub();
  }, []);

  // theme persistence
  useEffect(() => {
    localStorage.setItem("ft_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // auto-scroll messages/history box
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [response, history]);

  // handle ask
  const handleAsk = async () => {
    const q = question.trim();
    if (!q) return;
    setLoading(true);
    setResponse("Thinking...");

    // quick special-case creator question
    const lower = q.toLowerCase();
    if (lower.includes("who created") || lower.includes("your creator") || lower.includes("who made you")) {
      const ans = "I was created by Akin S. Sokpah from Liberia.";
      setResponse(ans);
      speak(ans);
      if (user) {
        try { await saveHistory(user.uid, subject, q, ans); const h = await loadHistory(user.uid); setHistory(h);} catch(e){console.warn(e)}
      }
      setQuestion("");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question: q })
      });

      const data = await res.json();
      const ans = data?.answer || data?.choices?.[0]?.message?.content || "No response from AI.";
      setResponse(ans);
      speak(ans);

      if (user) {
        try { await saveHistory(user.uid, subject, q, ans); const h = await loadHistory(user.uid); setHistory(h);} catch(e){console.warn(e)}
      }
    } catch (err) {
      console.error("ask error", err);
      setResponse("⚠️ Network error, please try again later.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  // sign in/out
  const handleSignIn = async () => {
    try { await signInWithGooglePopup(); } catch (e) { console.error(e); alert("Sign in failed"); }
  };
  const handleSignOut = async () => {
    try { await signOutUser(); } catch (e) { console.error(e); }
  };

  return (
    <div className="ft-app">
      <header className="ft-header">
        <div className="ft-brand">
          <div className="ft-logo">📘</div>
          <div className="ft-title">
            <div className="main-title">FullTask AI Tutor</div>
            <div className="subtitle">Biology • Chemistry • Physics • Mathematics • Nursing • English</div>
          </div>
        </div>

        <div className="ft-controls">
          <select className="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="blue">Soft Blue–Purple</option>
            <option value="galaxy">Dark Galaxy</option>
            <option value="light">Light White–Gold</option>
          </select>

          {user ? (
            <div className="user-inline">
              <img src={user.photo} alt={user.name} className="avatar" />
              <span className="user-name">{user.name}</span>
              <button className="btn signout" onClick={handleSignOut}>Sign out</button>
            </div>
          ) : (
            <button className="btn signin" onClick={handleSignIn}>Sign in with Google</button>
          )}
        </div>
      </header>

      <main className="ft-main">
        <section className="left-column">
          <div className="card ask-card">
            <h2 className="ask-heading">🧠 Ask anything about <span className="accent">{subject}</span></h2>

            <div className="subject-row">
              <select className="subject-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                {["Biology","Chemistry","Physics","Mathematics","Nursing","English"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <textarea
                className="question-input"
                placeholder={`Ask a ${subject} question...`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
              />
            </div>

            <div className="action-row">
              <button className="btn primary" onClick={handleAsk} disabled={loading}>{loading ? "Thinking..." : "Ask AI"}</button>
              <button className="btn outline" onClick={() => speak(response)}>🔊 Read aloud</button>
            </div>

            <div className="response-panel">
              <div className="label">AI Response</div>
              <div className="response" ref={messagesRef}>{response}</div>
            </div>
          </div>
        </section>

        <aside className="right-column">
          <div className="card history-card">
            <h3>Saved History</h3>
            <div className="history-list" ref={messagesRef}>
              {user ? (history.length ? history.map(h => (
                <div key={h.id} className="history-item">
                  <div className="meta">{h.subject} • {h.createdAt?.toDate ? h.createdAt.toDate().toLocaleString() : ""}</div>
                  <div className="q">Q: {h.question}</div>
                  <div className="a">A: {h.answer}</div>
                </div>
              )) : <div className="empty">No history yet — ask and it will be saved.</div>) : <div className="empty">Sign in to save and view history</div>}
            </div>
          </div>

          <div className="card about-card">
            <h4>About</h4>
            <p>FullTask AI Tutor — created by <strong>Akin S. Sokpah</strong> (Liberia).</p>
            <a className="backend-link" href={BACKEND_URL} target="_blank" rel="noreferrer">Backend: ai-tutor-e5m3.onrender.com</a>
          </div>
        </aside>
      </main>

      <footer className="ft-footer">
        © 2025 FullTask AI Tutor | Powered by Akin S. Sokpah
      </footer>
    </div>
  );
}
