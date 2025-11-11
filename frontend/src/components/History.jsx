// src/components/History.jsx
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { loadHistory, saveHistory } from "../firebase";

export default function History({ subject, question, answer }) {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      loadHistory(user.uid).then(setItems).catch(console.error);
    } else {
      setItems([]);
    }
  }, [user]);

  // Save helper (call when a new Q/A has been received)
  async function saveCurrent() {
    if (!user || !question || !answer) return;
    try {
      await saveHistory(user.uid, subject, question, answer);
      const updated = await loadHistory(user.uid);
      setItems(updated);
    } catch (e) {
      console.error("save history error", e);
    }
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Saved History</strong>
        <button onClick={saveCurrent} className="btn-small">Save current</button>
      </div>

      {user ? (
        items.length ? (
          items.map((it) => (
            <div key={it.id} style={{ marginTop: 8, borderTop: "1px solid #eee", paddingTop: 8 }}>
              <div style={{ fontSize: 13, color: "#444" }}><strong>{it.subject}</strong> &middot; {new Date(it.ts).toLocaleString()}</div>
              <div style={{ marginTop: 4, whiteSpace: "pre-wrap" }}><strong>Q:</strong> {it.question}</div>
              <div style={{ marginTop: 4, whiteSpace: "pre-wrap" }}><strong>A:</strong> {it.answer}</div>
            </div>
          ))
        ) : (
          <div style={{ marginTop: 8 }}>No history — ask and save your first Q&A.</div>
        )
      ) : (
        <div style={{ marginTop: 8 }}>Sign in to save your history.</div>
      )}
    </div>
  );
}
